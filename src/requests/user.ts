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

export const logout = async (accessToken: string) => {
  const {data} = await axios.post(
    '/logout',
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return data;
};

export const refresh = async (refreshToken: string) => {
  const {data} = await axios.post<SignInResponse>(
    '/refreshToken',
    {},
    {headers: {Authorization: `Bearer ${refreshToken}`}},
  );

  return data.data;
};
