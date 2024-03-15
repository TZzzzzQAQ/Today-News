import {useEffect, useState} from "react";
import {getChannelAPI} from "@/apis/article";

function useChannel() {
    const [channelList, setChannelList] = useState([]);
    useEffect(() => {
        (async () => {
            const res = await getChannelAPI();
            setChannelList(res.data.channels)
        })()
    }, []);
    return {channelList};
}

export {useChannel}