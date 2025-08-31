import { makeVar } from "@apollo/client";

export const checkoutIdVar = makeVar<string | null>(null);