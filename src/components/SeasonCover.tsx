export function SeasonCover(
    props: {
        name: string,
        imageUrl: string,
    }
) {
    return <div class="flex flex-col items-center cursor-pointer relative hover:scale-105 transition-transform duration-200">
        {/* <div class="
        bg-blue-600 text-white border-2 border-blue-100
        w-8 h-8 
        absolute right-1 top-1 
        rounded-full 
        flex items-center justify-center
        font-semibold">20</div> */}
        <img class="rounded-lg" src={props.imageUrl} onError={ "this.onerror=null; this.src='/images/seasons/1.webp'"}/>
        <p class="text-white mt-2 mb-3">{props.name}</p>
    </div>
}