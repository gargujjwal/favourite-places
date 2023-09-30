import uuid from "react-native-uuid";

export const uniqueId = () => {
    return uuid.v4().toString();
};
