import styles from './styles.module.css';
import { fetchAddModeratorAsync, fetchDeleteModeratorAsync } from '@/app/services/userServices/fetchAddDeleteModeratorRoleAsync';

export const handleIssueModerator = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const buttons = event.currentTarget.parentNode?.children;
  
    if (buttons) {
      // Hide the "Issue a Moderator" and "Delete a Moderator" buttons
      (buttons[0] as HTMLElement).style.display = 'none';
      (buttons[3] as HTMLElement).style.display = 'none';
  
      // Show the "Check Mark" and "Cancellation" buttons
      (buttons[1] as HTMLElement).style.display = 'inline-block';
      (buttons[2] as HTMLElement).style.display = 'inline-block';
    }
  };

  export const handleAddModeratorRole = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const buttons = event.currentTarget.parentNode?.children;
    const card = event.currentTarget.closest(`.${styles.card}`) as HTMLElement | null;
    const idElement = card?.querySelector("h3[data-id]");
    const id = idElement?.getAttribute("data-id");
  
    if (buttons && id) {  
      try {
        const updatedUser = await fetchAddModeratorAsync(id);
        if (updatedUser) {
          // Update the user's card
          const userIdElement = card?.querySelector("h3:nth-of-type(1)");
          const userNameElement = card?.querySelector("h3:nth-of-type(2)");
          const emailElement = card?.querySelector("h3:nth-of-type(3)");
          const roleElement = card?.querySelector("h3:nth-of-type(4)");
  
          if (userIdElement && userNameElement && emailElement && roleElement)  {
            userIdElement.textContent = `Id: ${updatedUser.idUser}`;
            userNameElement.textContent = `User name: ${updatedUser.userName}`;
            emailElement.textContent = `Email: ${updatedUser.userName}`;
            roleElement.textContent = `Role: ${updatedUser.role}`;
          }

        // Hide the "Issue a Moderator" and "Delete a Moderator" buttons
        // Hide the "Issue a Moderator" and "Delete a Moderator" buttons
        hideButtons(buttons);

        // Show the "Check Mark" and "Cancellation" buttons
        showButtons(buttons);
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
  
      // Show the "Check Mark" and "Cancellation" buttons
      (buttons[4] as HTMLElement).style.display = 'inline-block';
      (buttons[5] as HTMLElement).style.display = 'inline-block';
    }
  };

  export const handleDeleteModeratorRole = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const buttons = event.currentTarget.parentNode?.children;
    const card = event.currentTarget.closest(`.${styles.card}`) as HTMLElement | null;
    const idElement = card?.querySelector("h3[data-id]");
    const id = idElement?.getAttribute("data-id");
  
    if (buttons && id) {
      try {
        const updatedUser = await fetchDeleteModeratorAsync(id);
        if (updatedUser) {
          // Update the user's card
          const userNameElement = card?.querySelector("h3:nth-of-type(2)");
          const roleElement = card?.querySelector("h3:nth-of-type(4)");
  
          if (userNameElement && roleElement) {
            userNameElement.textContent = `User name: ${updatedUser.userName}`;
            roleElement.textContent = `Role: ${updatedUser.role}`;
          }

        // Hide the "Issue a Moderator" and "Delete a Moderator" buttons
        hideButtons(buttons);

        // Show the "Check Mark" and "Cancellation" buttons
        showButtons(buttons);
        }
      } catch (error) {
        console.error("Error deletion moderator:", error);
      }
    }
  };

  export const handleCancellation = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const buttons = event.currentTarget.parentNode?.children;
  
    if (buttons) {
      // Hide the "Issue a Moderator" and "Delete a Moderator" buttons
      hideButtons(buttons);
  
      // Show the "Check Mark" and "Cancellation" buttons
      showButtons(buttons);
    }
  };

  const hideButtons = (buttons: HTMLCollection) => {
    (buttons[1] as HTMLElement).style.display = 'none';
    (buttons[2] as HTMLElement).style.display = 'none';
    (buttons[4] as HTMLElement).style.display = 'none';
    (buttons[5] as HTMLElement).style.display = 'none';
  };
  
  const showButtons = (buttons: HTMLCollection) => {
    (buttons[0] as HTMLElement).style.display = 'inline-block';
    (buttons[3] as HTMLElement).style.display = 'inline-block';
  };