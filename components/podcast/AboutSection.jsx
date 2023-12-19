"use client";

import { TinyWaveFormIcon } from "./TinyWaveFormIcon";
import clsx from "clsx";
import { useState } from "react";

export function AboutSection(props) {
  let [isExpanded, setIsExpanded] = useState(false);

  return (
    <section {...props}>
      <h2 className="flex items-center font-mono text-sm font-medium leading-7 text-slate-900">
        <TinyWaveFormIcon colors={["fill-violet-300", "fill-pink-300"]} className="h-2.5 w-2.5" />
        <span className="ml-2.5">About</span>
      </h2>
      <p className={clsx("mt-2 text-base leading-7 text-slate-700", !isExpanded && "lg:line-clamp-4")}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam nam quae laborum? Voluptates aliquam, ex enim
        amet tempore dolore minima ipsum aspernatur porro, consequuntur accusamus repellat. Molestiae accusamus expedita
        sunt! Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat quibusdam possimus, unde eligendi
        maxime, consequatur optio aperiam rem quia quod minus illum nulla obcaecati natus enim voluptate, commodi
        consectetur hic.
      </p>
      {!isExpanded && (
        <button
          type="button"
          className="mt-2 hidden text-sm font-bold leading-6 text-pink-500 hover:text-pink-700 active:text-pink-900 lg:inline-block"
          onClick={() => setIsExpanded(true)}>
          Show more
        </button>
      )}
    </section>
  );
}
