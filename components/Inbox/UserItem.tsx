import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { User } from "@/types";
import Colors from "@/constants/Colors";
import { Link, router } from "expo-router";

const UserItem = ({ userInfo }: { userInfo: User & { id: string } }) => {
  return (
    <TouchableOpacity
      onPress={() => router.push(`/chat/${userInfo.id}`)}
      style={{ flex: 1 }}
    >
      <View
        style={{
          marginVertical: 7,
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Image
          source={{ uri: userInfo.imageUrl }}
          style={{ width: 40, height: 40, borderRadius: 99 }}
        />
        <Text style={{ fontFamily: "ibm", fontSize: 20 }}>{userInfo.name}</Text>
      </View>
      <View
        style={{
          borderWidth: 0.3,
          marginVertical: 7,
          borderColor: Colors.GRAY,
        }}
      ></View>
    </TouchableOpacity>
  );
};

export default UserItem;

const styles = StyleSheet.create({});
