import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Header from "@/components/home/Header";
import Slider from "@/components/home/Slider";
import PetListByCategory from "@/components/home/PetListByCategory";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const HomeScreen = () => {
  return (
    <View
      style={{
        padding: 20,
        marginTop: 20,
        flex: 1,
        height: "auto",
      }}
    >
      {/* Header  */}
      <Header />
      {/* Slider  */}
      <Slider />
      {/* Category  */}
      <PetListByCategory />

      <TouchableOpacity onPress={() => {}} style={styles.addNewPetConatiner}>
        <MaterialIcons name="pets" size={24} color={Colors.PRIMARY} />
        <Text style={{ fontFamily: "ibm-bold", color: Colors.PRIMARY }}>
          새로운 반려동물 등록하기
        </Text>
      </TouchableOpacity>
      <View />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  addNewPetConatiner: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    padding: 20,
    marginTop: 20,
    backgroundColor: Colors.LIGHT_PRIMARY,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderStyle: "dashed",
    borderRadius: 15,
    justifyContent: "center",
  },
});
