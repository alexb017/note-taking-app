import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Button } from '@nextui-org/react';
import SunIcon from './icons/sun';
import MoonIcon from './icons/moon';

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Button
      isIconOnly
      size="sm"
      radius="md"
      className="bg-zinc-900/10 dark:bg-zinc-100/10"
      onPress={() => {
        if (theme === 'light') {
          setTheme('dark');
        } else {
          setTheme('light');
        }
      }}
    >
      {theme === 'light' ? (
        <SunIcon classname="h-4" />
      ) : (
        <MoonIcon classname="h-4" />
      )}
    </Button>
  );
}
