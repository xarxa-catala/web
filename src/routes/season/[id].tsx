import axios from "axios";
import { createEffect, createResource, createSignal, For, onMount, Show } from "solid-js"
import { useNavigate, useParams, useSearchParams } from "solid-start"
import { Episode } from "~/models/Episode";
import { EpisodeCover } from "~/components/EpisodeCover";
import { showId } from "~/config";
import { Season } from "~/models/Season";
import { VideoPlayer } from "~/components/VideoPlayer";
import { setFullScreen } from "~/root"
import { getEpisodes, getSeasons } from "~/service";
import { SeasonCover } from "~/components/SeasonCover";
import { ShowCover } from "~/components/ShowCover";

const defaultSeason: Season = { id: 0, nom: "test", episodes: [] }

export default function SeasonPage() {
    const params = useParams<{ id: string }>()
    const [searchParams, setSearchParams] = useSearchParams<{ episodeId: string }>();

    const [episodes] = createResource<Episode[]>(getSeasonEpisodes, { initialValue: [] })
    const [season] = createResource<Season>(getSeason, { initialValue: defaultSeason })

    const playingEpisode = () => {
        if (episodes() != undefined && searchParams.episodeId != undefined) {
            return episodes().find((episode) => episode.id === Number(searchParams.episodeId))
        }

        return undefined
    }

    createEffect(() => setFullScreen(playingEpisode() != undefined))

    async function getSeason(): Promise<Season> {
        const seasonId = params.id
        const seasons = await getSeasons(showId)

        const season = seasons.find((season) => season.id === Number(seasonId))

        return season || defaultSeason
    }

    async function getSeasonEpisodes(): Promise<Episode[]> {
        return getEpisodes(Number(params.id))
    }


    return <div class="mx-4 lg:mx-0">
        <div class="flex flex-row flex-wrap justify-center mt-8 gap-8 mb-8 lg:mb-0">
            <div class="rounded-lg w-80 h-[480px]">
                <ShowCover imageUrl={`/images/seasons/${season().id}.webp`} />
            </div>
            <div class="flex flex-col items-start">
                <p class="text-3xl text-white">{season().nom}</p>
                <p class="text-white lg:w-[800px] my-3">
                    Ara que el Doctor i la Clara han establert una dinàmica com una associació d'iguals, gaudeixen de la diversió i l'emoció que tot l'espai i el temps tenen per oferir. Enredats amb fantasmes, víkings i l'últim mal dels Daleks, s'embarquen en les seves aventures més grans fins ara. La Missy ha tornat per turmentar el Doctor una vegada més, els Zygons inspiren por a mesura que canvien de forma a clons humans, i una nova arribada es mou de manera còsmica.
                </p>
                <div class="flex flex-row justify-center w-full">
                    <div class="flex flex-col mt-2 w-full">
                        <For each={episodes()}>{(episode, i) =>
                            <div class="w-full" onClick={() => setSearchParams({ episodeId: episode.id })}>
                                <EpisodeCover name={episode.nom} index={i() + 1} />
                            </div>
                        }</For>
                    </div>
                </div>
            </div>
        </div>

        <Show when={playingEpisode()}>
            {episode =>
                <div class="w-full h-full fixed top-0 left-0 bg-black">
                    <VideoPlayer url={episode().url} title={episode().nom} goBack={() => setSearchParams({ episodeId: undefined }, { replace: true })} />
                </div>
            }
        </Show>
    </div>
}
