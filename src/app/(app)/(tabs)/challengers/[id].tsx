import { useChallengers, useMatch, useRemoveChallenger } from "@/api/profiles";
import { ForwardActionButton } from "@/components/ForwardActionButton";
import { ProfileView } from "@/components/ProfileView";
import { transformPublicProfile } from "@/utils/profile";
import { Image } from "expo-image";
import { Redirect, Stack, router, useLocalSearchParams } from "expo-router";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";

const Page = () => {
    const { id } = useLocalSearchParams();
    const { mutate: remove, isPending: removePending } = useRemoveChallenger();
    const { mutate: match, isPending: matchPending } = useMatch();

    const { data } = useChallengers();
    const challenger = data.find((challenger) => challenger.id === id);
    let profile;

    const handleRemove = () => {
        if (challenger) {
            remove(challenger.id, {
                onSuccess: () => {
                    router.back();
                },
                onError: () => {
                    Alert.alert("Error", "Something went wrong, please try again later");
                },
            });
        }
    };

    const handleMatch = () => {
        if (challenger) {
            match(challenger.id, {
                onSuccess: () => {
                    router.back();
                },
                onError: () => {
                    Alert.alert("Error", "Something went wrong, please try again later");
                },
            });
        }
    };

    if (!challenger) {
        return <Redirect href={"/challengers"} />;
    }

    profile = transformPublicProfile(challenger.profile);

    return (
        <View className="flex-1 px-5 bg-white">
            <Stack.Screen
                options={{
                    headerLeft: () => (
                        <Pressable onPressOut={() => router.back()}>
                            <Text className="text-base font-poppins-medium" suppressHighlighting>
                                All
                            </Text>
                        </Pressable>
                    ),
                    title: "",
                    headerShadowVisible: false,
                }}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="h-28 bg-neutral-200 overflow-hidden rounded-md ">
                    {challenger?.photo_url && (
                        <Image source={challenger?.photo_url} className="aspect-square w-full" />
                    )}
                </View>
                <ProfileView profile={profile} />
            </ScrollView>

            <ForwardActionButton
                className="absolute bottom-5 left-5 bg-black shadow-sm h-20"
                iconClassName="text-white text-4xl"
                iconName="close"
                onPress={handleRemove}
                loading={removePending}
                loaderClassName="text-white"
                disabled={removePending || matchPending}
            />
            <ForwardActionButton
                className="absolute bottom-5 right-5 bg-black shadow-sm h-20"
                iconClassName="text-white text-4xl"
                iconName="chatbubbles"
                onPress={handleMatch}
                loading={matchPending}
                loaderClassName="text-white"
                disabled={removePending || matchPending}
            />
        </View>
    );
};

export default Page;
