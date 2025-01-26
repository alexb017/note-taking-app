import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useRouter, useSearchParams } from 'next/navigation';
import { createUrl } from '@/lib/utils';
import { useDebouncedCallback } from 'use-debounce';

export default function SearchNote() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Debounce search input to prevent too many requests
  const handleSearchChange = useDebouncedCallback((value: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    let path;

    if (value) {
      newParams.set('q', value);
      path = '/notes/search';
    } else {
      newParams.delete('q');
      path = '/notes';
    }

    router.replace(createUrl(`${path}`, newParams));
  }, 500);

  return (
    <>
      <div className="hidden sm:block">
        <form className="w-[240px] lg:w-[480px]">
          <Input
            onChange={(e) => handleSearchChange(e.target.value)}
            defaultValue={searchParams.get('q')?.toString()}
            placeholder="Search note..."
            className="h-11 rounded-xl border-0 shadow-none bg-neutral-100 dark:bg-neutral-800 focus-visible:ring-0 focus-visible:bg-neutral-200 dark:focus-visible:bg-neutral-700"
          />
        </form>
      </div>
      <div className="block sm:hidden">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full text-neutral-500 dark:text-neutral-200"
            >
              <MagnifyingGlassIcon className="w-5 h-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full mx-5 p-0 border-0 shadow-2xl">
            <form className="w-full">
              <Input
                onChange={(e) => handleSearchChange(e.target.value)}
                defaultValue={searchParams.get('q')?.toString()}
                autoFocus
                placeholder="Search note..."
                className="h-11 rounded-xl border-0 shadow-none bg-neutral-100 dark:bg-neutral-800 focus-visible:ring-0 focus-visible:bg-neutral-200 dark:focus-visible:bg-neutral-700"
              />
            </form>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}
