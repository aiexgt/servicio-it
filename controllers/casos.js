'use strict'

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'alvarez.cofidi@gmail.com',
      pass: 'lzfekpvhdvptyhcd'
    }
});

transporter.verify().then(()=>{
    console.log("listo");
})

const enviarCorreo = (data)=>{

    console.log(data);
    let mailOptions = {
        from: 'telcoproyecto@gmail.com',
        to: data.correo,
        subject: 'no-reply',
        html: `
            <h2>El caso ${data.id} ha sido creado con éxito.</h2><br><br>
            <p>Caso: <b>${data.id}</b></p>
            <p>Usuario: <b>${data.usuario}</b></p>
            <p>Tipo Caso: <b>${data.descripcion}</b></p>
            <p>Descripcion: <b>${data.descripcionCaso}</b></p>
            <p>Fecha: <b>${data.fecha}</b></p>

        `
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email enviado: ' + info.response);
        }
      });
}

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
                })
                conn.query(`SELECT c.id, u.usuario, u.correo, tc.descripcion, c.descripcion AS descripcionCaso, c.fecha 
                FROM caso c INNER JOIN usuario u ON u.id = c.usuario_id
                INNER JOIN tipo_caso tc ON tc.id = c.tipo_caso_id WHERE c.id = ?`,
                [rows.insertId], (err, rows)=>{
                    if(err) return res.status(500).send({
                        status: false,
                        message: "Error en el envio de correo",
                        err
                    })
                    enviarCorreo(rows);
                    return res.status(200).send({
                        status: true,
                        rows
                    })
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