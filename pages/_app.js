import Navbar from '@/components/Navbar';
import NavbarLeft from '@/components/NavbarLeft';
import Layout from '@/components/layout';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <div className='container'>
        <NavbarLeft />
        <main className='main'>
          <Component {...pageProps} />
        </main>
      </div>
    </Layout>
  )
}
