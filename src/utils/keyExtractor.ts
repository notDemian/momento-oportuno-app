export function keyExtractor(item: unknown, index: number) {
  return item && typeof item === 'object' && 'id' in item
    ? `${item.id}${index}`
    : `index${index}`
}
