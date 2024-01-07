import { SignUpInstances } from "../axiosInstances";

export const signupUser = async (data) =>{
    const endpoint = "api/v1/auth/signup";
    try{
        const response = await SignUpInstances.post(endpoint, data);
        return response.data;
    } catch (error){
        throw error;
    }
    }