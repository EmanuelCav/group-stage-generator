import { MD3Colors } from "react-native-paper/lib/typescript/types";

import { IVenue } from "@/interface/Venue";
import { IGroup } from "@/interface/Group";
import { Spacing } from "./props.types";

export type FormCreateVenuePropsType = {
    colors: MD3Colors;
    hideAndShowAddVenue: (show: boolean) => void;
    createVenue: (venue: IVenue) => void;
    updateVenue: (data: IVenue) => void;
    openSure: (data: IVenue) => void;
    venue: IVenue;
    premium: boolean;
    group: IGroup;
    spacing: Spacing;
}

export type VenuePropsType = {
    venue: IVenue;
    handleUpdateVenue: (venue: IVenue) => void;
    colors: MD3Colors;
    spacing: Spacing;
}