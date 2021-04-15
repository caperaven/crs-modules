# CRS Modules

## Introduction

CRS modules allows you to define modules based on keys.  
The aim is to load modules only when required.  
Under normal conditions you would just use the import language feature.
When working with schema driven UI however you may want to have something that will dynamically load modules based on the features defined in the modules.

This library aims to be used alongside packages such as crs-schema and crs-components for the above example.

If you are using crs-binding you can extend the binding engine to auto load modules for web components when it parses the dom elements.

```js
await crs.modules.enableBinding([
    ["my-component", "/components/my-component.js"],
    ["other-component", "/components/other-components.js"]
]);
```

The parameter is an array of module registries.

## Functions

### dispose
When you are done with the modules, call dispose to clear resources

### clear
Clear all resources registered on modules

### add
Add new module to load providing a key and value pair.

```js
await crs.modules.add("module-name", "/app/function-test.js");
```
### remove
Remove a module from the registry.  

```js
await crs.modules.remove("module-name");
```
### get
Load and get the module from the registry for further use.

```js
await crs.modules.get("module-name");
```
### getDefault
Load the module and return the default exported module item.

```js
const fn = await this.getDefault("module-name");
```

### getPrototype
Get the prototype used to instantiate a class 
```js
const proto = await this.getPrototype(key, className);
const intance = new proto();
```

### getInstanceOf
Create a class instance defined on the module.

```js
await crs.modules.getInstanceOf("module-name", "ClassName", param1, param2);
```
Parameters are sent to the constructor.  
If the key and class name is the same you don't need to define the class name.

```js
await crs.modules.getInstanceOf("Test");
```

### getInstanceOfDefault
Create a class instance that is exported as the default

```js
await crs.modules.getInstanceOfDefault("module-name");
```
### call
Call a function defined on the module.

```js
await crs.modules.call("module-name", null, "functionTest", param1, param2);
```

If the key and the function name is the same you don't need to define the function name.

```js
await crs.modules.call("lib");
```

### callDefault
Call a function that is set as the default export.

```js
await crs.modules.callDefault("default", null, "Hello World"); 
```
