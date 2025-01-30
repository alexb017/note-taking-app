import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ReadonlyURLSearchParams } from 'next/navigation';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Create a URL with a pathname and URLSearchParams object
// Returns a string URL
export function createUrl(
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams
) {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

  return `${pathname}${queryString}`;
}

// Convert timestamp to a date
export function convertTimestampToDate(timestamp: {
  seconds: number;
  nanoseconds: number;
}) {
  return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
}
