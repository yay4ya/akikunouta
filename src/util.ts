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
