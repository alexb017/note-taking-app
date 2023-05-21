import Navbar from '@/components/Navbar';
import NavbarLeft from '@/components/NavbarLeft';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <div className='container'>
        <NavbarLeft />
        <main className='main'>
          <Component {...pageProps} />
        </main>
      </div>
    </>
  )
}
