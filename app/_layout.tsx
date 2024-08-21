import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SecureStore from "expo-secure-store";

import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { Text, View } from "react-native";
import Toast, {
  BaseToast,
  ErrorToast,
  ToastConfigParams,
} from "react-native-toast-message";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string;

const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log("No values stored under key: " + key);
      }
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function RootLayout() {
  useFonts({
    ibm: require("@/assets/fonts/IBMPlexSansKR-Regular.ttf"),
    "ibm-bold": require("../assets/fonts/IBMPlexSansKR-Bold.ttf"),
    "ibm-medium": require("../assets/fonts/IBMPlexSansKR-Medium.ttf"),
    "ibm-light": require("../assets/fonts/IBMPlexSansKR-Light.ttf"),
  });

  const toastConfig = {
    /*
        Overwrite 'success' type,
        by modifying the existing `BaseToast` component
      */
    success: (props: any) => <BaseToast {...props} />,
    /*
        Overwrite 'error' type,
        by modifying the existing `ErrorToast` component
      */
    error: (props: any) => <ErrorToast {...props} />,

    info: ({ text1, props }: ToastConfigParams<any>) => (
      <View
        style={{
          height: 50,
          width: "auto",
          backgroundColor: "black",
          paddingHorizontal: 20,
          marginHorizontal: 20,
          borderRadius: 50,
          opacity: 0.7,
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
          {text1}
        </Text>
      </View>
    ),
  };

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <Stack>
          <Stack.Screen name="index" />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

          <Stack.Screen
            name="pet"
            options={{
              headerTransparent: true,
              title: "",
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen
            name="add"
            options={{
              title: "반려친구 등록하기",
              headerBackTitleVisible: false,
            }}
          />
        </Stack>
        <Toast config={toastConfig} />
      </ClerkLoaded>
    </ClerkProvider>
  );
}
