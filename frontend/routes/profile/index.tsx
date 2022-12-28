import { h, Fragment } from "preact";
import { useEffect, useState } from "preact/hooks";
import { useProfile } from "controllers/auth";
import ProfileCard from "components/profile/card";

import style from "./style.css";

const Profile = () => {
  const [time, setTime] = useState<number>(Date.now());

  const profile = useProfile();

  useEffect(() => {
    let timer = setInterval(() => setTime(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div class={style.profile + " container-sm"}>
      <h1>Profile</h1>
      {profile.isLoading ? (
        <div>Loading...</div>
      ) : profile.error || !profile.data ? (
        <div>Failed to get profile info</div>
      ) : (
        <>
          <div class={style.action_bar}>
            <button class={style.edit}>Edit</button>
            <button class={style.deact}>Deactivate</button>
            <button class={style.delete}>Delete</button>
          </div>
          <ProfileCard user={profile.data.user} />
        </>
      )}

      <div>Current time: {new Date(time).toLocaleString()}</div>
    </div>
  );
};

export default Profile;
