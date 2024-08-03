import { Show, createSignal } from "solid-js"
import { currentShow } from "~/config"

export function ShowCover(
    props: {
        imageUrl: string | undefined,
    }
) {
    const [showAlternativeUi, setShowAlternativeUi] = createSignal(false)

    return <div class="w-full h-full rounded-lg overflow-clip">
        <Show
            when={!showAlternativeUi() && props.imageUrl != undefined}
            fallback={
                <div class="bg-slate-700 w-full h-full">
                    <img src={currentShow.logo} class="w-full h-full object-contain" />
                </div>
            }
        >
            <img
                class="w-full h-full"
                src={props.imageUrl}
                onError={() => {
                    setShowAlternativeUi(true)
                }}
            />
        </Show>
    </div>
}