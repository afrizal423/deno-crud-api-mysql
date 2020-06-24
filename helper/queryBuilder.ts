import { client } from '../settings/database.ts'

class db {
    get(tabel : string) {
        return client.execute("SELECT * FROM " + tabel)
    }
    get_where(tabel : string, kondisi : any) {
        var atribut = new Array()
        var datanya = new Array()
        for(var propt in kondisi){
            atribut.push(propt);
            datanya.push(kondisi[propt])
        }
        var query = `SELECT * FROM `
        var getwhere = ''
        var tampungdata = new Array()
        for (let index = 0; index < atribut.length; index++) {
            // getwhere += 
            tampungdata.push(datanya[index])
            if (atribut.length == 1) {
                getwhere += "`"+atribut[index]+"`"+' = ?'
            } else {
                getwhere += "`"+atribut[index]+"`"+' = ?'+(index == datanya.length-1 ? "" : " and ")
            }
        }
        query = query+"`"+tabel+"`"+" WHERE "+getwhere
        console.log(query, tampungdata)
        return client.execute(query, tampungdata)
    }
    delete(tabel : string, kondisi : any){
        var atribut = new Array()
        var datanya = new Array()
        for(var propt in kondisi){
            atribut.push(propt);
            datanya.push(kondisi[propt])
        }
        var query = `DELETE FROM `
        var delwhere = ''
        var tampungdata = new Array()
        for (let index = 0; index < atribut.length; index++) {
            // getwhere += 
            tampungdata.push(datanya[index])
            if (atribut.length == 1) {
                delwhere += "`"+atribut[index]+"`"+' = ?'
            } else {
                delwhere += "`"+atribut[index]+"`"+' = ?'+(index == datanya.length-1 ? "" : " and ")
            }
        }
        query = query+"`"+tabel+"`"+" WHERE "+delwhere
        console.log(query, tampungdata)
        return client.execute(query, tampungdata)
    }
    insert(tabel : string, dt : any){
        var query = `INSERT INTO `
        var tabel = `${tabel} (`        
        var atribut = new Array()
        var datanya = new Array()
        for(var propt in dt){
            atribut.push(propt);
            datanya.push(dt[propt])
        }
        var dtAtribut = ''
        for (let index = 0; index < atribut.length; index++) {
            const element = atribut[index];
            // console.log(index, atribut.length)
            if (datanya[index] !== undefined) {
                dtAtribut += "`"+element+"`"+(index == atribut.length-1 ? ") " : ", ");
            }
            
            // console.log(Rtext)
        }
        var dtInput = ''
        var tampungdata = new Array()
        for (let index = 0; index < datanya.length; index++) {
            const element = datanya[index];
            tampungdata.push(element)
            // console.log(index, atribut.length)
            if (datanya[index] !== undefined) {
                dtInput += `?`+(index == datanya.length-1 ? ")" : ", ");
            }
        
            // console.log(Rtext)
        }
        var safe = query+tabel+dtAtribut+"VALUES("+dtInput
        var safety = `"${safe}", [${tampungdata}]`
        console.log(safety)
        return client.query(safe,tampungdata)
    }

    update(tabel : string, atributupdate : any, kondisi : any){
        var query = `UPDATE ` + tabel + ` `;
        var udhDiSet = false;
        // console.log(atributupdate.nama);
        var atribut = new Array()
        var datanya = new Array()
        var konArr = new Array()
        var dtArr = new Array()
        for(var propt in atributupdate){
            atribut.push(propt);
            datanya.push(atributupdate[propt])
        }
        for(var propt in kondisi){
            konArr.push(propt);
            dtArr.push(kondisi[propt])
        }
        var query2 = ''
        var tampungdata = new Array()
        for (let index = 0; index < atribut.length; index++) {
            if (datanya[index] !== undefined) {
                tampungdata.push(datanya[index])
                query2 += (index == 0 && udhDiSet != true ? "SET" : "") +` ${atribut[index]} = ?` + (datanya[index+1] !== undefined
                    ? ","
                    : (index == datanya.length-1 || datanya[index] !== undefined? "" : ", ")
            );
            udhDiSet = true;
            } else {
                query2 += (index == 0 && udhDiSet != true ? "SET" : "") + (datanya[index] !== undefined
                    ? ","
                    : (index == datanya.length-1 ? "" : "")
            );
            udhDiSet = true;
            }
            // dtAtribut += "`"+element+"`"+(index == atribut.length-1 ? ") " : ", ");
            // console.log(Rtext)
        }
        
        // cara lama
        // if (atributupdate.nama !== undefined) {
        //     query += ` SET nama = '${atributupdate.nama}'` + (
        //         atributupdate.alamat !== undefined
        //             ? ","
        //             : ""
        //     );
        //     udhDiSet = true;
        // }
        // if (atributupdate.alamat !== undefined) {
        //     if (!udhDiSet) 
        //         query += " SET ";
        //     query += ` alamat = '${atributupdate.alamat}' `
        //     udhDiSet = true;
        // }

        // ${dtArr[0]}
        tampungdata.push(dtArr[0])
        var query3 = ` WHERE ${konArr[0]} =  ?`;
        console.log(query+query2+query3, tampungdata);
        return client.execute(query+query2+query3, tampungdata)
    }
}

export default new db();