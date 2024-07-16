import Cookies from 'js-cookie';

export interface Users{
    userName: string;
    email: string;
}

export const getUserByIdAsync = async (): Promise<Users | null> => {
    try {
      const jwtToken = Cookies.get('jwtToken');
      if (!jwtToken) {
        console.error('JWT token is missing');
        return null;
      }
  
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
        return userData as Users
      } else {
        // Если ответ не успешный, проверяем статус и обрабатываем ошибку
        const errorMessage = await response.text();
        console.error('Error fetching user information:', errorMessage);
        return null;
      }
    } catch (error) {
      console.error('Error fetching:', error);
      // Здесь можно обработать любые ошибки, возникшие во время запроса
      throw error;
    }
  };