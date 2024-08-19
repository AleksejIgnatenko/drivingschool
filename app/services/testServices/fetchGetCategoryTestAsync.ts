import { getCookie } from '@/app/Infrastructure/getCookie';
import { CategoryTestModel } from '@/app/Models/TestModel/TestCategorymodel';

export const fetchGetCategoryTestAsync = async (idCategory: string): Promise<CategoryTestModel | null> => {
  try {
    const jwtToken = getCookie('jwtToken');

    const response = await fetch(`/api/Test/getCategoryTest?idCategory=${idCategory}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${jwtToken}`,
      },
    });

    if (response.ok) {
      const responseData = await response.json();
      return ({
        id: responseData.idTest,
        nameTest: responseData.nameTest,
        questions: responseData.questions.map((question: any) => ({
          id: question.id,
          questionText: question.questionText,
          linkPhoto: question.linkPhoto,
          answer1: question.answer1,
          answer2: question.answer2,
          answer3: question.answer3,
          answer4: question.answer4,
          correctAnswer: question.correctAnswer
        }))
      });
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