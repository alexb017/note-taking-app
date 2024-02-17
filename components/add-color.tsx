import {
  Button,
  Divider,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
} from '@nextui-org/react';
import PaletteIcon from './icons/palette';

export default function AddColor({
  onColorChange,
  color,
}: {
  onColorChange: (color: string) => void;
  color: string;
}) {
  const bgColors = [
    'bg-white',
    'bg-red-100',
    'bg-orange-100',
    'bg-yellow-100',
    'bg-green-100',
    'bg-teal-100',
    'bg-blue-100',
    'bg-violet-100',
    'bg-purple-100',
    'bg-pink-100',
    'bg-gray-100',
  ];

  return (
    <Popover placement="bottom" offset={0}>
      <PopoverTrigger>
        <Button
          isIconOnly
          aria-label="color"
          radius="full"
          className="min-w-unit-8 w-unit-8 h-8 bg-transparent hover:bg-gray-900/10"
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
            {bgColors.map((bgColor) => (
              <Button
                key={bgColor}
                isIconOnly
                radius="full"
                className={`${bgColor} border-2 ${
                  bgColor === 'bg-white' ? 'border-gray-200' : 'border-white'
                } hover:border-gray-500 min-w-unit-8 w-unit-8 h-8 ${
                  bgColor === color ? 'border-gray-500' : ''
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
