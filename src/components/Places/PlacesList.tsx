import { FlatList, FlatListProps, Text, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import tw from "../../lib/tailwind";
import { Place } from "../../types";
import { RootStackNavigationProp } from "../../types/navigation";
import PlaceItem from "./PlaceItem";

type Props = {
    places: Place[];
};

const PlacesListFallback = () => {
    return (
        <View style={tw`flex-1 justify-center items-center p-4`}>
            <Text style={tw`text-primary-200 font-bold text-xl text-center`}>
                No places added yet - start adding some!
            </Text>
        </View>
    );
};

const PlacesList = ({ places }: Props) => {
    const navigation = useNavigation<RootStackNavigationProp<"AllPlaces">>();
    const handleRenderPlace: FlatListProps<Place>["renderItem"] = ({
        item,
    }) => {
        const handlePlaceSelect = () => {
            navigation.navigate("PlaceDetail", { id: item.id });
        };
        return <PlaceItem place={item} onSelect={handlePlaceSelect} />;
    };

    if (places.length === 0) return <PlacesListFallback />;

    return (
        <FlatList
            data={places}
            keyExtractor={item => item.id}
            renderItem={handleRenderPlace}
            style={tw`m-6`}
        />
    );
};

export default PlacesList;
