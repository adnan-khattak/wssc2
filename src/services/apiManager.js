import axios from "axios";

// SignUp instances
export const ApiManager  = axios.create({
    // fyp-backend-production-27a1.up.railway.app
    baseURL:'http://192.168.43.73:7000/',
    timeout: 5000,
    headers:{
    'Content-Type':'application/json',
    // Add any other default header
    },
});

