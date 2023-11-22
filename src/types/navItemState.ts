export type navItemState = {
  header: string;
  textInfo: string;
  fileType: {
    "Application/Object": string[];
  };
  forceSingleFile?: boolean;
  checkDevMode?: boolean;
  uploadUrl: string;
  installUrl: string;
};
