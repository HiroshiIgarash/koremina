"use client"

import { Button } from "@/components/ui/button"
import { NextScript } from "next/document"
import { useEffect, useRef } from "react"

interface VideoProps {
  videoId: string
}

const Video = ({ videoId }: VideoProps) => {
  const videoRef = useRef<HTMLIFrameElement>(null)
  useEffect(() => {
    if (!videoRef.current) return
    console.log(videoRef.current)
    videoRef.current.contentWindow?.postMessage('{"event":"command", "func":"' + "seekTo" + '", "args":' + "[60]" + '}', '*')
  }, [])
  return (
    <>
      <iframe
        ref={videoRef}
        width="560"
        height="315"
        className="w-full h-auto aspect-video"
        src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <div className="grid gap-4">
        <Button onClick={() => {
          if (!videoRef.current) return
          console.log(videoRef.current)
          videoRef.current.contentWindow?.postMessage('{"event":"command", "func":"' + "playVideo" + '", "args":' + null + '}', '*')
        }}>再生</Button>
        <Button onClick={() => {
          if (!videoRef.current) return
          console.log(videoRef.current)
          videoRef.current.contentWindow?.postMessage('{"event":"command", "func":"' + "pauseVideo" + '", "args":' + null + '}', '*')
        }}>一時停止</Button>
        <Button onClick={() => {
          if (!videoRef.current) return
          console.log(videoRef.current)
          videoRef.current.contentWindow?.postMessage('{"event":"command", "func":"' + "seekTo" + '", "args":' + "[60]" + '}', '*')
        }}>1:00へシーク</Button>
      </div>
    </>
  )
}

export default Video