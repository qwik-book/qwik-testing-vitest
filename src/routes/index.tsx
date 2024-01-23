/* v8 ignore start */
import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { DataFetchingGraphQLBreakingBad } from "~/components/fetching/graphql";
export default component$(() => {
  return (
    <>
      <DataFetchingGraphQLBreakingBad />
      </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
/* v8 ignore stop */