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

// Convert date to a string
export function dateToString(date: Date) {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Convert timestamp to a string
export function displayLastEdited(timestamp: {
  seconds: number;
  nanoseconds: number;
}) {
  if (!timestamp) return '';

  // Convert timestamp to a date
  const date = convertTimestampToDate(timestamp);
  const now = new Date();

  const diffInSeconds = (now.getTime() - date.getTime()) / 1000;
  const diffInMinutes = diffInSeconds / 60;
  const diffInHours = diffInMinutes / 60;
  const diffInDays = diffInHours / 24;

  let formattedTime;

  if (diffInDays < 1) {
    formattedTime = formatTimeOfDay(date);
  } else if (diffInDays < 2) {
    formattedTime = `yesterday at ${formatTimeOfDay(date)} `;
  } else if (diffInDays < 7) {
    formattedTime = `${Math.round(diffInDays)} days ago`;
  } else {
    formattedTime =
      date.getFullYear() === now.getFullYear()
        ? date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          })
        : date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          });
  }

  return formattedTime;
}

// Format time of day in 12-hour format
function formatTimeOfDay(date: Date) {
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0'); // Add leading zero
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // Convert to 12-hour format
  return `${hours}:${minutes} ${ampm}`;
}
