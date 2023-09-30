import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, View } from "react-native";
import MapView, { MapViewProps, Marker } from "react-native-maps";

import IconButton from "../components/UI/IconButton";
import tw from "../lib/tailwind";
import { Location } from "../types";
import { RootStackScreenProps } from "../types/navigation";

const region = {
    latitude: 20.5937,
    longitude: 78.9629,
    latitudeDelta: 3,
    longitudeDelta: 3,
};

const Map = ({ navigation }: RootStackScreenProps<"Map">) => {
    const [selectedRegion, setSelectedRegion] = useState<
        Location | undefined
    >();

    const handleSubmitSavedLocation = useCallback(() => {
        if (!selectedRegion)
            return Alert.alert(
                "No Location picked!",
                "You have have to pick a location (by tapping on the Map) first",
                [{ text: "Okay" }]
            );

        navigation.navigate("AddPlace", selectedRegion);
    }, [selectedRegion, navigation]);

    useLayoutEffect(() => {
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
    }, [handleSubmitSavedLocation, navigation]);

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
                onPress={handleSelectLocation}
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
