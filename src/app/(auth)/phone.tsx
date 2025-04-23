import { ForwardActionButton } from "@/components/ForwardActionButton";
import { StackHeader } from "@/components/StackHeader";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { StatusBar, Text, TextInput, View, KeyboardAvoidingView, Platform } from "react-native";
import colors from "tailwindcss/colors";

export default function Page() {
    const [phoneNumber, setPhoneNumber] = useState("");

    const handlePhoneNumberChange = (text: string) => {
        setPhoneNumber(text);
    };

    const isValidPhoneNumber = useMemo(() => {
        return /^\+[1-9]\d{1,14}$/.test(phoneNumber);
    }, [phoneNumber]);

    const handleSubmit = () => {
        router.push({ pathname: "/otp", params: { phoneNumber } });
    };

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
                    <Text className="text-4xl font-poppins-semibold">Enter your phone number</Text>
                    <View className="h-20 mt-10">
                        <TextInput
                            className="border-b h-20 text-4xl font-poppins-medium"
                            style={{ lineHeight: undefined }}
                            selectionColor={colors.black}
                            keyboardType="phone-pad"
                            textContentType="telephoneNumber"
                            autoFocus={true}
                            value={phoneNumber}
                            onChangeText={handlePhoneNumberChange}
                            maxLength={16}
                        />
                    </View>
                </View>
                <View className="items-end">
                    <ForwardActionButton disabled={!isValidPhoneNumber} onPress={handleSubmit} />
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
