import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Redirect, Stack, useLocalSearchParams } from "expo-router";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import moment from "moment";
import Toast from "react-native-toast-message";

import { db } from "@/config/firebaseConfig";
import { ChatType, MessageType, User } from "@/types";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const ChatScreen = () => {
  const { id }: { id: string } = useLocalSearchParams();
  const { user } = useUser();
  const scrollRef = useRef<ScrollView | null>(null);

  if (!user) return <Redirect href={"/login"} />;

  const [otherUser, setOtherUser] = useState<User | undefined>(undefined);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState("");
  useEffect(() => {
    getUserDetail();

    const messageRef = collection(db, "Chat", id, "Message");
    const collectionQuery = query(messageRef, orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(collectionQuery, (snapshot) => {
      const messageData = snapshot.docs.map((doc) => {
        const data = doc.data() as MessageType;
        return data;
      });
      setMessages(messageData);
      if (!scrollRef.current) return;
      scrollRef.current.scrollToEnd({ animated: true });
    });

    return () => unsubscribe();
  }, [scrollRef.current]);

  const onSend = async () => {
    const randomStr1 = Math.random().toString(36).substring(2, 10);
    const randomStr2 = Math.random().toString(36).substring(2, 10);
    const messageId = `${randomStr1}-${randomStr2}`;
    const data = {
      text: newMessage,
      id: messageId,
      createdAt: Date.now(),
      creator: {
        name: user.fullName,
        avatar: user.imageUrl,
        email: user.primaryEmailAddress?.emailAddress,
      },
    };

    const docRef = doc(db, "Chat", id, "Message", data.id);
    setNewMessage("");
    try {
      await setDoc(docRef, data);
      if (!scrollRef.current) return;
      scrollRef.current.scrollToEnd({ animated: true });
    } catch (error) {
      Toast.show({
        text1: "오류 발생",
      });
    }
  };

  const getUserDetail = async () => {
    const docRef = doc(db, "Chat", id);
    const snapshot = await getDoc(docRef);
    const data = { id, ...snapshot.data() } as ChatType;

    const otherUserData = data.users.filter(
      (item) => item.email !== user?.primaryEmailAddress?.emailAddress
    );

    setOtherUser(otherUserData[0]);
  };

  if (!otherUser) return <ActivityIndicator />;

  const checkBeforeDay = (t1: number, t2: number) => {
    const currentTime = moment(t1);
    const prevTime = moment(t2);

    const isSameDay = currentTime.isSameOrBefore(prevTime, "day");
    return !isSameDay;
  };

  const checkCreator = (messageCreatorEmail: string) => {
    const currentUserEmail = user.primaryEmailAddress?.emailAddress;
    return currentUserEmail === messageCreatorEmail;
  };

  const formatDate = (time: number) => {
    const date = new Date(time);
    const hours = date.getHours() % 12 ? date.getHours() % 12 : 12;
    const minutes =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    const ampm = date.getHours() >= 12 ? "PM" : "AM";

    return `${hours}:${minutes} ${ampm}`;
  };

  return (
    <>
      <Stack.Screen
        options={{ title: otherUser.name, headerBackTitleVisible: false }}
      />
      <ScrollView style={{ marginBottom: 80 }} ref={scrollRef}>
        {messages.map((message, index) => (
          <View key={message.id} style={{ marginVertical: 5 }}>
            {(index === 0 ||
              checkBeforeDay(
                message.createdAt,
                messages[index - 1].createdAt
              )) && (
              <Text style={styles.date}>
                {moment(message.createdAt).format("YY년 MM월 DD일")}
              </Text>
            )}

            <View
              style={[
                styles.message,
                checkCreator(message.creator.email)
                  ? styles.right
                  : styles.left,
              ]}
            >
              <Text
                style={[
                  checkCreator(message.creator.email)
                    ? styles.messageRightText
                    : styles.messageLeftText,
                ]}
              >
                {message.text}
              </Text>
              <Text
                style={[
                  styles.messageDate,
                  checkCreator(message.creator.email)
                    ? styles.rightDate
                    : styles.leftDate,
                ]}
              >
                {formatDate(message.createdAt)}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="메세지 보내기"
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <Pressable style={styles.send} onPress={onSend}>
          <Ionicons name="send" size={24} color={Colors.PRIMARY} />
        </Pressable>
      </View>
    </>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  inputContainer: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    padding: 20,
  },
  input: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    fontSize: 18,
    flex: 1,
    backgroundColor: Colors.WHITE,
    borderRadius: 50,
  },
  send: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  date: { textAlign: "center", color: Colors.GRAY },
  message: {
    padding: 10,
    borderRadius: 10,
    maxWidth: "50%",
  },
  messageDate: {
    color: Colors.GRAY,
    marginTop: 5,
    fontSize: 12,
  },
  rightDate: {
    textAlign: "right",
    color: Colors.SILVER,
  },
  leftDate: {
    textAlign: "left",
  },
  messageRightText: {
    color: Colors.WHITE,
  },
  messageLeftText: {},

  right: {
    backgroundColor: Colors.PRIMARY,
    borderBottomRightRadius: 0,
    marginLeft: "45%",
    marginRight: "5%",
    alignSelf: "flex-end",
  },
  left: {
    backgroundColor: Colors.WHITE,
    marginRight: "45%",
    marginLeft: "5%",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 0,
  },
});
