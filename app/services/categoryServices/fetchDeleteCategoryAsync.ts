import { getCookie } from '@/app/Infrastructure/getCookie';

export const fetchDeleteCategoryAsync = async (id: string) => {
  try {
    const jwtToken = getCookie('jwtToken');

    const response = await fetch(`https://localhost:7103/Category/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${jwtToken}`,
      },
    });
    
    if (response.ok) {
      return true;
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