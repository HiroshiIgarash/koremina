import { Loader2 } from "lucide-react"

const loading = () => {
  return(
    <>
      <Loader2 className="animate-spin" />
      <p>loading...</p>
    </>
  )
}

export default loading