import { UserModel } from '@/app/Models/UserModel/UserModel';
import { getCookie } from '@/app/Infrastructure/getCookie';

export const fetchUserNameChangeAsync = async (userId: string, newUserName: string) => {
    try {
        const jwtToken = getCookie('jwtToken');

        const response = await fetch(`/api/Users/userNameChange/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwtToken}`,
            },
            body: JSON.stringify(newUserName),
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
            console.error('Error user name change:', errorMessage);
            return false;
        }
    } catch (error) {
        console.error("Error fetching:", error);
        throw error;
    }
};