'use client';

import styles from './styles.module.css';
import { useEffect, useState, useRef } from "react";
import { TestModel } from '@/app/Models/TestModel/TestModel';
import { QuestionModel } from '@/app/Models/QuestionModel/QuestionModel';
import { fetchGetTestQuestionsAsync } from '@/app/services/questionServices/fetchGetTestQuestionsAsync';
import { fetchGetAllTestsAsync } from '@/app/services/testServices/fetchGetAllTestsAsync';
import Image from 'next/image';
import { handleAddQuestionAsync, handleUpdateQuestionAsync, handleUpdateQuestionConfirmAsync, handleDeleteQuestionAsync, handleDeleteQuestionConfirmAsync, handleCancellationAsync } from './script';

export default function TestQuestions({ searchParams }: { searchParams: { id: string } }) {
  const hasBeenCalledRef = useRef(false);
  const [testData, setTestData] = useState<TestModel[]>([]);
  const [questionData, setQuestionData] = useState<QuestionModel[]>([]);
  const [isAddQuestionFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
      if (!hasBeenCalledRef.current) {
          hasBeenCalledRef.current = true;

          getAllTestsAsync();
          getTestQuestionsAsync(searchParams.id);
      }
  }, [searchParams.id]); // Добавлен searchParams.id в массив зависимостей

  const getAllTestsAsync = async () => { 
    const tests = await fetchGetAllTestsAsync();
    if (tests) {
      setTestData(tests);
    } else {
      // Обработка случая, когда данные о категориях недоступны
    }
  };

  const getTestQuestionsAsync = async (idTest: string) => { 
    const questions = await fetchGetTestQuestionsAsync(idTest);
    if (questions) {
      setQuestionData(questions);
    } else {
      // Обработка случая, когда данные о категориях недоступны
    }
  };

  const toggleFormVisibility = () => {
      setIsFormVisible(!isAddQuestionFormVisible);
  };

  const addQuestionAsync = async () => { 
      await handleAddQuestionAsync();
      await getTestQuestionsAsync(searchParams.id);
  };

  const deleteTestConfirmAsync = async (question: QuestionModel, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => { 
    await handleDeleteQuestionConfirmAsync(question, event);
    
    // Очистить состояние categoryData
    setQuestionData([]);
    
    await getTestQuestionsAsync(searchParams.id);
  };
  
  return (
  <main className={styles.main}>
    <div className={`${styles.backgroundContainer} ${isAddQuestionFormVisible ? styles.overlayActive : ''}`}>
      <button
        className={styles.buttonOpenFormAddQuestion}
        title="Add question"
        onClick={toggleFormVisibility}
      >
        <Image src="/images/Plus.png" alt="Описание изображения" height={50} width={50} />
      </button>

      {isAddQuestionFormVisible && (
        <form className={styles.addQuestionForm}>
          <div className={styles.inputContainer}>
            <div className={styles.addQuestionContainer}>
              <h1>Add Question</h1>
              <div className={styles.txtBox}>
                <select id="tests" className={`${styles.dropdown}`}>
                  {testData.map((test) => (
                    <option key={test.id} value={test.id}>
                      {test.nameTest}
                    </option>
                  ))}
                </select>
                <i className='bx bx-chevron-down'></i>
              </div>
              <div className={styles.txtBox}>
                <input
                  id='questionText'
                  type="text"
                  placeholder="Question text"
                />
                <i className='bx bx-user-circle'></i>
              </div>
              <div className={styles.txtBox}>
                <input
                  id='linkPhoto'
                  type="text"
                  placeholder="Link photo"
                />
                <i className='bx bx-user-circle'></i>
              </div>
              <div className={styles.txtBox}>
                <input
                  id='answer1'
                  type="text"
                  placeholder="Answer 1"
                />
                <i className='bx bx-user-circle'></i>
              </div>
              <div className={styles.txtBox}>
                <input
                  id='answer2'
                  type="text"
                  placeholder="Answer 2"
                />
                <i className='bx bx-user-circle'></i>
              </div>
              <div className={styles.txtBox}>
                <input
                  id='answer3'
                  type="text"
                  placeholder="Answer 3"
                />
                <i className='bx bx-user-circle'></i>
              </div>
              <div className={styles.txtBox}>
                <input
                  id='answer4'
                  type="text"
                  placeholder="Answer 4"
                />
                <i className='bx bx-user-circle'></i>
              </div>
              <div className={styles.txtBox}>
                <input
                  id='correctAnswer'
                  type="text"
                  placeholder="Correct answer"
                />
                <i className='bx bx-user-circle'></i>
              </div>
              <input type="button" value="Add question" className={styles.buttonAddQuestion} onClick={addQuestionAsync} 
              />
              <input type="button" value="Back" className={styles.buttonBack} onClick={toggleFormVisibility}/>
            </div>
          </div>
          <p id='errorMessages' className={styles.errorMessages}></p>
        </form>
      )}

      <div className={styles.cardContainer}>
        {questionData.map((question, index) => (
          <div key={index} className={styles.card} data-id={question.id}>
            <div className={styles.container}>
              <div className={styles.content}>
                <h3 data-id={question.id}>Id: {question.id}</h3>
                <h3 id={`testName-${question.id}`}>Name test: {question.nameTest}</h3>
                <select id={`dropdownTest-${question.id}`} className={`${styles.dropdownUpdateTest}`}>
                  {testData.map((test) => (
                    <option key={test.id} value={test.id}>
                      {test.nameTest}
                    </option>
                  ))}
                </select>
                <h3 id={`questionText-${question.id}`}>Question text: {question.questionText}</h3>
                <input
                  id={`updateQuestionNameInput-${question.id}`}
                  type="text"
                  placeholder="New question name"
                  className={styles.inputText}
                />
                <h3 id={`linkPhoto-${question.id}`}>Link photo: {question.linkPhoto}</h3>
                <input
                  id={`updateLinkPhotoInput-${question.id}`}
                  type="text"
                  placeholder="New link photo"
                  className={styles.inputText}
                />
                <h3 id={`answer1-${question.id}`}>Answer 1: {question.answer1}</h3>
                <input
                  id={`updateAnswer1Input-${question.id}`}
                  type="text"
                  placeholder="New answer 1"
                  className={styles.inputText}
                />
                <h3 id={`answer2-${question.id}`}>Answer 2: {question.answer2}</h3>
                <input
                  id={`updateAnswer2Input-${question.id}`}
                  type="text"
                  placeholder="New answer 2"
                  className={styles.inputText}
                />
                <h3 id={`answer3-${question.id}`}>Answer 3: {question.answer3}</h3>
                <input
                  id={`updateAnswer3Input-${question.id}`}
                  type="text"
                  placeholder="New answer 3"
                  className={styles.inputText}
                />
                <h3 id={`answer4-${question.id}`}>Answer 4: {question.answer4}</h3>
                <input
                  id={`updateAnswer4Input-${question.id}`}
                  type="text"
                  placeholder="New answer 4"
                  className={styles.inputText}
                />
                <h3 id={`correctAnswer-${question.id}`}>Correct answer: {question.correctAnswer}</h3>
                <input
                  id={`updateCorrectAnswerInput-${question.id}`}
                  type="text"
                  placeholder="New correct answer"
                  className={styles.inputText}
                />

                <div className={styles.buttonContainer}>
                  <button
                    className={styles.buttonUpdateQuestion}
                    title="Update the question"
                    onClick={(event) => handleUpdateQuestionAsync(question, event)}
                  >
                    <Image src="/images/Pencil.png" alt="Описание изображения" height={20} width={20} />
                  </button>
                  <button 
                    className={styles.buttonConfirmUpdateQuestion} 
                    title="Confirm update"
                    onClick={(event) => handleUpdateQuestionConfirmAsync(question, event)}
                  >
                     <Image src="/images/CheckMark.png" alt="Описание изображения" height={20} width={20} />
                  </button>
                  <button 
                    className={styles.buttonCancellationUpdateQuestion} 
                    title="Cancellation update"
                    onClick={(event) => handleCancellationAsync(question, event)}
                  >
                      <Image src="/images/Cancellation.png" alt="Описание изображения" height={20} width={20} />
                  </button>

                  <button
                    className={styles.buttonDeleteQuestion}
                    title="Delete the question"
                    onClick={handleDeleteQuestionAsync}
                  >
                    <Image src="/images/Delete.png" alt="Описание изображения" height={20} width={20} />
                  </button>
                  <button 
                    className={styles.buttonConfirmDeleteQuestion} 
                    title="Confirm delete"
                    onClick={(event) => deleteTestConfirmAsync(question, event)}
                  >
                     <Image src="/images/CheckMark.png" alt="Описание изображения" height={20} width={20} />
                  </button>
                  <button 
                    className={styles.buttonCancellationDeleteQuestion} 
                    title="Cancellation delete"
                    onClick={(event) => handleCancellationAsync(question, event)}
                  >
                      <Image src="/images/Cancellation.png" alt="Описание изображения" height={20} width={20} />
                  </button>
                </div>
              </div>
            </div>
            <p id={`errorMessages-${question.id}`} className={styles.errorMessages}></p>
          </div>
        ))}
      </div>
    </div>
  </main>
);
}