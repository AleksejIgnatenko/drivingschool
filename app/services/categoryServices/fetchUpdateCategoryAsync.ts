import { getCookie } from '@/app/Infrastructure/getCookie';
import { CategoryModel } from '@/app/Models/CategoryModel/CategoryModel';
import { CategoryModelRequest } from '@/app/Models/CategoryModel/CategoryModelRequest';

export const fetchUpdateCategoryAsync = async (categoryId: string, newCategoryName: string) => {
  try {
    const jwtToken = getCookie('jwtToken');

    const categoryModelRequest: CategoryModelRequest = {
      nameCategory: newCategoryName,
    }

    const response = await fetch(`/api/Category/${categoryId}`, {
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
    } else if (response.status === 400) {
      const errorMessages = document.getElementById('errorMessages') as HTMLElement;
      errorMessages.style.display = "inline-block";
      const errorMessage = await response.text();
      errorMessages.textContent = errorMessage;
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