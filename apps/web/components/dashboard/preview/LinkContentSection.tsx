import { useState } from "react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@radix-ui/react-scroll-area";

import { ZBookmark, ZBookmarkedLink } from "@hoarder/shared/types/bookmarks";

function ScreenshotSection({ link }: { link: ZBookmarkedLink }) {
  return (
    <div className="relative h-full min-w-full">
      <Image
        fill={true}
        alt="screenshot"
        src={`/api/assets/${link.screenshotAssetId}`}
        className="object-contain"
      />
    </div>
  );
}

function CachedContentSection({ link }: { link: ZBookmarkedLink }) {
  let content;
  if (!link.htmlContent) {
    content = (
      <div className="text-destructive">Failed to fetch link content ...</div>
    );
  } else {
    content = (
      <div
        dangerouslySetInnerHTML={{
          __html: link.htmlContent || "",
        }}
        className="prose mx-auto dark:prose-invert"
      />
    );
  }
  return <ScrollArea className="h-full">{content}</ScrollArea>;
}

export default function LinkContentSection({
  bookmark,
}: {
  bookmark: ZBookmark;
}) {
  const [section, setSection] = useState<string>("cached");

  if (bookmark.content.type != "link") {
    throw new Error("Invalid content type");
  }

  let content;
  if (section === "cached") {
    content = <CachedContentSection link={bookmark.content} />;
  } else {
    content = <ScreenshotSection link={bookmark.content} />;
  }

  return (
    <div className="flex h-full flex-col items-center gap-2">
      <Select onValueChange={setSection} value={section}>
        <SelectTrigger className="w-fit">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="cached">Cached Content</SelectItem>
            <SelectItem
              value="screenshot"
              disabled={!bookmark.content.screenshotAssetId}
            >
              Screenshot
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      {content}
    </div>
  );
}
