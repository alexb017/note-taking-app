import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react';
import MagnifyingIcon from './icons/magnifying';
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { useState } from 'react';

export default function SearchNote() {
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  function createURL(
    pathname: string,
    params: URLSearchParams | ReadonlyURLSearchParams
  ) {
    const paramsString = params.toString();
    const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

    return `${pathname}${queryString}`;
  }

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    const searchValueInput = event.target.value;
    setSearchValue(searchValueInput);

    const newParams = new URLSearchParams(searchParams.toString());
    let path;

    if (searchValueInput) {
      newParams.set('q', searchValueInput);
      path = pathname === '/notes' ? `${pathname}/search` : pathname;
    } else {
      newParams.delete('q');
      path = '/notes';
    }

    router.replace(createURL(`${path}`, newParams));
  }

  return (
    <>
      <div className="hidden sm:block">
        <form className="w-[240px] lg:w-[480px]">
          <Input
            onChange={handleSearchChange}
            label="Search"
            placeholder="Search note..."
            value={pathname !== '/notes/search' ? '' : searchValue}
            size="sm"
            variant="flat"
            className="text-xs"
            startContent={<MagnifyingIcon classname="h-4" />}
          />
        </form>
      </div>
      <div className="block sm:hidden">
        <Popover placement="bottom" showArrow offset={10}>
          <PopoverTrigger>
            <Button
              isIconOnly
              size="sm"
              className="min-w-unit-8 w-unit-8 h-8 bg-zinc-900/10 hover:bg-zinc-900/10 dark:bg-zinc-100/10"
            >
              <MagnifyingIcon classname="h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[240px]">
            {() => (
              <div className="px-1 py-2 w-full">
                <form className="w-full">
                  <Input
                    onChange={handleSearchChange}
                    autoFocus
                    label="Search"
                    placeholder="Search note..."
                    size="sm"
                    variant="flat"
                    className="text-xs"
                    startContent={<MagnifyingIcon classname="h-4" />}
                  />
                </form>
              </div>
            )}
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}
