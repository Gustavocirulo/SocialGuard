export type AnalysisType = "sync" | "batch";

export type AnalysisStatus =
  | "pending"
  | "processing"
  | "completed"
  | "failed";

export type Classification =
  | "not_violation"
  | "possible_violation"
  | "inconclusive";

export interface Analysis {
  id: number;
  type: AnalysisType;
  status: AnalysisStatus;
  classification?: Classification;
  totalPosts?: number;
  processedPosts?: number;
  model?: string;
  modelVersion?: string;
  processingTime?: number;
  createdAt: string;
}