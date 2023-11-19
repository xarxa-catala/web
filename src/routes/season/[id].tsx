import { createEffect, createMemo, createResource, For, Show } from "solid-js"
import { useParams, useSearchParams } from "solid-start"
import { Episode } from "~/models/Episode"
import { EpisodeCover } from "~/components/EpisodeCover"
import { showId } from "~/config"
import { Season } from "~/models/Season"
import { VideoPlayer } from "~/components/VideoPlayer"
import { setFullScreen } from "~/root"
import { getSeasonDetail } from "~/service"
import { ShowCover } from "~/components/ShowCover"

const defaultSeason: Season = { id: 0, nom: "", cover: undefined, description: "", videos: [] }

export default function SeasonPage() {
    const params = useParams<{ id: string }>()
    const [searchParams, setSearchParams] = useSearchParams<{ episodeId: string }>();
    const [season] = createResource(getSeasonEpisodes, { initialValue: defaultSeason })

    const playingEpisode = () => {
        if (season().videos != undefined && searchParams.episodeId != undefined) {
            return season().videos.find((video) => video.id === Number(searchParams.episodeId))
        }

        return undefined
    }

    createEffect(() => setFullScreen(playingEpisode() != undefined))

    async function getSeasonEpisodes(): Promise<Season> {
        return await getSeasonDetail(Number(params.id)) || defaultSeason
    }

    return <div class="mx-4 lg:mx-0">
        <div class="flex flex-row flex-wrap justify-center mt-8 gap-8 mb-8 lg:mb-0">
            <div class="rounded-lg w-80 h-[480px]">
                <ShowCover imageUrl={season().cover} />
            </div>
            <div class="flex flex-col items-start">
                <p class="text-3xl text-white">{season().nom}</p>
                <p class="text-white lg:w-[800px] my-3">
                    {season().description}
                </p>
                <div class="flex flex-row justify-center w-full">
                    <div class="flex flex-col mt-2 w-full">
                        <For each={season().videos}>{(episode, i) =>
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
