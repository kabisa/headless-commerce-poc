export default function isInDom(obj: any): boolean {
  return Boolean(obj.closest('body'))
}
