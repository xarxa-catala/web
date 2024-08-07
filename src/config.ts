import DwLogo from "~/assets/dw_logo.png"
import OpLogo from "~/assets/op_logo.png"

export interface ExternalPage {
    displayName: string,
    url: string | undefined,
    nestedPages: ExternalPage[],
}

export interface AdditionalShow {
    id: number,
    name: string,
}

const dwShow : Show = {
    siteName: "Doctor Who Català",
    mainShowId: 1,
    mainShowName: "Doctor Who Online",
    logo: DwLogo,
    additionalShows: [
        { id: 2, name: "Torchwood" },
        // { id: 3, name: "Class" },
        // { id: 5, name: "The Sarah Jane Adventures" },
    ],
    externalPages: [
        { displayName: "L'illa Punteria", url: "https://lillapunteria.carrd.co/", nestedPages: [] },
        { displayName: "Qui som", url: "https://xarxacatala.cat/", nestedPages: [] },
    ],
    mainShowCover: "/images/home/dw_online.webp",
    telegramLink: "https://t.me/+P9WOZ_LD8NFpkcp5",
    twitterLink: "https://twitter.com/dwcatala",
    instagramLink: undefined 
}

const opShow : Show = {
    siteName: "One Piece Català",
    mainShowId: 4,
    mainShowName: "One Piece Online",
    logo: OpLogo,
    additionalShows: [],
    externalPages: [
        { displayName: "L'illa Punteria", url: "https://lillapunteria.carrd.co/", nestedPages: [] },
        { 
            displayName: "Manga català", 
            url: undefined, 
            nestedPages: [
                { displayName: "Capítols [MEGA]", url: "https://mega.nz/folder/Od4X0YTB#hSQjtzlpz392MsXYE8AnIg", nestedPages: [] },
                { displayName: "Volums [MEGA]", url: "https://mega.nz/folder/HNYnALBJ#Rt-t-4n_5PAntz79kbpOnA", nestedPages: [] },
                { displayName: "Especials [MEGA]", url: "https://mega.nz/folder/mMB13RCC#oZIYj4xCzmhmxNLEz0hwsg", nestedPages: [] },
                { displayName: "TuMangaOnline", url: "https://lectormanga.com/library/manga/126/one-piece-catala", nestedPages: [] },
            ] 
        },
        { displayName: "Qui som", url: "https://xarxacatala.cat/", nestedPages: [] },
    ],
    mainShowCover: "/images/home/op_card.webp",
    telegramLink: "https://t.me/onepiececatala",
    twitterLink: "https://twitter.com/CatalaOnePiece",
    instagramLink: "https://www.instagram.com/catonepiece/"
}

export interface Show {
    siteName: string,
    mainShowId: number,
    mainShowName: string,
    logo: string,
    additionalShows: AdditionalShow[],
    externalPages: ExternalPage[],
    mainShowCover: string,
    telegramLink: string,
    twitterLink: string,
    instagramLink: string | undefined,
}

export const currentShow = dwShow
export const siteName = currentShow.siteName