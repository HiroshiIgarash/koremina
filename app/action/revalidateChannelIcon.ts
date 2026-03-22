"use server";

import { updateTag } from "next/cache";

const revalidateChannelIcon = async (channelId: string): Promise<void> => {
  updateTag(`channel-icon-${channelId}`);
};

export default revalidateChannelIcon;
