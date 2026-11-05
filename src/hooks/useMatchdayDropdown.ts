import { useMemo } from "react"

type Option = { label: string; value: string }

export const useMatchdayDropdown = (matches: any[][], mode: "group" | "matchday", t: (scope: string, options?: object | undefined) => string) => {

    const options = useMemo<Option[]>(() => {
        if (!matches?.length) return []

        if (mode === "group") {
            return [
                { label: t("all_matches"), value: "all" },
                ...matches.map((_, i) => ({
                    label: `${t("group.title")} ${i + 1}`,
                    value: `${t("group.title")} ${i + 1}`,
                })),
            ]
        }

        const maxLength = Math.max(...matches.map(m => m.length))

        return [
            { label: t("all_fixture"), value: "all" },
            ...Array.from({ length: maxLength }, (_, i) => ({
                label: `${t("matchday")} ${i + 1}`,
                value: `${t("matchday")} ${i + 1}`
            })),
        ]
    }, [matches, mode])

    return { options }
}