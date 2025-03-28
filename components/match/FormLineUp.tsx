import { useState } from "react"
import { Button, Checkbox, IconButton, MD3Colors, Text } from "react-native-paper"
import { Dimensions, ScrollView } from "react-native"

import { View } from "../Themed"
import ContainerBackground from "../general/ContainerBackground"

import { FormLineUpPropsType } from "@/types/match.types"

import { generalStyles } from "@/styles/general.styles"
import { matchStyles } from "@/styles/match.styles"
import TeamView from "./components/TeamView"

const FormLineUp = ({ colors, hideAndShowPlayers, group, match }: FormLineUpPropsType) => {

    const [playersLocal, setPlayersLocal] = useState<Record<string, boolean>>({});
    const [playersVisitant, setPlayersVisitant] = useState<Record<string, boolean>>({});

    const toggleCheckboxLocal = (playerId: string) => {
        setPlayersLocal((prev) => ({
            ...prev,
            [playerId]: !prev[playerId],
        }))
    }

    const toggleCheckboxVisitant = (playerId: string) => {
        setPlayersVisitant((prev) => ({
            ...prev,
            [playerId]: !prev[playerId],
        }))
    }

    const handleLineUp = () => {
        console.log(playersLocal);
        console.log(playersVisitant);

        hideAndShowPlayers(false)
    }

    return (
        <ContainerBackground zIndex={20}>

            <IconButton
                icon="close"
                style={generalStyles.buttonClose}
                iconColor={MD3Colors.error50}
                size={24}
                onPress={() => hideAndShowPlayers(false)}
            />

            <Text variant="labelLarge" style={{ marginVertical: Dimensions.get("window").height / 28 }}>
                Select players to main line up
            </Text>

            <View style={matchStyles.containerLineUp}>
                <ScrollView>
                    <TeamView team={match.local} />
                    {group.players?.filter(p => p.team?.name === match.local.team.name).map((player) => (
                        <Checkbox.Item
                            key={player.id}
                            label={player.name!}
                            status={playersLocal[player.id!] ? "checked" : "unchecked"}
                            onPress={() => toggleCheckboxLocal(String(player.id))}
                        />
                    ))}
                </ScrollView>

                <ScrollView>
                    <TeamView team={match.visitant} />
                    {group.players?.filter(p => p.team?.name === match.visitant.team.name).map((player) => (
                        <Checkbox.Item
                            key={player.id}
                            label={player.name!}
                            status={playersVisitant[player.id!] ? "checked" : "unchecked"}
                            onPress={() => toggleCheckboxVisitant(String(player.id))}
                        />
                    ))}
                </ScrollView>
            </View>

            <Button mode="contained" style={[{ backgroundColor: colors.primary }, generalStyles.generateButton]}
                labelStyle={{ color: "#ffffff" }} onPress={handleLineUp}>
                ACCEPT
            </Button>
        </ContainerBackground>
    )
}

export default FormLineUp