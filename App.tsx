import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import PlaceProvider from "./src/contexts/PlaceContext";
import RootStackNavigator from "./src/navigators/RootStackNavigator";
import { init } from "./src/utils/db";

export default function App() {
    const [dbInitialized, setDbInitialized] = useState(false);
    useEffect(() => {
        init()
            .then(() => {
                setDbInitialized(true);
            })
            .catch(err => console.warn(err));
    }, []);

    if (!dbInitialized) return null;

    return (
        <PlaceProvider>
            <StatusBar style="dark" />
            <NavigationContainer>
                <RootStackNavigator />
            </NavigationContainer>
        </PlaceProvider>
    );
}
