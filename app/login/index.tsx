import { View, Text, Image, Pressable } from "react-native";
import * as WebBrowser from "expo-web-browser";
import React from "react";
import * as Linking from "expo-linking";

import Colors from "@/constants/Colors";
import { useOAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL("/(tabs)/home"),
      });

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
    } catch (err) {
      console.log(err);
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
      <Image
        source={require("@/assets/images/login.png")}
        style={{
          width: "100%",
          height: 500,
        }}
      />
      <View style={{ padding: 20, alignItems: "center", flex: 1 }}>
        <Text style={{ fontFamily: "ibm-bold", fontSize: 30 }}>
          새로운 친구를 만들어볼래요?{" "}
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontFamily: "ibm",
            textAlign: "center",
            color: Colors.GRAY,
          }}
        >
          좋아하는 동물친구를 입양해보세요.{"\n"}삶이 더 행복해질겁니다.
        </Text>
        <Pressable
          onPress={onPress}
          style={{
            padding: 14,
            marginTop: "auto",
            backgroundColor: Colors.PRIMARY,
            borderRadius: 14,
            width: "100%",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              fontFamily: "ibm-medium",
            }}
          >
            시작하기
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginScreen;
