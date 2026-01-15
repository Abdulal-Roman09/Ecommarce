import exprsss from 'express'
import { UserRoutes } from '../module/User/user.route'
import { AuthRoutes } from '../module/Auth/auth.route'
import { CategoryRouters } from '../module/Category/category.routes'
import { ProductRouters } from '../module/Product/product.route'

const router = exprsss.Router()

const moduleRoutes = [
    {
        path: '/user',
        route: UserRoutes
    },
    {
        path: '/auth',
        route: AuthRoutes
    },
    {
        path: '/category',
        route: CategoryRouters
    },
    {
        path: '/product',
        route: ProductRouters
    },
]

moduleRoutes.forEach((r) => router.use(r.path, r.route))

export default router