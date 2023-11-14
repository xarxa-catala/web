import FacebookIcon from "~/assets/icons/facebook.svg"
import TelegramIcon from "~/assets/icons/telegram.svg"
import TwitterIcon from "~/assets/icons/twitter.svg"
import InstagramIcon from "~/assets/icons/instagram.svg"
import { instagramLink, telegramLink, twitterLink } from "~/config"
import { Show } from "solid-js"

export function Footer() {
    return (
        <footer class="flex flex-row w-full items-center p-4 bg-slate-950 mt-4">
            <a href="https://xarxacatala.cat">
                <div class="font-medium">Web part de <span class="font-semibold">Xarxa Català</span></div>
            </a>
            <div class="flex-1"></div>

            <div class="flex flex-row gap-3">
                <a href={telegramLink}><img class="w-8 h-auto" src={TelegramIcon} /></a>
                <a href={twitterLink}><img class="w-8 h-auto" src={TwitterIcon} /></a>

                <Show when={instagramLink != undefined}>
                    <a href={instagramLink}><img class="w-8 h-auto" src={InstagramIcon} /></a>
                </Show>
            </div>
        </footer>
    )
}