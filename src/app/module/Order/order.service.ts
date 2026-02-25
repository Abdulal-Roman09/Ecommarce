import config from "../../../config";
import httpStatus from "http-status";
import prisma from "../../../lib/prisma";
import AppError from "../../errors/appError";
import { verifyToken } from "../../../lib/jwtTokenGenerate&Verify";
import { ActionType, OrderStatus, PaymentStatus } from "@prisma/client";

const insertIntoDB = async (productId: string, accessToken: string, payload?: Record<string, any>) => {

    if (!accessToken) throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");

    let decoded: any;
    try {
        decoded = verifyToken(accessToken, config.access_token.secret);
    } catch {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }

    const customer = await prisma.customer.findUnique({ where: { email: decoded.email } });
    if (!customer) throw new AppError(httpStatus.NOT_FOUND, "Customer not found");

    const product = await prisma.product.findUnique({
        where: { id: productId },
        include: { shop: true, inventory: true }
    });
    if (!product) throw new AppError(httpStatus.NOT_FOUND, "Product not found");

    const inventory = product.inventory;
    const qty = payload?.orderQty !== undefined ? Number(payload.orderQty) : 1;

    if (!inventory || inventory.quantity < qty)
        throw new AppError(httpStatus.BAD_REQUEST, "Product is out of stock");

    const order = await prisma.$transaction(async (tx) => {
        const basePrice = Number(product.basePrice) || 0;
        const discount = payload?.discount !== undefined ? Number(payload.discount) : 0;

        let shippingFee: number;
        if (payload?.distance !== undefined) {
            shippingFee = Number(payload.distance) > 100 ? 80 : 50;
        } else if (payload?.shippingFee !== undefined) {
            shippingFee = Number(payload.shippingFee) || 0;
        } else {
            shippingFee = 0;
        }

        const total = basePrice * qty;
        const grandTotal = total + shippingFee - discount;

        const createdOrder = await tx.order.create({
            data: {
                customer: { connect: { id: customer.id } },
                shop: { connect: { id: product.shopId } },
                totalAmount: total,
                discount,
                shippingFee,
                grandTotal,
                status: OrderStatus.PENDING,
                paymentStatus: PaymentStatus.PENDING,
                shippingAddress: payload?.shippingAddress ?? { address: customer.presentAddress || "" },
                billingAddress: payload?.billingAddress,
                orderItems: {
                    create: [{
                        product: { connect: { id: product.id } },
                        quantity: qty,
                        price: basePrice,
                        total
                    }]
                }
            }
        });

        await tx.inventory.update({
            where: { id: inventory.id },
            data: { quantity: inventory.quantity - qty }
        });

        await tx.history.create({
            data: {
                actionType: ActionType.OUT,
                quantityChanged: qty,
                lastQuantity: inventory.quantity,
                newQuantity: inventory.quantity - qty,
                inventoryId: inventory.id
            }
        });

        return tx.order.findUnique({
            where: { id: createdOrder.id },
            include: {
                orderItems: { include: { product: true } },
                customer: true,
                shop: true
            }
        });
    });

    return order;
};

const getAllFromDB = async () => {
    const result = await prisma.order.findMany({
        include: {
            orderItems: { include: { product: true } },
            customer: true,
            shop: true,
            payment: true
        }
    });
    return result;
}

export const OrderServices = {
    insertIntoDB,
    getAllFromDB,
};