import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
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
            placeholder="Search note..."
            value={pathname !== '/notes/search' ? '' : searchValue}
            className="text-xs"
          />
        </form>
      </div>
      <div className="block sm:hidden">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              size="sm"
              className="min-w-unit-8 w-unit-8 h-8 bg-zinc-900/10 hover:bg-zinc-900/10 dark:bg-zinc-100/10"
            >
              <MagnifyingIcon classname="h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[240px]">
            <div className="px-1 py-2 w-full">
              <form className="w-full">
                <Input
                  onChange={handleSearchChange}
                  autoFocus
                  placeholder="Search note..."
                  className="text-xs"
                />
              </form>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}
