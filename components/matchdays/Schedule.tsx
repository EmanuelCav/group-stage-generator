import { View } from '../Themed';

import { SchedulePropsType } from '@/types/matchdays.props';
import { IMatch } from '@/interface/Group';

const Schedule = ({ group }: SchedulePropsType) => {
    
    const maxLength = Math.max(...group.matches!.map((subgroup) => subgroup.length));
    
    let interleavedMatches: IMatch[][] = [];

    for (let i = 0; i < maxLength; i++) {
        group.matches!.forEach((subgroup) => {
            if (subgroup[i]) {
                interleavedMatches.push(subgroup[i]);
            }
        });
    }

    console.log(interleavedMatches[0][0]);
    

    return (
        <View>
            {interleavedMatches.map((match, index) => (
                <View>

                </View>
            ))}
        </View>
    );
};

export default Schedule;
