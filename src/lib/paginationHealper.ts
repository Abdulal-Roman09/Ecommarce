export type IOptions = {
    page?: number,
    limit?: number,
    sortBy?: string,
    sortOrder?: string
}

type IOptionsResult = {
    page: number;
    limit: number;
    skip: number;
    sortBy: string,
    sortOrder: string
}

export const calculatePagination = (options: IOptions): IOptionsResult => {
    const page: number = Number(options.page) || 1
    const limit: number = Number(options.limit) || 10
    const skip: number = Number((page) - 1) * limit

    const sortBy: string = options.sortBy || "createdAt"
    const sortOrder: string = options.sortOrder || "decs"


    return {
        page,
        limit,
        skip,
        sortOrder,
        sortBy
    }
}


export const paginationHealperOptions = ["page", "limit", "sortBy", "sortOrder"]