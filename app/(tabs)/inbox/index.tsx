import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import { ChatType } from "@/types";
import UserItem from "@/components/Inbox/UserItem";

const InboxScreen = () => {
  const { user } = useUser();
  const [chatList, setChatList] = useState<ChatType[]>([]);
  const [loader, setLoader] = useState(false);
  const email = user?.primaryEmailAddress?.emailAddress;

  useEffect(() => {
    user && getUserList();
  }, []);

  const getUserList = async () => {
    setLoader(true);
    const docsRef = collection(db, "Chat");
    const whereQuery = where("userIds", "array-contains", email);
    const q = query(docsRef, whereQuery);
    const querySnapshot = await getDocs(q);
    const docs = querySnapshot.docs;

    const list = docs.map((doc) => {
      const data = { id: doc.id, ...doc.data() } as ChatType;
      return data;
    });
    setChatList(list);
    setLoader(false);
  };

  const mapOtherUserList = () => {
    return chatList.map((c) => {
      const otherUser = c.users.filter((user) => user.email !== email);
      const result = {
        id: c.id,
        ...otherUser[0],
      };
      return result;
    });
  };

  return (
    <View style={{ padding: 20, marginTop: 20 }}>
      <Text style={{ fontFamily: "ibm-medium", fontSize: 30 }}>대화</Text>
      <FlatList
        data={mapOtherUserList()}
        refreshing={loader}
        onRefresh={() => getUserList()}
        style={{ marginTop: 20 }}
        renderItem={({ item, index }) => <UserItem userInfo={item} />}
      />
    </View>
  );
};

export default InboxScreen;
