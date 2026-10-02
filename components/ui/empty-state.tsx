import React from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "./button";

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
}: {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="text-center py-12 px-4 border-2 border-dashed border-[#E2E0D8] rounded-xl bg-white/50">
      <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-3">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h3 className="text-base font-semibold text-[#242424]">{title}</h3>
      <p className="mt-1 text-sm text-gray-500 max-w-sm mx-auto">{description}</p>
      {actionLabel && onAction && (
        <div className="mt-6">
          <Button onClick={onAction} size="sm">
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}

export function LoadingSpinner({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-3">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#173F35]"></div>
      <p className="text-sm text-gray-500">{text}</p>
    </div>
  );
}
