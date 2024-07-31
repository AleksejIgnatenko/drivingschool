import { getCookie } from '@/app/Infrastructure/getCookie';

export const fetchDeleteQuestionAsync = async (id: string) => {
  try {
    const jwtToken = getCookie('jwtToken');

    const response = await fetch(`https://localhost:7103/Question/${id}`, {
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
      console.error('Error fetching delete question:', errorMessage);
      return null;
    }
  } catch (error) {
    console.error('Error fetching:', error);
    throw error;
  }
};