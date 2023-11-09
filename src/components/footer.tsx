import React from "react";
import { Separator } from "@/components/ui/separator";
export function FooterText({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <div className="mx-auto w-full flex justify-center space-x-4 h-4 text-xs text-center leading-normal text-muted-foreground">
      <div>Powered by customized Mistral</div>
      <Separator orientation="vertical" />
      <div>
        <a href="https://benchte.ch" target="_blank">
          BenchTech
        </a>
      </div>
      <Separator orientation="vertical" />
      <div>
        <a href="https://github.com/davidbench/hasbara-ai-FE" target="_blank">
          Project Page
        </a>
      </div>
    </div>
  );
}
