import { useState } from "react"
import { Dimensions } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, IconButton, MD3Colors, Text, TextInput } from "react-native-paper"
import { Dropdown } from 'react-native-element-dropdown';

import ContainerBackground from "../general/ContainerBackground"
import { View } from "../Themed";

import { ICreateSummary } from "@/interface/Team";
import { IMatch } from "@/interface/Match";
import { FormSummaryPropsType } from "@/types/match.types"

import { generalStyles } from "@/styles/general.styles"
import { createStyles } from "@/styles/create.styles";
import { configStyles } from "@/styles/config.styles";

import { summarySchema } from "@/schema/match.schema";

import { getTeamsName, getPlayerName } from "@/utils/defaultGroup";

const FormSummary = ({ colors, hideAndShowSummary, summary, match, group, updateMatch, updateMatchGroup, matchday, sureRemoveSummary }: FormSummaryPropsType) => {

    const [teamSelected, setTeamSelected] = useState<string>("")
    const [playerSelected, setPlayerSelected] = useState<string>(summary.player?.name ? summary.player.name : "")

    const [isFocusTeam, setIsFocusTeam] = useState<boolean>(false)
    const [isFocusPlayer, setIsFocusPlayer] = useState<boolean>(false)

    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(summarySchema),
        defaultValues: {
            title: summary.title ? summary.title : "",
            time: summary.time ? summary.time : "0"
        }
    })

    const handleAddSummary = (summaryCreated: ICreateSummary) => {

        if (!playerSelected) {
            return
        }

        const groupIndex = match.local.team.group! - 1;
        const matchdayIndex = matchday - 1;

        if (summary.id) {

            const editMatch: IMatch = {
                isEdit: match.isEdit,
                local: match.local,
                referee: match.referee!,
                stadium: match.stadium!,
                summary: match.summary.map((s) => s.id === summary.id ?
                    {
                        ...summary, title: summaryCreated.title, time: summaryCreated.time, player: playerSelected ?
                            group.players?.find((p) => p.name === playerSelected) : s.player
                    } : s),
                players: match.players,
                statistics: match.statistics,
                visitant: match.visitant,
                date: match.date
            }

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

        } else {

            const createMatch: IMatch = {
                isEdit: match.isEdit,
                local: match.local,
                referee: match.referee!,
                stadium: match.stadium!,
                summary: [...match.summary, {
                    id: match.summary.length + 1,
                    title: summaryCreated.title,
                    player: group.players?.find((p) => p.name === playerSelected),
                    time: summaryCreated.time
                }],
                players: match.players,
                statistics: match.statistics,
                visitant: match.visitant,
                date: match.date
            }

            const updatedMatches = group.matches!.map((g, gi) =>
                gi === groupIndex
                    ? g.map((m, mi) =>
                        mi === matchdayIndex
                            ? m.map((matchItem) =>
                                matchItem.local.team.name === match.local.team.name
                                    ? { ...createMatch }
                                    : matchItem
                            )
                            : m
                    )
                    : g
            );

            updateMatchGroup(updatedMatches)

            updateMatch({
                match: { ...createMatch },
                matchday
            })

            reset()
        }

        hideAndShowSummary(false)
    }

    return (
        <ContainerBackground zIndex={20}>
            <IconButton
                icon="close"
                style={generalStyles.buttonClose}
                iconColor={MD3Colors.error50}
                size={24}
                onPress={() => hideAndShowSummary(false)}
            />

            <Controller
                name="title"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        value={value}
                        onChangeText={onChange}
                        autoCapitalize="none"
                        onBlur={onBlur}
                        label="Summary title"
                        autoFocus
                        mode="outlined"
                        style={createStyles.inputGeneralCreate}
                    />
                )} />

            {
                errors.title?.message && <Text variant="labelMedium"
                    style={{ color: MD3Colors.error50, marginTop: Dimensions.get("window").height / 106 }}>
                    {errors.title.message}
                </Text>
            }

            <View style={createStyles.selectInputDropdownContain}>
                <Text variant="labelLarge">Select the team from the summary (optional)</Text>
                <Dropdown
                    style={[createStyles.dropdownComplete, isFocusTeam && { borderColor: colors.primary }]}
                    placeholderStyle={{ fontSize: Dimensions.get("window").height / 47 }}
                    selectedTextStyle={{ fontSize: Dimensions.get("window").height / 47 }}
                    data={getTeamsName([match.local.team, match.visitant.team])}
                    maxHeight={Dimensions.get("window").height / 3.8}
                    labelField="label"
                    valueField="value"
                    placeholder={String(teamSelected)}
                    value={teamSelected}
                    onFocus={() => setIsFocusTeam(true)}
                    onBlur={() => setIsFocusTeam(false)}
                    onChange={item => {
                        setTeamSelected(item.value)
                        setIsFocusTeam(false)
                    }}
                />
            </View>

            <View style={createStyles.selectInputDropdownContain}>
                <Text variant="labelLarge">Select the player from the summary</Text>
                <Dropdown
                    style={[createStyles.dropdownComplete, isFocusPlayer && { borderColor: colors.primary }]}
                    placeholderStyle={{ fontSize: Dimensions.get("window").height / 47 }}
                    selectedTextStyle={{ fontSize: Dimensions.get("window").height / 47 }}
                    data={getPlayerName(group.players?.filter((p) => teamSelected ? (p.team?.name! === teamSelected) :
                        (p.team?.name === match.local.team.name || p.team?.name === match.visitant.team.name))!)}
                    maxHeight={Dimensions.get("window").height / 3.8}
                    labelField="label"
                    valueField="value"
                    placeholder={String(playerSelected)}
                    value={playerSelected}
                    onFocus={() => setIsFocusPlayer(true)}
                    onBlur={() => setIsFocusPlayer(false)}
                    onChange={item => {
                        setPlayerSelected(item.value)
                        setIsFocusPlayer(false)
                    }}
                />
            </View>

            <View style={configStyles.labelSettings}>
                <Text variant="bodyLarge">Minute of play</Text>
                <Controller
                    name="time"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            keyboardType="numeric"
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            style={configStyles.inputSettingsNumber}
                        />
                    )}
                />
                {errors.time && <Text variant='bodySmall'
                    style={{ color: MD3Colors.error50, marginTop: Dimensions.get("window").height / 185 }}>
                    {errors.time.message}
                </Text>
                }
            </View>

            <Button mode="contained" style={[{ backgroundColor: colors.primary }, generalStyles.generateButton]}
                labelStyle={{ color: "#ffffff" }} onPress={handleSubmit((data) => handleAddSummary(data))}>
                {summary.id ? "UPDATE" : "CREATE"}
            </Button>

            {
                summary.id && <Button mode="contained" style={[{ backgroundColor: MD3Colors.error50 }, generalStyles.generateButton]}
                    labelStyle={{ color: "#ffffff" }} onPress={() => sureRemoveSummary(true)}>
                    REMOVE
                </Button>
            }

        </ContainerBackground>
    )
}

export default FormSummary