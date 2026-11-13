import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Remove what each test rendered, so tests cannot affect one another.
afterEach(() => {
  cleanup();
  localStorage.clear();
});
