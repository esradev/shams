import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import "react-native-reanimated";

import "../global.css";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf")
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack
        screenOptions={{
          headerShown: true,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#fff"
          },
          headerTintColor: "#000"
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{
            title: "شمس المعارف"
          }}
        />
        <Stack.Screen
          name="category/[id]"
          options={({ route }) => ({
            title: route.params?.categoryName || "....."
          })}
        />
        <Stack.Screen
          name="post/[id]"
          options={({ route }) => ({
            title: route.params?.postTitle || "....."
          })}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
