export interface TokenGenerator {
  generate: (payload: any) => Promise<string>
  validate: (input: { token: string }) => Promise<string>
}