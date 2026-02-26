import { z } from "zod";

export const createBrand = z.object({
  title: z.string("title is required")
});


export const BrandValidationSchema = {
  createBrand
};
