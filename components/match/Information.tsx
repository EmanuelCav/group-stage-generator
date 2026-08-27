import { View } from 'react-native'

import TagInformation from './components/TagInformation'

import { InformationPropsType } from '@/types/match.types'

import { matchStyles } from '@/styles/match.styles'

const Information = ({ match, colors, t }: InformationPropsType) => {

    return (
        <View style={matchStyles.informationContain}>
            <TagInformation
                colors={colors}
                source="clock-time-four-outline"
                info={(match.time?.hours && match.date) ? `${match.date} - ${match.time.hours < 10 ? "0" : ""}${match.time.hours}:${match.time.minutes < 10 ? "0" : ""}${match.time.minutes}` :
                    t("not_defined")}
            />
            <TagInformation
                colors={colors}
                source="stadium"
                info={match.stadium ? match.stadium : t("not_defined")}
            />
            <TagInformation
                colors={colors}
                source="whistle"
                info={match.referee ? match.referee : t("not_defined")}
            />
        </View>
    )
}

export default Information