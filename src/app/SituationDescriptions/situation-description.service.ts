import OpenAI from 'openai'
import { openai } from '../../utils/setup/openai'

export const callOpenAI = async (prompt: string) => {
  try {
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
  } catch (error: unknown) {
    if (error instanceof OpenAI.RateLimitError) {
      console.error('Rate limit hit')
    } else if (error instanceof OpenAI.AuthenticationError) {
      console.error('Invalid API key')
    } else if (error instanceof OpenAI.BadRequestError) {
      console.error('Bad request:', error.message)
      console.error('Param:', error.param)
    } else if (error instanceof OpenAI.APIConnectionError) {
      console.error('Network issue:', error.message)
    } else if (error instanceof OpenAI.InternalServerError) {
      console.error('OpenAI server error')
    } else {
      console.error('Unknown error', error)
    }
    throw error
  }
}
