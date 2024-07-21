import Cookies from 'js-cookie';
import { User } from '@/app/Models/UserModels/User';

export const fetchAddModeratorAsync = async (userId: string) => {
    try {
        const jwtToken = Cookies.get('jwtToken');
        if (!jwtToken) {
            console.error('JWT token is missing');
            return null;
        }

        const response = await fetch(`https://localhost:7103/Users/addModeratorRole/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwtToken}`,
            },
        });

        if (response.ok) {
            const responseData = await response.json();
            return responseData as User;
        }
    } catch (error) {
        console.error("Error fetching:", error);
        throw error;
    }
};

export const fetchDeleteModeratorAsync = async (userId: string) => {
    try {
        const jwtToken = Cookies.get('jwtToken');
        if (!jwtToken) {
            console.error('JWT token is missing');
            return null;
        }

        const response = await fetch(`https://localhost:7103/Users/deleteModeratorRole/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwtToken}`,
            },
        });

        if (response.ok) {
            const responseData = await response.json();
            return responseData as User;
        }
    } catch (error) {
        console.error("Error fetching:", error);
        throw error;
    }
};