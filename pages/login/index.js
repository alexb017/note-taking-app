import Head from 'next/head';
import Link from 'next/link';
import GoogleIcon from '../../components/icons/google';

export default function Login() {
  return (
    <>
      <Head>
        <title>NoteTaking - Login</title>
        <meta name="description" content="Login into notetaking app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="auth">
        <div className="auth-content">
          <div className="auth-title">
            <h1>Login</h1>
            <p>Welcome back! Please enter your details.</p>
          </div>
          <div className="form-auth-content">
            <form className="form-auth">
              <label htmlFor="email" className="form-label">
                Email address
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="form-input"
                  autoComplete="email"
                  placeholder="your@company.com"
                />
              </label>
              <label htmlFor="password" className="form-label">
                Password
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-input"
                  autoComplete="current-password"
                  placeholder="********"
                />
              </label>
              <input
                type="submit"
                value="Continue with Email"
                className="form-auth-submit"
              />
            </form>
            <button className="auth-google">
              <GoogleIcon classname="icon" />
              Sign in with Google
            </button>
          </div>
          <p className="login-text-signup">
            Don't have an account? <Link href="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </>
  );
}
