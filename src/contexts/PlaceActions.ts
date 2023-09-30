import { Dispatch } from "react";
import { Place } from "../types";
import { fetchPlaces, insertPlace } from "../utils/db";
import { Action } from "./PlaceReducer";

export const addPlaceAction = async (
    dispatch: Dispatch<Action>,
    place: Omit<Place, "id">
) => {
    dispatch({ action: "STARTING_LOADING" });
    try {
        const { insertId } = await insertPlace(place);
        if (!insertId) throw new Error("Could not insert place");
        dispatch({
            action: "ADD_PLACE",
            payload: { place: { ...place, id: insertId } },
        });
    } catch (err) {
        dispatch({
            action: "ERROR",
            payload: { error: (err as Error).message },
        });
    } finally {
        dispatch({ action: "FINISHED_LOADING" });
    }
};

export const fetchPlacesAction = async (dispatch: Dispatch<Action>) => {
    dispatch({ action: "STARTING_LOADING" });
    try {
        const {
            rows: { _array: places },
        } = await fetchPlaces();
        const placesWithLocation = places.map(
            (place: {
                id: number;
                title: string;
                imageURI: string;
                address: string;
                lat: number;
                lng: number;
            }) => ({
                ...place,
                location: { lat: place.lat, lng: place.lng },
            })
        );

        dispatch({
            action: "SET_PLACES",
            payload: { places: placesWithLocation },
        });
    } catch (err) {
        dispatch({
            action: "ERROR",
            payload: { error: (err as Error).message },
        });
    } finally {
        dispatch({ action: "FINISHED_LOADING" });
    }
};

export const clearErrorAction = (dispatch: Dispatch<Action>) => {
    dispatch({ action: "CLEAR_ERROR" });
};
