import axios from 'axios';

export const getMoney = async (accessToken: string) => {
  const {data} = await axios.get<{data: number}>('/showmethemoney', {
    headers: {Authorization: `Bearer ${accessToken}`},
  });
  return data.data;
};
