import { maybe } from 'ts-maybe-monad';

interface StyleKey {
    [key: string]: {
        isColor?: boolean;
    };
}

export class StyleKeys {
    private static innerKeys: StyleKey = {
        color: { isColor: true },
        backgroundColor: { isColor: true },
        borderColor: { isColor: true },
        borderWidth: {},
        borderStyle: {},
        borderRadius: {},
        fontSize: {},
        opacity: {},
        margin: {},
        padding: {},
        boxShadow: {},
    };

    public static get keys(): string[] {
        return Object.keys(StyleKeys.innerKeys);
    }

    public static isColor(key: string): boolean {
        return maybe(StyleKeys.innerKeys[key], x => x.isColor, false);
    }
}
