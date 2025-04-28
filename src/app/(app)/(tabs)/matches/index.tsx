import { Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
    useSendbirdChat,
    createGroupChannelListFragment,
    createGroupChannelCreateFragment,
    createGroupChannelFragment,
} from "@sendbird/uikit-react-native";
import { useGroupChannel } from "@sendbird/uikit-chat-hooks";
import { router, Stack } from "expo-router";

const CustomHeader = () => {
    return <Stack.Screen options={{ headerTitle: "", headerShadowVisible: false }} />;
};

const GroupChannelListFragment = createGroupChannelListFragment({ Header: CustomHeader });

export default function Page() {
    return (
        <View className="flex-1 bg-white">
            <View className="px-5 pb-5">
                <Text className="text-3xl font-poppins-semibold">Matches</Text>
            </View>
            <GroupChannelListFragment
                channelListQueryParams={{
                    includeEmpty: true,
                }}
                onPressCreateChannel={() => {}}
                onPressChannel={(channel) => {
                    router.navigate(`/matches/${channel.url}`);
                }}
            />
        </View>
    );
}
