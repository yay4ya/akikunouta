import argparse
import asyncio
import json
import logging
from pathlib import Path
from typing import Any
from urllib.parse import urlencode, urljoin

import httpx

logger = logging.getLogger(__name__)

THUMBNAIL_PATH = Path("public/thumbnails")
THUMBNAIL_URL_PREFIX = "thumbnails/"


async def get_video_info(video_id: str) -> dict[str, Any]:
    video_url = f"https://www.youtube.com/watch?v={video_id}"
    oembed_url = f"https://www.youtube.com/oembed?{urlencode({'url': video_url})}"
    try:
        async with httpx.AsyncClient(timeout=10) as client:
            response = await client.get(oembed_url)
            response.raise_for_status()
            data = response.json()
    except httpx.HTTPStatusError:
        logger.warning(f"Failed to get video info for {video_id}")
        return {}
    return data


async def download_thumbnail(video_id: str) -> str | None:
    filename = f"{video_id}.jpg"
    path = THUMBNAIL_PATH / filename
    thumbnail_url = urljoin(THUMBNAIL_URL_PREFIX, filename)
    if path.exists():
        return thumbnail_url
    for name in (
        "maxresdefault",
        "sddefault",
        "hqdefault",
        "mqdefault",
        "default",
    ):
        async with httpx.AsyncClient(timeout=10) as client:
            url = f"https://img.youtube.com/vi/{video_id}/{name}.jpg"
            try:
                response = await client.get(url)
                response.raise_for_status()
                if int(response.headers.get("content-length", "0")) > 310000:
                    # チャンネルに設定されているデフォルトのサムネイルの可能性がある
                    continue
            except httpx.HTTPStatusError:
                continue
            with path.open("wb") as f:
                f.write(response.content)
            return thumbnail_url
    return None


async def fetch_metadata(sem: asyncio.Semaphore, video_id: str) -> dict[str, Any]:
    async with sem:
        thumbnail_url, video_info = await asyncio.gather(
            download_thumbnail(video_id),
            get_video_info(video_id),
        )
    return {"video": video_info or None, "thumbnail": thumbnail_url}


async def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--filename", type=str, default="src/data/tracks.json")
    args = parser.parse_args()

    with open(args.filename) as jsonfile:
        tracks = json.load(jsonfile)

    sem = asyncio.Semaphore(5)

    coros = {
        track["videoid"]: fetch_metadata(sem, track["videoid"]) for track in tracks
    }
    videoid_to_metadata = {
        videoid: metadata
        for videoid, metadata in zip(
            coros.keys(), await asyncio.gather(*coros.values())
        )
    }
    for track in tracks:
        metadata = videoid_to_metadata[track["videoid"]]
        track.update({"metadata": metadata})

    with open(args.filename, "w") as jsonfile:
        json.dump(tracks, jsonfile, ensure_ascii=False, indent=2)


if __name__ == "__main__":
    logging.basicConfig(level=logging.WARNING)
    asyncio.run(main())
