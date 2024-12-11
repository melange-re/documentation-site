---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Melange"
  text: "OCaml for JavaScript developers."
  tagline: Start building highly maintainable applications that can run on millions of devices.
  actions:
    - theme: brand
      text: Get started
      link: /getting-started
    - theme: alt
      text: Playground
      link: /playground/
      target: '_self'

features:
  - title: A Solid Type System
    details: Melange leverages OCaml's powerful type system to catch more bugs at compile time. Large, complex codebases become easy to maintain and refactor.
  - title: First-Class Editor and Tooling
    details: Melange fully utilizes the power of <a href="https://ocaml.org/docs/platform">the OCaml Platform</a> to provide integrations with editors such as VSCode, Vim, or Emacs, with features like type inspection, autocomplete, and more. It also has first-class integration with <a href="https://dune.build/">Dune</a>, OCaml's most used build system.
  - title: JavaScript Integration
    details: Use existing JavaScript packages from NPM, or your own JavaScript libraries in your projects. With an expressive bindings language, and an ergonomic compilation model, Melange can help you build robust applications that leverage functionality from the JavaScript ecosystem.
  - title: Stable and Industry Backed
    details: Melange builds on top of decades of type system research, compiler engineering and tooling development to provide a polished developer experience. Companies like Ahrefs use Melange daily to deploy web applications for their users.

---
<script setup>
import Users from '.vitepress/theme/Users.vue'
</script>

<Users />
