import { Text } from "react-native";
import PlacesList from "../components/Places/PlacesList";
import { usePlaceContext } from "../contexts/PlaceContext";

const AllPlaces = () => {
    const { places, loading, error } = usePlaceContext();

    if (loading) return <Text>Loading ...</Text>;
    if (error) return <Text>Try Again Soon...</Text>;

    return <PlacesList places={places} />;
};

export default AllPlaces;
