import { Router } from 'https://deno.land/x/oak/mod.ts'
import { getUsers, getUser, deleteUsers, addUsers, updateUsers } from './controller/users.ts'

const router = new Router()

router.get('/api/v1/users', getUsers)
    .get('/api/v1/users/:id', getUser)
    .post('/api/v1/users', addUsers)
    .put('/api/v1/users/:id', updateUsers)
    .delete('/api/v1/users/:id', deleteUsers)

export default router