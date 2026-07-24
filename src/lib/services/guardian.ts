import { api } from "../api";

/** Shape returned by GET /guardians/me/ward. */
export interface WardSummary {
  studentId: string;
  name: string;
  rollNo: string;
  className: string | null;
  section: string | null;
}

/**
 * Resolve the signed-in guardian's linked ward (student). The returned
 * `studentId` can then be passed to the existing student data services
 * (profile, results, finance) to populate the guardian dashboard.
 */
export const getMyWard = async (): Promise<WardSummary> => {
  return api.get<WardSummary>("/guardians/me/ward");
};