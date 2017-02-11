export function globalFn<T>(name: string, fn: T): T {
    var _G: any = global || window || { };
    return _G[name] = fn;
}
