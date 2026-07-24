/**
 * Results service — maps backend Mark[] onto the frontend StudentResult shape.
 *
 * The backend `Mark` model stores only { subject, marksObtained, totalMarks }
 * (monolingual, no grade/GPA). Grade and GPA are therefore computed here using
 * the standard Bangladesh HSC/SSC grading scale, so the UI's grade/gpa fields
 * are consistent and derived rather than invented per-record.
 */
import { api } from "../api";
import type { StudentResult } from "../../data/mockData";

/** Raw Mark shape as returned by GET /examinations/marks/by-student/:id */
export interface BackendMark {
  id: string;
  studentId: string;
  examId: string;
  subject: string;
  marksObtained: number;
  totalMarks: number;
  exam?: { id: string; name: string; date: string };
}

/** Bangladesh HSC/SSC grading scale (percentage -> letter grade + grade point). */
export function gradeFromPercent(percent: number): { grade: string; gpa: number } {
  if (percent >= 80) return { grade: "A+", gpa: 5.0 };
  if (percent >= 70) return { grade: "A", gpa: 4.0 };
  if (percent >= 60) return { grade: "A-", gpa: 3.5 };
  if (percent >= 50) return { grade: "B", gpa: 3.0 };
  if (percent >= 40) return { grade: "C", gpa: 2.0 };
  if (percent >= 33) return { grade: "D", gpa: 1.0 };
  return { grade: "F", gpa: 0.0 };
}

function toStudentResult(m: BackendMark): StudentResult {
  const total = m.totalMarks || 100;
  const percent = total > 0 ? (m.marksObtained / total) * 100 : 0;
  const { grade, gpa } = gradeFromPercent(percent);
  return {
    // Backend subject is monolingual; surface the same string for both languages
    // until a bilingual subject catalog exists on the backend.
    subjectBn: m.subject,
    subjectEn: m.subject,
    totalMarks: total,
    obtainedMarks: m.marksObtained,
    grade,
    gpa,
  };
}

/** Fetch a student's marks and map them to the UI result rows. */
export async function fetchStudentResults(studentId: string): Promise<StudentResult[]> {
  const marks = await api.get<BackendMark[]>(
    `/examinations/marks/by-student/${encodeURIComponent(studentId)}`,
  );
  return marks.map(toStudentResult);
}

/** Overall GPA across a set of results (simple mean of subject grade points). */
export function overallGpa(results: StudentResult[]): number {
  if (results.length === 0) return 0;
  const sum = results.reduce((acc, r) => acc + r.gpa, 0);
  return Math.round((sum / results.length) * 100) / 100;
}

/**
 * Compute overall GPA directly from raw backend marks (mean of per-subject
 * grade points). Used by the profile service, which loads marks via the
 * student include rather than the marks-by-student endpoint.
 */
export function computeGpaFromMarks(marks: BackendMark[]): number {
  if (marks.length === 0) return 0;
  const sum = marks.reduce((acc, m) => {
    const total = m.totalMarks || 100;
    const percent = total > 0 ? (m.marksObtained / total) * 100 : 0;
    return acc + gradeFromPercent(percent).gpa;
  }, 0);
  return Math.round((sum / marks.length) * 100) / 100;
}
