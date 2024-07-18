'use client';

import styles from './styles.module.css'; // Убедитесь, что путь к файлу указан правильно
import Link from 'next/link';
import { useEffect, useState, useRef } from "react";
import { getUserByIdAsync, Users } from '../services/userServices/getUserInfornation';

export default function Login() {
  const hasBeenCalledRef = useRef(false);
  const [userData, setUserData] = useState<Users | null>(null);

  useEffect(() => {
    if (!hasBeenCalledRef.current) {
      hasBeenCalledRef.current = true;
    }
  }, []);

  return (
    <div className={styles.backgroundContainer}>
      <div className={styles.lableContainer}>
        <div className={styles.container}>
          <h1 className={styles.heading}>Admin</h1>
          <div className={styles.h3Box}>
            <h3>Name: {userData?.userName}</h3> {/* Отображаем имя пользователя из состояния */}
            <h3>Email: {userData?.email}</h3> {/* Отображаем email пользователя из состояния */}
            {
              userData?.resultsTests && Object.entries(userData.resultsTests).map(([category, results], index) => (
                <h3 key={index}>
                  {category}: {results.join(", ")}
                </h3>
              ))
            }
          </div>
          <Link href={"/"}>
            <input type="button" value="Back" className={styles.buttonBack} />
          </Link>
        </div>
      </div>
    </div>
  );
}