import { api } from "../api";

/**
 * Raw student row as returned by GET /students (Prisma include: user, class).
 * This is the list shape — lighter than the single-student include used by the
 * profile service (no marks/fees/attendances).
 */
export interface BackendStudentListItem {
  id: string;
  rollNo: string;
  session: string;
  classId: string | null;
  user: { name: string; email: string | null; phone: string; isActive?: boolean };
  class: { name: string; section: string } | null;
}

/**
 * Frontend admin roster row. Matches the shape the admin table already renders
 * (mirrors `mockClassStudents`): bilingual name (backend is monolingual, so the
 * single `user.name` is surfaced for both), roll, and an `present`/active flag.
 */
export interface RosterStudent {
  id: string;
  nameBn: string;
  nameEn: string;
  roll: string;
  present: boolean;
  avatar: string;
  gender: string;
  group: string;
}

export const mapRosterStudent = (s: BackendStudentListItem): RosterStudent => ({
  id: s.id,
  nameBn: s.user.name,
  nameEn: s.user.name,
  roll: s.rollNo,
  // Backend has no attendance flag on the list row; treat as active by default.
  present: s.user.isActive ?? true,
  avatar: "",
  gender: "",
  group: s.class?.name ?? "",
});

/** All students (admin roster). Optionally filter by class. */
export const getAllStudents = async (classId?: string): Promise<RosterStudent[]> => {
  const query = classId ? `?classId=${encodeURIComponent(classId)}` : "";
  const data = await api.get<BackendStudentListItem[]>(`/students${query}`);
  return data.map(mapRosterStudent);
};
