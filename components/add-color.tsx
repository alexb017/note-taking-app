import {
  Button,
  Divider,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
} from '@nextui-org/react';
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
    { light: 'bg-white', dark: 'dark:bg-zinc-900' },
    { light: 'bg-red-200', dark: 'dark:bg-red-800' },
    { light: 'bg-orange-200', dark: 'dark:bg-orange-800' },
    { light: 'bg-yellow-200', dark: 'dark:bg-yellow-800' },
    { light: 'bg-green-200', dark: 'dark:bg-green-800' },
    { light: 'bg-teal-200', dark: 'dark:bg-teal-800' },
    { light: 'bg-sky-200', dark: 'dark:bg-sky-800' },
    { light: 'bg-indigo-200', dark: 'dark:bg-indigo-800' },
    { light: 'bg-purple-200', dark: 'dark:bg-purple-800' },
    { light: 'bg-pink-200', dark: 'dark:bg-pink-800' },
    { light: 'bg-zinc-200', dark: 'dark:bg-zinc-800' },
  ];

  return (
    <Popover placement="bottom" offset={0}>
      <PopoverTrigger>
        <Button
          isIconOnly
          aria-label="color"
          radius="full"
          className="min-w-unit-8 w-unit-8 h-8 bg-transparent hover:bg-zinc-900/10 dark:hover:bg-zinc-100/10"
        >
          <PaletteIcon classname="h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[390px] p-0 items-start justify-start">
        <div className="flex flex-col w-full">
          <div className="p-3">
            <p>Choose background color:</p>
          </div>
          <Divider />
          <div className="flex items-center gap-[2px] p-2 px-[10px]">
            {bgColors.map((bgColor, index) => (
              <Button
                key={index}
                isIconOnly
                radius="full"
                className={`${bgColor.light} ${bgColor.dark} border-2 ${
                  bgColor.light === 'bg-white'
                    ? 'border-zinc-200 dark:border-zinc-600'
                    : 'border-white dark:border-zinc-900'
                } hover:border-zinc-500 min-w-unit-8 w-unit-8 h-8 ${
                  bgColor.light === colors.light
                    ? 'border-zinc-500 dark:border-zinc-300'
                    : ''
                }`}
                onClick={() => onColorChange(bgColor)}
              ></Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
