import { View } from "../Themed"
import ScoreView from "./components/ScoreView"
import TeamView from "./components/TeamView"

import { ScoreTeamsPropsType } from "@/types/match.types"

import { matchStyles } from "@/styles/match.styles"

const ScoreTeams = ({ match, colors, spacing, isFullName }: ScoreTeamsPropsType) => {
    return (
        <View style={[matchStyles.scoreTeams, { backgroundColor: colors.background }]}>
            <TeamView team={match.local} colors={colors} spacing={spacing} isFullName={isFullName} />
            <ScoreView match={match} colors={colors} spacing={spacing} />
            <TeamView team={match.visitant} colors={colors} spacing={spacing} isFullName={isFullName} />
        </View>
    )
}

export default ScoreTeams