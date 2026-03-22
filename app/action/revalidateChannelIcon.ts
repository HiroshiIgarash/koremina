"use server";

import { revalidateTag } from "next/cache";

const revalidateChannelIcon = async (channelId: string): Promise<void> => {
  revalidateTag(`channel-icon-${channelId}`);
};

export default revalidateChannelIcon;
