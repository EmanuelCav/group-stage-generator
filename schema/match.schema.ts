import { date, number, object, string } from "yup";
import i18n from '@/i18n'

export const matchSchema = object().shape({
  scoreLocal: number().min(0, i18n.t("validation.match.score.min")),
  scoreVisitant: number().min(0, i18n.t("validation.match.score.min")),
  date: date()
});

export const summarySchema = object().shape({
  time: string()
    .trim()
    .matches(/[0-9]*$/, i18n.t("validation.summary.time.invalid"))
    .max(8, i18n.t("validation.summary.time.max"))
    .required(i18n.t("validation.summary.time.required"))
});

export const statisticMatchSchema = object().shape({
  title: string()
    .trim()
    .matches(/^[^<>'\"/;`%]*$/, i18n.t("validation.statisticMatch.title.invalid"))
    .max(20, i18n.t("validation.statisticMatch.title.max"))
    .required(i18n.t("validation.statisticMatch.title.required"))
});
