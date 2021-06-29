import isInDOM from './is-in-dom'

export default function hasParent(element: EventTarget | null, root: any | undefined) {
  return root && root.contains(element) && isInDOM(element)
}
