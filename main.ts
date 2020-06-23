import { Application } from 'https://deno.land/x/oak/mod.ts'
import router from './routers.ts'
const port = Deno.env.get("PORT") || 8000

const app = new Application()

app.use(router.routes())
app.use(router.allowedMethods())

console.log(`Server dijalankan pada port ${port}`)

await app.listen({ port: +port })