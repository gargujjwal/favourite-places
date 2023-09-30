import { useLayoutEffect } from "react";
import { Text, View } from "react-native";
import { usePlaceContext } from "../contexts/PlaceContext";
import { RootStackScreenProps } from "../types/navigation";

const PlaceDetails = ({
    navigation,
    route,
}: RootStackScreenProps<"PlaceDetail">) => {
    const { places } = usePlaceContext();
    const place = places.find(p => p.id === route.params.id);
    if (!place) throw new Error(`Place with id ${route.params.id} not found`);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: `Place - ${places[0].title}`,
        });
    }, [navigation]);

    return (
        <View>
            <Text>PlaceDetails</Text>
        </View>
    );
};

export default PlaceDetails;
