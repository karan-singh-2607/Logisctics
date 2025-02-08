import { APP_STORE, PLAY_STORE } from "@/public";

export function AppDownloads() {
  return (
    <div className="flex justify-between">
      <a href="#" className="block w-24">
        <APP_STORE />
      </a>
      <a href="#" className="block w-24">
        <PLAY_STORE />
      </a>
    </div>
  );
}
