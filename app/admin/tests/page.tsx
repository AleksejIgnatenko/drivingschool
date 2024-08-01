'use client';

import styles from './styles.module.css';
import { useEffect, useState, useRef } from "react";
import { TestModel } from '@/app/Models/TestModel/TestModel';
import { CategoryModel } from '@/app/Models/CategoryModel/CategoryModel';
import { fetchGetAllTestsAsync } from '@/app/services/testServices/fetchGetAllTestsAsync';
import { fetchGetAllCategoryAsync } from '@/app/services/categoryServices/fetchGetAllCategoryAsync';
import Image from 'next/image';
import { addTest, handleUpdateTest, handleUpdateTestConfirm, handleDeleteTest, handleDeleteTestConfirm, handleCancellation } from './script';
import Link from 'next/link';

export default function Tests() {
  const hasBeenCalledRef = useRef(false);
  const [categoryData, setCategoryData] = useState<CategoryModel[]>([]);
  const [testData, setTestData] = useState<TestModel[]>([]);
  const [isAddTestFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
      if (!hasBeenCalledRef.current) {
          hasBeenCalledRef.current = true;

          getAllCategoryAsync();
          getAllTestsAsync();
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

  const getAllTestsAsync = async () => { 
    const tests = await fetchGetAllTestsAsync();
    if (tests) {
      setTestData(tests);
    } else {
      // Обработка случая, когда данные о категориях недоступны
    }
  };

  const toggleFormVisibility = () => {
      setIsFormVisible(!isAddTestFormVisible);
  };

  const handleAddTest = async () => { 
      await addTest();
      await getAllTestsAsync();
  };

const deleteTestConfirm = async (test: TestModel, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => { 
  await handleDeleteTestConfirm(test, event);
  
  // Очистить состояние categoryData
  setTestData([]);
  
  await getAllTestsAsync();
};

  return (
  <main className={styles.main}>
    <div className={`${styles.backgroundContainer} ${isAddTestFormVisible ? styles.overlayActive : ''}`}>
      <button
        className={styles.openFormAddTest}
        title="Add test"
        onClick={toggleFormVisibility}
      >
        <Image src="/images/Plus.png" alt="Описание изображения" height={50} width={50} />
      </button>

      {isAddTestFormVisible && (
        <form className={styles.addTestForm}>
          <div className={styles.inputContainer}>
            <div className={styles.addTestContainer}>
              <h1>Add test</h1>
              <div className={styles.txtBox}>
                <select id="categories" className={`${styles.dropdown}`}>
                  {categoryData.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.nameCategory}
                    </option>
                  ))}
                </select>
                <i className='bx bx-chevron-down'></i>
              </div>
              <div className={styles.txtBox}>
                <input
                  id='testName'
                  type="text"
                  placeholder="Name test"
                />
                <i className='bx bx-user-circle'></i>
              </div>
              <input type="button" value="Add test" className={styles.buttonAddTest}onClick={handleAddTest} />
              <input type="button" value="Back" className={styles.buttonBack} onClick={toggleFormVisibility}/>
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
                <select id={`dropdownCategories-${test.id}`} className={`${styles.dropdownUpdateCategory}`}>
                  {categoryData.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.nameCategory}
                    </option>
                  ))}
                </select>
                <input
                  id={`updateTestNameInput-${test.id}`}
                  type="text"
                  placeholder="New test name"
                  className={styles.inputText}
                />

                <div className={styles.buttonContainer}>
                  <button
                    className={styles.buttonUpdateTest}
                    title="Update the test"
                    onClick={(event) => handleUpdateTest(test, event)}
                  >
                    <Image src="/images/Pencil.png" alt="Описание изображения" height={20} width={20} />
                  </button>
                  <button 
                    className={styles.buttonConfirmUpdateTest} 
                    title="Confirm update"
                    onClick={(event) => handleUpdateTestConfirm(test, event)}
                  >
                     <Image src="/images/CheckMark.png" alt="Описание изображения" height={20} width={20} />
                  </button>
                  <button 
                    className={styles.buttonCancellationUpdateTest} 
                    title="Cancellation update"
                    onClick={(event) => handleCancellation(test, event)}
                  >
                      <Image src="/images/Cancellation.png" alt="Описание изображения" height={20} width={20} />
                  </button>

                  <button
                    className={styles.buttonDeleteTest}
                    title="Delete the test"
                    onClick={handleDeleteTest}
                  >
                    <Image src="/images/Delete.png" alt="Описание изображения" height={20} width={20} />
                  </button>
                  <button 
                    className={styles.buttonConfirmDeleteTest} 
                    title="Confirm delete"
                    onClick={(event) => deleteTestConfirm(test, event)}
                  >
                     <Image src="/images/CheckMark.png" alt="Описание изображения" height={20} width={20} />
                  </button>
                  <button 
                    className={styles.buttonCancellationDeleteTest} 
                    title="Cancellation delete"
                    onClick={(event) => handleCancellation(test, event)}
                  >
                      <Image src="/images/Cancellation.png" alt="Описание изображения" height={20} width={20} />
                  </button>

                  <Link key={test.id} href={`/admin/testQuestions?id=${test.id}`} title='Test questions'>
                    <Image src="/images/Question.png" alt="Описание изображения" height={20} width={20} className={styles.testQuestions} />
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