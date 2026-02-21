import { z } from "zod";

export const createProduct = z.object({
    product: z.object({
        name: z.string().min(1, "Name cannot be empty"),
        brand: z.string({ message: "Brand is required", }),
        description: z.string().optional(),
        basePrice: z.number({ message: "Base price must be a positive number" }).positive(),
        image: z.string().optional(),
        categoryId: z.string({ message: "Category ID is required" })
    })
});

export const updateProduct = z.object({
    product: z.object({
        name: z.string().optional(),
        brand: z.string().optional(),
        description: z.string().optional(),
        basePrice: z.number().positive().optional(),
        image: z.string().url().optional(),
        categoryId: z.string().uuid().optional(),
    }),
});

export const ProductValidationSchema = {
    createProduct,
    updateProduct
};