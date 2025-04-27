import { useSignOut } from "@/api/auth";
import {
    useChallengeProfile,
    useProfiles,
    useReviewProfiles,
    useSkipProfile,
} from "@/api/profiles";
import { Empty } from "@/components/Empty";
import { ForwardActionButton } from "@/components/ForwardActionButton";
import { Loader } from "@/components/Loader";
import { ProfileView } from "@/components/ProfileView";
import { transformPublicProfile } from "@/utils/profile";
import { useQueryClient } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, View } from "react-native";

export default function Page() {
    const { data, isFetching, error, refetch } = useProfiles(10);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { mutate: skip, isPending: skipPending } = useSkipProfile();
    const { mutate: review, isPending: reviewPending } = useReviewProfiles();
    const { mutate: challenge, isPending: challengePending } = useChallengeProfile();
    const queryClient = useQueryClient();

    const hasProfiles = data && data.length > 0;

    const profile = hasProfiles ? transformPublicProfile(data[currentIndex]) : null;

    const handleSkip = () => {
        if (profile) {
            skip(profile?.id, {
                onSuccess: () => {
                    if (hasProfiles && currentIndex < data.length - 1) {
                        setCurrentIndex(currentIndex + 1);
                    } else if (hasProfiles) {
                        queryClient.invalidateQueries({ queryKey: ["profiles"] });
                        setCurrentIndex(0);
                    }
                },
                onError: () => {
                    Alert.alert("Error", "Something went wrong, please try again later");
                },
            });
        }
    };

    const handleChallenge = (id: string, type: "photo") => {
        if (profile) {
            challenge(
                {
                    profile: profile?.id,
                    photo: type === "photo" ? id : undefined,
                },
                {
                    onSuccess: () => {
                        if (hasProfiles && currentIndex < data.length - 1) {
                            setCurrentIndex(currentIndex + 1);
                        } else if (hasProfiles) {
                            queryClient.invalidateQueries({
                                queryKey: ["profiles"],
                            });
                            setCurrentIndex(0);
                        }
                    },
                    onError: () => {
                        Alert.alert("Error", "Something went wrong, please try again later");
                    },
                },
            );
        }
    };

    const handleReview = () => {
        review(undefined, {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ["profiles"],
                });
            },
            onError: () => {
                Alert.alert("Error", "Something went wrong, please try again later");
            },
        });
    };

    if (isFetching || skipPending || reviewPending || challengePending) {
        return <Loader />;
    }

    if (error) {
        return (
            <Empty
                title="Something went wrong"
                subTitle="We ran into a problem loading new people, sorry about that!"
                onPrimaryPress={refetch}
                primaryText="Try again"
            />
        );
    }

    if (!hasProfiles) {
        return (
            <Empty
                title="You've ran out of opponents"
                subTitle="Check back later!"
                onPrimaryPress={handleReview}
                primaryText="Force update"
            />
        );
    }

    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Stack.Screen
                options={{
                    headerTitle: "",
                    headerShadowVisible: false,
                }}
            />
            <ScrollView className="flex-1 px-5">
                {profile && <ProfileView profile={profile} onChallenge={handleChallenge} />}
            </ScrollView>
            <ForwardActionButton
                onPress={handleSkip}
                iconName="close"
                className="bg-black shadow-sm active:h-[4.75rem] h-20 absolute bottom-5 left-5"
                iconClassName="text-white text-4xl"
                loaderClassName="text-white"
            />
        </View>
    );
}
