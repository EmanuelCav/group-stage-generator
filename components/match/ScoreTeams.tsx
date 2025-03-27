import { View } from "../Themed"
import ScoreView from "./components/ScoreView"
import TeamView from "./components/TeamView"

import { ScoreTeamsPropsType } from "@/types/match.types"

import { matchStyles } from "@/styles/match.styles"

const ScoreTeams = ({ match }: ScoreTeamsPropsType) => {
    return (
        <View style={matchStyles.scoreTeams}>
            <TeamView team={match.local} />
            <ScoreView match={match} />
            <TeamView team={match.visitant} />
        </View>
    )
}

export default ScoreTeams