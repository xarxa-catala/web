import FacebookIcon from "~/assets/icons/facebook.svg"
import TelegramIcon from "~/assets/icons/telegram.svg"
import TwitterIcon from "~/assets/icons/twitter.svg"
import InstagramIcon from "~/assets/icons/instagram.svg"

export function Footer() {
    return (
        <footer class="flex flex-row w-full items-center p-4">
            <a href="https://xarxacatala.cat">
                <div class="font-medium">Aquest web forma part de <span class="font-semibold">Xarxa Català</span></div>
            </a>
            <div class="flex-1"></div>

            <div class="flex flex-row gap-3">
                <a href="https://t.me/onepiececatala"><img class="w-8 h-auto" src={TelegramIcon} /></a>
                <a href="https://twitter.com/CatalaOnePiece"><img class="w-8 h-auto" src={TwitterIcon} /></a>
                <a href="https://www.facebook.com/onepiececatala"><img class="w-8 h-auto" src={FacebookIcon} /></a>
                <a href="https://www.instagram.com/catonepiece/"><img class="w-8 h-auto" src={InstagramIcon} /></a>
            </div>
        </footer>
    )
}