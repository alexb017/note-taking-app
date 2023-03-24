import Navbar from '@/components/Navbar';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <div className='container'>
        <main className='main'>
          <Component {...pageProps} />
        </main>
      </div>
    </>
  )
}
