export type SituationsDescriptionsType = {
  current_financial_situation: string
  employment_circumstances: string
  reason_for_applying: string
}

export type AIInteractionType = {
  [key: string]: {
    prompt: string
    response: string
  }[]
}
