import {
  View,
  Text,
  Pressable,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useClerk, useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";

type MenuType = {
  id: number;
  name: string;
  icon: any;
  path: string;
};
const ProfileScreen = () => {
  const router = useRouter();
  const { signOut } = useClerk();
  const { user } = useUser();

  const menu = [
    {
      id: 1,
      name: "동물 추가",
      icon: "add-circle",
      path: "/add",
    },
    {
      id: 5,
      name: "내가 쓴 글",
      icon: "bookmark",
      path: `/user/${user?.primaryEmailAddress?.emailAddress}`,
    },
    {
      id: 2,
      name: "찜",
      icon: "heart",
      path: "/(tabs)/favorite",
    },
    {
      id: 3,
      name: "대화",
      icon: "chatbubble",
      path: "/(tabs)/inbox",
    },
    {
      id: 4,
      name: "로그아웃",
      icon: "exit",
      path: "logout",
    },
  ] as MenuType[];

  const onPressMenu = (menu: MenuType) => {
    if (menu.name === "로그아웃") {
      signOut();
      return;
    }

    router.push(menu.path);
  };

  return (
    <View style={{ padding: 20, marginTop: 20 }}>
      <Text style={{ fontFamily: "ibm-medium", fontSize: 30 }}>프로필</Text>
      <View style={{ alignItems: "center", marginVertical: 25 }}>
        <Image
          source={{ uri: user?.imageUrl }}
          style={{ width: 80, height: 80, borderRadius: 99 }}
        />
        <Text style={{ fontFamily: "ibm-medium", fontSize: 20, marginTop: 6 }}>
          {user?.fullName}
        </Text>
        <Text style={{ fontFamily: "ibm", fontSize: 16, color: Colors.GRAY }}>
          {user?.primaryEmailAddress?.emailAddress}
        </Text>
      </View>
      <FlatList
        data={menu}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => onPressMenu(item)}
            style={{
              marginVertical: 10,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              backgroundColor: Colors.WHITE,
              padding: 10,
            }}
          >
            <Ionicons
              name={item.icon}
              size={30}
              color={Colors.PRIMARY}
              style={{
                padding: 10,
                borderRadius: 5,
                backgroundColor: Colors.LIGHT_PRIMARY,
              }}
            />
            <Text style={{ fontFamily: "ibm", fontSize: 20 }}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ProfileScreen;
