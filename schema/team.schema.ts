import { object, string } from "yup";
import i18n from '@/i18n'

export const teamSchema = object().shape({
  name: string()
    .trim()
    .matches(/^[^<>'\"/;`%]*$/, i18n.t("validation.team.name.invalid"))
    .max(35, i18n.t("validation.team.name.max"))
    .required(i18n.t("validation.team.name.required"))
});
