import { component$, useSignal } from '@builder.io/qwik';

export const InputText = component$(() => {
  const githubUser = useSignal('BuilderIO');
  return (
    <main>
      <p>
        <label>
          GitHub username:
          <input
            value={githubUser.value}
            onInput$={(ev) => githubUser.value = (ev.target as HTMLInputElement).value}
          />
        </label>
      </p>
      <p>
        Select username: <span class='current-user'>{githubUser.value}</span>
      </p>
    </main>
  );
});