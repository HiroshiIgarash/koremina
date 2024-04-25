import axios from "axios";
import { useEffect, useState } from "react";

const useVideoImage = (id: string) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isFetching,setIsFetching] = useState(false)

  useEffect(() => {
    let ignore = false;

    const fetchImageSrc = async (id: string) => {
      setIsFetching(true)
      await axios.get(`api/videoimage/${id}`).then((res) => {
        setIsFetching(false)

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

  return {imageSrc,isFetching};
};

export default useVideoImage;
