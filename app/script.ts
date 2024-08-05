import { getCookie } from "./Infrastructure/getCookie";

export const handleGetTestCategory = async (categoryId: string) => {
  const jwtToken = getCookie('jwtToken');
  if (jwtToken) {
    window.location.href = `/categoryTest?id=${categoryId}`;
  } else {
    window.location.href = `/login`;
  }
};