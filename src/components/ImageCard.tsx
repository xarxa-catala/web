export default function ImageCard(props: { imgUrl: string, title: string, linkUrl: string, description: string }) {

  return <>
    <div class="rounded-lg border- border-2 border-slate-700  hover:scale-105 transition-transform duration-200 w-72">
      <a href={props.linkUrl}>
        <img src={props.imgUrl} class="rounded-t-lg xc-card-img card-img-top" alt="..." />
        <div class="p-2 w-full">
          <p class="text-lg font-semibold text-white">{props.title}</p>
          <p class="card-text text-white pt-1 text-sm">
            {props.description}
          </p>
        </div>
      </a>
    </div>
  </>
}
