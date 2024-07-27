import { CategoryModel } from '@/app/Models/CategoryModel';
import { getCookie } from '@/app/Infrastructure/getCookie';

export const fetchGetAllCategoryAsync = async (): Promise<CategoryModel[] | null> => {
  try {
    const jwtToken = getCookie('jwtToken');

    const response = await fetch("https://localhost:7103/Category/getAllCategory", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${jwtToken}`,
      },
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData.map((data: any) => ({
        id: data.id,
        nameCategory: data.nameCategory,
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