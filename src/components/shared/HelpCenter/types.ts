export interface Ticket {
    subject: string;
    description: string;
    fileName: string | null;
    fileUrl: string | null;
    date: string;
    status: string;
    statusColor: string;
    ref: string;
} 