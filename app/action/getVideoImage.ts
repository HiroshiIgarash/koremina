'use server'

import axios from "axios";

const getVideoImage = async (id: string) => {

  const res = await axios
    .get(`https://i.ytimg.com/vi/${id}/hq720.jpg`)
    .catch(() => {
      return null;
    });

  if (!res) {
    return null
  }

  return `https://i.ytimg.com/vi/${id}/hq720.jpg`
}

export default getVideoImage