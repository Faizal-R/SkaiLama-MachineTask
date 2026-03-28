import { ProfileResponseDTO } from "../profile/ProfileResponseDTO.js";

export interface EventLogResponseDTO {
  id: string;
  eventId: string;
  field: "timezone" | "profiles" | "startTime" | "endTime";
  oldValue: string | string[] | (string | ProfileResponseDTO)[] | null;
  newValue: string | string[] | (string | ProfileResponseDTO)[] | null;
  createdAt: string;
}
