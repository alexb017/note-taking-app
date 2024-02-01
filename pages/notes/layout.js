import NavbarLeft from '../../components/NavbarLeft';

export default function Layout({ children }) {
  return (
    <div className="container">
      <NavbarLeft />
      <main className="main-notes">{children}</main>
    </div>
  );
}
