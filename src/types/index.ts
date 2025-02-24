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

export interface ArmorTypeInter {
  
}

export interface SimulationListCard {
  id: number,
  icon: string,
  type: string,
  // 布匹
  silk: MaterialsInter[],
  // 碎块
  shard: MaterialsInter[],
  // 残骸
  relic: MaterialsInter[],
  // 丝绳
  rope: MaterialsInter[],
  // 兽核
  core: MaterialsInter[],
}