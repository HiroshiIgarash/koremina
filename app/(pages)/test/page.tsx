import Await from "@/components/feature/test/Await"
import Await2 from "@/components/feature/test/Await2"
import Await3 from "@/components/feature/test/Await3"

const page = () => {
  return (
    <div>
      <Await />
      <Await2 />
      <Await3 />
    </div>
  )
}

export default page