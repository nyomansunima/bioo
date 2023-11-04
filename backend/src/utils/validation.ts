import { getBody, getParams, getQuery } from '~/utils/helpers'
import { NextFunction, Request, RequestHandler, Response } from 'express'
import { AnyZodObject } from 'zod'

/**
 * ## validationMiddleware
 *
 * validate the input for the api
 * for api context, you can validate
 * for body, params and response, other.
 *
 * This working on the middleware layer
 *
 * @param dtoSchema the schema that include validation that contain `zod object` validation
 * @param body request data that need to validate as object. eg `params`, `body`, `paths`
 *
 * @returns {Context | Next}
 */
export function validationMiddleware(
  dtoSchema: AnyZodObject,
  inputType: 'body' | 'params' | 'query',
): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const requestInput = {
      body: getBody(req),
      query: getQuery(req),
      params: getParams(req),
    }

    const validationData = requestInput[inputType]
    const validationRes = dtoSchema.safeParse(validationData)

    if (!validationRes.success) {
      const errorResponse = {
        statusCode: '402',
        message: 'validation/invalid-input',
        errors: validationRes.error.errors.map((err) => {
          if (err.code == 'invalid_type') {
            return `${err.path[0]} is ${err.message}`
          } else {
            return `${err.message}`
          }
        }),
      }

      return res.status(402).json(errorResponse)
    }

    return next()
  }
}

/**
 * ## validateBody
 *
 * validate the body request
 *
 * @param dtoSchema class passed as validation
 * @returns {ctx}
 */
export function validateBody(dtoSchema: AnyZodObject) {
  return validationMiddleware(dtoSchema, 'body')
}

/**
 * ## validateParams
 *
 * validate the params that send from incoming request
 *
 * @param dtoSchema class passed as validation
 * @returns {ctx}
 */
export function validateParams(dtoSchema: AnyZodObject) {
  return validationMiddleware(dtoSchema, 'params')
}

/**
 * ## validateQuery
 *
 * validate the query from the income request
 *
 * @param dtoSchema class passed as validation
 * @returns {ctx}
 */
export function validateQuery(dtoSchema: AnyZodObject) {
  return validationMiddleware(dtoSchema, 'query')
}
