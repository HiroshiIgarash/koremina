import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

interface IParams {
  id: string;
}

export const GET = async (
  req: NextRequest,
  { params }: { params: IParams }
) => {
  try {
    const id = params.id;

    if (!id) {
      return new NextResponse("Invalid data", { status: 400 });
    }

    const res = await axios
      .get(`https://i.ytimg.com/vi/${id}/hq720.jpg`)
      .catch(() => {
        return null;
      });

      if(!res) {
        return NextResponse.json({src: false})
      }

      return NextResponse.json({src: `https://i.ytimg.com/vi/${id}/hq720.jpg`})


  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
