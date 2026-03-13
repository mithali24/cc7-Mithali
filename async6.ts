/**
 * Represents a user object returned by the API.
 */
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

/**
 * Fetches users from the API and adds an optional delay.
 *
 * @param delayMs time in milliseconds to delay (default 2000ms)
 * @returns Promise resolving to an array of users
 */
export async function getUsers(delayMs = 2000): Promise<User[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users: User[] = await response.json();

  await new Promise((resolve) => setTimeout(resolve, delayMs));

  return users;
}
