
export function EpisodeCover(
    props: {
        name: string,
        index: number,
    }
) {
    return <div class="relative flex flex-row items-center 
    cursor-pointer h-10 
    hover:bg-slate-700 hover:border-slate-300 rounded-lg border-transparent border-2
    px-1 py-5 w-full
    ">
        <div class="
        bg-blue-600
        w-8 h-8
        rounded-full 
        flex items-center justify-center
        font-semibold ">{ props.index }</div>
        <p class="ms-2">{props.name}</p>
    </div>
}