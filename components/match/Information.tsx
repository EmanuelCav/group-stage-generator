import { matchStyles } from '@/styles/match.styles'
import { View } from '../Themed'

import TagInformation from './components/TagInformation'

import { InformationPropsType } from '@/types/match.types'

const Information = ({ match, colors }: InformationPropsType) => {
    return (
        <View style={matchStyles.informationContain}>
            <TagInformation colors={colors} source='clock-time-four-outline' 
            info={match.date ? match.date?.toString() : "Not defined"} />
            <TagInformation colors={colors} source='stadium' 
            info={match.stadium ? match.stadium : "Not defined"} />
            <TagInformation colors={colors} source='whistle' 
            info={match.referee ? match.referee : "Not defined"} />
        </View>
    )
}

export default Information