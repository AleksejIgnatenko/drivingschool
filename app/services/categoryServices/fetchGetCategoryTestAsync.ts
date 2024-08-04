import { QuestionModel } from '@/app/Models/QuestionModel/QuestionModel';
import { getCookie } from '@/app/Infrastructure/getCookie';

export const fetchGetCategoryTestAsync = async (idCategory: string): Promise<QuestionModel[] | null> => {
  try {
    const jwtToken = getCookie('jwtToken');

    const response = await fetch(`https://localhost:7103/Category/getCategoryTest?idCategory=${idCategory}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${jwtToken}`,
      },
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData.map((data: any) => ({
        id: data.id,
        nameTest: data.nameTest,
        questionText: data.questionText,
        linkPhoto: data.linkPhoto,
        answer1: data.answer1,
        answer2: data.answer2,
        answer3: data.answer3,
        answer4: data.answer4,
        correctAnswer: data.correctAnswer
      }));
    } else {
      const errorMessage = await response.text();
      console.error('Error fetching get category:', errorMessage);
      return null;
    }
  } catch (error) {
    console.error('Error fetching:', error);
    throw error;
  }
};