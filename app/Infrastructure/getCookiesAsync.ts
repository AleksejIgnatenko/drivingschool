import Cookies from 'js-cookie';

export const getCookiesAsync = async (nameCookies: string): Promise<string | null> => {
  const cookieValue = Cookies.get(nameCookies);
  if (!cookieValue) {
    console.error(`Cookie with name '${nameCookies}' is missing`);
    return null;
  }

  return cookieValue;
}