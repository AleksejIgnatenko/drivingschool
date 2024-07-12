import { Inter } from "next/font/google";
import { Header } from "antd/es/layout/layout";
import { Menu } from "antd";
import Link from "next/link";
import styles from './page.module.css'; // Make sure the file path is correct

const inter = Inter({ subsets: ["latin"] });
const menuItems = [
  { key: "home", label: <Link href={"/"} style={{ color: "white" }}>Home</Link> },
  { key: "signIn", label: <Link href={"/login"} style={{ color: "white" }}>Login</Link> },
];

export default function Home() {
  return (
    <body className={`${inter.className} ${styles.body}`}>
      <Header className={styles.header}>
        <Menu
          items={menuItems}
          mode="horizontal"
          className={styles.menu}
        />
      </Header>
      <div className={styles.content}>
        <Link className={styles.text} href={"#backgroundImage"}>Welcome</Link>
      </div>

      <div id="backgroundImage" className={styles.backgroundImage}>
        
      </div>
    </body>
  );
}