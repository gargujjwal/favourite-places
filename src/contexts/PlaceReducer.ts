import type { Place } from "../types";

export type PlaceReducer = {
    places: Place[];
    loading: boolean;
    error: string | undefined;
};

export type Action =
    | {
          action: "ADD_PLACE";
          payload: {
              place: Place;
          };
      }
    | { action: "SET_PLACES"; payload: { places: Place[] } }
    | { action: "STARTING_LOADING" | "FINISHED_LOADING" | "CLEAR_ERROR" }
    | { action: "ERROR"; payload: { error: string } };

const placeReducer = (state: PlaceReducer, action: Action): PlaceReducer => {
    switch (action.action) {
        case "ADD_PLACE":
            return {
                ...state,
                places: [...state.places, action.payload.place],
            };
        case "SET_PLACES":
            return {
                ...state,
                places: action.payload.places,
            };
        case "STARTING_LOADING":
            return {
                ...state,
                loading: true,
            };
        case "FINISHED_LOADING":
            return { ...state, loading: false };
        case "ERROR":
            return {
                ...state,
                error: action.payload.error,
            };
        case "CLEAR_ERROR":
            return { ...state, error: undefined };
        default:
            return state;
    }
};

export default placeReducer;
