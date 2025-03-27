import { date, number, object } from "yup";

export const matchSchema = object().shape({
    scoreLocal: number().min(0, "Score min value is 0"),
    scoreVisitant: number().min(0, "Score min value is 0"),
    date: date()
})
