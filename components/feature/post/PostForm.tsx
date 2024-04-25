"use client"

import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { redirect, useRouter } from "next/navigation"
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
  }),
  detailComment: z.string().optional(),
})

const PostForm = () => {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      videoId: "",
      comment: "",
      detailComment: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    axios.post('/api/post',values)
    .then(() => router.push('/'))
  }

  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                動画URLに含まれる11文字を記入してください
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>投稿者コメント</FormLabel>
              <FormControl>
                <Input placeholder="〇〇好きに見てほしい！" {...field} />
              </FormControl>
              <FormDescription>
                この動画に対するコメントを記入してください
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
                この動画に対するコメントを記入してください
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