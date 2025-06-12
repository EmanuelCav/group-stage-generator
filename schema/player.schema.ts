import { object, string } from "yup";
import i18n from '@/i18n'

export const playerSchema = object().shape({
  name: string()
    .trim()
    .matches(/^[^<>'\"/;`%]*$/, i18n.t("validation.player.name.invalid"))
    .max(30, i18n.t("validation.player.name.max"))
    .required(i18n.t("validation.player.name.required")),
  position: string()
    .trim()
    .matches(/^[^<>'\"/;`%]*$/, i18n.t("validation.player.position.invalid"))
    .max(16, i18n.t("validation.player.position.max"))
});