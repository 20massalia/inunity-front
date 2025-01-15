import { queryOptions } from "@tanstack/react-query";
import fetchExtended from "@/lib/fetchExtended";
import ProfileDto from "../model/ProfileDto";
import SkillDto from "../model/SkillDto";
import PortfolioDto from "../model/PortfolioDto";
import CareerDto from "../model/CareerDto";

export default class ProfileQueries {
  static readonly QueryKeys = {
    all: ["profile"] as const,
    profile: (userId: number) => [...this.QueryKeys.all, userId] as const,
    skills: (userId: number) =>
      [...this.QueryKeys.profile(userId), "skills"] as const,
    portfolios: (userId: number) =>
      [...this.QueryKeys.profile(userId), "portfolios"] as const,
    portfolioOG: (userId: number) =>
      [...this.QueryKeys.profile(userId), "portfolioOG"] as const,
    careers: (userId: number) =>
      [...this.QueryKeys.profile(userId), "careers"] as const,
  } as const;

  // 프로필
  static profileQuery(userId: number) {
    return queryOptions<ProfileDto>({
      queryKey: this.QueryKeys.profile(userId),
      queryFn: async () => {
        return await fetchExtended<ProfileDto>(`v1/users/${userId}/profile`);
      },
    });
  }

  // 기술
  static skillQuery(userId: number) {
    return queryOptions<SkillDto[]>({
      queryKey: this.QueryKeys.skills(userId),
      queryFn: async () => {
        return await fetchExtended<SkillDto[]>(
          `v1/users/${userId}/profile/skill`
        );
      },
    });
  }

  // 프로젝트
  static portfolioQuery(userId: number) {
    return queryOptions<PortfolioDto[]>({
      queryKey: this.QueryKeys.portfolios(userId),
      queryFn: async () => {
        return await fetchExtended<PortfolioDto[]>(
          `v1/users/${userId}/profile/portfolio`
        );
      },
    });
  }

  // 경력
  static careerQuery(userId: number) {
    return queryOptions<CareerDto[]>({
      queryKey: this.QueryKeys.careers(userId),
      queryFn: async () => {
        return await fetchExtended<CareerDto[]>(
          `v1/users/${userId}/profile/career`
        );
      },
    });
  }

  static getInvalidationKeys(userId: number) {
    return {
      all: this.QueryKeys.all,
      profile: this.QueryKeys.profile(userId),
      skills: this.QueryKeys.skills(userId),
      portfolios: this.QueryKeys.portfolios(userId),
      careers: this.QueryKeys.careers(userId),
    };
  }
}
