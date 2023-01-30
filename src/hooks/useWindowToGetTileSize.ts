import { useState, useEffect, useRef } from 'react'

const MAX_TILE_SIZE = 48
const TILE_SIZE_RATIO = 0.028

export default function useWindowToGetTileSize (): [ts: number, mw: boolean] {

  const [tileSize, setTileSize] = useState<number>(MAX_TILE_SIZE)
  const [mobileWindow, setMobileWindow] = useState(false)
  const _mobileWindow = useRef(false)

  useEffect(() => {
    const handleResize = () => {
      const heightIsTaller = window.innerHeight > window.innerWidth

      setMobileWindow(window.innerWidth < 600)
      _mobileWindow.current = window.innerWidth < 600

      const valueToUse = heightIsTaller
        ? window.innerWidth
        : window.innerHeight

      const size = valueToUse * TILE_SIZE_RATIO

      setTileSize(Math.min(Math.round(size), MAX_TILE_SIZE))
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return [tileSize, mobileWindow]
}
