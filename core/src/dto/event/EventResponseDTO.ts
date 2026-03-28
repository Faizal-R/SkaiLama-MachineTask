import { ProfileResponseDTO } from "../profile/ProfileResponseDTO.js";

export interface EventResponseDTO {
  id: string;
  profiles: (string | ProfileResponseDTO)[];
  timezone: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}
