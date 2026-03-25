export const DI_TOKENS = {
  CONTROLLERS: {
    PROFILE: Symbol.for("ProfileController"),
    EVENT: Symbol.for("EventController"),
  },
  SERVICES: {
    PROFILE: Symbol.for("ProfileService"),
    EVENT: Symbol.for("EventService"),
    EVENT_LOG: Symbol.for("EventLogService"),
    //  EVENT_LOG_CHANGE_SERVICE:
  },
  REPOSITORIES: {
    PROFILE: Symbol.for("ProfileRepository"),
    EVENT: Symbol.for("EventRepository"),
    EVENT_LOG: Symbol.for("EventLogRepository"),
    EVENT_LOG_CHANGE: Symbol.for("EventLogChangeRepository"),
  },
};
