import PaletteIcon from './icons/palette';
import { BgColor } from '@/lib/types';

export default function AddColor({
  onColorChange,
  colors,
}: {
  onColorChange: (colors: BgColor) => void;
  colors: BgColor;
}) {
  const bgColors = [
    { light: 'bg-white', dark: 'dark:bg-zinc-900', tooltip: 'Default' },
    { light: 'bg-red-200', dark: 'dark:bg-red-900', tooltip: 'Red' },
    { light: 'bg-orange-200', dark: 'dark:bg-orange-900', tooltip: 'Orange' },
    { light: 'bg-yellow-200', dark: 'dark:bg-yellow-900', tooltip: 'Yellow' },
    { light: 'bg-lime-200', dark: 'dark:bg-lime-900', tooltip: 'Lime' },
    { light: 'bg-green-200', dark: 'dark:bg-green-900', tooltip: 'Green' },
    { light: 'bg-teal-200', dark: 'dark:bg-teal-900', tooltip: 'Teal' },
    { light: 'bg-sky-200', dark: 'dark:bg-sky-900', tooltip: 'Sky' },
    { light: 'bg-indigo-200', dark: 'dark:bg-indigo-900', tooltip: 'Indigo' },
    { light: 'bg-purple-200', dark: 'dark:bg-purple-900', tooltip: 'Purple' },
    { light: 'bg-pink-200', dark: 'dark:bg-pink-900', tooltip: 'Pink' },
    { light: 'bg-zinc-200', dark: 'dark:bg-zinc-800', tooltip: 'Gray' },
  ];

  return <></>;
}
