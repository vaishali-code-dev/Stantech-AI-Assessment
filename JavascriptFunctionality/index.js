const userData = [
  { userId: 1, activityType: "login", timestamp: "2024-06-14T10:00:00Z" },
  { userId: 2, activityType: "logout", timestamp: "2024-06-14T11:00:00Z" },
  { userId: 1, activityType: "view", timestamp: "2024-06-14T12:00:00Z" },
  { userId: 3, activityType: "login", timestamp: "2024-06-14T13:00:00Z" },
  { userId: 2, activityType: "login", timestamp: "2024-06-14T14:00:00Z" },
  { userId: 1, activityType: "logout", timestamp: "2024-06-14T15:00:00Z" },
];

// 1. Function to count the number of unique users
const countUniqueUsers = (data) => {
  const uniqueUsers = new Set(data.map((item) => item.userId));
  return uniqueUsers.size;
};

// 2. Function to find the most common activity type
const mostCommonActivityType = (data) => {
  const activityCounts = data.reduce((acc, item) => {
    acc[item.activityType] = (acc[item.activityType] || 0) + 1;
    return acc;
  }, {});

  let mostCommonActivity = null;
  let maxCount = 0;

  for (const [activityType, count] of Object.entries(activityCounts)) {
    if (count > maxCount) {
      mostCommonActivity = activityType;
      maxCount = count;
    }
  }

  return mostCommonActivity;
};

// 3. Function to generate a timeline of activities for each user, sorted by timestamp
const generateUserTimelines = (data) => {
  const userTimelines = {};

  data.forEach((item) => {
    if (!userTimelines[item.userId]) {
      userTimelines[item.userId] = [];
    }
    userTimelines[item.userId].push({
      activityType: item.activityType,
      timestamp: item.timestamp,
    });
  });

  for (const userId in userTimelines) {
    userTimelines[userId].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  }

  return userTimelines;
};

console.log("Number of unique users:", countUniqueUsers(userData));
console.log("Most common activity type:", mostCommonActivityType(userData));
console.log("User timelines:", generateUserTimelines(userData));
