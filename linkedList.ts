// Implement a LinkedList class implementation that conforms to the following interface:

export type ListNode<T> = {
  data: T;
  next: ListNode<T> | null;
};

export interface LinkedListInterface<T> {
  head: ListNode<T> | null;
  tail: ListNode<T> | null;

  addAtEnd(t: T): T;
  removeFromEnd(): T | null;

  addAtHead(t: T): T;
  removeFromHead(): T | null;

  searchFor(t: T): T | null;
  length(): number;
}

/**
 * Generic singly linked list implementation.
 */
export class LinkedList<T> implements LinkedListInterface<T> {
  public head: ListNode<T> | null = null;
  public tail: ListNode<T> | null = null;

  /**
   * Adds a value at the end of the list.
   * @param t - Value to insert.
   * @returns The inserted value.
   */
  addAtEnd(t: T): T {
    const newNode: ListNode<T> = { data: t, next: null };

    if (!this.head) {
      this.head = this.tail = newNode;
      return t;
    }

    this.tail!.next = newNode;
    this.tail = newNode;

    return t;
  }

  /**
   * Removes the last element from the list.
   * @returns The removed value or null if the list is empty.
   */
  removeFromEnd(): T | null {
    if (!this.head) return null;

    if (this.head === this.tail) {
      const value = this.head.data;
      this.head = this.tail = null;
      return value;
    }

    let current = this.head;

    while (current.next !== this.tail) {
      current = current.next!;
    }

    const value = this.tail!.data;
    current.next = null;
    this.tail = current;

    return value;
  }

  /**
   * Adds a value at the beginning of the list.
   * @param t - Value to insert.
   * @returns The inserted value.
   */
  addAtHead(t: T): T {
    const newNode: ListNode<T> = { data: t, next: this.head };
    this.head = newNode;

    if (!this.tail) {
      this.tail = newNode;
    }

    return t;
  }

  /**
   * Removes the first element from the list.
   * @returns The removed value or null if the list is empty.
   */
  removeFromHead(): T | null {
    if (!this.head) return null;

    const value = this.head.data;
    this.head = this.head.next;

    if (!this.head) {
      this.tail = null;
    }

    return value;
  }

  /**
   * Searches for a value in the list.
   * @param t - Value to search for.
   * @returns The value if found, otherwise null.
   */
  searchFor(t: T): T | null {
    let current = this.head;

    while (current) {
      if (current.data === t) return current.data;
      current = current.next;
    }

    return null;
  }

  /**
   * Returns the number of elements in the list.
   * @returns Total number of nodes.
   */
  length(): number {
    let count = 0;
    let current = this.head;

    while (current) {
      count++;
      current = current.next;
    }

    return count;
  }
}
