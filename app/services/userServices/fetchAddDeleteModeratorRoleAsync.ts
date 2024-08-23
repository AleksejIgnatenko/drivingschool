import { UserModel } from '@/app/Models/UserModel/UserModel';
import { getCookie } from '@/app/Infrastructure/getCookie';

export const fetchAddModeratorAsync = async (userId: string) => {
    try {
        const jwtToken = getCookie('jwtToken');

        const response = await fetch(`/api/Users/addModeratorRole/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwtToken}`,
            },
        });

        if (response.ok) {
            const responseData = await response.json();
            return responseData as UserModel;
        } else if (response.status === 400) {
            const errorMessages = document.getElementById(`errorMessages-${userId}`) as HTMLElement;
            errorMessages.style.display = "inline-block";
            const errorMessage = await response.text();
            errorMessages.textContent = errorMessage;
        } else {
            // Если ответ не успешный, проверяем статус и обрабатываем ошибку
            const errorMessage = await response.text();
            console.error('Error add moderator role:', errorMessage);
            return false;
        }
    } catch (error) {
        console.error("Error fetching:", error);
        throw error;
    }
};

export const fetchDeleteModeratorAsync = async (userId: string) => {
    try {
        const jwtToken = getCookie('jwtToken');

        const response = await fetch(`/api/Users/deleteModeratorRole/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwtToken}`,
            },
        });

        if (response.ok) {
            const responseData = await response.json();
            return responseData as UserModel;
        } else if (response.status === 400) {
            const errorMessages = document.getElementById(`errorMessages-${userId}`) as HTMLElement;
            errorMessages.style.display = "inline-block";
            const errorMessage = await response.text();
            errorMessages.textContent = errorMessage;
        } else {
            // Если ответ не успешный, проверяем статус и обрабатываем ошибку
            const errorMessage = await response.text();
            console.error('Error delete moderator role:', errorMessage);
            return false;
        }
    } catch (error) {
        console.error("Error fetching:", error);
        throw error;
    }
};