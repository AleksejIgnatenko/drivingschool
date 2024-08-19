import Cookies from 'js-cookie';
import { LoginUserModelRequests } from '@/app/Models/UserModel/LoginUserModelRequests';

export const loginUserAsync = async (userRequest: LoginUserModelRequests) => {
  try {
    const response = await fetch("/api/Users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userRequest),
    });

    if (response.ok) {
      // If the response is successful (status 2xx), get the JWT token
      const token = await response.json();
      if (token) {
        const expirationTime = new Date(new Date().getTime() + 12 * 60 * 60 * 1000); // Token is valid for 12 hours
        Cookies.set('jwtToken', token, { expires: expirationTime });
      }
    } else {
      // If the response is not successful, check the status and handle the error
      const errorMessage = await response.text();
      console.error("Error login:", errorMessage);
    }
  } catch (error) {
    console.error("Error fetching:", error);
  }
};