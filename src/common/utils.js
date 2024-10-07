const youtubeURLRegex =
  /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|embed\/|v\/|.+\?v=)?([^&=%\?]{11})/;

export function extractYoutubeVideoId(url) {
  const match = url.match(youtubeURLRegex);
  return match ? match.pop() : null;
}

export function formatTimeDifference(sharedAt) {
  const now = new Date();
  const sharedDate = new Date(sharedAt);
  const diffInMs = now - sharedDate;
  const diffInMinutes = Math.floor(diffInMs / 60000);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays > 2) {
    return sharedDate.toLocaleDateString();
  } else if (diffInHours > 0) {
    return `${diffInHours} hours ago`;
  } else {
    return `${diffInMinutes} minutes ago`;
  }
}

export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isStrongPassword(password) {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

export function isValidYoutubeUrl(url) {
  const youtubeUrlRegex =
    /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|embed\/|v\/|.+\?v=)?([^&=%\?]{11})/;
  return youtubeUrlRegex.test(url);
}

export function checkTokenExpiry() {
  const tokenExpiryTime = localStorage.getItem("tokenExpiryTime");
  if (!tokenExpiryTime) {
    return true;
  }
  const currentTime = new Date().getTime();
  return currentTime > tokenExpiryTime;
}
