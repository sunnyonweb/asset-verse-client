import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userRole, isLoading: isRoleLoading } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);

      // মেইন ফিক্স: যদি res.data না থাকে বা role না থাকে, তবে null রিটার্ন করো
      // React Query তে undefined রিটার্ন করা যায় না।
      return res.data?.role || null;
    },
  });

  return [userRole, isRoleLoading];
};

export default useRole;
