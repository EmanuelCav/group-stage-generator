import { object, string } from "yup";
import i18n from '@/i18n'

export const stadiumSchema = object().shape({
  name: string()
    .trim()
    .matches(/^[^<>'\"/;`%]*$/, i18n.t("validation.stadium.name.invalid"))
    .max(30, i18n.t("validation.stadium.name.max"))
    .required(i18n.t("validation.stadium.name.required"))
});
