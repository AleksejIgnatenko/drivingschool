'use client';

import styles from './styles.module.css';
import { useEffect, useState, useRef } from "react";
import { fetchAllUsersAsync, User } from '../../services/userServices/fetchAllUsersAsync';
import Link from 'next/link';
import Image from 'next/image';
import { handleIssueModerator, handleCancellation, handleDeleteModerator } from './script';

export default function Users() {
  const hasBeenCalledRef = useRef(false);
  const [userData, setUserData] = useState<User[]>([]);

  useEffect(() => {
    if (!hasBeenCalledRef.current) {
      hasBeenCalledRef.current = true;

      const getAllUsersAsync = async () => { 
        const users = await fetchAllUsersAsync();
        if (users) {
          setUserData(users);
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
      <div className={styles.cardContainer}>
        {userData.map((user, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.container}>
              <div className={styles.content}>
                <h3 data-id={user.idUser}>Id: {user.idUser}</h3>
                <h3>User name: {user.userName}</h3>
                <h3>Email: {user.email}</h3>
                <h3>Role: {user.role}</h3>
                {userData[index]?.resultsTests && Object.entries(userData[index].resultsTests).map(([category, results], index) => (
                  <div key={index}>
                    <h3>{category}: {results.join(", ")}</h3>
                  </div>
                ))}
                <div className={styles.buttonContainer}>
                  <button
                    className={styles.buttonIssueModerator}
                    title="Issue a Moderator"
                    onClick={(event) => handleIssueModerator(event)}
                  >
                    <Image src="/images/AddModerator.png" alt="Описание изображения" height={20} width={20} />
                  </button>
                  <button 
                    className={styles.buttonConfirmModerator} 
                    title="Confirm">
                    <Image src="/images/CheckMark.png" alt="Описание изображения" height={20} width={20} />
                  </button>
                  <button 
                    className={styles.buttonCancellationModerator} 
                    title="Cancellation"
                    onClick={(event) => handleCancellation(event)}>
                    <Image src="/images/Cancellation.png" alt="Описание изображения" height={20} width={20} />
                  </button>
                  <button 
                    className={styles.buttonDeleteModerator} 
                    title="Delete a Moderator"
                    onClick={(event) => handleDeleteModerator(event)}>
                    <Image src="/images/DeleteModerator.png" alt="Описание изображения" height={20} width={20} />
                  </button>
                  <button 
                    className={styles.buttonConfirmModerator} 
                    title="Confirm">
                    <Image src="/images/CheckMark.png" alt="Описание изображения" height={20} width={20} />
                  </button>
                  <button 
                    className={styles.buttonCancellationModerator} 
                    title="Cancellation"
                    onClick={(event) => handleCancellation(event)}>
                    <Image src="/images/Cancellation.png" alt="Описание изображения" height={20} width={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </main>
);
}