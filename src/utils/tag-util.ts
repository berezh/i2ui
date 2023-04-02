import { RateOption, TagCloudOrder } from "..";

export class TagUtil {
  public static order(data: RateOption[], order: TagCloudOrder): RateOption[] {
    if (order === "desc" || order === "middle") {
      let result: any[] = data.sort((a, b) => {
        if (a.__rate > b.__rate) {
          return -1;
        } else if (a.__rate < b.__rate) {
          return 1;
        }
        return 0;
      });

      if (order === "middle") {
        const temp: any[] = [];
        result.forEach((x, i) => {
          if (i % 2 === 0) {
            temp.push(x);
          } else {
            temp.unshift(x);
          }
        });
        result = temp;
      }

      return result;
    } else if (order === "asc" || order === "edge") {
      let result: any[] = data.sort((a, b) => {
        if (a.__rate < b.__rate) {
          return -1;
        } else if (a.__rate > b.__rate) {
          return 1;
        }
        return 0;
      });

      if (order === "edge") {
        const temp: any[] = [];
        result.forEach((x, i) => {
          if (i % 2 === 0) {
            temp.push(x);
          } else {
            temp.unshift(x);
          }
        });
        result = temp;
      }

      return result;
    }

    return data;
  }
}
