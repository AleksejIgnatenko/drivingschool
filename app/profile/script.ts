import { isAdminOrModeratorAsync } from "../services/userServices/isAdminOrModeratorAsync";

export const handleBackClickAsync = async () => {
    const isAdminOrModeratorResult = await isAdminOrModeratorAsync();
    if(isAdminOrModeratorResult){
        window.location.href = '/admin';
    } else {
        window.location.href = '/';
    }
}