import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function Layout() {
    return (
        <>
            <StatusBar barStyle="dark-content" translucent={true} />
            <Stack screenOptions={{ headerShown: false }} />
        </>
    );
}
