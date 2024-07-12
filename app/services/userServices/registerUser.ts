export interface RegisterUserModelRequest{
    userName: string;
    email: string;
    password: string;
}

export const registerUser = async (userRequest: RegisterUserModelRequest) => {
    try {
        const response = await fetch("https://localhost:7103/Users/register", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(userRequest)
        });

        if (response.ok) {
            // Если ответ успешный (статус 2xx), получаем id пользователя
            const userId = await response.json();
            console.log('User created with ID:', userId);
        } else {
            // Если ответ не успешный, проверяем статус и обрабатываем ошибку
            const errorMessage = await response.text();
            console.error('Error creating user:', errorMessage);
        }
    } catch (error) {
        console.error('Error fetching:', error);
        // Здесь можно обработать любые ошибки, возникшие во время запроса
        throw error;
    }
};