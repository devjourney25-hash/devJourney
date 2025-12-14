"use client";
import { useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { Play, Code2, Terminal, Loader2, AlertCircle, CheckCircle2, Copy, Check } from "lucide-react";

const LANGUAGE_VERSIONS: Record<"javascript" | "python" | "java" | "php" | "cpp", string> = {
  javascript: "18.15.0",
  python: "3.10.0",
  java: "15.0.2",
  php: "8.2.3",
  cpp: "10.2.0",
};

const CODE_SNIPPETS: Record<keyof typeof LANGUAGE_VERSIONS, string> = {
  javascript: `function greet(name) {\n  console.log("Hello, " + name + "!");\n}\n\ngreet("Alex");`,
  python: `def greet(name):\n    print("Hello, " + name + "!")\n\ngreet("Alex")`,
  java: `public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello World");\n    }\n}`,
  php: `<?php\n\n$name = 'Alex';\necho "Hello, {$name}!";\n\n?>`,
  cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, C++!" << endl;\n    return 0;\n}`,
};

const executeCode = async (language: keyof typeof LANGUAGE_VERSIONS, sourceCode: string) => {
  const response = await fetch("https://emkc.org/api/v2/piston/execute", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      language,
      version: LANGUAGE_VERSIONS[language],
      files: [{ content: sourceCode }],
    }),
  });
  return await response.json();
};

const IdePage = () => {
  const editorRef = useRef<any>(null);
  const [language, setLanguage] = useState<keyof typeof LANGUAGE_VERSIONS>("javascript");
  const [code, setCode] = useState(CODE_SNIPPETS["javascript"]);
  const [output, setOutput] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);
  const [outputCopied, setOutputCopied] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current?.getValue();
    if (!sourceCode) return;

    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output?.split("\n"));
      setIsError(!!result.stderr);
    } catch (err: any) {
      setOutput([err.message || "Failed to run code."]);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const copyCode = async () => {
    const sourceCode = editorRef.current?.getValue();
    if (!sourceCode) return;
    
    try {
      await navigator.clipboard.writeText(sourceCode);
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  const copyOutput = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output.join("\n"));
      setOutputCopied(true);
      setTimeout(() => setOutputCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy output:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-2 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          {/* Title Section */}
          <div className="mb-3 sm:mb-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">
              Code Editor
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm">Write, compile, and run your code</p>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            {/* Language Selector */}
            <div className="flex items-center gap-2 flex-1">
              <label className="text-slate-300 text-xs sm:text-sm font-medium whitespace-nowrap">
                Language:
              </label>
              <select
                value={language}
                onChange={(e) => {
                  const lang = e.target.value as keyof typeof LANGUAGE_VERSIONS;
                  setLanguage(lang);
                  setCode(CODE_SNIPPETS[lang]);
                }}
                className="bg-slate-700 border border-slate-600 text-white text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer flex-1 sm:flex-initial"
              >
                {Object.entries(LANGUAGE_VERSIONS).map(([lang, version]) => (
                  <option key={lang} value={lang}>
                    {lang.charAt(0).toUpperCase() + lang.slice(1)} ({version})
                  </option>
                ))}
              </select>
            </div>

            {/* Run Button */}
            <button
              onClick={runCode}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 px-4 sm:px-6 py-1.5 sm:py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-blue-500/50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
                  <span className="hidden sm:inline">Running...</span>
                  <span className="sm:hidden">Run</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 sm:w-4 sm:h-4" />
                  Run Code
                </>
              )}
            </button>
          </div>
        </div>

        {/* Editor and Output */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
          {/* Editor Panel */}
          <div className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
            <div className="flex justify-between items-center px-4 py-2 bg-slate-700/50 border-b border-slate-600">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-slate-300">Editor</span>
              </div>
              <button
                onClick={copyCode}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs bg-slate-600 hover:bg-slate-500 text-white rounded transition-colors"
              >
                {codeCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copy Code
                  </>
                )}
              </button>
            </div>
            <Editor
              height="60vh"
              theme="vs-dark"
              language={language}
              value={code}
              onMount={(editor) => (editorRef.current = editor)}
              onChange={(value) => setCode(value || "")}
              options={{
                minimap: { enabled: false },
                fontSize: 12,
                lineNumbers: "on",
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 2,
                wordWrap: "on",
                padding: { top: 10, bottom: 10 },
              }}
            />
          </div>

          {/* Output Panel */}
          <div className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
            <div className="flex justify-between items-center px-4 py-2 bg-slate-700/50 border-b border-slate-600">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-green-400" />
                <span className="text-sm font-medium text-slate-300">Output</span>
                {output && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-400">
                    {isError ? (
                      <span className="flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 text-red-400" />
                        Error
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-green-400" />
                        Success
                      </span>
                    )}
                  </span>
                )}
              </div>
              {output && (
                <button
                  onClick={copyOutput}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs bg-slate-600 hover:bg-slate-500 text-white rounded transition-colors"
                >
                  {outputCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy Output
                    </>
                  )}
                </button>
              )}
            </div>

            <div className="h-[60vh] overflow-y-auto p-4">
              {output ? (
                <pre className={`text-xs sm:text-sm font-mono ${isError ? "text-red-400" : "text-green-400"}`}>
                  {output.map((line, idx) => (
                    <div key={idx}>{line}</div>
                  ))}
                </pre>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-500">
                  <Terminal className="w-12 h-12 mb-3 opacity-50" />
                  <p className="text-sm font-medium">No output yet</p>
                  <p className="text-xs mt-1">Click "Run Code" to see the results</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdePage;