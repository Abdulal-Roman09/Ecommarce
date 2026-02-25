import { randomUUID } from "crypto";
import config from "../../../config";
import httpStatus from "http-status";
import prisma from "../../../lib/prisma";
import AppError from "../../errors/appError";
import { verifyToken } from "../../../lib/jwtTokenGenerate&Verify";
import { PaymentStatus } from "@prisma/client";


const insertIntoDB = async (orderId: string, token: string) => {
    if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized")
    }

    let decoded: any;
    try {
        decoded = verifyToken(token, config.access_token.secret);
    } catch (err) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
    }

    const orderData = await prisma.order.findUniqueOrThrow({
        where: { id: orderId }
    });

    if (orderData.paymentStatus === PaymentStatus.PAID) {
        throw new AppError(httpStatus.BAD_REQUEST, "Order is already paid");
    }

    const customer = await prisma.customer.findUnique({ where: { email: decoded.email } });
    if (!customer) throw new AppError(httpStatus.NOT_FOUND, "Customer not found");

    if (customer.id !== orderData.customerId) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not allowed to pay for this order");
    }

    const amount = Number(orderData.grandTotal) || 0;
    const transactionId = randomUUID();

    const payment = await prisma.$transaction(async (tx) => {
        const createdPayment = await tx.payment.create({
            data: {
                amount,
                transactionId,
                order: { connect: { id: orderData.id } },
                customer: { connect: { id: customer.id } },
                shop: { connect: { id: orderData.shopId } },
                status: PaymentStatus.PAID,
                paidAt: new Date()
            }
        });

        await tx.order.update({
            where: { id: orderData.id },
            data: { paymentStatus: PaymentStatus.PAID }
        });

        return createdPayment;
    });

    return payment;
}

const getAllFromDB = async () => {
    const result = await prisma.payment.findMany({
        include: {
            order: true,
            customer: true,
            shop: true
        }
    });
    return result;
}

export const PaymentsServices = {
    insertIntoDB,
    getAllFromDB
};