import { object, string } from "yup";

export const playerSchema = object().shape({
  name: string()
    .trim()
    .matches(/^[^<>'\"/;`%]*$/, "Check special characters")
    .max(30, "Player name must have less than 30 characters")
    .required("Write a player name")
});
