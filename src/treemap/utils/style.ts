import { NumberUtil } from "../../utils";

export const StyleUtil = {
  parse: (style: React.CSSProperties | undefined): React.CSSProperties => {
    const result: React.CSSProperties = { ...style };
    if (result.fontSize) {
      result.fontSize = NumberUtil.toFloat(result.fontSize);
    }
    if (result.opacity) {
      result.opacity = NumberUtil.toFloat(result.opacity);
    }
    return result;
  },
};
