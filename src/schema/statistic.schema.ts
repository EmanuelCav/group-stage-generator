import { object, string } from "yup";

export const statisticSchema = object().shape({
  title: string()
    .trim()
    .matches(/^[^<>'\"/;`%]*$/, "Check special characters")
    .max(20, "Statistic title must have less than 20 characters")
    .required("Write a statistic title")
});
