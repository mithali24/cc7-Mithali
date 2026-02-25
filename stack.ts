// Implement a Stack class implementation that conforms to the following interface:

import { LinkedList } from "./linkedList.js";

/**
 * Stack interface using LinkedList as underlying storage.
 */
export interface Stack<T> {
  readonly __items: LinkedList<T>;
  push(item: T): T;
  pop(): T;
  top(): T | null;
}

/**
 * Stack implementation using LinkedList.
 */
export class StackImpl<T> implements Stack<T> {
  public readonly __items: LinkedList<T>;

  constructor() {
    this.__items = new LinkedList<T>();
  }

  push(item: T): T {
    return this.__items.addAtHead(item);
  }

  pop(): T {
    const value = this.__items.removeFromHead();
    if (value === null) {
      throw new Error("Stack is empty");
    }
    return value;
  }

  top(): T | null {
    return this.__items.head?.data ?? null;
  }
}
