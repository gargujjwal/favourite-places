import {
    PermissionStatus,
    launchCameraAsync,
    useCameraPermissions,
} from "expo-image-picker";
import { Alert, Image, Text, View } from "react-native";

import { useState } from "react";
import tw from "../../lib/tailwind";
import OutlinedButton from "./OutlinedButton";

type Props = {
    error: string | undefined;
    onSelectImage: (image: string) => void;
};

const ImagePicker = ({ error, onSelectImage }: Props) => {
    const [pickedImage, setPickedImage] = useState<string | undefined>(
        undefined
    );
    const [cameraPermissionInformation, requestPermission] =
        useCameraPermissions();

    const verifyPermissions = async () => {
        switch (cameraPermissionInformation?.status) {
            case PermissionStatus.UNDETERMINED:
                const permissionRes = await requestPermission();
                return permissionRes.granted;
            case PermissionStatus.DENIED:
                Alert.alert(
                    "Insufficient permissions!",
                    "You need to grant camera permissions to use this app.",
                    [{ text: "Okay" }]
                );
                return false;
            default:
                return true;
        }
    };
    const handleTakeImage = async () => {
        try {
            const hasPermission = await verifyPermissions();
            if (!hasPermission) return;

            const image = await launchCameraAsync({
                allowsEditing: true,
                aspect: [16, 9],
                quality: 0.5,
            });

            const imageUrl = image.assets![0].uri;

            setPickedImage(imageUrl);
            onSelectImage(imageUrl);
        } catch (err) {
            console.warn(err);
        }
    };

    return (
        <View style={tw`gap-4`}>
            <View style={tw`justify-center items-center`}>
                {pickedImage ? (
                    <Image
                        source={{ uri: pickedImage }}
                        style={tw`w-full h-52 my-2 justify-center items-center rounded-md mx-auto`}
                    />
                ) : (
                    <View
                        style={tw.style(
                            `w-full aspect-square items-center justify-center rounded-md`,
                            error ? "bg-rose-600" : "bg-primary-100"
                        )}
                    >
                        <Text style={tw`text-center text-gray-700 font-bold`}>
                            Please select an image
                        </Text>
                    </View>
                )}
            </View>
            <OutlinedButton onPress={handleTakeImage} icon="camera">
                {pickedImage ? "Change Image" : "Select Image"}
            </OutlinedButton>
            {error ? (
                <Text style={tw`text-rose-600 font-semibold text-center`}>
                    {error}
                </Text>
            ) : null}
        </View>
    );
};

export default ImagePicker;
