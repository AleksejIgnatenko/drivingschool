export interface UserModel{
    id: string;
    userName: string;
    email: string;
    role: string;
    resultsTests: Record<string, number[]> | null;
}