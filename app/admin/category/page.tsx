'use client';

import styles from './styles.module.css';
import { useEffect, useState, useRef } from "react";
import { CategoryModel } from '@/app/Models/CategoryModel';
import { fetchAllCategoryAsync } from '@/app/services/categoryServices/fetchAllCategoryAsync';
import Image from 'next/image';
import { addCategory } from './script';

export default function Category() {
  const hasBeenCalledRef = useRef(false);
  const [categoryData, setCategoryData] = useState<CategoryModel[]>([]);
  const [isAddCategoryFormVisible, setIsFormVisible] = useState(false);

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

  const toggleFormVisibility = () => {
    setIsFormVisible(!isAddCategoryFormVisible);
  };

  return (
  <main className={styles.main}>
    <div className={`${styles.backgroundContainer} ${isAddCategoryFormVisible ? styles.overlayActive : ''}`}>
      <button
        className={styles.openFormAddCategory}
        title="Add category"
        onClick={toggleFormVisibility}
      >
        <Image src="/images/Plus.png" alt="Описание изображения" height={50} width={50} />
      </button>

      {isAddCategoryFormVisible && (
        <form className={styles.addCategoryForm}>
          <div className={styles.inputContainer}>
            <div className={styles.addCategoryContainer}>
              <h1>Add category</h1>
              <div className={styles.txtBox}>
                <input
                    id='categoryName'
                    type="text"
                    placeholder="Name category"
                />
                <i className='bx bx-user-circle'></i>
              </div>
                <input type="button" value="Add category" className={styles.buttonAddСategory} onClick={addCategory}/>
                <input type="button" value="Exit" className={styles.buttonBack} onClick={toggleFormVisibility}/>
            </div>
          </div>
        </form>
      )}

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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </main>
);
}