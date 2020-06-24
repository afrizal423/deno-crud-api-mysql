import { Router } from 'https://deno.land/x/oak/mod.ts'
import { getUsers, getUser, deleteUsers, addUsers, updateUsers } from '../controller/users.ts'

const router = new Router()

router.get('/api/v1/biodata', getUsers)
    .get('/api/v1/biodata/:id', getUser)
    .post('/api/v1/biodata', addUsers)
    .put('/api/v1/biodata/:id', updateUsers)
    .delete('/api/v1/biodata/:id', deleteUsers)

export default router