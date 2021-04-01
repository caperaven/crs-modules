# CRS Modules

## Introduction

CRS modules allows you to define modules based on keys.  
The aim is to load modules only when required.  
Under normal conditions you would just use the import language feature.
When working with schema driven UI however you may want to have something that will dynamically load modules based on the features defined in the modules.

This library aims to be used alongside packages such as crs-schema and crs-components for the above example.

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

### getInstanceOf
Create a class instance defined on the module.

```js
await crs.modules.getInstanceOf("module-name", "ClassName");
```
### call
Call a function defined on the module.

```js
await crs.modules.call("module-name", null, "functionTest", param1, param2);
```
### callDefault
Call a function that is set as the default export.

```js
await crs.modules.callDefault("default", null, "Hello World"); 
```
