import { useCallback, useEffect, useState } from "react";
import { Alert, View } from "react-native";
import MapView, { MapViewProps, Marker } from "react-native-maps";

import IconButton from "../components/UI/IconButton";
import tw from "../lib/tailwind";
import { Location } from "../types";
import { RootStackScreenProps } from "../types/navigation";

const Map = ({ navigation, route }: RootStackScreenProps<"Map">) => {
    const [selectedRegion, setSelectedRegion] = useState<
        Location | undefined
    >();

    const region = {
        latitude: route.params?.location.lat ?? 20.5937,
        longitude: route.params?.location.lng ?? 78.9629,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    const handleSubmitSavedLocation = useCallback(() => {
        if (!selectedRegion)
            return Alert.alert(
                "No Location picked!",
                "You have have to pick a location (by tapping on the Map) first",
                [{ text: "Okay" }]
            );

        navigation.navigate("AddPlace", selectedRegion);
    }, [selectedRegion, navigation]);

    useEffect(() => {
        if (route.params) setSelectedRegion(route.params.location);
        else
            navigation.setOptions({
                headerRight: ({ tintColor }) => (
                    <IconButton
                        iconName="save"
                        size={24}
                        color={tintColor}
                        onPress={handleSubmitSavedLocation}
                    />
                ),
            });
    }, [handleSubmitSavedLocation, navigation, route.params]);

    const handleSelectLocation: MapViewProps["onPress"] = ev => {
        const { coordinate } = ev.nativeEvent;
        setSelectedRegion({
            lat: coordinate.latitude,
            lng: coordinate.longitude,
        });
    };

    return (
        <View style={tw`flex-1`}>
            <MapView
                initialRegion={region}
                style={tw`h-full w-full`}
                onPress={route.params ? undefined : handleSelectLocation}
            >
                {selectedRegion ? (
                    <Marker
                        title="Picked Location"
                        coordinate={{
                            latitude: selectedRegion.lat,
                            longitude: selectedRegion.lng,
                        }}
                    />
                ) : null}
            </MapView>
        </View>
    );
};

export default Map;
