import { api } from "../api";
import type { Notice } from "../../data/mockData";

/**
 * Raw notice as returned by the NestJS backend (Prisma `Notice` model).
 * Bilingual fields are nullable — older/admin-created rows may only have the
 * monolingual `title`/`content`.
 */
export interface BackendNotice {
  id: string;
  title: string;
  titleBn: string | null;
  titleEn: string | null;
  content: string;
  contentBn: string | null;
  contentEn: string | null;
  category: string | null;
  audience: "ALL" | "STUDENT" | "TEACHER";
  createdBy: string;
  createdAt: string;
}

const VALID_CATEGORIES = ["academic", "exam", "event", "general"] as const;
type NoticeCategory = (typeof VALID_CATEGORIES)[number];

const normalizeCategory = (category: string | null): NoticeCategory => {
  const c = (category ?? "").toLowerCase();
  return (VALID_CATEGORIES as readonly string[]).includes(c)
    ? (c as NoticeCategory)
    : "general";
};

/**
 * Map a backend notice onto the frontend `Notice` shape the UI already renders.
 * Falls back to the monolingual `title`/`content` when a language-specific
 * field is missing, so no card ever renders blank.
 */
export const mapNotice = (n: BackendNotice): Notice => ({
  id: n.id,
  date: n.createdAt.slice(0, 10), // ISO → YYYY-MM-DD
  category: normalizeCategory(n.category),
  titleBn: n.titleBn ?? n.title,
  titleEn: n.titleEn ?? n.title,
  contentBn: n.contentBn ?? n.content,
  contentEn: n.contentEn ?? n.content,
});

/** Public notices (no auth) — used by the public homepage notice board. */
export const getPublicNotices = async (): Promise<Notice[]> => {
  const data = await api.get<BackendNotice[]>("/notices/public");
  return data.map(mapNotice);
};

/** All notices visible to the authenticated user (dashboards). */
export const getNotices = async (audience?: "ALL" | "STUDENT" | "TEACHER"): Promise<Notice[]> => {
  const query = audience ? `?audience=${audience}` : "";
  const data = await api.get<BackendNotice[]>(`/notices${query}`);
  return data.map(mapNotice);
};

/**
 * Create a notice (ADMIN/PRINCIPAL). The backend `CreateNoticeDto` is monolingual
 * ({ title, content, audience }), so we send the English strings as the canonical
 * title/content. Returns the created notice mapped to the frontend shape.
 */
export const createNotice = async (input: {
  title: string;
  content: string;
  audience?: "ALL" | "STUDENT" | "TEACHER";
}): Promise<Notice> => {
  const created = await api.post<BackendNotice>("/notices", {
    title: input.title,
    content: input.content,
    audience: input.audience ?? "ALL",
  });
  return mapNotice(created);
};
