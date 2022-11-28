
export default function exclude<T, Key extends keyof T>(
  thing: T,
  keys: Key[]
): Omit<T, Key> {
  for (let key of keys) {
    delete thing[key]
  }
  return thing
}
