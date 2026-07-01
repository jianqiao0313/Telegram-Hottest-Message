import { readFileSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';

export interface TConfig {
  apiId?: number;
  apiHash?: string;
  session?: string;
  proxy?: string;
  since?: string;
  until?: string;
  forward?: string;
}

export const loadConfig = (): TConfig => {
  const configPath = join(homedir(), '.thmrc');
  try {
    const raw = readFileSync(configPath, 'utf-8');
    return JSON.parse(raw) as TConfig;
  } catch {
    return {};
  }
};
