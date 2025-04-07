import { useEffect, useState } from "react";
import Tabs from "../components/unit/user-gift/Tabs";
import { fetchSentGifts, SentGift } from "../services/userSentGiftService";
import {
    fetchReceivedGifts,
    ReceivedGift,
} from "../services/userRecivedGiftService";
import ReceivedGiftTab from "./ReceivedGiftTab";
import SentGiftTab from "./SentGiftTab";

const UserGift = () => {
    const [sentGifts, setSentGifts] = useState<SentGift[]>([]);
    const [recivedGifts, setRecivedGifts] = useState<ReceivedGift[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadGifts = async () => {
            setLoading(true);
            const [sent, received] = await Promise.all([
                fetchSentGifts(),
                fetchReceivedGifts(),
            ]);
            setSentGifts(sent);
            setRecivedGifts(received);
            setLoading(false);
        };

        loadGifts();
    }, []);

    return (
        <div className="relative min-h-screen pb-[80px]">
            <Tabs tabs={["받은 선물함", "보낸 선물함"]}>
                <ReceivedGiftTab
                    loading={loading}
                    recivedGifts={recivedGifts}
                />
                <SentGiftTab loading={loading} sentGifts={sentGifts} />
            </Tabs>
        </div>
    );
};

export default UserGift;
