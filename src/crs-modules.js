export class Modules {
    constructor() {
        this.registry = {};
        this.componentRegistry = {};
        this.componentLocations = {};
        this.moduleLocations = {};
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
        return this._addToRegistry(this.registry, key, file);
    }

    async addComponent(key, file) {
        return this._addToRegistry(this.componentRegistry, key, file);
    }

    async addComponentLocation(key, path) {
        return this._addToRegistry(this.componentLocations, key, path);
    }

    async addModuleLocation(key, path) {
        return this._addToRegistry(this.moduleLocations, key, path);
    }

    async _addToRegistry(registry, key, value) {
        if (registry[key] == null) {
            registry[key] = value;
        }
    }

    async remove(key) {
        delete this.registry[key];
    }

    async get(key) {
        const prefix = document.body.dataset.appPath || "";

        let result = this.registry[key];
        if (result != null) {
            if (typeof result !== "string") return result;
            result = await import(`${prefix}${result}`);
            return this.registry[key] = result;
        }

        const parts = key.split(":");
        const path = this.moduleLocations[parts[0]];
        if (path == null) return;
        result = await import(`${path}/${parts[1]}.js`);
        return this.registry[key] = result;
    }

    async getComponent(nodeName, location) {
        // 1. if the component has already been loaded then do nothing
        let result = this.componentRegistry[nodeName];
        if (result != null) {
            if (typeof result !== "string") return;
            return await this.loadComponentFromPath(nodeName, result);
        }

        // 2. get the component location path. If the path is void, do nothing
        const path = this.componentLocations[location];
        if (path == null) return;

        // 3. get the component module and set it on the component registry
        await this.loadComponentFromPath(nodeName,`${path}/${nodeName}/${nodeName}.js`);
    }

    async loadComponentFromPath(nodeName, path) {
        const prefix = document.body.dataset.appPath || "";
        this.componentRegistry[nodeName] = await import(`${prefix}${path}`);
    }

    async getDefault(key) {
        return (await this.get(key))?.default;
    }

    async getConstant(key, name) {
        const module = await this.get(key);
        return module?.[name];
    }

    async getPrototype(key, className) {
        const module = await this.get(key);
        return module?.[className || key];
    }

    async getInstanceOf(key, className, ...args) {
        const result = await this.getPrototype(key, className || key);
        return result ? new result(...args) : null;
    }

    async getInstanceOfDefault(key, ...args) {
        const proto = await this.getDefault(key);
        return proto ? new proto(...args) : null;
    }

    async call(key, fnName, thisObj, ...args) {
        const module = await this.get(key);
        const fn = module?.[fnName || key];
        return await fn?.call(thisObj, ...args);
    }

    async callDefault(key, thisObj, ...args) {
        const fn = await this.getDefault(key);
        return await fn?.call(thisObj, ...args);
    }
}

globalThis.crs = globalThis.crs || {};
globalThis.crs.modules = new Modules();

globalThis.crs.modules.enableBinding = async (modules) => {
    for (let module of modules || []) {
        await globalThis.crs.modules.addComponent(module[0], module[1]);
    }

    if (globalThis.crsbinding != null) {
        globalThis.crs.modules._parseElement = globalThis.crsbinding.parsers.parseElement;
        globalThis.crsbinding.parsers.parseElement = async (element, context, options) => {
            await globalThis.crs.modules._parseElement(element, context, options);
            await globalThis.crs.modules.getComponent(element.nodeName.toLowerCase(), element.dataset.module);
        }
    }
}

