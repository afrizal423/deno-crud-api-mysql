<p align="right">
بِسْــــــــــــــمِ اللَّهِ الرَّحْمَنِ الرَّحِيم 
</p>

# Deno API CRUD mysql

Belajar API CRUD menggunakan Deno, Oak dan MySQL

## cara install

Download repo ini <br>
Install Deno, [silahkan baca caranya](https://blog.afrizalmy.com/read/what-is-deno/) <br>
buat dan dump database <br>
```
  CREATE TABLE users (
      id int(11) NOT NULL AUTO_INCREMENT,
      nama varchar(100) NOT NULL,
      alamat varchar(200) DEFAULT NULL,
      created_at timestamp not null default current_timestamp,
      PRIMARY KEY (id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

```
Jalankan server 
```
deno run --allow-net --allow-env main.ts
```

## Routes

```
GET      /api/v1/biodata
GET      /api/v1/biodata/:id
POST     /api/v1/biodata
PUT      /api/v1/biodata/:id
DELETE   /api/v1/biodata/:id
```

## Simple Query Builder

```
import db from '../helper/queryBuilder.ts'

var tabel = 'users'
```
Tampilkan semua data
```
db.get(tabel)
```
Tampilkan data berdasarkan keinginan
```
var data = {
  id: data.id,
  dll.
}

db.get_where(tabel, data)
```
Tambah data
```
var data = {
  nama: data.nama,
  alamat: data.alamat
  dll.
}

db.insert(tabel, data)
```
Update data
```
var data = {
  nama: data.nama,
  alamat: data.alamat
  dll.
}
var where = {
  id: data.id,
  nama: data.nama,
  dll.
}

db.update(tabel, data, where)
```
Hapus data
```
var where = {
  id: data.id,
  nama: data.nama,
  dll.
}

db.delete(tabel, where)
```
