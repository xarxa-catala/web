import { Show, createSignal } from "solid-js"
import Logo from "~/assets/dw_logo.svg"

export function SeasonCover(
    props: {
        name: string,
        imageUrl: string | undefined,
    }
) {
    const [showAlternativeUi, setShowAlternativeUi] = createSignal(false)

    return <div class="group flex flex-col items-center cursor-pointer relative w-32">
        <div class="w-full h-48 rounded-lg overflow-clip">
            <Show
                when={!showAlternativeUi() && props.imageUrl != undefined}
                fallback={
                    <div class="bg-slate-700 w-full h-full group-hover:scale-110 transition-transform duration-200 ">
                        <img src={Logo} class="w-full h-full" />
                    </div>
                }
            >
                <img
                    class="w-full h-full hover:scale-110 transition-transform duration-200 "
                    src={props.imageUrl}
                    onError={() => setShowAlternativeUi(true)}
                />
            </Show>
        </div>
        <p class="text-sm mt-2 mb-3">{props.name}</p>
    </div>
}