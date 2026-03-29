import { Check, ChevronDown, Plus, Search } from "lucide-react";
import { useEffect, useState, type ChangeEvent, type FC } from "react";
import "./UserSelector.css";
import { useCreateProfile, useGetAllProfiles } from "../../../hooks/useProfile";
import { toast } from "sonner";
import type { IProfile } from "../../../types/interfaces/IProfile";
import { useProfileStore } from "../../../store/profileStore";

interface IUserSelectorProps {
  mode: string;
  selectedProfiles?: string[];
  onHandleProfiles: (profile: string | IProfile) => void;
}

const UserSelector: FC<IUserSelectorProps> = ({
  mode,
  onHandleProfiles,
  selectedProfiles,
}) => {
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [isProfileAdding, setIsProfileAdding] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { profiles, setProfiles, addProfile } = useProfileStore();
  const { selectedProfile } = useProfileStore();

  const { createProfile } = useCreateProfile();
  const { getAllProfiles } = useGetAllProfiles();

  const handleOnChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setProfileName(e.target.value);
  };

  const onSelectorClose = () => {
    setIsSelectorOpen((prev) => !prev);
    setIsProfileAdding(false);
  };

  const onHandleUserSelect = (profile: IProfile) => {
    console.log(profile);
    onHandleProfiles(profile);
    onSelectorClose();
  };

  const handleCreateProfile = async () => {
    const response = await createProfile(profileName);
    console.log(response);
    addProfile(response.data);
    toast(response.message);
    setProfileName("");
  };

  const fetchAllProfiles = async () => {
    const response = await getAllProfiles();
    console.log(response);
    setProfiles(response.data || []);
  };

  useEffect(() => {
    fetchAllProfiles();
  }, []);

  const filteredProfiles = profiles.filter((profile) =>
  profile.name.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <div
      style={{
        width: mode == "event-form" ? "100%" : "240px",
        marginBottom: mode == "event-form" ? "10px" : "",
      }}
      className="user-selector-wrapper"
      onClick={onSelectorClose}
    >
      <span>
        {mode == "event-form"
          ? `${selectedProfiles?.length} Profiles Selected`
          : selectedProfile
            ? selectedProfile.name
            : "Select Current User"}
      </span>
      <ChevronDown size={16} className="arrow" />

      {isSelectorOpen && (
        <div className="dropdown" onClick={(e) => e.stopPropagation()}>
          <div className="search-input">
            <Search size={14} />
            <input
              type="text"
              placeholder="Search profiles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="close-btn" onClick={onSelectorClose}>
              ✕
            </button>
          </div>
          <div className="user-listing">
            {filteredProfiles.length == 0 ? (
              <div style={{ textAlign: "center", padding: "15px" }}>
                No Profile Found
              </div>
            ) : (
              (filteredProfiles || []).map((profile) => (
                <div
                  onClick={() =>
                    mode == "event-form"
                      ? onHandleProfiles(profile.id)
                      : onHandleUserSelect(profile)
                  }
                  style={{ display: "flex", alignItems: "center" }}
                >
                  {mode == "event-form"
                    ? selectedProfiles?.includes(profile.id) && (
                        <Check size={16} />
                      )
                    : selectedProfile?.id == profile.id && <Check size={16} />}
                  <div key={profile.id}>{profile.name}</div>
                </div>
              ))
            )}
          </div>
          <div className="add-profile">
            {isProfileAdding ? (
              <>
                <input
                  placeholder="Profile name"
                  value={profileName}
                  onChange={handleOnChangeName}
                />
                <button onClick={handleCreateProfile}>Add</button>
              </>
            ) : (
              <div
                onClick={() => setIsProfileAdding((prev) => !prev)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  gap: "10px",
                  padding: "8px",
                  backgroundColor: "#e5e5e5",
                  borderRadius: "10px",
                }}
              >
                <Plus size={15} />
                <p>Add Profile</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSelector;
