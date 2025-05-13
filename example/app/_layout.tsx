import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import './global.css';

export default function RootLayout() {
  return (
    <>
      <StatusBar hidden={true} />
      <Stack initialRouteName="(auth)">
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
         <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="movie/[id]" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
