import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  User,
} from '@nextui-org/react';
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

  return (
    <>
      <Dropdown placement="bottom-start">
        {screen === 'desktop' ? (
          <>
            <DropdownTrigger>
              <User
                as="button"
                avatarProps={{
                  src: `${user?.photoURL}`,
                }}
                className="transition-transform"
                description={user?.email}
                name={user?.displayName}
              />
            </DropdownTrigger>
          </>
        ) : (
          <>
            <DropdownTrigger>
              <Avatar
                as="button"
                className="transition-transform"
                src={user?.photoURL}
              />
            </DropdownTrigger>
          </>
        )}
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownSection>
            <DropdownItem
              key="profile"
              className="h-14 gap-2"
              textValue="profile"
            >
              <p className="font-bold">Signed in as</p>
              <p className="font-bold">{`${user?.email}`}</p>
            </DropdownItem>
          </DropdownSection>

          <DropdownSection showDivider>
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <DropdownItem
                  key={link.key}
                  textValue={link.textvalue}
                  startContent={<Icon classname="h-4" />}
                  onPress={() => router.push(link.url)}
                >
                  {link.name}
                </DropdownItem>
              );
            })}
          </DropdownSection>

          <DropdownSection>
            <DropdownItem
              key="logout"
              color="danger"
              textValue="logout"
              startContent={<LogoutIcon classname="h-4" />}
              onPress={() => {
                userSignOut();
                router.push('/');
              }}
            >
              Log Out
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </>
  );
}
