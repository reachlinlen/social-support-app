import { render, screen } from '@testing-library/react'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'

import { PersonalInfoForm } from '..'
import { StageProvider } from '../../../utils/setup/stage'

const mocks = vi.hoisted(() => {
  return {
    onSubmit: vi.fn(),
  }
})

vi.mock('../forms/org-settings-form')

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: any) => {
      // Return the key itself as a default translation for simplicity
      if (options && options.defaultValue) {
        return options.defaultValue
      }
      return key
    },
    i18n: {
      changeLanguage: vi.fn().mockImplementation((lang: string) => console.log(lang)),
      language: 'en',
    },
  }),
  // Mock the Trans component if you use it
  Trans: ({ children }: { children: React.ReactNode }) => children,
}))

const localStorageMock: Storage = ((record) => {
  let store: Record<string, string> = record ?? {}

  return {
    getItem: (key: string): string => store[key] ?? null,
    setItem: (key: string, value: string): void => {
      store[key] = value.toString()
    },
    removeItem: (key: string): void => {
      delete store[key]
    },
    clear: (): void => {
      store = {}
    },
    key: (index: number): string | null => '',
    length: Object.keys(store).length,
  }
})()
let originalLocalStorage: Storage

beforeAll(() => {
  originalLocalStorage = window.localStorage
  window.localStorage = localStorageMock
})
afterEach(() => vi.resetAllMocks())

const formvalues = {
  name: 'name',
  national_id: '784-1234-1234567-1',
  date_of_birth: '2026-01-19T14:59:21.000Z',
  gender: 'male',
  address: 'address',
  city: 'city',
  state: 'state',
  country: 'country',
  phone: '+971502511478',
  email: 'aa@aaa.com',
}

describe('Organisation Details Entry Form Test', () => {
  const submitSpy = vi.spyOn(mocks, 'onSubmit')
  it('Next button not working when form is not filled', async () => {
    const user = userEvent.setup()
    render(
      <StageProvider>
        <PersonalInfoForm />
      </StageProvider>
    )
    await user.click(screen.getByRole('button', { name: /next/i }))
    expect(submitSpy).not.toHaveBeenCalled()
  })

  it('Next button calls handle submit when form is filled', async () => {
    localStorageMock.setItem('personal_info', JSON.stringify(formvalues))
    const user = userEvent.setup()
    const { asFragment } = render(
      <StageProvider>
        <PersonalInfoForm />
      </StageProvider>
    )
    expect(asFragment()).toMatchSnapshot()
    await user.click(screen.getByRole('button', { name: /next/i }))
    expect(submitSpy).toHaveBeenCalledWith(formvalues)
  })
})
