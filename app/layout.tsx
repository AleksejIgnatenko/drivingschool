
'use client'

import { Inter } from "next/font/google";
import Link from "next/link";
import { Layout, Menu } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import "./globals.css";
import styles from './page.module.css'; 
import { useEffect, useState, useRef } from "react";
import Cookies from 'js-cookie';
import { isAdminOrModeratorAsync } from "./services/userServices/isAdminOrModeratorAsync";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
const [menuItems, setMenuItems] = useState<any[]>([]);
  const hasBeenCalledRef = useRef(false);

  useEffect(() => {
    const checkUserRoleAsync = async () => {
      if (!hasBeenCalledRef.current) {
        hasBeenCalledRef.current = true;

        // Проверяем наличие файла cookie с именем 'jwtToken'
        const jwtToken = Cookies.get('jwtToken');
        const isAdminOrModerator = await isAdminOrModeratorAsync();

        if (jwtToken && isAdminOrModerator) {
          // Eсли есть cookie и роль admin или moderator
          const menuItems = [
            { key: "home", label: <Link href={"/admin"} style={{ color: "white" }}>Home</Link> },
            { key: "profile", label: <Link href={"/profile"} style={{ color: "white" }}>Profile</Link> },
          ];
          setMenuItems(menuItems);
        } else if (jwtToken ) {
          //Если есть файлы cookie
          const menuItems = [
            { key: "home", label: <Link href={"/"} style={{ color: "white" }}>Home</Link> },
            { key: "profile", label: <Link href={"/profile"} style={{ color: "white" }}>Profile</Link> },
          ];
          setMenuItems(menuItems);
        } else {
          // Если файла cookie нет
          const menuItems = [
            { key: "home", label: <Link href={"/"} style={{ color: "white" }}>Home</Link> },
            { key: "signIn", label: <Link href={"/login"} style={{ color: "white" }}>Login</Link> },
          ];
          setMenuItems(menuItems);
        }

        // Проверка на наличие роли admin или moderator
        if (window.location.pathname === '/') {
          const isAdminOrModeratorResult = await isAdminOrModeratorAsync();
          if (isAdminOrModeratorResult) {
            // Если пользователь является админом или модератором и находится на странице "/"
            window.location.href = '/admin';
          }
        } else if (window.location.pathname.includes('/admin')) {
          const isAdminOrModeratorResult = await isAdminOrModeratorAsync();
          if (!isAdminOrModeratorResult) {
            // Если пользователь не является админом или модератором и находится на странице "/admin"
            window.location.href = '/';
          }
        }

        if ((window.location.pathname === '/login' && jwtToken) || (window.location.pathname === '/register' && jwtToken)) {
          window.location.href = '/profile';
        }

        if (window.location.pathname === '/profile' && !jwtToken) {
          window.location.href = '/login';
        }
      }
    };

    checkUserRoleAsync();
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
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
          </Layout>
        {/* <Footer className={styles.footer}>Footer</Footer> */}
      </body>
    </html>
  );
}