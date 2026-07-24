import { api } from "../api";
import type { StudentProfile } from "../../data/mockData";
import { computeGpaFromMarks, type BackendMark } from "./results";
import { getAttendanceSummary } from "./attendance";

/** Shape returned by GET /students/:id (Prisma include: user, class, marks, fees, attendances). */
export interface BackendStudent {
  id: string;
  rollNo: string;
  session: string;
  fatherName: string;
  motherName: string;
  dateOfBirth: string;
  address: string;
  user: { name: string; email: string | null; phone: string };
  class: { name: string; section: string } | null;
  marks?: BackendMark[];
}

/**
 * Map a backend Student onto the frontend StudentProfile shape.
 *
 * Honest gaps (backend schema has no such field — we fall back sensibly):
 *  - Bilingual names: backend stores a single `user.name`. We use it for both
 *    nameBn and nameEn until a bilingual field is added.
 *  - regNo: not in schema; we surface rollNo as a stand-in.
 *  - bloodGroup: not in schema; returned as "" so the UI can show a dash.
 *  - guardian name: we use fatherName (the closest available field).
 *  - gpa / attendancePercentage: computed from marks / attendance summary.
 */
export function mapStudentProfile(
  s: BackendStudent,
  gpa: number,
  attendancePercentage: number,
): StudentProfile {
  const className = s.class?.name ?? "—";
  const section = s.class?.section ?? "—";
  return {
    id: s.id,
    nameBn: s.user.name,
    nameEn: s.user.name,
    roll: s.rollNo,
    regNo: s.rollNo,
    classBn: className,
    classEn: className,
    sectionBn: section,
    sectionEn: section,
    guardianNameBn: s.fatherName,
    guardianNameEn: s.fatherName,
    attendancePercentage,
    gpa,
    phone: s.user.phone,
    email: s.user.email ?? "",
    addressBn: s.address,
    addressEn: s.address,
    dob: s.dateOfBirth?.slice(0, 10) ?? "",
    bloodGroup: "",
  };
}

/**
 * Fetch a full student profile: the student record plus computed GPA and
 * attendance percentage. `studentId` is the Student profile id
 * (auth user's `linkedProfileId` for STUDENT accounts).
 */
export async function getStudentProfile(
  studentId: string,
): Promise<StudentProfile> {
  const student = await api.get<BackendStudent>(`/students/${studentId}`);
  const gpa = computeGpaFromMarks(student.marks ?? []);

  // Attendance summary is a separate endpoint; tolerate failure with 0.
  let attendancePct = 0;
  try {
    const summary = await getAttendanceSummary(studentId);
    attendancePct = summary.attendancePct;
  } catch {
    attendancePct = 0;
  }

  return mapStudentProfile(student, gpa, attendancePct);
}
