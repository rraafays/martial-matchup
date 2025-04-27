import { useChallengers } from "@/api/profiles";
import { ChallengeCard } from "@/components/ChallengeCard";
import { Loader } from "@/components/Loader";
import { FlatList, View } from "react-native";
import { Empty } from "@/components/Empty";
import { useRefreshOnFocus } from "@/hooks/refetch";

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
            <FlatList
                data={challengers}
                renderItem={({ item, index }) => {
                    return (
                        <>
                            <ChallengeCard challenge={item} />
                            {challengers.length % 2 !== 0 && index === challengers.length - 2 && (
                                <View className="flex-1" />
                            )}
                        </>
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
