import React from 'react'
import { notification as antNotification } from 'antd'

export enum NotificationIconType {
  success = 'success',
  info = 'info',
  error = 'error',
  warning = 'warning',
}

export interface INotificationInstance {
  success(message: string, type?: NotificationIconType): void
  error(message: string, type?: NotificationIconType): void
  info(message: string, type?: NotificationIconType): void
  warning(message: string, type?: NotificationIconType): void
  open(message: string, type?: NotificationIconType): void
}

const visibleNotifications = new Set<string>()

const getNotificationKey = (
  type: NotificationIconType,
  message: React.ReactNode,
): string => {
  const messageStr =
    typeof message === 'string' ? message : JSON.stringify(message)
  return `${type}-${messageStr}`
}

const openNotification = (
  type: NotificationIconType,
  message: React.ReactNode,
) => {
  const key = getNotificationKey(type, message)

  if (visibleNotifications.has(key)) {
    return
  }

  visibleNotifications.add(key)

  antNotification.open({
    key,
    type,
    message,
    className: 'notification',
    onClose: () => {
      visibleNotifications.delete(key)
    },
  })
}

export const Notification: INotificationInstance = {
  error: openNotification.bind(null, NotificationIconType.error),
  info: openNotification.bind(null, NotificationIconType.info),
  success: openNotification.bind(null, NotificationIconType.success),
  warning: openNotification.bind(null, NotificationIconType.warning),
  open: openNotification.bind(null, NotificationIconType.info),
}
