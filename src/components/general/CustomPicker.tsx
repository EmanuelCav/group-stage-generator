import { useState } from 'react'
import { FlatList, Modal, Pressable, View } from 'react-native'
import { Divider, Icon, Surface, Text, TouchableRipple } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

import { IDropdown } from '@/interface/Team'
import { CustomPickerPropsType } from '@/types/props.types'

import { generalStyles } from '@/styles/general.styles'

const CustomPicker = ({ items, value, onChange, colors, title }: CustomPickerPropsType) => {

    const [visible, setVisible] = useState(false)

    const selectedItem = items.find(item => item.value === value)

    const handleOpen = () => {
        setVisible(true)
    }

    const handleClose = () => {
        setVisible(false)
    }

    const handleSelect = (item: IDropdown) => {
        onChange(item.value)
        setVisible(false)
    }

    return (
        <>
            <Pressable
                onPress={handleOpen}
                style={[
                    generalStyles.picker,
                    {
                        backgroundColor: colors.tertiary,
                        borderColor: colors.primary,
                    },
                ]}
            >
                <Text
                    numberOfLines={1}
                    style={[
                        generalStyles.selectedTextPick,
                        {
                            color: colors.surface,
                        },
                    ]}
                >
                    {selectedItem?.label}
                </Text>

                <Icon
                    source="chevron-down"
                    size={20}
                    color={colors.primary}
                />
            </Pressable>

            <Modal
                visible={visible}
                animationType="slide"
                onRequestClose={handleClose}
                statusBarTranslucent
            >
                <SafeAreaView
                    style={[
                        generalStyles.modalContainer,
                        {
                            backgroundColor: colors.background,
                        },
                    ]}
                >
                    <View
                        style={[
                            generalStyles.headerPicker,
                            {
                                backgroundColor: colors.primary,
                                borderBottomColor: colors.primary,
                            },
                        ]}
                    >
                        <Pressable
                            onPress={handleClose}
                            style={generalStyles.closeButtonPicker}
                        >
                            <Icon
                                source="arrow-left"
                                size={26}
                                color={colors.surface}
                            />
                        </Pressable>

                        <Text
                            variant="titleLarge"
                            style={[
                                generalStyles.titlePickElement,
                                {
                                    color: colors.surface,
                                },
                            ]}
                        >
                            {title}
                        </Text>
                    </View>

                    <FlatList
                        data={items}
                        keyExtractor={(item) => item.value}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={generalStyles.listElements}
                        renderItem={({ item }) => {
                            const isSelected = item.value === value

                            return (
                                <Surface
                                    style={[
                                        generalStyles.optionContainer,
                                        {
                                            backgroundColor: isSelected
                                                ? colors.tertiary
                                                : colors.background,
                                        },
                                    ]}
                                    elevation={0}
                                >
                                    <TouchableRipple
                                        onPress={() => handleSelect(item)}
                                        rippleColor={`${colors.primary}`}
                                        style={({ pressed }) => ({
                                            backgroundColor: pressed
                                                ? `${colors.primary}`
                                                : isSelected
                                                    ? colors.tertiary
                                                    : colors.background,
                                        })}
                                    >
                                        <View style={generalStyles.optionPick}>
                                            <Text
                                                variant="bodyLarge"
                                                numberOfLines={1}
                                                style={{
                                                    color: isSelected
                                                        ? colors.primary
                                                        : colors.surface,
                                                }}
                                            >
                                                {item.label}
                                            </Text>

                                            {isSelected && (
                                                <Icon
                                                    source="check"
                                                    size={22}
                                                    color={colors.primary}
                                                />
                                            )}
                                        </View>
                                    </TouchableRipple>
                                    <Divider
                                        style={{
                                            backgroundColor:
                                                colors.secondary ??
                                                colors.tertiary,
                                        }}
                                    />
                                </Surface>
                            )
                        }}
                    />
                </SafeAreaView>
            </Modal>
        </>
    )
}

export default CustomPicker