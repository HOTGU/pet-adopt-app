import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import { Pet } from "@/types";
import MarkFav from "../MarkFav";

const PetListItem = ({ pet }: { pet: Pet }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push(`/pet/${pet.id}`)}
      style={{
        padding: 10,
        marginRight: 10,
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
      }}
    >
      <View style={{ position: "absolute", right: 10, top: 10, zIndex: 10 }}>
        <MarkFav petId={pet.id} color="white" />
      </View>
      <Image
        source={{ uri: pet.imageUrl }}
        style={{
          width: 150,
          height: 135,
          borderRadius: 10,
          objectFit: "cover",
        }}
      />
      <Text style={{ fontFamily: "ibm-medium", fontSize: 18 }}>{pet.name}</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: Colors.GRAY,
            fontFamily: "ibm",
          }}
        >
          {pet.breed}
        </Text>
        <Text
          style={{
            color: Colors.PRIMARY,
            fontFamily: "ibm",
            backgroundColor: Colors.LIGHT_PRIMARY,
            paddingHorizontal: 10,
            fontSize: 12,
            borderRadius: 8,
          }}
        >
          {pet.age} 살
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PetListItem;

const styles = StyleSheet.create({});
