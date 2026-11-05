import { number, object, string } from "yup";

export const configSchema = object().shape({
  title: string().trim().required("Title field is required"),
  teamsPerGroup: number()
    .typeError("Please complete with a number value")
    .min(2, "Number of teams per group must be higher than 1")
    .required("This field is required"),
  amountGroups: number()
    .typeError("Please complete with a number value")
    .min(1, "Write the number of groups")
    .required("This field is required"),
  amountClassified: number()
    .typeError("Please complete with a number value")
    .min(2, "The total number of qualified participants must be greater than 1")
    .required("This field is required")
    .test(
      "power-of-two",
      "The number of classifieds must be a power of 2 (e.g., 2, 4, 8, 16, 32...)",
      value => {
        if (!value || value < 1) return false;
        return (value & (value - 1)) === 0;
      }
    ),
  pointsWin: number()
    .min(0, "Write the number of points to the winner")
    .required("This field is required"),
  pointsDraw: number()
    .min(0, "Write the number of points to tie")
    .required("This field is required"),
  pointsLoss: number()
    .min(0, "Write the number of points to the loser")
    .required("This field is required"),
});