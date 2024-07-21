import Cookies from 'js-cookie';

export interface User {
  idUser: string;
  userName: string;
  email: string;
  role: string;
  resultsTests: Record<string, number[]> | null;
}

export const fetchAllUsersAsync = async (): Promise<User[] | null> => {
  try {
    const jwtToken = Cookies.get('jwtToken');
    if (!jwtToken) {
      console.error('JWT token is missing');
      return null;
    }

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