import {fetchUser} from "../../services/twitter";

export default async (req, res) => {
    if (req.method === "PUT") {
        let data = await req.body;

        if (!data) {
            res.status(400).json({message: "Invalid request body"});
        } else {
            const username = await fetchUser(data.twitterId);

            if (username) {
                res.status(200).json({username: username});
            } else {
                res.status(400).json({message: "Twitter id not found"});
            }
        }
    } else {
        res.status(405).json({error: "Method Not Allowed"});
    }
};
