import { useEffect, useState } from "react";
import useUserProfileStore from "../store/userProfileStore";
import useShowToast from "./useShowToast";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useAuthStore from "../store/authStore";

const useGetFollowers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [followersList, setFollowersList] = useState([]);
  const { userProfile } = useUserProfileStore();
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast();

  useEffect(() => {
    const getFollowers = async () => {
      setIsLoading(true);
      try {
        const usersRef = collection(firestore, "users");
        const q = query(
          usersRef,
          where("uid", "in", [userProfile.followers, ...userProfile.followers]),
          orderBy("uid")
        );

        const querySnapshot = await getDocs(q);
        const followers = [];
        querySnapshot.forEach((doc) => {
          followers.push({ ...doc.data(), id: doc.id });
        });

        setFollowersList(followers);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };

    if (authUser) getFollowers();
  }, [authUser, showToast]);
  return { isLoading, followersList };
};

export default useGetFollowers;
