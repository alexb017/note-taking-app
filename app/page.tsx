import Link from 'next/link';
import LoginIcon from '../components/icons/login';
import styles from './home.module.css';

export default function Home() {
  return (
    <>
      <div className={styles.homeContainer}>
        <div className={styles.homeContent}>
          <div className={styles.homeContentTop}>
            <h1 className={styles.homeContentH1}>Welcome to NoteTaking!</h1>
            <div className={styles.homeBox}>
              <p>
                Bring <span className={styles.homeI}>i</span>
                <span className={styles.homeD}>d</span>
                <span className={styles.homeE}>e</span>
                <span className={styles.homeA}>a</span>
                <span className={styles.homeS}>s</span>✨<br></br> to life
              </p>
            </div>
          </div>
          <div className={styles.authFlex}>
            <Link href="/login" className={styles.authLogin}>
              <LoginIcon classname={styles.iconWh} /> Login
            </Link>
            <Link href="/signup" className={styles.authSignup}>
              Sign up
            </Link>
          </div>
          <p className={styles.homeCopy}>&copy; 2024 NoteTaking ✌️</p>
        </div>
      </div>
    </>
  );
}
