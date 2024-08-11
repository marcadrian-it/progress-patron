/// <reference types="vitest/globals" />
import "@testing-library/jest-dom";
import { beforeAll, vi } from "vitest";

beforeAll(() => {
    vi.mock("next/navigation", () => {
        const actual = vi.importActual("next/navigation");
        return {
            ...actual,
            useRouter: vi.fn(() => ({
                push: vi.fn(),
                replace: vi.fn(),
                prefetch: vi.fn(),
            })),
            usePathname: vi.fn(),
            useSearchParams: vi.fn(() => new URLSearchParams()),
        };
    });
});
