import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { User } from "@/types";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";

const UserItem = ({ userInfo }: { userInfo: User & { id: string } }) => {
  return (
    <Link href={`/chat/${userInfo.id}`} asChild>
      <View>
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
          <Text style={{ fontFamily: "ibm", fontSize: 20 }}>
            {userInfo.name}
          </Text>
        </View>
        <View
          style={{
            borderWidth: 0.3,
            marginVertical: 7,
            borderColor: Colors.GRAY,
          }}
        ></View>
      </View>
    </Link>
  );
};

export default UserItem;

const styles = StyleSheet.create({});
