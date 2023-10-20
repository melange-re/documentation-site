# Celsius Converter using Option

After all the changes we made in the last chapter, your `CelsiusConverter.re`
might look something like this:

```reasonml
let getValueFromEvent = (evt): string => ReactEvent.Form.target(evt)##value;

let convert = celsius => 9.0 /. 5.0 *. celsius +. 32.0;

[@react.component]
let make = () => {
  let (celsius, setCelsius) = React.useState(() => "");

  <div>
    <input
      value=celsius
      onChange={evt => {
        let newCelsius = getValueFromEvent(evt);
        setCelsius(_ => newCelsius);
      }}
    />
    {React.string({js|°C = |js})}
    {(
       celsius == ""
         ? {js|? °F|js}
         : (
           switch (
             celsius
             |> float_of_string
             |> convert
             |> Js.Float.toFixedWithPrecision(~digits=2)
           ) {
           | exception _ => "error"
           | fahrenheit => fahrenheit ++ {js| °F|js}
           }
         )
     )
     |> React.string}
  </div>;
};
```

What happens if you forget the `| exception _` branch of your switch expression?
Your program will crash when invalid input is entered. The compiler won't warn
you to add an exception branch because it doesn't keep track of which functions
throw exceptions. Next, we'll show you a better way which completely avoids
functions that can fail in unexpected ways.

Refactor the switch expression to use `float_of_string_opt` instead. This
function has the type signature `string => option(float)`. It takes a `string`
argument and returns `Some(number)` if it succeeds and `None` if it
fails---meaning that even if this function fails, no exception is raised.

<!--#prelude#
let celsius = "1";
let convert = x => x;
let _ =
-->
```reasonml
switch (celsius |> float_of_string_opt) {
| None => "error"
| Some(fahrenheit) =>
  (
    fahrenheit
    |> convert
    |> Js.Float.toFixedWithPrecision(~digits=2)
  )
  ++ {js| °F|js}
}
```

In terms of functionality, this does exactly what the previous version did. But
a critical difference is that if you comment out the `| None` branch, the
compiler will refuse to accept it:

```
File "src/CelsiusConverter.re", lines 21-32, characters 11-10:
21 | ...........(
22 |            switch (celsius |> float_of_string_opt) {
23 |            //  | None => "error"
24 |            | Some(fahrenheit) =>
25 |              (
...
29 |              )
30 |              ++ {js| °F|js}
31 |            }
32 |          )
Error (warning 8 [partial-match]): this pattern-matching is not exhaustive.
Here is an example of a case that is not matched:
None
```

You would get a similar error if you left off the `| Some(_)` branch. Having an
`option` value be the input for a switch expression means that you can't forget
to handle the failure case, much less the success case. There's another
advantage: The `| Some(fahrenheit)` branch gives you access to the `float` that
was successfully converted from the `string`, and *only this branch* has access
to that value. So you can be reasonably sure that the success case is handled
here and not somewhere else. You are starting to experience the power of
[pattern matching](https://reasonml.github.io/docs/en/pattern-matching) in
OCaml.

It's a shame we had to give up the long chain of function calls from when we
were still using `float_of_string`:

<!--#prelude#
let celsius = "1";
let convert = x => x;
let _ =
-->
```reasonml
celsius
|> float_of_string
|> convert
|> Js.Float.toFixedWithPrecision(~digits=2)
```

Actually, we can still use a very similar chain of functions with
`float_of_string_opt` if we make a couple of small additions:

<!--#prelude#
let celsius = "1";
let convert = x => x;
let _ =
-->
```reasonml
celsius
|> float_of_string_opt
|> Option.map(convert)
|> Option.map(Js.Float.toFixedWithPrecision(~digits=2))
```

`Option.map` takes a function and an `option` value, and only invokes the
function if the `option` was `Some(_)`. Hovering over it, you can see that its
type signature is:

```
('a => 'b, option('a)) => option('b)
```

Breaking the type signature down:

- The first argument, `'a => 'b`, is function which accepts a value of type `'a`
(placeholder for any type) and returns a value of type `'b` (also a placeholder
for any type, though it may be a different type than `'a`).
- The second argument, `option('a)`, is an `option` that wraps around a
value of type `'a`.
- The return type of `Option.map` is `option('b)`, which is an `option`
that wraps around a value of type `'b`.

The implementation of `Option.map` is fairly straightforward, consisting of a
single switch expression:

```reasonml
let map = (func, option) =>
  switch (option) {
  | None => None
  | Some(v) => Some(func(v))
  };
```

You may be interested in browsing the many other helper functions related to
`option` in the standard library's [Option
module](https://melange.re/v2.0.0/api/re/melange/Stdlib/Option/).

At this point, your switch expression might look like this:

<!--#prelude#
let celsius = "1";
let convert = x => x;
let _ =
-->
```reasonml
switch (
  celsius
  |> float_of_string_opt
  |> Option.map(convert)
  |> Option.map(Js.Float.toFixedWithPrecision(~digits=2))
) {
| None => "error"
| Some(fahrenheit) => fahrenheit ++ {js| °F|js}
}
```

What if we wanted to render a message of complaint when the temperature goes
above 212° F (the boiling point of water) and not even bother to render the
converted number? It could look like this:

<!--#prelude#
let celsius = "1";
let convert = x => x;
let _ =
-->
```reasonml
switch (celsius |> float_of_string_opt |> Option.map(convert)) {
| None => "error"
| Some(fahrenheit) =>
  fahrenheit > 212.0
    ? {js|Unreasonably hot🥵|js}
    : Js.Float.toFixedWithPrecision(fahrenheit, ~digits=2)
      ++ {js| °F|js}
}
```

This works, but OCaml gives you a construct that allows you to do the float
comparison without using a nested ternary expression:

<!--#prelude#
let celsius = "1";
let convert = x => x;
let _ =
-->
```reasonml
switch (celsius |> float_of_string_opt |> Option.map(convert)) {
| None => "error"
| Some(fahrenheit) when fahrenheit > 212.0 => {js|Unreasonably hot🥵|js}
| Some(fahrenheit) =>
  Js.Float.toFixedWithPrecision(fahrenheit, ~digits=2)
  ++ {js| °F|js}
}
```

The [when guard](https://reasonml.github.io/docs/en/pattern-matching#when)
allows you to add extra conditions to a switch expression branch, keeping
nesting of conditionals to a minimum and making your code more readable.

Hooray! Our Celsius converter is finally complete. Later, we'll see how to
[create a component that can convert back and forth between Celsius and
Fahrenheit](todo.md). But first, we'll explore [Dune, the build
system](../build-system.md) used by Melange.

## Exercises

<b>1.</b> If you enter a space in the input, it'll unintuitively produce a
Fahrenheit value of 32.00 degrees (because `float_of_string_opt(" ") ==
Some(0.)`). Handle this case correctly by showing "? °F" instead. Hint: Use the
`String.trim` function.

<b>2.</b> Add another branch with a `when` guard that renders "Unreasonably
cold🥶" if the temperature is less than -128.6°F (the lowest temperature
ever recorded on Earth).

<b>3.</b> Use `Js.Float.fromString` instead of `float_of_string_opt` to parse a
string to float. Hint: Use `Js.Float.isNaN`.

## Overview

- Prefer functions that return `option` over those that throw exceptions.
    - When the input of a switch expression is `option`, the compiler can
    helpfully remind you to handle the error case.
- `Option.map` is very useful when chaining functions that return `option`.
- You can use a `when` guard to make your switch expression more expressive
  without nesting conditionals.

## Solutions

<b>1.</b> To prevent a space from producing 32.00 degrees Fahrenheit, just add a
call to `String.trim` in your render logic:

<!--#prelude#
let celsius = "1";
let convert = x => x;
let _ =
-->
```reasonml
{(
  String.trim(celsius) == ""
    ? {js|? °F|js}
    : (
      switch (celsius |> float_of_string_opt |> Option.map(convert)) {
      | None => "error"
      | Some(fahrenheit) when fahrenheit > 212.0 => {js|Unreasonably hot🥵|js}
      | Some(fahrenheit) =>
        Js.Float.toFixedWithPrecision(fahrenheit, ~digits=2)
        ++ {js| °F|js}
      }
    )
)
|> React.string}
```

<b>2.</b> To render "Unreasonably cold" when the temperature is less than
-128.6°F, you can add another `Some(fahrenheit)` branch with a `when` guard:

<!--#prelude#
let celsius = "1";
let convert = x => x;
let _ =
-->
```reasonml
switch (celsius |> float_of_string_opt |> Option.map(convert)) {
| None => "error"
| Some(fahrenheit) when fahrenheit < (-128.6) => {js|Unreasonably cold🥶|js}
| Some(fahrenheit) when fahrenheit > 212.0 => {js|Unreasonably hot🥵|js}
| Some(fahrenheit) =>
  Js.Float.toFixedWithPrecision(fahrenheit, ~digits=2)
  ++ {js| °F|js}
}
```

<b>3.</b> To use `Js.Float.fromString` instead of `float_of_string_opt`, you can
define a new helper function that takes a `string` and returns `option`:

```reasonml
let floatFromString = text => {
  let value = Js.Float.fromString(text);
  Js.Float.isNaN(value) ? None : Some(value);
};
```

Then substitute `float_of_string_opt` with `floatFromString` in your switch
expression:

<!--#prelude#
let celsius = "1";
let convert = x => x;
let floatFromString = float_of_string_opt;
let _ =
-->
```reasonml
switch (celsius |> floatFromString |> Option.map(convert)) {
| None => "error"
| Some(fahrenheit) when fahrenheit < (-128.6) => {js|Unreasonably cold🥶|js}
| Some(fahrenheit) when fahrenheit > 212.0 => {js|Unreasonably hot🥵|js}
| Some(fahrenheit) =>
  Js.Float.toFixedWithPrecision(fahrenheit, ~digits=2)
  ++ {js| °F|js}
}
```

-----

[Source code for this
chapter](https://github.com/melange-re/melange-for-react-devs/blob/develop/src/celsius-converter-option/)
can be found in the [Melange for React Developers
repo](https://github.com/melange-re/melange-for-react-devs).
