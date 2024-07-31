import { QuestionModelRequest } from "@/app/Models/QuestionModel/QuestionModelRequest";
import { getCookie } from "@/app/Infrastructure/getCookie";
import { tree } from "next/dist/build/templates/app-page";

export const fetchAddNewQuestion = async (questionModelRequest: QuestionModelRequest): Promise<boolean> => {
    try{
        const jwtToken = getCookie('jwtToken');

        const response = await fetch("https://localhost:7103/Question", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${jwtToken}`,
            },
            body: JSON.stringify(questionModelRequest)
        });

        if(response.ok){
            return true;
        } else {
            // Если ответ не успешный, проверяем статус и обрабатываем ошибку
            const errorMessage = await response.text();
            console.error('Error creating test:', errorMessage);
            return false;
        }
    } catch (error) {
        console.error('Error fetching:', error);
        return false;
    }
}