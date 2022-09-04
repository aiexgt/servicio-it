'use strict'

const controller = {

    add: (req, res)=>{
        req.getConnection((err, conn)=>{
            if(err) return res.status(500).send({
                status: false,
                message: "Error interno"
            })
            conn.query('INSERT INTO caso SET ?', [req.body], (err, rows)=>{
                if(err) return res.status(500).send({
                    status: false,
                    message: "Error en la base de datos",
                    err
                })
                return res.status(200).send({
                    status: true,
                    message: "Se ha creado el caso correctamente"
                })
            })
        })
    },

    read: (req, res)=>{
        req.getConnection((err, conn)=>{
            if(err) return res.status(500).send({
                status: false,
                message: "Error interno"
            })
            conn.query('SELECT * FROM caso',(err,rows)=>{
                if(err) return res.status(500).send({
                    status: false,
                    message: "Error en la base de datos",
                    err
                })
                if(rows == "") return res.status(404).send({
                    status: false,
                    message: "No hay casos"
                })
                return res.status(200).send({
                    status: true,
                    rows
                })
            })
        })
    }



}

module.exports = controller;