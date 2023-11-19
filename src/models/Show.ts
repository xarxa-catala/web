import { Season } from "./Season";

export interface XcShow {
    id: number,
    playlists: Season[],
    nom: string,
    description: string,
    cover: string | undefined,
}