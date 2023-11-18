import PlayIcon from "../assets/icons/play.svg"
import PauseIcon from "../assets/icons/pause.svg"
import FullscreenIcon from "../assets/icons/fullscreen.svg"
import FullscreenExitIcon from "../assets/icons/fullscreen_exit.svg"
import RewindIcon from "../assets/icons/fast_rewind.svg"
import ForwardIcon from "../assets/icons/fast_forward.svg"
import Volume0Icon from "../assets/icons/volume_0.svg"
import Volume1Icon from "../assets/icons/volume_1.svg"
import Volume2Icon from "../assets/icons/volume_2.svg"
import Volume3Icon from "../assets/icons/volume_3.svg"
import BackIcon from "../assets/icons/back.svg"
import { createMemo, createSignal, onMount, Show } from "solid-js"
import "./VideoPlayer.scss"

export function VideoPlayer(props: { title: string, url: string, goBack: () => any }) {
    let videoWrapper: Element | undefined = undefined
    let video: HTMLVideoElement | undefined = undefined
    let hideUiTimer: NodeJS.Timer | undefined = undefined

    const hideUiTimeInMs = 3000
    const [showVideoControls, setShowVideoControls] = createSignal(false)
    const [isFullscreen, setIsFullScreen] = createSignal(false)
    const [play, setPlay] = createSignal(false)
    const [isWaiting, setIsWaiting] = createSignal(false)
    const playIcon = createMemo(() => {
        if (play()) {
            return PauseIcon
        } else {
            return PlayIcon
        }
    })
    const [progress, setProgress] = createSignal(0.0)
    const [volume, setVolume] = createSignal(1)
    const [isMuted, setIsMuted] = createSignal(false)
    const volumeIcon = createMemo(() => {
        if (isMuted()) {
            return Volume0Icon
        }

        if (volume() >= 0.50) {
            return Volume3Icon
        } else if (volume() >= 0.10) {
            return Volume2Icon
        } else {
            return Volume1Icon
        }
    })
    const volumeDisplayed = createMemo(() => {
        if (isMuted()) {
            return 0
        } else
            return volume()
    })
    const [videoDuration, setVideoDuration] = createSignal(0.0)
    const videoProgress = createMemo(() => {
        return (video?.duration || 0) * (progress() / 100)
    })


    function showUiControls() {
        setShowVideoControls(true)
        clearInterval(hideUiTimer)

        hideUiTimer = setInterval(() => {
            if (showVideoControls() && play()) {
                setShowVideoControls(false)
            }
        }, hideUiTimeInMs)
    }

    onMount(() => {
        document.addEventListener('webkitfullscreenchange', function (e: any) {
            setIsFullScreen(!isFullscreen())
        });

        document.addEventListener('mozfullscreenchange', function (e: any) {
            setIsFullScreen(!isFullscreen())
        });

        document.addEventListener('fullscreenchange', function (e: any) {
            setIsFullScreen(!isFullscreen())
        });

        document.body.onkeydown = keyDown
    })

    function onTimeUpdate() {
        if (video != null) {
            const playerProgress = ((video.currentTime / video.duration) * 100)
            setProgress(playerProgress)
        }
    }

    function changePlayPause() {
        if (video != null && showVideoControls()) {
            if (video != null) {
                if (isVideoPlaying(video)) {
                    video.pause()
                } else {
                    video.play()
                }
            }
        }
    }

    function onPlayPause(playVideo: boolean) {
        if (playVideo != play()) {
            setPlay(playVideo)
        }
    }

    function onWaiting(isWaiting: boolean) {
        setIsWaiting(isWaiting)
    }

    function isVideoPlaying(video: HTMLVideoElement): boolean {
        return (video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2)
    }

    function turnFullscreen() {
        if (!isFullscreen()) {
            if (videoWrapper != null) {
                if (videoWrapper.requestFullScreen) {
                    videoWrapper.requestFullScreen();
                } else if (videoWrapper.webkitRequestFullScreen) {
                    videoWrapper.webkitRequestFullScreen();
                } else if (videoWrapper.mozRequestFullScreen) {
                    videoWrapper.mozRequestFullScreen();
                }
            }
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            } else if (document.msCancelFullScreen) {
                document.msCancelFullScreen();
            }
        }
    }

    function onVolumeChange(event: Event) {
        const newVolume = (event.currentTarget as any).value

        if (video != null) {
            video.volume = newVolume
            video.muted = false
        }
    }

    function onSeek(event: Event) {
        const layerX: number = (event as any).layerX
        const width: number = (event.currentTarget as any).clientWidth
        const percentage = layerX / width

        if (video != null) {
            video.currentTime = video.duration * percentage
        }
    }

    function rewind() {
        if (video != null) {
            video.currentTime -= 10
        }
    }

    function forward() {
        if (video != null && video.duration) {
            video.currentTime += 10
        }
    }

    function keyDown(event: KeyboardEvent) {
        console.log(event)
        if (event.key == "ArrowRight") {
            forward()
        } else if (event.key == "ArrowLeft") {
            rewind()
        }
    }

    function formatSeconds(seconds: number) {
        var date = new Date(1970, 0, 1);
        date.setSeconds(seconds);

        if (date.getHours() == 0) {
            return date.toTimeString().replace(/.*(\d{2}:\d{2}).*/, "$1");
        } else {
            return date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
        }

    }

    function updateVolumeState(video: HTMLVideoElement): void {
        setVolume(video.volume)
        setIsMuted(video.muted)
    }

    return <>
        <div onMouseMove={showUiControls}
            onKeyDown={keyDown}
            onClick={changePlayPause}
            ondblclick={turnFullscreen}
            class="w-full h-full flex flex-col items-center justify-center" ref={videoWrapper}>
            <Show when={isWaiting()}>
                <svg class="absolute animate-spin -ml-1 mr-3 h-10 w-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </Show>
            <video ref={video} class={(showVideoControls() ? "cursor-pointer" : "cursor-none") + " h-full w-full"} autoplay
                onTimeUpdate={onTimeUpdate}
                onPlay={() => onPlayPause(true)}
                onPause={() => onPlayPause(false)}
                onWaiting={() => onWaiting(true)}
                onPlaying={() => onWaiting(false)}
                onVolumeChange={(e) => updateVolumeState(e.currentTarget)}
                onLoadedMetadata={() => setVideoDuration(video?.duration || 0)}
                onKeyDown={keyDown}>
                <source src={props.url} type="video/mp4" />
            </video>

            <Show
                when={showVideoControls()}>
                <div class="fixed flex flex-row items-start top-0 pt-6 pl-4 h-24 w-full z-10 bg-gradient-to-b from-[#000000c5]" onClick={(e) => e.stopImmediatePropagation()} onDblClick={(e) => e.stopImmediatePropagation()}>
                    <div class="flex flex-row items-center">
                        <button onClick={props.goBack}><img src={BackIcon} /></button>
                        <span class="ml-4 text-2xl">{props.title || "Carregant episodi..."}</span>
                    </div>
                </div>
                <div
                    class="absolute z-10 bottom-0 w-full flex flex-col py-2 px-4 bg-gradient-to-t from-[#000000c5]"
                    onClick={(e) => e.stopImmediatePropagation()}
                    onDblClick={(e) => e.stopImmediatePropagation()}
                    onKeyDown={keyDown}
                >
                    <div
                        class="w-full h-1 py-4 cursor-pointer relative flex items-center"
                        onClick={onSeek}
                        onDragEnd={onSeek}
                    >
                        <div class="bg-blue-100 w-full h-1">
                            <div class="h-full bg-blue-400" style={`width: ${progress()}%`}></div>
                        </div>
                        <div class="absolute bg-blue-600 rounded-full h-4 w-4" style={`left: ${progress()}%`}></div>
                    </div>
                    <div
                        class="flex flex-row w-full items-center justify-center"
                        onKeyDown={keyDown}
                    >
                        <PlayerButton icon={RewindIcon} onClick={rewind} />
                        <PlayerButton icon={playIcon()} onClick={changePlayPause} />
                        <PlayerButton icon={ForwardIcon} onClick={forward} />
                        <div
                            class="lg:flex flex-row items-center hidden lg:visible"
                            onKeyDown={(e) => e.stopImmediatePropagation()}
                        >
                            <PlayerButton icon={volumeIcon()} onClick={() => { video!.muted = !video!.muted }} />
                            <div class="w-28 flex items-center">
                                <input value={volumeDisplayed()} type="range" min="0" max="1" step="0.05" onInput={onVolumeChange} onClick={onVolumeChange} />
                            </div>
                        </div>
                        <div class="flex flex-grow"></div>
                        <div class="text-white font-semibold pr-4">{formatSeconds(videoProgress())} / {formatSeconds(videoDuration())}</div>
                        <button onClick={turnFullscreen}>
                            <Show
                                when={isFullscreen()}
                                fallback={<img src={FullscreenIcon} />}>
                                <img src={FullscreenExitIcon} />
                            </Show>
                        </button>
                    </div>
                </div>

            </Show>
        </div>
    </>
}

function PlayerButton(props: { icon: string, onClick: () => any }) {
    return <button class="h-10 w-10" onClick={props.onClick}>
        <img src={props.icon} />
    </button>
}
