

function Footer() {
  return (
    <>
    <div className=" mt-8 w-full bg-black px-8 lg:px-[20rem] md:px-[2rem] flex md:flex-row flex-col space-y-4 md:space-y-0 items-start justify-between text-sm md:text-md py-8">
        <div className=" flex flex-col text-white">
            <p>Featured Blogs</p>
            <p>Most Viewed</p>
            <p>Readers Choice</p>
        </div>

        <div className=" flex flex-col text-white">
            <p>Forum</p>
            <p>support</p>
            <p>Recent Posts</p>
        </div>

        <div className=" flex flex-col text-white">
            <p>Privacy Policy</p>
            <p>About Us</p>
            <p>Terms & Conditions</p>
            <p>Terms Of Service</p>
        </div>
    </div>
    <p className=" w-full py-2 pb-6 text-sm text-center text-white bg-black">All rights reserved @Blog App 2024</p>
    </>
  )
}

export default Footer