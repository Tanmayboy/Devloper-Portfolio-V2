
export type DiscordUser = {
    id: string;
    created_at: string;
    username: string;
    avatar: {
        id: string;
        link: string;
        is_animated: boolean;
    };
    avatar_decoration: {
        asset: string;
        sku_id: string;
        expires_at: number;
    } | null;
    badges: string[];
    accent_color: number;
    global_name: string;
    banner: {
        id: string | null;
        link: string | null;
        is_animated: boolean;
        color: string;
    };
    raw: any;
};
