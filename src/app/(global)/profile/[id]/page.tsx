import React from 'react';

import { getCookies } from '@/lib/action';

import ProfileCard from '@/app/(global)/profile/[id]/_components/profile-card';

import { TUser } from '@/types';

const Profile = () => {
  const user = getCookies('user') as TUser;
  return (
    <div className='flex flex-col space-y-8'>
      <ProfileCard user={user} />
    </div>
  );
};

export default Profile;
