const express = require('express'); // create an instance of express, import express
const mysql = require('mysql');
const cors = require('cors');

const app = express(); // app var to make a API call
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'service-portal'
});

// app.get('/', (req,res) => {
//     return res.json('From backend side to frontend');
// });

app.post('/login', (req,res) => {
    const {email, password} = req.body;
    const sql = "SELECT * FROM login WHERE email = ? and password = ?";
    db.query(sql, [email, password], (err,data) => {
        if(err) return res.json("Login failed:" + err);
        if(data.length > 0) {
            return res.json(data);  // Data from MySql
        }else {
            return res.json('No Record found');
        }
    })
});

app.post('/complaints', (req, res) => { 
    const {name} = req.body;
    const sql = "SELECT * FROM register_complaints WHERE employee_name = ?";
    db.query(sql, [name], (err, results) => {
        if(err) {
            return res.status(500).send(err);
        }
        res.json(results);
    })
})

// app.get('/login', (req,res) => {
//     const {emp_id} = req.body;
//     const sql = "SELECT * FROM login WHERE employee_id = ?";
//     db.query(sql, [emp_id], (err,data) => {
        
//         if(err) return res.json("Complaint Form Details Failed:" + err);
//         if(data.length > 0) {
//             return res.json(data);  // Data from MySql
//         }else {
//             return res.json('No Record found in login');
//         }
//     })
// });


app.post('/register/complaints', (req, res) => {
    const {name, complaintVal} = req.body;
    const sql = "INSERT INTO register_complaints (employee_name, complaint_description) VALUES (?, ?)";
    db.query(sql, [name, complaintVal], (err, data) => {
        if(err) return res.json("Complaint Registration failed: " + err);
        if(data) {
            return res.json("Complaint Registered Successfully");
        }else {
            return res.json("Complaint Registration failed");
        }
    })
})

app.post('/admin_view_complaints', (req, res) => {
    const {name, designation, complaintVal} = req.body;
    const sql = "INSERT INTO admin_view_complaints (employee_name, employee_designation, complaint_description) VALUES (?, ?, ?)";
    db.query(sql, [name, designation, complaintVal], (err, data) => {
        if(err) return res.json("Complaint Registration in Admin failed: " + err);
        if(data) {
            return res.json("Complaint Registered in Admin");
        }else {
            return res.json("Complaint Registration in Admin failed");
        }
    })
})

app.get('/admin_view_complaints', (req, res) => { 
    const sql = "SELECT * FROM admin_view_complaints";
    db.query(sql, (err, results) => {
        if(err) {
            return res.status(500).send(err);
        }
        res.json(results);
    })
})


app.listen(8081, (err) => {
    if(err) console.log(err);
    console.log('Server running');
})