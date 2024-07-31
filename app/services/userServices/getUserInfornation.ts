import { getCookie } from '@/app/Infrastructure/getCookie';
 
export interface User {
  userName: string;
  email: string;
  resultsTests: Record<string, number[]> | null;
}

export const getUserByIdAsync = async (): Promise<User | null> => {
  try {
    const jwtToken = getCookie('jwtToken');

    const response = await fetch("https://localhost:7103/Users/getUserInformationById", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${jwtToken}`, // Передача JWT-токена в заголовке Authorization
      },
    });

    if (response.ok) {
      // Если ответ успешный (статус 2xx), получаем информацию о пользователе
      const userData = await response.json();
      return userData as User;
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