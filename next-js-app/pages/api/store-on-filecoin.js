import {Web3Storage, File} from "web3.storage";

export default async (req, res) => {
    if (req.method === "POST") {
        let data = await req.body;

        if (!data) {
            res.status(400).json({message: "Invalid request body"});
        } else {
            const cid = await storeData(data);
            res.status(200).json({filecoinCid: cid});
        }
    } else {
        res.status(405).json({error: "Method Not Allowed"});
    }
};

const storeData = async (data) => {
    const client = new Web3Storage({token: process.env.WEB3STORAGE_TOKEN});
    const buffer = Buffer.from(JSON.stringify(data));
    const files = [new File([buffer], "user.json")];
    const cid = await client.put(files);

    return cid;
};
