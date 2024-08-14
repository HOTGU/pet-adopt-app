import { View, Text, Image } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { Pet } from "@/types";
import MarkFav from "../MarkFav";

const PetInfo = ({ pet }: { pet: Pet }) => {
  return (
    <View>
      <Image
        source={{ uri: pet.imageUrl }}
        style={{ width: "100%", height: 400, objectFit: "cover" }}
      />
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text style={{ fontFamily: "ibm-bold", fontSize: 24 }}>
            {pet.name}
          </Text>
          <Text style={{ fontFamily: "ibm", fontSize: 16, color: Colors.GRAY }}>
            {pet.address}
          </Text>
        </View>
        <MarkFav petId={pet.id} />
      </View>
    </View>
  );
};

export default PetInfo;
