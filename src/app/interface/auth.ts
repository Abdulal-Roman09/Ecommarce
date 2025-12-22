export type IAuthUser = {
    email: string;
    role: string
} | null

export type IAuthLogin = {
    email: string;
    password: string
} | null
