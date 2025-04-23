import { ForwardActionButton } from "@/components/ForwardActionButton";
import { StackHeader } from "@/components/StackHeader";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { StatusBar, Text, TextInput, View, KeyboardAvoidingView, Platform } from "react-native";
import colors from "tailwindcss/colors";

export default function Page() {
    const [oneTimePassword, setOneTimePassword] = useState("");

    const handleOneTimePasswordChange = (text: string) => {
        setOneTimePassword(text);
    };

    const isValidOneTimePassword = useMemo(() => {
        return oneTimePassword.length === 6;
    }, [oneTimePassword]);

    const handleSubmit = () => {};

    return (
        <KeyboardAvoidingView
            className="flex-1 bg-white p-5"
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={100}
        >
            <StatusBar barStyle="dark-content" />
            <StackHeader />
            <View className="flex-1 justify-center pt-10">
                <View className="flex-1">
                    <Text className="text-4xl font-poppins-semibold">
                        Enter your verification code
                    </Text>
                    <View className="h-20" />
                    <View className="flex-row gap-2 h-15">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <View key={index} className="border-b flex-1">
                                <Text className="text-4xl font-poppins-medium items-center justify-center text-center">
                                    {oneTimePassword[index] || ""}
                                </Text>
                            </View>
                        ))}
                    </View>
                    <TextInput
                        className="absolute top-0 left-0 opacity-0"
                        style={{ lineHeight: undefined }}
                        selectionColor={colors.black}
                        keyboardType="numeric"
                        textContentType="oneTimeCode"
                        autoFocus={true}
                        value={oneTimePassword}
                        onChangeText={handleOneTimePasswordChange}
                        maxLength={6}
                    />
                </View>
                <View className="items-end">
                    <ForwardActionButton
                        disabled={!isValidOneTimePassword}
                        onPress={handleSubmit}
                    />
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
