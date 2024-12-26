import {KEY_BOTTOM_SCREEN} from '@/navigation/BottomTab';
import notifee, {EventType, Notification} from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigate} from './navigation';

const CHANNEL_ID_KEY = 'channelId';

export const displayNotification = async (title: string, body: string) => {
  await clearAllChannelsAndNotifications();

  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });
  await AsyncStorage.setItem(CHANNEL_ID_KEY, channelId);
  // Display a notification
  await notifee.displayNotification({
    title: title,
    body: body,
    android: {
      channelId,
      smallIcon: 'ic_launcher',
      sound: 'default',
      pressAction: {
        id: 'default',
      },
    },
    ios: {
      sound: 'default',
    },
  });

  await AsyncStorage.setItem('isSendNoti', 'true');
};

export const getChannelId = async () => {
  return await AsyncStorage.getItem(CHANNEL_ID_KEY);
};
export const clearAllChannelsAndNotifications = async () => {
  try {
    // Get a list of all existing channels
    const channels = await notifee.getChannels();

    // Delete all channels
    await Promise.all(
      channels.map(channel => notifee.deleteChannel(channel.id)),
    );

    // Clear all notifications
    await notifee.cancelAllNotifications();
  } catch (error) {
    console.error('Error clearing channels and notifications:', error);
  }
};
export const handleForegroundNotification = async () => {
  notifee.onForegroundEvent(async ({type, detail}) => {
    if (type === EventType.PRESS) {
      const {notification} = detail;
      if (notification) {
        handleNotificationAction(notification);
      }
    }
  });
  notifee.onBackgroundEvent(async ({type, detail}) => {
    if (type === EventType.PRESS) {
      const {notification} = detail;
      if (notification) {
        handleNotificationAction(notification);
      }
    }
  });
};
const handleNotificationAction = async (notification: Notification) => {
  const channelId = await getChannelId();
  if (channelId) {
    try {
      await notifee.cancelNotification(notification.id as string);
      await notifee.deleteChannel(channelId);
      // await notifee.cancelAllNotifications();
    } catch (error) {
      console.error('Error removing notification:', error);
    }
  }
  navigate(KEY_BOTTOM_SCREEN.ENERGY);
};
