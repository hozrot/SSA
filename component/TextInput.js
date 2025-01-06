import React from "react";
import { TextInput as RNTextInput, View, StyleSheet, TouchableOpacity } from "react-native";
import { Entypo as Icon } from "@expo/vector-icons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function TextInput({ onPress, inputHieght, inputAlign, icon, linenumber, ...otherProps }) {
    const validationColor = "gray";
    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: inputAlign,
                height: inputHieght,
                borderRadius: 8,
                borderColor: validationColor,
                borderWidth: StyleSheet.hairlineWidth,
                padding: 10,
                

            }}
        >

            <View style={{ flex: 1 }}>
                <RNTextInput
                    underlineColorAndroid="transparent"
                    placeholderTextColor="gray"
                    color='black'
                    height={45}
                    {...otherProps}
                />
            </View>
            <TouchableOpacity onPress={onPress}>
                <MaterialCommunityIcons name={icon} color={'white'} size={22}/>
            </TouchableOpacity>
        </View>
    );
}
