import { usePromise } from "../../lib/main.js";
import { sleep, useState } from "../dependencies.js";

async function fetchUsers() {
  await sleep(2000);
  const request = await fetch("https://api.github.com/users");
  return await request.json();
}

export function Query() {
  const [query, onChangeQuery] = useState<Promise<any> | undefined>(undefined);
  const result = usePromise(query);
  return (
    <div class="flex flex-col space-y-2">
      <button onClick={() => onChangeQuery(fetchUsers())}>Refresh</button>
      <div class="whitespace-pre bg-slate-200 font-mono text-xs dark:bg-slate-800">
        {JSON.stringify(result, null, 2)}
      </div>
    </div>
  );
}
