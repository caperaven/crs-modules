import "/src/index.js";

before(() => {
    crs.modules.add("fnTest", "/app/function-test.js");
    crs.modules.add("clsTest", "/app/class-test.js");
    crs.modules.add("lib", "/app/library-test.js");
    crs.modules.add("comp", "/app/component.js");
    crs.modules.add("default", "/app/default.js");
});

test("module - get", () => {
    expect(true).toEqual(true);
});