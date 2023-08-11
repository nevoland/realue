import { useEffect, useRef } from "../dependencies";

type Props = { [name: string]: any };

export function logProps(title: string, props: Props) {
  const propNames = Object.keys(props).sort();
  const propValues = propNames.map((name) => props[name]);
  const ref = useRef<Props>();
  const previousProps = ref.current ?? {};
  useEffect(() => {
    console.group(title);
    console.table(
      Object.fromEntries(
        propNames
          .map(
            (name) =>
              [
                name,
                {
                  previous: previousProps[name],
                  current: props[name],
                },
              ] as const,
          )
          .filter(([_name, { previous, current }]) => previous !== current),
      ),
    );
    console.groupEnd();
    ref.current = props;
  }, propValues);
}

// function formatValue(value: any) {
//   return JSON.stringify(value, null, 2);
// }
