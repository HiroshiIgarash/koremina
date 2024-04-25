"use client"

import VideoImage from "@/components/VideoImage"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  videoId: z.string().min(11,{
    message:'動画IDは11文字です。'
  }).max(11,{
    message:'動画IDは11文字です。'
  }),
  comment: z.string().min(1, {
    message: '投稿者コメントは必須項目です。'
  }).max(30, {
    message: '30文字を超えています。'
  }),
  detailComment: z.string().optional(),
})

const PostForm = () => {
  const router = useRouter()
  const {toast} = useToast()

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

  function onSubmit(values: z.infer<typeof formSchema>) {
    axios.post('/api/post',values)
    .then(() => {
      toast({
        description: "投稿が完了しました。"
      })
      router.push('/')
    })
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
                <FormLabel>youtube ID</FormLabel>
                <FormControl>
                  <Input maxLength={11} {...field} />
                </FormControl>
                <FormDescription>
                  動画URLに含まれる11文字を記入してください。
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {
            watchVideoId.length === 11 && (
                <VideoImage id={watchVideoId} />
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
                <Input placeholder="〇〇好きに見てほしい！" {...field} />
              </FormControl>
              <FormDescription>
                この動画に対するコメントを30文字以内で記入してください。（<span className={clsx(watchComment.length > 30 && "text-destructive")} >{watchComment.length}</span> / 30）
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
                <Textarea className="resize-none" {...field} />
              </FormControl>
              <FormDescription>
                コメントを細かく書くことができます。
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting || !form.formState.isValid}>Submit</Button>
      </form>
    </Form>
  )
}

export default PostForm