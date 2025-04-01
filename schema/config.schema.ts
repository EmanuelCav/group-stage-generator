import { boolean, number, object, string } from "yup";

export const configSchema = object().shape({
    title: string().trim().required("Title field is required"),
    isRoundTripGroupStage: boolean(),
    isRoundTripElimination: boolean(),
    teamsPerGroup: number()
        .min(1, "Write the number of teams per group")
        .required("This field is required"),
    amountGroups: number()
        .min(1, "Write the number of groups")
        .required("This field is required"),
    amountClassified: number()
        .min(1, "Write the number of classifieds")
        .required("This field is required")
        .test(
            "number of classifieds error",
            "The number of classifieds must be less than or equal to the number of groups",
            function (value) {
                const { amountGroups } = this.parent;
                return value <= amountGroups;
            }
        ),
    pointsWin: number().min(0, "Write the number of points to the winner").required(),
    pointsDraw: number().min(0, "Write the number of points to tie").required(),
    pointsLoss: number().min(0, "Write the number of points to the loser").required()
});

export const avoidingSchema = object().shape({
    title: string()
        .trim()
        .matches(/^[^<>'\"/;`%]*$/, "Check special characters")
        .max(22, "Avoiding matches title must have less than 22 characters")
        .required("Write a avoiding matches title")
});
