import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";
import { Pet } from "@/types";

const PetAbout = ({ pet }: { pet: Pet }) => {
  const [readMore, setReadMore] = useState(Boolean(pet.about.length > 200));
  return (
    <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
      <Text style={{ fontFamily: "ibm-medium", fontSize: 20 }}>
        About {pet.name}
      </Text>
      <Text
        numberOfLines={readMore ? 3 : 20}
        style={{ fontFamily: "ibm", fontSize: 14 }}
      >
        {pet.about}
      </Text>
      {readMore && (
        <Pressable onPress={() => setReadMore(false)}>
          <Text
            style={{
              fontFamily: "ibm-medium",
              fontSize: 14,
              color: Colors.SECONDARY,
            }}
          >
            더 보기
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default PetAbout;

const styles = StyleSheet.create({});
