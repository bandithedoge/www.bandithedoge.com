{
  outputs =
    { self, ... }@args:
    let
      inputs = (import ./.tack) { overrides = args.tackOverrides or { }; };
      forAllSystems = inputs.nixpkgs.lib.genAttrs inputs.nixpkgs.lib.platforms.all;
    in
    {
      devShells = forAllSystems (
        system:
        let
          pkgs = import inputs.nixpkgs { inherit system; };
        in
        {
          default = pkgs.mkShell {
            packages = [
              inputs.nur-bandithedoge.legacyPackages.${system}.zine-bin
            ];
          };
        }
      );

      formatter = forAllSystems (
        system:
        let
          pkgs = import inputs.nixpkgs { inherit system; };
        in
        inputs.treefmt-nix.lib.mkWrapper pkgs {
          programs = {
            nixfmt.enable = true;
            taplo.enable = true;
            oxfmt.enable = true;
          };

          settings.formatter = {
            oxfmt.options = [ "-c=.oxfmtrc.json" ];

            ziggy = {
              command = pkgs.lib.getExe inputs.nur-bandithedoge.legacyPackages.${system}.ziggy-bin;
              options = [ "fmt" ];
              includes = [
                "*.ziggy"
                "*.ziggy-schema"
                "*.smd"
              ];
            };

            superhtml = {
              command = pkgs.lib.getExe pkgs.superhtml;
              options = [ "fmt" ];
              includes = [ "*.shtml" ];
            };
          };
        }
      );
    };
}
