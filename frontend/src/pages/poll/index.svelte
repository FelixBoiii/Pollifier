<script>
    import { metatags } from "@roxi/routify";
    metatags.title = "poll";
    metatags.description = "Description coming soon...";

    let polls = null;

    import { onMount } from "svelte";
    onMount(async () => {
        const res = await fetch(`http://localhost:3000/polls`);
        polls = await res.json();
    });
</script>

<div>
    {#if polls != null}
        {#each polls as poll (poll.id)}
            <h2>{poll.name}</h2>
            {#each poll.options as option}
                <p style="width:{option.votes * 5}px;" class="votingBar">
                    {option.name}
                </p>
            {/each}
        {/each}
    {:else}
        <p>loading...</p>
    {/if}
</div>

<style>
    .votingBar {
        background-color: crimson;
    }
</style>
