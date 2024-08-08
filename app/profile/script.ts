import { isAdminOrModeratorAsync } from "../services/userServices/isAdminOrModeratorAsync";
import { fetchUserNameChangeAsync } from "../services/userServices/fetchUserNameChangeAsync";
import { UserModel } from "../Models/UserModel/UserModel";
import { use } from "react";

export const handleBackClickAsync = async () => {
    const isAdminOrModeratorResult = await isAdminOrModeratorAsync();
    if(isAdminOrModeratorResult){
        window.location.href = '/admin';
    } else {
        window.location.href = '/';
    }
}

export const handleNameChangeAsync = async (user: UserModel) => {
    const input = document.getElementById('nameChangeInput') as HTMLInputElement;
    const h3UserName = document.getElementById('userName');
    const buttonEditUserName = document.getElementById('buttonEditUserName');
    const buttonConfirmEditUserName = document.getElementById('buttonConfirmEditUserName');
    const buttonCancellationEditUserName = document.getElementById('buttonCancellationEditUserName');

    if(input && h3UserName && buttonEditUserName && buttonConfirmEditUserName && buttonCancellationEditUserName){
        h3UserName.style.display = 'none';
        buttonEditUserName.style.display = 'none';

        input.value = user.userName;
        input.style.display = 'inline-block';
        buttonConfirmEditUserName.style.display = 'inline-block';
        buttonCancellationEditUserName.style.display = 'inline-block';
    }
};

export const handleConfirmEditUserName = async (user: UserModel) => {
    const input = document.getElementById('nameChangeInput') as HTMLInputElement;
    if(input){
        const updatedUser = await fetchUserNameChangeAsync(user.id, input.value);
        if(updatedUser) {
            const h3UserName = document.getElementById('userName');
            h3UserName!.textContent = 'Name: ' + updatedUser.userName;
            user.userName = updatedUser.userName;
            hideButtons();
            showButtons();
        }
    } 
};

export const handleCancellationEditUserName = async () => {
    hideButtons();
    showButtons();
};

const hideButtons = () => {
    const input = document.getElementById('nameChangeInput') as HTMLInputElement;
    const buttonConfirmEditUserName = document.getElementById('buttonConfirmEditUserName');
    const buttonCancellationEditUserName = document.getElementById('buttonCancellationEditUserName');

    if(input && buttonConfirmEditUserName && buttonCancellationEditUserName){
        input.style.display = 'none';
        buttonConfirmEditUserName.style.display = 'none';
        buttonCancellationEditUserName.style.display = 'none';
    }
};
  
const showButtons = () => {
    const h3UserName = document.getElementById('userName');
    const buttonEditUserName = document.getElementById('buttonEditUserName');

    if(h3UserName && buttonEditUserName){
        h3UserName.style.display = 'inline-block';
        buttonEditUserName.style.display = 'inline-block';
    }
};