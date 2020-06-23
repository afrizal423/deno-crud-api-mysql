// import { Client } from "https://deno.land/x/mysql/mod.ts";
import {client} from '../konfigurasi.ts'

class Modelku {
    getAllData(tabel : string) {
        return client.execute("SELECT * FROM " + tabel)
    }

    getById(tabel : string , kondisi : string , id : string) {
        return client.execute("SELECT * FROM " + tabel + " WHERE ?? = ?", [kondisi, id])
    }

    delById(tabel : string , kondisi : string , id : string) {
        return client.execute("DELETE FROM " + tabel + " WHERE ?? = ?", [kondisi, id])
    }

    tmbhData(tabel : string , atribut:string[], datanya:string[]){
        return client.execute("INSERT INTO "+ tabel +" ("+ atribut +") VALUES(?)",[datanya])
    }

    updateData(tabel : string , atributupdate: any, kondisi : string , id : string){
        var query = `UPDATE `+ tabel;
        var udhDiSet = false;
        // console.log(atributupdate.nama);

        if (atributupdate.nama !== undefined) {
            query += ` SET nama = '${atributupdate.nama}'` + (atributupdate.alamat !== undefined ? "," : "");
            udhDiSet = true;
        }
        if (atributupdate.alamat !== undefined) {
            if (!udhDiSet) query += " SET ";
            query += ` alamat = '${atributupdate.alamat}' `
            udhDiSet = true;
        }
        query += `WHERE ${kondisi} = ${id} `;
        console.log(query);
        return client.execute(query)
    }

    // updateData(tabel : string , atributupdate:string,dataupdate:string, kondisi : string , id : string){
    //     return client.execute("UPDATE "+ tabel +" SET ??=? WHERE ??=?",[atributupdate, dataupdate, kondisi, id])
    // }

    // client.execute("UPDATE users SET ??=? WHERE ??=?",["name", data.name,"id", params.id])

    // client.execute("INSERT INTO users(name) VALUES(?)",[data.name])

    // getById(tabel : string , kondisi : string , id : string) {
    //     return client.execute("SELECT * FROM " + tabel + " WHERE "+kondisi +" = " + id)
    // }
}

export default new Modelku();