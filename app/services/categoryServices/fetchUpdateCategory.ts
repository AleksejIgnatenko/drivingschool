import { getCookie } from '@/app/Infrastructure/getCookie';
import { CategoryModel } from '@/app/Models/CategoryModel/CategoryModel';
import { CategoryModelRequest } from '@/app/Models/CategoryModel/CategoryModelRequest';

export const fetchUpdateCategory = async (categoryId: string, newCategoryName: string) => {
  try {
    const jwtToken = getCookie('jwtToken');

    const categoryModelRequest: CategoryModelRequest = {
      nameCategory: newCategoryName,
    }

    const response = await fetch(`https://localhost:7103/Category/${categoryId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(categoryModelRequest),
    });

    if (response.ok) {
      const responseData: CategoryModel = await response.json();
      return responseData;
    } else {
      const errorMessage = await response.text();
      console.error('Error fetching update category:', errorMessage);
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error('Error fetching:', error);
    throw error;
  }
};