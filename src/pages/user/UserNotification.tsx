import { useEffect, useState } from "react";
import { fetchPushNotifications, Notification } from "../../services/pushManageService";

import PushButton from "../../components/common/button/PushButton";
import Layout from "../../components/layout/Layout";

const UserNotification = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNotifications = async () => {
      const { success, data } = await fetchPushNotifications();
      console.log("로드된 알림:", success);

      if (success) {
        setNotifications(data);
      } else {
        setNotifications([]);
      }
      setLoading(false);
    };

    loadNotifications();
  }, []);

  useEffect(() => {
    console.log(notifications);
  }, [notifications]);

  const onReadNotification = (id: number) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.notification_id === id ? { ...notif, readed: true } : notif)),
    );
  };

  if (loading) {
    return <div className="text-center text-gray-500">🔄 로딩 중...</div>;
  }

  return (
    <Layout>
      <div className="mb-9"></div>
      <div className="flex flex-col px-3 gap-4">
        {notifications.length > 0 ? (
          notifications.map((notif) => (
            <PushButton
              key={notif.notification_id}
              notification={notif}
              onRead={onReadNotification}
            />
          ))
        ) : (
          <div className="text-center text-gray-500">알림이 없습니다.</div>
        )}
      </div>
    </Layout>
  );
};

export default UserNotification;
