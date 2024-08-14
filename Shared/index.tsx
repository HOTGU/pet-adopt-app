import { db } from "@/config/firebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const getFavList = async (user: any) => {
  const email = user.primaryEmailAddress.emailAddress;
  const docRef = doc(db, "UserFavPet", email);
  const docSnap = await getDoc(docRef);
  const isExists = docSnap.exists();
  if (isExists) {
    const data = docSnap.data();
    return { email: data.email, favorites: data.favorites };
  } else {
    await setDoc(docRef, {
      email,
      favorites: [],
    });

    return { email, favorites: [] };
  }
};

const updateFav = async ({
  user,
  favorites,
}: {
  user: any;
  favorites: any;
}) => {
  const email = user.primaryEmailAddress.emailAddress;

  const docRef = doc(db, "UserFavPet", email);
  try {
    await updateDoc(docRef, {
      favorites,
    });
  } catch (error) {}
};

export default {
  getFavList,
  updateFav,
};
