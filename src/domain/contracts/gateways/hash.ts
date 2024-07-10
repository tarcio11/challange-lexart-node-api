export abstract class HasherGenerator {
  abstract hash: (plaintext: string) => Promise<string>
}
