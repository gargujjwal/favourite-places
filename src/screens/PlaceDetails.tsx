import { useLayoutEffect } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import OutlinedButton from "../components/UI/OutlinedButton";
import { usePlaceContext } from "../contexts/PlaceContext";
import tw from "../lib/tailwind";
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

    const handleViewOnMap = () => {
        navigation.navigate("Map", { location: place.location });
    };

    return (
        <ScrollView>
            <Image
                source={{ uri: place.imageURI }}
                style={tw`h-[35%] min-h-[300px] w-full`}
            />
            <View style={tw`justify-center items-center`}>
                <View style={tw`p-5`}>
                    <Text
                        style={tw`text-primary-500 text-center font-bold text-base`}
                    >
                        {place.address}
                    </Text>
                </View>
                <OutlinedButton icon="map" onPress={handleViewOnMap}>
                    View on Map
                </OutlinedButton>
            </View>
        </ScrollView>
    );
};

export default PlaceDetails;
