import { Plugins } from '@capacitor/core'
import { newspaper } from 'ionicons/icons'
const { LocalNotifications } = Plugins

class Notifications {
  public async schedule(hour: number, minute: number, mensaje: string, tipo: number, title: string): Promise<void> {
    try {
      // Request/ check permissions
      if (!(await LocalNotifications.requestPermission()).granted) return

      // Clear old notifications in prep for refresh (OPTIONAL)
      const pending = await LocalNotifications.getPending()
      if (pending.notifications.length > 0)
        await LocalNotifications.cancel(pending)

      await LocalNotifications.schedule({
        notifications: [{
          title: title,
          body: mensaje,
          smallIcon: newspaper,
          id: tipo,
          schedule: {
            on: { // swap this out for at or every as needed
              hour,
              minute
            }
          }
        }]
      })
    } catch (error) {
      console.error(error)
    }
  }
}

export default new Notifications()
