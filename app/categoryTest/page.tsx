'use client';

import styles from './styles.module.css';
import { useEffect, useState, useRef } from "react";
import { QuestionModel } from '@/app/Models/QuestionModel/QuestionModel';
import { fetchGetCategoryTestAsync } from '../services/categoryServices/fetchGetCategoryTestAsync';
import { handleCheckingTestAsync } from './script';

export default function CategoryTest({ searchParams }: { searchParams: { id: string } }) {
  const hasBeenCalledRef = useRef(false);
  const [questionData, setQuestionData] = useState<QuestionModel[]>([]);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  useEffect(() => {
      if (!hasBeenCalledRef.current) {
          hasBeenCalledRef.current = true;

          getCategoryTestAsync(searchParams.id);
      }
  }, []);

  const getCategoryTestAsync = async (idCategory: string) => { 
    const questions = await fetchGetCategoryTestAsync(idCategory);
    if (questions) {
      setQuestionData(questions);
    } else {
      // Обработка случая, когда данные о категориях недоступны
    }
  };

  const handleAnswerChange = (index: number, answer: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = answer;
    setUserAnswers(newAnswers);
  };

  const handleSubmit = () => {
    handleCheckingTestAsync(questionData, userAnswers);
  };

  return (
    <main className={styles.main}>
      <div className={`${styles.backgroundContainer}`}>
        <div className={styles.cardContainer}>
          {questionData.map((question, index) => (
            <div key={index} className={styles.card} data-id={question.id}>
              <div className={styles.container}>
                <div className={styles.content}>
                  <h3 id={`questionText-${question.id}`}>Question text: {question.questionText}</h3>
                  <h3 id={`linkPhoto-${question.id}`}>Link photo: {question.linkPhoto}</h3>
                  <form>
                    <label className={styles.radio}>
                      <input
                        type="radio"
                        name={`answer-${question.id}`}
                        value={question.answer1}
                        className={styles.radioButton}
                        onChange={() => handleAnswerChange(index, question.answer1)}
                      />
                      {question.answer1}
                    </label>
                    <label className={styles.radio}>
                      <input
                        type="radio"
                        name={`answer-${question.id}`}
                        value={question.answer2}
                        className={styles.radioButton}
                        onChange={() => handleAnswerChange(index, question.answer2)}
                      />
                      {question.answer2}
                    </label>
                    <label className={styles.radio}>
                      <input
                        type="radio"
                        name={`answer-${question.id}`}
                        value={question.answer3}
                        className={styles.radioButton}
                        onChange={() => handleAnswerChange(index, question.answer3)}
                      />
                      {question.answer3}
                    </label>
                    <label className={styles.radio}>
                      <input
                        type="radio"
                        name={`answer-${question.id}`}
                        value={question.answer4}
                        className={styles.radioButton}
                        onChange={() => handleAnswerChange(index, question.answer4)}
                      />
                      {question.answer4}
                    </label>
                  </form>
                </div>
              </div>
            </div>
          ))}
          <input
            type="button"
            value="Pass"
            className={styles.buttonPass}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </main>
  );
}
