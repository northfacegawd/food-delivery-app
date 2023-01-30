import axios from 'axios';

export interface SignUpData {
  email: string;
  name: string;
  password: string;
}

export const signup = async (signUpData: SignUpData) => {
  const {data} = await axios.post('/user', {...signUpData});
  return data;
};
