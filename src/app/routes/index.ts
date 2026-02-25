import exprsss from 'express'
import { UserRoutes } from '../module/User/user.route'
import { AuthRoutes } from '../module/Auth/auth.route'
import { CategoryRouters } from '../module/Category/category.routes'
import { ProductRouters } from '../module/Product/product.route'
import { VendorRoutes } from '../module/vendor/vendor.routes'
import { ShopRouters } from '../module/Shop/shop.route'
import { InventoryRouters } from '../module/Inventory/inventory.route'
import { WishlistRoutes } from '../module/Wishlist/wishlist.route'
import { OrderRoutes } from '../module/Order/order.route'
import { PaymentsRoutes } from '../module/Payment/payment.route'


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
    {
        path: '/vendor',
        route: VendorRoutes
    },
    {
        path: '/shop',
        route: ShopRouters
    },
    {
        path: '/inventory',
        route: InventoryRouters
    },
    {
        path: '/wishlist',
        route: WishlistRoutes
    },
    {
        path: '/order',
        route: OrderRoutes
    },
    {
        path: '/payments',
        route: PaymentsRoutes
    },
]

moduleRoutes.forEach((r) => router.use(r.path, r.route))

export default router