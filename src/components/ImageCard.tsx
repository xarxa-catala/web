export default function ImageCard(props: { imgUrl: string, title: string, linkUrl: string, description: string }) {

  return <>
    <div class="rounded-lg   w-72 group overflow-clip bg-slate-700">
      <a href={props.linkUrl}>
        <div class="w-full h-32 overflow-clip">
          <img src={props.imgUrl} class="group-hover:scale-110 transition-transform duration-200 w-full h-full" alt="..." />
        </div>
        <div class="p-2 w-full m-1">
          <p class="text-lg font-semibold text-white">{props.title}</p>
          <p class="card-text text-white pt-1 text-sm">
            {props.description}
          </p>
        </div>
      </a>
    </div>
  </>
}
