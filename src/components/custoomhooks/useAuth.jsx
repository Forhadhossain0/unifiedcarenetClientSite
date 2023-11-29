import { useContext } from "react";
import { AuthContext } from "../provider/Authprovider";

const useAuth = () => {

    const auths = useContext(AuthContext);
    return auths;
};

export default useAuth;