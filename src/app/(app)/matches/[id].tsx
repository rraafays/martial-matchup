import { useNavigation, useRoute } from "@react-navigation/native";
import {
    useSendbirdChat,
    createGroupChannelListFragment,
    createGroupChannelCreateFragment,
    createGroupChannelFragment,
} from "@sendbird/uikit-react-native";
import { useGroupChannel } from "@sendbird/uikit-chat-hooks";
import { Alert, Text, View } from "react-native";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useContext } from "react";
import { GroupChannelContexts } from "@sendbird/uikit-react-native";
import { useUnmatch } from "@/api/profiles";
import { Ionicons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";

const CustomHeader = () => {
    const { headerTitle } = useContext(GroupChannelContexts.Fragment);
    const { mutate } = useUnmatch();
    const { id } = useLocalSearchParams<{ id: string }>();

    return (
        <Stack.Screen
            options={{
                headerLeft: () => (
                    <View className="flex-row items-center gap-2">
                        <Ionicons
                            name="chevron-back"
                            className="text-2xl"
                            onPress={() => router.back()}
                            suppressHighlighting
                        />
                        <Text className="text-lg font-poppins-medium">{headerTitle}</Text>
                    </View>
                ),
                title: "",
                headerRight: () => (
                    <Ionicons
                        name="cut-outline"
                        className="text-2xl"
                        onPress={() => {
                            Alert.alert(
                                "Are you sure?",
                                `Unmatching will delete the match for both you and ${headerTitle}`,
                                [
                                    {
                                        text: "Cancel",
                                        style: "cancel",
                                    },
                                    {
                                        text: "Unmatch",
                                        onPress: () => {
                                            mutate(id, {
                                                onSuccess: () => {
                                                    router.navigate("/matches/");
                                                },
                                                onError: () => {
                                                    Alert.alert(
                                                        "Error",
                                                        "Something went wrong, please try again later.",
                                                    );
                                                },
                                            });
                                        },
                                    },
                                ],
                            );
                        }}
                        suppressHighlighting
                    />
                ),
            }}
        />
    );
};

const GroupChannelFragment = createGroupChannelFragment({
    Header: CustomHeader,
});

export default function Page() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const height = useHeaderHeight();

    const { sdk } = useSendbirdChat();
    const { channel } = useGroupChannel(sdk, id);
    if (!channel) return null;

    return (
        <GroupChannelFragment
            channel={channel}
            onChannelDeleted={() => {
                router.navigate("/matches");
            }}
            onPressHeaderLeft={() => {
                router.back();
            }}
            onPressHeaderRight={() => {}}
            keyboardAvoidOffset={height}
        />
    );
}
