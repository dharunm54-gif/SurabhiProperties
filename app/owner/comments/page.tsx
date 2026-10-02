"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Trash2 } from "lucide-react";

interface CommentItem {
  id: string;
  postTitle: string;
  name: string;
  message: string;
  status: "pending" | "approved";
  createdAt: string;
}

export default function OwnerCommentsPage() {
  const [comments, setComments] = useState<CommentItem[]>([
    {
      id: "c1",
      postTitle: "Seamless SBI Home Loan Sanction for Dr. K. Ramanathan in 7 Days",
      name: "G. Venkatesh",
      message: "Very encouraging to see fast approvals with SBI! Does Surabi Properties also assist with building construction estimates?",
      status: "pending",
      createdAt: "Today at 10:15 AM",
    },
    {
      id: "c2",
      postTitle: "Thanjavur Ring Road & Master Plan Expansion: Insights for Land Buyers",
      name: "M. Saravanan",
      message: "Clear, unbiased analysis. Thanks for pointing out the high-tension wire survey line near Vallam road.",
      status: "pending",
      createdAt: "Yesterday at 4:30 PM",
    },
  ]);

  const handleApprove = (id: string) => {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "approved" as const } : c))
    );
  };

  const handleDelete = (id: string) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#173F35]">Comment Moderation</h2>
        <p className="text-xs text-gray-500 mt-1">
          Review visitor comments on Surabi Stories. Only approved comments appear publicly.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        {comments.length === 0 ? (
          <div className="p-12 text-center text-gray-500 text-sm">
            No pending comments for review.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {comments.map((item) => (
              <div
                key={item.id}
                className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50/80 transition-colors"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#242424]">{item.name}</span>
                    <Badge variant={item.status === "approved" ? "green" : "gold"}>
                      {item.status.toUpperCase()}
                    </Badge>
                    <span className="text-xs text-gray-400">{item.createdAt}</span>
                  </div>

                  <p className="text-xs text-gray-500">
                    On story: <strong>{item.postTitle}</strong>
                  </p>

                  <p className="text-xs text-gray-700 bg-gray-50 p-3 rounded-md border border-gray-100 italic">
                    &ldquo;{item.message}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {item.status === "pending" && (
                    <Button
                      size="sm"
                      onClick={() => handleApprove(item.id)}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white"
                    >
                      <Check className="w-3.5 h-3.5 mr-1" />
                      <span>Approve</span>
                    </Button>
                  )}

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-1" />
                    <span>Delete</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
