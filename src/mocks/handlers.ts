import { http, HttpResponse } from 'msw'

import { API, ERROR_EMAIL } from '../utils/constant'
import type { IFormPersonalInfoType } from '../app/PersonalInfo/personal-info.types'

export const handlers = [
  http.post(API.application, async ({ request }) => {
    const applicationData = await request.json()
    const { email } = applicationData as unknown as IFormPersonalInfoType
    if (email === ERROR_EMAIL) {
      return new HttpResponse(JSON.stringify({ errorMessage: 'Primary key constraint in application table' }), {
        status: 500,
      })
    }
    return HttpResponse.json(
      {
        application_number: 123,
      },
      { status: 201 }
    )
  }),
]
