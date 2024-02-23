import axios from '@/lib/axios';

const signOut = () => axios.get('/auth/logout');

export default signOut;
