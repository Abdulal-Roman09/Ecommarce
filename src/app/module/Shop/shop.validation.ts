import { z } from "zod";

export const createShop = z.object({
  name: z.string().min(1, "Shop name is required"),
  description: z.string().optional(),
  logo: z.string().url("Logo must be a valid URL").optional(),
  banner: z.string().url("Banner must be a valid URL").optional(),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  address: z.string().optional(),
  vendorId: z.string().uuid("Vendor ID must be a valid UUID")
});

export const updateSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  logo: z.string().url().optional(),
  banner: z.string().url().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  vendorId: z.string().uuid().optional()
});

export const ShopValidationSchema = {
    createShop,
    updateSchema
};