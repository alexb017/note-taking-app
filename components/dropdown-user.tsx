import UserIcon from './icons/user';
import NotesIcon from './icons/notes';
import BellIcon from './icons/bell';
import ArchiveIcon from './icons/archive';
import TrashIcon from './icons/trash';
import LogoutIcon from './icons/logout';
import { useRouter } from 'next/navigation';
import { UserProfile } from '@/lib/types';
import { useContext } from 'react';
import { AuthContext } from '@/app/auth-context';

export default function DropdownUser({
  user,
  screen,
}: {
  user: UserProfile;
  screen: 'desktop' | 'mobile';
}) {
  const { userSignOut } = useContext(AuthContext);
  const router = useRouter();

  const links = [
    {
      name: 'My Profile',
      url: '/profile',
      icon: UserIcon,
      key: 'my_profile',
      textvalue: 'my_profile',
    },
    {
      name: 'Notes',
      url: '/notes',
      icon: NotesIcon,
      key: 'my_notes',
      textvalue: 'my_notes',
    },
    {
      name: 'Reminders',
      url: '/notes/reminders',
      icon: BellIcon,
      key: 'my_reminders',
      textvalue: 'my_reminders',
    },
    {
      name: 'Archive',
      url: '/notes/archive',
      icon: ArchiveIcon,
      key: 'my_archive',
      textvalue: 'my_archive',
    },
    {
      name: 'Trash',
      url: '/notes/trash',
      icon: TrashIcon,
      key: 'my_trash',
      textvalue: 'my_trash',
    },
  ];

  return <></>;
}
