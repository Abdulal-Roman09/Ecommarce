export type IAuthUser = {
    email: string;
    role: string;
};

export type IAuthLogin = {
    email: string;
    password: string
} | null
