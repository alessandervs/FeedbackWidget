import express from "express";
import nodemailer from 'nodemailer'
import { prisma } from './prisma';

export const routes = express.Router()

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "4a038175d0cb3a",
      pass: "e0ffcb6ebf6d45"
    }
  });

//curl http://localhost:3333/users
routes.post('/feedbacks', async (req, res) =>{
    const {type, comment, screenshot} = req.body;

    const feedback = 

    await transport.sendMail({
        from: 'Equipe Feedget <oi@feedget.com>',
        to: 'Alessander Victor <sanderpant1@gmail.com>',
        subject: 'Novo feedback',
        html:[
            `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
            `<p>Tipo do Feddback: ${type} </p>`,
            `<p>Commentário: ${comment} </p>`,
            `</div>`,
        ].join('\n')
    })

    return res.status(201).json({data: feedback})
})