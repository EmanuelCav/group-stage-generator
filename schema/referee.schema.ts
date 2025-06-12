import { object, string } from "yup";
import i18n from '@/i18n'

export const refereeSchema = object().shape({
  name: string()
    .trim()
    .matches(/^[^<>'\"/;`%]*$/, i18n.t("validation.referee.name.invalid"))
    .max(30, i18n.t("validation.referee.name.max"))
    .required(i18n.t("validation.referee.name.required"))
});