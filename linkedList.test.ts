import { describe, it, expect } from "vitest";
import { LinkedList } from "./linkedList.js";

describe("LinkedList", () => {
  it("should start with null head and tail", () => {
    const list = new LinkedList<number>();
    expect(list.head).toBeNull();
    expect(list.tail).toBeNull();
    expect(list.length()).toBe(0);
  });

  it("should add elements at the end", () => {
    const list = new LinkedList<number>();

    list.addAtEnd(10);
    list.addAtEnd(20);

    expect(list.head?.data).toBe(10);
    expect(list.tail?.data).toBe(20);
    expect(list.length()).toBe(2);
  });

  it("should remove element from the end", () => {
    const list = new LinkedList<number>();

    list.addAtEnd(10);
    list.addAtEnd(20);

    const removed = list.removeFromEnd();

    expect(removed).toBe(20);
    expect(list.tail?.data).toBe(10);
    expect(list.length()).toBe(1);
  });

  it("should add elements at the head", () => {
    const list = new LinkedList<number>();

    list.addAtHead(10);
    list.addAtHead(20);

    expect(list.head?.data).toBe(20);
    expect(list.tail?.data).toBe(10);
    expect(list.length()).toBe(2);
  });

  it("should remove element from the head", () => {
    const list = new LinkedList<number>();

    list.addAtEnd(10);
    list.addAtEnd(20);

    const removed = list.removeFromHead();

    expect(removed).toBe(10);
    expect(list.head?.data).toBe(20);
    expect(list.length()).toBe(1);
  });

  it("should search for an existing value", () => {
    const list = new LinkedList<number>();

    list.addAtEnd(5);
    list.addAtEnd(15);

    expect(list.searchFor(15)).toBe(15);
  });

  it("should return null when searching for non-existing value", () => {
    const list = new LinkedList<number>();

    list.addAtEnd(5);

    expect(list.searchFor(100)).toBeNull();
  });

  it("should return correct length", () => {
    const list = new LinkedList<number>();

    list.addAtEnd(1);
    list.addAtEnd(2);
    list.addAtEnd(3);

    expect(list.length()).toBe(3);
  });
});
