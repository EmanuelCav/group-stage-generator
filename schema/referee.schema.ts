import { object, string } from "yup";

export const refereeSchema = object().shape({
  name: string()
    .trim()
    .matches(/^[^<>'\"/;`%]*$/, "Check special characters")
    .max(30, "Referee name must have less than 30 characters")
    .required("Write a referee name")
});
