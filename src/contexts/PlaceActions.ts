import { Dispatch } from "react";
import { Place } from "../types";
import { uniqueId } from "../utils";
import { Action } from "./PlaceReducer";

export const addPlaceAction = async (
    dispatch: Dispatch<Action>,
    place: Omit<Place, "id">
) => {
    dispatch({ action: "STARTING_LOADING" });
    try {
        const placeId = uniqueId();
        dispatch({
            action: "ADD_PLACE",
            payload: { place: { ...place, id: placeId } },
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
