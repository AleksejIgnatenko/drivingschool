export interface UserRequest{
    userName: string;
    email: string;
    password: string;
    role: string;
}

export const createUser = async (userRequest: UserRequest) => {
    await fetch("https://localhost:7103/Users", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(userRequest)
    });
};