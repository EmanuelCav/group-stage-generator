import { IGroup } from "@/interface/Group"
import { IMatch } from "@/interface/Match";

export type EliminationStagePropsType = {
    group: IGroup;
}

export type ColumnEliminationPropsType = {
    text: string;
    matches: IMatch[];
}

export type MatchEliminationPropsType = {
    
}