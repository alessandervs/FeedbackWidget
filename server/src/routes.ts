import express from "express";
import { NodemailerMailAdapter } from "./adapters/nodemailer/nodemailer-mail-adapter";
import { PrismaFeedbacksRepository } from "./repositories/prisma/prisma-feedbacks-repository";
import { SubmitFeedbackUseCase } from "./use-cases/submit-feedback-use-case";

export const routes = express.Router()



//curl http://localhost:3333/users
routes.post('/feedbacks', async (req, res) =>{
  const {type, comment, screenshot, satisfaction} = req.body
  console.log(satisfaction)

try{
  //Instanciar o Prisma e o nodemailer em uma constante 
  const prismaFeedbackRepository = new PrismaFeedbacksRepository()
  const nodemailerMailAdapter = new NodemailerMailAdapter()

    //Passar para o "Submit Use Case" (outros casos de uso) o prismaFeedbackRepository
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
      prismaFeedbackRepository,
      nodemailerMailAdapter
    )

  await submitFeedbackUseCase.execute({
      type,
      comment,
      screenshot,
      satisfaction,
    })

    return res.status(201).send()

  } catch (err){
    console.log(err)
  }
    return res.status(500).send()
})