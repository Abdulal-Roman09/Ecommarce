import { z } from "zod";

export const createCategory = z.object({
  title: z.string("title is required")
});


export const CategoryValidationSchema = {
  createCategory
};
