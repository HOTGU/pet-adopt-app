import React from "react";
import { Redirect, Slot } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

const LoginLayout = () => {
  const { isSignedIn } = useAuth();

  if (isSignedIn) return <Redirect href="/(tabs)/home" />;

  console.log(isSignedIn);
  return <Slot />;
};

export default LoginLayout;
