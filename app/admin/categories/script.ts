import { fetchAddNewCategory } from "@/app/services/categoryServices/fetchAddNewCategory";
import { CategoryModel } from "@/app/Models/CategoryModel/CategoryModel";
import { fetchUpdateCategory } from "@/app/services/categoryServices/fetchUpdateCategory";
import { fetchDeleteCategoryAsync } from "@/app/services/categoryServices/fetchDeleteCategoryAsync";
import styles from './styles.module.css';

export const addCategory = async () => {
    const inputCategoryName = document.getElementById('categoryName') as HTMLInputElement;
    const result = await fetchAddNewCategory(inputCategoryName.value); // Добавляем await здесь

    if (result) {
      inputCategoryName.value = '';
    }
};

export const handleUpdateCategory = async (category: CategoryModel, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const buttons = event.currentTarget.parentNode?.children;
    const nameCategory = document.getElementById(`categoryName-${category.id}`);
    const input = document.getElementById(`categoryNameInput-${category.id}`) as HTMLInputElement;

    if (buttons && input && nameCategory) {
      // Hide the "Issue a Moderator" and "Delete a Moderator" buttons
      (buttons[0] as HTMLElement).style.display = 'none';
      (buttons[3] as HTMLElement).style.display = 'none';
      nameCategory.style.display = 'none';
  
      // Show the "Check Mark" and "Cancellation" buttons
      (buttons[1] as HTMLElement).style.display = 'inline-block';
      (buttons[2] as HTMLElement).style.display = 'inline-block';
      input.value = category.nameCategory;
      input.style.display = 'inline-block';
    }
  };

  export const handleUpdateCategoryConfirm = async (category: CategoryModel, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const buttons = event.currentTarget.parentNode?.children;
    const input = document.getElementById(`categoryNameInput-${category.id}`) as HTMLInputElement;
    const card = event.currentTarget.closest(`.${styles.card}`) as HTMLElement | null;
    if (buttons && input && card) {
      try {
        const updatedCategory = await fetchUpdateCategory(category.id, input.value);
        if (updatedCategory) {
          // Update the user's card
          const categoryIdElement = card.querySelector("h3:nth-of-type(1)");
          const categoryNameElement = card.querySelector("h3:nth-of-type(2)");
  
          if (categoryIdElement && categoryNameElement) {
            categoryIdElement.textContent = `Id: ${updatedCategory.id}`;
            categoryNameElement.textContent = `Name category: ${updatedCategory.nameCategory}`;
        }
  
          // Update the user object with the new name
          category.nameCategory = updatedCategory.nameCategory;
  
          // Hide the "Issue a Moderator" and "Delete a Moderator" buttons
          hideButtons(category, buttons);
  
          // Show the "Check Mark" and "Cancellation" buttons
          showButtons(category, buttons);
        }
      } catch (error) {
        console.error("Error updating category:", error);
      }
    }
  };

  export const handleDeleteCategory = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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

  export const handleDeleteCategoryConfirm = async (category: CategoryModel, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const buttons = event.currentTarget.parentNode?.children;
    if (buttons) {
      try{
        await fetchDeleteCategoryAsync(category.id);

        // Hide the "Issue a Moderator" and "Delete a Moderator" buttons
        hideButtons(category, buttons);

        // Show the "Check Mark" and "Cancellation" buttons
        showButtons(category, buttons);
      } catch (error) {
        console.error("Error deletion moderator:", error);
      }
    }
  };

  export const handleCancellation = async (category: CategoryModel, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const buttons = event.currentTarget.parentNode?.children;
  
    if (buttons) {
      // Hide the "Issue a Moderator" and "Delete a Moderator" buttons
      hideButtons(category, buttons);
  
      // Show the "Check Mark" and "Cancellation" buttons
      showButtons(category, buttons);
    }
  };

  const hideButtons = (category: CategoryModel, buttons: HTMLCollection) => {
    (buttons[1] as HTMLElement).style.display = 'none';
    (buttons[2] as HTMLElement).style.display = 'none';
    (buttons[4] as HTMLElement).style.display = 'none';
    (buttons[5] as HTMLElement).style.display = 'none';
    const input = document.getElementById(`categoryNameInput-${category.id}`) as HTMLInputElement;
    input.style.display = 'none';
  };
  
  const showButtons = (category: CategoryModel, buttons: HTMLCollection) => {
    const nameCategory = document.getElementById(`categoryName-${category.id}`)!;
    nameCategory.style.display = 'inline-block';
    (buttons[0] as HTMLElement).style.display = 'inline-block';
    (buttons[3] as HTMLElement).style.display = 'inline-block';
  };