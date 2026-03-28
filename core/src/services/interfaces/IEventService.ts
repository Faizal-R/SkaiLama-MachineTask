import { CreateEventDTO } from "../../dto/event/CreateEventDTO.js";
import { EventResponseDTO } from "../../dto/event/EventResponseDTO.js";
import { UpdateEventDTO } from "../../dto/event/UpdateEventDTO.js";

export interface IEventService{
    createEvent(dto:CreateEventDTO):Promise<EventResponseDTO>
    getEventsByProfile(profileId:string):Promise<EventResponseDTO[]>
    getEventDetails(eventId: string): Promise<EventResponseDTO> 
    updateEventDetails(dto:UpdateEventDTO): Promise<EventResponseDTO> 
}