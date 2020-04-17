import React from "react";
import Link from "next/link";

export default () => (
  <ul>
    <h2>Next</h2>
    <li>
      <Link href="/a" as="/b">
        <a>b</a>
      </Link>
    </li>
  </ul>
);
