import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { User } from "@/types";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const OwnerInfo = ({ user }: { user: User }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
        }}
      >
        <Image
          source={{ uri: user.imageUrl }}
          style={{ width: 50, height: 50, borderRadius: 50 }}
        />
        <View>
          <Text style={{ fontFamily: "ibm-medium", fontSize: 16 }}>
            {user.name}
          </Text>
          <Text style={{ fontFamily: "ibm", color: Colors.GRAY }}>소유자</Text>
        </View>
      </View>
      <Ionicons name="send-sharp" size={24} color={Colors.PRIMARY} />
    </View>
  );
};

export default OwnerInfo;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 15,
    marginHorizontal: 20,
    padding: 10,
    backgroundColor: Colors.WHITE,
    borderColor: Colors.PRIMARY,
  },
});
