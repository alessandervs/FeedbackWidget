import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
    type: string,
    comment: string,
    screenshot?: string,
    satisfaction?: string,
}

export class SubmitFeedbackUseCase {
    constructor(
        private feedbacksRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter
    ){}
    async execute(request: SubmitFeedbackUseCaseRequest){
        const {type, comment, screenshot, satisfaction} = request;

        if(!type){
            throw new Error('Comment is required!')
        }

        if(!comment){
            throw new Error('Type is required!')
        }

        if(screenshot && !screenshot.startsWith('data:image/png;base64')){
            throw new Error('Invalid screenshot format!')

        }

        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot,
            satisfaction,
        })

        await this.mailAdapter.sendMail({
            subject: 'Novo feedback',
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
                `<p>Tipo do Feedback: ${type} </p>`,
                `<p>Comentário: ${comment} </p>`,
                screenshot? `<img src="${screenshot}" width="600" height="600"/>`: ``,
                `</div>`,
            ].join('\n')

        })

    }
    
}