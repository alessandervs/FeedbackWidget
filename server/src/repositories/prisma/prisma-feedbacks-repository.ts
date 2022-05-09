import { prisma } from "../../prisma";
import { FeedbackCreateData, FeedbacksRepository } from "../feedbacks-repository";

export class PrismaFeedbacksRepository implements FeedbacksRepository{

        async create ({type, comment, screenshot, satisfaction}: FeedbackCreateData) {
            await prisma.feedback.create({
                data: {
                    type: type,
                    comment: comment,
                    screenshot: screenshot,
                    satisfaction: satisfaction,
                    
                }
            })        

        };

}