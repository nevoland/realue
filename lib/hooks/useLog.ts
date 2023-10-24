/* eslint-disable no-console */
import { EMPTY_OBJECT, useEffect, useRef } from "../dependencies";

type Props = { [name: string]: any };

export function useLog(title: string, props: Props) {
  const propNames = Object.keys(props).sort();
  const propValues = propNames.map((name) => props[name]);
  const ref = useRef<Props>();
  const previousProps = ref.current ?? (EMPTY_OBJECT as Props);
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
