import create from 'zustand';

export type PendOrder = {
  bonusPoint: number;
  bos: number;
  handlingFee: number;
  payMethod: number;
  point: number;
  serviceFee: number;
  state: number;
  totalDollars: number;
  twd: number;
  totalPoints: number;
  account: string;
  createdAt: string;
  gameUid: string;
  id: string;
  name: string;
  remark: string;
  appeal: boolean;
  timeout: boolean;
  user: { name: string; gameUid: string };
};

type InstantsStore = {
  pendList: PendOrder[];
  setPendList: (data: PendOrder[]) => void;
};

export const useInstantStore = create<InstantsStore>((set) => ({
  pendList: [],
  setPendList: (data: PendOrder[]) =>
    set(() => ({
      pendList: data || [],
    })),
}));
