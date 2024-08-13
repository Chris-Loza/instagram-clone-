import { useEffect, useState } from "react";
import useUserProfileStore from "../store/userProfileStore";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetFollowing = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [followingList, setFollowingList] = useState([]);
  const { userProfile } = useUserProfileStore();
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast();

  useEffect(() => {
    const getFollowing = async () => {
      setIsLoading(true);
      try {
        const usersRef = collection(firestore, "users");
        const q = query(
          usersRef,
          where("uid", "in", [userProfile.following, ...userProfile.following]),
          orderBy("uid")
        );

        const querySnapshot = await getDocs(q);
        const following = [];
        querySnapshot.forEach((doc) => {
          following.push({ ...doc.data(), id: doc.id });
        });

        setFollowingList(following);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };

    if (authUser) getFollowing();
  }, [authUser, showToast]);

  return { isLoading, followingList };
};

export default useGetFollowing;
