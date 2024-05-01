"use client"

import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import VideoImage from "./VideoImage"

const formSchema = z.object({
  videoId: z.string().min(11, {
    message: '動画IDは11文字です。'
  }).max(11, {
    message: '動画IDは11文字です。'
  }),
  comment: z.string().min(1, {
    message: '投稿者コメントは必須項目です。'
  }).max(60, {
    message: '60文字を超えています。'
  }),
  detailComment: z.string().optional(),
})

const PostForm = () => {
  const router = useRouter()
  const { toast } = useToast()
  const [isValidVideoId, setIsValidVideoId] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      videoId: "",
      comment: "",
      detailComment: "",
    },
    mode: "onBlur"
  })

  const watchVideoId = form.watch("videoId")
  const watchComment = form.watch("comment")

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await axios.post('/api/post', values)
      .then(() => {
        toast({
          description: "投稿が完了しました。"
        })
        router.push('/')
        router.refresh()
      })
  }

  const handleBlur = (value: string) => {

    if (!URL.canParse(value)) {
      form.trigger('videoId')
      return
    }

    const url = new URL(value)

    // https://www.youtube.com/watch〜 の場合、v= 以降を返す
    if (url.origin === 'https://www.youtube.com' && url.pathname === '/watch') {
      const paramV = url.searchParams.get('v')

      if (!paramV) return

      form.setValue('videoId', paramV.toString())

      // https://youtu.be〜 の場合、スラッシュ以降を返す
    } else if (url.origin === 'https://youtu.be') {
      const path = url.pathname // '/videoId'
      const removedSlashPath = path.slice(1)

      form.setValue('videoId', removedSlashPath)
    }

    form.trigger('videoId')
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <FormField
            control={form.control}
            name="videoId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>youtube ID（URLでも可）</FormLabel>
                <FormControl>
                  <Input className="text-base" {...field} onBlur={(e) => handleBlur(e.target.value)} />
                </FormControl>
                <FormDescription>
                  動画IDもしくはURLを記入してください。
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {
            watchVideoId.length === 11 && (
              <div className="mt-4">
                <VideoImage id={watchVideoId} setIsValidVideoId={setIsValidVideoId} />
              </div>
            )
          }
        </div>
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>投稿者コメント（必須）</FormLabel>
              <FormControl>
                <Input className="text-base" placeholder="〇〇好きに見てほしい！" {...field} />
              </FormControl>
              <FormDescription>
                この動画に対するコメントを60文字以内で記入してください。（<span className={clsx(watchComment.length > 60 && "text-destructive")} >{watchComment.length}</span> / 60）
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="detailComment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>投稿者コメント（詳細）</FormLabel>
              <FormControl>
                <Textarea className="resize-none text-base" {...field} />
              </FormControl>
              <FormDescription>
                コメントを細かく書くことができます。
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={
            form.formState.isSubmitting ||
            form.formState.isSubmitted ||
            !form.formState.isValid ||
            !isValidVideoId
          }
        >
          Submit
        </Button>
      </form>
    </Form>
  )
}

export default PostForm