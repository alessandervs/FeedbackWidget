export interface FeedbackCreateData {
    type: string;
    comment: string;
    screenshot?: string;
    satisfaction?: string;
}

export interface FeedbacksRepository {
    create: (data: FeedbackCreateData) => Promise<void>;
}