import { beforeAll, afterEach, afterAll } from 'vitest'
import { server } from './src/mocks/node'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

// If MSW not interuptting requests, uncomment to check if any request is fired
server.events.on('request:start', ({ request }) => {
  console.log('Outgoing:', request.method, request.url)
})
