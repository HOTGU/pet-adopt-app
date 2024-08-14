import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

const PetSubInfoCard = ({
  icon,
  title,
  value,
}: {
  icon: any;
  title: string;
  value: string | number;
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.WHITE,
        padding: 10,

        flex: 1,
        borderRadius: 15,
        gap: 10,
      }}
    >
      <Image source={icon} style={{ width: 40, height: 40 }} />
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: "ibm", fontSize: 16, color: Colors.GRAY }}>
          {title}
        </Text>
        <Text style={{ fontFamily: "ibm-medium", fontSize: 16 }}>{value}</Text>
      </View>
    </View>
  );
};

export default PetSubInfoCard;

const styles = StyleSheet.create({});
