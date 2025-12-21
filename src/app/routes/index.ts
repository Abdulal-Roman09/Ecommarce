import exprsss from 'express'
import { UserRoutes } from '../module/User/user.route'
import { AuthRoutes } from '../module/Auth/auth.route'

const router = exprsss.Router()

const moduleRoutes = [
    {
        path: '/user',
        route: UserRoutes
    },
    {
        path: '/auth',
        route: AuthRoutes
    }
]

moduleRoutes.forEach((r) => router.use(r.path, r.route))

export default router