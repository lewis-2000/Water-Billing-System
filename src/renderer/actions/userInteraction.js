const isLoggedIn = false;

export function loggedIn() {
  if (isLoggedIn) {
    return 1;
  } else {
    return 0;
  }
}
