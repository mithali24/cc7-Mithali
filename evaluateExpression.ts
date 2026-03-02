import { Stack } from "./stack.js";

/**
 * Evaluates a mathematical expression.
 * Supports +, -, *, / and parentheses.
 *
 * Returns number for valid expressions.
 * Returns undefined for invalid input.
 */
export function evaluateExpression(expression: string): number | undefined {
  if (!expression || typeof expression !== "string") return undefined;

  const values = new Stack<number>();
  const operators = new Stack<string>();

  const tokens = expression.split(" ").filter((token) => token.length > 0);

  const isNumber = (value: string) => !isNaN(Number(value));

  const applyOperator = () => {
    const operator = operators.pop();
    const right = values.pop();
    const left = values.pop();

    if (operator === undefined || right === undefined || left === undefined) {
      return undefined;
    }

    let result: number;

    switch (operator) {
      case "+":
        result = left + right;
        break;
      case "-":
        result = left - right;
        break;
      case "*":
        result = left * right;
        break;
      case "/":
        if (right === 0) return undefined;
        result = left / right;
        break;
      default:
        return undefined;
    }

    values.push(result);
  };

  const precedence = (op: string): number => {
    if (op === "+" || op === "-") return 1;
    if (op === "*" || op === "/") return 2;
    return 0;
  };

  for (const token of tokens) {
    if (isNumber(token)) {
      values.push(Number(token));
    } else if (["+", "-", "*", "/"].includes(token)) {
      while (
        operators.top() !== null &&
        operators.top() !== "(" &&
        precedence(operators.top()!) >= precedence(token)
      ) {
        if (applyOperator() === undefined) return undefined;
      }
      operators.push(token);
    } else if (token === "(") {
      operators.push(token);
    } else if (token === ")") {
      while (operators.top() !== null && operators.top() !== "(") {
        if (applyOperator() === undefined) return undefined;
      }

      if (operators.top() === "(") {
        operators.pop();
      } else {
        return undefined;
      }
    } else {
      return undefined; // invalid token
    }
  }

  while (operators.top() !== null) {
    if (applyOperator() === undefined) return undefined;
  }

  if (values.top() !== null && operators.top() !== null) {
    return undefined;
  }
}
