import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>Note Taking App</title>
        <meta name="description" content="Build a note-taking app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="home-container">
        <div className="home-content">
          <div className="home-content-top">
            <h1>Welcome to NoteTaking!</h1>
            <div className="home-box">
              <p>
                Bring <span className="home-i">i</span>
                <span className="home-d">d</span>
                <span className="home-e">e</span>
                <span className="home-a">a</span>
                <span className="home-s">s</span> to life{' '}
                <span className="emoji">✨</span>
              </p>
            </div>
          </div>
          <div className="nav-auth">
            <Link href="/login" className="auth-login">
              Login
            </Link>
            <Link href="/signup" className="auth-signup">
              Sign up
            </Link>
          </div>
          <p className="home-copy">
            &copy; 2024 NoteTaking <span className="emoji">✌️</span>
          </p>
        </div>
      </div>
    </>
  );
}
