import { describe, expect, it } from "vitest";

import { IncomingHttpHeaders } from "http";
import { getAPIKey } from "./auth";

describe("getAPIKey", () => {
    it("returns null when authorization header is missing", () => {
        const headers: IncomingHttpHeaders = {};
        expect(getAPIKey(headers)).toBeNull();
    });

    it("returns null when authorization header does not start with 'ApiKey'", () => {
        const headers: IncomingHttpHeaders = {
            authorization: "Bearer abcdef12345",
        };
        expect(getAPIKey(headers)).toBeNull();
    });

    it("returns null when authorization header is malformed (e.g. only one part)", () => {
        const headers: IncomingHttpHeaders = {
            authorization: "ApiKeyOnly",
        };
        expect(getAPIKey(headers)).toBeNull();
    });

    it("returns the API key when header is properly formatted", () => {
        const headers: IncomingHttpHeaders = {
            authorization: "ApiKey my-secret-key",
        };
        expect(getAPIKey(headers)).toBe("my-secret-key");
    });

    it("is case-sensitive and returns null if 'ApiKey' is lowercase", () => {
        const headers: IncomingHttpHeaders = {
            authorization: "apikey abc123",
        };
        expect(getAPIKey(headers)).toBeNull();
    });
});