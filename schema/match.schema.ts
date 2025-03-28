import { date, number, object, string } from "yup";

export const matchSchema = object().shape({
    scoreLocal: number().min(0, "Score min value is 0"),
    scoreVisitant: number().min(0, "Score min value is 0"),
    date: date()
})

export const summarySchema = object().shape({
    title: string()
    .trim()
    .matches(/^[^<>'\"/;`%]*$/, "Check special characters")
    .max(20, "Summary title must have less than 20 characters")
    .required("Write a summary title")
})

export const statisticMatchSchema = object().shape({
    title: string()
    .trim()
    .matches(/^[^<>'\"/;`%]*$/, "Check special characters")
    .max(20, "Statistic title must have less than 20 characters")
    .required("Write a statistic title")
})
