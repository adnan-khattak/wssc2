import {ApiManager} from '../apiManager';

export const loginUser = async data => {
  const endpoint = 'api/v1/auth/signin';
  try {
    const response = await ApiManager.post(endpoint, data);
    return response.data;
  } catch (error) {
    throw error;
    console.log(error);
  }
};