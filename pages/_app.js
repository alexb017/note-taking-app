import Nav from '@/components/Nav';
import Navbar from '@/components/Navbar';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <div className='container'>
        <Nav />
        <main className='main'>
          <Component {...pageProps} />
        </main>
      </div>
    </>
  )
}
