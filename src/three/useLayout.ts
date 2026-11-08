import { useThree } from '@react-three/fiber'

/**
 * Responsive placement for station scenes: on wide screens the 3D object sits
 * beside the text column; on phones it moves behind the text and shrinks.
 */
export function useLayout() {
  const width = useThree((s) => s.size.width)
  if (width >= 1100) return { side: 1, scale: 1, mobile: false }
  if (width >= 760) return { side: 0.7, scale: 0.85, mobile: false }
  return { side: 0.12, scale: 0.7, mobile: true }
}
