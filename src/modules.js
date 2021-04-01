export class Modules {
    constructor() {
        this.registry = {};
    }

    async dispose() {
        await this.clear();
        this.registry = null;
    }

    async clear() {
        const keys = Object.keys(this.registry);
        for (let key of keys) {
            delete this.registry[key];
        }
    }

    async add(key, file) {
        if (this.registry[key] == null) {
            this.registry[key] = file;
        }
    }

    async remove(key) {
        delete this.registry[key];
    }

    async get(key) {
        let result = this.registry[key];
        if (typeof result == "string") {
            result = await import(result);
            this.registry[key] = result;
        }
        return result;
    }

    async getDefault(key) {
        return (await this.get(key))?.default;
    }

    async getInstanceOf(key, className, isDefault = false) {
        const module = await this.get(key);
        const result = isDefault ? module?.default : module?.[className];
        return result ? new result() : null;
    }

    async call(key, thisObj, fnName, ...args) {
        const module = await this.get(key);
        const fn = module?.[fnName];
        return await fn?.call(thisObj, ...args);
    }

    async callDefault(key, thisObj, ...args) {
        const fn = await this.getDefault(key);
        return await fn?.call(thisObj, ...args);
    }
}