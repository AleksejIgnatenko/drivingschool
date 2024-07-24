import { UserModel } from '@/app/Models/UserModel';
import { getCookie } from '@/app/Infrastructure/getCookie';

export const fetchAddModeratorAsync = async (userId: string) => {
    try {
        const jwtToken = getCookie('jwtToken');

        const response = await fetch(`https://localhost:7103/Users/addModeratorRole/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwtToken}`,
            },
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

export const fetchDeleteModeratorAsync = async (userId: string) => {
    try {
        const jwtToken = getCookie('jwtToken');

        const response = await fetch(`https://localhost:7103/Users/deleteModeratorRole/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwtToken}`,
            },
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