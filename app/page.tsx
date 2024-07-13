import { Inter } from "next/font/google";
import Link from "next/link";
import styles from './page.module.css'; // Make sure the file path is correct

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className={styles.backgroundImage}>
      <div className={styles.content}>
        <Link className={styles.text} href={"#backgroundImage"}>Welcome</Link>
      </div>
      <div id="backgroundImage" className={styles.backgroundImage1}/>
    </div>
  );
}