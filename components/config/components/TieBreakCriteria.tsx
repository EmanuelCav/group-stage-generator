import { useState } from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import DraggableFlatList, { RenderItemParams } from "react-native-draggable-flatlist";

import ContainerBackground from "@/components/general/ContainerBackground";

const initialData = [
    { id: "1", label: "Elemento 1" },
    { id: "2", label: "Elemento 2" },
    { id: "3", label: "Elemento 3" },
    { id: "4", label: "Elemento 4" }
];

const TieBreakCriteria = () => {
    const [data, setData] = useState(initialData);

    const renderItem = ({ item, drag, isActive }: RenderItemParams<{ id: string; label: string }>) => {
        return (
            <Pressable
                style={[
                    styles.item,
                    { backgroundColor: isActive ? "lightblue" : "white" }
                ]}
                onLongPress={drag}
            >
                <Text style={styles.text}>{item.label}</Text>
            </Pressable>
        );
    };

    return (
        <ContainerBackground zIndex={20}>
            <DraggableFlatList
                data={data}
                keyExtractor={(item) => item.id}
                onDragEnd={({ data }) => setData(data)}
                renderItem={renderItem}
            />
        </ContainerBackground>
    );

}

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
});

export default TieBreakCriteria