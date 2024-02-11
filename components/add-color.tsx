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
  return (
    <Popover placement="bottom" offset={10}>
      <PopoverTrigger>
        <Button
          isIconOnly
          aria-label="color"
          radius="full"
          className="bg-transparent hover:bg-gray-900/10"
        >
          <PaletteIcon classname="h-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[396px] p-0 items-start justify-start">
        <div className="flex flex-col w-full">
          <div className="p-3">
            <p>Choose background color:</p>
          </div>
          <Divider />
          <div className="flex items-center gap-[2px] p-1 px-[10px]">
            <Button
              isIconOnly
              radius="full"
              className={`bg-white hover:bg-white border-2 border-gray-100 hover:border-gray-500 ${
                color === 'bg-white' ? 'border-gray-500' : ''
              }`}
              onClick={() => onColorChange('bg-white')}
            ></Button>
            <Button
              isIconOnly
              radius="full"
              className={`bg-red-100 hover:bg-red-100 border-2 border-white hover:border-gray-500 ${
                color === 'bg-red-100' ? 'border-gray-500' : ''
              }`}
              onClick={() => onColorChange('bg-red-100')}
            ></Button>
            <Button
              isIconOnly
              radius="full"
              className={`bg-orange-100 hover:bg-orange-100 border-2 border-white hover:border-gray-500 ${
                color === 'bg-orange-100' ? 'border-gray-500' : ''
              }`}
              onClick={() => onColorChange('bg-orange-100')}
            ></Button>
            <Button
              isIconOnly
              radius="full"
              className={`bg-yellow-100 hover:bg-yellow-100 border-2 border-white hover:border-gray-500 ${
                color === 'bg-yellow-100' ? 'border-gray-500' : ''
              }`}
              onClick={() => onColorChange('bg-yellow-100')}
            ></Button>
            <Button
              isIconOnly
              radius="full"
              className={`bg-green-100 hover:bg-green-100 border-2 border-white hover:border-gray-500 ${
                color === 'bg-green-100' ? 'border-gray-500' : ''
              }`}
              onClick={() => onColorChange('bg-green-100')}
            ></Button>
            <Button
              isIconOnly
              radius="full"
              className={`bg-blue-100 hover:bg-blue-100 border-2 border-white hover:border-gray-500 ${
                color === 'bg-blue-100' ? 'border-gray-500' : ''
              }`}
              onClick={() => onColorChange('bg-blue-100')}
            ></Button>
            <Button
              isIconOnly
              radius="full"
              className={`bg-purple-100 hover:bg-purple-100 border-2 border-white hover:border-gray-500 ${
                color === 'bg-purple-100' ? 'border-gray-500' : ''
              }`}
              onClick={() => onColorChange('bg-purple-100')}
            ></Button>
            <Button
              isIconOnly
              radius="full"
              className={`bg-pink-100 hover:bg-pink-100 border-2 border-white hover:border-gray-500 ${
                color === 'bg-pink-100' ? 'border-gray-500' : ''
              }`}
              onClick={() => onColorChange('bg-pink-100')}
            ></Button>
            <Button
              isIconOnly
              radius="full"
              className={`bg-gray-100 hover:bg-gray-100 border-2 border-white hover:border-gray-500 ${
                color === 'bg-gray-100' ? 'border-gray-500' : ''
              }`}
              onClick={() => onColorChange('bg-gray-100')}
            ></Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
