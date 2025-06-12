import { boolean, number, object, string } from "yup";
import i18n from '@/i18n'

export const configSchema = object().shape({
  title: string().trim().required(i18n.t("validation.config.title.required")),
  isRoundTripGroupStage: boolean(),
  isRoundTripElimination: boolean(),
  teamsPerGroup: number()
    .typeError(i18n.t("validation.config.teamsPerGroup.typeError"))
    .min(2, i18n.t("validation.config.teamsPerGroup.min"))
    .required(i18n.t("validation.config.teamsPerGroup.required")),
  amountGroups: number()
    .typeError(i18n.t("validation.config.amountGroups.typeError"))
    .min(1, i18n.t("validation.config.amountGroups.min"))
    .required(i18n.t("validation.config.amountGroups.required")),
  amountClassified: number()
    .typeError(i18n.t("validation.config.amountClassified.typeError"))
    .min(1, i18n.t("validation.config.amountClassified.min"))
    .required(i18n.t("validation.config.amountClassified.required"))
    .test(
      "power-of-two",
      i18n.t("validation.config.amountClassified.powerOfTwo"),
      value => {
        if (!value || value < 1) return false;
        return (value & (value - 1)) === 0;
      }
    ),
  pointsWin: number()
    .min(0, i18n.t("validation.config.pointsWin.min"))
    .required(i18n.t("validation.config.pointsWin.required")),
  pointsDraw: number()
    .min(0, i18n.t("validation.config.pointsDraw.min"))
    .required(i18n.t("validation.config.pointsDraw.required")),
  pointsLoss: number()
    .min(0, i18n.t("validation.config.pointsLoss.min"))
    .required(i18n.t("validation.config.pointsLoss.required")),
});

export const avoidingSchema = object().shape({
  title: string()
    .trim()
    .matches(/^[^<>'\"/;`%]*$/, i18n.t("validation.avoiding.title.invalid"))
    .max(22, i18n.t("validation.avoiding.title.max"))
    .required(i18n.t("validation.avoiding.title.required")),
  max: number()
    .typeError(i18n.t("validation.avoiding.max.typeError"))
    .min(1, i18n.t("validation.avoiding.max.min"))
    .required(i18n.t("validation.avoiding.max.required")),
});
