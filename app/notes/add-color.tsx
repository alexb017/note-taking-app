import { SwatchIcon } from '@heroicons/react/24/outline';
import { BgColor } from '@/lib/types';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import clsx from 'clsx';

export default function AddColor({
  onColorsChange,
  bg,
}: {
  onColorsChange: (colors: BgColor) => void;
  bg: BgColor;
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
    <Popover>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild className="p-0">
            <PopoverTrigger asChild>
              <Button className="w-8 h-8 rounded-full bg-transparent shadow-none hover:bg-zinc-900/10 dark:hover:bg-zinc-100/10">
                <SwatchIcon className="h-4 w-4 text-black dark:text-white" />
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent>Background options</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <PopoverContent className="w-max p-0 items-start justify-start rounded-xl shadow-2xl dark:bg-zinc-800">
        <div className="flex flex-col w-full">
          <div className="p-3">
            <p className="text-sm">Choose background color:</p>
          </div>
          <Separator />
          <div className="flex items-center flex-wrap gap-[2px] p-2 px-[10px]">
            {bgColors.map((color, index) => (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => onColorsChange(color)}
                      className={clsx(
                        color.light,
                        color.dark,
                        'w-8 h-8 p-0 border-2 rounded-full shadow-none focus-visible:ring-0',
                        'hover:border-zinc-500 dark:hover:border-zinc-400',
                        {
                          'border-zinc-500 dark:border-zinc-200':
                            color.light === bg.light,
                          'border-zinc-200 dark:border-zinc-600':
                            color.light !== bg.light,
                          [color.light.replace('bg-', 'hover:bg-')]: true,
                          [color.dark.replace('dark:bg-', 'dark:hover:bg-')]:
                            true,
                        }
                      )}
                    ></Button>
                  </TooltipTrigger>
                  <TooltipContent>{color.tooltip}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
