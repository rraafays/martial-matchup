import { useMyProfile } from "@/api/my-profile";
import { StackHeaderV3 } from "@/components/StackHeaderV3";
import { router, Stack } from "expo-router";

export default function Layout() {
    const { data: profile } = useMyProfile();

    const handlePressCancel = () => {
        router.dismiss();
    };

    const handlePressDone = () => {
        router.dismiss();
    };

    return (
        <>
            <StackHeaderV3
                title={profile?.name || "Edit"}
                onPressCancel={handlePressCancel}
                onPressDone={handlePressDone}
            />
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
            </Stack>
        </>
    );
}
