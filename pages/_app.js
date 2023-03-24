import Nav from '@/components/Nav';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <div className='container'>
        <Nav />
        <main className='main'>
          <Component {...pageProps} />
        </main>
      </div>
    </>
  )
}
