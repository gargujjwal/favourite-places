import {
    NativeStackNavigationProp,
    NativeStackScreenProps,
} from "@react-navigation/native-stack";

import { RouteProp } from "@react-navigation/native";
import { Location, Place } from ".";

export type RootStackParamList = {
    AllPlaces: undefined;
    AddPlace: Location | undefined;
    PlaceDetail: Pick<Place, "id">;
    Map: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
    NativeStackScreenProps<RootStackParamList, T>;

export type RootStackNavigationProp<T extends keyof RootStackParamList> =
    NativeStackNavigationProp<RootStackParamList, T>;
export type RootStackRouteProp<T extends keyof RootStackParamList> = RouteProp<
    RootStackParamList,
    T
>;

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}
