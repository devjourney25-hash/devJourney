"use client";

import { useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import axios from "axios";
import { Play, Code2, Terminal, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

const LANGUAGE_VERSIONS: Record<"javascript" | "python" | "java" | "php" | "cpp", string> = {
  javascript: "18.15.0",
  python: "3.10.0",
  java: "15.0.2",
  php: "8.2.3",
  cpp: "10.2.0",
};

const CODE_SNIPPETS: Record<keyof typeof LANGUAGE_VERSIONS, string> = {
  javascript: `function greet(name) {\n  console.log("Hello, " + name + "!");\n}\n\ngreet("Alex");`,
  python: `def greet(name):\n  print("Hello, " + name + "!")\n\ngreet("Alex")`,
  java: `public class HelloWorld {\n  public static void main(String[] args) {\n    System.out.println("Hello World");\n  }\n}`,
  php: `<?php\n\n$name = 'Alex';\necho $name;`,
  cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n  cout << "Hello, C++!" << endl;\n  return 0;\n}`,
};

const executeCode = async (language: keyof typeof LANGUAGE_VERSIONS, sourceCode: string) => {
  const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
    language,
    version: LANGUAGE_VERSIONS[language],
    files: [{ content: sourceCode }],
  });
  return response.data;
};

const IdePage = () => {
  const editorRef = useRef<any>(null);
  const [language, setLanguage] = useState<keyof typeof LANGUAGE_VERSIONS>("javascript");
  const [code, setCode] = useState(CODE_SNIPPETS["javascript"]);
  const [output, setOutput] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

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

  return (
    <div className="flex flex-col px-3 sm:px-6 py-4 sm:py-6 gap-4 sm:gap-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-700">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl sm:rounded-2xl"></div>
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Title Section */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="bg-blue-500/20 p-2 sm:p-3 rounded-lg sm:rounded-xl border border-blue-500/30">
              <Code2 className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
            </div>
            <div>
              <h1 className="text-xl sm:text-3xl font-bold text-white">Code Editor</h1>
              <p className="text-gray-400 text-xs sm:text-sm hidden sm:block">Write, compile, and run your code</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
            {/* Language Selector */}
            <div className="flex items-center gap-2 sm:gap-3 bg-slate-800/60 px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl border border-slate-700">
              <label htmlFor="language" className="text-xs sm:text-sm font-medium text-gray-400 whitespace-nowrap">
                Language:
              </label>
              <select
                id="language"
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
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                  <span className="hidden sm:inline">Running...</span>
                  <span className="sm:hidden">Run</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                  Run Code
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Editor and Output */}
      <div className="flex flex-col gap-4 sm:gap-6 flex-1">
        {/* Editor Panel */}
        <div className="w-full flex flex-col">
          <div className="flex items-center gap-2 bg-slate-800/60 px-3 sm:px-4 py-2 rounded-t-lg sm:rounded-t-xl border border-b-0 border-slate-700">
            <Code2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" />
            <span className="text-xs sm:text-sm font-medium text-gray-400">Editor</span>
          </div>
          <div className="rounded-b-lg sm:rounded-b-xl overflow-hidden border border-slate-700 shadow-2xl">
            <Editor
              height="300px"
              theme="vs-dark"
              language={language === "cpp" ? "cpp" : language}
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
        </div>

        {/* Output Panel */}
        <div className="w-full flex flex-col">
          <div className="flex items-center gap-2 bg-slate-800/60 px-3 sm:px-4 py-2 rounded-t-lg sm:rounded-t-xl border border-b-0 border-slate-700">
            <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400" />
            <span className="text-xs sm:text-sm font-medium text-gray-400">Output</span>
            {output && (
              <div className="ml-auto">
                {isError ? (
                  <div className="flex items-center gap-1 sm:gap-1.5 text-red-400 text-[10px] sm:text-xs">
                    <AlertCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span className="hidden sm:inline">Error</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 sm:gap-1.5 text-green-400 text-[10px] sm:text-xs">
                    <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span className="hidden sm:inline">Success</span>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700 p-4 sm:p-6 rounded-b-lg sm:rounded-b-xl overflow-y-auto shadow-2xl min-h-[250px] max-h-[400px]">
            {output ? (
              <pre
                className={`text-xs sm:text-sm font-mono whitespace-pre-wrap break-words ${
                  isError ? "text-red-400" : "text-green-300"
                }`}
              >
                {output.map((line, idx) => (
                  <div key={idx} className="py-0.5">
                    {line}
                  </div>
                ))}
              </pre>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 py-8">
                <Terminal className="w-12 h-12 sm:w-16 sm:h-16 mb-3 sm:mb-4 opacity-30" />
                <p className="text-sm sm:text-lg font-medium">No output yet</p>
                <p className="text-xs sm:text-sm mt-1 sm:mt-2 text-center px-4">Click "Run Code" to see the results</p>
              </div>
            )}
          </div>
        </div>
      </div>

    
    </div>
  );
};

export default IdePage;