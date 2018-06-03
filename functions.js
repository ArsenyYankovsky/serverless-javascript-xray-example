export const slowFunction = async () => {
  await new Promise(resolve => setTimeout(resolve, 2000))
}

export const fasterFunction = async () => {
  await new Promise(resolve => setTimeout(resolve, 150))
}

export const unreliableFunction = async () => {
  if(Math.random() < 0.2) {
    throw new Error('Something went wrong')
  } else {
    return {
      message: 'hello'
    }
  }
}
