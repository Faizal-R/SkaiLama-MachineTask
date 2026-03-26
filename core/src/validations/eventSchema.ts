import z from "zod";

export const eventSchema = z.object({
  timezone: z
    .string()
    .trim()
    .nonempty("Timezone is Required"),
  startTime: z.iso.datetime(),
  endTime: z.iso.datetime(),
  profiles: z.array(z.string()).min(1, "At least one profile must be selected"),
});
