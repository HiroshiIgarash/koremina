"use client"

import updateReadAllNotifications from "@/app/action/updateReadAllNotifications"
import { useEffect } from "react"

const RevalidateNotifications = () => {
  /**
   * ページを移動する際に通知を既読にする
   * 開発時、ReactStrictModeがtrueだと本番通りに作動しないので、挙動を確認する際はfalseにする
   */
  useEffect(() => {
    return () => {
      (async () => await updateReadAllNotifications())()
    }
  }, [])

  return (
    <></>
  )
}

export default RevalidateNotifications