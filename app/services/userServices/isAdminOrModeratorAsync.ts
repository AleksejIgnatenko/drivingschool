import { getCookie } from '@/app/Infrastructure/getCookie';

export const isAdminOrModeratorAsync = async (): Promise<boolean> => {
    try {
      const jwtToken = getCookie('jwtToken');

        const response = await fetch("https://localhost:7103/Users/isAdminOrModerator", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${jwtToken}`, // Передача JWT-токена в заголовке Authorization
        },
      });
  
      if (response.ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error fetching:", error);
      return false;
    }
  };