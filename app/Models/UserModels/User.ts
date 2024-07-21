export interface User{
    idUser: string;
    userName: string;
    email: string;
    role: string;
    resultsTests: Record<string, number[]> | null;
}