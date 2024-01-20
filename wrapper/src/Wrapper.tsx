import { userAtom, usernameAtom } from "./store/atoms.ts";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";

export function Wrapper() {
  const user = useRecoilValueLoadable(userAtom);
  const setUsername = useSetRecoilState(usernameAtom);
  return (
    <div>
      <input
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.currentTarget.value)}
      />
      <div>
        {JSON.stringify(
          user.state === "loading" ? "loading..." : user.contents,
        )}
      </div>
    </div>
  );
}
