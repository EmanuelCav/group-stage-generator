import { object, string } from "yup";
import i18n from '@/i18n'

export const statisticSchema = object().shape({
  title: string()
    .trim()
    .matches(/^[^<>'\"/;`%]*$/, i18n.t("validation.statistic.title.invalid"))
    .max(12, i18n.t("validation.statistic.title.max"))
    .required(i18n.t("validation.statistic.title.required"))
});
