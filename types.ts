
export interface AiResponse {
  thought: string;
  fileList: string[];
}

export type MockComponentType = 'login' | 'dashboard' | 'landing' | 'profile' | null;
