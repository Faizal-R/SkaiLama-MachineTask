import { create } from "zustand";
import type { IProfile } from "../types/interfaces/IProfile";

interface IProfileStore {
  selectedProfile: IProfile | null;
  setSelectedProfile: (profile: string | IProfile | null) => void;
}

export const useProfileStore = create<IProfileStore>((set, get) => ({
  selectedProfile: null,
  setSelectedProfile: (profile: string | IProfile | null) => {
    const currSelectedProfile = get().selectedProfile;
    set({
      selectedProfile:
        (profile as IProfile).id == currSelectedProfile?.id
          ? null
          : (profile as IProfile),
    });
  },
}));
