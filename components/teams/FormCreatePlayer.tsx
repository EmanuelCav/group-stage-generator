import { memo, useMemo } from "react"
import { View } from "react-native"
import { Avatar, Text } from "react-native-paper"

import { MatchRowPropsType } from "@/types/teams.types"

import { teamsStyles } from "@/styles/team.styles"

import { nameParticipant } from "@/utils/points"

const MatchRow = memo(({ match, team, t }: MatchRowPropsType) => {

    const isVisitant = match.visitant.team.name === team.name

    const rival = useMemo(() => {
        return isVisitant ? match.local.team : match.visitant.team
    }, [match, team, isVisitant])

    const scoreTeam = useMemo(() => {
        const score = isVisitant ? match.visitant.score : match.local.score
        return score !== null && score !== undefined ? Number(score) : null
    }, [match, isVisitant])

    const scoreRival = useMemo(() => {
        const score = isVisitant ? match.local.score : match.visitant.score
        return score !== null && score !== undefined ? Number(score) : null
    }, [match, isVisitant])

    const formatDateBadge = (dateString?: string) => {
        if (!dateString) return { month: "-", day: "-" }

        const [year, month, day] = dateString.split("-").map(Number)
        if (!year || !month || !day) return { month: "-", day: "-" }

        const date = new Date(year, month - 1, day)
        const monthStr = date
            .toLocaleString("default", { month: "short" })
            .replace(".", "")
            .toUpperCase()

        const dayStr = day < 10 ? `0${day}` : `${day}`

        return { month: monthStr, day: dayStr }
    }

    const hasScore = scoreTeam !== null && scoreRival !== null

    const matchResult = useMemo(() => {
        if (!hasScore) return null
        if (scoreTeam > scoreRival) return { status: "WIN", label: t("group.wins"), color: "#2e7d32", bgColor: "#e8f5e9" }
        if (scoreTeam < scoreRival) return { status: "LOSS", label: t("group.losses"), color: "#d32f2f", bgColor: "#ffebee" }
        return { status: "DRAW", label: t("group.draws"), color: "#757575", bgColor: "#f5f5f5" }
    }, [hasScore, scoreTeam, scoreRival])

    const dateFormatted = useMemo(() => formatDateBadge(match.date), [match.date])

    return (
        <View style={teamsStyles.matchRow}>
            <View style={teamsStyles.containMatchRow}>
                <View style={teamsStyles.dateMatchRow}>
                    <Text
                        variant="labelSmall"
                        style={teamsStyles.monthMatch}
                    >
                        {dateFormatted.month}
                    </Text>

                    <Text
                        variant="titleMedium"
                        style={teamsStyles.dayMatch}
                    >
                        {dateFormatted.day}
                    </Text>
                </View>

                {rival.logo ? (
                    <Avatar.Image
                        source={{ uri: rival.logo }}
                        size={28}
                        style={{ margin: 0 }}
                    />
                ) : (
                    <Avatar.Icon
                        icon="shield-outline"
                        size={28}
                        color="#ffffff"
                        style={{ backgroundColor: rival.color || match.visitant.team.color, margin: 0 }}
                    />
                )}

                <Text
                    style={{ flex: 1, marginLeft: 7 }}
                    variant="bodyLarge"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {nameParticipant(rival.name!)}
                </Text>
            </View>

            {hasScore && matchResult && (
                <View style={[teamsStyles.scoreMatchRow, { flexDirection: "row", alignItems: "center", gap: 6 }]}>
                    <Text variant="titleMedium">
                        {`${scoreTeam} - ${scoreRival}`}
                    </Text>

                    <View
                        style={[teamsStyles.resultState, { backgroundColor: matchResult.bgColor }]}
                    >
                        <Text
                            style={{
                                color: matchResult.color,
                                fontSize: 12
                            }}
                        >
                            {matchResult.label}
                        </Text>
                    </View>
                </View>
            )}
        </View>
    )
})

export default MatchRow