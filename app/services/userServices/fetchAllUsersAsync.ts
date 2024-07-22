import Cookies from 'js-cookie';
import { User } from '@/app/Models/UserModels/User';
import { getCookie } from '@/app/Infrastructure/getCookie';

export const fetchAllUsersAsync = async (): Promise<User[] | null> => {
  try {
    const jwtToken = getCookie('jwtToken');

    const response = await fetch("https://localhost:7103/Users/getAllUsers", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${jwtToken}`,
      },
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData.map((data: any) => ({
        idUser: data.idUser,
        userName: data.userName,
        email: data.email,
        role: data.role,
        resultsTests: data.resultsTests,
      }));
    } else {
      const errorMessage = await response.text();
      console.error('Error fetching user information:', errorMessage);
      return null;
    }
  } catch (error) {
    console.error('Error fetching:', error);
    throw error;
  }
};