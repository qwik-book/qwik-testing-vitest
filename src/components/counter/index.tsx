import { component$, useStore, $ } from "@builder.io/qwik";

export const Counter = component$(() => {
  const state = useStore({
    count: 0,
  });

  const increment = $(() => state.count++);

  return (
    <>
      <button class="increment" onClick$={increment}>
        +
      </button>
      <div class="count">{state.count}</div>
    </>
  );
});