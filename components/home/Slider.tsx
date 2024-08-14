import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { SliderType } from "@/types";

const Slider = () => {
  const [sliderList, setSliderList] = useState<SliderType[]>([]);
  useEffect(() => {
    getSliders();
  }, []);

  const getSliders = async () => {
    const docRef = collection(db, "Slider");

    const snapshot = await getDocs(docRef);

    const sliders = snapshot.docs.map((doc) => {
      const data = doc.data() as SliderType;
      return data;
    });

    setSliderList(sliders);
  };

  return (
    <View style={{ marginTop: 15 }}>
      <FlatList
        data={sliderList}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View>
            <Image source={{ uri: item.imageUrl }} style={styles.sliderImage} />
          </View>
        )}
      />
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({
  sliderImage: {
    width: Dimensions.get("screen").width * 0.9,
    height: 180,
    borderRadius: 15,
    marginRight: 15,
  },
});
