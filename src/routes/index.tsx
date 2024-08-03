import TelegramLogo from "../assets/telegram_logo.webp"
import XarxaCatalaLogo from "../assets/xc-logo.webp"
import ImageCard from "~/components/ImageCard"
import { currentShow } from "~/config"

export default function Home() {
  return <>
    <div class="flex flex-col items-center">
      <img class="mt-4 w-80 h-80 mb-2" src={currentShow.logo} />
      <h4 class="mb-8 mt-4 text-2xl font-semibold text-white">Benvinguts a {currentShow.siteName}</h4>

      <div class="flex flex-row justify-center gap-4 flex-wrap mx-3 md:mx-0">
        <ImageCard
          imgUrl={currentShow.mainShowCover}
          title={currentShow.mainShowName}
          linkUrl="show"
          description="Clica aquí per veure online tots els episodis que hi ha doblats al català i més!"
        />

        <ImageCard
          imgUrl={TelegramLogo}
          title="Grup de Telegram"
          linkUrl={currentShow.telegramLink}
          description="Si voleu parlar amb altres seguidors i amb els administradors del Projecte, uniu-vos al nostre grup de Telegram!"
        />

        <ImageCard
          imgUrl={XarxaCatalaLogo}
          title="Xarxa Catala"
          linkUrl="https://xarxacatala.cat"
          description="Clica per descobrir tots els nostres projectes i més informació sobre Xarxa Català."
        />
      </div>
    </div>
  </>
}
