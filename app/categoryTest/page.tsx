'use client';

import styles from './styles.module.css';
import { useEffect, useState, useRef } from "react";
import { QuestionModel } from '@/app/Models/QuestionModel/QuestionModel';
import { fetchGetCategoryTestAsync } from '../services/categoryServices/fetchGetCategoryTestAsync';

export default function CategoryTest({ searchParams }: { searchParams: { id: string } }) {
  const hasBeenCalledRef = useRef(false);
  const [questionData, setQuestionData] = useState<QuestionModel[]>([]);
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
                <h3 id={`answer1-${question.id}`}>Answer 1: {question.answer1}</h3>
                <h3 id={`answer2-${question.id}`}>Answer 2: {question.answer2}</h3>
                <h3 id={`answer3-${question.id}`}>Answer 3: {question.answer3}</h3>
                <h3 id={`answer4-${question.id}`}>Answer 4: {question.answer4}</h3>
                <h3 id={`correctAnswer-${question.id}`}>Correct answer: {question.correctAnswer}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </main>
);
}