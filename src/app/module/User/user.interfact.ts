export type IAdminCreatePayload = {
    password: string;
    admin: {
        name: string;
        email: string;
        contactNumber: string;
        profilePhoto?: string;
    }
}
export type ICustomerCreatePayload = {
    password: string;
    customer: {
        name: string;
        email: string;
        contactNumber: string;
        profilePhoto?: string;
        presentAddress: string,
    }
}