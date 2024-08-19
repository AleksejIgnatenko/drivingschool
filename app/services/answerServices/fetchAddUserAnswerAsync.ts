import { AnswerModelRequest } from "@/app/Models/AnswerModel/AnswerModelRequest";
import { getCookie } from '@/app/Infrastructure/getCookie';

export const fetchAddUserAnswerAsync = async (answer: AnswerModelRequest): Promise<boolean> => {
    try {
        const jwtToken = getCookie('jwtToken');

        const response = await fetch("/api/AnswerUserTest", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${jwtToken}`,
            },
            body: JSON.stringify(answer)
        });

        if (response.ok) {
            return true;
        } else {
            // Если ответ не успешный, проверяем статус и обрабатываем ошибку
            const errorMessage = await response.text();
            console.error('Error creating category:', errorMessage);
            return false;
        }
    } catch (error) {
        console.error('Error fetching:', error);
        return false;
    }
};