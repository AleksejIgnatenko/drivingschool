import { UserModel } from '@/app/Models/UserModel';
import { getCookie } from '@/app/Infrastructure/getCookie';

export const fetchUserNameChangeAsync = async (userId: string, newUserName: string) => {
    try {
        const jwtToken = getCookie('jwtToken');

        const response = await fetch(`https://localhost:7103/Users/userNameChange/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwtToken}`,
            },
            body: JSON.stringify(newUserName),
        });

        if (response.ok) {
            const responseData = await response.json();
            return responseData as UserModel;
        }
    } catch (error) {
        console.error("Error fetching:", error);
        throw error;
    }
};