export function itemIdDefault<T>(index: number, item: T): string {
  return (item as { id: string })?.id ?? `${index}`;
}
