import { getCookie } from '@/app/Infrastructure/getCookie';

export const fetchDeleteTestAsync = async (id: string) => {
  try {
    const jwtToken = getCookie('jwtToken');

    const response = await fetch(`/api/Test/${id}`, {
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
      console.error('Error fetching delete test:', errorMessage);
      return null;
    }
  } catch (error) {
    console.error('Error fetching:', error);
    throw error;
  }
};