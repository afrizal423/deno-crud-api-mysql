import modelku from "../models/model.ts"

// @route   GET /api/v1/biodata/
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


// @route   GET /api/v1/biodata/:id
const getUser = async ({ params, response }: { params: { id: string }, response: any }) => {
    var kondisiObj = {
        id: params.id
    }
    try {
        const result = await modelku.getById('users' , kondisiObj)
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

// @route   Post /api/v1/biodata
const addUsers = async ({ request, response }: { request: any, response: any }) => {
    const body = await request.body()
    const data = body.value
    const myObj = {
        nama: (data.nama !== undefined ? data.nama : "null"),
        umur: (data.nama !== undefined ? data.umur : "null"),
        alamat: (data.nama !== undefined ? data.alamat : "null")
    }

    if (!request.hasBody) {
        response.status = 400
        response.body = {
            success: false,
            msg: 'No data'
        }
    } else {
        try {
            const result = await modelku.tmbhData('users', myObj)

            response.status = 201
            response.body = {
                success: true,
                data: result
            }
        } catch (err) {
            response.status = 500
            response.body = {
                success: false,
                msg: err.toString(),
                tips: 'Cek lagi atributnya sama atau tidak. Harus sama(!)'
            }
        }
    }
}

// @route   PUT /api/v1/biodata/:id
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
            umur : data.umur,
            alamat : data.alamat,
        }
        const updateparam = {
            id: params.id
        }
        if (!request.hasBody) {
            response.status = 400
            response.body = {
                success: false,
                msg: 'No data'
            }
        } else {
            try {
                const result = await modelku.updateData('users', updatedata, updateparam)

                response.status = 200
                response.body = {
                    success: true,
                    data: result
                }
            } catch (err) {
                response.status = 500
                response.body = {
                    success: false,
                    msg: err.toString(),
                }
            }
        }
    }
}

// @route   DELETE /api/v1/biodata/:id
const deleteUsers = async ({ params, response }: { params: { id: string }, response: any }) => {
    await getUser({ params: { "id": params.id }, response })
    var kondisiObj = {
        id: params.id
    }
    if(response.status === 404) {
        response.body = {
            success: false,
            msg: response.body.msg
        }
        response.status = 404
        return
    } else {
        try {
            const result = await modelku.delById('users' , kondisiObj)

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