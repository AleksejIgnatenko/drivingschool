'use client';

import styles from './styles.module.css';
import { useEffect, useState, useRef } from "react";
import { CategoryModel } from '@/app/Models/CategoryModel';
import { fetchGetAllCategoryAsync } from '@/app/services/categoryServices/fetchGetAllCategoryAsync';
import Image from 'next/image';
import { addCategory, handleUpdateCategory, handleUpdateCategoryConfirm, handleDeleteCategory, handleDeleteCategoryConfirm, handleCancellation } from './script';
import Link from 'next/link';

export default function Categories() {
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

  const toggleFormVisibility = () => {
      setIsFormVisible(!isAddCategoryFormVisible);
  };

  const handleAddCategory = async () => { 
      await addCategory();
      await getAllCategoryAsync();
  };

    const updateCategoryConfirm = async (category: CategoryModel, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => { 
      await handleUpdateCategoryConfirm(category, event);
  };

  const deleteCategoryConfirm = async (category: CategoryModel, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => { 
    await handleDeleteCategoryConfirm(category, event);
    
    // Очистить состояние categoryData
    setCategoryData([]);
    
    await getAllCategoryAsync();
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
                <input type="button" value="Add category" className={styles.buttonAddСategory} onClick={handleAddCategory}/>
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
                    id={`categoryNameInput-${category.id}`}
                    type="text"
                    placeholder="New category name"
                    className={styles.inputText}
                  />

                  <div className={styles.buttonContainer}>
                    <button
                      className={styles.buttonIssueModerator}
                      title="Update the category"
                      onClick={(event) => handleUpdateCategory(category, event)}
                    >
                      <Image src="/images/Pencil.png" alt="Описание изображения" height={20} width={20} />
                    </button>
                    <button 
                      className={styles.buttonConfirmModerator} 
                      title="Confirm update"
                      onClick={(event) => updateCategoryConfirm(category, event)}>
                      <Image src="/images/CheckMark.png" alt="Описание изображения" height={20} width={20} />
                    </button>
                    <button 
                      className={styles.buttonCancellationModerator} 
                      title="Cancellation update"
                      onClick={(event) => handleCancellation(category, event)}>
                        <Image src="/images/Cancellation.png" alt="Описание изображения" height={20} width={20} />
                    </button>

                    <button
                      className={styles.buttonIssueModerator}
                      title="Delete the category"
                      onClick={handleDeleteCategory}
                    >
                      <Image src="/images/Delete.png" alt="Описание изображения" height={20} width={20} />
                    </button>
                    <button 
                      className={styles.buttonConfirmModerator} 
                      title="Confirm delete"
                      onClick={(event) => deleteCategoryConfirm(category, event)}>
                      <Image src="/images/CheckMark.png" alt="Описание изображения" height={20} width={20} />
                    </button>
                    <button 
                      className={styles.buttonCancellationModerator} 
                      title="Cancellation delete"
                      onClick={(event) => handleCancellation(category, event)}>
                        <Image src="/images/Cancellation.png" alt="Описание изображения" height={20} width={20} />
                    </button>

                    <Link key={category.id} href={`/admin/categoryTests?id=${category.id}`}>
                      <Image src="/images/Test.png" alt="Описание изображения" height={20} width={20} className={styles.categoryTests} />
                    </Link>
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