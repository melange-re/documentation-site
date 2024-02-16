{
  description = "Melange Nix Flake";

  inputs = {
    flake-utils.url = "github:numtide/flake-utils";
    nixpkgs = {
      url = "github:nix-ocaml/nix-overlays";
      inputs.flake-utils.follows = "flake-utils";
    };
    melange-flake = {
      url = "github:melange-re/melange";
      inputs.flake-utils.follows = "flake-utils";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = { self, nixpkgs, flake-utils, melange-flake }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages."${system}".appendOverlays [
          (self: super: {
            ocamlPackages = super.ocaml-ng.ocamlPackages_5_1.overrideScope' (ocamlself: ocamlsuper: {
              cmarkit = ocamlsuper.cmarkit.overrideAttrs (oldattrs: {
                src = pkgs.fetchFromGitHub {
                  owner = "dbuenzli";
                  repo = "cmarkit";
                  rev = "f37c8ea86fd0be8dba7a8babcee3682e0e047d91";
                  hash = "sha256-3CD49b8jUFkytKZ9+2sEUQr4YsZL6zI6myMLNN5NQJ4=";
                };
              });
            });
          })
          melange-flake.overlays.default
        ];
        python3Packages = pkgs.python3.pkgs.overrideScope (pyself: pysuper: {
          mkdocs-print-site-plugin = pyself.buildPythonPackage rec {
            pname = "mkdocs-print-site-plugin";
            version = "2.3.4";

            src = pkgs.fetchFromGitHub {
              owner = "timvink";
              repo = "mkdocs-print-site-plugin";
              rev = "v${version}";
              hash = "sha256-hcOSRDGNzm8upFO2l5cNqW/Q2PUK1US1zwVGzRaVI7E=";
            };
            propagatedBuildInputs = with pyself; [ mkdocs-material ];
            checkInputs = with pyself; [ pytest ];
          };
        });
      in

      {
        devShells = {
          default = pkgs.mkShell {
            nativeBuildInputs = with pkgs.ocamlPackages; [ ocaml findlib dune ];
            buildInputs = (with python3Packages; [
              mkdocs
              mkdocs-print-site-plugin
              mike
            ]) ++ (with pkgs.ocamlPackages; [
              cmarkit
              js_of_ocaml
              melange
              merlin
              ocaml-lsp
              ocamlformat-lib
              reason
              reason-react
            ]);
            dontDetectOcamlConflicts = true;
          };
        };
      });
}
