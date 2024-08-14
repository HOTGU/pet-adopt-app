import { View, Text, FlatList } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  collection,
  documentId,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import Shared from "@/Shared";
import { useUser } from "@clerk/clerk-expo";
import { useFocusEffect } from "expo-router";
import { db } from "@/config/firebaseConfig";
import { Pet } from "@/types";
import PetListItem from "@/components/home/PetListItem";

const FavoriteScreen = () => {
  const { user } = useUser();
  const [favPetList, setFavPetList] = useState<Pet[]>([]);
  const [loader, setLoader] = useState(false);

  useFocusEffect(
    useCallback(() => {
      user && getFavPetIds();
    }, [user])
  );

  const getFavPetIds = async () => {
    setLoader(true);
    const result = await Shared.getFavList(user);

    if (result.favorites.length > 0) {
      getFavPetList(result.favorites);
    }
    setLoader(false);
  };

  const getFavPetList = async (favorites: string[]) => {
    const q = query(
      collection(db, "Pets"),
      where(documentId(), "in", favorites)
    );
    const querySnapshot = await getDocs(q);
    const docs = querySnapshot.docs;

    const petList = docs.map((doc) => {
      const data = doc.data();

      return { id: doc.id, ...data } as Pet;
    });

    setFavPetList(petList);
  };

  return (
    <View style={{ padding: 20, marginTop: 20 }}>
      <Text style={{ fontFamily: "ibm-medium", fontSize: 30 }}>좋아요</Text>
      <FlatList
        data={favPetList}
        numColumns={2}
        onRefresh={getFavPetIds}
        refreshing={loader}
        renderItem={({ item, index }) => (
          <View>
            <PetListItem pet={item} />
          </View>
        )}
      />
    </View>
  );
};

export default FavoriteScreen;
