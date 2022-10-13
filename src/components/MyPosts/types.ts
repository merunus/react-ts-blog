import { TUser } from "../../redux/user/types";

export interface IUserInfoProps {
  user: TUser | null;
  chartData: any;
}

export type ChartData = {
  labels: string[];
  datasets: [
    {
      label: string;
      data: string | number;
    }
  ];
};
