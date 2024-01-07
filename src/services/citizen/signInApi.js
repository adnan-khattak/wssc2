import {SignInInstances} from '../axiosInstances';

export const signInUser = async data => {
  const endpoint = 'api/v1/auth/signin';
  try {
    const response = await SignInInstances.post(endpoint, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
