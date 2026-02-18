import z from "zod";
import { Gender, UserStatus } from "@prisma/client";


const createAdmin = z.object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    admin: z.object({
        name: z.string().nonempty("Name is required"),
        email: z.string().email("Invalid email address"),
        contactNumber: z.string().nonempty("Contact number is required"),
        profilePhoto: z.string().optional(),
    })

});

const createVendor = z.object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    vendor: z.object({
        name: z.string().nonempty("Name is required!"),
        email: z.string().email("Invalid email address!"),
        contactNumber: z.string().nonempty("Contact Number is required!"),
        address: z.string().nonempty("Address is required!"),
        gender: z.enum([Gender.MALE, Gender.FEMALE], { message: "gender is required" }),
        profilePhoto: z.string().optional(),
        categoryIds: z.array(z.string()).optional(),
    })
})

const createCustomer = z.object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    customer: z.object({
        name: z.string().nonempty("Name is required!"),
        email: z.string().email("Invalid email address!"),
        contactNumber: z.string().nonempty("Contact Number is required!"),
        presentAddress: z.string().nonempty("Present address is required!"),
        profilePhoto: z.string().optional(),
    }),
})
export const changeUserStatus = z.object({
    status: z.enum([UserStatus.ACTIVE, UserStatus.BLOCKED]).optional(),
});

export const UserValidationSchema = {
    createAdmin,
    createVendor,
    createCustomer,
    changeUserStatus
};