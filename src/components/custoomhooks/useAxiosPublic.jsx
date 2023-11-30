import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'unifiedcarenet-backend.vercel.app'
 })

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;