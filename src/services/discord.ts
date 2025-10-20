
'use server';

import type { DiscordUser } from "@/lib/types";

export async function getDiscordUser(): Promise<DiscordUser | null> {
    const userId = process.env.DISCORD_USER_ID;
    if (!userId) {
        // This is not an error, just a missing configuration.
        return null;
    }

    try {
        const response = await fetch(`https://discordlookup.mesalytic.moe/v1/user/${userId}`);
        if (!response.ok) {
            // Silently fail if the user is not found or if there's an API error.
            return null;
        }
        const user: DiscordUser = await response.json();
        return user;
    } catch (error) {
        // This can happen due to network issues, DNS failures, or firewalls.
        // Fail silently to avoid crashing the app or logging unnecessary warnings.
        return null;
    }
}
