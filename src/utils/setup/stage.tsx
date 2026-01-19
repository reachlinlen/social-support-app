import { createContext, useContext, useState } from 'react'

export const StageContext = createContext<{
  stage: number
  setStage: React.Dispatch<React.SetStateAction<number>>
  isFormComplete: boolean
  setIsFormComplete: React.Dispatch<React.SetStateAction<boolean>>
} | null>(null)

export function StageProvider(
  props
  //   : {
  //   stage: number
  //   setStage: React.Dispatch<React.SetStateAction<number>>
  //   children: React.ReactNode
  // }
) {
  const [stage, setStage] = useState(1)
  const [isFormComplete, setIsFormComplete] = useState(false)
  const value = {
    stage,
    setStage,
    isFormComplete,
    setIsFormComplete,
  }
  return <StageContext.Provider value={value}>{props.children}</StageContext.Provider>
}

export function useStage() {
  const stage = useContext(StageContext)
  if (stage == undefined) {
    throw new Error(
      'useStage must be used within a StageProvider.\n' +
        'Did you forget to wrap your component tree with StageProvider?'
    )
  }
  return stage
}
