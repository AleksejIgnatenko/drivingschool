'use client';

import styles from './page.module.css'; // Make sure the file path is correct
import { useEffect, useState, useRef } from "react";
import { CategoryModel } from '@/app/Models/CategoryModel/CategoryModel';
import { fetchGetAllCategoryAsync } from '@/app/services/categoryServices/fetchGetAllCategoryAsync';
import { handleGetTestCategory } from './script';

export default function Home() {
  const hasBeenCalledRef = useRef(false);
  const [categoryData, setCategoryData] = useState<CategoryModel[]>([]);
  const [isAddCategoryFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
      if (!hasBeenCalledRef.current) {
          hasBeenCalledRef.current = true;

          getAllCategoryAsync();
      }
  }, []);

  const getAllCategoryAsync = async () => { 
    const categories = await fetchGetAllCategoryAsync();
    if (categories) {
      setCategoryData(categories);
    } else {
      // Обработка случая, когда данные о категориях недоступны
    }
  };
  return (
    <main className={styles.main}>
      <div className={`${styles.backgroundContainer}`}>
        <div className={styles.cardContainer}>
          {categoryData.map((category, index) => (
          <button
            key={category.id}
            title={`Test ${category.nameCategory}`}
            className={styles.button}
            onClick={() => handleGetTestCategory(category.id)}
          >
            <div className={styles.card} data-id={category.id}>
              <div className={styles.container}>
                <div className={styles.content}>
                  <h3 data-id={category.id} className={styles.categoryId}>Id: {category.id}</h3>
                  <h3 id={`categoryName-${category.id}`}>Name category: {category.nameCategory}</h3>
                </div>
              </div>
            </div>
          </button>
           ))}
        </div>
      </div>
    </main>
  );
}
