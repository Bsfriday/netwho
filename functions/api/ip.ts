import { handleIpRequest } from '../../src/utils/ipServer'

export async function onRequest(context: { request: Request }) {
  return handleIpRequest(context.request)
}
