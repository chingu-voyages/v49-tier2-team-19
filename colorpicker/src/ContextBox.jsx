import React, { useState } from "react";
export default function ContextBox() {
  const [context, setContext] = useState("");

  return (
    <input
      type="text"
      placeholder="living room couch"
      value={context}
      onChange={(e) => setContext(e.target.value)}
    ></input>
  );
}
