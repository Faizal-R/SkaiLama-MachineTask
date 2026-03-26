import { useCallback, useState } from "react";
import { ProfileService } from "../services/ProfileService";

export const useCreateProfile = () => {
  const [isLoading, setIsLoading] = useState(false);

  const createProfile = useCallback(async (name: string) => {
    setIsLoading(true);
    try {
      const response = await ProfileService.createProfile(name);
      return response;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    createProfile,
    isLoading,
  };
};

export const useGetAllProfiles = () => {
  const [isLoading, setIsLoading] = useState(false);

  const getAllProfiles = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await ProfileService.getAllProfiles();
      return response;
    } finally {
      setIsLoading(false);
    }
  }, []);
  return {
    isLoading,
    getAllProfiles,
  };
};
