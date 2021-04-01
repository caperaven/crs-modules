import "./../src/index.js";

beforeAll(() => {
    crs.modules.add("fnTest", "../app/function-test.js");
    crs.modules.add("clsTest", "../app/class-test.js");
    crs.modules.add("lib", "../app/library-test.js");
    crs.modules.add("comp", "../app/component.js");
    crs.modules.add("default", "../app/default.js");
});

afterAll(() => {
    crs.modules.dispose();
})

test("module - get", async () => {
    const module = await crs.modules.get("lib");
    expect(typeof crs.modules.registry["lib"]).toEqual("object");
    expect(module).not.toBeNull();
    expect(module).not.toBeUndefined();
});

test("module - getDefault", async () => {
    const result = await crs.modules.getDefault("default");
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
})

test("module - remove", async () => {
    await crs.modules.add("test", "");
    expect(crs.modules.registry["test"]).not.toBeNull();

    await crs.modules.remove("test");
    expect(crs.modules.registry["test"]).toBeUndefined();
})

test("module - getInstanceOf", async () => {
    const result = await crs.modules.getInstanceOf("clsTest", "Test");
    expect(result).not.toBeNull();
})

test("module - getInstanceOfDefault", async () => {
    const result = await crs.modules.getInstanceOfDefault("clsTest");
    expect(result).not.toBeNull();
})

test("module - call", async () => {
    const result = await crs.modules.call("fnTest", null, "functionTest", 1, 2);
    expect(result).toEqual(3);
})

test("module - callDefault", async () => {
    const result = await crs.modules.callDefault("default", null, "hello world");
    expect(result).toEqual("hello world");
})

test("module - null", async () => {
    const m1 = await crs.modules.get("none");
    expect(m1).toBeUndefined();

    const m2 = await crs.modules.getDefault("none");
    expect(m2).toBeUndefined();

    const m3 = await crs.modules.getInstanceOf("none", "none");
    expect(m3).toBeNull();

    const m4 = await crs.modules.getInstanceOfDefault("none");
    expect(m4).toBeNull();

    const m5 = await crs.modules.call("none", null, "none");
    expect(m5).toBeUndefined();

    const m6 = await crs.modules.callDefault("none", null);
    expect(m6).toBeUndefined();
})