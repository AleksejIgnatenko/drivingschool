import { TestModelRequest } from "@/app/Models/TestModel/TestModelRequest";
import { getCookie } from '@/app/Infrastructure/getCookie';

export const fetchAddTestAsync = async (testModelRequest: TestModelRequest): Promise<boolean> => {
    try {
        const jwtToken = getCookie('jwtToken');

        const response = await fetch("/api/Test", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${jwtToken}`,
            },
            body: JSON.stringify(testModelRequest)
        });

        if (response.ok) {
            return true;
        } else if (response.status === 400) {
            const errorMessages = document.getElementById('errorMessages') as HTMLElement;
            errorMessages.style.display = "inline-block";
            const errorMessage = await response.text();
            errorMessages.textContent = errorMessage;
            return false;
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
};