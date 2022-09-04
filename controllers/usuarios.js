'use strict'

const controller = {

    search: (req, res)=>{
        req.getConnection((err, conn)=>{
            if(err) return res.status(500).send({
                status: false,
                message: "Error interno"
            })
            conn.query(`SELECT u.usuario, d.descripcion FROM usuario u 
            INNER JOIN departamento d ON d.id = u.departamento_id  
            WHERE u.correo = ?`, [req.params.correo], (err, rows)=>{
                if(err) return res.status(500).send({
                    status: false,
                    message: "Error en la base de datos",
                    err
                })
                if(rows == "") return res.status(404).send({
                    status: false,
                    message: "No existe el usuario"
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