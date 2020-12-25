export function deepCopy<T>(src: T): T {
  return JSON.parse(JSON.stringify(src));
}

export function zeroPadding(num: number, length: number){
  const numString = "" + num;
  length = numString.length < length ? length : numString.length;
	return ( Array(length).join('0') + numString).slice( -length);
}


export function secondsToTime(t: number): string {
  const hours = t / 3600 | 0;
  const minutes = (t % 3600 | 0) / 60 | 0;
  const seconds =  t % 60 | 0;
  if (hours === 0) {
    return [zeroPadding(minutes, 2), zeroPadding(seconds, 2)].join(':');
  }
  return [zeroPadding(hours, 2), zeroPadding(minutes, 2),
          zeroPadding(seconds, 2)].join(':');
}

export function shuffle<T>(array: Array<T>): Array<T> {
  array = array.map(item => item);
  for (let i = 0; i < array.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function generateUuid(): string {
    const chars = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".split("");
    for (let i = 0, len = chars.length; i < len; i++) {
        switch (chars[i]) {
            case "x":
                chars[i] = Math.floor(Math.random() * 16).toString(16);
                break;
            case "y":
                chars[i] = (Math.floor(Math.random() * 4) + 8).toString(16);
                break;
        }
    }
    return chars.join("");
}
