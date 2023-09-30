import { View } from "react-native";
import PlaceForm, {
    Props as PlaceFormProps,
} from "../components/Places/PlaceForm";
import { addPlaceAction } from "../contexts/PlaceActions";
import { usePlaceContext } from "../contexts/PlaceContext";
import tw from "../lib/tailwind";
import { RootStackScreenProps } from "../types/navigation";

const AddPlace = ({ navigation }: RootStackScreenProps<"AddPlace">) => {
    const { dispatch } = usePlaceContext();

    const handleCreatePlace: PlaceFormProps["onCreatePlace"] = async place => {
        await addPlaceAction(dispatch, place);
        navigation.navigate("AllPlaces");
    };

    return (
        <View style={tw`flex-1 py-4 px-6`}>
            <PlaceForm onCreatePlace={handleCreatePlace} />
        </View>
    );
};

export default AddPlace;
