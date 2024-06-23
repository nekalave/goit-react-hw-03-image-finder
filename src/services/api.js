import axios from 'axios';

export const fetchFunc = async function(search, page) {
    const response = await axios.get(`https://pixabay.com/api/`, {
      params: {
        key: '44209717-4a56fa844a5258582c59ce6a4',
        q: search,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 12,
        page: page,
      },
    });
    return response.data;
};
