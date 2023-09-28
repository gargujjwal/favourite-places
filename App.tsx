import { Text, View } from "react-native";

import { StatusBar } from "expo-status-bar";
import tw from "./src/lib/tailwind";

export default function App() {
    return (
        <View style={tw`flex-1 bg-white items-center justify-center`}>
            <Text style={tw`text-primary-800`}>
                Open up App.tsx to start working on your app!
            </Text>
            <StatusBar style="auto" />
        </View>
    );
}
