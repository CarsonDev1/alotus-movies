import { useState } from "react";

export default function useFadeImage() {
  const [loaded, setLoaded] = useState(false);
  const onLoad = () => setLoaded(true);
  return { loaded, onLoad };
}
