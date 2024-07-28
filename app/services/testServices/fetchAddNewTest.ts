import { TestModelRequest } from "@/app/Models/TestModel/TestModelRequest";
import { getCookie } from '@/app/Infrastructure/getCookie';

export const fetchAddNewTest = async (testModelRequest: TestModelRequest): Promise<boolean> => {
    try {
        const jwtToken = getCookie('jwtToken');

        const response = await fetch("https://localhost:7103/Test", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${jwtToken}`,
            },
            body: JSON.stringify(testModelRequest)
        });

        if (response.ok) {
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
};