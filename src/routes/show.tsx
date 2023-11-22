import { createMemo, createResource, createSignal, For, onMount } from "solid-js"
import { useNavigate, useSearchParams } from "solid-start";
import { Season } from "~/models/Season";
import { showId } from "~/config"
import { SeasonCover } from "~/components/SeasonCover";
import { getShowDetail } from "~/service";
import { ShowCover } from "~/components/ShowCover";
import { XcShow } from "~/models/Show";

export default function Show() {
    const navigator = useNavigate()
    const [searchParams] = useSearchParams<{ id: string }>()
    const showDefault: XcShow = { nom: "", description: "", playlists: [], id: 0, cover: "" }
    const [showDetail] = createResource(() => searchParams.id || showId, getShow, { deferStream: true, initialValue: showDefault })
    const episodes = createMemo(() => showDetail().playlists.sort((a, b) => a.nom.localeCompare(b.nom)))

    async function getShow(): Promise<XcShow> {
        const searchShowId = Number(searchParams.id || showId)

        return await getShowDetail(searchShowId) || showDefault
    }

    return <div class="flex flex-col items-center w-full">
        <div class="flex flex-row mx-4 lg:w-3/5 gap-4 mt-8 flex-wrap justify-center">
            <div
                class="w-80 h-[480px]">
                <ShowCover
                    imageUrl={showDetail().cover} />
            </div>

            <div class="flex-1 flex flex-col">
                <p class="text-5xl">{showDetail().nom}</p>

                <p class="my-2">
                    {showDetail().description}
                </p>

                <div class="flex flex-row justify-center flex-wrap mt-4 lg:justify-start">
                    <For each={episodes()}>{(season, i) =>
                        <div class="p-2" onClick={() => navigator("/season/" + season.id)}>
                            <SeasonCover name={season.nom} imageUrl={season.cover} />
                        </div>
                    }</For>
                </div>
            </div>
        </div>
    </div>
}
