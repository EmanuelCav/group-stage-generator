import { MD3Colors } from "react-native-paper/lib/typescript/types";

import { IGroup } from "@/interface/Group"
import { IGetMatch } from "@/interface/Match";

export type SchedulePropsType = {
    group: IGroup;
    colors: MD3Colors;
    handleGetMatch: (data: IGetMatch) => void;
}