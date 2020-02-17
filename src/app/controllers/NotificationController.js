import User from '../models/User';
import Notifications from '../schemas/Notifications';

class NotificationController {
  async index(req, res) {
    const isProvider = await User.findOne({
      where: {
        id: req.userId,
        provider: true,
      }
    });

    if (!isProvider) {
      return res.status(401).json({ error: 'Only providers can load notifications' });
    }

    const notifications = await Notifications.find({
      user: req.userId
    }).sort({ createdAt: 'desc' }).limit(20);

    return res.json(notifications);
  }

  async update(req, res) {
    //const notification = await Notifications.findById(req.params.id)

    const notification = await Notifications.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true },
    );

    return res.json(notification);
  }
}

export default new NotificationController();
