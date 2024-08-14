import { useUser } from "@clerk/clerk-expo";
import { Redirect, useRootNavigationState } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

export default function Index() {
  const { isSignedIn } = useUser();
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    checkNavLoaded();
  }, []);

  const checkNavLoaded = () => {
    if (!rootNavigationState?.key) {
      return null;
    }
  };

  return (
    <View>
      {isSignedIn ? (
        <Redirect href={"/(tabs)/home"} />
      ) : (
        <Redirect href={"/login"} />
      )}
    </View>
  );
}
