import { Card, CardContent } from "@/components/ui/card";
import MostFavoriteLiverDialog from "./MostFavoriteLiverDialog";
import { Button } from "@/components/ui/button";
import FavoriteLiversDialog from "./FavoriteLiversDialog";
import FavoriteLiversList from "./FavoriteLiversList";
import FavoriteLiversLoading from "./FavoriteLiversLoading";
import getCurrentUserWithTag from "@/app/action/getCurrentUserWithTag";
import { Suspense } from "react";

const FavoriteLiversArea = async () => {
  const currentUser = await getCurrentUserWithTag();

  if (!currentUser) return;

  return (
    <Card>
      <CardContent className="p-4 md:p-8 space-y-12">
        <div>
          <p className="font-semibold text-xl text-center my-4">
            最推しライバー
          </p>
          <Suspense fallback={<FavoriteLiversLoading />}>
            <FavoriteLiversList />
          </Suspense>
          <div className="flex justify-center space-x-4 mt-8">
            <MostFavoriteLiverDialog user={currentUser}>
              <Button>最推しライバーを選択</Button>
            </MostFavoriteLiverDialog>
            <FavoriteLiversDialog user={currentUser}>
              <Button variant="outline">推しライバーを選択</Button>
            </FavoriteLiversDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FavoriteLiversArea;
