"use client"
import Container from "@/components/container";

export default function WhitePill() {
  return (
    <Container>
      <div className="">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-semibold tracking-tight lg:leading-tight text-brand-primary lg:text-5xl dark:text-white">
            The White Pill
          </h1>
        </div>
        <div className="flex flex-col items-center justify-center text-sm">
          <p>Can use landing page template to build white-pill specific page view.</p>
        </div>
      </div>
    </Container>
  );
}
