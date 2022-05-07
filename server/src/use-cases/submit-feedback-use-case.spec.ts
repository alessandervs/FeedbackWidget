import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"


// SPIES = ESPIÕES
const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }
)

describe('Submit feedback',() =>{
    it('should be able to submit a feedback', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'Exemplo comment',
            screenshot: 'data:image/png;base64,sdfasdfads4565t34fwef',
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();


    });

    it('should not be able to submit feedback without TYEPE', async () => {
        await expect(submitFeedback.execute({
            type: '',
            comment: 'Exemplo comment',
            screenshot: 'data:image/png;base64,sdfasdfads4565t34fwef',
        })).rejects.toThrow();

    });

    it('should not be able to submit feedback without COMMENT', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64,sdfasdfads4565t34fwef',
        })).rejects.toThrow();

    });

    it('should not be able to submit feedback with invalid SCREENSHOT', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'TUDO BUGADO!',
            screenshot: 'TESTE.PNG',
        })).rejects.toThrow();

    });

});