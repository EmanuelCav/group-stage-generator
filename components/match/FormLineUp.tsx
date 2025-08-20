import { useEffect, useState } from "react"
import { Button, Checkbox, IconButton, MD3Colors, Text } from "react-native-paper"
import { Dimensions, ScrollView } from "react-native"
import i18n from '@/i18n'

import { View } from "../Themed"
import ContainerBackground from "../general/ContainerBackground"
import TeamView from "./components/TeamView"

import { FormLineUpPropsType } from "@/types/match.types"
import { IMatch } from "@/interface/Match"
import { IPlayer } from "@/interface/Player"

import { generalStyles } from "@/styles/general.styles"
import { matchStyles } from "@/styles/match.styles"

const FormLineUp = ({ colors, hideAndShowPlayers, group, match, matchday, updateMatch, updateMatchGroup, isKnockout, updateEliminationMatch, updateMatchKnockGroup, round }: FormLineUpPropsType) => {

    const [playersLocal, setPlayersLocal] = useState<Record<string, boolean>>({});
    const [playersVisitant, setPlayersVisitant] = useState<Record<string, boolean>>({});

    const [loading, setLoading] = useState<boolean>(false)

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

        const arrPlayersLocal = Object.keys(playersLocal).map(Number)
        const arrPlayersVisitant = Object.keys(playersVisitant).map(Number)
        const concatArrPlayers = arrPlayersLocal.concat(arrPlayersVisitant)

        setLoading(true)

        let updatePlayers: IPlayer[] = []

        for (let i = 0; i < concatArrPlayers.length; i++) {
            updatePlayers.push(group.players?.find(p => p.id === concatArrPlayers[i])!)
        }

        const editMatch: IMatch = {
            isEdit: match.isEdit,
            local: match.local,
            referee: match.referee!,
            stadium: match.stadium!,
            statistics: match.statistics,
            players: [...updatePlayers],
            summary: match.summary,
            visitant: match.visitant,
            time: match.time,
            date: match.date
        }

        if (isKnockout) {

            const updatedMatches = group.eliminationMatches!.map((g, gi) =>
                gi === round ? g.map((m) =>
                    m.local.team.id === match.local.team.id ? { ...editMatch } : m
                ) : g
            );

            updateMatchKnockGroup(updatedMatches);

            updateEliminationMatch({
                round,
                match: { ...editMatch }
            });

        } else {
            const groupIndex = match.local.team.group! - 1;
            const matchdayIndex = matchday - 1;

            const updatedMatches = group.matches!.map((g, gi) =>
                gi === groupIndex
                    ? g.map((m, mi) =>
                        mi === matchdayIndex
                            ? m.map((matchItem) =>
                                matchItem.local.team.name === match.local.team.name
                                    ? { ...editMatch }
                                    : matchItem
                            )
                            : m
                    )
                    : g
            );

            updateMatchGroup(updatedMatches)

            updateMatch({
                match: { ...editMatch },
                matchday
            })
        }

        setTimeout(() => {
            hideAndShowPlayers(false)
            setLoading(false)
        }, 300)
    }

    useEffect(() => {
        let idsLocal: Record<string, boolean> = {};
        let idsVisitant: Record<string, boolean> = {};

        for (let i = 0; i < match.players.length; i++) {
            if (group.players?.find(p => p.id === match.players[i].id)?.team?.id === match.local.team.id) {
                idsLocal[match.players[i].id!] = true;
            } else {
                idsVisitant[match.players[i].id!] = true;
            }
        }

        setPlayersLocal(idsLocal);
        setPlayersVisitant(idsVisitant);
    }, [])

    return (
        <ContainerBackground zIndex={20}>
            <IconButton
                icon="close"
                style={generalStyles.buttonClose}
                iconColor={MD3Colors.error50}
                size={24}
                onPress={() => hideAndShowPlayers(false)}
            />

            <Text
                variant="labelLarge"
                style={{ marginVertical: Dimensions.get("window").height / 28 }}
            >
                {i18n.t('lineup.selectPlayers')}
            </Text>

            <View style={[matchStyles.containerLineUp, { backgroundColor: colors.background }]}>
                <ScrollView>
                    <TeamView team={match.local} colors={colors} />
                    {
                        group.players?.filter((p) => p.team?.name === match.local.team.name).length === 0 ?
                            <Text variant="bodySmall" style={{
                                textAlign: 'center',
                                marginTop: Dimensions.get("window").height / 106
                            }}>{i18n.t("noPlayers")}</Text>
                            : <View style={{ backgroundColor: colors.background }}>
                                {group.players
                                    ?.filter((p) => p.team?.name === match.local.team.name)
                                    .map((player) => (
                                        <Checkbox.Item
                                            key={player.id}
                                            label={player.name!}
                                            labelVariant="bodyMedium"
                                            status={playersLocal[player.id!] ? 'checked' : 'unchecked'}
                                            onPress={() => toggleCheckboxLocal(String(player.id))}
                                        />
                                    ))}
                            </View>
                    }
                </ScrollView>

                <ScrollView>
                    <TeamView team={match.visitant} colors={colors} />
                    {
                        group.players?.filter((p) => p.team?.name === match.visitant.team.name).length === 0 ?
                            <Text variant="bodySmall" style={{
                                textAlign: 'center',
                                marginTop: Dimensions.get("window").height / 106
                            }}>{i18n.t("noPlayers")}</Text>
                            : <View style={{ backgroundColor: colors.background }}>
                                {group.players
                                    ?.filter((p) => p.team?.name === match.visitant.team.name)
                                    .map((player) => (
                                        <Checkbox.Item
                                            key={player.id}
                                            label={player.name!}
                                            status={playersVisitant[player.id!] ? 'checked' : 'unchecked'}
                                            onPress={() => toggleCheckboxVisitant(String(player.id))}
                                        />
                                    ))}
                            </View>
                    }
                </ScrollView>
            </View>

            <Button
                loading={loading}
                disabled={loading}
                mode="contained"
                style={[{ backgroundColor: colors.primary }, generalStyles.generateButton]}
                labelStyle={{ color: '#ffffff' }}
                onPress={handleLineUp}
            >
                {i18n.t('lineup.accept')}
            </Button>
        </ContainerBackground>
    )
}

export default FormLineUp