import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import PlaceProvider from "./src/contexts/PlaceContext";
import RootStackNavigator from "./src/navigators/RootStackNavigator";

export default function App() {
    return (
        <PlaceProvider>
            <StatusBar style="dark" />
            <NavigationContainer>
                <RootStackNavigator />
            </NavigationContainer>
        </PlaceProvider>
    );
}
