import { api } from "../config/api";
import { ProfileRoutes } from "../constants/routes/ProfileRoutes";
import { parseAxiosError } from "../utils/parseAxiosError";

export const ProfileService = {
  createProfile: async (name: string) => {
    try {
      const response = await api.post(ProfileRoutes.CREATE_PROFILE, {name});
      return response.data;
    } catch (error) {
      return parseAxiosError(
        error,
        "An error occurred during creating Profile",
      );
    }
  },
  getAllProfiles: async () => {
    try {
      const response = await api.get(ProfileRoutes.GET_ALL);
      return response.data;
    } catch (error) {
      parseAxiosError(error, "An Error Occured While Fetching Profiles");
    }
  },
};
