import { TagCloudOrder } from "..";

export class TagUtil {
  public static order(data: any[], order: TagCloudOrder, parse: (record: any) => number): any[] {
    if (order === "desc" || order === "middle") {
      let result: any[] = data.sort((a, b) => {
        if (parse(a) > parse(b)) {
          return -1;
        } else if (parse(a) < parse(b)) {
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
        if (parse(a) < parse(b)) {
          return -1;
        } else if (parse(a) > parse(b)) {
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
