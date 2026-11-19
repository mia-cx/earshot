<script lang="ts">
	/** Plays a lesson's narration, which reads the page's own words. Speed is remembered across lessons. */
	let { src }: { src: string } = $props();

	const SPEEDS = [1, 1.25, 1.5, 2, 0.75];
	const SPEED_KEY = 'earshot:speed';
	const SKIP_SECONDS = 15;

	let audio = $state<HTMLAudioElement>();
	let paused = $state(true);
	let time = $state(0);
	let duration = $state(0);
	let speed = $state(1);

	$effect(() => {
		try {
			const saved = Number(localStorage.getItem(SPEED_KEY));
			if (SPEEDS.includes(saved)) speed = saved;
		} catch {
			// Storage blocked: start at normal speed.
		}
	});

	const cycleSpeed = () => {
		speed = SPEEDS[(SPEEDS.indexOf(speed) + 1) % SPEEDS.length];
		try {
			localStorage.setItem(SPEED_KEY, String(speed));
		} catch {
			// Storage blocked: the speed lasts for this lesson.
		}
	};

	const skip = (seconds: number) => {
		time = Math.min(Math.max(time + seconds, 0), duration || 0);
	};

	const clock = (seconds: number) =>
		`${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
</script>

<div class="listen" role="group" aria-labelledby="listen-label">
	<p id="listen-label" class="label">Listen to this lesson: the same words as the page.</p>
	<audio bind:this={audio} {src} preload="metadata" bind:paused bind:currentTime={time} bind:duration bind:playbackRate={speed}
	></audio>
	<div class="controls">
		<button
			type="button"
			class="play"
			aria-label={paused ? 'Play' : 'Pause'}
			onclick={() => (paused ? audio?.play() : audio?.pause())}
		>
			<svg viewBox="0 0 24 24" aria-hidden="true">
				{#if paused}<path d="M8 5.5v13l11-6.5z" />{:else}<path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />{/if}
			</svg>
		</button>
		<button type="button" class="skip back" aria-label="Back {SKIP_SECONDS} seconds" onclick={() => skip(-SKIP_SECONDS)}>
			<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 1 0 2.4-5.7M4 3.5v3.3h3.3" /></svg>
			<span aria-hidden="true">{SKIP_SECONDS}</span>
		</button>
		<button type="button" class="skip forward" aria-label="Forward {SKIP_SECONDS} seconds" onclick={() => skip(SKIP_SECONDS)}>
			<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12a8 8 0 1 1-2.4-5.7M20 3.5v3.3h-3.3" /></svg>
			<span aria-hidden="true">{SKIP_SECONDS}</span>
		</button>
		<input
			type="range"
			min="0"
			max={duration || 0}
			step="1"
			bind:value={time}
			aria-label="Position"
			aria-valuetext="{clock(time)} of {clock(duration)}"
			style="--played: {duration ? (time / duration) * 100 : 0}%"
		/>
		<span class="time tabular-nums">{clock(paused && !time ? duration : time)}</span>
		<button type="button" class="speed tabular-nums" aria-label="Playback speed {speed} times" onclick={cycleSpeed}>
			{speed}×
		</button>
	</div>
</div>

<style>
	.listen {
		container-type: inline-size;
		max-width: 40rem;
		padding: 0.6rem 0.75rem 0.6rem 0.6rem;
		border-radius: 1.6rem;
		background: var(--accent-soft);
		border: 1px solid var(--accent-line);
	}

	.label {
		margin: 0 0 0.4rem 0.4rem;
		font-size: 0.9rem;
		font-weight: 650;
	}

	/*
	 * One row when there's room; on narrow screens the track and time drop to a second row.
	 * Icon buttons are sized in px so a larger text size grows the words, not the icons, and the
	 * first row still fits at 320px wide.
	 */
	.controls {
		display: grid;
		grid-template-columns: auto auto auto minmax(0, 1fr) auto auto;
		grid-template-areas: 'play back forward track time speed';
		align-items: center;
		gap: 8px;
		@container (width < 26rem) {
			grid-template-columns: auto auto auto minmax(0, 1fr) auto;
			grid-template-areas:
				'play back forward . speed'
				'track track track track time';
			row-gap: 0.75rem;
		}
	}

	.play {
		grid-area: play;
		display: grid;
		place-items: center;
		width: 44px;
		height: 44px;
		border-radius: 50%;
		background: var(--accent);
		color: var(--accent-ink);
		& svg {
			width: 20px;
			fill: currentColor;
		}
	}

	.skip {
		position: relative;
		display: grid;
		place-items: center;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		transition: background-color var(--duration-quick) var(--ease-out);
		&:hover {
			background: var(--paper);
		}
		&.back {
			grid-area: back;
		}
		&.forward {
			grid-area: forward;
		}
		& svg {
			position: absolute;
			inset: 4px;
			fill: none;
			stroke: currentColor;
			stroke-width: 1.8;
			stroke-linecap: round;
			stroke-linejoin: round;
		}
		& span {
			font-size: 10px;
			font-weight: 800;
			letter-spacing: 0;
			word-spacing: 0;
		}
	}

	input {
		grid-area: track;
		min-width: 0;
		height: 6px;
		appearance: none;
		border-radius: 3px;
		background: linear-gradient(to right, var(--accent) var(--played), var(--accent-line) var(--played));
		cursor: pointer;
		&::-webkit-slider-thumb {
			appearance: none;
			width: 16px;
			height: 16px;
			border-radius: 50%;
			background: var(--accent);
			border: 2px solid var(--paper);
		}
		&::-moz-range-thumb {
			width: 14px;
			height: 14px;
			border-radius: 50%;
			background: var(--accent);
			border: 2px solid var(--paper);
		}
	}

	.time {
		grid-area: time;
		font-size: 0.85rem;
		color: var(--muted);
		min-width: 2.6rem;
		text-align: right;
	}

	.speed {
		grid-area: speed;
		min-width: 3.4rem;
		padding: 0.25rem 0.5rem;
		border-radius: 999px;
		font-size: 0.85rem;
		font-weight: 800;
		border: 1.5px solid var(--accent-line);
		background: var(--paper);
		&:hover {
			border-color: var(--accent);
		}
	}
</style>
