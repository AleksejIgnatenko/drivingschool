import { fetchAddNewCategory } from "@/app/services/categoryServices/fetchAddNewCategory";

export const addCategory = async () => {
    const input = document.getElementById('categoryName') as HTMLInputElement;
    const result = await fetchAddNewCategory(input.value); // Добавляем await здесь

    if (result) {
        input.value = '';
    }
};