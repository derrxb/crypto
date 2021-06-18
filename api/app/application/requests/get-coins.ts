import joi from "joi";

const getCoinsSchema = joi.object({
  tickers: joi.array().optional(),
});

export default getCoinsSchema;
