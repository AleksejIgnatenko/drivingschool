'use client';

import styles from './styles.module.css';
import { useEffect, useState, useRef } from "react";
import { fetchAllUsersAsync, User } from '../../services/userServices/fetchAllUsersAsync';

export default function Users() {
  const hasBeenCalledRef = useRef(false);
const [userData, setUserData] = useState<User[]>([]);

  useEffect(() => {
    if (!hasBeenCalledRef.current) {
      hasBeenCalledRef.current = true;

        const getAllUsersAsync = async () => { 
        const users = await fetchAllUsersAsync();
        if (users) {
            setUserData(users); // Сохраняем данные о пользователях в состояние
                          console.log(users);
        } else {
            // Обработка случая, когда данные о пользователях недоступны
        }
        };

      getAllUsersAsync();
    }
  }, []);

  return (
    <main className={styles.main}>
        <div className={styles.backgroundContainer}>
          <div className={styles.firstRow}>
              {userData.map((user, index) => (
              <div key={index} className={styles.card}>
                  <div className={styles.container}>
                  <div className={styles.content}>
                      <h3>Id: {user.idUser}</h3>
                      <h3>User name: {user.userName}</h3>
                      <h3>Email: {user.email}</h3>
                      <h3>Role: {user.role}</h3>
                  </div>
                  </div>
              </div>
              ))}
          </div>
        </div>
    </main>
  );
}