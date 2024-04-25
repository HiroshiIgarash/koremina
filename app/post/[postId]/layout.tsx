import PostFooter from "@/components/feature/post/PostFooter"

const Layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div>
      {children}
      <PostFooter />
    </div>
  )
}

export default Layout