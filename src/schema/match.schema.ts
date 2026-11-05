import { date, number, object, string } from "yup";

export const matchSchema = object().shape({
  scoreLocal: number().min(0, "Score minimum value is 0"),
  scoreVisitant: number().min(0, "Score minimum value is 0"),
  date: date()
});

export const summarySchema = object().shape({
  time: string()
    .trim()
    .matches(/[0-9]*$/, "Only numbers are allowed")
    .max(5, "Minute of play must have less than 5 characters")
    .required("Write the minute of play")
});

export const statisticMatchSchema = object().shape({
  title: string()
    .trim()
    .matches(/^[^<>'\"/;`%]*$/, "Check special characters")
    .max(20, "Title must have less than 20 characters")
    .required("Write a statistic title")
});
