import { TagProps, TagCloudOrder } from '..';

export class TagUtil {
    public static order(data: TagProps[], order?: TagCloudOrder): TagProps[] {
        if (order === 'desc' || order === 'middle') {
            let result: TagProps[] = data.sort((a, b) => {
                if (a.rate > b.rate) {
                    return -1;
                } else if (a.rate < b.rate) {
                    return 1;
                }
                return 0;
            });

            if (order === 'middle') {
                const temp: TagProps[] = [];
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
        } else if (order === 'asc' || order === 'edge') {
            let result: TagProps[] = data.sort((a, b) => {
                if (a.rate < b.rate) {
                    return -1;
                } else if (a.rate > b.rate) {
                    return 1;
                }
                return 0;
            });

            if (order === 'edge') {
                const temp: TagProps[] = [];
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
