import { Episode } from "./Episode";

export interface Season {
    id: number,
    videos: Episode[],
    nom: string,
    description: string,
    cover: string | undefined,
}