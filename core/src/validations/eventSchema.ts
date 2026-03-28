import z from "zod";

export const eventSchema = z.object({
  id:z.string().optional(),
  timezone: z
    .string()
    .trim()
    .nonempty("Timezone is Required"),
  startTime: z.iso.datetime().optional(),
  endTime: z.iso.datetime().optional(),
  profiles: z.array(z.string()).min(1, "At least one profile must be selected"),
});
