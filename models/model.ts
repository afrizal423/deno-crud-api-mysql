// import { Client } from "https://deno.land/x/mysql/mod.ts";
import {client} from '../settings/database.ts'
import db from '../helper/queryBuilder.ts'

class Modelku {
    getAllData(tabel : string) {
        return db.get(tabel)
    }

    getById(tabel : string, kondisi : any) {
        return db.get_where(tabel, kondisi)
    }

    delById(tabel : string, kondisi : any) {
        return db.delete(tabel,kondisi)
    }

    tmbhData(tabel : string, datainsert : any) {
        return db.insert(tabel, datainsert)
    }

    updateData(tabel : string, atributupdate : any, kondisi : any) {
        return db.update(tabel,atributupdate, kondisi)
    }

    // updateData(tabel : string , atributupdate:string,dataupdate:string, kondisi :
    // string , id : string){     return client.execute("UPDATE "+ tabel +" SET ??=?
    // WHERE ??=?",[atributupdate, dataupdate, kondisi, id]) }
    // client.execute("UPDATE users SET ??=? WHERE ??=?",["name", data.name,"id",
    // params.id]) client.execute("INSERT INTO users(name) VALUES(?)",[data.name])
    // getById(tabel : string , kondisi : string , id : string) {     return
    // client.execute("SELECT * FROM " + tabel + " WHERE "+kondisi +" = " + id) }
}

export default new Modelku();