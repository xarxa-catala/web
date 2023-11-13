import axios from "axios";
import { createSignal, For, onMount } from "solid-js"
import { useNavigate } from "solid-start";
import { Season } from "~/models/Season";
import s1 from "~/assets/s1.webp"
import { showId } from "~/config"
import { SeasonCover } from "~/components/SeasonCover";

const STORAGE_KEY_SHOW = "show"


export default function Show() {
    const [seasons, setSeasons] = createSignal<Season[]>([])
    const navigator = useNavigate()
    onMount(() => {
        const sendDate = (new Date()).getTime();
        localStorage.clear()

        // TODO this cache should be refreshed
        const showData = localStorage.getItem(STORAGE_KEY_SHOW)

        if (showData != null) {
            setSeasons(JSON.parse(showData))
        } else {
            axios
                .get(
                    `https://gestio.multimedia.xarxacatala.cat/api/v1/shows/${showId}/playlists/`
                )
                .then((response) => {
                    const playlists: Season[] = response.data;
                    const sortedPlaylists = playlists.sort((a, b) => a.nom.localeCompare(b.nom));
                    setSeasons(sortedPlaylists);
                    const receiveDate = (new Date()).getTime();
                    const responseTimeMs = receiveDate - sendDate;

                    localStorage.setItem(STORAGE_KEY_SHOW, JSON.stringify(sortedPlaylists))

                    console.log("Response time in miliseconds: " + responseTimeMs);
                });
        }
    })


    return <div class="flex flex-row justify-center w-full mt-4">
        <div class="flex flex-row flex-wrap w-2/4">
            <For each={seasons()}>{(season, i) =>
                <div class="lg:basis-1/4 md:basis-1/3 text-center sm:basis-full p-2" onClick={() => navigator("/season/" + season.id)}>
                    <SeasonCover name={season.nom} imageUrl={`/images/seasons/${season.id}.webp`} />
                </div>
            }</For>
        </div>
    </div>

}
