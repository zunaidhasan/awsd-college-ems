import { api } from "../api";

/** Shape returned by GET /attendance/summary/:studentId */
export interface AttendanceSummary {
  total: number;
  present: number;
  late: number;
  absent: number;
  attendancePct: number;
}

/**
 * Fetch a student's attendance summary. `studentId` is the Student profile id
 * (the `linkedProfileId` on the auth user for STUDENT accounts).
 */
export async function getAttendanceSummary(
  studentId: string,
): Promise<AttendanceSummary> {
  return api.get<AttendanceSummary>(`/attendance/summary/${studentId}`);
}
