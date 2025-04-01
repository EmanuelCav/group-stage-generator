import { Dimensions, Pressable, ScrollView } from "react-native"
import { Button, IconButton, MD3Colors, Text } from "react-native-paper"

import { View } from "../Themed"
import ContainerBackground from "../general/ContainerBackground"

import { AvoidingMatchesPropsType } from "@/types/config.types"

import { statisticsStyles } from "@/styles/statistics.styles"
import { createStyles } from "@/styles/create.styles"
import { generalStyles } from "@/styles/general.styles"
import { configStyles } from "@/styles/config.styles"

const AvoidingMatches = ({ group, colors, openCreateAvoiding, close, handleUpdateAvoiding }: AvoidingMatchesPropsType) => {
    return (
        <ContainerBackground zIndex={20}>
            <IconButton
                icon="close"
                style={generalStyles.buttonClose}
                iconColor={MD3Colors.error50}
                size={24}
                onPress={close}
            />
            {
                group.avoidingMatches?.length! > 0 ? (
                    <View style={[generalStyles.containerGeneral, { marginTop: Dimensions.get("window").height / 28 }]}>
                        <Button
                            mode="contained"
                            style={[{ backgroundColor: colors.primary }, createStyles.buttonAdd]}
                            labelStyle={{ color: "#ffffff" }}
                            onPress={openCreateAvoiding}
                        >
                            ADD AN AVOID MATCHES
                        </Button>
                        <ScrollView style={configStyles.configStylesViewMatches}>
                            {group.avoidingMatches?.map((am) => {
                                return <Pressable style={createStyles.containTeamAdded} 
                                onPress={() => handleUpdateAvoiding(am)} key={am.id}>
                                    <Text variant="bodyLarge">{am.title}</Text>
                                    <Text variant="bodyMedium">Teams: {am.teams?.length}</Text>
                                </Pressable>
                            })}
                        </ScrollView>
                    </View>
                ) : (
                    <View style={[generalStyles.containerGeneral, { marginTop: Dimensions.get("window").height / 28 }]}>
                        <Text variant='bodyLarge' style={statisticsStyles.titleStatistics}>
                            Prevents some teams from being in the same group
                        </Text>
                        <Button
                            mode="contained"
                            style={[{ backgroundColor: colors.primary }, createStyles.buttonAdd]}
                            labelStyle={{ color: "#ffffff" }}
                            onPress={openCreateAvoiding}
                        >
                            START
                        </Button>
                    </View>
                )
            }
        </ContainerBackground>
    )
}

export default AvoidingMatches