import { component$ } from '@builder.io/qwik';
import { useCounter } from '~/hooks/useCounter';
export const CounterWithHook = component$(() => {
  const { increment, counter, reset } = useCounter(0);
  return (
    <>
      <button class='increment' onClick$={increment}>
        +
      </button>
      <button class='reset' onClick$={reset}>
        Reset
      </button>
      <div class='count'>{counter.value}</div>
    </>
  );
});
