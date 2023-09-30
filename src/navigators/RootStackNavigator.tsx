import {
    NativeStackNavigationProp,
    createNativeStackNavigator,
} from "@react-navigation/native-stack";

import IconButton from "../components/UI/IconButton";
import tw from "../lib/tailwind";
import AddPlace from "../screens/AddPlace";
import AllPlaces from "../screens/AllPlaces";
import Map from "../screens/Map";
import PlaceDetails from "../screens/PlaceDetails";
import { RootStackParamList } from "../types/navigation";

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigator = () => {
    return (
        <RootStack.Navigator
            initialRouteName="AllPlaces"
            screenOptions={{
                headerStyle: tw`bg-primary-500`,
                headerTintColor: tw.color("gray-700"),
                contentStyle: tw`bg-gray-700`,
            }}
        >
            <RootStack.Screen
                name="AllPlaces"
                component={AllPlaces}
                options={({
                    navigation,
                }: {
                    navigation: NativeStackNavigationProp<
                        RootStackParamList,
                        "AddPlace"
                    >;
                }) => ({
                    title: "Your Favorite Places",
                    headerRight({ tintColor }) {
                        return (
                            <IconButton
                                iconName="add"
                                size={24}
                                onPress={() => navigation.navigate("AddPlace")}
                                color={tintColor}
                            />
                        );
                    },
                })}
            />
            <RootStack.Screen
                name="AddPlace"
                component={AddPlace}
                options={{
                    title: "Add a New Place",
                }}
            />
            <RootStack.Screen
                name="Map"
                component={Map}
                options={{ title: "Map" }}
            />
            <RootStack.Screen name="PlaceDetail" component={PlaceDetails} />
        </RootStack.Navigator>
    );
};

export default RootStackNavigator;
