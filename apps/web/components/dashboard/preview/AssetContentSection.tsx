import Image from "next/image";

import type { ZBookmark } from "@hoarder/shared/types/bookmarks";

export function AssetContentSection({ bookmark }: { bookmark: ZBookmark }) {
  if (bookmark.content.type != "asset") {
    throw new Error("Invalid content type");
  }

  switch (bookmark.content.assetType) {
    case "image": {
      return (
        <div className="relative h-full min-w-full">
          <Image
            alt="asset"
            fill={true}
            className="object-contain"
            src={`/api/assets/${bookmark.content.assetId}`}
          />
        </div>
      );
    }
    case "pdf": {
      return (
        <iframe
          title={bookmark.content.assetId}
          className="h-full w-full"
          src={`/api/assets/${bookmark.content.assetId}`}
        />
      );
    }
    default: {
      return <div>Unsupported asset type</div>;
    }
  }
}
