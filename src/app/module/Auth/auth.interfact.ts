export type ILoginResponse = {
    accessToken: string;
    refreshToken: string;
    needPasswordChange: boolean;
};

export type IChangePassword = {
    newPassword: string;
    oldPassword: string
}