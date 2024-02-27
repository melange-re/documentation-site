import{_ as a,c as s,o as i,V as e}from"./chunks/framework.BCxdY_ip.js";const E=JSON.parse('{"title":"Getting started","description":"","frontmatter":{},"headers":[],"relativePath":"getting-started.md","filePath":"getting-started.md"}'),t={name:"getting-started.md"},n=e(`<h1 id="getting-started" tabindex="-1">Getting started <a class="header-anchor" href="#getting-started" aria-label="Permalink to &quot;Getting started&quot;">​</a></h1><p>If you would like to learn OCaml and Melange from scratch, we recommend you to read <a href="https://react-book.melange.re/" target="_blank" rel="noreferrer">&quot;Melange for React Devs&quot;</a>. This book will give you an overview of the OCaml language, as well as showcase some of the mechanisms that Melange offers to interact with JavaScript code. You’ll build a few projects along the way, and by the end, you’ll have a solid grasp of the language.</p><p>Alternatively, if you want to start your project, below you will find the two main ways to get started with Melange:</p><ol><li>Automated, using <a href="https://github.com/dmmulroy/create-melange-app" target="_blank" rel="noreferrer">create-melange-app</a></li><li>Manually, using <a href="https://github.com/melange-re/melange-opam-template" target="_blank" rel="noreferrer">melange-opam-template</a></li></ol><h2 id="getting-started-automated-create-melange-app" tabindex="-1">Getting started (automated): <code>create-melange-app</code> <a class="header-anchor" href="#getting-started-automated-create-melange-app" aria-label="Permalink to &quot;Getting started (automated): \`create-melange-app\`&quot;">​</a></h2><p>If you prefer an automated way to install the Melange toolchain, you can use <a href="https://github.com/dmmulroy/create-melange-app" target="_blank" rel="noreferrer">create-melange-app</a> to start a new project. To do so, run these commands:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> create melange-app@latest</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run dev</span></span></code></pre></div><h2 id="getting-started-manual-melange-opam-template" tabindex="-1">Getting started (manual): <code>melange-opam-template</code> <a class="header-anchor" href="#getting-started-manual-melange-opam-template" aria-label="Permalink to &quot;Getting started (manual): \`melange-opam-template\`&quot;">​</a></h2><p>If you prefer manually installing the toolchain, follow the instructions below.</p><h3 id="install-a-package-manager" tabindex="-1">Install a package manager <a class="header-anchor" href="#install-a-package-manager" aria-label="Permalink to &quot;Install a package manager&quot;">​</a></h3><p>To work with Melange, you need to install a package manager compatible with OCaml. If you are not sure which one to use, we recommend <a href="https://opam.ocaml.org/" target="_blank" rel="noreferrer">opam</a>, a source-based package manager for OCaml, but there are <a href="#alternative-package-managers-experimental">other alternatives</a> available.</p><p>Instructions for installing opam on different operating systems can be found at the opam <a href="https://opam.ocaml.org/doc/Install.html" target="_blank" rel="noreferrer">install page</a>, and you can find <a href="./package-management.html">a whole section about it</a> on this website.</p><h3 id="get-the-template" tabindex="-1">Get the template <a class="header-anchor" href="#get-the-template" aria-label="Permalink to &quot;Get the template&quot;">​</a></h3><p>You can clone <code>melange-opam-template</code> from <a href="https://github.com/melange-re/melange-opam-template/generate" target="_blank" rel="noreferrer">this link</a>, and follow the instructions in the <a href="https://github.com/melange-re/melange-opam-template/blob/main/README.md" target="_blank" rel="noreferrer">readme file</a> to configure the <a href="https://opam.ocaml.org/blog/opam-local-switches/" target="_blank" rel="noreferrer">local opam switch</a> and download the necessary dependencies to build the project.</p><h3 id="editor-integration" tabindex="-1">Editor integration <a class="header-anchor" href="#editor-integration" aria-label="Permalink to &quot;Editor integration&quot;">​</a></h3><p>One of the goals of Melange is to remain compatible with OCaml. One of the major benefits of this compatibility is that developers working on Melange projects can use the same editor tooling as they would for OCaml.</p><p>OCaml developer tooling has been built, tested, and refined over the years, with plugins available for many editors. The most actively maintained plugins are for Visual Studio Code, Emacs, and Vim.</p><p>For Visual Studio Code, install the <a href="https://marketplace.visualstudio.com/items?itemName=ocamllabs.ocaml-platform" target="_blank" rel="noreferrer">OCaml Platform Visual Studio Code extension</a> from the Visual Studio Marketplace. When you load an OCaml source file for the first time, you may be prompted to select the toolchain to use. Select the version of OCaml you are using from the list, such as 5.1.1. Further instructions for configuration can be found in the <a href="https://github.com/ocamllabs/vscode-ocaml-platform#setting-up-the-extension-for-your-project" target="_blank" rel="noreferrer">extension repository</a>.</p><p>For Emacs and Vim, the configuration may vary depending on the case, and there are several options available. You can read about them in the <a href="http://ocamlverse.net/content/editor_setup.html" target="_blank" rel="noreferrer">editor setup page</a> of the OCamlverse documentation site.</p><h3 id="alternative-package-managers-experimental" tabindex="-1">Alternative package managers (experimental) <a class="header-anchor" href="#alternative-package-managers-experimental" aria-label="Permalink to &quot;Alternative package managers (experimental)&quot;">​</a></h3><p>Melange can also be used with other package managers. The following instructions apply to <a href="#nix">Nix</a> and <a href="#esy">esy</a>.</p><h4 id="nix" tabindex="-1"><a href="https://nixos.org/" target="_blank" rel="noreferrer">Nix</a> <a class="header-anchor" href="#nix" aria-label="Permalink to &quot;[Nix](https://nixos.org/)&quot;">​</a></h4><p>Melange provides an overlay that can be:</p><ul><li>referenced from a <a href="https://nixos.wiki/wiki/Flakes" target="_blank" rel="noreferrer">Nix flake</a></li><li>overlayed onto a <code>nixpkgs</code> package set</li></ul><p>Make sure <a href="https://nixos.org/download.html" target="_blank" rel="noreferrer">Nix</a> is installed. The following <code>flake.nix</code> illustrates how to set up a Melange development environment.</p><div class="language-nix vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nix</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  description</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Melange starter&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  inputs</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    flake-utils</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">url</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;github:numtide/flake-utils&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    nixpkgs</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">url</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;github:nixos/nixpkgs&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # Depend on the Melange flake, which provides the overlay</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    melange</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">url</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;github:melange-re/melange&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  };</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  outputs</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { self</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">,</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> nixpkgs</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">,</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> flake-utils</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">,</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> melange }:</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">    flake-utils</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">.</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">lib</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">.</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">eachDefaultSystem</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (system:</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      let</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        pkgs</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;"> nixpkgs</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">.</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">legacyPackages</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">\${</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">system</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">}</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">.</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">appendOverlays</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">          # Set the OCaml set of packages to the 5.1 release line</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          (self: super: { </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ocamlPackages</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;"> super</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">.</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">ocaml-ng</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">.</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">ocamlPackages_5_1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; })</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">          # Apply the Melange overlay</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">          melange</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">.</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">overlays</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">.</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">default</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        ];</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        inherit</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">pkgs</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ocamlPackages</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      in</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        devShells</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">default</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;"> pkgs</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">.</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">mkShell</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">          nativeBuildInputs</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> with</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;"> ocamlPackages</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; [</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">            ocaml</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">            dune_3</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">            findlib</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">            ocaml-lsp</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">            ocamlPackages</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">.</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">melange</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          ];</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">          buildInputs</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [ </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">ocamlPackages</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">.</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">melange</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ];</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        };</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>To enter a Melange development shell, run <code>nix develop -c $SHELL</code>.</p><h4 id="esy" tabindex="-1"><a href="https://esy.sh/" target="_blank" rel="noreferrer">esy</a> <a class="header-anchor" href="#esy" aria-label="Permalink to &quot;[esy](https://esy.sh/)&quot;">​</a></h4><p>First, make sure <code>esy</code> is <a href="https://esy.sh/docs/en/getting-started.html#install-esy" target="_blank" rel="noreferrer">installed</a>. <code>npm i -g esy</code> does the trick in most setups.</p><p>The following is an example <code>esy.json</code> that can help start a Melange project. A <a href="https://github.com/melange-re/melange-esy-template" target="_blank" rel="noreferrer">project template for esy</a> is also available if you prefer to <a href="https://github.com/melange-re/melange-esy-template/generate" target="_blank" rel="noreferrer">start from a template</a>.</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;melange-project&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;dependencies&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;ocaml&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;5.1.x&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;@opam/dune&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&gt;= 3.8.0&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;@opam/melange&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;*&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;devDependencies&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;@opam/ocaml-lsp-server&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;*&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;esy&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;build&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &quot;dune build @melange&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>Run:</p><ol><li><code>esy install</code> to build and make all dependencies available</li><li><code>esy shell</code> to enter a Melange development environment</li></ol>`,33),l=[n];function h(p,r,k,o,g,d){return i(),s("div",null,l)}const m=a(t,[["render",h]]);export{E as __pageData,m as default};
