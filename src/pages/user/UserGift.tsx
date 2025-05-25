import { useEffect, useState } from "react";
import Tabs from "../../components/unit/user-gift/Tabs";
import { fetchSentGifts, SentGift } from "../../services/userSentGiftService";
import {
    fetchReceivedGifts,
    ReceivedGift,
} from "../../services/userReceivedGiftService";
import ReceivedGiftTab from "../../components/unit/user-gift/ReceivedGiftTab";
import SentGiftTab from "../../components/unit/user-gift/SentGiftTab";
import Layout from "../../components/layout/Layout";

const UserGift = () => {
    const [sentGifts, setSentGifts] = useState<SentGift[]>([]);
    const [receivedGifts, setReceivedGifts] = useState<ReceivedGift[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadGifts = async () => {
            setLoading(true);
            const [sent, received] = await Promise.all([
                fetchSentGifts(),
                fetchReceivedGifts(),
            ]);
            setSentGifts(sent);
            setReceivedGifts(received);
            setLoading(false);
        };

        loadGifts();
    }, []);

    return (
        <Layout>
            <div className="relative min-h-screen pb-[80px]">
                <Tabs tabs={["받은 선물함", "보낸 선물함"]}>
                    <ReceivedGiftTab
                        loading={loading}
                        receivedGifts={receivedGifts}
                    />
                    <SentGiftTab loading={loading} sentGifts={sentGifts} />
                </Tabs>
            </div>
        </Layout>
    );
};

export default UserGift;


