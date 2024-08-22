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
            window.location.href = '/';
        } else if (response.status === 400) {
            const errorMessages = document.getElementById('errorMessages') as HTMLElement;
            errorMessages.style.display = "inline-block";
            const errorMessage = await response.text();
            errorMessages.textContent = errorMessage;
        } else {
            // Обработка других ошибочных статусов
            const errorMessage = await response.text();
            console.error('Server error:', errorMessage);
        }
    } catch (error) {
        console.error('Error fetching:', error);
    }
};