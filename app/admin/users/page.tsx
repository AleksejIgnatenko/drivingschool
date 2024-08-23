'use client';

import styles from './styles.module.css';
import { useEffect, useState, useRef, use } from "react";
import { fetchAllUsersAsync } from '../../services/userServices/fetchAllUsersAsync';
import { UserModel } from '@/app/Models/UserModel/UserModel';
import Image from 'next/image';
import { handleIssueModeratorAsync, handleAddModeratorRoleAsync, handleCancellationAsync, handleDeleteModeratorAsync, handleDeleteModeratorRoleAsync, handleNameChangeAsync, handleNameChangeConfirmAsync } from './script';

export default function Users() {
  const hasBeenCalledRef = useRef(false);
  const [userData, setUserData] = useState<UserModel[]>([]);

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
            <div key={index} className={styles.card} data-id={user.id}>
              <div className={styles.container}>
                <div className={styles.content}>
                  <h3 data-id={user.id}>Id: {user.id}</h3>
                  <h3 id={`userName-${user.id}`}>User name: {user.userName}</h3>
                  <input
                    id={`nameChangeInput-${user.id}`}
                    type="text"
                    placeholder="New Username"
                    className={styles.inputText}
                  />
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
                      onClick={(event) => handleIssueModeratorAsync(event)}
                    >
                      <Image src="/images/AddModerator.png" alt="Описание изображения" height={20} width={20} />
                    </button>
                    <button 
                      className={styles.buttonConfirmModerator} 
                      title="Confirm"
                      onClick={(event) => handleAddModeratorRoleAsync(user, event)}>
                      <Image src="/images/CheckMark.png" alt="Описание изображения" height={20} width={20} />
                    </button>
                    <button 
                      className={styles.buttonCancellationModerator} 
                      title="Cancellation"
                      onClick={(event) => handleCancellationAsync(user, event)}>
                      <Image src="/images/Cancellation.png" alt="Описание изображения" height={20} width={20} />
                    </button>

                    <button 
                      className={styles.buttonDeleteModerator} 
                      title="Delete a Moderator"
                      onClick={(event) => handleDeleteModeratorAsync(event)}>
                      <Image src="/images/DeleteModerator.png" alt="Описание изображения" height={20} width={20} />
                    </button>
                    <button 
                      className={styles.buttonConfirmDeleteModerator} 
                      title="Confirm"
                      onClick={(event) => handleDeleteModeratorRoleAsync(user, event)}>
                      <Image src="/images/CheckMark.png" alt="Описание изображения" height={20} width={20} />
                    </button>
                    <button 
                      className={styles.buttonCancellationDeleteModerator} 
                      title="Cancellation"
                      onClick={(event) => handleCancellationAsync(user, event)}>
                      <Image src="/images/Cancellation.png" alt="Описание изображения" height={20} width={20} />
                    </button>

                    <button 
                      className={styles.buttonNameChange} 
                      title="Name change"
                      onClick={(event) => handleNameChangeAsync(user, event)}>
                      <Image src="/images/Pencil.png" alt="Описание изображения" height={20} width={20} />
                    </button>
                    <button 
                      className={styles.buttonConfirmNameChange} 
                      title="Confirm"
                      onClick={(event) => handleNameChangeConfirmAsync(user, event)}>
                      <Image src="/images/CheckMark.png" alt="Описание изображения" height={20} width={20} />
                    </button>
                    <button 
                      className={styles.buttonCancellationNameChange} 
                      title="Cancellation"
                      onClick={(event) => handleCancellationAsync(user, event)}>
                      <Image src="/images/Cancellation.png" alt="Описание изображения" height={20} width={20} />
                    </button>
                  </div>
                </div>
              </div>
            <p id={`errorMessages-${user.id}`} className={styles.errorMessages}></p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}