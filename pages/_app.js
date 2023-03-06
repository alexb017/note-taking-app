import Navbar from '@/components/Navbar'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <div className='container'>
      <Navbar />
      <main className='main'>
        <Component {...pageProps} />
      </main>
    </div>
  )
}
