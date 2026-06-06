import { GoogleGenAI } from '@google/genai'

let _client: GoogleGenAI | null = null

export function getGemini(): GoogleGenAI {
  if (!_client) {
    _client = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY ?? '' })
  }
  return _client
}
