import { Image, Pressable, Text, View } from "react-native";
import tw from "../../lib/tailwind";
import { Place } from "../../types";

type Props = {
    place: Place;
    onSelect: () => void;
};

const PlaceItem = ({ onSelect, place }: Props) => {
    return (
        <Pressable
            onPress={onSelect}
            style={({ pressed }) =>
                tw.style(
                    "flex-1 flex-row items-start rounded-md my-3 bg-primary-500 shadow-md",
                    pressed && "opacity-75"
                )
            }
        >
            <View
                style={tw`flex-1 items-center justify-center rounded-b-md overflow-hidden rounded-tl-md`}
            >
                <Image
                    source={{ uri: place.imageURI }}
                    style={tw`h-full w-full self-center`}
                />
            </View>
            <View style={tw.style(`p-3`, { flex: 2 })}>
                <Text style={tw`font-bold text-lg text-gray-700`}>
                    {place.title}
                </Text>
                <Text style={tw`text-lg text-gray-700`}>{place.address}</Text>
            </View>
        </Pressable>
    );
};

export default PlaceItem;
