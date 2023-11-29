import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useOrganizer = () => {
  const { user, loader } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: isOrganizer, isPending: isOrganizerLoading } = useQuery({
    queryKey: [user?.email, 'isorganizer'],
    enabled: !loader,
    queryFn: async () => {
      if (user?.email) {
        const result = await axiosSecure.get(`/users/organizer/${user?.email}`);
        console.log(result?.data);
        return result.data?.organizer;
      }
    },
  });


  return [
    isOrganizer,
    isOrganizerLoading,
  ];
};

export default useOrganizer;
