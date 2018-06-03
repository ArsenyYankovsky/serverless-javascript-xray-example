import AWSXRay from 'aws-xray-sdk-core'

import { slowFunction, fasterFunction, unreliableFunction } from './functions'

AWSXRay.enableManualMode()

const asyncSubsegment = async (name, parent, fn) => {
  const subsegment = parent.addNewSubsegment(name)
  try {
    return await fn()
  } catch (e) {
    subsegment.addError(e)
    throw e
  } finally {
    subsegment.close()
  }
}

const fetchData = async (segment) => {
  await asyncSubsegment('Slow Function', segment, slowFunction)

  await asyncSubsegment('Faster Function', segment, fasterFunction)

  return asyncSubsegment('Unreliable Function', segment, unreliableFunction)
}

export const hello = async () => {
  const segment = new AWSXRay.Segment('hello function')

  try {
    const data = await fetchData(segment)
    callback(null, data)
  } catch(err) {
    segment.addError(err)
    callback(err)
  } finally {
    segment.close()
  }
}
