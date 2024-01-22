import { component$ } from '@builder.io/qwik';

export interface IndexProps {
  name: string
}

export const HelloWithProps = component$<IndexProps>((props) => {
  return (
    <div>
      Hello { props.name} to work in Qwik!
    </div>
  );
});