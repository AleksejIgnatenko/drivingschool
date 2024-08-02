
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
const menuItems = [
  { key: "home", label: <Link href={"/"} style={{ color: "white" }}>Home</Link> },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cookieChecked, setCookieChecked] = useState(false);
  const [menuItemsUpdated, setMenuItemsUpdated] = useState(menuItems);
  const hasBeenCalledRef = useRef(false);

  useEffect(() => {
    if (!hasBeenCalledRef.current) {
      hasBeenCalledRef.current = true;

      // Проверяем наличие файла cookie с именем 'jwtToken'
      const jwtToken = Cookies.get('jwtToken');

      // Если файл cookie есть, добавляем новый элемент в массив menuItems
      const updatedMenuItems = [...menuItems, { key: "profile", label: <Link href={"/profile"} style={{ color: "white" }}>Profile</Link> }];
      setMenuItemsUpdated(updatedMenuItems);

      // Вызываем функцию isAdminOrModerator с использованием ключевого слова await
      const checkIsAdminOrModerator = async () => {
        try {
          // Проверяем, если пользователь находится на главной странице "/"
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
        } catch (error) {
          // Обработка ошибки
        }
      };

      checkIsAdminOrModerator();

      // Если файл cookie не существует, добавляем другой элемент в массив menuItems
      if (!jwtToken) {
        const updatedMenuItems = [...menuItems, { key: "signIn", label: <Link href={"/login"} style={{ color: "white" }}>Login</Link> }];
        setMenuItemsUpdated(updatedMenuItems);
      }

      if ((window.location.pathname === '/login' && jwtToken) || (window.location.pathname === '/register' && jwtToken)) {
        window.location.href = '/profile'; 
      }

      if (window.location.pathname === '/profile' && !jwtToken) {
        window.location.href = '/login';
      }

      setCookieChecked(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
          <Layout>
            <Header className={styles.header}>
             <Menu
                items={menuItemsUpdated}
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
