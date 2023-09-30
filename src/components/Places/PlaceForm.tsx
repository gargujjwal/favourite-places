import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { z } from "zod";
import tw from "../../lib/tailwind";
import { getAddress } from "../../utils/location";
import Button from "../UI/Button";
import ImagePicker from "../UI/ImagePicker";
import Input from "../UI/Input";
import LocationPicker from "../UI/LocationPicker";

import { Location, Place } from "../../types";

const PlaceFormSchema = z.object({
    title: z.string().min(3).max(30),
    imageURI: z.string().url(),
    location: z.object({
        lat: z.number(),
        lng: z.number(),
    }),
    address: z.string().min(1),
});
type PlaceFormSchema = z.infer<typeof PlaceFormSchema>;

export type Props = {
    onCreatePlace: (place: Omit<Place, "id">) => Promise<void>;
};
const PlaceForm = ({ onCreatePlace }: Props) => {
    const {
        control,
        formState: { errors, isSubmitting },
        handleSubmit,
        watch,
        setValue,
        setError,
    } = useForm<PlaceFormSchema>({
        resolver: zodResolver(PlaceFormSchema),
    });

    useEffect(() => {
        const subscription = watch(async (value, { name, type }) => {
            if (
                !(
                    name === "location" &&
                    type === "change" &&
                    value.location !== undefined
                )
            )
                return;

            const address = await getAddress(value.location as Location);
            setValue("address", address, { shouldValidate: true });
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    const handleFormSubmit: SubmitHandler<PlaceFormSchema> = async data => {
        try {
            await onCreatePlace(data);
        } catch (err) {
            setError("root.server", {
                message: `${(err as Error).message}. Try Again`,
            });
        }
    };

    return (
        <ScrollView>
            <View style={tw`mb-2`}>
                <Controller
                    control={control}
                    name="title"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            label="Title"
                            isValid={!errors.title}
                            textInputConfig={{
                                onBlur,
                                onChangeText: onChange,
                                value,
                            }}
                        />
                    )}
                />
            </View>
            <Controller
                control={control}
                name="imageURI"
                render={({ field: { onChange }, fieldState: { error } }) => (
                    <ImagePicker
                        error={error?.message}
                        onSelectImage={onChange}
                    />
                )}
            />

            <Controller
                control={control}
                name="location"
                render={({ field: { onChange }, fieldState: { error } }) => (
                    <LocationPicker
                        error={error?.message}
                        onSelectLocation={onChange}
                    />
                )}
            />

            {errors.root?.server ? (
                <Text style={tw`text-red-500 text-center`}>
                    {errors.root.server.message}
                </Text>
            ) : null}

            <View
                style={tw`my-4 rounded-md ${
                    Object.keys(errors).length > 0
                        ? "border border-rose-400"
                        : ""
                }`}
            >
                <Button
                    buttonProps={{
                        onPress: handleSubmit(handleFormSubmit),
                        disabled: isSubmitting,
                    }}
                    variant="default"
                >
                    {isSubmitting ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        "Add Place"
                    )}
                </Button>
            </View>
        </ScrollView>
    );
};

export default PlaceForm;
