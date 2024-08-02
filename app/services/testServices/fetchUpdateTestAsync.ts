import { getCookie } from '@/app/Infrastructure/getCookie';
import { TestModelRequest } from '@/app/Models/TestModel/TestModelRequest';
import { TestModel } from '@/app/Models/TestModel/TestModel';

export const fetchUpdateTestAsync = async (testId: string, categoryId: string, newTestName: string) => {
  try {
    const jwtToken = getCookie('jwtToken');

    const testModelRequest: TestModelRequest = {
        idCategory: categoryId,
        nameTest: newTestName
      };

    const response = await fetch(`https://localhost:7103/Test/${testId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(testModelRequest)
    });

    if (response.ok) {
      const responseData: TestModel = await response.json();
      return responseData;
    } else {
      const errorMessage = await response.text();
      console.error('Error fetching update test:', errorMessage);
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error('Error fetching:', error);
    throw error;
  }
};