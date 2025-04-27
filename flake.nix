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
            (pkgs.writeShellScriptBin "local" ''
              #!${pkgs.stdenv.shell}
              export IP=$(ipconfig getifaddr en0)
              echo $IP
              EXPO_PUBLIC_SUPABASE_URL="http://''${IP}:54321" ${pkgs.bun}/bin/bun start
            '')
            (pkgs.writeShellScriptBin "dev" ''
              #!${pkgs.stdenv.shell}
              EXPO_PUBLIC_SUPABASE_URL="https://kkghtpopcfnuqllsvpzy.supabase.co" ${pkgs.bun}/bin/bun start
            '')
          ];
        };
      }
    );
}
