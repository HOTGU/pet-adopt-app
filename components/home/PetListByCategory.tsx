import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Category from "./Category";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import PetListItem from "./PetListItem";
import { CategoryList, Pet } from "@/types";

const PetListByCategory = () => {
  const [petList, setPetList] = useState<Pet[]>([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getPetList("강아지");
  }, []);

  const getPetList = async (category: CategoryList) => {
    setLoader(true);
    const q = query(collection(db, "Pets"), where("category", "==", category));
    const querySnapshot = await getDocs(q);

    const pets = querySnapshot.docs.map((doc) => {
      const data = doc.data();

      const petData = { id: doc.id, ...data } as Pet;
      return petData;
    });

    setPetList(pets);
    setLoader(false);
  };

  return (
    <View>
      <Category category={(value) => getPetList(value)} />
      <FlatList
        data={petList}
        horizontal
        renderItem={({ item, index }) => <PetListItem pet={item} />}
        style={{ marginTop: 10 }}
        refreshing={loader}
        onRefresh={() => getPetList("강아지")}
      />
    </View>
  );
};

export default PetListByCategory;

const styles = StyleSheet.create({});
