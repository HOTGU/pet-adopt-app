import { View, Text, Image } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";

const Header = () => {
  const { user } = useUser();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View>
        <Text style={{ fontFamily: "ibm", fontSize: 18 }}>환영합니다</Text>
        <Text style={{ fontFamily: "ibm-medium", fontSize: 24 }}>
          {user?.fullName}
        </Text>
      </View>
      <Image
        source={{ uri: user?.imageUrl }}
        style={{ width: 40, height: 40, borderRadius: 99 }}
      />
    </View>
  );
};

export default Header;
