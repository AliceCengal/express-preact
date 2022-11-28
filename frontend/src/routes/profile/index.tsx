import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { useQuery } from 'react-query'
import { getProfile } from 'controllers/auth';

import style from './style.css';

const Profile = () => {
  const [time, setTime] = useState<number>(Date.now());

  const profile = useQuery(
    ['/api/auth'],
    getProfile
  )

  useEffect(() => {
    let timer = setInterval(() => setTime(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div class={style.profile}>
      <h1>Profile</h1>
      {
        profile.isLoading ?
          <div>Loading...</div> :
          profile.isError ?
            <div>Failed to get profile info</div> :
            <div>{JSON.stringify(profile.data)}</div>
      }

      <div>Current time: {new Date(time).toLocaleString()}</div>

    </div>
  );
};

export default Profile;
