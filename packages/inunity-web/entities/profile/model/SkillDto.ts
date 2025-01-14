export type SkillLevel = "LOW" | "MEDIUM" | "HIGH";
export type SkillType =
  | "LANGUAGES"
  | "FRAMEWORK"
  | "DATABASE"
  | "DEVOPS"
  | "COMMUNICATION"
  | "TOOL"
  | "ETC";

export default interface SkillDto {
  skillId: number;
  type: SkillType;
  name: string;
  level: SkillLevel;
}
