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
        {user.state === "loading" ? (
          <p>Loading...</p>
        ) : user.state === "hasValue" && user.contents ? (
          <>
            <img src={user.contents.avatar_url} alt="User Avatar" />
            <div className="user-details">
              <h2>{user.contents.name ?? "No Name"}</h2>
              <p>{user.contents.bio ?? "No Bio"}</p>
              <p>
                <strong>Location:</strong>{" "}
                {user.contents.location ?? "No Location"}
              </p>
              <p>
                <strong>Public Repositories:</strong>{" "}
                {user.contents.public_repos ?? "0"}
              </p>
              <p>
                <strong>Followers:</strong> {user.contents.followers ?? "0"}
              </p>
              <p>
                <strong>Following:</strong> {user.contents.following ?? "0"}
              </p>
            </div>
          </>
        ) : (
          <p>Error loading user data</p>
        )}
      </div>
    </div>
  );
}
