import { isAdminOrModerator } from "../services/userServices/isAdminOrModerator";

export const handleBackClickAsync = async () => {
    const isAdminOrModeratorResult = await isAdminOrModerator();
    if(isAdminOrModeratorResult){
        window.location.href = '/admin';
    } else {
        window.location.href = '/';
    }
}