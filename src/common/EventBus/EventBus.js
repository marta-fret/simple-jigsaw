const subscribers = {};

export class EventBus {
  static subscribe = (eventType, callback) => {
    if (!subscribers[eventType]) {
      subscribers[eventType] = [callback];
    } else if (subscribers[eventType].indexOf(callback) === -1) {
      subscribers[eventType].push(callback);
    }
  }

  static unsubscribe = (eventType, callback) => {
    if (!subscribers[eventType]) return;
    subscribers[eventType] = subscribers[eventType].filter(cb => cb !== callback);
  }

  static emit = (eventType, ...eventData) => {
    if (!subscribers[eventType]) return;
    subscribers[eventType].forEach(callback => {
      callback(...eventData);
    });
  }
}
