export type IAdminCreatePayload = {
    password: string;
    admin: {
        name: string;
        email: string;
        contactNumber: string;
        profilePhoto?: string;
    }
}