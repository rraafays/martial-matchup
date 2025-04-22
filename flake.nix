{
  description = "Martial Matchup Development Environment";

  inputs = {
    flake-utils.url = "github:numtide/flake-utils";
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs {
          inherit system;
          config = {
            allowUnfree = true;
          };
        };
      in
      {
        devShells.default = pkgs.mkShell {
          nativeBuildInputs = with pkgs; [
            bun
            nodePackages.prettier
            nodejs
            postman
            supabase-cli
            (pkgs.writeShellScriptBin "api-test" ''
              #!${pkgs.stdenv.shell}
              ${pkgs.newman}/bin/newman run ${toString ./.}/supabase.postman_collection.json
            '')
          ];
        };
      }
    );
}
