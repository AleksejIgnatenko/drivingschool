'use client';

import styles from './styles.module.css';
import { useEffect, useState, useRef } from "react";
import { CategoryModel } from '@/app/Models/CategoryModel/CategoryModel';
import { fetchGetAllCategoryAsync } from '@/app/services/categoryServices/fetchGetAllCategoryAsync';
import Image from 'next/image';
import { handleAddCategoryAsync, handleUpdateCategoryAsync, handleUpdateCategoryConfirmAsync, handleDeleteCategoryAsync, handleDeleteCategoryConfirmAsync, handleCancellationAsync } from './script';
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

  const addCategoryAsync = async () => { 
      await handleAddCategoryAsync();
      await getAllCategoryAsync();
  };

  const deleteCategoryConfirmAsync = async (category: CategoryModel, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => { 
    await handleDeleteCategoryConfirmAsync(category, event);
    
    // Очистить состояние categoryData
    setCategoryData([]);
    
    await getAllCategoryAsync();
  };

  return (
  <main>
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
                <input type="button" value="Add category" className={styles.buttonAddСategory} onClick={addCategoryAsync}/>
                <input type="button" value="Back" className={styles.buttonBack} onClick={toggleFormVisibility}/>
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
                      className={styles.buttonUpdateCategory}
                      title="Update the category"
                      onClick={(event) => handleUpdateCategoryAsync(category, event)}
                    >
                      <Image src="/images/Pencil.png" alt="Описание изображения" height={20} width={20} />
                    </button>
                    <button 
                      className={styles.buttonConfirmUpdateCategory} 
                      title="Confirm update"
                      onClick={(event) => handleUpdateCategoryConfirmAsync(category, event)}>
                      <Image src="/images/CheckMark.png" alt="Описание изображения" height={20} width={20} />
                    </button>
                    <button 
                      className={styles.buttonCancellationUpdateCategory} 
                      title="Cancellation update"
                      onClick={(event) => handleCancellationAsync(category, event)}>
                        <Image src="/images/Cancellation.png" alt="Описание изображения" height={20} width={20} />
                    </button>

                    <button
                      className={styles.buttonDeleteCategory}
                      title="Delete the category"
                      onClick={handleDeleteCategoryAsync}
                    >
                      <Image src="/images/Delete.png" alt="Описание изображения" height={20} width={20} />
                    </button>
                    <button 
                      className={styles.buttonConfirmDeleteCategory} 
                      title="Confirm delete"
                      onClick={(event) => deleteCategoryConfirmAsync(category, event)}>
                      <Image src="/images/CheckMark.png" alt="Описание изображения" height={20} width={20} />
                    </button>
                    <button 
                      className={styles.buttonCancellationDeleteCategory} 
                      title="Cancellation delete"
                      onClick={(event) => handleCancellationAsync(category, event)}>
                        <Image src="/images/Cancellation.png" alt="Описание изображения" height={20} width={20} />
                    </button>

                    <Link key={category.id} href={`/admin/categoryTests?id=${category.id}`} title='Category tests'>
                      <Image src="/images/Test.png" alt="Описание изображения" height={20} width={20} className={styles.categoryTests} />
                    </Link>
                  </div>
                </div>
              </div>
              <p id='errorMessages' className={styles.errorMessages}></p>
            </div>
        ))}
      </div>
    </div>
  </main>
);
}