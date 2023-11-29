import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import auth from "../firebase/firebase.config";
import useAxiosPublic from "../custoomhooks/useAxiosPublic";

export const AuthContext = createContext();

const Authprovider = ({ children }) => {
  const [loader, setLoader] = useState(true);
  const [user, setUser] = useState(); 
  const axiosPublic = useAxiosPublic()

  const createUser = (email, password) => {
    setLoader(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email,password)=>{
    setLoader(true);
    return signInWithEmailAndPassword(auth, email, password);
  }

  const logoutUser = ()=>{
    setLoader(true);
    return signOut(auth)
  }


  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => { 
      setUser(currentUser);
      if(currentUser){
        const userInfo = {email: currentUser.email}
        axiosPublic.post('/jwt',userInfo)
        .then(res=> {
          if(res.data.token){
            localStorage.setItem('access-token', res.data.token)
            setLoader(false);
          }
        })
      }else{
        localStorage.removeItem('access-token')
        setLoader(false);
      }
  });
      // setLoader(false);
  
    return () => {
      return unSubscribe();
    };
  }, []);

  const infoData = {
     loader,  
     user,
     createUser,
     loginUser,
     logoutUser
  };

  return (
    <AuthContext.Provider value={infoData}>{children}</AuthContext.Provider>
  );
};

export default Authprovider;
