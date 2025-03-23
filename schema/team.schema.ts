import { object, string } from "yup";

export const teamSchema = object().shape({
  name: string()
    .trim()
    .matches(/^[A-Za-zÀ-ÿ0-99äöüÄÖÜñÑ\s]+$/, "Only letters and numbers are allowed")
    .max(35, "Team name must have less than 35 characters")
    .required("Write a team name")
});
