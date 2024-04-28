import { Card, CardContent } from "@/components/ui/card"
import ChannelIcon from "./ChannelIcon"

const FavoriteLiversArea = () => {
  return (
    <Card>
      <CardContent className="p-8 space-y-8">
        <div>
          <p className="font-bold text-xl text-center my-2">最推しライバー</p>
          <div className="flex flex-col items-center justify-center">
            <ChannelIcon channelId="@AngeKatrina" size={112} quality="medium" />
            <span>アンジュ・カトリーナ</span>
          </div>
        </div>
        <div>
          <p className="font-bold text-xl text-center my-2">推しライバー</p>
          <div className="grid grid-cols-[repeat(5,auto)] justify-center -space-x-1">
            <ChannelIcon channelId="@InuiToko" />
            <ChannelIcon channelId="@LizeHelesta" />
            <ChannelIcon channelId="@AngeKatrina" />
            <ChannelIcon channelId="@AngeKatrina" />
            <ChannelIcon channelId="@AngeKatrina" />
          </div>
        </div>
      </CardContent>
    </Card>

  )
}

export default FavoriteLiversArea