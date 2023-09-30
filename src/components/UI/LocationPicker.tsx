import { useNavigation, useRoute } from "@react-navigation/native";
import {
    PermissionStatus,
    getCurrentPositionAsync,
    useForegroundPermissions,
} from "expo-location";
import { useEffect, useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import {
    RootStackNavigationProp,
    RootStackRouteProp,
} from "../../types/navigation";

import tw from "../../lib/tailwind";
import { Location } from "../../types";
import { getLocation } from "../../utils/location";
import OutlinedButton from "./OutlinedButton";

type Props = {
    error: string | undefined;
    onSelectLocation: (location: Location) => void;
};
const LocationPicker = ({ error, onSelectLocation }: Props) => {
    const navigation = useNavigation<RootStackNavigationProp<"AddPlace">>();
    const route = useRoute<RootStackRouteProp<"AddPlace">>();

    const [locationPermissionInfo, requestPermission] =
        useForegroundPermissions();
    const [userLocation, setUserLocation] = useState<Location | undefined>(
        route.params
    );

    useEffect(() => {
        setUserLocation(route.params);
    }, [route]);

    useEffect(() => {
        if (userLocation) onSelectLocation(userLocation);
    }, [userLocation]);

    const verifyPermissions = async () => {
        switch (locationPermissionInfo?.status) {
            case PermissionStatus.UNDETERMINED:
                const permissionRes = await requestPermission();
                return permissionRes.granted;
            case PermissionStatus.DENIED:
                Alert.alert(
                    "Insufficient permissions!",
                    "You need to grant location permissions to use this app.",
                    [{ text: "Okay" }]
                );
                return false;
            case PermissionStatus.GRANTED:
                return true;
            default:
                return false;
        }
    };

    const handleLocateUser = async () => {
        const permission = await verifyPermissions();
        if (!permission) return;

        const location = await getCurrentPositionAsync();
        setUserLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude,
        });
    };
    const handlePickOnMap = () => {
        navigation.navigate("Map");
    };

    return (
        <View style={tw`flex-1`}>
            <View
                style={tw`w-full h-52 my-2 justify-center items-center rounded-md ${
                    error ? "bg-error-50" : "bg-primary-100"
                } mx-auto overflow-hidden`}
            >
                {userLocation ? (
                    <Image
                        source={{
                            uri: getLocation(userLocation),
                        }}
                        style={tw`w-full h-full`}
                    />
                ) : (
                    <Text style={tw`font-bold`}>No Image picked yet</Text>
                )}
            </View>
            <View style={tw`flex-row justify-around items-center`}>
                <OutlinedButton icon="location" onPress={handleLocateUser}>
                    Locate User
                </OutlinedButton>
                <OutlinedButton icon="map" onPress={handlePickOnMap}>
                    Pick on Map
                </OutlinedButton>
            </View>
            {error ? (
                <Text style={tw`text-rose-600 font-semibold text-center`}>
                    {error}
                </Text>
            ) : null}
        </View>
    );
};

export default LocationPicker;
