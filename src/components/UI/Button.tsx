import { Pressable, PressableProps, Text, View } from "react-native";

import type { ClassInput } from "twrnc/dist/esm/types";
import tw from "../../lib/tailwind";

type Props = {
    children: React.ReactNode;
    variant: "flat" | "default";
    outerViewStyle?: ClassInput;
    buttonProps?: Omit<PressableProps, "style">;
};

const Button = ({ children, variant, outerViewStyle, buttonProps }: Props) => {
    return (
        <View style={tw.style(outerViewStyle)}>
            <Pressable
                {...buttonProps}
                style={({ pressed }) =>
                    tw.style(pressed && `opacity-75 bg-primary-100 rounded-md`)
                }
            >
                <View
                    style={tw.style(
                        `rounded-md p-2 bg-primary-500`,
                        variant === "flat" && "bg-transparent"
                    )}
                >
                    <Text
                        style={tw.style(
                            `text-white text-center`,
                            variant === "flat" && "text-primary-200"
                        )}
                    >
                        {children}
                    </Text>
                </View>
            </Pressable>
        </View>
    );
};

export default Button;
