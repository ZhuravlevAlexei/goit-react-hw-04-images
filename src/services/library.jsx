import axios from 'axios';

export async function getPhotosByAxios(searchString, page = 1) {
  const URL_KEY = 'https://pixabay.com/api/';
  const myPIXABAY_KEY = '32936589-73134fb91afb2b55fe07bd374';
  const FILTER_PARAMETERS = `?key=${myPIXABAY_KEY}&q=${searchString}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`;
  const resp = await axios.get(URL_KEY + FILTER_PARAMETERS);
  return resp;
}
