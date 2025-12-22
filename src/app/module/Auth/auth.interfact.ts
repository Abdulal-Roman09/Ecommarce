export type ILoginResponse = {
    accessToken: string;
    refreshToken: string;
    needPasswordChange: boolean;
};