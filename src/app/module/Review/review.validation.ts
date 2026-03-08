import z from "zod";

const createReview = z.object({
    body: z.object({
        customerId: z.string().uuid(),

        productId: z.string().uuid(),

        rating: z.number().min(1).max(5),

        comment: z.string().optional()
    })
})

export const ReviewValidationSchema = {
    createReview
}