import { createResource, createSignal, For, onMount } from "solid-js"
import { useNavigate, useSearchParams } from "solid-start";
import { Season } from "~/models/Season";
import { showId } from "~/config"
import { SeasonCover } from "~/components/SeasonCover";
import { getSeasons } from "~/service";
import { ShowCover } from "~/components/ShowCover";

export default function Show() {
    const navigator = useNavigate()
    const [searchParams] = useSearchParams<{ id: string }>()
    const [seasons] = createResource(() => searchParams.id || showId, getShowSeasons, { deferStream: true })

    async function getShowSeasons(): Promise<Season[]> {
        const searchShowId = Number(searchParams.id || showId)

        return await getSeasons(searchShowId)
    }

    return <div class="flex flex-col items-center w-full">
        <div class="flex flex-row mx-4 lg:w-3/5 gap-4 mt-8 flex-wrap justify-center">
            <div
                class="w-80 h-[480px]">
                <ShowCover
                    imageUrl="" />
            </div>

            <div class="flex-1 flex flex-col">
                <p class="text-5xl">Doctor Who</p>

                <p class="my-2">
                    Doctor Who és una sèrie de televisió de ciència-ficció britànica produïda per la BBC. Fou emesa per primera vegada el 1963. Ha guanyat diversos guardons.
                    <br />
                    <br />
                    La sèrie descriu les aventures d'un viatger del temps alienígena conegut com «el doctor», que viatja amb una nau espacial i temporal, la TARDIS, que per fora s'assembla una cabina de policia. Els senyors del temps poden regenerar-se el cos quan s'apropen de la mort, la qual cosa fa que en canviï l'aspecte. Amb els seus companys, explora el temps i l'espai, resol problemes i arregla injustícies.
                </p>

                <div class="flex flex-row justify-center flex-wrap mt-4 lg:justify-start">
                    <For each={seasons()}>{(season, i) =>
                        <div class="p-2" onClick={() => navigator("/season/" + season.id)}>
                            <SeasonCover name={season.nom} imageUrl={`/images/seasons/${season.id}.webp`} />
                        </div>
                    }</For>
                </div>
            </div>
        </div>
    </div>
}
