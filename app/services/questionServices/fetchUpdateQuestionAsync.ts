import { getCookie } from '@/app/Infrastructure/getCookie';
import { QuestionModelRequest } from '@/app/Models/QuestionModel/QuestionModelRequest';
import { QuestionModel } from '@/app/Models/QuestionModel/QuestionModel';

export const fetchUpdateQuestionAsync = async(questionId: string, updateQuestionRequest: QuestionModelRequest) => {
    try {
        const jwtToken = getCookie('jwtToken');
        console.log(questionId);
        const response = await fetch(`/api/Question/${questionId}`, {
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
    } else if (response.status === 400) {
      const errorMessages = document.getElementById(`errorMessages-${questionId}`) as HTMLElement;
      errorMessages.style.display = "inline-block";
      const errorMessage = await response.text();
      errorMessages.textContent = errorMessage;
    } else {
      const errorMessage = await response.text();
      console.error('Error fetching update question', errorMessage);
    }
  } catch (error) {
    console.error('Error fetching:', error);
  }
}