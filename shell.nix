let
    pkgs = import <nixpkgs> {};
in
pkgs.mkShell {
    buildInputs = with pkgs; [
      sass
          tailwindcss
          prettierd
          corepack_latest
          nodejs_22
          eslint
          nodePackages.vercel
    ];
    }
