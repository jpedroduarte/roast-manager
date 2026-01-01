export interface RoastLog {
  id: string;
  timestamp: number;
  dateStr: string;
  beanName: string;
  greenWeight: string;
  roastWeight: string;
  totalSeconds: number;
  dryEndTime: number | null;
  firstCrackTime: number | null;
  dtr: number;
  weightLoss: string;
}

export interface RecipeStep {
  id: string;
  title: string;
  temperature: string;
  time: string;
}
