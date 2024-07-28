import { TestModelRequest } from "@/app/Models/TestModel/TestModelRequest";
import { fetchAddNewTest } from "@/app/services/testServices/fetchAddNewTest";


export const addTest = async () => {
    const inputCategoryId = document.getElementById('categories') as HTMLSelectElement;
    const inputTestName = document.getElementById('testName') as HTMLInputElement;

    const testModelRequest: TestModelRequest = {
        idCategory: inputCategoryId.value,
        nameTest: inputTestName.value 
      };
      const result = await fetchAddNewTest(testModelRequest);
      if (result) {
        inputTestName.value = '';
    }
};