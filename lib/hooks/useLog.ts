/* eslint-disable no-console */
import { EMPTY_OBJECT, useEffect, useRef } from "../dependencies.js";

type Props = { [name: string]: any };

/**
 * Logs the properties that changed since the last render in a console group named after `title`, displaying their `current` and `previous` values in a table.
 * Only logs when at least one of the property values changed. Intended for debugging purposes.
 *
 * @example
 * ```tsx
 * function Component(props: NevoProps<string>) {
 *   useLog("Component", props);
 *   // ...
 * }
 * ```
 *
 * @param title Title of the console group.
 * @param props Properties to track.
 */
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
                  current: props[name],
                  previous: previousProps[name],
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
