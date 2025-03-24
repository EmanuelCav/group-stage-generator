import { object, string } from "yup";

export const stadiumSchema = object().shape({
  name: string()
    .trim()
    .matches(/^[^<>'\"/;`%]*$/, "Check special characters")
    .max(30, "Stadium name must have less than 30 characters")
    .required("Write a stadium name")
});
