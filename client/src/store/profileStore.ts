import { create } from "zustand";
import type { IProfile } from "../types/interfaces/IProfile";

interface IProfileStore {
  selectedProfile: IProfile | null;
  setSelectedProfile: (profile: string | IProfile | null) => void;
  profiles:IProfile[];
  setProfiles:(profiles:IProfile[])=>void;
  addProfile:(profile:IProfile)=>void
}

export const useProfileStore = create<IProfileStore>((set, get) => ({
  selectedProfile: null,
  profiles:[],
  setProfiles:(profiles:IProfile[])=>{
    set({
      profiles
    })
  },
  addProfile:(profile:IProfile)=>{
    const profiles=get().profiles
   set({
    profiles:[...profiles,profile]
   })
  },
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
