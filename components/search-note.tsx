import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useRouter, useSearchParams } from 'next/navigation';
import { createUrl } from '@/lib/utils';
import { useDebouncedCallback } from 'use-debounce';

// position prop is used to determine the position of the search input
// where is displayed on the left or right side of the navbar
// based on the screen size, left for desktop/tablet and right for mobile
export default function SearchNote({
  position,
}: {
  position: 'left' | 'right';
}) {
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
      {position === 'left' ? (
        <div className="hidden sm:block">
          <Label htmlFor="search" className="relative w-full rounded-xl">
            <MagnifyingGlassIcon className="absolute left-3 top-3 w-5 h-5 text-neutral-500 dark:text-neutral-200" />
            <Input
              name="search-note"
              id="search"
              onChange={(e) => handleSearchChange(e.target.value)}
              defaultValue={searchParams.get('q')?.toString()}
              placeholder="Search note..."
              className="w-[340px] lg:w-[480px] pl-11 h-11 rounded-xl border-0 shadow-none bg-neutral-100 dark:bg-neutral-800 focus-visible:ring-0 focus-visible:bg-neutral-200 dark:focus-visible:bg-neutral-700"
            />
          </Label>
        </div>
      ) : (
        <div className="block sm:hidden">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full bg-transparent [&_svg]:size-5"
              >
                <MagnifyingGlassIcon className="w-5 h-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 border-0 shadow-2xl rounded-xl right-4 -translate-x-4">
              <Label htmlFor="search-mobile" className="relative w-full">
                <MagnifyingGlassIcon className="absolute left-3 top-3 w-5 h-5 text-neutral-500 dark:text-neutral-200" />
                <Input
                  name="search-note-mobile"
                  id="search-mobile"
                  onChange={(e) => handleSearchChange(e.target.value)}
                  defaultValue={searchParams.get('q')?.toString()}
                  placeholder="Search note..."
                  className="w-full pl-11 h-11 rounded-xl border border-black/10 shadow-none bg-white dark:bg-neutral-800 dark:border-white/10 focus-visible:ring-0 focus-visible:bg-white dark:focus-visible:bg-neutral-800"
                />
              </Label>
            </PopoverContent>
          </Popover>
        </div>
      )}
    </>
  );
}
