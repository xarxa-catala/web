import { createSignal, For, Show } from "solid-js"
import { useNavigate } from "solid-start"
import { siteName, externalPages, mainShow, additionalShows } from "~/config"

export function TopBar() {
    const [isMenuExpanded, setIsMenuExpanded] = createSignal(false)
    const [isOtherShowsExpanded, setIsOtherShowsExpanded] = createSignal(false)
    const navigator = useNavigate()


    return <nav class="left-0 top-0 w-full flex items-center justify-between flex-wrap bg-slate-950 py-4 px-6">
        <button
            onclick={() => {
                navigator('')
                setIsMenuExpanded(false)
            }}
            class="flex items-center flex-shrink-0 text-white mr-6"
        >
            <span class="font-semibold text-xl tracking-tight">{siteName}</span>
        </button>
        <div class="block lg:hidden">
            <button
                class="flex items-center px-3 py-2 border rounded border-slate-400 hover:text-white hover:border-white"
                onclick={() => setIsMenuExpanded(!isMenuExpanded())}>
                <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <title>Menu</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
            </button>
        </div>
        <div class="w-full mt-2 lg:mt-0 block flex-grow lg:flex lg:items-center lg:w-auto" classList={{ 'hidden': !isMenuExpanded() }}>
            <div class="text-sm">
                <ToolbarMenuEntry
                    name={mainShow}
                    url={undefined}
                    onClick={() => {
                        navigator("show")
                        setIsMenuExpanded(false)
                    }} />

                <Show when={additionalShows.length > 0}>
                    <div class="lg:inline-block lg:w-auto group w-full">
                        <ToolbarMenuEntry
                            name={"Altres sèries"}
                            url={undefined}
                            onClick={() => { setIsOtherShowsExpanded(!isOtherShowsExpanded()) }} />


                        <div class="-ml-3 lg:fixed flex-col lg:group-hover:flex lg:hidden" classList={{ "flex": isOtherShowsExpanded(), "hidden": !isOtherShowsExpanded() }}>
                            <For each={additionalShows}>{(page) =>
                                <DropdownMenuEntry
                                    name={page.name}
                                    url={undefined}
                                    onClick={() => {
                                        navigator(`show?id=${page.id}`)
                                        setIsOtherShowsExpanded(false)
                                        setIsMenuExpanded(false)
                                    }} />
                            }</For>
                        </div>
                    </div>
                </Show>
                <For each={externalPages}>{(page) =>
                    <ToolbarMenuEntry
                        name={page.displayName}
                        url={page.url}
                        onClick={() => { }} />
                }</For>
            </div>
        </div>
    </nav>
}


function ToolbarMenuEntry(
    props: {
        name: string,
        url: string | undefined,
        onClick: () => any,
    }
) {
    return <a
        onClick={() => props.onClick()}
        href={props.url}
        class="block w-full lg:w-auto py-2 lg:inline-block lg:mt-0 font-medium text-blue-50 hover:text-white mr-4 cursor-pointer">
        {props.name}
    </a>
}



function DropdownMenuEntry(
    props: {
        name: string,
        url: string | undefined,
        onClick: () => any,
    }
) {
    return <a
        onClick={() => props.onClick()}
        href={props.url}
        class="py-2 px-3 bg-slate-950 hover:bg-slate-800 cursor-pointer w-full">
        {props.name}
    </a>
}
