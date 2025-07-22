import { matchStyles } from '@/styles/match.styles'
import i18n from '@/i18n'

import { View } from '../Themed'
import TagInformation from './components/TagInformation'

import { InformationPropsType } from '@/types/match.types'

const Information = ({ match, colors }: InformationPropsType) => {

    return (
        <View style={matchStyles.informationContain}>
            <TagInformation
                colors={colors}
                source="clock-time-four-outline"
                info={match.time?.hours ? `${match.time.hours < 10 ? "0" : ""}${match.time.hours}:${match.time.minutes < 10 ? "0" : ""}${match.time.minutes}` : i18n.t("not_defined")}
            />
            <TagInformation
                colors={colors}
                source="stadium"
                info={match.stadium ? match.stadium : i18n.t("not_defined")}
            />
            <TagInformation
                colors={colors}
                source="whistle"
                info={match.referee ? match.referee : i18n.t("not_defined")}
            />
        </View>
    )
}

export default Information