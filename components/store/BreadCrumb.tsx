"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

type Props = {
  classname?: string;
};
export function BreadcrumbWithCustomSeparator({ classname }: Props) {
  const pathname = usePathname();
  const routes = pathname.split("/"); 

  return (
    <Breadcrumb className={cn("py-6 bg-W100", classname)}>
      <BreadcrumbList className="mx-auto max-w-[1116px]">
        {routes.map((item, index) => {
          const isLast = index === routes.length - 1;
          const cleanItem = item.replace(/-/g, ' ');
          return (
            <BreadcrumbItem key={index}>
              {!isLast ? (
                <BreadcrumbLink href={`/${item}`} className="capitalize">
                  {item === ''?'Home':cleanItem}
                </BreadcrumbLink>
              ) : (
                <p className="capitalize">{cleanItem}</p>
              )}
              {!isLast && <BreadcrumbSeparator />}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

