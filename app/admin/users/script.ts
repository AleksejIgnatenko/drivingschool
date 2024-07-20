import styles from './styles.module.css';

export const handleIssueModerator = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const buttons = event.currentTarget.parentNode?.children;
    const card = event.currentTarget.closest(`.${styles.card}`) as HTMLElement | null;
    const idElement = card?.querySelector("h3[data-id]");
    const id = idElement?.getAttribute("data-id");
  
    if (buttons && id) {
      // Hide the "Issue a Moderator" and "Delete a Moderator" buttons
      (buttons[0] as HTMLElement).style.display = 'none';
      (buttons[3] as HTMLElement).style.display = 'none';
  
      // Show the "Check Mark" and "Cancellation" buttons
      (buttons[1] as HTMLElement).style.display = 'inline-block';
      (buttons[2] as HTMLElement).style.display = 'inline-block';
  
      // Log the id of the user
      console.log("User ID:", id);
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

  export const handleCancellation = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const buttons = event.currentTarget.parentNode?.children;
  
    if (buttons) {
      // Hide the "Issue a Moderator" and "Delete a Moderator" buttons
      (buttons[1] as HTMLElement).style.display = 'none';
      (buttons[2] as HTMLElement).style.display = 'none';
      (buttons[4] as HTMLElement).style.display = 'none';
      (buttons[5] as HTMLElement).style.display = 'none';
  
      // Show the "Check Mark" and "Cancellation" buttons
      (buttons[0] as HTMLElement).style.display = 'inline-block';
      (buttons[3] as HTMLElement).style.display = 'inline-block';
    }
  };