import { RegisterUserModelRequest } from "@/app/Models/UserModel/RegisterUserModelRequest";

export const registerUserAsync = async (userRequest: RegisterUserModelRequest) => {
    try {
        const response = await fetch("/api/Users/register", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(userRequest)
        });

        if (response.ok) {
            // Если ответ успешный (статус 2xx), получаем id пользователя
            // const userId = await response.json();
            // console.log('User created with ID:', userId);
            window.location.href = '/';
        } else {
            // Если ответ не успешный, проверяем статус и обрабатываем ошибку
            const errorMessage = await response.text();
            console.error('User registration error:', errorMessage);
        }
    } catch (error) {
        console.error('Error fetching:', error);
    }
};