import { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { Text } from "react-native-paper";

import { generalStyles } from "@/styles/general.styles";

import { CustomDropdownPropsType } from "@/types/props.types";

const CustomDropdown = ({ data, value, onChange, colors }: CustomDropdownPropsType) => {

    const [visible, setVisible] = useState(false);

    return (
        <View style={generalStyles.containerDropdown}>
            <Pressable
                onPress={() => setVisible(prev => !prev)}
                style={[
                    generalStyles.inputButtonDropdown,
                    {
                        backgroundColor: colors.tertiary,
                        borderColor: visible
                            ? colors.primary
                            : "transparent",
                    }
                ]}
            >
                <Text>
                    {data.find(d => d.value === value)?.label || ""}
                </Text>
            </Pressable>

            {visible && (
                <View
                    style={[
                        generalStyles.dropdownVisible,
                        {
                            backgroundColor: colors.tertiary,
                            borderColor: colors.primary,
                        },
                    ]}
                >
                    <ScrollView
                        nestedScrollEnabled
                        showsVerticalScrollIndicator={data.length > 4}
                        keyboardShouldPersistTaps="handled"
                    >
                        {data.map((item) => (
                            <Pressable
                                key={item.value}
                                onPress={() => {
                                    onChange(item);
                                    setVisible(false);
                                }}
                                style={{
                                    height: 50,
                                    paddingHorizontal: 15,
                                    justifyContent: "center",
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
};

export default CustomDropdown;