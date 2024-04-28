import getCurrentUser from "@/app/action/getCurrentUser"

const Await = async() => {
  const currentUser1 = await getCurrentUser()

  return (
    <>
      <div>{ currentUser1?.name }</div>
    </>
  )
}

export default Await