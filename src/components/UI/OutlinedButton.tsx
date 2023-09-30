import { ButtonProps, Pressable, Text } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { ReactNode } from "react";
import tw from "../../lib/tailwind";

type Props = {
    onPress: ButtonProps["onPress"];
    icon: keyof typeof Ionicons.glyphMap;
    children: ReactNode;
};

const OutlinedButton = ({ onPress, icon, children }: Props) => {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) =>
                tw.style(
                    `px-3 py-1.5 m-1 gap-3 flex-row justify-center items-center border border-primary-500`,
                    pressed && `opacity-75`
                )
            }
        >
            <Ionicons name={icon} size={18} color={tw.color("primary-500")} />
            <Text style={tw`text-primary-500`}>{children}</Text>
        </Pressable>
    );
};

export default OutlinedButton;
