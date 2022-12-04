import { Response } from 'express'

export type Result<T> =
  { data: T } |
  { error: string }

export function handleResult<P>(result: Promise<Result<P>>, response: Response) {
  result
    .then(res => {
      if ('error' in res)
        return response.status(400).send(res.error)
      return response.status(200).json(res.data)
    })
    .catch(err => {
      return response.status(500).send("Failed to get project")
    })
}
