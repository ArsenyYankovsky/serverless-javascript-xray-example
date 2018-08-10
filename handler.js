import AWSXRay from 'aws-xray-sdk-core'

import { slowFunction, fasterFunction, unreliableFunction } from './functions'

const asyncSubsegment = async (name, fn) => {
  const subsegment = AWSXRay.getSegment().addNewSubsegment(name)
  try {
    return await fn()
  } catch (e) {
    subsegment.addError(e)
    throw e
  } finally {
    subsegment.close()
  }
}

const fetchData = async () => {
  await asyncSubsegment('Slow Function', slowFunction)

  await asyncSubsegment('Faster Function', fasterFunction)

  return asyncSubsegment('Unreliable Function', unreliableFunction)
}

export const hello = async (event, context, callback) => {
  const data = await fetchData()
  callback(null, data)
}
