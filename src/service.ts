import axios from "axios";
import { Season } from "./models/Season";
import { Episode } from "./models/Episode";


export async function getSeasons(showId: number): Promise<Season[]> {
    try {
        const response = await axios.get(
            `https://gestio.multimedia.xarxacatala.cat/api/v1/shows/${showId}/playlists/`
        )        

        const playlists: Season[] = response.data;
        const sortedPlaylists = playlists.sort((a, b) => a.nom.localeCompare(b.nom));

        return sortedPlaylists
    } catch (error) {
        console.log(error)
        return []
    }
}

export async function getEpisodes(id: number): Promise<Episode[]> {
    try {
        const response = await axios.get(`https://gestio.multimedia.xarxacatala.cat/api/v1/shows/0/playlists/${id}/videos/`)
        return response.data
    } catch (error) {
        console.log(error)
        return []
    }
}