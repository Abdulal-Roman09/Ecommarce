import exprsss from 'express'
import { UserRoutes } from '../module/User/user.route'

const router = exprsss.Router()

const moduleRoutes = [
    {
        path: '/user',
        route: UserRoutes
    }
]

moduleRoutes.forEach((r)=>router.use(r.path,r.route))

export default router