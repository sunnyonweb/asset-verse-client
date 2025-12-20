import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth"; // আমরা একটু পরেই এটা বানাবো
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // কুকি পাঠানোর জন্য এটা মাস্ট
});

const useAxiosSecure = () => {
  // এখানে ভবিষ্যতে আমরা ইন্টারসেপ্টর বসাবো (401/403 এরর হ্যান্ডেল করার জন্য)
  return axiosSecure;
};

export default useAxiosSecure;
