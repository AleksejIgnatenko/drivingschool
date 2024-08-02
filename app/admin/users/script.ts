import styles from './styles.module.css';
import { fetchAddModeratorAsync, fetchDeleteModeratorAsync } from '@/app/services/userServices/fetchAddDeleteModeratorRoleAsync';
import { fetchUserNameChangeAsync } from '@/app/services/userServices/fetchUserNameChangeAsync';
import { UserModel } from '@/app/Models/UserModel/UserModel';

export const handleIssueModeratorAsync = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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

  export const handleAddModeratorRoleAsync = async (user:UserModel, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const buttons = event.currentTarget.parentNode?.children;
    const card = event.currentTarget.closest(`.${styles.card}`) as HTMLElement | null;
  
    if (buttons) {  
      try {
        const updatedUser = await fetchAddModeratorAsync(user.id);
        if (updatedUser) {
          // Update the user's card
          const userIdElement = card?.querySelector("h3:nth-of-type(1)");
          const userNameElement = card?.querySelector("h3:nth-of-type(2)");
          const emailElement = card?.querySelector("h3:nth-of-type(3)");
          const roleElement = card?.querySelector("h3:nth-of-type(4)");
  
          if (userIdElement && userNameElement && emailElement && roleElement)  {
            userIdElement.textContent = `Id: ${updatedUser.id}`;
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
        // Hide the "Issue a Moderator" and "Delete a Moderator" buttons
        hideButtons(user, buttons);

        // Show the "Check Mark" and "Cancellation" buttons
        showButtons(user, buttons)
      }
    }
  };

  export const handleDeleteModeratorAsync = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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

  export const handleDeleteModeratorRoleAsync = async (user: UserModel, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const buttons = event.currentTarget.parentNode?.children;
    const card = event.currentTarget.closest(`.${styles.card}`) as HTMLElement | null;
  
    if (buttons) {
      try {
        const updatedUser = await fetchDeleteModeratorAsync(user.id);
        if (updatedUser) {
          // Update the user's card
          const userIdElement = card?.querySelector("h3:nth-of-type(1)");
          const userNameElement = card?.querySelector("h3:nth-of-type(2)");
          const emailElement = card?.querySelector("h3:nth-of-type(3)");
          const roleElement = card?.querySelector("h3:nth-of-type(4)");
  
          if (userIdElement && userNameElement && emailElement && roleElement)  {
            userIdElement.textContent = `Id: ${updatedUser.id}`;
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
        // Hide the "Issue a Moderator" and "Delete a Moderator" buttons
        hideButtons(user, buttons);

        // Show the "Check Mark" and "Cancellation" buttons
        showButtons(user, buttons)
      }
    }
  };

  export const handleNameChangeAsync = async (user: UserModel, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const input = document.getElementById(`nameChangeInput-${user.id}`) as HTMLInputElement;
    const h3UserName = document.getElementById(`userName-${user.id}`);
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

  export const handleNameChangeConfirmAsync = async (user: UserModel, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const input = document.getElementById(`nameChangeInput-${user.id}`) as HTMLInputElement;
    const buttons = event.currentTarget.parentNode?.children;
    const card = event.currentTarget.closest(`.${styles.card}`) as HTMLElement | null;
    if (buttons && input) {
      try{
        const updatedUser = await fetchUserNameChangeAsync(user.id, input.value);
        // Hide the "Issue a Moderator" and "Delete a Moderator" buttons
        if (updatedUser) {
          // Update the user's card
          const userIdElement = card?.querySelector("h3:nth-of-type(1)");
          const userNameElement = card?.querySelector("h3:nth-of-type(2)");
          const emailElement = card?.querySelector("h3:nth-of-type(3)");
          const roleElement = card?.querySelector("h3:nth-of-type(4)");
  
          if (userIdElement && userNameElement && emailElement && roleElement)  {
            userIdElement.textContent = `Id: ${updatedUser.id}`;
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
  
  export const handleCancellationAsync = async (user: UserModel, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const buttons = event.currentTarget.parentNode?.children;
  
    if (buttons) {
      // Hide the "Issue a Moderator" and "Delete a Moderator" buttons
      hideButtons(user, buttons);
  
      // Show the "Check Mark" and "Cancellation" buttons
      showButtons(user, buttons);
    }
  };

  const hideButtons = (user: UserModel, buttons: HTMLCollection) => {
    (buttons[1] as HTMLElement).style.display = 'none';
    (buttons[2] as HTMLElement).style.display = 'none';
    (buttons[4] as HTMLElement).style.display = 'none';
    (buttons[5] as HTMLElement).style.display = 'none';
    (buttons[7] as HTMLElement).style.display = 'none';
    (buttons[8] as HTMLElement).style.display = 'none';
    const input = document.getElementById(`nameChangeInput-${user.id}`) as HTMLInputElement;
    input.style.display = 'none';
  };
  
  const showButtons = (user: UserModel, buttons: HTMLCollection) => {
    const h3UserName = document.getElementById(`userName-${user.id}`);
    h3UserName!.style.display = 'inline-block';
    (buttons[0] as HTMLElement).style.display = 'inline-block';
    (buttons[3] as HTMLElement).style.display = 'inline-block';
    (buttons[6] as HTMLElement).style.display = 'inline-block';
  };