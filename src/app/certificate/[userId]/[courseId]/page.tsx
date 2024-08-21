import { getCookies } from '@/lib/action';

import Certificate from '@/app/certificate/[userId]/[courseId]/_components/certificate';

import { TUser } from '@/types';

const Page = () => {
  const user = getCookies('user') as TUser;
  return <Certificate fullName={`${user.firstName} ${user.lastName}`} />;
};

export default Page;
