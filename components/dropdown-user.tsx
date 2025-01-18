import { useRouter } from 'next/navigation';
import { UserProfile } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import {
  UserIcon,
  ArrowLeftEndOnRectangleIcon,
  DocumentTextIcon,
  BellIcon,
  ArchiveBoxIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import useUserProfile from '@/lib/use-user-profile';

export default function DropdownUser({
  uid,
  onUserSignOut,
}: {
  uid: string;
  onUserSignOut: () => void;
}) {
  const [userProfile] = useUserProfile(uid) as [UserProfile];
  const router = useRouter();

  const links = [
    {
      name: 'My Profile',
      url: '/profile',
      icon: UserIcon,
    },
    {
      name: 'Notes',
      url: '/notes',
      icon: DocumentTextIcon,
    },
    {
      name: 'Reminders',
      url: '/notes/reminders',
      icon: BellIcon,
    },
    {
      name: 'Archive',
      url: '/notes/archive',
      icon: ArchiveBoxIcon,
    },
    {
      name: 'Trash',
      url: '/notes/trash',
      icon: TrashIcon,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex items-center gap-2 p-0 h-9 bg-transparent shadow-none hover:bg-transparent hover:opacity-80 focus-visible:ring-0">
          <Avatar className="w-9 h-9">
            <AvatarImage
              src={userProfile?.photoURL}
              alt={userProfile?.displayName}
            />
            <AvatarFallback>{userProfile?.displayName}</AvatarFallback>
          </Avatar>
          <div className="hidden sm:flex flex-col items-start">
            <span className="text-black dark:text-white">
              {userProfile?.displayName}
            </span>
            <span className="text-xs text-zinc-400">{userProfile?.email}</span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 rounded-xl shadow-2xl" align="end">
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {links.map((link) => (
            <DropdownMenuItem
              className="rounded-lg"
              key={link.name}
              onClick={() => router.push(link.url)}
            >
              <link.icon className="w-5 h-5 text-gray-500" />
              <span className="ml-2">{link.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="rounded-lg"
            onClick={async () => {
              await onUserSignOut();
              router.push('/');
            }}
          >
            <ArrowLeftEndOnRectangleIcon className="w-5 h-5 text-gray-500" />
            <span className="ml-2">Sign out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
