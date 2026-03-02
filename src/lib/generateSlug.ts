import slugify from "slugify";
import prisma from "../lib/prisma";

export const generateSlug = async (
    model: "brand",
    value: string
): Promise<string> => {
    const baseSlug = slugify(value, {
        lower: true,
        strict: true,
        trim: true,
    });

    let slug = baseSlug;
    let counter = 1;

    while (true) {
        const existing =
            model === "brand"
                ? await prisma.brand.findUnique({ where: { slug } })
                : null;

        if (!existing) break;

        slug = `${baseSlug}-${counter}`;
        counter++;
    }

    return slug;
};