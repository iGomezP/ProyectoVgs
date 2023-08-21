import { Check } from './check.model';

export interface Result {
  checks: Check[];
  totalStatus: string;
  totalResponseTime: number;
}
