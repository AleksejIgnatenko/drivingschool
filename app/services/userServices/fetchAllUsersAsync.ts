import { UserModel } from '@/app/Models/UserModel';
import { getCookie } from '@/app/Infrastructure/getCookie';

export const fetchAllUsersAsync = async (): Promise<UserModel[] | null> => {
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
      const responseData = await response.json()
      return responseData.map((data: any) => ({
        id: data.id,
        userName: data.userName,
        email: data.email,
        role: data.role,
        resultsTests: data.resultsTests,
      }));
    } else {
      const errorMessage = await response.text();
      console.error('Error fetching get all users:', errorMessage);
      return null;
    }
  } catch (error) {
    console.error('Error fetching:', error);
    throw error;
  }
};