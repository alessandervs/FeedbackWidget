
export interface SendmailData{
    subject: string,
    body: string,
}

export interface MailAdapter{
    sendMail: (data: SendmailData) => Promise<void>
}