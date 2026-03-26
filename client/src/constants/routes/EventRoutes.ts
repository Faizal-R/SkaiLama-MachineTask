export const EventRoutes={
    CREATE:'/events',
    GET_EVENTS_BY_USER:(profileId:string)=>`/events/${profileId}`,
    EDIT:'/events'
}