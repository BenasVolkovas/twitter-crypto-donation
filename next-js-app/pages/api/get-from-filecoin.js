import {Web3Storage, File} from "web3.storage";

export default async (req, res) => {
    if (req.method === "PUT") {
        let data = await req.body;
        if (!data) {
            res.status(400).json({message: "Invalid request body"});
        } else {
            const client = new Web3Storage({token: process.env.WEB3STORAGE_TOKEN});
            const response = await client.get(data);
            if (!response.ok) {
                throw new Error(`failed to get ${data}`);
            }
            const file = (await response.files())[0];
            const fileData = await file.text();

            res.status(200).json(fileData);
        }
    } else {
        res.status(405).json({error: "Method Not Allowed"});
    }
};
