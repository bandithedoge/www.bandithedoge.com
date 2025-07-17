const std = @import("std");
const zine = @import("zine");

pub fn build(b: *std.Build) !void {
    const opts: zine.Options = .{};

    b.getInstallStep().dependOn(&zine.website(b, opts).step);

    const serve_step = b.step("serve", "Start dev server");
    const serve = zine.serve(b, opts);
    serve_step.dependOn(&serve.step);
}
