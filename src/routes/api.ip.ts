import { createFileRoute } from '@tanstack/react-router'
import { handleIpRequest } from '@/utils/ipServer'

export const Route = createFileRoute('/api/ip')({
  server: {
    handlers: {
      GET: async ({ request }) => handleIpRequest(request),
    },
  },
})
