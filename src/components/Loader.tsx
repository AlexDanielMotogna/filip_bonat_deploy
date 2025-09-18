'use client'
import { useEffect, useRef } from 'react'

const Loader = () => {
  const preloaderRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const style = preloaderRef.current?.style
    setTimeout(() => {
      if (style) {
        style.visibility = 'hidden'
        style.opacity = '0'
      }
    }, 300)
  }, [])

  return (
    <div id="preloader" ref={preloaderRef}>
      <div id="loader" />
    </div>
  )
}

export default Loader
