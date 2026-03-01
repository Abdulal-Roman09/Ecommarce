import prisma from "../../../lib/prisma";
import { generateSKU } from "../../../lib/sku";
import { IUploadedFile } from "../../interface/file";
import sendToCloudinary from "../../../lib/sendToCloudinary";
import { FromDataProps } from "../../interface/FromDataProps";

const insertIntoDB = async (payload: FromDataProps) => {
    const file = payload.file as IUploadedFile | undefined;

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


    const initialStock = Number(payload.body.initialStock ?? 0);


    const result = await prisma.$transaction(async (tx) => {

        const createdProduct = await tx.product.create({
            data: {
                ...productData,
                image: imageUrl || null,
            },
        });


        if (initialStock > 0) {
            await tx.inventory.create({
                data: {
                    sku: generateSKU(productData.name, productData.shopId),
                    productId: createdProduct.id,
                    quantity: initialStock,
                },
            });
        }

        return createdProduct;
    });

    return result;

};

const getAllFromDB = async () => {
    return await prisma.product.findMany({
        where: {
            isDelete: false
        },
        include: {
            inventory: true
        }
    })
}

const deleteFromDB = async (id: string) => {
    const productData = await prisma.product.findUniqueOrThrow({
        where: {
            id,
            isDelete: false
        },
        include: {
            inventory: true
        }
    })

    await prisma.$transaction(async (tx) => {

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

const softDeleteFromDB = async (id: string) => {

    const result = await prisma.product.update({
        where: { id },
        data: {
            isDelete: true
        }
    })
    return result

}

export const ProductServices = {
    insertIntoDB,
    getAllFromDB,
    deleteFromDB,
    softDeleteFromDB
};