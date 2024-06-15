

function HomePosts() {
  return (
    <div className=" w-full flex mt-8 space-x-4">
        {/* left */}
        <div className=" w-[35%] h-[200px] flex justify-center items-center">
            <img src="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp" alt="" className=" h-full w-full object-cover"/>
        </div>
        {/* right */}
        <div className="flex flex-col w-[65%]">
            <h1 className=" text-xl font-bold md:mb-2 mb-1 md:text-2xl">
            AI Image Generator
            </h1>
            <div className=" flex mb-2 text-sm font-semibold text-gray-500 item-center justify-between md:mb-4">
                <p>@Darshan_Kumar</p>
                <div className="flex space-x-2">
                    <p>16/06/2024</p>
                    <p>16:45</p>
                </div>
            </div>
           <p className=" text-sm md:text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis ullam sed laborum alias debitis obcaecati, eius corrupti, neque at sint facilis labore aspernatur in totam beatae officiis. Dicta, id rem.</p>
        </div>
    </div>
  )
}

export default HomePosts