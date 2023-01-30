import axios from 'axios';

export interface SignUpData {
  email: string;
  name: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface SignInResponse {
  data: {
    email: string;
    name: string;
    accessToken: string;
    refreshToken: string;
  };
}

export const signup = async (signUpData: SignUpData) => {
  const {data} = await axios.post('/user', {...signUpData});
  return data;
};

export const signin = async (signInData: SignInData) => {
  const {data} = await axios.post<SignInResponse>('/login', {...signInData});
  return data.data;
};
