import Link from 'next/link';
import { useRouter } from 'next/router';
import Icon from './Icon';

export default function NavbarLeft() {
  const router = useRouter();

  return (
    <div className="navbar-left-content">
      <ul className="ul-nav-left">
        <li className="li-nav-left">
          <Link
            href="/notes"
            className={router.pathname === '/notes' ? 'active' : ''}
          >
            <Icon iconName="iconLightbulb" />
            <div className="hide-on-mobile">Notes</div>
          </Link>
        </li>
        <li className="li-nav-left">
          <Link
            href="/notes/reminders"
            className={router.pathname === '/notes/reminders' ? 'active' : ''}
          >
            <Icon iconName="iconAlert" />
            <div className="hide-on-mobile">Reminders</div>
          </Link>
        </li>
        <li className="li-nav-left">
          <Link
            href="/notes/archive"
            className={router.pathname === '/notes/archive' ? 'active' : ''}
          >
            <Icon iconName="iconArchive" />
            <div className="hide-on-mobile">Archive</div>
          </Link>
        </li>
        <li className="li-nav-left">
          <Link
            href="/notes/trash"
            className={router.pathname === '/notes/trash' ? 'active' : ''}
          >
            <Icon iconName="iconTrash" />
            <div className="hide-on-mobile">Trash</div>
          </Link>
        </li>
      </ul>
    </div>
  );
}
