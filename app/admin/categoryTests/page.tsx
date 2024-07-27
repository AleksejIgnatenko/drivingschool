'use client';

import styles from './styles.module.css';
import { useEffect, useState, useRef } from "react";
import { TestModel } from '@/app/Models/TestModel';
import { fetchGetCategoryTestsAsync } from '@/app/services/testServices/fetchGetCategoryTestsAsync';
import Image from 'next/image';
// import { addCategory, handleUpdateCategory, handleUpdateCategoryConfirm, handleDeleteCategory, handleDeleteCategoryConfirm, handleCancellation } from './script';

export default function CategoryTests({ searchParams }: { searchParams: { id: string } }) {
  const hasBeenCalledRef = useRef(false);
  const [testData, setTestData] = useState<TestModel[]>([]);
  const [isAddTestFormVisible, setIsFormVisible] = useState(false);
  useEffect(() => {
      if (!hasBeenCalledRef.current) {
          hasBeenCalledRef.current = true;
          getCategoryTestsAsync(searchParams.id);
      }
  }, []);

  const getCategoryTestsAsync = async (idCategory: string) => { 
    const tests = await fetchGetCategoryTestsAsync(idCategory);
    if (tests) {
      setTestData(tests);
    } else {
      // Обработка случая, когда данные о категориях недоступны
    }
  };

  const toggleFormVisibility = () => {
      setIsFormVisible(!isAddTestFormVisible);
  };

//   const handleAddTest = async () => { 
//       await addTest();
//       await getAllTestsAsync();
//   };

// const updateTestConfirm = async (test: TestModel, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => { 
//       await handleUpdateCategoryConfirm(test, event);
// };

// const deleteCategoryConfirm = async (test: TestModel, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => { 
//   await handleDeleteCategoryConfirm(test, event);
  
//   // Очистить состояние categoryData
//   setTestData([]);
  
//   await getAllTestsAsync();
// };

  return (
  <main className={styles.main}>
    <div className={`${styles.backgroundContainer} ${isAddTestFormVisible ? styles.overlayActive : ''}`}>
      <button
        className={styles.openFormAddCategory}
        title="Add category"
        onClick={toggleFormVisibility}
      >
        <Image src="/images/Plus.png" alt="Описание изображения" height={50} width={50} />
      </button>

      {isAddTestFormVisible && (
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
                <input type="button" value="Add category" className={styles.buttonAddСategory} />
                {/* onClick={handleAddCategory} */}
                <input type="button" value="Exit" className={styles.buttonBack} onClick={toggleFormVisibility}/>
            </div>
          </div>
        </form>
      )}

      <div className={styles.cardContainer}>
        {testData.map((test, index) => (
          <div key={index} className={styles.card} data-id={test.id}>
            <div className={styles.container}>
              <div className={styles.content}>
                <h3 data-id={test.id}>Id: {test.id}</h3>
                <h3 id={`categoryName-${test.id}`}>Name category: {test.nameCategory}</h3>
                <h3 id={`testName-${test.id}`}>Name test: {test.nameTest}</h3>
                <input
                  id={`categoryNameInput-${test.id}`}
                  type="text"
                  placeholder="New category name"
                  className={styles.inputText}
                />

                {/* <div className={styles.buttonContainer}>
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