import getLivers from "@/app/action/getLivers"
import { notFound } from "next/navigation"
import liverData from "@/public/liver.json"
import RegisterButton from "./RegisterButton"
import { cn } from "@/lib/utils"
import ChannelIcon from "@/components/feature/setting/ChannelIcon"

const Page = async () => {

  const livers = await getLivers()

  if(process.env.NODE_ENV === 'production') {
    notFound()
  }


  return (
    <div className="px-4 w-full max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-16">ライバー登録</h1>
      <h2 className="text-xl font-bold mt-4 mb-2">在籍にじさんじライバー</h2>
      <RegisterButton listId="nijisanji" />
      <ul id="nijisanji" className="space-y-2">
        {liverData.filter(liver => !liver.isOverseas && !liver.isRetire).map((liver,index) =>{ 
          const liver_db = livers.find(l => l.name === liver.name)
          const isLiverDuplicate = livers.filter(l => l.name === liver.name).length > 1
          return(
          <li key={liver.name} className={cn("liverItem grid grid-cols-9 border p-2 gap-2",isLiverDuplicate && "border-red-600 border-2")}>
            <ChannelIcon channelId={liver.channelHandle} />
            <input className={cn("border p-2")} name="index" defaultValue={liverData.findIndex(l=>l.name===liver.name)} />
            <input className={cn("border p-2")} name="id" defaultValue={livers.find(l => l.name === liver.name)?.id} disabled />
            <input className={cn("border p-2",liver_db?.name !== liver.name && "bg-red-100")} name="name" defaultValue={liver.name} />
            <input className={cn("border p-2",liver_db?.aliasFirst || '' !== liver.aliasFirst && "bg-red-100")} name="aliasFirst" defaultValue={liver.aliasFirst} />
            <input className={cn("border p-2",liver_db?.aliasSecond || '' !== liver.aliasSecond && "bg-red-100")} name="aliasSecond" defaultValue={liver.aliasSecond} />
            <input className={cn("border p-2",liver_db?.channelHandle !== liver.channelHandle && "bg-red-100")} name="channelHandle" defaultValue={liver.channelHandle} />
            <input className={cn("border p-2",liver_db?.isRetire !== Boolean(liver.isRetire) && "bg-red-100")} name="isRetire" defaultValue={liver.isRetire} />
            <input className={cn("border p-2",liver_db?.isOverseas !== Boolean(liver.isOverseas) && "bg-red-100")} name="isOverseas" defaultValue={liver.isOverseas} />
          </li>
        )})}
      </ul>
      <h2 className="text-xl font-bold mt-4 mb-2">在籍海外ライバー</h2>
      <RegisterButton listId="nijisanji_en" />
      <ul id="nijisanji_en" className="space-y-2">
        {liverData.filter(liver => liver.isOverseas && !liver.isRetire).map((liver,index) => {
          const liver_db = livers.find(l => l.name===liver.name)
          const isLiverDuplicate = livers.filter(l => l.name === liver.name).length > 1
          
          return(
          <li key={liver.name} className={cn("liverItem grid grid-cols-9 border p-2 gap-2",isLiverDuplicate && "border-red-600 border-2")}>
            <ChannelIcon channelId={liver.channelHandle} />
            <input className={cn("border p-2")} name="index" defaultValue={liverData.findIndex(l=>l.name===liver.name)} />
            <input className={cn("border p-2")} name="id" defaultValue={livers.find(l => l.name === liver.name)?.id} disabled />
            <input className={cn("border p-2",liver_db?.name !== liver.name && "bg-red-100")} name="name" defaultValue={liver.name} />
            <input className={cn("border p-2",liver_db?.aliasFirst || '' !== liver.aliasFirst && "bg-red-100")} name="aliasFirst" defaultValue={liver.aliasFirst} />
            <input className={cn("border p-2",liver_db?.aliasSecond || '' !== liver.aliasSecond && "bg-red-100")} name="aliasSecond" defaultValue={liver.aliasSecond} />
            <input className={cn("border p-2",liver_db?.channelHandle !== liver.channelHandle && "bg-red-100")} name="channelHandle" defaultValue={liver.channelHandle} />
            <input className={cn("border p-2",liver_db?.isRetire !== Boolean(liver.isRetire) && "bg-red-100")} name="isRetire" defaultValue={liver.isRetire} />
            <input className={cn("border p-2",liver_db?.isOverseas !== Boolean(liver.isOverseas) && "bg-red-100")} name="isOverseas" defaultValue={liver.isOverseas} />
          </li>
        )})}
      </ul>
      <h2 className="text-xl font-bold mt-4 mb-2">卒業にじさんじライバー</h2>
      <RegisterButton listId="nijisanji_retire" />
      <ul id="nijisanji_retire" className="space-y-2">
        {liverData.filter(liver => !liver.isOverseas && liver.isRetire).map((liver,index) => {
          const liver_db = livers.find(l => l.name===liver.name)
          const isLiverDuplicate = livers.filter(l => l.name === liver.name).length > 1

          return(
          <li key={liver.name} className={cn("liverItem grid grid-cols-9 border p-2 gap-2",isLiverDuplicate && "border-red-600 border-2")}>
            <ChannelIcon channelId={liver.channelHandle} />
            <input className={cn("border p-2")} name="index" defaultValue={liverData.findIndex(l=>l.name===liver.name)} />
            <input className={cn("border p-2")} name="id" defaultValue={livers.find(l => l.name === liver.name)?.id} disabled />
            <input className={cn("border p-2",liver_db?.name !== liver.name && "bg-red-100")} name="name" defaultValue={liver.name} />
            <input className={cn("border p-2",liver_db?.aliasFirst || '' !== liver.aliasFirst && "bg-red-100")} name="aliasFirst" defaultValue={liver.aliasFirst} />
            <input className={cn("border p-2",liver_db?.aliasSecond || '' !== liver.aliasSecond && "bg-red-100")} name="aliasSecond" defaultValue={liver.aliasSecond} />
            <input className={cn("border p-2",liver_db?.channelHandle !== liver.channelHandle && "bg-red-100")} name="channelHandle" defaultValue={liver.channelHandle} />
            <input className={cn("border p-2",liver_db?.isRetire !== Boolean(liver.isRetire) && "bg-red-100")} name="isRetire" defaultValue={liver.isRetire} />
            <input className={cn("border p-2",liver_db?.isOverseas !== Boolean(liver.isOverseas) && "bg-red-100")} name="isOverseas" defaultValue={liver.isOverseas} />
          </li>
        )})}
      </ul>
      <h2 className="text-xl font-bold mt-4 mb-2">卒業海外ライバー</h2>
      <RegisterButton listId="nijisanji_retire_overseas" />
      <ul id="nijisanji_retire_overseas" className="space-y-2">
        {liverData.filter(liver => liver.isOverseas && liver.isRetire).map((liver,index) =>{
          const liver_db = livers.find(l => l.name===liver.name)
          const isLiverDuplicate = livers.filter(l => l.name === liver.name).length > 1
          
          return (
          <li key={liver.name} className={cn("liverItem grid grid-cols-9 border p-2 gap-2",isLiverDuplicate && "border-red-600 border-2")}>
            <ChannelIcon channelId={liver.channelHandle} />
            <input className={cn("border p-2")} name="index" defaultValue={liverData.findIndex(l=>l.name===liver.name)} />
            <input className={cn("border p-2")} name="id" defaultValue={livers.find(l => l.name === liver.name)?.id} disabled />
            <input className={cn("border p-2",liver_db?.name !== liver.name && "bg-red-100")} name="name" defaultValue={liver.name} />
            <input className={cn("border p-2",liver_db?.aliasFirst || '' !== liver.aliasFirst && "bg-red-100")} name="aliasFirst" defaultValue={liver.aliasFirst} />
            <input className={cn("border p-2",liver_db?.aliasSecond || '' !== liver.aliasSecond && "bg-red-100")} name="aliasSecond" defaultValue={liver.aliasSecond} />
            <input className={cn("border p-2",liver_db?.channelHandle !== liver.channelHandle && "bg-red-100")} name="channelHandle" defaultValue={liver.channelHandle} />
            <input className={cn("border p-2",liver_db?.isRetire !== Boolean(liver.isRetire) && "bg-red-100")} name="isRetire" defaultValue={liver.isRetire} />
            <input className={cn("border p-2",liver_db?.isOverseas !== Boolean(liver.isOverseas) && "bg-red-100")} name="isOverseas" defaultValue={liver.isOverseas} />
          </li>
        )})}
      </ul>
      <div className="mt-4 text-center">
        <RegisterButton />
      </div>
    </div>
  )
}



export default Page