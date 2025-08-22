export interface User {
    id: string;
    email: string;
    name: string;
    profilePicture: string | null;
}

export interface AuthResponse {
    token: string;
    user: User;
}