export interface MaterialsInter {
  id: number;
  name: string;
  icon: string;
  slot: number;
  level: string;
  star: {
    "一星": {},
    "二星": {},
    "三星": {},
    "四星": {},
    "五星": {},
  };
  attribute: string[];
  skill: string;
  drop: string[];
  point: number;
  type: string;
}

export interface MaterialsTypesInter {
  level: string[],
  type: string[],
  attribute: string[]
}