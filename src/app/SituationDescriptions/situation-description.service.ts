import { openai } from '../../utils/setup/openai'

export const callAPI = async (prompt: string) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: 'You are an AI assistant, answer any questions to the best of your ability.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
  })
  return response.choices[0].message.content
}
