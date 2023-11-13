import { createSignal, For } from "solid-js"
import { useNavigate } from "solid-start"
import { siteName, externalPages, mainShow } from "~/config"

export function TopBar() {

    const [isMenuExpanded, setIsMenuExpanded] = createSignal(false)

    const navigator = useNavigate()

    function menuClicked() {
        console.log("Menu clicked when menu is expanded = " + isMenuExpanded())
        setIsMenuExpanded(!isMenuExpanded())
    }

    function navigateTo(destination: string) {
        console.log("Navigate to " + destination)
        navigator(destination)
    }

    return (<nav class="flex items-center justify-between flex-wrap bg-slate-950 p-6">
        <button onclick={() => navigateTo('')} class="flex items-center flex-shrink-0 text-white mr-6">
            <svg class="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
            </svg>
            <span class="font-semibold text-xl tracking-tight">{siteName}</span>
        </button>
        <div class="block lg:hidden">
            <button
                class="flex items-center px-3 py-2 border rounded text-white border-slate-400 hover:text-white hover:border-white"
                onclick={() => menuClicked()}>
                <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <title>Menu</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
            </button>
        </div>
        <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto" classList={{ 'hidden': !isMenuExpanded() }}>
            <div class="text-sm">
                <button onclick={() => navigateTo('show')}
                    class="block py-2 lg:py-0 lg:inline-block lg:mt-0 font-medium text-blue-50 hover:text-white mr-4">
                    { mainShow }
                </button>
                <For each={externalPages}>{(page) =>
                    <a href={page.url} class="block py-2 lg:py-0 lg:inline-block lg:mt-0 font-medium text-blue-50 hover:text-white mr-4">
                        {page.displayName}
                    </a>
                }</For>
            </div>
        </div>
    </nav >)
}



