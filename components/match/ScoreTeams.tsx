import { View } from "../Themed"
import ScoreView from "./components/ScoreView"
import TeamView from "./components/TeamView"

import { ScoreTeamsPropsType } from "@/types/match.types"

import { matchStyles } from "@/styles/match.styles"

const ScoreTeams = ({ match, colors }: ScoreTeamsPropsType) => {
    return (
        <View style={[matchStyles.scoreTeams, { backgroundColor: colors.background }]}>
            <TeamView team={match.local} colors={colors} />
            <ScoreView match={match} colors={colors} />
            <TeamView team={match.visitant} colors={colors} />
        </View>
    )
}

export default ScoreTeams