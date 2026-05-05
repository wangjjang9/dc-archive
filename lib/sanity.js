import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'v4b35n85',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})