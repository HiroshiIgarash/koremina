"use server";

const getVideoImage = async (id: string) => {
  const res = await fetch(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`).catch(
    () => null
  );

  if (!res || !res.ok) {
    return null;
  }

  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
};

export default getVideoImage;
