export const generateSKU = (productName: string, shopId: string): string => {
    const prefix = productName.toUpperCase().slice(0, 3);
    const random = Math.random().toString(36).slice(2, 6).toUpperCase();
    const shopShort = shopId.slice(0, 4);
    return `${prefix}-${shopShort}-${random}`;
};