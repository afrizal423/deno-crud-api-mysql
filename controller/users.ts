import modelku from "../models/model.ts"
import {client} from '../konfigurasi.ts'


const getUsers = async ({ response }: { response: any }) => {
    try {
        const result = await modelku.getAllData('users')
        response.body = {
            success: true,
            data: result.rows
        }
    } catch (err) {
        response.status = 500
        response.body = {
            success: false,
            msg: err.toString()
        }
    }
}


// @route   GET /api/v1/users/:id
const getUser = async ({ params, response }: { params: { id: string }, response: any }) => {
    try {
        const result = await modelku.getById('users' , 'id', params.id)
        // const result = await client.execute("SELECT * FROM users WHERE ?? = ?", ["id", params.id])
        response.body = {
            success: true,
            data: result.rows
        }
    } catch (err) {
        response.status = 500
        response.body = {
            success: false,
            msg: err.toString()
        }
    }
}

// @route   Post /api/v1/users
const addUsers = async ({ request, response }: { request: any, response: any }) => {
    const body = await request.body()
    const data = body.value

    if (!request.hasBody) {
        response.status = 400
        response.body = {
            success: false,
            msg: 'No data'
        }
    } else {
        try {
            const result = await modelku.tmbhData('users', ['nama'], [data.nama])
            // const result = await client.execute("INSERT INTO users(name) VALUES(?)",[
            // data.name])

            response.status = 201
            response.body = {
                success: true,
                data: result
            }
        } catch (err) {
            response.status = 500
            response.body = {
                success: false,
                msg: err.toString()
            }
        }
    }
}

// @route   PUT /api/v1/users/:id
const updateUsers = async({ params, request, response }: { params: { id: string }, request: any, response: any }) => {
    await getUser({ params: { "id": params.id }, response })

    if(response.status === 404) {
        response.body = {
            success: false,
            msg: response.body.msg
        }
        response.status = 404
        return
    } else {
        const body =  await request.body()
        const data = body.value
        const updatedata = {
            nama: data.nama ,
            alamat : data.alamat,
        }
        if (!request.hasBody) {
            response.status = 400
            response.body = {
                success: false,
                msg: 'No data'
            }
        } else {
            try {
                // var que
                console.log(updatedata)
                const result = await modelku.updateData('users', updatedata, 'id', params.id)
                // const result = await client.execute("UPDATE users SET ??=? WHERE ??=?",
                // ["nama", data.nama,
                // "id", params.id])

                response.status = 200
                response.body = {
                    success: true,
                    data: result
                }
            } catch (err) {
                response.status = 500
                response.body = {
                    success: false,
                    msg: err.toString()
                }
            }
        }
    }
}


const deleteUsers = async ({ params, response }: { params: { id: string }, response: any }) => {
    await getUser({ params: { "id": params.id }, response })

    if(response.status === 404) {
        response.body = {
            success: false,
            msg: response.body.msg
        }
        response.status = 404
        return
    } else {
        try {
            const result = await modelku.delById('users' , 'id', params.id)

            response.status = 200
            response.body = {
                success: true,
                msg: `data dengan id ${params.id} telah terhapus`
            }
        } catch (err) {
            response.status = 500
                response.body = {
                    success: false,
                    msg: err.toString()
                }
        }
    }
}

export { getUsers, getUser, deleteUsers, addUsers, updateUsers}