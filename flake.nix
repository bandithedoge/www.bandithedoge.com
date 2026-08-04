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
    };
}
