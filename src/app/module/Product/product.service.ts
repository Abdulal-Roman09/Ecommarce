import prisma from "../../../lib/prisma";
import sendToCloudinary from "../../../lib/sendToCloudinary";
import { IUploadedFile } from "../../interface/file";
import { FromDataProps } from "../../interface/FromDataProps";

const generateSKU = (productName: string, shopId: string): string => {
    const prefix = productName.toUpperCase().slice(0, 3);
    const random = Math.random().toString(36).slice(2, 6).toUpperCase();
    const shopShort = shopId.slice(0, 4);
    return `${prefix}-${shopShort}-${random}`;
};

const insertIntoDB = async (payload: FromDataProps) => {
    const file = payload.file as IUploadedFile | undefined;
    console.log("data:", payload.body)
    let imageUrl = "";

    if (file) {
        const uploaded = await sendToCloudinary(file);
        if (uploaded?.secure_url) {
            imageUrl = uploaded.secure_url;
        }
    }

    const productData = payload.body.product as {
        name: string;
        brand: string;
        description?: string;
        basePrice: number;
        categoryId: string;
        shopId: string;
        vendorId: string

    };
    console.log(productData)

    const initialStock = Number(payload.body.initialStock ?? 0);
    console.log(initialStock)

    const result = await prisma.$transaction(async (tx) => {

        const createdProduct = await tx.product.create({
            data: {
                ...productData,
                image: imageUrl || null,
            },
        });
        console.log(createdProduct)

        if (initialStock > 0) {
            await tx.inventory.create({
                data: {
                    sku: generateSKU(productData.name, productData.shopId),
                    productId: createdProduct.id,
                    quantity: initialStock,
                },
            });
        }
        console.log(createdProduct)
        return createdProduct;
    });

    console.log("Product & Inventory created:", result);
    return result;

};

const getAllFromDB = async () => {
    return await prisma.product.findMany({
        include: {
            inventory: true
        }
    })
}

const deleteFromDB = async (id: string) => {
    const productData = await prisma.product.findUniqueOrThrow({
        where: { id },
        include: {
            inventory: true
        }
    })
    console.log(productData)

const result = await prisma.$transaction(async (tx) => {

    if (productData.inventory) {
        await tx.inventory.delete({
            where: {
                id: productData.inventory.id
            }
        })
    }

    const deleteProductData = await tx.product.delete({
        where: { id }
    })

    return deleteProductData
})
}

export const ProductServices = {
    insertIntoDB,
    getAllFromDB,
    deleteFromDB
};