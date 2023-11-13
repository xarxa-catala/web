import axios from "axios";
import { createEffect, createSignal, For, onMount, Show } from "solid-js"
import { useNavigate, useParams, useSearchParams } from "solid-start"
import { Episode } from "~/models/Episode";
import { EpisodeCover } from "~/components/EpisodeCover";
import { showId } from "~/config";
import { Season } from "~/models/Season";
import { VideoPlayer } from "~/components/VideoPlayer";
import { setFullScreen } from "~/root"

const STORAGE_KEY_SEASON = "season/"

export default function SeasonPage() {
    const params = useParams<{ id: string }>()
    const [searchParams, setSearchParams] = useSearchParams<{ episodeId: string }>();

    const defaultSeason: Season = { id: 0, nom: "", episodes: [] }

    const [episodes, setEpisodes] = createSignal<Episode[]>([])
    const [season, setSeason] = createSignal<Season>(defaultSeason)
    const navigator = useNavigate()

    const playingEpisode = () => {
        if (episodes() != undefined && searchParams.episodeId != undefined) {
            return episodes().find((episode) => episode.id === Number(searchParams.episodeId))
        }

        return undefined
    }

    createEffect(() => setFullScreen(playingEpisode() != undefined))



    onMount(() => {
        const seasonsData = localStorage.getItem(STORAGE_KEY_SEASON + params.id)
        if (seasonsData != null) {
            setEpisodes(JSON.parse(seasonsData))
        } else {
            axios
                .get(
                    `https://gestio.multimedia.xarxacatala.cat/api/v1/shows/0/playlists/${params.id}/videos/`
                )
                .then((response) => {
                    console.log("After");
                    console.log(response.data)
                    setEpisodes(response.data)
                    localStorage.setItem(STORAGE_KEY_SEASON + params.id, JSON.stringify(response.data))
                });
        }


        console.log("Getting playlists")
        axios
            .get(
                `https://gestio.multimedia.xarxacatala.cat/api/v1/shows/${showId}/playlists/`
            )
            .then((response) => {
                const seasons: Season[] = response.data;
                const season = seasons.find((playlist) => playlist.id === Number(params.id))
                setSeason(season || defaultSeason)
            });
    })

    return <div>
        <div class="flex flex-row flex-wrap justify-center mt-8 gap-8">
            <img class="rounded-lg w-80 h-full" src={`/images/seasons/${season().id}.webp`} />

            <div class="flex flex-col items-start mx-4">
                <p class="text-3xl text-white">{season().nom}</p>
                <p class="text-white lg:w-[800px] my-3">
                Ara que el Doctor i la Clara han establert una dinàmica com una associació d'iguals, gaudeixen de la diversió i l'emoció que tot l'espai i el temps tenen per oferir. Enredats amb fantasmes, víkings i l'últim mal dels Daleks, s'embarquen en les seves aventures més grans fins ara. La Missy ha tornat per turmentar el Doctor una vegada més, els Zygons inspiren por a mesura que canvien de forma a clons humans, i una nova arribada es mou de manera còsmica.
                </p>
                <div class="flex flex-row justify-center">
                    <div class="flex flex-col mt-2">
                        <For each={episodes()}>{(episode, i) =>
                            <div class="" onClick={() => setSearchParams({ episodeId: episode.id })}>
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
