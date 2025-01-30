import "./App.css";
import "../../_build/default/playground/reason-react-cmijs";
import "../../_build/default/playground/routes-cmijs";
import "../../_opam/bin/mel_playground.bc";
import "../../_opam/bin/melange-cmijs";
import "../../_build/default/playground/format.bc.js";

import * as React from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { useWorkerizedReducer } from "use-workerized-reducer/react";
import { useDebounce } from 'use-debounce';
import { AlignLeft, Code2, Zap, Package, ArrowUpFromLine, ArrowDownToLine, Eraser, ArrowLeftToLine, ArrowRightToLine, Github } from 'lucide-react';

import * as Console from "./console";
import * as Router from './router';
import { Toaster } from './toaster';
import { useLocalStorage } from './local-storage';
import { useHover } from './hover';
import examples from "./examples";
import { language as OCamlSyntax } from "./syntax/ml";
import { language as ReasonSyntax } from "./syntax/re";
import ExamplesDropdown from './examples-dropdown.jsx';
import ShareToast from './share-toast';

const languageMap = {
  Reason: "Reason",
  OCaml: "OCaml",
};

const LIVE_PREVIEW = {
  ON: "on",
  OFF: "off",
};

// Spin up the worker running the reducers.
const worker = new Worker(new URL("./worker.js", import.meta.url), {
  type: "module",
});

function OCamlLogo() {
  return <span className="SquareLogo OCaml"></span>
}
function ReasonLogo() {
  return <span className="SquareLogo Reason"></span>
}

const classNames = (...classes) =>
  classes.reduce((className, current) =>
    className.concat(
      typeof current == 'string'
        ? current
        : Array.isArray(current)
          ? classNames(...current)
          : typeof current == 'object' && current
            ? Object.keys(current).map(key => current[key] ? key : '')
            : ''
    ), []).join(' ');

function VisuallyHidden({ when, children }) {
  return (
    <div
      style={when ? {
        position: "absolute",
        top: "-10000px",
        left: "-10000px",
        visibility: "hidden",
      } : {
        visibility: "visible",
        flex: "1"
      }}
    >
      {children}
    </div>
  );
}

function Counter({ count }) {
  return <span className="Counter">{count}</span>;
}

function LanguageToggle({ language, onChange }) {
  return (
    <div className="Tabs">
      <button
        className={
          classNames(["IconButton",
            language === languageMap.OCaml ? "active" : ""])}
        onClick={() => onChange(languageMap.OCaml)}
      >
        <OCamlLogo />
        OCaml
      </button>
      <button
        className={
          classNames(["IconButton",
            language === languageMap.Reason ? "active" : ""
          ])}
        onClick={() => onChange(languageMap.Reason)}
      >
        <ReasonLogo />
        Reason
      </button>
    </div>
  );
}

function Sidebar({ onExampleClick }) {
  const [sidebarColapsed, setSidebarColapsed] = React.useState(false);
  const toggleSidebar = () => setSidebarColapsed(!sidebarColapsed);
  const isExpanded = !sidebarColapsed;

  return (
    <div className={"Sidebar"}>
      <div className="Menu">
        <div className="ActionMenu">
          <hr className="Separator" />
          <div className="ActionItem">
            <ShareToast isExpanded={isExpanded} />
          </div>
          <hr className="Separator" />
          <div className="ActionItem">
            <ExamplesDropdown isExpanded={isExpanded} onExampleClick={onExampleClick} />
          </div>
          {/* <div className="ActionItem">
            <button className="IconButton" onClick={_ => alert("Nothing yet")}><Settings />{isExpanded ? "Settings" : null}</button>
          </div> */}
          <hr className="Separator" />
          <div className="ActionItem">
            <a className="IconButton" href="https://github.com/melange-re/melange" target="_blank"><Github />{isExpanded ? "GitHub" : null}</a>
          </div>
          <div className="ActionItem">
            <a className="IconButton" href="https://opam.ocaml.org/packages/melange" target="_blank"><Package />{isExpanded ? "OPAM" : null}</a>
          </div>
        </div>
        <div className="ActionItem">
          {isExpanded ? (<div className="Info">
            <div className="Versions">
              <span className="Version">
                <span className="Text-xs">{"Melange"}</span>
                <span className="Text-xs Number">{"4.0.0-52"}</span>
              </span>
              <span className="Version">
                <span className="Text-xs">{"OCaml"}</span>
                <span className="Text-xs Number">{"5.2.0"}</span>
              </span>
              <span className="Version">
                <span className="Text-xs">{"Reason"}</span>
                <span className="Text-xs Number">{"3.14.0"}</span>
              </span>
              <span className="Version">
                <span className="Text-xs">{"ReasonReact"}</span>
                <span className="Text-xs Number">{"0.15.0"}</span>
              </span>
            </div>
          </div>) : null}
        </div>
        <hr className="Separator" />
        <button className="IconButton" onClick={(_) => toggleSidebar()}>
          {sidebarColapsed ?
            <ArrowRightToLine /> : <ArrowLeftToLine />}
        </button>
      </div>
    </div>
  );
}

function Live({ codeHasReact }) {
  /* codeHasReact is a prop to trigger a re-render of #preview, since when
  ReactDOM mounts a component under a React tree, you can't use `unmountComponentAtNode`
  since React considers as part of VDOM. */
  return (
    <div className="Live">
      {!codeHasReact ?
        <div id="preview" key="empty">
          <div className="EmptyPreview">
            <p className="Text-m">
              This div has the ID selector <code>preview</code>.
            </p>
            <br />
            <p className="Text-m">
              Choose "React Greetings" in the Examples menu to see it in action, or
              override by rendering into the element with <code>ReactDOM.querySelector("#preview")</code>
            </p>
          </div>
        </div> : <div id="preview" key="react" />}
    </div>
  );
}

function ConsolePanel({ logCaptures, clearLogs }) {
  const defaultState = false;
  const [isCollapsed, setIsCollapsed] = React.useState(defaultState);
  const panelRef = React.useRef(null);

  const toggle = (_) => {
    const panel = panelRef.current;
    const isCollapsed = panel?.getCollapsed();
    if (panel && isCollapsed) {
      panel.expand();
      setIsCollapsed(false);
    } else if (panel && !isCollapsed) {
      panel.collapse();
      setIsCollapsed(true);
    }
  };

  const [automaticScroll, setAutomaticScroll] = React.useState(true);
  const bottomOfTheConsole = React.useRef(null);
  const rootElement = React.useRef(null);
  useHover(rootElement, () => setAutomaticScroll(false));

  React.useEffect(() => {
    if (automaticScroll) {
      bottomOfTheConsole.current.scrollIntoView();
    }
  }, [logCaptures, automaticScroll]);

  const onClick = (_) => clearLogs();

  return (
    <>
      <div className="ConsoleHeader">
        <div className="Title">
          <span className="Text-xs">Console</span>
          <Counter count={logCaptures.length} />
        </div>
        <div className="Actions">
          <button className="IconButton Clear" onClick={onClick}><Eraser /></button>
          <button className="IconButton" onClick={toggle}>{isCollapsed ? <ArrowUpFromLine /> : <ArrowDownToLine />}</button>
        </div>
      </div>
      <Panel ref={panelRef} collapsible={true} defaultSize={20}>
        <div ref={rootElement} className="Console Scrollbar">
          {logCaptures.map((capture, i) => {
            let log = capture.args.join(" ");
            return <div className="Item" key={i} style={capture.kind === "error" ? { color: "red" } : {}}>{log}</div>
          })}
          <div className="EmptyItem" ref={bottomOfTheConsole} />
        </div>
      </Panel>
    </>
  )
}

function ProblemsPanel({ problems, warnings }) {
  const defaultState = false;
  const [isCollapsed, setIsCollapsed] = React.useState(defaultState);
  const ref = React.useRef(null);

  const toggle = (_) => {
    const panel = ref.current;
    const isCollapsed = panel?.getCollapsed();
    if (panel && isCollapsed) {
      panel.expand();
      setIsCollapsed(false);
    } else if (panel && !isCollapsed) {
      panel.collapse();
      setIsCollapsed(true);
    }
  };

  const problemsString =
    problems && problems.length > 0
      ? problems.map((v) => v.msg).join("\n")
      : "";

  const warningsString =
    warnings && warnings.length > 0
      ? warnings.map((v) => v.msg).join("\n")
      : "";

  return (
    <>
      <div className="ProblemsHeader">
        <span className="Text-xs">Problems</span>
        <button className="IconButton" onClick={toggle}>{isCollapsed ? <ArrowUpFromLine /> : <ArrowDownToLine />}</button>
      </div>
      <Panel collapsible={true} defaultSize={20} collapsedSize={10} minSize={10} ref={ref}>
        {(problems && problems.length > 0)
          ? <div className="Problems Scrollbar">{problemsString}</div>
          : (warnings && warnings.length > 0)
            ? <div className="Problems Scrollbar">{warningsString}</div>
            : <div className="Problems Empty">No problems!</div>
        }
      </Panel>
    </>
  )
}

const encodeCode = (store) => {
  try {
    let encoded = btoa(store?.code || "");
    return { ...store, code: encoded }
  } catch (e) {
    return store
  }
};

const decodeCode = (store) => {
  try {
    let decoded = atob(store?.code || "");
    return { ...store, code: decoded }
  } catch (e) {
    return store
  }
};

function useStore(defaultValue) {
  /* This store gets the data from LocalStorage and the URL (queryParams),
    and needs a defaultValue in case of both being empty.

    The URL has priority over LocalStorage: to make sure people who recieve
    a URL with queryParams reads the values from the URL instead of the last LocalStorage session.

    When updating the store, set's a React state, updates LocalStorage and URL.
  */
  const LOCAL_STORAGE_ITEM = "__store"
  const [search, setSearch] = Router.useSearchParams();
  const [localStorage, setLocalStorage] = useLocalStorage(LOCAL_STORAGE_ITEM, defaultValue);
  const keys = Object.keys(defaultValue);
  /* Get only searchParams that we care (from defaultValue keys) */
  const knownSearchParams = Object.entries(search).map(([key, value]) => {
    if (keys.includes(key)) {
      return [key, value]
    } else {
      return null
    }
  }).filter(a => !!a) || [];
  const initialStateFromUrl = knownSearchParams.reduce((previous, [key, value]) => {
    return { ...previous, [key]: value }
  }, {});
  const initialValue = decodeCode({ ...localStorage, ...initialStateFromUrl });
  const [state, setState] = React.useState(initialValue);

  React.useEffect(() => {
    let encodedeState = encodeCode(state);
    setSearch(encodedeState);
    setLocalStorage(encodedeState);
  }, [state])

  return [state, setState];
};

function formatOCaml(code) {
  let result = window.ocamlformat.format(code);
  if (!Array.isArray(result)) {
    return code;
  }
  // result is [int, string]
  //           int -> represents (0) Ok, (1) Error
  //           string -> the formated code or the error message
  const kind = result[0];
  const payload = result[1];
  const OK = 0;
  const ERROR = 1;
  if (kind === OK) {
    return payload
  } else if (kind === ERROR) {
    console.log(payload)
    return code
  }
};

const formatReason = (code) => {
  try {
    return ocaml.printRE(ocaml.parseRE(code));
  } catch (e) {
    console.log(e);
    return code;
  }
}

function OutputEditor({ language, value }) {
  return (
    <div className="Editor">
      <Editor
        theme="vs-dark"
        options={{
          readOnly: true,
          minimap: {
            enabled: false,
          },
        }}
        height="100%"
        language={language}
        value={value}
      />
    </div>
  )
}

const problemFromCompile = ({
  js_warning_error_msg,
  row,
  column,
  endRow,
  endColumn,
  text,
}) => ({
  msg: js_warning_error_msg,
  loc: {
    row: row + 1,
    column: column + 1,
    endRow: endRow + 1,
    endColumn: endColumn + 1,
    text: text,
  },
});

const toMonaco = (severity) => (problem) => ({
  startLineNumber: problem.loc.row,
  startColumn: problem.loc.column,
  endLineNumber: problem.loc.endRow,
  endColumn: problem.loc.endColumn,
  message: problem.msg,
  severity: severity,
});

const compile = (language, code) => {
  let compilation = undefined
  try {
    compilation = language == languageMap.Reason
      ? ocaml.compileRE(code)
      : ocaml.compileML(code);
  } catch (error) {
    compilation = { js_warning_error_msg: error.message };
  }

  if (compilation) {
    let problems = undefined;
    if (compilation.js_warning_error_msg) {
      problems = [problemFromCompile(compilation)];
    } else if (compilation.warning_errors) {
      problems = compilation.warning_errors.map(problemFromCompile);
    }
    if (problems) {
      return {
        typeHints: [],
        warnings: [],
        problems: problems,
      }
    } else {
      return {
        typeHints: compilation.type_hints.sort((a, b) => {
          let aLineGap = a.end.line - a.start.line;
          let bLineGap = b.end.line - b.start.line;
          if (aLineGap < bLineGap) {
            return -1;
          } else if (aLineGap > bLineGap) {
            return 1;
          } else {
            let aColGap = a.end.col - a.start.col;
            let bColGap = b.end.col - b.start.col;
            if (aColGap < bColGap) {
              return -1;
            } else if (aColGap > bColGap) {
              return 1;
            } else {
              return 0;
            }
          }
        }),
        javascriptCode: compilation.js_code,
        warnings: compilation.warnings.map(problemFromCompile),
      }
    }
  } else {
    return {
      typeHints: [],
      warnings: [],
      problems: [
        {
          js_warning_error_msg: "No result was returned from compilation",
          row,
          column,
          endRow,
          endColumn,
          text: "No result was returned from compilation",
        },
      ],
    }
  }
};

function updateMarkers(monaco, editorRef, compilation) {
  if (monaco && editorRef.current) {
    const owner = "playground";
    if (compilation?.problems) {
      monaco.editor.setModelMarkers(
        editorRef.current.getModel(),
        owner,
        compilation.problems.map(toMonaco(monaco.MarkerSeverity.Error))
      );
    } else if (compilation?.warnings) {
      monaco.editor.setModelMarkers(
        editorRef.current.getModel(),
        owner,
        compilation.warnings.map(toMonaco(monaco.MarkerSeverity.Warning))
      );
    } else {
      monaco.editor.removeAllMarkers(owner);
    }
  }
}

function App() {
  const defaultState = {
    language: languageMap.OCaml,
    code: examples[0].ml,
    live: LIVE_PREVIEW.OFF
  };
  const [state, setState] = useStore(defaultState);
  const { language, code, live } = state;
  const [debouncedCode] = useDebounce(code, 300);

  const compilation = React.useMemo(() => compile(language, debouncedCode), [debouncedCode]);

  const [workerState, dispatch, _busy] = useWorkerizedReducer(
    worker,
    "bundle", // Reducer name
    { logCaptures: [] } // Initial state
  );

  const setLive = (live) => setState({ ...state, live });
  const setCode = (code) => setState({ ...state, code });
  const setInput = ({ language, code }) => setState({ ...state, language, code });

  const editorRef = React.useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    updateMarkers(monaco, editorRef, compilation);
  }

  function clearLogs() {
    dispatch({ type: "clear.logCaptures" });
    Console.flush();
  }

  const monaco = useMonaco();

  React.useEffect(() => {
    // or make sure that it exists by other ways
    if (monaco) {
      monaco.languages.register({ id: languageMap.OCaml });
      monaco.languages.setMonarchTokensProvider(languageMap.OCaml, OCamlSyntax);
      monaco.languages.register({ id: languageMap.Reason });
      monaco.languages.setMonarchTokensProvider(languageMap.Reason, ReasonSyntax);
    }
  }, [monaco]);

  React.useEffect(() => {
    let hoverProvider = undefined;
    if (monaco) {
      hoverProvider = monaco.languages.registerHoverProvider(language, {
        provideHover: function (model, position) {
          const { lineNumber, column } = position;
          if (!compilation?.typeHints) {
            return null;
          } else {
            function hintInLoc(item) {
              var end = item.end;
              var start = item.start;
              const result =
                lineNumber >= start.line &&
                lineNumber <= end.line &&
                column >= start.col + 1 &&
                column <= end.col + 1;
              return result;
            };
            const result = compilation?.typeHints.find(hintInLoc);
            if (result) {
              const range = new monaco.Range(
                result.start.line,
                result.start.col + 1,
                result.end.line,
                result.end.col + 1
              );
              let hint = result.hint;
              if (language == languageMap.Reason) {
                try {
                  if (hint.substring(0, 5) === "type ") {
                    // No need to mess with the hint as it should be valid AST
                    hint = ocaml.printRE(ocaml.parseML(hint));
                  } else {
                    const prefix = "type t = ";
                    // Must be something else than a type
                    hint =
                      ocaml
                        /* add prefix so it is valid code */
                        .printRE(ocaml.parseML(prefix + hint))
                        /* remove prefix */
                        .slice(prefix.length)
                        /* remove last `;` */
                        .slice(0, -2);
                  }

                } catch (e) {
                  console.error("Error formatting type hint: ", hint);
                }
              }
              return {
                range,
                contents: [{ value: `\`\`\`${language}\n${hint}\n\`\`\`` }],
              };
            } else {
              return null;
            }
          }
        },
      });
    }
    return () => {
      if (hoverProvider) {
        hoverProvider.dispose();
      }
    }
  }, [monaco, compilation?.typeHints]);

  React.useEffect(() => {
    updateMarkers(monaco, editorRef, compilation)
  }, [monaco, compilation?.problems, compilation?.warnings]);

  React.useEffect(() => {
    if (workerState.bundledCode) {
      Console.start();
      // https://github.com/rollup/rollup/wiki/Troubleshooting#avoiding-eval
      const eval2 = eval;
      try {
        eval2(workerState.bundledCode);
      } catch (e) {
        console.error(e);
      }
      Console.stop();
    }
  }, [workerState.bundledCode]);

  React.useEffect(() => {
    if (compilation?.javascriptCode) {
      dispatch({ type: "bundle", code: compilation?.javascriptCode });
    }
  }, [compilation?.javascriptCode]);

  const onLanguageToggle = (newLanguage) => {
    const sameLanguage = newLanguage == language;
    if (sameLanguage) {
      return
    }

    if (newLanguage == languageMap.Reason) {
      try {
        let newReasonCode = ocaml.printRE(ocaml.parseML(code))
        setInput({ language: newLanguage, code: newReasonCode });
      } catch (error) {
        setInput({ language: newLanguage, code });
        console.log(error);
      }
    } else if (newLanguage == languageMap.OCaml) {
      try {
        let newOCamlCode = ocaml.printML(ocaml.parseRE(code));
        setInput({ language: newLanguage, code: newOCamlCode });
      } catch (error) {
        setInput({ language: newLanguage, code });
        console.log(error);
      }
    } else {
      return
    }
  };

  const formatCode = React.useCallback(() => {
    if (language == languageMap.Reason) {
      let newReasonCode = formatReason(code);
      setCode(newReasonCode);
    } else {
      let newOCamlCode = formatOCaml(code);
      setCode(newOCamlCode);
    }
  }, [language, code]);

  return (
    <div className="App">
      <div className="Layout">
        <Toaster />
        <PanelGroup direction="horizontal">
          <Sidebar
            onExampleClick={(example) => {
              let code = language == languageMap.Reason ? example.re : example.ml;
              setInput({ language, code });
            }}
          />
          <Panel collapsible={false} defaultSize={45} minSize={15}>
            <PanelGroup direction="vertical">
              <Panel collapsible={false} defaultSize={80}>
                <div className="Toolbar">
                  <LanguageToggle
                    language={language}
                    onChange={onLanguageToggle}
                  />
                  <button className="IconButton" onClick={formatCode}><AlignLeft />{"Format"}</button>
                </div>
                <div className="Left">
                  <div className="Editor">
                    <Editor
                      options={{
                        minimap: {
                          enabled: false,
                        },
                      }}
                      theme="vs-dark"
                      height="100%"
                      language={language}
                      value={code}
                      onMount={handleEditorDidMount}
                      onChange={setCode}
                    />
                  </div>
                </div>
              </Panel>
              <PanelResizeHandle className="ResizeHandle" />
              <ProblemsPanel warnings={compilation?.warnings} problems={compilation?.problems} />
            </PanelGroup>
          </Panel>
          <PanelResizeHandle className="ResizeHandle" />
          <Panel collapsible={false} defaultSize={45} minSize={15}>
            <div className="Right">
              <PanelGroup direction="vertical">
                <Panel collapsible={false} defaultSize={80}>
                  <div className="Expand">
                    <div className="Tabs ToEnd">
                      <button
                        className={classNames(["IconButton", live === LIVE_PREVIEW.ON ? "active" : ""])}
                        onClick={() => setLive(LIVE_PREVIEW.ON)}>
                        <Zap />
                        Live</button>
                      <button
                        className={classNames(["IconButton", live === LIVE_PREVIEW.OFF ? "active" : ""])}
                        onClick={() => setLive(LIVE_PREVIEW.OFF)}>
                        <Code2 />
                        JavaScript output</button>
                    </div>
                    <VisuallyHidden when={live === LIVE_PREVIEW.OFF}>
                      <Live codeHasReact={compilation?.javascriptCode?.includes(`"react-dom"`)} />
                    </VisuallyHidden>
                    <VisuallyHidden when={live === LIVE_PREVIEW.ON}>
                      <OutputEditor
                        language={compilation?.problems ? "text" : "javascript"}
                        value={compilation?.javascriptCode || "Check the 'Problems' panel."}
                        onMount={handleEditorDidMount}
                      />
                    </VisuallyHidden>
                  </div>
                </Panel>
                <PanelResizeHandle className="ResizeHandle" />
                <ConsolePanel logCaptures={workerState.logCaptures} clearLogs={clearLogs} />
              </PanelGroup>
            </div>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}

export default App;
