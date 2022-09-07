import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '28418260-76404dde83faaf67fb91aa638';

axios.defaults.baseURL = BASE_URL;

export const getGallery = async (search, page) => {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: search,
    image_type: 'photo',
    orientation: 'horizontal',
    safesaerch: true,
    page,
  });
  console.log('API, str18', search, page);
  const responce = await axios.get(`/?${searchParams}`);

  return responce.data;
};

// export async function getGallery(searchQuery) {
//   const searchParams = new URLSearchParams({
//     key: API_KEY,
//     q: searchQuery,
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesaerch: true,
//     page,
//     per_page: perPage,
//   });

//   const responce = axios.get(`/?${searchParams}`);
//   page += 1;

//   return responce.data;
// }

// export fetchGallery = params => {
//   const searchParams = params;
//   return axios.get('${BASE_URL}/?${API_KEY}&${searchParams}');
// };
