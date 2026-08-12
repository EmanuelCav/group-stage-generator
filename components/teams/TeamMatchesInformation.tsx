import { useState } from "react"
import { View } from "react-native"
import { Button, Card, Divider, Text } from "react-native-paper"
import i18n from "@/i18n"

import MatchRow from "./components/MatchRow"

import { teamsStyles } from "@/styles/team.styles"
import { TeamMatchesInformationPropsType } from "@/types/teams.types"

const TeamMatchesInformation = ({ colors, matchesInformation, title, team }: TeamMatchesInformationPropsType) => {

    const [showAll, setShowAll] = useState<boolean>(false)

    const isEmpty = matchesInformation.length === 0
    const visibleMatches = showAll ? matchesInformation : matchesInformation.slice(0, 2)
    const hasMoreThanTwo = matchesInformation.length > 2

    return (
        <Card
            mode="contained"
            style={[teamsStyles.containMatchesTeam, {
                borderColor: colors.primary,  
                backgroundColor: colors.tertiary,
            }]}
        >
            <Card.Content>
                <Text variant="titleMedium">
                    {title}
                </Text>
                {isEmpty ? (
                    <Text 
                        variant="bodyMedium" 
                        style={teamsStyles.noMatches}
                    >
                        {i18n.t("noMatches")}
                    </Text>
                ) : (
                    visibleMatches.map((match, index) => (
                        <View style={{ marginTop: 7 }} key={index}>
                            <MatchRow colors={colors} match={match} team={team} />
                            {index < visibleMatches.length - 1 && (
                                <Divider style={{ marginTop: 7 }} />
                            )}
                        </View>
                    ))
                )}

                {hasMoreThanTwo && (
                    <Button
                        mode="text"
                        onPress={() => setShowAll(!showAll)}
                        textColor={colors.primary}
                        style={{ marginTop: 8 }}
                    >
                        {showAll ? i18n.t("seeLess") : i18n.t("seeMore")}
                    </Button>
                )}

            </Card.Content>
        </Card>
    )
}

export default TeamMatchesInformation