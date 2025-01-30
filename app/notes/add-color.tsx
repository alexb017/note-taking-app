import { SwatchIcon } from '@heroicons/react/24/outline';
import { BgColor } from '@/lib/types';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import TooltipWrap from '@/components/tooltip-wrap';

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
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <PopoverTrigger asChild>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                className="p-0 w-[34px] h-[34px] [&_svg]:size-[18px] rounded-full bg-transparent shadow-none text-black dark:text-white hover:bg-zinc-900/10 dark:hover:bg-zinc-100/10"
              >
                <SwatchIcon className="w-5 h-5" />
              </Button>
            </TooltipTrigger>
          </PopoverTrigger>
          <TooltipContent side="bottom" className="bg-zinc-600 dark:text-white">
            Background options
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <PopoverContent className="md:w-max p-0 items-start justify-start rounded-xl shadow-lg dark:bg-zinc-800">
        <div
          className="flex flex-col"
          onFocusCapture={(event) => event.stopPropagation()}
          onBlurCapture={(event) => event.stopPropagation()}
        >
          <div className="p-3">
            <p className="text-sm">Choose background color:</p>
          </div>
          <Separator className="dark:bg-zinc-700" />
          <div className="flex flex-wrap gap-[2px] p-2 px-[10px]">
            {bgColors.map((color, index) => (
              <TooltipWrap
                key={index}
                content={color.tooltip}
                classnames={cn(
                  'w-8 h-8 border-2 hover:border-zinc-500 dark:hover:border-zinc-400',
                  color.light,
                  color.dark,
                  {
                    'border-zinc-500 dark:border-zinc-200':
                      color.light === bg.light,
                    'border-zinc-200 dark:border-zinc-600':
                      color.light !== bg.light,
                    [color.light.replace('bg-', 'hover:bg-')]: true,
                    [color.dark.replace('dark:bg-', 'dark:hover:bg-')]: true,
                  }
                )}
                events={{ onClick: () => onColorsChange(color) }}
              />
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
