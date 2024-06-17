import getLivers from "@/app/action/getLivers"
import { notFound } from "next/navigation"

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
        {livers.filter(liver => !liver.isOverseas && !liver.isRetire).map((liver,index) => (
          <li key={liver.id} className="grid grid-cols-4 border p-2 gap-2">
            <input className="border p-2" defaultValue={index} />
            <input className="border p-2" defaultValue={liver.id} />
            <input className="border p-2" defaultValue={liver.name} />
            <input className="border p-2" defaultValue={liver.channelHandle} />
          </li>
        ))}
      </ul>
      <h2 className="text-xl font-bold mt-4 mb-2">在籍海外ライバー</h2>
      <ul className="space-y-2">
        {livers.filter(liver => liver.isOverseas && !liver.isRetire).map((liver,index) => (
          <li key={liver.id} className="grid grid-cols-4 border p-2 gap-2">
            <input className="border p-2" defaultValue={index} />
            <input className="border p-2" defaultValue={liver.id} />
            <input className="border p-2" defaultValue={liver.name} />
            <input className="border p-2" defaultValue={liver.channelHandle} />
          </li>
        ))}
      </ul>
      <h2 className="text-xl font-bold mt-4 mb-2">卒業にじさんじライバー</h2>
      <ul className="space-y-2">
        {livers.filter(liver => !liver.isOverseas && liver.isRetire).map((liver,index) => (
          <li key={liver.id} className="grid grid-cols-4 border p-2 gap-2">
            <input className="border p-2" defaultValue={index} />
            <input className="border p-2" defaultValue={liver.id} />
            <input className="border p-2" defaultValue={liver.name} />
            <input className="border p-2" defaultValue={liver.channelHandle} />
          </li>
        ))}
      </ul>
      <h2 className="text-xl font-bold mt-4 mb-2">卒業海外ライバー</h2>
      <ul className="space-y-2">
        {livers.filter(liver => !liver.isOverseas && liver.isRetire).map((liver,index) => (
          <li key={liver.id} className="grid grid-cols-4 border p-2 gap-2">
            <input className="border p-2" defaultValue={index} />
            <input className="border p-2" defaultValue={liver.id} />
            <input className="border p-2" defaultValue={liver.name} />
            <input className="border p-2" defaultValue={liver.channelHandle} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Page