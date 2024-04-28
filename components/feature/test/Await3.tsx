import getCurrentUser from "@/app/action/getCurrentUser"

const Await3 = async() => {
  const currentUser1 = await getCurrentUser()

  return (
    <>
      <div>{ currentUser1?.name }</div>
    </>
  )
}

export default Await3