import { useEffect } from "react";
import { Text } from "react-native";
import PlacesList from "../components/Places/PlacesList";
import { clearErrorAction } from "../contexts/PlaceActions";
import { usePlaceContext } from "../contexts/PlaceContext";

const AllPlaces = () => {
    const { places, loading, error, dispatch } = usePlaceContext();

    useEffect(() => {
        if (!error) return;
        const timer = setTimeout(() => {
            clearErrorAction(dispatch);
        }, 2_000);
        return () => clearTimeout(timer);
    }, [error]);

    if (loading) return <Text>Loading ...</Text>;
    if (error) return <Text>Try Again Soon...</Text>;

    return <PlacesList places={places} />;
};

export default AllPlaces;
