// const express = require("express");
// const mysql = require("mysql");
// const bodyParser = require("body-parser");

// const app = express();

// app.use(bodyParser.urlencoded({ extended: true }));

// app.set("view engine", "ejs");
// app.set("views", "views");
// const db = mysql.createConnection({
//   host: "localhost",
//   database: "db_mahasiswa_unklab",
//   user: "root",
//   password: "",
// });

// db.connect((err) => {
//   if (err) throw err;
//   console.log("database connected....");

//   const sql = "SELECT * FROM tbl_mahasiswa";
//   // untuk get data
//   app.get("/", (req, res) => {
//     res.render("index", { users: users, title: "MAHASISWA UNKLAB" });
//     db.query(sql, (err, result) => {
//       const users = JSON.parse(JSON.stringify(result));
//       console.log("hasil database", users);
//     });
//   });
// });
// // untuk insert data
// app.post("/tambah", (req, res) => {
//   const insertSql = `INSERT INTO tbl_mahasiswa(nama, fakultas, jurusan, tingkat)('${req.body.nama}','${req.body.fakultas}','${req.body.jurusan}','${req.body.tingkat}');`;
//   db.query(insertSql, (err, res) => {
//     if (err) throw err;
//     res.redirect("/");
//   });
// });

// app.listen(3000, () => {
//   console.log("server running");
// });

const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "views");

const db = mysql.createConnection({
  host: "localhost",
  database: "db_mahasiswa_unklab",
  user: "root",
  password: "",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Database connected....");
});

// untuk get data
app.get("/", (req, res) => {
  const sql = "SELECT * FROM tbl_mahasiswa";
  db.query(sql, (err, result) => {
    if (err) throw err;
    const users = JSON.parse(JSON.stringify(result));
    console.log("Hasil database", users);
    res.render("index", { users: users, title: "MAHASISWA UNKLAB" });
  });
});

// untuk insert data
app.post("/tambah", (req, res) => {
  const insertSql = `
      INSERT INTO tbl_mahasiswa (nama, fakultas, jurusan, tingkat) 
      VALUES ('${req.body.nama}', '${req.body.fakultas}', '${req.body.jurusan}', '${req.body.tingkat}')
    `;
  db.query(insertSql, (err, result) => {
    if (err) throw err;
    res.redirect("/");
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
