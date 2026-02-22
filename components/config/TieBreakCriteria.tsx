import { memo } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import DraggableFlatList, { RenderItemParams, ScaleDecorator } from "react-native-draggable-flatlist";

import ContainerBackground from "@/components/general/ContainerBackground";

import { TieBreakCriteriaPropsType } from "@/types/config.types";

const TieBreakCriteria = memo(({ initialData, setInitialData }: TieBreakCriteriaPropsType) => {

    const renderItem = ({ item, drag, isActive }: RenderItemParams<{ id: string; label: string }>) => {
        return (
            <ScaleDecorator>
                <TouchableOpacity
                    onLongPress={drag}
                    disabled={isActive}
                    style={[
                        { backgroundColor: isActive ? "red" : "blue" },
                    ]}
                >
                    <Text style={styles.text}>{item.label}</Text>
                </TouchableOpacity>
            </ScaleDecorator>
        );
    };

    return (
        <ContainerBackground zIndex={20}>
            <DraggableFlatList
                data={initialData}
                keyExtractor={(item) => item.label}
                onDragEnd={({ data }) => setInitialData(data)}
                renderItem={renderItem}
            />
        </ContainerBackground>
    );

})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5"
    },
    item: {
        padding: 20,
        marginVertical: 10,
        backgroundColor: "white",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5
    },
    text: {
        fontSize: 18
    }
})

export default TieBreakCriteria