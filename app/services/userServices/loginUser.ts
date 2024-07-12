export interface LoginUserModelRequests{
    email: string;
    password: string;
}

export const loginUser = async (userRequest: LoginUserModelRequests) => {
    try {
      const response = await fetch("https://localhost:7103/Users/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userRequest),
      });
  
      if (response.ok) {
        // If the response is successful (status 2xx), get the JWT token
        const token = await response.json();
        if (token) {
            console.log(token);
            localStorage.setItem('', token);
            const jwtToken = localStorage.getItem('jwtToken');
        }
      } else {
        // If the response is not successful, check the status and handle the error
        const errorMessage = await response.text();
        console.error('Error creating user:', errorMessage);
      }
    } catch (error) {
      console.error('Error fetching:', error);
      // Handle any errors that occurred during the request
      throw error;
    }
  };