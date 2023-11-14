import { createResource, createSignal, For, onMount } from "solid-js"
import { useNavigate } from "solid-start";
import { Season } from "~/models/Season";
import { showId } from "~/config"
import { SeasonCover } from "~/components/SeasonCover";
import { getSeasons } from "~/service";

const STORAGE_KEY_SHOW = "show"


export default function Show() {
    const [seasons] = createResource<Season[]>(() => getSeasons(showId))
    const navigator = useNavigate()


    return <div class="flex flex-row flex-wrap w-full mt-4 justify-center">
            <For each={seasons()}>{(season, i) =>
                <div class="p-2" onClick={() => navigator("/season/" + season.id)}>
                    <SeasonCover name={season.nom} imageUrl={`/images/seasons/${season.id}.webp`} />
                </div>
            }</For>
        </div>

}
