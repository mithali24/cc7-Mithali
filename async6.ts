/**
 * Represents a user object returned by the API.
 */
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  // Add other fields if needed
}

/**
 * Fetches a list of users from the API and introduces an optional artificial delay.
 *
 * @param {number} [delayMs=2000] - Optional delay in milliseconds before resolving the result.
 * @returns {Promise<User[]>} A promise that resolves to an array of User objects after the delay.
 */
export async function getUsers(delayMs = 2000): Promise<User[]> {
  // Fetch users from API
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users: User[] = await response.json();

  // Wait for the specified delay
  await new Promise((resolve) => setTimeout(resolve, delayMs));

  // Return the result
  return users;
}
