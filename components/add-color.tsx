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

  return (
    <Popover placement="bottom" offset={0}>
      <Tooltip
        placement="bottom"
        radius="sm"
        size="sm"
        offset={0}
        delay={350}
        closeDelay={0}
        content="Background options"
      >
        <div>
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
        </div>
      </Tooltip>
      <PopoverContent className="w-[224px] md:w-[424px] p-0 items-start justify-start">
        <div className="flex flex-col w-full">
          <div className="p-3">
            <p>Choose background color:</p>
          </div>
          <Divider />
          <div className="flex items-center flex-wrap md:flex-nowrap gap-[2px] p-2 px-[10px]">
            {bgColors.map((bgColor, index) => (
              <Tooltip
                key={index}
                placement="bottom"
                radius="sm"
                size="sm"
                offset={0}
                delay={350}
                closeDelay={0}
                content={bgColor.tooltip}
              >
                <div>
                  <Button
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
                    onPress={() => onColorChange(bgColor)}
                  ></Button>
                </div>
              </Tooltip>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
