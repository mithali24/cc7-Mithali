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
 * Fetches a list of users from the JSONPlaceholder API and introduces an optional artificial delay.
 *
 * @param {number} [delayMs=2000] - The number of milliseconds to wait before resolving the result.
 * @returns {Promise<User[]>} A promise that resolves to an array of User objects after the delay.
 *
 */
export async function getUsers(delayMs = 2000): Promise<User[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users: User[] = await response.json();

  await new Promise((resolve) => setTimeout(resolve, delayMs));

  return users;
}
