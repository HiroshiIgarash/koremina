import { Card, CardContent } from "@/components/ui/card"
import ChannelIcon from "./ChannelIcon"

const FavoriteLiversArea = () => {
  return (
    <Card>
      <CardContent className="p-8">
        <p className="font-bold text-center">最推しライバー</p>
        <div className="flex justify-center">
          <ChannelIcon channelId="@AngeKatrina" size={112} quality="medium" />
        </div>
        <p className="font-bold text-center">推しライバー</p>
        <div className="flex justify-center -space-x-1">
          <ChannelIcon channelId="@InuiToko" />
          <ChannelIcon channelId="@LizeHelesta" />
          <ChannelIcon channelId="@AngeKatrina" />
          <ChannelIcon channelId="@AngeKatrina" />
          <ChannelIcon channelId="@AngeKatrina" />
        </div>
      </CardContent>
    </Card>

  )
}

export default FavoriteLiversArea