"use client"; // обязательно, иначе TS/React ругается

import { ApolloProvider } from "@apollo/client/react";
import client from "@/lib/apolloClient";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function ApolloProviderWrapper({ children }: Props) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
