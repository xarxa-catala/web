export interface ExternalPage {
    displayName: string,
    url: string,
}

export interface AdditionalShow {
    id: number,
    name: string,
}

export const showId = 1;
export const siteName: string = "Doctor Who Català"
export const mainShow: string = "Doctor Who Online"
export const additionalShows: AdditionalShow[] = [
    { id: 2, name: "Torchwood" },
    // { id: 3, name: "Class" },
    // { id: 5, name: "The Sarah Jane Adventures" },
]
export const externalPages: ExternalPage[] = [
    { displayName: "L'Illa punteria", url: "https://lillapunteria.carrd.co/" },
    { displayName: "Qui som", url: "https://xarxacatala.cat/" },
]
export const mainShowOnline: string = "/images/home/dw_online.webp"
export const telegramLink = "https://t.me/+P9WOZ_LD8NFpkcp5" // https://t.me/onepiececatala
export const twitterLink = "https://twitter.com/dwcatala"
export const appLink = "https://t.me/c/1070960231/30725" // "https://t.me/onepiececatala/101821"
export const instagramLink: string | undefined = undefined // https://www.instagram.com/catonepiece/