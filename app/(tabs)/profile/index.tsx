import { View, Text, Pressable } from "react-native";
import React from "react";
import { useClerk } from "@clerk/clerk-expo";

const ProfileScreen = () => {
  const { signOut } = useClerk();
  return (
    <Pressable onPress={() => signOut()} style={{ marginTop: 100 }}>
      <Text>ProfileScreen</Text>
    </Pressable>
  );
};

export default ProfileScreen;
