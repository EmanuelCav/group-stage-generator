import { useMemo } from "react"
import { useWindowDimensions } from "react-native"

import { Spacing } from "@/types/props.types"

export const useSpacing = (): Spacing => {

    const { width, height } = useWindowDimensions()

    return useMemo(() => ({
        h106: height / 106,
        h28: height / 28,
        h47: height / 47,
        w36: width / 36,
        w72: width / 72,
        h3_8: height / 3.8,
        w45: width / 45,
        h5: height / 5,
        h148: height / 148,
        w18: width / 18,
        h74: height / 74,
        h185: height / 185,
        h192: height / 192,
        h41: height / 41,
        w120: width / 120,
        w3: width / 3,
        w6: width / 6,
        w57: width / 57,
    }), [width, height])
    
}