import joi from "joi";

const findCoinsSchema = joi.object({
  query: joi.string().required(),
});

export default findCoinsSchema;
