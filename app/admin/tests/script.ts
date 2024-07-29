import { TestModelRequest } from "@/app/Models/TestModel/TestModelRequest";
import { fetchAddNewTest } from "@/app/services/testServices/fetchAddNewTest";
import { fetchUpdateTest } from "@/app/services/testServices/fetchUpdateTest";
import { fetchDeleteTestAsync } from "@/app/services/testServices/fetchDeleteTestAsync";
import styles from './styles.module.css';
import { TestModel } from "@/app/Models/TestModel/TestModel";

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

export const handleUpdateTest = async (test: TestModel, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  const buttons = event.currentTarget.parentNode?.children;
  const nameCategory = document.getElementById(`categoryName-${test.id}`);
  const nameTest = document.getElementById(`testName-${test.id}`);
  const categories = document.getElementById(`dropdownCategories-${test.id}`) as HTMLSelectElement;
  const inputUpdateTestName = document.getElementById(`updateTestNameInput-${test.id}`) as HTMLInputElement;

  if (buttons && nameCategory && nameTest && categories && inputUpdateTestName) {
    // Hide the "Issue a Moderator" and "Delete a Moderator" buttons
    (buttons[0] as HTMLElement).style.display = 'none';
    (buttons[3] as HTMLElement).style.display = 'none';
    nameCategory.style.display = 'none';
    nameTest.style.display = 'none';

    // Show the "Check Mark" and "Cancellation" buttons
    (buttons[1] as HTMLElement).style.display = 'inline-block';
    (buttons[2] as HTMLElement).style.display = 'inline-block';

    // Find the category by name and set its value in the dropdown
    const categoryOptions = Array.from(categories.options);
    const selectedOption = categoryOptions.find(option => option.text === test.nameCategory);
    if (selectedOption) {
      categories.value = selectedOption.value;
      categories.style.display = 'inline-block';
    }

    inputUpdateTestName.value = test.nameTest;
    inputUpdateTestName.style.display = 'inline-block';
  }
};

  export const handleUpdateTestConfirm = async (test: TestModel, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const buttons = event.currentTarget.parentNode?.children;
    const nameCategory = document.getElementById(`categoryName-${test.id}`);
    const nameTest = document.getElementById(`testName-${test.id}`);
    const categories = document.getElementById(`dropdownCategories-${test.id}`) as HTMLSelectElement;
    const inputUpdateTestName = document.getElementById(`updateTestNameInput-${test.id}`) as HTMLInputElement;
    const card = event.currentTarget.closest(`.${styles.card}`) as HTMLElement | null;
  
    if (buttons && nameCategory && nameTest && categories && inputUpdateTestName && card) {
      try {
        const updatedTest = await fetchUpdateTest(test.id, categories.value, inputUpdateTestName.value);
        if (updatedTest) {
          // Update the user's card
          const testIdElement = card.querySelector("h3:nth-of-type(1)");
          const categoryNameElement = card.querySelector("h3:nth-of-type(2)");
          const testNameElement = card.querySelector("h3:nth-of-type(3)");
  
          if (testIdElement && categoryNameElement && testNameElement) {
            testIdElement.textContent = `Id: ${updatedTest.id}`;
            categoryNameElement.textContent = `Name category: ${updatedTest.nameCategory}`;
            testNameElement.textContent = `Name test: ${updatedTest.nameTest}`;
        }
  
          // Update the user object with the new name
          test.nameCategory = updatedTest.nameCategory;
          test.nameTest = updatedTest.nameTest;
  
          // Hide the "Issue a Moderator" and "Delete a Moderator" buttons
          hideButtons(test, buttons);
  
          // Show the "Check Mark" and "Cancellation" buttons
          showButtons(test, buttons);
        }
      } catch (error) {
        console.error("Error updating category:", error);
      }
    }
  };

  export const handleDeleteTest = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const buttons = event.currentTarget.parentNode?.children;
  
    if (buttons) {
      // Hide the "Issue a Moderator" and "Delete a Moderator" buttons
      (buttons[0] as HTMLElement).style.display = 'none';
      (buttons[3] as HTMLElement).style.display = 'none';
  
      // Show the "Check Mark" and "Cancellation" buttons
      (buttons[4] as HTMLElement).style.display = 'inline-block';
      (buttons[5] as HTMLElement).style.display = 'inline-block';
    }
  };

  export const handleDeleteTestConfirm = async (test: TestModel, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const buttons = event.currentTarget.parentNode?.children;
    if (buttons) {
      try{
        await fetchDeleteTestAsync(test.id);

        // Hide the "Issue a Moderator" and "Delete a Moderator" buttons
        hideButtons(test, buttons);

        // Show the "Check Mark" and "Cancellation" buttons
        showButtons(test, buttons);
      } catch (error) {
        console.error("Error deletion moderator:", error);
      }
    }
  };

  export const handleCancellation = async (test: TestModel, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const buttons = event.currentTarget.parentNode?.children;
  
    if (buttons) {
      // Hide the "Issue a Moderator" and "Delete a Moderator" buttons
      hideButtons(test, buttons);
  
      // Show the "Check Mark" and "Cancellation" buttons
      showButtons(test, buttons);
    }
  };

  const hideButtons = (test: TestModel, buttons: HTMLCollection) => {
    (buttons[1] as HTMLElement).style.display = 'none';
    (buttons[2] as HTMLElement).style.display = 'none';
    (buttons[4] as HTMLElement).style.display = 'none';
    (buttons[5] as HTMLElement).style.display = 'none';

    const categories = document.getElementById(`dropdownCategories-${test.id}`) as HTMLSelectElement;
    const inputUpdateTestName = document.getElementById(`updateTestNameInput-${test.id}`) as HTMLInputElement;

    categories.style.display = 'none';
    inputUpdateTestName.style.display = 'none';
  };
  
  const showButtons = (test: TestModel, buttons: HTMLCollection) => {
    (buttons[0] as HTMLElement).style.display = 'inline-block';
    (buttons[3] as HTMLElement).style.display = 'inline-block';

    const nameCategory = document.getElementById(`categoryName-${test.id}`)!;
    const nameTest = document.getElementById(`testName-${test.id}`)!;

    nameCategory.style.display = 'inline-block';
    nameTest.style.display = 'inline-block';

  };