import { AnswerModelRequest } from "@/app/Models/AnswerModel/AnswerModelRequest";
import { getCookie } from '@/app/Infrastructure/getCookie';

export const fetchAddUserAnswerAsync = async (answer: AnswerModelRequest) => {
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

        const errorMessages = document.getElementById('errorMessages') as HTMLElement;

        if (response.ok) {
            errorMessages.textContent = "Результат сохранен";
        } else if (response.status === 400) {
            errorMessages.style.display = "inline-block";
            const errorMessage = await response.text();
            errorMessages.textContent = errorMessage;
        } else {
            // Если ответ не успешный, проверяем статус и обрабатываем ошибку
            const errorMessage = await response.text();
            console.error('Error creating category:', errorMessage);
        }
    } catch (error) {
        console.error('Error fetching:', error);
        return false;
    }
};