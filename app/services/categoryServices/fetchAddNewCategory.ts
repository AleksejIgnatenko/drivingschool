export interface CreateCategoryModelRequest {
    nameCategory: string;
}

export const fetchAddNewCategory = async (nameCategory: string): Promise<boolean> => {
    try {
        const category: CreateCategoryModelRequest = {
            nameCategory
        };

        const response = await fetch("https://localhost:7103/Category", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(category)
        });

        if (response.ok) {
            return true;
        } else {
            // Если ответ не успешный, проверяем статус и обрабатываем ошибку
            const errorMessage = await response.text();
            console.error('Error creating user:', errorMessage);
            return false;
        }
    } catch (error) {
        console.error('Error fetching:', error);
        return false;
    }
};