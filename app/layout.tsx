'use client'

import { Inter } from "next/font/google";
import Link from "next/link";
import { Layout, Menu } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import "./globals.css";
import styles from './page.module.css'; 
import { useEffect, useState, useRef } from "react";
import Cookies from 'js-cookie';
import { isAdmin } from "./services/userServices/isAdmin";

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
  // Проверяем наличие файла cookie с именем 'jwtToken'
  if (!hasBeenCalledRef.current) {
    hasBeenCalledRef.current = true;
    const jwtToken = Cookies.get('jwtToken');
    if (!cookieChecked) {
      if (jwtToken) {
        // Если файл cookie есть, добавляем новый элемент в массив menuItems
        const updatedMenuItems = [...menuItems, { key: "profile", label: <Link href={"/profile"} style={{ color: "white" }}>Profile</Link> }];
        setMenuItemsUpdated(updatedMenuItems);

        // Вызываем функцию isAdmin с использованием ключевого слова await
        const checkAdminStatus = async () => {
          try {
            const isAdminResult = await isAdmin();
            if (isAdminResult) {
              if (window.location.pathname !== "/admin") {
                window.location.href = '/admin'; 
              }
            }
          } catch (error) {
            // Обработка ошибки
          }
        };

        checkAdminStatus();
        
      } else {
        // Если файл cookie не существует, добавляем другой элемент в массив menuItems
        const updatedMenuItems = [...menuItems, { key: "signIn", label: <Link href={"/login"} style={{ color: "white" }}>Login</Link> }];
        setMenuItemsUpdated(updatedMenuItems);
      }
      setCookieChecked(true);
    }

    if ((window.location.pathname === '/login' && jwtToken) || (window.location.pathname === '/register' && jwtToken)) {
      window.location.href = '/profile'; 
    }
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [cookieChecked]);

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