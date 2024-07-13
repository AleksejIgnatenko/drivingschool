import { Inter } from "next/font/google";
import Link from "next/link";
import { Layout, Menu } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import "./globals.css";
import styles from './page.module.css'; // Make sure the file path is correct

const inter = Inter({ subsets: ["latin"] });
const menuItems = [
  { key: "home", label: <Link href={"/"} style={{ color: "white" }}>Home</Link> },
  { key: "signIn", label: <Link href={"/login"} style={{ color: "white" }}>Login</Link> },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Layout>
          <Header className={styles.header}>
            <Menu
              items={menuItems}
              mode="horizontal"
              className={styles.menu}
            />
          </Header>
          <Content className={styles.content}>
            {children}
          </Content>
          <Footer className={styles.footer}>Footer</Footer>
        </Layout>
      </body>
    </html>
  );
}