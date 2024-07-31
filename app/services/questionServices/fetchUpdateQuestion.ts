import { getCookie } from '@/app/Infrastructure/getCookie';
import { QuestionModelRequest } from '@/app/Models/QuestionModel/QuestionModelRequest';
import { QuestionModel } from '@/app/Models/QuestionModel/QuestionModel';

export const fetchUpdateQuestion = async(questionId: string, updateQuestionRequest: QuestionModelRequest) => {
    try {
        const jwtToken = getCookie('jwtToken');
        console.log(questionId);
        const response = await fetch(`https://localhost:7103/Question/${questionId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${jwtToken}`,
            },
            body: JSON.stringify(updateQuestionRequest)
        });


    if (response.ok) {
      const responseData: QuestionModel = await response.json();
      return responseData;
    } else {
      const errorMessage = await response.text();
      console.error('Error fetching update question', errorMessage);
    }
  } catch (error) {
    console.error('Error fetching:', error);
  }
}