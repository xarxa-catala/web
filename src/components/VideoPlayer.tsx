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
import { createEffect, createMemo, createSignal, onMount, Show } from "solid-js"
import "./VideoPlayer.scss"

export function VideoPlayer(props: { title: string, url: string, goBack: () => any }) {
    let videoWrapper: Element | undefined = undefined
    let video: HTMLVideoElement | undefined = undefined

    const [showVideoControls, setShowVideoControls] = createSignal(false)
    const [isFullscreen, setIsFullScreen] = createSignal(false)
    const [play, setPlay] = createSignal(false)
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

    let timer: NodeJS.Timer | undefined = undefined



    function showUiControls() {
        setShowVideoControls(true)
        clearInterval(timer)

        console.log("ShowUiControls")
        
        timer = setInterval(() => {
            if (showVideoControls()) {
                setShowVideoControls(false)
            }
        }, 4000)
    }



    onMount(() => {
        document.addEventListener('webkitfullscreenchange', function (e: any) {
            console.log("webkitfullscreenchange")
            setIsFullScreen(!isFullscreen())
        });

        document.addEventListener('mozfullscreenchange', function (e: any) {
            console.log("mozfullscreenchange")
            setIsFullScreen(!isFullscreen())
        });

        document.addEventListener('fullscreenchange', function (e: any) {
            setIsFullScreen(!isFullscreen())
        });
    })

    function onTimeUpdate(event: Event) {
        if (video != null) {
            const playerProgress = ((video.currentTime / video.duration) * 100)
            setProgress(playerProgress)
        }
    }

    function changePlayPause() {
        console.log(video);

        if (video != null && showVideoControls()) {
            console.log("Effect triggered")
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
            console.log("Setting new value! Is playing: " + playVideo)
            setPlay(playVideo)
        }
    }

    function isVideoPlaying(video: HTMLVideoElement): boolean {
        return !!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2)
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
        console.log("New volume: " + newVolume)

        if (video != null) {
            video.volume = newVolume
            video.muted = false
        }
    }

    function onSeek(event: Event) {
        console.log(event)
        console.log(event.currentTarget)
        console.log("Layer X is " + (event as any).layerX)
        const layerX: number = (event as any).layerX
        const width: number = (event.currentTarget as any).clientWidth
        console.log("Width is " + width)
        const percentage = layerX / width

        console.log("Percentage is " + percentage)

        if (video != null) {
            console.log("Video duration is " + video.duration)
            video.currentTime = video.duration * percentage
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
            onClick={changePlayPause}
            ondblclick={turnFullscreen}
            class="w-full h-full flex flex-col items-center" ref={videoWrapper}>

            <video ref={video} class={(showVideoControls() ? "cursor-pointer" : "cursor-none") + " h-full w-full"} autoplay
                onTimeUpdate={onTimeUpdate}
                onPlay={() => onPlayPause(true)}
                onPause={() => onPlayPause(false)}
                onVolumeChange={(e) => updateVolumeState(e.currentTarget)}
                onLoadedMetadata={() => setVideoDuration(video?.duration || 0)}>
                <source src={props.url} type="video/mp4" />
            </video>

            <Show
                when={showVideoControls()}>
                <div class="fixed flex flex-row items-start top-0 pt-6 pl-4 h-24 w-full z-10 bg-gradient-to-b from-[#000000c5]" onClick={(e) => e.stopImmediatePropagation()} onDblClick={(e) => e.stopImmediatePropagation()}>
                    <div class="flex flex-row items-center">
                        <button onClick={props.goBack}><img src={BackIcon} /></button>
                        <span class="text-white ml-4 text-2xl">{props.title || "Carregant episodi..."}</span>
                    </div>
                </div>
                <div class="absolute z-10 bottom-0 w-full flex flex-col py-2 px-4 bg-gradient-to-t from-[#000000c5]" onClick={(e) => e.stopImmediatePropagation()} onDblClick={(e) => e.stopImmediatePropagation()}>
                    <div class="w-full h-1 py-4 cursor-pointer relative flex items-center" onClick={onSeek} onDrag={(e) => console.log(e)}>
                        <div class="bg-blue-100 w-full h-1">
                            <div class="h-full bg-blue-400" style={`width: ${progress()}%`}></div>
                        </div>
                        <div class="absolute bg-blue-600 rounded-full h-4 w-4" style={`left: ${progress()}%`}></div>
                    </div>
                    <div class="flex flex-row w-full items-center justify-center">
                        <PlayerButton icon={RewindIcon} onClick={() => { }} />
                        <PlayerButton icon={playIcon()} onClick={changePlayPause} />
                        <PlayerButton icon={ForwardIcon} onClick={() => { }} />
                        <div class="flex flex-row items-center visible">
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

// EVENTS

// onMounted(() => {
//   // Hide player controls
//   videoWrapper!.addEventListener('mouseout', () => {
//     playerControlsVisibility(false);
//   });

//   // Pause/play video
//   playControl!.addEventListener('click', function (e: any) {
//     let $this: any = e.currentTarget;
//     if ($this!.classList.contains('paused')) {
//       video!.play();
//     } else {
//       video!.pause();
//     }
//     $this.classList.toggle('paused');
//   });

//   // Stop video
//   stopControl.addEventListener('click', () => {
//     video!.pause();
//     video!.currentTime = 0;
//     playControl!.classList.add('paused');
//   });

//   // Replay video 
//   replayControl!.addEventListener('click', () => {
//     video!.currentTime = 0;
//     playControl!.classList.remove('paused');
//     video!.play();
//   });

//   // Rewind video
//   rewindControl.addEventListener('click', () => {
//     video!.currentTime = video!.currentTime - 10;
//   });

//   // Forward video
//   forwardControl.addEventListener('click', () => {
//     video!.currentTime = video!.currentTime + 10;
//   });

//   // Mute/unmute video
//   volumeControl.addEventListener('click', (e: any): void => {
//     volumeControl.parentNode.classList.toggle('muted');
//     if (volumeControl.parentNode.classList.contains('muted')) {
//       volumeSlider.value = 0;
//       video!.volume = 0;
//     } else {
//       volumeSlider.value = 1;
//       video!.volume = 1;
//     }
//   });

//   // Volume slider
//   volumeSlider.addEventListener("input", () => {
//     if (volumeSlider.value > 0) {
//       volumeControl.parentNode.classList.remove('muted');
//     } else {
//       volumeControl.parentNode.classList.add('muted');
//     }
//     video!.volume = volumeSlider.value;
//   });

//   // Progressbar
//   video!.addEventListener('timeupdate', (e: any) => {
//     let progress = (100 / video!.duration) * video!.currentTime;
//     document.querySelector('.progress__current')!.setAttribute("style", `width:${progress}%`);
//   });



//   // Fullscreen mode 
//   fullscreenControl.addEventListener('click', () => {
//     let isFullscreen = videoWrapper!.classList.contains('fullscreen');
//     if (!isFullscreen) {
//       turnFullscreen(true);
//     } else {
//       turnFullscreen(false);
//     }
//   });
