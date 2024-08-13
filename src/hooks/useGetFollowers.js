import { useState } from "react";
import useUserProfileStore from "../store/userProfileStore";
import useShowToast from "./useShowToast";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetFollowers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [followersList, setFollowersList] = useState([]);
  const { userProfile } = useUserProfileStore();
  const showToast = useShowToast();

  const getFollowers = async () => {
    setIsLoading(true);
    try {
      const usersRef = collection(firestore, "users");
      const q = query(
        usersRef,
        where("uid", "in", [userProfile.uid, ...userProfile.followers]),
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

  getFollowers();
  return { isLoading, followersList };
};

export default useGetFollowers;
