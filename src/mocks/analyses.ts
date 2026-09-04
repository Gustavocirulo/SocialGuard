import type { Analysis } from "../types/analysis";

export const analyses: Analysis[] = [
  {
    id: 1024,
    type: "sync",
    status: "completed",
    classification: "not_violation",
    model: "SocialGuard AI",
    modelVersion: "1.0",
    processingTime: 842,
    createdAt: "2026-09-04T09:32:00",
  },
  {
    id: 1023,
    type: "batch",
    status: "processing",
    totalPosts: 1000,
    processedPosts: 730,
    model: "SocialGuard AI",
    modelVersion: "1.0",
    createdAt: "2026-09-04T09:28:00",
  },
  {
    id: 1022,
    type: "batch",
    status: "completed",
    totalPosts: 100,
    processedPosts: 100,
    model: "SocialGuard AI",
    modelVersion: "1.0",
    createdAt: "2026-09-04T09:15:00",
  },
];