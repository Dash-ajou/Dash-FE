import { useEffect, useRef, useState } from "react";
import { fetchPushNotifications, markPushAsRead, Notification } from "../../services/pushManageService";
import PushButton from "../../components/common/button/PushButton";
import Layout from "../../components/layout/Layout";

const PartnerNotification = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [slidId, setSlidId] = useState<number | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const load = async () => {
      const { success, data } = await fetchPushNotifications();
      if (success) setNotifications(data);
      setLoading(false);
    };
    load();
  }, []);

  useEffect(() => {
    const handleOutside = (event: MouseEvent | TouchEvent) => {
      if (
          wrapperRef.current &&
          event.target instanceof Node &&
          !wrapperRef.current.contains(event.target)
      ) {
        setSlidId(null);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, []);

  const onRead = async (id: number) => {
    const success = await markPushAsRead(id);
    if (success) {
      setNotifications((prev) =>
          prev.map((n) => (n.notification_id === id ? { ...n, readed: true } : n))
      );
      setSlidId(null); // 읽음 처리 후 닫기
    }
  };

  return (
      <Layout>
        <div className="mb-9" />
        <div ref={wrapperRef} className="flex flex-col px-3 gap-4">
          {loading ? (
              <div className="text-center text-gray-500">🔄 로딩 중...</div>
          ) : notifications.length > 0 ? (
              notifications.map((notif) => (
                  <PushButton
                      key={notif.notification_id}
                      notification={notif}
                      onRead={onRead}
                      slidId={slidId}
                      setSlidId={setSlidId}
                  />
              ))
          ) : (
              <div className="text-center text-gray-500">알림이 없습니다.</div>
          )}
        </div>
      </Layout>
  );
};

export default PartnerNotification;
