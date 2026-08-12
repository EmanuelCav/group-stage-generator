import { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { Text } from "react-native-paper";

import { generalStyles } from "@/styles/general.styles";

import { CustomDropdownPropsType } from "@/types/props.types";

const CustomDropdown = ({ data, value, onChange, colors }: CustomDropdownPropsType) => {

    const [visible, setVisible] = useState<boolean>(false);

    return (
        <View
            style={[generalStyles.containerDropdown, {
                zIndex: visible ? 1000 : 0,
            }]}
        >
            <Pressable
                onPress={() => setVisible(!visible)}
                style={[generalStyles.inputButtonDropdown, {
                    backgroundColor: colors.tertiary,
                    borderColor: visible
                        ? colors.primary
                        : "transparent",
                }]}
            >
                <Text>{data.find(d => d.value === value)?.label || ""}</Text>
            </Pressable>

            {visible && (
                <View
                    style={[generalStyles.dropdownVisible, {  
                        backgroundColor: colors.tertiary,
                        borderColor: colors.primary,
                    }]}
                >
                    <ScrollView nestedScrollEnabled>
                        {data.map(item => (
                            <Pressable
                                key={item.value}
                                onPress={() => {
                                    onChange(item);
                                    setVisible(false);
                                }}
                                style={{
                                    padding: 15,
                                }}
                            >
                                <Text>{item.label}</Text>
                            </Pressable>
                        ))}
                    </ScrollView>
                </View>
            )}
        </View>
    );
}

export default CustomDropdown