import axios from "axios";
import { useEffect, useState } from "react";

const useVideoImage = (id: string) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    const fetchImageSrc = async (id: string) => {
      console.log("fetching image", id);
      await axios.get(`api/videoimage/${id}`).then((res) => {
        if(ignore) return

        if (!res.data.src) {
          return;
        }

        setImageSrc(res.data.src);
        
      });
    };

    fetchImageSrc(id);

    return () => {
      ignore = true;
    };
  }, [id]);

  return imageSrc;
};

export default useVideoImage;
