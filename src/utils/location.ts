import { URL } from "react-native-url-polyfill";
import { GeocodingResponse, Location } from "../types";

const constructUrl = (url: string, params: Record<string, string>): string => {
    const urlObject = new URL(url);
    Object.entries(params).forEach(([key, value]) => {
        urlObject.searchParams.set(key, value);
    });

    return urlObject.toString();
};

export const getLocation = ({ lat, lng }: Location): string => {
    return constructUrl("https://maps.googleapis.com/maps/api/staticmap", {
        key: process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY,
        size: "400x200",
        maptype: "roadmap",
        center: `${lat},${lng}`,
        zoom: "14",
        markers: `color:red|label:U|${lat},${lng}`,
    });
};

export const getAddress = async ({ lat, lng }: Location): Promise<string> => {
    const res = await fetch(
        constructUrl("https://maps.googleapis.com/maps/api/geocode/json", {
            key: process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY,
            latlng: `${lat},${lng}`,
        })
    );

    if (!res.ok) throw new Error("Failed to fetch address");

    const data = (await res.json()) as GeocodingResponse;
    return data.results[0].formatted_address;
};
