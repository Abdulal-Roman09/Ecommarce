import { z } from "zod";

const createBrand = z.object({
  name: z.string().min(1, "Invalid brand data"),
  slug: z.string(),
  logo: z.string(),
  description: z.string(),
  vendorId: z.string().uuid("Invalid brand data"),
});

const updateBrand = createBrand.partial().optional()

export const BrandValidationSchema = {
  createBrand,
  updateBrand,
};