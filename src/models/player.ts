export interface Player {
  id: string;
  name: string;
  skills?: PlayerSkills;
  active?: boolean;
}

interface PlayerSkills {
  pass: number;
  shoot: number;
  defense: number;
  physical: number;
}
