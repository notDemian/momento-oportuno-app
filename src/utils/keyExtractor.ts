export function keyExtractor(item: unknown, index: number) {
  const key =
    item && typeof item === 'object' && 'id' in item
      ? `k-${item.id}${index}`
      : `index${index}`
  return key
}
