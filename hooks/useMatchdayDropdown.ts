import { useMemo, useState, useCallback } from "react"
import i18n from "@/i18n"

type Option = { label: string; value: string }

export const useMatchdayDropdown = (matches: any[][], mode: "group" | "matchday") => {

    const [isFocus, setIsFocus] = useState<boolean>(false)

    const options = useMemo<Option[]>(() => {
        if (!matches?.length) return []

        if (mode === "group") {
            return [
                { label: i18n.t("all_matches"), value: "all" },
                ...matches.map((_, i) => ({
                    label: `${i18n.t("group.title")} ${i + 1}`,
                    value: `${i18n.t("group.title")} ${i + 1}`,
                })),
            ]
        }

        const maxLength = Math.max(...matches.map(m => m.length))

        return [
            { label: i18n.t("all_fixture"), value: "all" },
            ...Array.from({ length: maxLength }, (_, i) => ({
                label: `${i18n.t("matchday")} ${i + 1}`,
                value: `${i18n.t("matchday")} ${i + 1}`
            })),
        ]
    }, [matches, mode])

    const onFocus = useCallback(() => setIsFocus(true), [])
    const onBlur = useCallback(() => setIsFocus(false), [])

    return { isFocus, options, onFocus, onBlur }
}