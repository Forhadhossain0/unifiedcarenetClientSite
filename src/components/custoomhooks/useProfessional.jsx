import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useProfessional = () => {
  const { user,loader } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: isProfessionals, isPending: isProfessionalsLoading } = useQuery({
    queryKey: [user?.email, 'isprofessionals'],
    enabled: !loader,
    queryFn: async () => {
      if (user?.email) {
        const result = await axiosSecure.get(`/users/professionals/${user?.email}`);
        console.log(result?.data, 'inside propessinal');
        return result?.data?.professionals;
      }
    },
  });


  return [
    isProfessionals,
    isProfessionalsLoading,
  ];
};

export default useProfessional;
