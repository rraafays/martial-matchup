import { Redirect, Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function Layout() {
    return <Redirect href={"/signIn"} />;
    return (
        <>
            <StatusBar barStyle="dark-content" translucent={true} />
            <Stack screenOptions={{ headerShown: false }} />
        </>
    );
}
