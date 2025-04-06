import { boolean, number, object, string } from "yup";

export const configSchema = object().shape({
    title: string().trim().required("Title field is required"),
    isRoundTripGroupStage: boolean(),
    isRoundTripElimination: boolean(),
    teamsPerGroup: number().typeError('Please complete with a number value')
        .min(2, "Number of teams per group must be higher than 1")
        .required("This field is required"),
    amountGroups: number().typeError('Please complete with a number value')
        .min(1, "Write the number of groups")
        .required("This field is required"),
    amountClassified: number().typeError('Please complete with a number value')
        .min(1, "Write the number of classifieds")
        .required("This field is required")
        .test(
            "power-of-two",
            "The number of classifieds must be a power of 2 (e.g., 2, 4, 8, 16, 32...)",
            value => {
                if (!value || value < 1) return false;
                return (value & (value - 1)) === 0;
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
        .required("Write a avoiding matches title"),
    max: number().typeError('Please complete with a number value')
        .min(1, "Number of teams per group must be higher than 0")
        .required("This field is required"),
});
