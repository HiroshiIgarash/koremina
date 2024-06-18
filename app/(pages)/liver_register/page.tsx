import getLivers from "@/app/action/getLivers"
import { notFound } from "next/navigation"
import liverData from "@/public/liver.json"
import RegisterButton from "./RegisterButton"

const Page = async () => {

  const livers = await getLivers()

  if(process.env.NODE_ENV === 'production') {
    notFound()
  }


  return (
    <div className="px-4 w-full max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-16">ライバー登録</h1>
      <h2 className="text-xl font-bold mt-4 mb-2">在籍にじさんじライバー</h2>
      <ul className="space-y-2">
        {liverData.filter(liver => !liver.isOverseas && !liver.isRetire).map((liver,index) => (
          <li key={liver.name} className="liverItem grid grid-cols-8 border p-2 gap-2">
            <input className="border p-2" name="index" defaultValue={liverData.findIndex(l=>l.name===liver.name)} />
            <input className="border p-2" name="id" defaultValue={livers.find(l => l.channelHandle === liver.channelHandle)?.id} disabled />
            <input className="border p-2" name="name" defaultValue={liver.name} />
            <input className="border p-2" name="aliasFirst" defaultValue={liver.aliasFirst} />
            <input className="border p-2" name="aliasSecond" defaultValue={liver.aliasSecond} />
            <input className="border p-2" name="channelHandle" defaultValue={liver.channelHandle} />
            <input className="border p-2" name="isRetire" defaultValue={liver.isRetire} />
            <input className="border p-2" name="isOverseas" defaultValue={liver.isOverseas} />
          </li>
        ))}
      </ul>
      <h2 className="text-xl font-bold mt-4 mb-2">在籍海外ライバー</h2>
      <ul className="space-y-2">
        {liverData.filter(liver => liver.isOverseas && !liver.isRetire).map((liver,index) => (
          <li key={liver.name} className="liverItem grid grid-cols-8 border p-2 gap-2">
            <input className="border p-2" name="index" defaultValue={liverData.findIndex(l=>l.name===liver.name)} />
            <input className="border p-2" name="id" defaultValue={livers.find(l => l.channelHandle === liver.channelHandle)?.id} disabled />
            <input className="border p-2" name="name" defaultValue={liver.name} />
            <input className="border p-2" name="aliasFirst" defaultValue={liver.aliasFirst} />
            <input className="border p-2" name="aliasSecond" defaultValue={liver.aliasSecond} />
            <input className="border p-2" name="channelHandle" defaultValue={liver.channelHandle} />
            <input className="border p-2" name="isRetire" defaultValue={liver.isRetire} />
            <input className="border p-2" name="isOverseas" defaultValue={liver.isOverseas} />
          </li>
        ))}
      </ul>
      <h2 className="text-xl font-bold mt-4 mb-2">卒業にじさんじライバー</h2>
      <ul className="space-y-2">
        {liverData.filter(liver => !liver.isOverseas && liver.isRetire).map((liver,index) => (
          <li key={liver.name} className="liverItem grid grid-cols-8 border p-2 gap-2">
            <input className="border p-2" name="index" defaultValue={liverData.findIndex(l=>l.name===liver.name)} />
            <input className="border p-2" name="id" defaultValue={livers.find(l => l.channelHandle === liver.channelHandle)?.id} disabled />
            <input className="border p-2" name="name" defaultValue={liver.name} />
            <input className="border p-2" name="aliasFirst" defaultValue={liver.aliasFirst} />
            <input className="border p-2" name="aliasSecond" defaultValue={liver.aliasSecond} />
            <input className="border p-2" name="channelHandle" defaultValue={liver.channelHandle} />
            <input className="border p-2" name="isRetire" defaultValue={liver.isRetire} />
            <input className="border p-2" name="isOverseas" defaultValue={liver.isOverseas} />
          </li>
        ))}
      </ul>
      <h2 className="text-xl font-bold mt-4 mb-2">卒業海外ライバー</h2>
      <ul className="space-y-2">
        {liverData.filter(liver => liver.isOverseas && liver.isRetire).map((liver,index) => (
          <li key={liver.name} className="liverItem grid grid-cols-8 border p-2 gap-2">
            <input className="border p-2" name="index" defaultValue={liverData.findIndex(l=>l.name===liver.name)} />
            <input className="border p-2" name="id" defaultValue={livers.find(l => l.channelHandle === liver.channelHandle)?.id} disabled />
            <input className="border p-2" name="name" defaultValue={liver.name} />
            <input className="border p-2" name="aliasFirst" defaultValue={liver.aliasFirst} />
            <input className="border p-2" name="aliasSecond" defaultValue={liver.aliasSecond} />
            <input className="border p-2" name="channelHandle" defaultValue={liver.channelHandle} />
            <input className="border p-2" name="isRetire" defaultValue={liver.isRetire} />
            <input className="border p-2" name="isOverseas" defaultValue={liver.isOverseas} />
          </li>
        ))}
      </ul>
      <div className="mt-4 text-center">
        <RegisterButton />
      </div>
    </div>
  )
}



export default Page