'use client';

import { UserModel } from '../Models/UserModel/UserModel';
import styles from './styles.module.css'; // Убедитесь, что путь к файлу указан правильно
import { useEffect, useState, useRef } from "react";
import { getUserByIdAsync } from '../services/userServices/getUserByIdAsync';
import { handleBackClickAsync, handleNameChangeAsync, handleConfirmEditUserName, handleCancellationEditUserName } from './script';
import Image from 'next/image';

export default function Login() {
  const hasBeenCalledRef = useRef(false);
  const [userData, setUserData] = useState<UserModel | null>(null);

  useEffect(() => {
    if (!hasBeenCalledRef.current) {
      hasBeenCalledRef.current = true;

      const getUserInfoByIdAsync = async () => {
        const userData = await getUserByIdAsync();
        if (userData) {
          setUserData(userData); // Сохраняем данные о пользователе в состояние
        } else {
          // Обработка случая, когда данные о пользователе недоступны
        }
      };

      getUserInfoByIdAsync();
    }
  }, []);

  return (
    <div className={styles.backgroundContainer}>
      <div className={styles.lableContainer}>
        <div className={styles.container}>
          <h1 className={styles.heading}>Profile</h1>
          <div className={styles.h3Box}>
            <h3 id={'userName'}>Name: {userData?.userName}</h3> {/* Отображаем имя пользователя из состояния */}
            <input
              id={'nameChangeInput'}
              type="text"
              placeholder="New Username"
              className={styles.inputText}
            />
            <h3>Email: {userData?.email}</h3> {/* Отображаем email пользователя из состояния */}
            {
              userData?.resultsTests && Object.entries(userData.resultsTests).map(([category, results], index) => (
                <h3 key={index}>
                  {category}: {results.join(", ")}
                </h3>
              ))
            }
          </div>
          <div className={styles.buttonContainer}>
            <button 
              id='buttonEditUserName'
              className={styles.buttonNameChange} 
              title="Name change"
              onClick={() => handleNameChangeAsync(userData!)}>
              <Image src="/images/Pencil.png" alt="Описание изображения" height={20} width={20} />
            </button>
            <button 
              id='buttonConfirmEditUserName'
              className={styles.buttonConfirmNameChange} 
              title="Confirm"
              onClick={() => handleConfirmEditUserName(userData!)}>
              <Image src="/images/CheckMark.png" alt="Описание изображения" height={20} width={20} />
            </button>
            <button 
              id='buttonCancellationEditUserName'
              className={styles.buttonCancellationNameChange} 
              title="Cancellation"
              onClick={handleCancellationEditUserName}>
              <Image src="/images/Cancellation.png" alt="Описание изображения" height={20} width={20} />
            </button>
          </div>
          <input type="button" value="Back" className={styles.buttonBack} onClick={handleBackClickAsync} />
        </div>
      </div>
    </div>
  );
}