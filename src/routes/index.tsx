import Logo from "~/assets/dw_logo.svg"
import AndroidLogo from "../assets/android-logo.webp"
import TelegramLogo from "../assets/telegram_logo.webp"
import XarxaCatalaLogo from "../assets/xc-logo.webp"
import ImageCard from "~/components/ImageCard"
import { siteName, mainShow, mainShowOnline, appLink, telegramLink } from "~/config"

export default function Home() {
  return <>
    <div class="flex flex-col items-center">
      <img class="mt-4 w-80 h-80 mb-2" src={Logo} />
      <h4 class="mb-8 mt-4 text-2xl font-semibold text-white">Benvinguts a {siteName}</h4>

      <div class="flex flex-row justify-center gap-4 flex-wrap">
        <ImageCard
          imgUrl={mainShowOnline}
          title={mainShow}
          linkUrl="show"
          description="Clica aquí per veure online tots els episodis que hi ha doblats al català i més!"
        />

        <ImageCard
          imgUrl={AndroidLogo}
          title="Aplicació Android"
          linkUrl={appLink} 
          description="Descarrega't l'app de Xarxa Català i visualitza el contingut de forma nativa al teu dispositiu Android."
        />

        <ImageCard
          imgUrl={TelegramLogo}
          title="Grup de Telegram"
          linkUrl={telegramLink}
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
