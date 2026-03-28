export const EventRoutes={
    CREATE:'/events',
    UPDATE:'/events',
    GET_EVENTS_BY_PROFILE:(profileId:string)=>`/events/profile/${profileId}`,
    EDIT:'/events',
    GET_EVENT_DETAILS:(eventId:string)=>`/events/${eventId}`,
    GET_LOGS_BY_EVENT:(eventId:string)=>`/events/logs/${eventId}`

}