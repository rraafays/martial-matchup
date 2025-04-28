import { useChallengers } from "@/api/profiles";
import { ChallengeCard } from "@/components/ChallengeCard";
import { Loader } from "@/components/Loader";
import { FlatList, Text, View } from "react-native";
import { Empty } from "@/components/Empty";
import { useRefreshOnFocus } from "@/hooks/refetch";
import { Link } from "expo-router";
import { Pressable } from "react-native";

export default function Page() {
    const { data: challengers, isFetching, isError, refetch } = useChallengers();
    useRefreshOnFocus(refetch);

    const renderEmpty = () => {
        if (challengers.length === 1) {
            return null;
        }

        if (isFetching) {
            return <Loader />;
        }

        if (isError) {
            return (
                <Empty
                    title="Something went wrong"
                    subTitle=" We ran into a problem loading your likes, sorry about that!"
                    primaryText="Try again"
                    onPrimaryPress={() => refetch()}
                />
            );
        }

        return <Empty title="No likes yet" subTitle="We can help you get your first one sooner." />;
    };

    return (
        <View className="flex-1 bg-white">
            <View className="px-5 pb-5">
                <Text className="text-3xl font-poppins-semibold">Challengers</Text>
            </View>
            <FlatList
                data={challengers}
                renderItem={({ item, index }) => {
                    return (
                        <Link href={`/challengers/${item.id}`} asChild>
                            <Pressable className="bg-white flex-1 rounded-lg overflow-hidden border border-neutral-200">
                                <ChallengeCard challenge={item} />
                                {challengers.length % 2 !== 0 &&
                                    index === challengers.length - 2 && <View className="flex-1" />}
                            </Pressable>
                        </Link>
                    );
                }}
                numColumns={2}
                contentContainerClassName="gap-4 px-5 pb-20 grow justify-content"
                columnWrapperClassName="gap-4"
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={renderEmpty}
            />
        </View>
    );
}
