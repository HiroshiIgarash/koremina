import { Button } from "@/components/ui/button"
import Link from "next/link"

const Page = () => {

  return (
    <div className='flex flex-col justify-center h-full gap-8'>
      <h2 className='font-bold text-xl text-center'>エラーが発生しました...</h2>
      <p className='text-center'>
        ログインに失敗したようです。<br />
        一度TOPへもどり、もう一度やり直してください。
      </p>
      <Button asChild>
        <Link href="/">
          TOPへもどる
        </Link>
      </Button>
    </div>
  )
}

export default Page