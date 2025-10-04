
export interface AiResponse {
  summary: string;
  thought: string;
  fileList: string[];
}

export type MockComponentType = 'login' | 'dashboard' | 'landing' | 'profile' | null;