import { useMyProfile } from "@/api/my-profile";
import { StackHeaderV3 } from "@/components/StackHeaderV3";
import { useEdit } from "@/store/edit";
import { router, Stack } from "expo-router";

export default function Layout() {
    const { data: profile } = useMyProfile();
    const { edits } = useEdit();

    const handlePressCancel = () => {
        router.dismiss();
    };

    const handlePressDone = () => {
        router.dismiss();
    };

    return (
        <>
            <StackHeaderV3
                title={edits?.name || "Edit"}
                onPressCancel={handlePressCancel}
                onPressDone={handlePressDone}
            />
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
            </Stack>
        </>
    );
}
