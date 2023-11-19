import axios from "axios";
import { Season } from "./models/Season";
import { XcShow } from "./models/Show";

export async function getShowDetail(id: number): Promise<XcShow | undefined> {
    try {
        const response = await axios.get(`https://gestio.multimedia.xarxacatala.cat/api/v2/shows/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
        return undefined
    }
}

export async function getSeasonDetail(id: number): Promise<Season | undefined> {
    try {
        const response = await axios.get(`https://gestio.multimedia.xarxacatala.cat/api/v2/playlists/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
        return undefined
    }
}