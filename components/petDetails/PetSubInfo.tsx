import { StyleSheet, View } from "react-native";
import React from "react";
import PetSubInfoCard from "./PetSubInfoCard";
import { Pet } from "@/types";

const PetSubInfo = ({ pet }: { pet: Pet }) => {
  return (
    <View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
      <View style={{ flexDirection: "row", gap: 10, marginBottom: 10 }}>
        <PetSubInfoCard
          icon={require("@/assets/images/calendar.png")}
          title="나이"
          value={pet.age + " 살"}
        />
        <PetSubInfoCard
          icon={require("@/assets/images/bone.png")}
          title="품종"
          value={pet.breed}
        />
      </View>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <PetSubInfoCard
          icon={require("@/assets/images/sex.png")}
          title="성별"
          value={pet.sex}
        />
        <PetSubInfoCard
          icon={require("@/assets/images/weight.png")}
          title="무게"
          value={pet.weight + " kg"}
        />
      </View>
    </View>
  );
};

export default PetSubInfo;

const styles = StyleSheet.create({});
