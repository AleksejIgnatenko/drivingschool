import { getCookie } from '@/app/Infrastructure/getCookie';
import { UserModel } from '@/app/Models/UserModel/UserModel';
 
export const getUserByIdAsync = async (): Promise<UserModel | null> => {
  try {
    const jwtToken = getCookie('jwtToken');

    const response = await fetch("/api/Users/getUserInformationById", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${jwtToken}`, // Передача JWT-токена в заголовке Authorization
      },
    });

    if (response.ok) {
      // Если ответ успешный (статус 2xx), получаем информацию о пользователе
      const userData = await response.json();
      console.log(userData);
      return userData as UserModel;
    } else if (response.status === 400) {
      const errorMessages = document.getElementById('errorMessages') as HTMLElement;
      errorMessages.style.display = "inline-block";
      const errorMessage = await response.text();
      errorMessages.textContent = errorMessage;
      return null;
    } else {
      // Если ответ не успешный, проверяем статус и обрабатываем ошибку
      const errorMessage = await response.text();
      console.error('Error fetching get user information:', errorMessage);
      return null;
    }
  } catch (error) {
    console.error('Error fetching:', error);
    // Здесь можно обработать любые ошибки, возникшие во время запроса
    throw error;
  }
};