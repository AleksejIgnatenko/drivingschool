import styles from './styles.module.css';
import { fetchAddModeratorAsync, fetchDeleteModeratorAsync } from '@/app/services/userServices/fetchAddDeleteModeratorRoleAsync';
import { fetchUserNameChangeAsync } from '@/app/services/userServices/fetchUserNameChangeAsync';
import { User } from '@/app/Models/UserModels/User';

export const handleIssueModerator = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const buttons = event.currentTarget.parentNode?.children;
  
    if (buttons) {
      // Hide the "Issue a Moderator" and "Delete a Moderator" buttons
      (buttons[0] as HTMLElement).style.display = 'none';
      (buttons[3] as HTMLElement).style.display = 'none';
      (buttons[6] as HTMLElement).style.display = 'none';
  
      // Show the "Check Mark" and "Cancellation" buttons
      (buttons[1] as HTMLElement).style.display = 'inline-block';
      (buttons[2] as HTMLElement).style.display = 'inline-block';
    }
  };

  export const handleAddModeratorRole = async (user:User, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const buttons = event.currentTarget.parentNode?.children;
    const card = event.currentTarget.closest(`.${styles.card}`) as HTMLElement | null;
  
    if (buttons) {  
      try {
        const updatedUser = await fetchAddModeratorAsync(user.idUser);
        if (updatedUser) {
          // Update the user's card
          const userIdElement = card?.querySelector("h3:nth-of-type(1)");
          const userNameElement = card?.querySelector("h3:nth-of-type(2)");
          const emailElement = card?.querySelector("h3:nth-of-type(3)");
          const roleElement = card?.querySelector("h3:nth-of-type(4)");
  
          if (userIdElement && userNameElement && emailElement && roleElement)  {
            userIdElement.textContent = `Id: ${updatedUser.idUser}`;
            userNameElement.textContent = `User name: ${updatedUser.userName}`;
            emailElement.textContent = `Email: ${updatedUser.email}`;
            roleElement.textContent = `Role: ${updatedUser.role}`;
          }

        // Hide the "Issue a Moderator" and "Delete a Moderator" buttons
        hideButtons(user, buttons);

        // Show the "Check Mark" and "Cancellation" buttons
        showButtons(user, buttons);
        }
      } catch (error) {
        console.error("Error adding moderator:", error);
      }
    }
  };

  export const handleDeleteModerator = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const buttons = event.currentTarget.parentNode?.children;
  
    if (buttons) {
      // Hide the "Issue a Moderator" and "Delete a Moderator" buttons
      (buttons[0] as HTMLElement).style.display = 'none';
      (buttons[3] as HTMLElement).style.display = 'none';
      (buttons[6] as HTMLElement).style.display = 'none';
  
      // Show the "Check Mark" and "Cancellation" buttons
      (buttons[4] as HTMLElement).style.display = 'inline-block';
      (buttons[5] as HTMLElement).style.display = 'inline-block';
    }
  };

  export const handleDeleteModeratorRole = async (user: User, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const buttons = event.currentTarget.parentNode?.children;
    const card = event.currentTarget.closest(`.${styles.card}`) as HTMLElement | null;
  
    if (buttons) {
      try {
        const updatedUser = await fetchDeleteModeratorAsync(user.idUser);
        if (updatedUser) {
          // Update the user's card
          const userIdElement = card?.querySelector("h3:nth-of-type(1)");
          const userNameElement = card?.querySelector("h3:nth-of-type(2)");
          const emailElement = card?.querySelector("h3:nth-of-type(3)");
          const roleElement = card?.querySelector("h3:nth-of-type(4)");
  
          if (userIdElement && userNameElement && emailElement && roleElement)  {
            userIdElement.textContent = `Id: ${updatedUser.idUser}`;
            userNameElement.textContent = `User name: ${updatedUser.userName}`;
            emailElement.textContent = `Email: ${updatedUser.email}`;
            roleElement.textContent = `Role: ${updatedUser.role}`;
          }

        // Hide the "Issue a Moderator" and "Delete a Moderator" buttons
        hideButtons(user, buttons);

        // Show the "Check Mark" and "Cancellation" buttons
        showButtons(user, buttons);
        }
      } catch (error) {
        console.error("Error deletion moderator:", error);
      }
    }
  };

  export const handleNameChange = async (user: User, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const input = document.getElementById(`nameChangeInput-${user.idUser}`) as HTMLInputElement;
    const h3UserName = document.getElementById(`userName-${user.idUser}`);
    const buttons = event.currentTarget.parentNode?.children;
  
    if (buttons && input && h3UserName) {
      // Hide the "Issue a Moderator" and "Delete a Moderator" buttons
      (buttons[0] as HTMLElement).style.display = 'none';
      (buttons[3] as HTMLElement).style.display = 'none';
      (buttons[6] as HTMLElement).style.display = 'none';
      h3UserName.style.display = 'none';
  
      // Show the "Check Mark" and "Cancellation" buttons
      (buttons[7] as HTMLElement).style.display = 'inline-block';
      (buttons[8] as HTMLElement).style.display = 'inline-block';
      input.value = user.userName;
      input.style.display = 'inline-block';
    }
  };

  export const handleNameChangeConfirm = async (user: User, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const input = document.getElementById(`nameChangeInput-${user.idUser}`) as HTMLInputElement;
    const buttons = event.currentTarget.parentNode?.children;
    const card = event.currentTarget.closest(`.${styles.card}`) as HTMLElement | null;
    if (buttons && input) {
      try{
        const updatedUser = await fetchUserNameChangeAsync(user.idUser, input.value);
        // Hide the "Issue a Moderator" and "Delete a Moderator" buttons
        if (updatedUser) {
          // Update the user's card
          const userIdElement = card?.querySelector("h3:nth-of-type(1)");
          const userNameElement = card?.querySelector("h3:nth-of-type(2)");
          const emailElement = card?.querySelector("h3:nth-of-type(3)");
          const roleElement = card?.querySelector("h3:nth-of-type(4)");
  
          if (userIdElement && userNameElement && emailElement && roleElement)  {
            userIdElement.textContent = `Id: ${updatedUser.idUser}`;
            userNameElement.textContent = `User name: ${updatedUser.userName}`;
            emailElement.textContent = `Email: ${updatedUser.email}`;
            roleElement.textContent = `Role: ${updatedUser.role}`;
          }

        // Update the user object with the new name
        user.userName = updatedUser.userName;

        // Hide the "Issue a Moderator" and "Delete a Moderator" buttons
        hideButtons(user, buttons);

        // Show the "Check Mark" and "Cancellation" buttons
        showButtons(user, buttons);
        }
      } catch (error) {
        console.error("Error deletion moderator:", error);
      }
    }
  };
  
  export const handleCancellation = async (user: User, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const buttons = event.currentTarget.parentNode?.children;
  
    if (buttons) {
      // Hide the "Issue a Moderator" and "Delete a Moderator" buttons
      hideButtons(user, buttons);
  
      // Show the "Check Mark" and "Cancellation" buttons
      showButtons(user, buttons);
    }
  };

  const hideButtons = (user: User, buttons: HTMLCollection) => {
    (buttons[1] as HTMLElement).style.display = 'none';
    (buttons[2] as HTMLElement).style.display = 'none';
    (buttons[4] as HTMLElement).style.display = 'none';
    (buttons[5] as HTMLElement).style.display = 'none';
    (buttons[7] as HTMLElement).style.display = 'none';
    (buttons[8] as HTMLElement).style.display = 'none';
    const input = document.getElementById(`nameChangeInput-${user.idUser}`) as HTMLInputElement;
    input.style.display = 'none';
  };
  
  const showButtons = (user: User, buttons: HTMLCollection) => {
    const h3UserName = document.getElementById(`userName-${user.idUser}`);
    h3UserName!.style.display = 'inline-block';
    (buttons[0] as HTMLElement).style.display = 'inline-block';
    (buttons[3] as HTMLElement).style.display = 'inline-block';
    (buttons[6] as HTMLElement).style.display = 'inline-block';
  };