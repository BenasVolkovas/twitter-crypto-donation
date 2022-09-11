import {TwitterApi} from "twitter-api-v2";

export const fetchUser = async (id) => {
    if (id) {
        const client = new TwitterApi(process.env.TWITTER_BEARER_TOKEN);
        const readOnlyClient = client.readOnly;
        const user = await readOnlyClient.v2.user(id);
        return user.data.username;
    } else {
    }
    return "";
};
