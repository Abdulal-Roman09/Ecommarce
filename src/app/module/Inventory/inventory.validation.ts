import { z } from "zod";

export const addQuantityZodSchema = z.object({
    quantity: z.number({message: "Quantity is required"}).positive("Quantity must be greater than 0"),
  })
