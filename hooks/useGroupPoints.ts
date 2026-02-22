import { useMemo } from 'react'

import { IPoints } from '@/interface/Team'
import { IGroup } from '@/interface/Group'

import { generatePoints } from '@/utils/points'

export const useGroupPoints = (group: IGroup, groupNumber: number): IPoints[] => {

    return useMemo(() => {
        const teamsInGroup = group.teams.filter(
            t => t.group === groupNumber + 1
        )

        return generatePoints(
            teamsInGroup,
            group.matches!,
            group
        )
    }, [group, groupNumber])
}