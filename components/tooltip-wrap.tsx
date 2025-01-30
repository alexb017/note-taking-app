import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function TooltipWrap({
  children,
  content,
  classnames,
  events,
  props,
}: {
  children?: React.ReactNode;
  content: string;
  classnames?: string | undefined;
  events?: {
    [key: string]: (event: React.MouseEvent | React.FocusEvent) => void;
  };
  props?: any;
}) {
  const classname =
    'p-0 w-[34px] h-[34px] [&_svg]:size-[18px] rounded-full bg-transparent shadow-none text-black dark:text-white hover:bg-zinc-900/10 dark:hover:bg-zinc-100/10';

  return (
    <TooltipProvider {...props} delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" className={cn(classname, classnames)} {...events}>
            {children}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="bg-zinc-600 dark:text-white">
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
