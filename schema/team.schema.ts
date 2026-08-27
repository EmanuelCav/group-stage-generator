import { object, string } from "yup";

export const teamSchema = object().shape({
  name: string()
    .trim()
    .matches(/^[^<>'\"/;`%]*$/, "Check special characters")
    .max(35, "Team name must have less than 35 characters")
    .required("Write a team name")
});
