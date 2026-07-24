import { api } from "../api";
import type { Invoice } from "../../data/mockData";

/** Raw fee payment from the backend (Prisma `FeePayment` model). */
export interface BackendFeePayment {
  id: string;
  studentId: string;
  amount: number;
  month: string; // e.g. "2026-07" or a human label; used as the due/period title
  status: "PENDING" | "PAID" | "OVERDUE";
  paidAt: string | null;
  provider: "MOCK_BKASH" | "MOCK_NAGAD" | "BKASH" | "NAGAD";
  providerRef: string | null;
  description: string | null;
}

/**
 * Map a backend fee payment onto the frontend `Invoice` shape.
 * The backend has no bilingual fee titles, so the single `description`
 * (falling back to `month`) is used for both languages.
 */
export const mapInvoice = (f: BackendFeePayment): Invoice => {
  const title = f.description ?? `Fees — ${f.month}`;
  return {
    id: f.id,
    titleBn: title,
    titleEn: title,
    amount: f.amount,
    dueDate: f.month,
    status: f.status === "PAID" ? "paid" : "unpaid",
    ...(f.paidAt ? { paymentDate: f.paidAt.slice(0, 10) } : {}),
  };
};

/** All fees for a given student (student/guardian dashboards). */
export const getInvoicesByStudent = async (studentId: string): Promise<Invoice[]> => {
  const data = await api.get<BackendFeePayment[]>(`/finance/by-student/${studentId}`);
  return data.map(mapInvoice);
};

/** All fees (admin/accountant finance view). */
export const getAllInvoices = async (): Promise<Invoice[]> => {
  const data = await api.get<BackendFeePayment[]>("/finance");
  return data.map(mapInvoice);
};
