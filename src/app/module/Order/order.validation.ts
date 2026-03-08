import z from "zod";

const createOrder = z.object({
    body: z.object({
        customerId: z.string().uuid(),

        shopId: z.string().uuid(),

        totalAmount: z.number(),

        discount: z.number().optional(),

        shippingFee: z.number().optional(),

        grandTotal: z.number(),

        shippingAddress: z.any(),

        billingAddress: z.any().optional()
    })
})

export const OrderValidationSchema = {
    createOrder
}