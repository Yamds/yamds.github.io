// 材料
export interface MaterialsInter {
  id: number;
  name: string;
  icon: string;
  slot: number;
  level: string;
  star: Array<Record<string, number>>;
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

export interface ArmorInter {
  id: number,
  name: string,
  icon: string,
  attribute: string[],
  sum: string[][],
  material_type: {
    silk: number,
    rope: number,
    shard: number,
    relic: number,
    core: number
  }
}

// 选中的装备材料，还需要附带星级属性
export interface SelectedArmorMaterialInter {
  material: MaterialsInter,
  star: number
}

// 技能
export interface SkillInter {
  name: string
  desc: string
}