import { Inter } from "next/font/google";
import Link from "next/link";
import styles from './page.module.css'; // Make sure the file path is correct

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={styles.main}>
      <div id="backgroundImage1" className={styles.backgroundImage} style={{ backgroundImage: `url('/images/MainPage.png')` }}>
        <div className={styles.content}>
          <Link className={styles.text} href={"#backgroundImage"}>Welcome</Link>
        </div>
      </div>
      <div id="backgroundImage" className={styles.backgroundImage} style={{ backgroundImage: `url('/images/MainPage.png')` }}>
        <div className={styles.content1}>
          <Link className={styles.text} href={"#backgroundImage1"}>Welcome</Link>
        </div>
      </div>
    </main>
  );
}