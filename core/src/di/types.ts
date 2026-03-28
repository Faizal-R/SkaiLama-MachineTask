export const DI_TOKENS = {
  CONTROLLERS: {
    PROFILE: Symbol.for("ProfileController"),
    EVENT: Symbol.for("EventController"),
    EVENT_lOG: Symbol.for("EventLogController"),
   
  },
  SERVICES: {
    PROFILE: Symbol.for("ProfileService"),
    EVENT: Symbol.for("EventService"),
    EVENT_LOG: Symbol.for("EventLogService"),
  },
  REPOSITORIES: {
    PROFILE: Symbol.for("ProfileRepository"),
    EVENT: Symbol.for("EventRepository"),
    EVENT_LOG: Symbol.for("EventLogRepository"),
  },
};
