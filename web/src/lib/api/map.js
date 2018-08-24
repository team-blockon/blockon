import axios from 'axios';

export const getAgents = (latitude, longitude, radius) => {
  return axios.get(
    `https://dapi.kakao.com/v2/local/search/category.json?category_group_code=AG2&x=${longitude}&y=${latitude}&radius=${radius}`,
    {
      headers: { Authorization: 'KakaoAK f2e6d9819343c31ce8ae9c5e463dbeb8' }
    }
  );
};
