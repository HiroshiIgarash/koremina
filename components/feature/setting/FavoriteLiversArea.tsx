import { Card, CardContent } from "@/components/ui/card"
import ChannelIcon from "./ChannelIcon"
import MostFavoriteLiverDialog from "./MostFavoriteLiverDialog"
import { Button } from "@/components/ui/button"
import getCurrentUser from "@/app/action/getCurrentUser"
import FavoriteLiversDialog from "./FavoriteLiversDialog"

const FavoriteLiversArea = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) return

  return (
    <Card>
      <CardContent className="p-8 space-y-12">
        <div>
          <p className="font-semibold text-xl text-center my-4">最推しライバー</p>
          <div className="flex flex-col items-center justify-center">
            {
              currentUser.mostFavoriteLiver && (
                <>
                  <ChannelIcon channelId={currentUser.mostFavoriteLiver.channelHandle} size={112} quality="medium" />
                  <span>{currentUser.mostFavoriteLiver.name}</span>
                </>
              )
            }
            <MostFavoriteLiverDialog user={currentUser}>
              <Button className="mt-8">最推しライバーを選択</Button>
            </MostFavoriteLiverDialog>
          </div>
        </div>
        <div>
          <p className="font-semibold text-xl text-center my-4">推しライバー</p>
          <div className="flex flex-col items-center justify-center">
            <div className="grid grid-cols-[repeat(5,auto)] justify-center">
              {
                currentUser.favoriteLivers.map(liver => (
                  <ChannelIcon key={liver.id} channelId={liver.channelHandle} />
                ))
              }
            </div>
            <FavoriteLiversDialog user={currentUser} >
              <Button className="mt-8">推しライバーを選択</Button>
            </FavoriteLiversDialog>
          </div>
        </div>
      </CardContent>
    </Card>

  )
}

export default FavoriteLiversArea