'use client';

import styles from './styles.module.css';
import { useEffect, useState, useRef } from "react";
import { CategoryModel } from '@/app/Models/CategoryModel';
import { fetchAllCategoryAsync } from '@/app/services/categoryServices/fetchAllCategoryAsync';
import Image from 'next/image';

export default function Users() {
  const hasBeenCalledRef = useRef(false);
  const [categoryData, setCategoryData] = useState<CategoryModel[]>([]);

  useEffect(() => {
    if (!hasBeenCalledRef.current) {
      hasBeenCalledRef.current = true;

      const getAllCategoryAsync = async () => { 
        const categories = await fetchAllCategoryAsync();
        if (categories) {
          setCategoryData(categories);
        } else {
          // Обработка случая, когда данные о пользователях недоступны
        }
      };

      getAllCategoryAsync();
    }
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.backgroundContainer}>
        <div className={styles.cardContainer}>
          {categoryData.map((category, index) => (
            <div key={index} className={styles.card} data-id={category.id}>
              <div className={styles.container}>
                <div className={styles.content}>
                  <h3 data-id={category.id}>Id: {category.id}</h3>
                  <h3 id={`categoryName-${category.id}`}>Name category: {category.nameCategory}</h3>
                  <input
                    id={`nameChangeInput-${category.id}`}
                    type="text"
                    placeholder="New category name"
                    className={styles.inputText}
                  />
                  {/* <div className={styles.buttonContainer}>
                    <button
                      className={styles.buttonIssueModerator}
                      title="Issue a Moderator"
                      onClick={(event) => handleIssueModerator(event)}
                    >
                      <Image src="/images/AddModerator.png" alt="Описание изображения" height={20} width={20} />
                    </button>
                    <button 
                      className={styles.buttonConfirmModerator} 
                      title="Confirm"
                      onClick={(event) => handleAddModeratorRole(user, event)}>
                      <Image src="/images/CheckMark.png" alt="Описание изображения" height={20} width={20} />
                    </button>
                    <button 
                      className={styles.buttonCancellationModerator} 
                      title="Cancellation"
                      onClick={(event) => handleCancellation(user, event)}>
                      <Image src="/images/Cancellation.png" alt="Описание изображения" height={20} width={20} />
                    </button>

                    <button 
                      className={styles.buttonDeleteModerator} 
                      title="Delete a Moderator"
                      onClick={(event) => handleDeleteModerator(event)}>
                      <Image src="/images/DeleteModerator.png" alt="Описание изображения" height={20} width={20} />
                    </button>
                    <button 
                      className={styles.buttonConfirmDeleteModerator} 
                      title="Confirm"
                      onClick={(event) => handleDeleteModeratorRole(user, event)}>
                      <Image src="/images/CheckMark.png" alt="Описание изображения" height={20} width={20} />
                    </button>
                    <button 
                      className={styles.buttonCancellationDeleteModerator} 
                      title="Cancellation"
                      onClick={(event) => handleCancellation(user, event)}>
                      <Image src="/images/Cancellation.png" alt="Описание изображения" height={20} width={20} />
                    </button>

                    <button 
                      className={styles.buttonNameChange} 
                      title="Name change"
                      onClick={(event) => handleNameChange(user, event)}>
                      <Image src="/images/Pencil.png" alt="Описание изображения" height={20} width={20} />
                    </button>
                    <button 
                      className={styles.buttonConfirmNameChange} 
                      title="Confirm"
                      onClick={(event) => handleNameChangeConfirm(user, event)}>
                      <Image src="/images/CheckMark.png" alt="Описание изображения" height={20} width={20} />
                    </button>
                    <button 
                      className={styles.buttonCancellationNameChange} 
                      title="Cancellation"
                      onClick={(event) => handleCancellation(user, event)}>
                      <Image src="/images/Cancellation.png" alt="Описание изображения" height={20} width={20} />
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}