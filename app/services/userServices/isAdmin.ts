import Cookies from 'js-cookie';

export const isAdmin = async () => {
    try {
        
        const jwtToken = Cookies.get('jwtToken');
        if (!jwtToken) {
          console.error('JWT token is missing');
          return null;
        }

        const response = await fetch("https://localhost:7103/Users/isAdmin", {
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
      throw error;
    }
  };