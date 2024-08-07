import { getCookie } from '@/app/Infrastructure/getCookie';

export interface CreateCategoryModelRequest {
    nameCategory: string;
}

export const fetchAddCategoryAsync = async (nameCategory: string): Promise<boolean> => {
    try {
        const jwtToken = getCookie('jwtToken');

        const category: CreateCategoryModelRequest = {
            nameCategory
        };

        const response = await fetch("https://localhost:7103/Category", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${jwtToken}`,
            },
            body: JSON.stringify(category)
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