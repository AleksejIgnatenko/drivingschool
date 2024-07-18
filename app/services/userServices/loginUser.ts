import Cookies from 'js-cookie';

export interface LoginUserModelRequests {
  email: string;
  password: string;
}

export const loginUser = async (userRequest: LoginUserModelRequests) => {
  try {
    const response = await fetch("https://localhost:7103/Users/login", {
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
      console.error("Error creating user:", errorMessage);
    }
  } catch (error) {
    console.error("Error fetching:", error);
  }
};