import React from "react";
import { Separator } from "@/components/ui/separator";
export function FooterText({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <div className="mx-auto w-full flex justify-center space-x-4 h-4 text-xs text-center leading-normal text-muted-foreground">
      <div>Hasbara.ai is powered by customized Mistral</div>
      <Separator orientation="vertical" />
      <div>
        <a href="https://benchte.ch" target="_blank">
          benchTech
        </a>
      </div>
    </div>
  );
}
