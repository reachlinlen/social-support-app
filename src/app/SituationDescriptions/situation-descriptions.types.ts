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
//   []
//   employment_circumstances: {
//     prompt: string
//     response: string
//   }[]
//   reason_for_applying: {
//     prompt: string
//     response: string
//   }[]
// }
