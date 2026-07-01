var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e) {
    throw err = [e], e;
  }
};
var __commonJS = (cb, mod) => function __require2() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/unenv/dist/runtime/_internal/utils.mjs
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
// @__NO_SIDE_EFFECTS__
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name(() => {
    throw /* @__PURE__ */ createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
// @__NO_SIDE_EFFECTS__
function notImplementedAsync(name) {
  const fn = /* @__PURE__ */ notImplemented(name);
  fn.__promisify__ = () => /* @__PURE__ */ notImplemented(name + ".__promisify__");
  fn.native = fn;
  return fn;
}
// @__NO_SIDE_EFFECTS__
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
var init_utils = __esm({
  "node_modules/unenv/dist/runtime/_internal/utils.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    __name(createNotImplementedError, "createNotImplementedError");
    __name(notImplemented, "notImplemented");
    __name(notImplementedAsync, "notImplementedAsync");
    __name(notImplementedClass, "notImplementedClass");
  }
});

// node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin, _performanceNow, nodeTiming, PerformanceEntry, PerformanceMark, PerformanceMeasure, PerformanceResourceTiming, PerformanceObserverEntryList, Performance, PerformanceObserver, performance;
var init_performance = __esm({
  "node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
    _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
    nodeTiming = {
      name: "node",
      entryType: "node",
      startTime: 0,
      duration: 0,
      nodeStart: 0,
      v8Start: 0,
      bootstrapComplete: 0,
      environment: 0,
      loopStart: 0,
      loopExit: 0,
      idleTime: 0,
      uvMetricsInfo: {
        loopCount: 0,
        events: 0,
        eventsWaiting: 0
      },
      detail: void 0,
      toJSON() {
        return this;
      }
    };
    PerformanceEntry = class {
      static {
        __name(this, "PerformanceEntry");
      }
      __unenv__ = true;
      detail;
      entryType = "event";
      name;
      startTime;
      constructor(name, options) {
        this.name = name;
        this.startTime = options?.startTime || _performanceNow();
        this.detail = options?.detail;
      }
      get duration() {
        return _performanceNow() - this.startTime;
      }
      toJSON() {
        return {
          name: this.name,
          entryType: this.entryType,
          startTime: this.startTime,
          duration: this.duration,
          detail: this.detail
        };
      }
    };
    PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
      static {
        __name(this, "PerformanceMark");
      }
      entryType = "mark";
      constructor() {
        super(...arguments);
      }
      get duration() {
        return 0;
      }
    };
    PerformanceMeasure = class extends PerformanceEntry {
      static {
        __name(this, "PerformanceMeasure");
      }
      entryType = "measure";
    };
    PerformanceResourceTiming = class extends PerformanceEntry {
      static {
        __name(this, "PerformanceResourceTiming");
      }
      entryType = "resource";
      serverTiming = [];
      connectEnd = 0;
      connectStart = 0;
      decodedBodySize = 0;
      domainLookupEnd = 0;
      domainLookupStart = 0;
      encodedBodySize = 0;
      fetchStart = 0;
      initiatorType = "";
      name = "";
      nextHopProtocol = "";
      redirectEnd = 0;
      redirectStart = 0;
      requestStart = 0;
      responseEnd = 0;
      responseStart = 0;
      secureConnectionStart = 0;
      startTime = 0;
      transferSize = 0;
      workerStart = 0;
      responseStatus = 0;
    };
    PerformanceObserverEntryList = class {
      static {
        __name(this, "PerformanceObserverEntryList");
      }
      __unenv__ = true;
      getEntries() {
        return [];
      }
      getEntriesByName(_name, _type) {
        return [];
      }
      getEntriesByType(type2) {
        return [];
      }
    };
    Performance = class {
      static {
        __name(this, "Performance");
      }
      __unenv__ = true;
      timeOrigin = _timeOrigin;
      eventCounts = /* @__PURE__ */ new Map();
      _entries = [];
      _resourceTimingBufferSize = 0;
      navigation = void 0;
      timing = void 0;
      timerify(_fn, _options) {
        throw createNotImplementedError("Performance.timerify");
      }
      get nodeTiming() {
        return nodeTiming;
      }
      eventLoopUtilization() {
        return {};
      }
      markResourceTiming() {
        return new PerformanceResourceTiming("");
      }
      onresourcetimingbufferfull = null;
      now() {
        if (this.timeOrigin === _timeOrigin) {
          return _performanceNow();
        }
        return Date.now() - this.timeOrigin;
      }
      clearMarks(markName) {
        this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
      }
      clearMeasures(measureName) {
        this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
      }
      clearResourceTimings() {
        this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
      }
      getEntries() {
        return this._entries;
      }
      getEntriesByName(name, type2) {
        return this._entries.filter((e) => e.name === name && (!type2 || e.entryType === type2));
      }
      getEntriesByType(type2) {
        return this._entries.filter((e) => e.entryType === type2);
      }
      mark(name, options) {
        const entry = new PerformanceMark(name, options);
        this._entries.push(entry);
        return entry;
      }
      measure(measureName, startOrMeasureOptions, endMark) {
        let start;
        let end;
        if (typeof startOrMeasureOptions === "string") {
          start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
          end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
        } else {
          start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
          end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
        }
        const entry = new PerformanceMeasure(measureName, {
          startTime: start,
          detail: {
            start,
            end
          }
        });
        this._entries.push(entry);
        return entry;
      }
      setResourceTimingBufferSize(maxSize) {
        this._resourceTimingBufferSize = maxSize;
      }
      addEventListener(type2, listener, options) {
        throw createNotImplementedError("Performance.addEventListener");
      }
      removeEventListener(type2, listener, options) {
        throw createNotImplementedError("Performance.removeEventListener");
      }
      dispatchEvent(event) {
        throw createNotImplementedError("Performance.dispatchEvent");
      }
      toJSON() {
        return this;
      }
    };
    PerformanceObserver = class {
      static {
        __name(this, "PerformanceObserver");
      }
      __unenv__ = true;
      static supportedEntryTypes = [];
      _callback = null;
      constructor(callback) {
        this._callback = callback;
      }
      takeRecords() {
        return [];
      }
      disconnect() {
        throw createNotImplementedError("PerformanceObserver.disconnect");
      }
      observe(options) {
        throw createNotImplementedError("PerformanceObserver.observe");
      }
      bind(fn) {
        return fn;
      }
      runInAsyncScope(fn, thisArg, ...args) {
        return fn.call(thisArg, ...args);
      }
      asyncId() {
        return 0;
      }
      triggerAsyncId() {
        return 0;
      }
      emitDestroy() {
        return this;
      }
    };
    performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();
  }
});

// node_modules/unenv/dist/runtime/node/perf_hooks.mjs
var init_perf_hooks = __esm({
  "node_modules/unenv/dist/runtime/node/perf_hooks.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_performance();
  }
});

// node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
var init_performance2 = __esm({
  "node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs"() {
    init_perf_hooks();
    if (!("__unenv__" in performance)) {
      const proto = Performance.prototype;
      for (const key of Object.getOwnPropertyNames(proto)) {
        if (key !== "constructor" && !(key in performance)) {
          const desc = Object.getOwnPropertyDescriptor(proto, key);
          if (desc) {
            Object.defineProperty(performance, key, desc);
          }
        }
      }
    }
    globalThis.performance = performance;
    globalThis.Performance = Performance;
    globalThis.PerformanceEntry = PerformanceEntry;
    globalThis.PerformanceMark = PerformanceMark;
    globalThis.PerformanceMeasure = PerformanceMeasure;
    globalThis.PerformanceObserver = PerformanceObserver;
    globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
    globalThis.PerformanceResourceTiming = PerformanceResourceTiming;
  }
});

// node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default;
var init_noop = __esm({
  "node_modules/unenv/dist/runtime/mock/noop.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    noop_default = Object.assign(() => {
    }, { __unenv__: true });
  }
});

// node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";
var _console, _ignoreErrors, _stderr, _stdout, log, info, trace, debug, table, error, warn, createTask, clear, count, countReset, dir, dirxml, group, groupEnd, groupCollapsed, profile, profileEnd, time, timeEnd, timeLog, timeStamp, Console, _times, _stdoutErrorHandler, _stderrErrorHandler;
var init_console = __esm({
  "node_modules/unenv/dist/runtime/node/console.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_noop();
    init_utils();
    _console = globalThis.console;
    _ignoreErrors = true;
    _stderr = new Writable();
    _stdout = new Writable();
    log = _console?.log ?? noop_default;
    info = _console?.info ?? log;
    trace = _console?.trace ?? info;
    debug = _console?.debug ?? log;
    table = _console?.table ?? log;
    error = _console?.error ?? log;
    warn = _console?.warn ?? error;
    createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
    clear = _console?.clear ?? noop_default;
    count = _console?.count ?? noop_default;
    countReset = _console?.countReset ?? noop_default;
    dir = _console?.dir ?? noop_default;
    dirxml = _console?.dirxml ?? noop_default;
    group = _console?.group ?? noop_default;
    groupEnd = _console?.groupEnd ?? noop_default;
    groupCollapsed = _console?.groupCollapsed ?? noop_default;
    profile = _console?.profile ?? noop_default;
    profileEnd = _console?.profileEnd ?? noop_default;
    time = _console?.time ?? noop_default;
    timeEnd = _console?.timeEnd ?? noop_default;
    timeLog = _console?.timeLog ?? noop_default;
    timeStamp = _console?.timeStamp ?? noop_default;
    Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
    _times = /* @__PURE__ */ new Map();
    _stdoutErrorHandler = noop_default;
    _stderrErrorHandler = noop_default;
  }
});

// node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole, assert, clear2, context, count2, countReset2, createTask2, debug2, dir2, dirxml2, error2, group2, groupCollapsed2, groupEnd2, info2, log2, profile2, profileEnd2, table2, time2, timeEnd2, timeLog2, timeStamp2, trace2, warn2, console_default;
var init_console2 = __esm({
  "node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_console();
    workerdConsole = globalThis["console"];
    ({
      assert,
      clear: clear2,
      context: (
        // @ts-expect-error undocumented public API
        context
      ),
      count: count2,
      countReset: countReset2,
      createTask: (
        // @ts-expect-error undocumented public API
        createTask2
      ),
      debug: debug2,
      dir: dir2,
      dirxml: dirxml2,
      error: error2,
      group: group2,
      groupCollapsed: groupCollapsed2,
      groupEnd: groupEnd2,
      info: info2,
      log: log2,
      profile: profile2,
      profileEnd: profileEnd2,
      table: table2,
      time: time2,
      timeEnd: timeEnd2,
      timeLog: timeLog2,
      timeStamp: timeStamp2,
      trace: trace2,
      warn: warn2
    } = workerdConsole);
    Object.assign(workerdConsole, {
      Console,
      _ignoreErrors,
      _stderr,
      _stderrErrorHandler,
      _stdout,
      _stdoutErrorHandler,
      _times
    });
    console_default = workerdConsole;
  }
});

// node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
var init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console = __esm({
  "node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console"() {
    init_console2();
    globalThis.console = console_default;
  }
});

// node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime;
var init_hrtime = __esm({
  "node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime2) {
      const now = Date.now();
      const seconds = Math.trunc(now / 1e3);
      const nanos = now % 1e3 * 1e6;
      if (startTime2) {
        let diffSeconds = seconds - startTime2[0];
        let diffNanos = nanos - startTime2[0];
        if (diffNanos < 0) {
          diffSeconds = diffSeconds - 1;
          diffNanos = 1e9 + diffNanos;
        }
        return [diffSeconds, diffNanos];
      }
      return [seconds, nanos];
    }, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
      return BigInt(Date.now() * 1e6);
    }, "bigint") });
  }
});

// node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
var ReadStream;
var init_read_stream = __esm({
  "node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    ReadStream = class {
      static {
        __name(this, "ReadStream");
      }
      fd;
      isRaw = false;
      isTTY = false;
      constructor(fd) {
        this.fd = fd;
      }
      setRawMode(mode) {
        this.isRaw = mode;
        return this;
      }
    };
  }
});

// node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
var WriteStream;
var init_write_stream = __esm({
  "node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    WriteStream = class {
      static {
        __name(this, "WriteStream");
      }
      fd;
      columns = 80;
      rows = 24;
      isTTY = false;
      constructor(fd) {
        this.fd = fd;
      }
      clearLine(dir3, callback) {
        callback && callback();
        return false;
      }
      clearScreenDown(callback) {
        callback && callback();
        return false;
      }
      cursorTo(x, y2, callback) {
        callback && typeof callback === "function" && callback();
        return false;
      }
      moveCursor(dx, dy, callback) {
        callback && callback();
        return false;
      }
      getColorDepth(env2) {
        return 1;
      }
      hasColors(count3, env2) {
        return false;
      }
      getWindowSize() {
        return [this.columns, this.rows];
      }
      write(str2, encoding, cb) {
        if (str2 instanceof Uint8Array) {
          str2 = new TextDecoder().decode(str2);
        }
        try {
          console.log(str2);
        } catch {
        }
        cb && typeof cb === "function" && cb();
        return false;
      }
    };
  }
});

// node_modules/unenv/dist/runtime/node/tty.mjs
var init_tty = __esm({
  "node_modules/unenv/dist/runtime/node/tty.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_read_stream();
    init_write_stream();
  }
});

// node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs
var NODE_VERSION;
var init_node_version = __esm({
  "node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    NODE_VERSION = "22.14.0";
  }
});

// node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";
var Process;
var init_process = __esm({
  "node_modules/unenv/dist/runtime/node/internal/process/process.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_tty();
    init_utils();
    init_node_version();
    Process = class _Process extends EventEmitter {
      static {
        __name(this, "Process");
      }
      env;
      hrtime;
      nextTick;
      constructor(impl) {
        super();
        this.env = impl.env;
        this.hrtime = impl.hrtime;
        this.nextTick = impl.nextTick;
        for (const prop of [...Object.getOwnPropertyNames(_Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
          const value = this[prop];
          if (typeof value === "function") {
            this[prop] = value.bind(this);
          }
        }
      }
      // --- event emitter ---
      emitWarning(warning, type2, code) {
        console.warn(`${code ? `[${code}] ` : ""}${type2 ? `${type2}: ` : ""}${warning}`);
      }
      emit(...args) {
        return super.emit(...args);
      }
      listeners(eventName) {
        return super.listeners(eventName);
      }
      // --- stdio (lazy initializers) ---
      #stdin;
      #stdout;
      #stderr;
      get stdin() {
        return this.#stdin ??= new ReadStream(0);
      }
      get stdout() {
        return this.#stdout ??= new WriteStream(1);
      }
      get stderr() {
        return this.#stderr ??= new WriteStream(2);
      }
      // --- cwd ---
      #cwd = "/";
      chdir(cwd3) {
        this.#cwd = cwd3;
      }
      cwd() {
        return this.#cwd;
      }
      // --- dummy props and getters ---
      arch = "";
      platform = "";
      argv = [];
      argv0 = "";
      execArgv = [];
      execPath = "";
      title = "";
      pid = 200;
      ppid = 100;
      get version() {
        return `v${NODE_VERSION}`;
      }
      get versions() {
        return { node: NODE_VERSION };
      }
      get allowedNodeEnvironmentFlags() {
        return /* @__PURE__ */ new Set();
      }
      get sourceMapsEnabled() {
        return false;
      }
      get debugPort() {
        return 0;
      }
      get throwDeprecation() {
        return false;
      }
      get traceDeprecation() {
        return false;
      }
      get features() {
        return {};
      }
      get release() {
        return {};
      }
      get connected() {
        return false;
      }
      get config() {
        return {};
      }
      get moduleLoadList() {
        return [];
      }
      constrainedMemory() {
        return 0;
      }
      availableMemory() {
        return 0;
      }
      uptime() {
        return 0;
      }
      resourceUsage() {
        return {};
      }
      // --- noop methods ---
      ref() {
      }
      unref() {
      }
      // --- unimplemented methods ---
      umask() {
        throw createNotImplementedError("process.umask");
      }
      getBuiltinModule() {
        return void 0;
      }
      getActiveResourcesInfo() {
        throw createNotImplementedError("process.getActiveResourcesInfo");
      }
      exit() {
        throw createNotImplementedError("process.exit");
      }
      reallyExit() {
        throw createNotImplementedError("process.reallyExit");
      }
      kill() {
        throw createNotImplementedError("process.kill");
      }
      abort() {
        throw createNotImplementedError("process.abort");
      }
      dlopen() {
        throw createNotImplementedError("process.dlopen");
      }
      setSourceMapsEnabled() {
        throw createNotImplementedError("process.setSourceMapsEnabled");
      }
      loadEnvFile() {
        throw createNotImplementedError("process.loadEnvFile");
      }
      disconnect() {
        throw createNotImplementedError("process.disconnect");
      }
      cpuUsage() {
        throw createNotImplementedError("process.cpuUsage");
      }
      setUncaughtExceptionCaptureCallback() {
        throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
      }
      hasUncaughtExceptionCaptureCallback() {
        throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
      }
      initgroups() {
        throw createNotImplementedError("process.initgroups");
      }
      openStdin() {
        throw createNotImplementedError("process.openStdin");
      }
      assert() {
        throw createNotImplementedError("process.assert");
      }
      binding() {
        throw createNotImplementedError("process.binding");
      }
      // --- attached interfaces ---
      permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
      report = {
        directory: "",
        filename: "",
        signal: "SIGUSR2",
        compact: false,
        reportOnFatalError: false,
        reportOnSignal: false,
        reportOnUncaughtException: false,
        getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
        writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
      };
      finalization = {
        register: /* @__PURE__ */ notImplemented("process.finalization.register"),
        unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
        registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
      };
      memoryUsage = Object.assign(() => ({
        arrayBuffers: 0,
        rss: 0,
        external: 0,
        heapTotal: 0,
        heapUsed: 0
      }), { rss: /* @__PURE__ */ __name(() => 0, "rss") });
      // --- undefined props ---
      mainModule = void 0;
      domain = void 0;
      // optional
      send = void 0;
      exitCode = void 0;
      channel = void 0;
      getegid = void 0;
      geteuid = void 0;
      getgid = void 0;
      getgroups = void 0;
      getuid = void 0;
      setegid = void 0;
      seteuid = void 0;
      setgid = void 0;
      setgroups = void 0;
      setuid = void 0;
      // internals
      _events = void 0;
      _eventsCount = void 0;
      _exiting = void 0;
      _maxListeners = void 0;
      _debugEnd = void 0;
      _debugProcess = void 0;
      _fatalException = void 0;
      _getActiveHandles = void 0;
      _getActiveRequests = void 0;
      _kill = void 0;
      _preload_modules = void 0;
      _rawDebug = void 0;
      _startProfilerIdleNotifier = void 0;
      _stopProfilerIdleNotifier = void 0;
      _tickCallback = void 0;
      _disconnect = void 0;
      _handleQueue = void 0;
      _pendingMessage = void 0;
      _channel = void 0;
      _send = void 0;
      _linkedBinding = void 0;
    };
  }
});

// node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess, getBuiltinModule, workerdProcess, unenvProcess, exit, features, platform, _channel, _debugEnd, _debugProcess, _disconnect, _events, _eventsCount, _exiting, _fatalException, _getActiveHandles, _getActiveRequests, _handleQueue, _kill, _linkedBinding, _maxListeners, _pendingMessage, _preload_modules, _rawDebug, _send, _startProfilerIdleNotifier, _stopProfilerIdleNotifier, _tickCallback, abort, addListener, allowedNodeEnvironmentFlags, arch, argv, argv0, assert2, availableMemory, binding, channel, chdir, config, connected, constrainedMemory, cpuUsage, cwd, debugPort, disconnect, dlopen, domain, emit, emitWarning, env, eventNames, execArgv, execPath, exitCode, finalization, getActiveResourcesInfo, getegid, geteuid, getgid, getgroups, getMaxListeners, getuid, hasUncaughtExceptionCaptureCallback, hrtime3, initgroups, kill, listenerCount, listeners, loadEnvFile, mainModule, memoryUsage, moduleLoadList, nextTick, off, on, once, openStdin, permission, pid, ppid, prependListener, prependOnceListener, rawListeners, reallyExit, ref, release, removeAllListeners, removeListener, report, resourceUsage, send, setegid, seteuid, setgid, setgroups, setMaxListeners, setSourceMapsEnabled, setuid, setUncaughtExceptionCaptureCallback, sourceMapsEnabled, stderr, stdin, stdout, throwDeprecation, title, traceDeprecation, umask, unref, uptime, version, versions, _process, process_default;
var init_process2 = __esm({
  "node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_hrtime();
    init_process();
    globalProcess = globalThis["process"];
    getBuiltinModule = globalProcess.getBuiltinModule;
    workerdProcess = getBuiltinModule("node:process");
    unenvProcess = new Process({
      env: globalProcess.env,
      hrtime,
      // `nextTick` is available from workerd process v1
      nextTick: workerdProcess.nextTick
    });
    ({ exit, features, platform } = workerdProcess);
    ({
      _channel,
      _debugEnd,
      _debugProcess,
      _disconnect,
      _events,
      _eventsCount,
      _exiting,
      _fatalException,
      _getActiveHandles,
      _getActiveRequests,
      _handleQueue,
      _kill,
      _linkedBinding,
      _maxListeners,
      _pendingMessage,
      _preload_modules,
      _rawDebug,
      _send,
      _startProfilerIdleNotifier,
      _stopProfilerIdleNotifier,
      _tickCallback,
      abort,
      addListener,
      allowedNodeEnvironmentFlags,
      arch,
      argv,
      argv0,
      assert: assert2,
      availableMemory,
      binding,
      channel,
      chdir,
      config,
      connected,
      constrainedMemory,
      cpuUsage,
      cwd,
      debugPort,
      disconnect,
      dlopen,
      domain,
      emit,
      emitWarning,
      env,
      eventNames,
      execArgv,
      execPath,
      exitCode,
      finalization,
      getActiveResourcesInfo,
      getegid,
      geteuid,
      getgid,
      getgroups,
      getMaxListeners,
      getuid,
      hasUncaughtExceptionCaptureCallback,
      hrtime: hrtime3,
      initgroups,
      kill,
      listenerCount,
      listeners,
      loadEnvFile,
      mainModule,
      memoryUsage,
      moduleLoadList,
      nextTick,
      off,
      on,
      once,
      openStdin,
      permission,
      pid,
      ppid,
      prependListener,
      prependOnceListener,
      rawListeners,
      reallyExit,
      ref,
      release,
      removeAllListeners,
      removeListener,
      report,
      resourceUsage,
      send,
      setegid,
      seteuid,
      setgid,
      setgroups,
      setMaxListeners,
      setSourceMapsEnabled,
      setuid,
      setUncaughtExceptionCaptureCallback,
      sourceMapsEnabled,
      stderr,
      stdin,
      stdout,
      throwDeprecation,
      title,
      traceDeprecation,
      umask,
      unref,
      uptime,
      version,
      versions
    } = unenvProcess);
    _process = {
      abort,
      addListener,
      allowedNodeEnvironmentFlags,
      hasUncaughtExceptionCaptureCallback,
      setUncaughtExceptionCaptureCallback,
      loadEnvFile,
      sourceMapsEnabled,
      arch,
      argv,
      argv0,
      chdir,
      config,
      connected,
      constrainedMemory,
      availableMemory,
      cpuUsage,
      cwd,
      debugPort,
      dlopen,
      disconnect,
      emit,
      emitWarning,
      env,
      eventNames,
      execArgv,
      execPath,
      exit,
      finalization,
      features,
      getBuiltinModule,
      getActiveResourcesInfo,
      getMaxListeners,
      hrtime: hrtime3,
      kill,
      listeners,
      listenerCount,
      memoryUsage,
      nextTick,
      on,
      off,
      once,
      pid,
      platform,
      ppid,
      prependListener,
      prependOnceListener,
      rawListeners,
      release,
      removeAllListeners,
      removeListener,
      report,
      resourceUsage,
      setMaxListeners,
      setSourceMapsEnabled,
      stderr,
      stdin,
      stdout,
      title,
      throwDeprecation,
      traceDeprecation,
      umask,
      uptime,
      version,
      versions,
      // @ts-expect-error old API
      domain,
      initgroups,
      moduleLoadList,
      reallyExit,
      openStdin,
      assert: assert2,
      binding,
      send,
      exitCode,
      channel,
      getegid,
      geteuid,
      getgid,
      getgroups,
      getuid,
      setegid,
      seteuid,
      setgid,
      setgroups,
      setuid,
      permission,
      mainModule,
      _events,
      _eventsCount,
      _exiting,
      _maxListeners,
      _debugEnd,
      _debugProcess,
      _fatalException,
      _getActiveHandles,
      _getActiveRequests,
      _kill,
      _preload_modules,
      _rawDebug,
      _startProfilerIdleNotifier,
      _stopProfilerIdleNotifier,
      _tickCallback,
      _disconnect,
      _handleQueue,
      _pendingMessage,
      _channel,
      _send,
      _linkedBinding
    };
    process_default = _process;
  }
});

// node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
var init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process = __esm({
  "node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process"() {
    init_process2();
    globalThis.process = process_default;
  }
});

// node_modules/hono/dist/compose.js
var compose;
var init_compose = __esm({
  "node_modules/hono/dist/compose.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    compose = /* @__PURE__ */ __name((middleware, onError, onNotFound) => {
      return (context2, next) => {
        let index = -1;
        return dispatch(0);
        async function dispatch(i) {
          if (i <= index) {
            throw new Error("next() called multiple times");
          }
          index = i;
          let res;
          let isError = false;
          let handler;
          if (middleware[i]) {
            handler = middleware[i][0][0];
            context2.req.routeIndex = i;
          } else {
            handler = i === middleware.length && next || void 0;
          }
          if (handler) {
            try {
              res = await handler(context2, () => dispatch(i + 1));
            } catch (err) {
              if (err instanceof Error && onError) {
                context2.error = err;
                res = await onError(err, context2);
                isError = true;
              } else {
                throw err;
              }
            }
          } else {
            if (context2.finalized === false && onNotFound) {
              res = await onNotFound(context2);
            }
          }
          if (res && (context2.finalized === false || isError)) {
            context2.res = res;
          }
          return context2;
        }
        __name(dispatch, "dispatch");
      };
    }, "compose");
  }
});

// node_modules/hono/dist/http-exception.js
var init_http_exception = __esm({
  "node_modules/hono/dist/http-exception.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
  }
});

// node_modules/hono/dist/request/constants.js
var GET_MATCH_RESULT;
var init_constants = __esm({
  "node_modules/hono/dist/request/constants.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    GET_MATCH_RESULT = /* @__PURE__ */ Symbol();
  }
});

// node_modules/hono/dist/utils/body.js
async function parseFormData(request, options) {
  const formData = await request.formData();
  if (formData) {
    return convertFormDataToBodyData(formData, options);
  }
  return {};
}
function convertFormDataToBodyData(formData, options) {
  const form = /* @__PURE__ */ Object.create(null);
  formData.forEach((value, key) => {
    const shouldParseAllValues = options.all || key.endsWith("[]");
    if (!shouldParseAllValues) {
      form[key] = value;
    } else {
      handleParsingAllValues(form, key, value);
    }
  });
  if (options.dot) {
    Object.entries(form).forEach(([key, value]) => {
      const shouldParseDotValues = key.includes(".");
      if (shouldParseDotValues) {
        handleParsingNestedValues(form, key, value);
        delete form[key];
      }
    });
  }
  return form;
}
var parseBody, handleParsingAllValues, handleParsingNestedValues;
var init_body = __esm({
  "node_modules/hono/dist/utils/body.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_request();
    parseBody = /* @__PURE__ */ __name(async (request, options = /* @__PURE__ */ Object.create(null)) => {
      const { all = false, dot = false } = options;
      const headers = request instanceof HonoRequest ? request.raw.headers : request.headers;
      const contentType = headers.get("Content-Type");
      if (contentType?.startsWith("multipart/form-data") || contentType?.startsWith("application/x-www-form-urlencoded")) {
        return parseFormData(request, { all, dot });
      }
      return {};
    }, "parseBody");
    __name(parseFormData, "parseFormData");
    __name(convertFormDataToBodyData, "convertFormDataToBodyData");
    handleParsingAllValues = /* @__PURE__ */ __name((form, key, value) => {
      if (form[key] !== void 0) {
        if (Array.isArray(form[key])) {
          ;
          form[key].push(value);
        } else {
          form[key] = [form[key], value];
        }
      } else {
        if (!key.endsWith("[]")) {
          form[key] = value;
        } else {
          form[key] = [value];
        }
      }
    }, "handleParsingAllValues");
    handleParsingNestedValues = /* @__PURE__ */ __name((form, key, value) => {
      if (/(?:^|\.)__proto__\./.test(key)) {
        return;
      }
      let nestedForm = form;
      const keys = key.split(".");
      keys.forEach((key2, index) => {
        if (index === keys.length - 1) {
          nestedForm[key2] = value;
        } else {
          if (!nestedForm[key2] || typeof nestedForm[key2] !== "object" || Array.isArray(nestedForm[key2]) || nestedForm[key2] instanceof File) {
            nestedForm[key2] = /* @__PURE__ */ Object.create(null);
          }
          nestedForm = nestedForm[key2];
        }
      });
    }, "handleParsingNestedValues");
  }
});

// node_modules/hono/dist/utils/url.js
var splitPath, splitRoutingPath, extractGroupsFromPath, replaceGroupMarks, patternCache, getPattern, tryDecode, tryDecodeURI, getPath, getPathNoStrict, mergePath, checkOptionalParameter, _decodeURI, _getQueryParam, getQueryParam, getQueryParams, decodeURIComponent_;
var init_url = __esm({
  "node_modules/hono/dist/utils/url.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    splitPath = /* @__PURE__ */ __name((path) => {
      const paths = path.split("/");
      if (paths[0] === "") {
        paths.shift();
      }
      return paths;
    }, "splitPath");
    splitRoutingPath = /* @__PURE__ */ __name((routePath) => {
      const { groups, path } = extractGroupsFromPath(routePath);
      const paths = splitPath(path);
      return replaceGroupMarks(paths, groups);
    }, "splitRoutingPath");
    extractGroupsFromPath = /* @__PURE__ */ __name((path) => {
      const groups = [];
      path = path.replace(/\{[^}]+\}/g, (match3, index) => {
        const mark = `@${index}`;
        groups.push([mark, match3]);
        return mark;
      });
      return { groups, path };
    }, "extractGroupsFromPath");
    replaceGroupMarks = /* @__PURE__ */ __name((paths, groups) => {
      for (let i = groups.length - 1; i >= 0; i--) {
        const [mark] = groups[i];
        for (let j = paths.length - 1; j >= 0; j--) {
          if (paths[j].includes(mark)) {
            paths[j] = paths[j].replace(mark, groups[i][1]);
            break;
          }
        }
      }
      return paths;
    }, "replaceGroupMarks");
    patternCache = {};
    getPattern = /* @__PURE__ */ __name((label, next) => {
      if (label === "*") {
        return "*";
      }
      const match3 = label.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
      if (match3) {
        const cacheKey = `${label}#${next}`;
        if (!patternCache[cacheKey]) {
          if (match3[2]) {
            patternCache[cacheKey] = next && next[0] !== ":" && next[0] !== "*" ? [cacheKey, match3[1], new RegExp(`^${match3[2]}(?=/${next})`)] : [label, match3[1], new RegExp(`^${match3[2]}$`)];
          } else {
            patternCache[cacheKey] = [label, match3[1], true];
          }
        }
        return patternCache[cacheKey];
      }
      return null;
    }, "getPattern");
    tryDecode = /* @__PURE__ */ __name((str2, decoder) => {
      try {
        return decoder(str2);
      } catch {
        return str2.replace(/(?:%[0-9A-Fa-f]{2})+/g, (match3) => {
          try {
            return decoder(match3);
          } catch {
            return match3;
          }
        });
      }
    }, "tryDecode");
    tryDecodeURI = /* @__PURE__ */ __name((str2) => tryDecode(str2, decodeURI), "tryDecodeURI");
    getPath = /* @__PURE__ */ __name((request) => {
      const url = request.url;
      const start = url.indexOf("/", url.indexOf(":") + 4);
      let i = start;
      for (; i < url.length; i++) {
        const charCode = url.charCodeAt(i);
        if (charCode === 37) {
          const queryIndex = url.indexOf("?", i);
          const hashIndex = url.indexOf("#", i);
          const end = queryIndex === -1 ? hashIndex === -1 ? void 0 : hashIndex : hashIndex === -1 ? queryIndex : Math.min(queryIndex, hashIndex);
          const path = url.slice(start, end);
          return tryDecodeURI(path.includes("%25") ? path.replace(/%25/g, "%2525") : path);
        } else if (charCode === 63 || charCode === 35) {
          break;
        }
      }
      return url.slice(start, i);
    }, "getPath");
    getPathNoStrict = /* @__PURE__ */ __name((request) => {
      const result = getPath(request);
      return result.length > 1 && result.at(-1) === "/" ? result.slice(0, -1) : result;
    }, "getPathNoStrict");
    mergePath = /* @__PURE__ */ __name((base, sub, ...rest) => {
      if (rest.length) {
        sub = mergePath(sub, ...rest);
      }
      return `${base?.[0] === "/" ? "" : "/"}${base}${sub === "/" ? "" : `${base?.at(-1) === "/" ? "" : "/"}${sub?.[0] === "/" ? sub.slice(1) : sub}`}`;
    }, "mergePath");
    checkOptionalParameter = /* @__PURE__ */ __name((path) => {
      if (path.charCodeAt(path.length - 1) !== 63 || !path.includes(":")) {
        return null;
      }
      const segments = path.split("/");
      const results = [];
      let basePath = "";
      segments.forEach((segment) => {
        if (segment !== "" && !/\:/.test(segment)) {
          basePath += "/" + segment;
        } else if (/\:/.test(segment)) {
          if (/\?/.test(segment)) {
            if (results.length === 0 && basePath === "") {
              results.push("/");
            } else {
              results.push(basePath);
            }
            const optionalSegment = segment.replace("?", "");
            basePath += "/" + optionalSegment;
            results.push(basePath);
          } else {
            basePath += "/" + segment;
          }
        }
      });
      return results.filter((v, i, a) => a.indexOf(v) === i);
    }, "checkOptionalParameter");
    _decodeURI = /* @__PURE__ */ __name((value) => {
      if (!/[%+]/.test(value)) {
        return value;
      }
      if (value.indexOf("+") !== -1) {
        value = value.replace(/\+/g, " ");
      }
      return value.indexOf("%") !== -1 ? tryDecode(value, decodeURIComponent_) : value;
    }, "_decodeURI");
    _getQueryParam = /* @__PURE__ */ __name((url, key, multiple) => {
      let encoded;
      if (!multiple && key && !/[%+]/.test(key)) {
        let keyIndex2 = url.indexOf("?", 8);
        if (keyIndex2 === -1) {
          return void 0;
        }
        if (!url.startsWith(key, keyIndex2 + 1)) {
          keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
        }
        while (keyIndex2 !== -1) {
          const trailingKeyCode = url.charCodeAt(keyIndex2 + key.length + 1);
          if (trailingKeyCode === 61) {
            const valueIndex = keyIndex2 + key.length + 2;
            const endIndex = url.indexOf("&", valueIndex);
            return _decodeURI(url.slice(valueIndex, endIndex === -1 ? void 0 : endIndex));
          } else if (trailingKeyCode == 38 || isNaN(trailingKeyCode)) {
            return "";
          }
          keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
        }
        encoded = /[%+]/.test(url);
        if (!encoded) {
          return void 0;
        }
      }
      const results = {};
      encoded ??= /[%+]/.test(url);
      let keyIndex = url.indexOf("?", 8);
      while (keyIndex !== -1) {
        const nextKeyIndex = url.indexOf("&", keyIndex + 1);
        let valueIndex = url.indexOf("=", keyIndex);
        if (valueIndex > nextKeyIndex && nextKeyIndex !== -1) {
          valueIndex = -1;
        }
        let name = url.slice(
          keyIndex + 1,
          valueIndex === -1 ? nextKeyIndex === -1 ? void 0 : nextKeyIndex : valueIndex
        );
        if (encoded) {
          name = _decodeURI(name);
        }
        keyIndex = nextKeyIndex;
        if (name === "") {
          continue;
        }
        let value;
        if (valueIndex === -1) {
          value = "";
        } else {
          value = url.slice(valueIndex + 1, nextKeyIndex === -1 ? void 0 : nextKeyIndex);
          if (encoded) {
            value = _decodeURI(value);
          }
        }
        if (multiple) {
          if (!(results[name] && Array.isArray(results[name]))) {
            results[name] = [];
          }
          ;
          results[name].push(value);
        } else {
          results[name] ??= value;
        }
      }
      return key ? results[key] : results;
    }, "_getQueryParam");
    getQueryParam = _getQueryParam;
    getQueryParams = /* @__PURE__ */ __name((url, key) => {
      return _getQueryParam(url, key, true);
    }, "getQueryParams");
    decodeURIComponent_ = decodeURIComponent;
  }
});

// node_modules/hono/dist/request.js
var tryDecodeURIComponent, HonoRequest;
var init_request = __esm({
  "node_modules/hono/dist/request.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_http_exception();
    init_constants();
    init_body();
    init_url();
    tryDecodeURIComponent = /* @__PURE__ */ __name((str2) => tryDecode(str2, decodeURIComponent_), "tryDecodeURIComponent");
    HonoRequest = class {
      static {
        __name(this, "HonoRequest");
      }
      /**
       * `.raw` can get the raw Request object.
       *
       * @see {@link https://hono.dev/docs/api/request#raw}
       *
       * @example
       * ```ts
       * // For Cloudflare Workers
       * app.post('/', async (c) => {
       *   const metadata = c.req.raw.cf?.hostMetadata?
       *   ...
       * })
       * ```
       */
      raw;
      #validatedData;
      // Short name of validatedData
      #matchResult;
      routeIndex = 0;
      /**
       * `.path` can get the pathname of the request.
       *
       * @see {@link https://hono.dev/docs/api/request#path}
       *
       * @example
       * ```ts
       * app.get('/about/me', (c) => {
       *   const pathname = c.req.path // `/about/me`
       * })
       * ```
       */
      path;
      bodyCache = {};
      constructor(request, path = "/", matchResult = [[]]) {
        this.raw = request;
        this.path = path;
        this.#matchResult = matchResult;
        this.#validatedData = {};
      }
      param(key) {
        return key ? this.#getDecodedParam(key) : this.#getAllDecodedParams();
      }
      #getDecodedParam(key) {
        const paramKey = this.#matchResult[0][this.routeIndex][1][key];
        const param = this.#getParamValue(paramKey);
        return param && /\%/.test(param) ? tryDecodeURIComponent(param) : param;
      }
      #getAllDecodedParams() {
        const decoded = {};
        const keys = Object.keys(this.#matchResult[0][this.routeIndex][1]);
        for (const key of keys) {
          const value = this.#getParamValue(this.#matchResult[0][this.routeIndex][1][key]);
          if (value !== void 0) {
            decoded[key] = /\%/.test(value) ? tryDecodeURIComponent(value) : value;
          }
        }
        return decoded;
      }
      #getParamValue(paramKey) {
        return this.#matchResult[1] ? this.#matchResult[1][paramKey] : paramKey;
      }
      query(key) {
        return getQueryParam(this.url, key);
      }
      queries(key) {
        return getQueryParams(this.url, key);
      }
      header(name) {
        if (name) {
          return this.raw.headers.get(name) ?? void 0;
        }
        const headerData = {};
        this.raw.headers.forEach((value, key) => {
          headerData[key] = value;
        });
        return headerData;
      }
      async parseBody(options) {
        return parseBody(this, options);
      }
      #cachedBody = /* @__PURE__ */ __name((key) => {
        const { bodyCache, raw: raw2 } = this;
        const cachedBody = bodyCache[key];
        if (cachedBody) {
          return cachedBody;
        }
        const anyCachedKey = Object.keys(bodyCache)[0];
        if (anyCachedKey) {
          return bodyCache[anyCachedKey].then((body) => {
            if (anyCachedKey === "json") {
              body = JSON.stringify(body);
            }
            return new Response(body)[key]();
          });
        }
        return bodyCache[key] = raw2[key]();
      }, "#cachedBody");
      /**
       * `.json()` can parse Request body of type `application/json`
       *
       * @see {@link https://hono.dev/docs/api/request#json}
       *
       * @example
       * ```ts
       * app.post('/entry', async (c) => {
       *   const body = await c.req.json()
       * })
       * ```
       */
      json() {
        return this.#cachedBody("text").then((text) => JSON.parse(text));
      }
      /**
       * `.text()` can parse Request body of type `text/plain`
       *
       * @see {@link https://hono.dev/docs/api/request#text}
       *
       * @example
       * ```ts
       * app.post('/entry', async (c) => {
       *   const body = await c.req.text()
       * })
       * ```
       */
      text() {
        return this.#cachedBody("text");
      }
      /**
       * `.arrayBuffer()` parse Request body as an `ArrayBuffer`
       *
       * @see {@link https://hono.dev/docs/api/request#arraybuffer}
       *
       * @example
       * ```ts
       * app.post('/entry', async (c) => {
       *   const body = await c.req.arrayBuffer()
       * })
       * ```
       */
      arrayBuffer() {
        return this.#cachedBody("arrayBuffer");
      }
      /**
       * `.bytes()` parses the request body as a `Uint8Array`.
       *
       * @see {@link https://hono.dev/docs/api/request#bytes}
       *
       * @example
       * ```ts
       * app.post('/entry', async (c) => {
       *   const body = await c.req.bytes()
       * })
       * ```
       */
      bytes() {
        return this.#cachedBody("arrayBuffer").then((buffer) => new Uint8Array(buffer));
      }
      /**
       * Parses the request body as a `Blob`.
       * @example
       * ```ts
       * app.post('/entry', async (c) => {
       *   const body = await c.req.blob();
       * });
       * ```
       * @see https://hono.dev/docs/api/request#blob
       */
      blob() {
        return this.#cachedBody("blob");
      }
      /**
       * Parses the request body as `FormData`.
       * @example
       * ```ts
       * app.post('/entry', async (c) => {
       *   const body = await c.req.formData();
       * });
       * ```
       * @see https://hono.dev/docs/api/request#formdata
       */
      formData() {
        return this.#cachedBody("formData");
      }
      /**
       * Adds validated data to the request.
       *
       * @param target - The target of the validation.
       * @param data - The validated data to add.
       */
      addValidatedData(target, data) {
        this.#validatedData[target] = data;
      }
      valid(target) {
        return this.#validatedData[target];
      }
      /**
       * `.url()` can get the request url strings.
       *
       * @see {@link https://hono.dev/docs/api/request#url}
       *
       * @example
       * ```ts
       * app.get('/about/me', (c) => {
       *   const url = c.req.url // `http://localhost:8787/about/me`
       *   ...
       * })
       * ```
       */
      get url() {
        return this.raw.url;
      }
      /**
       * `.method()` can get the method name of the request.
       *
       * @see {@link https://hono.dev/docs/api/request#method}
       *
       * @example
       * ```ts
       * app.get('/about/me', (c) => {
       *   const method = c.req.method // `GET`
       * })
       * ```
       */
      get method() {
        return this.raw.method;
      }
      get [GET_MATCH_RESULT]() {
        return this.#matchResult;
      }
      /**
       * `.matchedRoutes()` can return a matched route in the handler
       *
       * @deprecated
       *
       * Use matchedRoutes helper defined in "hono/route" instead.
       *
       * @see {@link https://hono.dev/docs/api/request#matchedroutes}
       *
       * @example
       * ```ts
       * app.use('*', async function logger(c, next) {
       *   await next()
       *   c.req.matchedRoutes.forEach(({ handler, method, path }, i) => {
       *     const name = handler.name || (handler.length < 2 ? '[handler]' : '[middleware]')
       *     console.log(
       *       method,
       *       ' ',
       *       path,
       *       ' '.repeat(Math.max(10 - path.length, 0)),
       *       name,
       *       i === c.req.routeIndex ? '<- respond from here' : ''
       *     )
       *   })
       * })
       * ```
       */
      get matchedRoutes() {
        return this.#matchResult[0].map(([[, route]]) => route);
      }
      /**
       * `routePath()` can retrieve the path registered within the handler
       *
       * @deprecated
       *
       * Use routePath helper defined in "hono/route" instead.
       *
       * @see {@link https://hono.dev/docs/api/request#routepath}
       *
       * @example
       * ```ts
       * app.get('/posts/:id', (c) => {
       *   return c.json({ path: c.req.routePath })
       * })
       * ```
       */
      get routePath() {
        return this.#matchResult[0].map(([[, route]]) => route)[this.routeIndex].path;
      }
    };
  }
});

// node_modules/hono/dist/utils/html.js
var HtmlEscapedCallbackPhase, raw, resolveCallback;
var init_html = __esm({
  "node_modules/hono/dist/utils/html.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    HtmlEscapedCallbackPhase = {
      Stringify: 1,
      BeforeStream: 2,
      Stream: 3
    };
    raw = /* @__PURE__ */ __name((value, callbacks) => {
      const escapedString = new String(value);
      escapedString.isEscaped = true;
      escapedString.callbacks = callbacks;
      return escapedString;
    }, "raw");
    resolveCallback = /* @__PURE__ */ __name(async (str2, phase, preserveCallbacks, context2, buffer) => {
      if (typeof str2 === "object" && !(str2 instanceof String)) {
        if (!(str2 instanceof Promise)) {
          str2 = str2.toString();
        }
        if (str2 instanceof Promise) {
          str2 = await str2;
        }
      }
      const callbacks = str2.callbacks;
      if (!callbacks?.length) {
        return Promise.resolve(str2);
      }
      if (buffer) {
        buffer[0] += str2;
      } else {
        buffer = [str2];
      }
      const resStr = Promise.all(callbacks.map((c) => c({ phase, buffer, context: context2 }))).then(
        (res) => Promise.all(
          res.filter(Boolean).map((str22) => resolveCallback(str22, phase, false, context2, buffer))
        ).then(() => buffer[0])
      );
      if (preserveCallbacks) {
        return raw(await resStr, callbacks);
      } else {
        return resStr;
      }
    }, "resolveCallback");
  }
});

// node_modules/hono/dist/context.js
var TEXT_PLAIN, setDefaultContentType, createResponseInstance, Context;
var init_context = __esm({
  "node_modules/hono/dist/context.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_request();
    init_html();
    TEXT_PLAIN = "text/plain; charset=UTF-8";
    setDefaultContentType = /* @__PURE__ */ __name((contentType, headers) => {
      return {
        "Content-Type": contentType,
        ...headers
      };
    }, "setDefaultContentType");
    createResponseInstance = /* @__PURE__ */ __name((body, init) => new Response(body, init), "createResponseInstance");
    Context = class {
      static {
        __name(this, "Context");
      }
      #rawRequest;
      #req;
      /**
       * `.env` can get bindings (environment variables, secrets, KV namespaces, D1 database, R2 bucket etc.) in Cloudflare Workers.
       *
       * @see {@link https://hono.dev/docs/api/context#env}
       *
       * @example
       * ```ts
       * // Environment object for Cloudflare Workers
       * app.get('*', async c => {
       *   const counter = c.env.COUNTER
       * })
       * ```
       */
      env = {};
      #var;
      finalized = false;
      /**
       * `.error` can get the error object from the middleware if the Handler throws an error.
       *
       * @see {@link https://hono.dev/docs/api/context#error}
       *
       * @example
       * ```ts
       * app.use('*', async (c, next) => {
       *   await next()
       *   if (c.error) {
       *     // do something...
       *   }
       * })
       * ```
       */
      error;
      #status;
      #executionCtx;
      #res;
      #layout;
      #renderer;
      #notFoundHandler;
      #preparedHeaders;
      #matchResult;
      #path;
      /**
       * Creates an instance of the Context class.
       *
       * @param req - The Request object.
       * @param options - Optional configuration options for the context.
       */
      constructor(req, options) {
        this.#rawRequest = req;
        if (options) {
          this.#executionCtx = options.executionCtx;
          this.env = options.env;
          this.#notFoundHandler = options.notFoundHandler;
          this.#path = options.path;
          this.#matchResult = options.matchResult;
        }
      }
      /**
       * `.req` is the instance of {@link HonoRequest}.
       */
      get req() {
        this.#req ??= new HonoRequest(this.#rawRequest, this.#path, this.#matchResult);
        return this.#req;
      }
      /**
       * @see {@link https://hono.dev/docs/api/context#event}
       * The FetchEvent associated with the current request.
       *
       * @throws Will throw an error if the context does not have a FetchEvent.
       */
      get event() {
        if (this.#executionCtx && "respondWith" in this.#executionCtx) {
          return this.#executionCtx;
        } else {
          throw Error("This context has no FetchEvent");
        }
      }
      /**
       * @see {@link https://hono.dev/docs/api/context#executionctx}
       * The ExecutionContext associated with the current request.
       *
       * @throws Will throw an error if the context does not have an ExecutionContext.
       */
      get executionCtx() {
        if (this.#executionCtx) {
          return this.#executionCtx;
        } else {
          throw Error("This context has no ExecutionContext");
        }
      }
      /**
       * @see {@link https://hono.dev/docs/api/context#res}
       * The Response object for the current request.
       */
      get res() {
        return this.#res ||= createResponseInstance(null, {
          headers: this.#preparedHeaders ??= new Headers()
        });
      }
      /**
       * Sets the Response object for the current request.
       *
       * @param _res - The Response object to set.
       */
      set res(_res) {
        if (this.#res && _res) {
          _res = createResponseInstance(_res.body, _res);
          for (const [k, v] of this.#res.headers.entries()) {
            if (k === "content-type") {
              continue;
            }
            if (k === "set-cookie") {
              const cookies = this.#res.headers.getSetCookie();
              _res.headers.delete("set-cookie");
              for (const cookie of cookies) {
                _res.headers.append("set-cookie", cookie);
              }
            } else {
              _res.headers.set(k, v);
            }
          }
        }
        this.#res = _res;
        this.finalized = true;
      }
      /**
       * `.render()` can create a response within a layout.
       *
       * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
       *
       * @example
       * ```ts
       * app.get('/', (c) => {
       *   return c.render('Hello!')
       * })
       * ```
       */
      render = /* @__PURE__ */ __name((...args) => {
        this.#renderer ??= (content) => this.html(content);
        return this.#renderer(...args);
      }, "render");
      /**
       * Sets the layout for the response.
       *
       * @param layout - The layout to set.
       * @returns The layout function.
       */
      setLayout = /* @__PURE__ */ __name((layout) => this.#layout = layout, "setLayout");
      /**
       * Gets the current layout for the response.
       *
       * @returns The current layout function.
       */
      getLayout = /* @__PURE__ */ __name(() => this.#layout, "getLayout");
      /**
       * `.setRenderer()` can set the layout in the custom middleware.
       *
       * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
       *
       * @example
       * ```tsx
       * app.use('*', async (c, next) => {
       *   c.setRenderer((content) => {
       *     return c.html(
       *       <html>
       *         <body>
       *           <p>{content}</p>
       *         </body>
       *       </html>
       *     )
       *   })
       *   await next()
       * })
       * ```
       */
      setRenderer = /* @__PURE__ */ __name((renderer) => {
        this.#renderer = renderer;
      }, "setRenderer");
      /**
       * `.header()` can set headers.
       *
       * @see {@link https://hono.dev/docs/api/context#header}
       *
       * @example
       * ```ts
       * app.get('/welcome', (c) => {
       *   // Set headers
       *   c.header('X-Message', 'Hello!')
       *   c.header('Content-Type', 'text/plain')
       *
       *   return c.body('Thank you for coming')
       * })
       * ```
       */
      header = /* @__PURE__ */ __name((name, value, options) => {
        if (this.finalized) {
          this.#res = createResponseInstance(this.#res.body, this.#res);
        }
        const headers = this.#res ? this.#res.headers : this.#preparedHeaders ??= new Headers();
        if (value === void 0) {
          headers.delete(name);
        } else if (options?.append) {
          headers.append(name, value);
        } else {
          headers.set(name, value);
        }
      }, "header");
      status = /* @__PURE__ */ __name((status) => {
        this.#status = status;
      }, "status");
      /**
       * `.set()` can set the value specified by the key.
       *
       * @see {@link https://hono.dev/docs/api/context#set-get}
       *
       * @example
       * ```ts
       * app.use('*', async (c, next) => {
       *   c.set('message', 'Hono is hot!!')
       *   await next()
       * })
       * ```
       */
      set = /* @__PURE__ */ __name((key, value) => {
        this.#var ??= /* @__PURE__ */ new Map();
        this.#var.set(key, value);
      }, "set");
      /**
       * `.get()` can use the value specified by the key.
       *
       * @see {@link https://hono.dev/docs/api/context#set-get}
       *
       * @example
       * ```ts
       * app.get('/', (c) => {
       *   const message = c.get('message')
       *   return c.text(`The message is "${message}"`)
       * })
       * ```
       */
      get = /* @__PURE__ */ __name((key) => {
        return this.#var ? this.#var.get(key) : void 0;
      }, "get");
      /**
       * `.var` can access the value of a variable.
       *
       * @see {@link https://hono.dev/docs/api/context#var}
       *
       * @example
       * ```ts
       * const result = c.var.client.oneMethod()
       * ```
       */
      // c.var.propName is a read-only
      get var() {
        if (!this.#var) {
          return {};
        }
        return Object.fromEntries(this.#var);
      }
      #newResponse(data, arg, headers) {
        const responseHeaders = this.#res ? new Headers(this.#res.headers) : this.#preparedHeaders ?? new Headers();
        if (typeof arg === "object" && "headers" in arg) {
          const argHeaders = arg.headers instanceof Headers ? arg.headers : new Headers(arg.headers);
          for (const [key, value] of argHeaders) {
            if (key.toLowerCase() === "set-cookie") {
              responseHeaders.append(key, value);
            } else {
              responseHeaders.set(key, value);
            }
          }
        }
        if (headers) {
          for (const [k, v] of Object.entries(headers)) {
            if (typeof v === "string") {
              responseHeaders.set(k, v);
            } else {
              responseHeaders.delete(k);
              for (const v2 of v) {
                responseHeaders.append(k, v2);
              }
            }
          }
        }
        const status = typeof arg === "number" ? arg : arg?.status ?? this.#status;
        return createResponseInstance(data, { status, headers: responseHeaders });
      }
      newResponse = /* @__PURE__ */ __name((...args) => this.#newResponse(...args), "newResponse");
      /**
       * `.body()` can return the HTTP response.
       * You can set headers with `.header()` and set HTTP status code with `.status`.
       * This can also be set in `.text()`, `.json()` and so on.
       *
       * @see {@link https://hono.dev/docs/api/context#body}
       *
       * @example
       * ```ts
       * app.get('/welcome', (c) => {
       *   // Set headers
       *   c.header('X-Message', 'Hello!')
       *   c.header('Content-Type', 'text/plain')
       *   // Set HTTP status code
       *   c.status(201)
       *
       *   // Return the response body
       *   return c.body('Thank you for coming')
       * })
       * ```
       */
      body = /* @__PURE__ */ __name((data, arg, headers) => this.#newResponse(data, arg, headers), "body");
      /**
       * `.text()` can render text as `Content-Type:text/plain`.
       *
       * @see {@link https://hono.dev/docs/api/context#text}
       *
       * @example
       * ```ts
       * app.get('/say', (c) => {
       *   return c.text('Hello!')
       * })
       * ```
       */
      text = /* @__PURE__ */ __name((text, arg, headers) => {
        return !this.#preparedHeaders && !this.#status && !arg && !headers && !this.finalized ? new Response(text) : this.#newResponse(
          text,
          arg,
          setDefaultContentType(TEXT_PLAIN, headers)
        );
      }, "text");
      /**
       * `.json()` can render JSON as `Content-Type:application/json`.
       *
       * @see {@link https://hono.dev/docs/api/context#json}
       *
       * @example
       * ```ts
       * app.get('/api', (c) => {
       *   return c.json({ message: 'Hello!' })
       * })
       * ```
       */
      json = /* @__PURE__ */ __name((object, arg, headers) => {
        return this.#newResponse(
          JSON.stringify(object),
          arg,
          setDefaultContentType("application/json", headers)
        );
      }, "json");
      html = /* @__PURE__ */ __name((html, arg, headers) => {
        const res = /* @__PURE__ */ __name((html2) => this.#newResponse(html2, arg, setDefaultContentType("text/html; charset=UTF-8", headers)), "res");
        return typeof html === "object" ? resolveCallback(html, HtmlEscapedCallbackPhase.Stringify, false, {}).then(res) : res(html);
      }, "html");
      /**
       * `.redirect()` can Redirect, default status code is 302.
       *
       * @see {@link https://hono.dev/docs/api/context#redirect}
       *
       * @example
       * ```ts
       * app.get('/redirect', (c) => {
       *   return c.redirect('/')
       * })
       * app.get('/redirect-permanently', (c) => {
       *   return c.redirect('/', 301)
       * })
       * ```
       */
      redirect = /* @__PURE__ */ __name((location, status) => {
        const locationString = String(location);
        this.header(
          "Location",
          // Multibyes should be encoded
          // eslint-disable-next-line no-control-regex
          !/[^\x00-\xFF]/.test(locationString) ? locationString : encodeURI(locationString)
        );
        return this.newResponse(null, status ?? 302);
      }, "redirect");
      /**
       * `.notFound()` can return the Not Found Response.
       *
       * @see {@link https://hono.dev/docs/api/context#notfound}
       *
       * @example
       * ```ts
       * app.get('/notfound', (c) => {
       *   return c.notFound()
       * })
       * ```
       */
      notFound = /* @__PURE__ */ __name(() => {
        this.#notFoundHandler ??= () => createResponseInstance();
        return this.#notFoundHandler(this);
      }, "notFound");
    };
  }
});

// node_modules/hono/dist/router.js
var METHOD_NAME_ALL, METHOD_NAME_ALL_LOWERCASE, METHODS, MESSAGE_MATCHER_IS_ALREADY_BUILT, UnsupportedPathError;
var init_router = __esm({
  "node_modules/hono/dist/router.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    METHOD_NAME_ALL = "ALL";
    METHOD_NAME_ALL_LOWERCASE = "all";
    METHODS = ["get", "post", "put", "delete", "options", "patch"];
    MESSAGE_MATCHER_IS_ALREADY_BUILT = "Can not add a route since the matcher is already built.";
    UnsupportedPathError = class extends Error {
      static {
        __name(this, "UnsupportedPathError");
      }
    };
  }
});

// node_modules/hono/dist/utils/constants.js
var COMPOSED_HANDLER;
var init_constants2 = __esm({
  "node_modules/hono/dist/utils/constants.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    COMPOSED_HANDLER = "__COMPOSED_HANDLER";
  }
});

// node_modules/hono/dist/hono-base.js
var notFoundHandler, errorHandler, Hono;
var init_hono_base = __esm({
  "node_modules/hono/dist/hono-base.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_compose();
    init_context();
    init_router();
    init_constants2();
    init_url();
    notFoundHandler = /* @__PURE__ */ __name((c) => {
      return c.text("404 Not Found", 404);
    }, "notFoundHandler");
    errorHandler = /* @__PURE__ */ __name((err, c) => {
      if ("getResponse" in err) {
        const res = err.getResponse();
        return c.newResponse(res.body, res);
      }
      console.error(err);
      return c.text("Internal Server Error", 500);
    }, "errorHandler");
    Hono = class _Hono {
      static {
        __name(this, "_Hono");
      }
      get;
      post;
      put;
      delete;
      options;
      patch;
      all;
      on;
      use;
      /*
        This class is like an abstract class and does not have a router.
        To use it, inherit the class and implement router in the constructor.
      */
      router;
      getPath;
      // Cannot use `#` because it requires visibility at JavaScript runtime.
      _basePath = "/";
      #path = "/";
      routes = [];
      constructor(options = {}) {
        const allMethods = [...METHODS, METHOD_NAME_ALL_LOWERCASE];
        allMethods.forEach((method) => {
          this[method] = (args1, ...args) => {
            if (typeof args1 === "string") {
              this.#path = args1;
            } else {
              this.#addRoute(method, this.#path, args1);
            }
            args.forEach((handler) => {
              this.#addRoute(method, this.#path, handler);
            });
            return this;
          };
        });
        this.on = (method, path, ...handlers) => {
          for (const p of [path].flat()) {
            this.#path = p;
            for (const m2 of [method].flat()) {
              handlers.map((handler) => {
                this.#addRoute(m2.toUpperCase(), this.#path, handler);
              });
            }
          }
          return this;
        };
        this.use = (arg1, ...handlers) => {
          if (typeof arg1 === "string") {
            this.#path = arg1;
          } else {
            this.#path = "*";
            handlers.unshift(arg1);
          }
          handlers.forEach((handler) => {
            this.#addRoute(METHOD_NAME_ALL, this.#path, handler);
          });
          return this;
        };
        const { strict, ...optionsWithoutStrict } = options;
        Object.assign(this, optionsWithoutStrict);
        this.getPath = strict ?? true ? options.getPath ?? getPath : getPathNoStrict;
      }
      #clone() {
        const clone = new _Hono({
          router: this.router,
          getPath: this.getPath
        });
        clone.errorHandler = this.errorHandler;
        clone.#notFoundHandler = this.#notFoundHandler;
        clone.routes = this.routes;
        return clone;
      }
      #notFoundHandler = notFoundHandler;
      // Cannot use `#` because it requires visibility at JavaScript runtime.
      errorHandler = errorHandler;
      /**
       * `.route()` allows grouping other Hono instance in routes.
       *
       * @see {@link https://hono.dev/docs/api/routing#grouping}
       *
       * @param {string} path - base Path
       * @param {Hono} app - other Hono instance
       * @returns {Hono} routed Hono instance
       *
       * @example
       * ```ts
       * const app = new Hono()
       * const app2 = new Hono()
       *
       * app2.get("/user", (c) => c.text("user"))
       * app.route("/api", app2) // GET /api/user
       * ```
       */
      route(path, app) {
        const subApp = this.basePath(path);
        app.routes.map((r) => {
          let handler;
          if (app.errorHandler === errorHandler) {
            handler = r.handler;
          } else {
            handler = /* @__PURE__ */ __name(async (c, next) => (await compose([], app.errorHandler)(c, () => r.handler(c, next))).res, "handler");
            handler[COMPOSED_HANDLER] = r.handler;
          }
          subApp.#addRoute(r.method, r.path, handler, r.basePath);
        });
        return this;
      }
      /**
       * `.basePath()` allows base paths to be specified.
       *
       * @see {@link https://hono.dev/docs/api/routing#base-path}
       *
       * @param {string} path - base Path
       * @returns {Hono} changed Hono instance
       *
       * @example
       * ```ts
       * const api = new Hono().basePath('/api')
       * ```
       */
      basePath(path) {
        const subApp = this.#clone();
        subApp._basePath = mergePath(this._basePath, path);
        return subApp;
      }
      /**
       * `.onError()` handles an error and returns a customized Response.
       *
       * @see {@link https://hono.dev/docs/api/hono#error-handling}
       *
       * @param {ErrorHandler} handler - request Handler for error
       * @returns {Hono} changed Hono instance
       *
       * @example
       * ```ts
       * app.onError((err, c) => {
       *   console.error(`${err}`)
       *   return c.text('Custom Error Message', 500)
       * })
       * ```
       */
      onError = /* @__PURE__ */ __name((handler) => {
        this.errorHandler = handler;
        return this;
      }, "onError");
      /**
       * `.notFound()` allows you to customize a Not Found Response.
       *
       * @see {@link https://hono.dev/docs/api/hono#not-found}
       *
       * @param {NotFoundHandler} handler - request handler for not-found
       * @returns {Hono} changed Hono instance
       *
       * @example
       * ```ts
       * app.notFound((c) => {
       *   return c.text('Custom 404 Message', 404)
       * })
       * ```
       */
      notFound = /* @__PURE__ */ __name((handler) => {
        this.#notFoundHandler = handler;
        return this;
      }, "notFound");
      /**
       * `.mount()` allows you to mount applications built with other frameworks into your Hono application.
       *
       * @see {@link https://hono.dev/docs/api/hono#mount}
       *
       * @param {string} path - base Path
       * @param {Function} applicationHandler - other Request Handler
       * @param {MountOptions} [options] - options of `.mount()`
       * @returns {Hono} mounted Hono instance
       *
       * @example
       * ```ts
       * import { Router as IttyRouter } from 'itty-router'
       * import { Hono } from 'hono'
       * // Create itty-router application
       * const ittyRouter = IttyRouter()
       * // GET /itty-router/hello
       * ittyRouter.get('/hello', () => new Response('Hello from itty-router'))
       *
       * const app = new Hono()
       * app.mount('/itty-router', ittyRouter.handle)
       * ```
       *
       * @example
       * ```ts
       * const app = new Hono()
       * // Send the request to another application without modification.
       * app.mount('/app', anotherApp, {
       *   replaceRequest: (req) => req,
       * })
       * ```
       */
      mount(path, applicationHandler, options) {
        let replaceRequest;
        let optionHandler;
        if (options) {
          if (typeof options === "function") {
            optionHandler = options;
          } else {
            optionHandler = options.optionHandler;
            if (options.replaceRequest === false) {
              replaceRequest = /* @__PURE__ */ __name((request) => request, "replaceRequest");
            } else {
              replaceRequest = options.replaceRequest;
            }
          }
        }
        const getOptions = optionHandler ? (c) => {
          const options2 = optionHandler(c);
          return Array.isArray(options2) ? options2 : [options2];
        } : (c) => {
          let executionContext = void 0;
          try {
            executionContext = c.executionCtx;
          } catch {
          }
          return [c.env, executionContext];
        };
        replaceRequest ||= (() => {
          const mergedPath = mergePath(this._basePath, path);
          const pathPrefixLength = mergedPath === "/" ? 0 : mergedPath.length;
          return (request) => {
            const url = new URL(request.url);
            url.pathname = this.getPath(request).slice(pathPrefixLength) || "/";
            return new Request(url, request);
          };
        })();
        const handler = /* @__PURE__ */ __name(async (c, next) => {
          const res = await applicationHandler(replaceRequest(c.req.raw), ...getOptions(c));
          if (res) {
            return res;
          }
          await next();
        }, "handler");
        this.#addRoute(METHOD_NAME_ALL, mergePath(path, "*"), handler);
        return this;
      }
      #addRoute(method, path, handler, baseRoutePath) {
        method = method.toUpperCase();
        path = mergePath(this._basePath, path);
        const r = {
          basePath: baseRoutePath !== void 0 ? mergePath(this._basePath, baseRoutePath) : this._basePath,
          path,
          method,
          handler
        };
        this.router.add(method, path, [handler, r]);
        this.routes.push(r);
      }
      #handleError(err, c) {
        if (err instanceof Error) {
          return this.errorHandler(err, c);
        }
        throw err;
      }
      #dispatch(request, executionCtx, env2, method) {
        if (method === "HEAD") {
          return (async () => new Response(null, await this.#dispatch(request, executionCtx, env2, "GET")))();
        }
        const path = this.getPath(request, { env: env2 });
        const matchResult = this.router.match(method, path);
        const c = new Context(request, {
          path,
          matchResult,
          env: env2,
          executionCtx,
          notFoundHandler: this.#notFoundHandler
        });
        if (matchResult[0].length === 1) {
          let res;
          try {
            res = matchResult[0][0][0][0](c, async () => {
              c.res = await this.#notFoundHandler(c);
            });
          } catch (err) {
            return this.#handleError(err, c);
          }
          return res instanceof Promise ? res.then(
            (resolved) => resolved || (c.finalized ? c.res : this.#notFoundHandler(c))
          ).catch((err) => this.#handleError(err, c)) : res ?? this.#notFoundHandler(c);
        }
        const composed = compose(matchResult[0], this.errorHandler, this.#notFoundHandler);
        return (async () => {
          try {
            const context2 = await composed(c);
            if (!context2.finalized) {
              throw new Error(
                "Context is not finalized. Did you forget to return a Response object or `await next()`?"
              );
            }
            return context2.res;
          } catch (err) {
            return this.#handleError(err, c);
          }
        })();
      }
      /**
       * `.fetch()` will be entry point of your app.
       *
       * @see {@link https://hono.dev/docs/api/hono#fetch}
       *
       * @param {Request} request - request Object of request
       * @param {Env} Env - env Object
       * @param {ExecutionContext} - context of execution
       * @returns {Response | Promise<Response>} response of request
       *
       */
      fetch = /* @__PURE__ */ __name((request, ...rest) => {
        return this.#dispatch(request, rest[1], rest[0], request.method);
      }, "fetch");
      /**
       * `.request()` is a useful method for testing.
       * You can pass a URL or pathname to send a GET request.
       * app will return a Response object.
       * ```ts
       * test('GET /hello is ok', async () => {
       *   const res = await app.request('/hello')
       *   expect(res.status).toBe(200)
       * })
       * ```
       * @see https://hono.dev/docs/api/hono#request
       */
      request = /* @__PURE__ */ __name((input, requestInit, Env, executionCtx) => {
        if (input instanceof Request) {
          return this.fetch(requestInit ? new Request(input, requestInit) : input, Env, executionCtx);
        }
        input = input.toString();
        return this.fetch(
          new Request(
            /^https?:\/\//.test(input) ? input : `http://localhost${mergePath("/", input)}`,
            requestInit
          ),
          Env,
          executionCtx
        );
      }, "request");
      /**
       * `.fire()` automatically adds a global fetch event listener.
       * This can be useful for environments that adhere to the Service Worker API, such as non-ES module Cloudflare Workers.
       * @deprecated
       * Use `fire` from `hono/service-worker` instead.
       * ```ts
       * import { Hono } from 'hono'
       * import { fire } from 'hono/service-worker'
       *
       * const app = new Hono()
       * // ...
       * fire(app)
       * ```
       * @see https://hono.dev/docs/api/hono#fire
       * @see https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
       * @see https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/
       */
      fire = /* @__PURE__ */ __name(() => {
        addEventListener("fetch", (event) => {
          event.respondWith(this.#dispatch(event.request, event, void 0, event.request.method));
        });
      }, "fire");
    };
  }
});

// node_modules/hono/dist/router/reg-exp-router/matcher.js
function match(method, path) {
  const matchers = this.buildAllMatchers();
  const match22 = /* @__PURE__ */ __name(((method2, path2) => {
    const matcher = matchers[method2] || matchers[METHOD_NAME_ALL];
    const staticMatch = matcher[2][path2];
    if (staticMatch) {
      return staticMatch;
    }
    const match3 = path2.match(matcher[0]);
    if (!match3) {
      return [[], emptyParam];
    }
    const index = match3.indexOf("", 1);
    return [matcher[1][index], match3];
  }), "match2");
  this.match = match22;
  return match22(method, path);
}
var emptyParam;
var init_matcher = __esm({
  "node_modules/hono/dist/router/reg-exp-router/matcher.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_router();
    emptyParam = [];
    __name(match, "match");
  }
});

// node_modules/hono/dist/router/reg-exp-router/node.js
function compareKey(a, b) {
  if (a.length === 1) {
    return b.length === 1 ? a < b ? -1 : 1 : -1;
  }
  if (b.length === 1) {
    return 1;
  }
  if (a === ONLY_WILDCARD_REG_EXP_STR || a === TAIL_WILDCARD_REG_EXP_STR) {
    return 1;
  } else if (b === ONLY_WILDCARD_REG_EXP_STR || b === TAIL_WILDCARD_REG_EXP_STR) {
    return -1;
  }
  if (a === LABEL_REG_EXP_STR) {
    return 1;
  } else if (b === LABEL_REG_EXP_STR) {
    return -1;
  }
  return a.length === b.length ? a < b ? -1 : 1 : b.length - a.length;
}
var LABEL_REG_EXP_STR, ONLY_WILDCARD_REG_EXP_STR, TAIL_WILDCARD_REG_EXP_STR, PATH_ERROR, regExpMetaChars, Node;
var init_node = __esm({
  "node_modules/hono/dist/router/reg-exp-router/node.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    LABEL_REG_EXP_STR = "[^/]+";
    ONLY_WILDCARD_REG_EXP_STR = ".*";
    TAIL_WILDCARD_REG_EXP_STR = "(?:|/.*)";
    PATH_ERROR = /* @__PURE__ */ Symbol();
    regExpMetaChars = new Set(".\\+*[^]$()");
    __name(compareKey, "compareKey");
    Node = class _Node {
      static {
        __name(this, "_Node");
      }
      #index;
      #varIndex;
      #children = /* @__PURE__ */ Object.create(null);
      insert(tokens, index, paramMap, context2, pathErrorCheckOnly) {
        if (tokens.length === 0) {
          if (this.#index !== void 0) {
            throw PATH_ERROR;
          }
          if (pathErrorCheckOnly) {
            return;
          }
          this.#index = index;
          return;
        }
        const [token, ...restTokens] = tokens;
        const pattern = token === "*" ? restTokens.length === 0 ? ["", "", ONLY_WILDCARD_REG_EXP_STR] : ["", "", LABEL_REG_EXP_STR] : token === "/*" ? ["", "", TAIL_WILDCARD_REG_EXP_STR] : token.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
        let node;
        if (pattern) {
          const name = pattern[1];
          let regexpStr = pattern[2] || LABEL_REG_EXP_STR;
          if (name && pattern[2]) {
            if (regexpStr === ".*") {
              throw PATH_ERROR;
            }
            regexpStr = regexpStr.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:");
            if (/\((?!\?:)/.test(regexpStr)) {
              throw PATH_ERROR;
            }
          }
          node = this.#children[regexpStr];
          if (!node) {
            if (Object.keys(this.#children).some(
              (k) => k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
            )) {
              throw PATH_ERROR;
            }
            if (pathErrorCheckOnly) {
              return;
            }
            node = this.#children[regexpStr] = new _Node();
            if (name !== "") {
              node.#varIndex = context2.varIndex++;
            }
          }
          if (!pathErrorCheckOnly && name !== "") {
            paramMap.push([name, node.#varIndex]);
          }
        } else {
          node = this.#children[token];
          if (!node) {
            if (Object.keys(this.#children).some(
              (k) => k.length > 1 && k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
            )) {
              throw PATH_ERROR;
            }
            if (pathErrorCheckOnly) {
              return;
            }
            node = this.#children[token] = new _Node();
          }
        }
        node.insert(restTokens, index, paramMap, context2, pathErrorCheckOnly);
      }
      buildRegExpStr() {
        const childKeys = Object.keys(this.#children).sort(compareKey);
        const strList = childKeys.map((k) => {
          const c = this.#children[k];
          return (typeof c.#varIndex === "number" ? `(${k})@${c.#varIndex}` : regExpMetaChars.has(k) ? `\\${k}` : k) + c.buildRegExpStr();
        });
        if (typeof this.#index === "number") {
          strList.unshift(`#${this.#index}`);
        }
        if (strList.length === 0) {
          return "";
        }
        if (strList.length === 1) {
          return strList[0];
        }
        return "(?:" + strList.join("|") + ")";
      }
    };
  }
});

// node_modules/hono/dist/router/reg-exp-router/trie.js
var Trie;
var init_trie = __esm({
  "node_modules/hono/dist/router/reg-exp-router/trie.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_node();
    Trie = class {
      static {
        __name(this, "Trie");
      }
      #context = { varIndex: 0 };
      #root = new Node();
      insert(path, index, pathErrorCheckOnly) {
        const paramAssoc = [];
        const groups = [];
        for (let i = 0; ; ) {
          let replaced = false;
          path = path.replace(/\{[^}]+\}/g, (m2) => {
            const mark = `@\\${i}`;
            groups[i] = [mark, m2];
            i++;
            replaced = true;
            return mark;
          });
          if (!replaced) {
            break;
          }
        }
        const tokens = path.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
        for (let i = groups.length - 1; i >= 0; i--) {
          const [mark] = groups[i];
          for (let j = tokens.length - 1; j >= 0; j--) {
            if (tokens[j].indexOf(mark) !== -1) {
              tokens[j] = tokens[j].replace(mark, groups[i][1]);
              break;
            }
          }
        }
        this.#root.insert(tokens, index, paramAssoc, this.#context, pathErrorCheckOnly);
        return paramAssoc;
      }
      buildRegExp() {
        let regexp = this.#root.buildRegExpStr();
        if (regexp === "") {
          return [/^$/, [], []];
        }
        let captureIndex = 0;
        const indexReplacementMap = [];
        const paramReplacementMap = [];
        regexp = regexp.replace(/#(\d+)|@(\d+)|\.\*\$/g, (_, handlerIndex, paramIndex) => {
          if (handlerIndex !== void 0) {
            indexReplacementMap[++captureIndex] = Number(handlerIndex);
            return "$()";
          }
          if (paramIndex !== void 0) {
            paramReplacementMap[Number(paramIndex)] = ++captureIndex;
            return "";
          }
          return "";
        });
        return [new RegExp(`^${regexp}`), indexReplacementMap, paramReplacementMap];
      }
    };
  }
});

// node_modules/hono/dist/router/reg-exp-router/router.js
function buildWildcardRegExp(path) {
  return wildcardRegExpCache[path] ??= new RegExp(
    path === "*" ? "" : `^${path.replace(
      /\/\*$|([.\\+*[^\]$()])/g,
      (_, metaChar) => metaChar ? `\\${metaChar}` : "(?:|/.*)"
    )}$`
  );
}
function clearWildcardRegExpCache() {
  wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
}
function buildMatcherFromPreprocessedRoutes(routes) {
  const trie = new Trie();
  const handlerData = [];
  if (routes.length === 0) {
    return nullMatcher;
  }
  const routesWithStaticPathFlag = routes.map(
    (route) => [!/\*|\/:/.test(route[0]), ...route]
  ).sort(
    ([isStaticA, pathA], [isStaticB, pathB]) => isStaticA ? 1 : isStaticB ? -1 : pathA.length - pathB.length
  );
  const staticMap = /* @__PURE__ */ Object.create(null);
  for (let i = 0, j = -1, len = routesWithStaticPathFlag.length; i < len; i++) {
    const [pathErrorCheckOnly, path, handlers] = routesWithStaticPathFlag[i];
    if (pathErrorCheckOnly) {
      staticMap[path] = [handlers.map(([h2]) => [h2, /* @__PURE__ */ Object.create(null)]), emptyParam];
    } else {
      j++;
    }
    let paramAssoc;
    try {
      paramAssoc = trie.insert(path, j, pathErrorCheckOnly);
    } catch (e) {
      throw e === PATH_ERROR ? new UnsupportedPathError(path) : e;
    }
    if (pathErrorCheckOnly) {
      continue;
    }
    handlerData[j] = handlers.map(([h2, paramCount]) => {
      const paramIndexMap = /* @__PURE__ */ Object.create(null);
      paramCount -= 1;
      for (; paramCount >= 0; paramCount--) {
        const [key, value] = paramAssoc[paramCount];
        paramIndexMap[key] = value;
      }
      return [h2, paramIndexMap];
    });
  }
  const [regexp, indexReplacementMap, paramReplacementMap] = trie.buildRegExp();
  for (let i = 0, len = handlerData.length; i < len; i++) {
    for (let j = 0, len2 = handlerData[i].length; j < len2; j++) {
      const map = handlerData[i][j]?.[1];
      if (!map) {
        continue;
      }
      const keys = Object.keys(map);
      for (let k = 0, len3 = keys.length; k < len3; k++) {
        map[keys[k]] = paramReplacementMap[map[keys[k]]];
      }
    }
  }
  const handlerMap = [];
  for (const i in indexReplacementMap) {
    handlerMap[i] = handlerData[indexReplacementMap[i]];
  }
  return [regexp, handlerMap, staticMap];
}
function findMiddleware(middleware, path) {
  if (!middleware) {
    return void 0;
  }
  for (const k of Object.keys(middleware).sort((a, b) => b.length - a.length)) {
    if (buildWildcardRegExp(k).test(path)) {
      return [...middleware[k]];
    }
  }
  return void 0;
}
var nullMatcher, wildcardRegExpCache, RegExpRouter;
var init_router2 = __esm({
  "node_modules/hono/dist/router/reg-exp-router/router.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_router();
    init_url();
    init_matcher();
    init_node();
    init_trie();
    nullMatcher = [/^$/, [], /* @__PURE__ */ Object.create(null)];
    wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
    __name(buildWildcardRegExp, "buildWildcardRegExp");
    __name(clearWildcardRegExpCache, "clearWildcardRegExpCache");
    __name(buildMatcherFromPreprocessedRoutes, "buildMatcherFromPreprocessedRoutes");
    __name(findMiddleware, "findMiddleware");
    RegExpRouter = class {
      static {
        __name(this, "RegExpRouter");
      }
      name = "RegExpRouter";
      #middleware;
      #routes;
      constructor() {
        this.#middleware = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
        this.#routes = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
      }
      add(method, path, handler) {
        const middleware = this.#middleware;
        const routes = this.#routes;
        if (!middleware || !routes) {
          throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
        }
        if (!middleware[method]) {
          ;
          [middleware, routes].forEach((handlerMap) => {
            handlerMap[method] = /* @__PURE__ */ Object.create(null);
            Object.keys(handlerMap[METHOD_NAME_ALL]).forEach((p) => {
              handlerMap[method][p] = [...handlerMap[METHOD_NAME_ALL][p]];
            });
          });
        }
        if (path === "/*") {
          path = "*";
        }
        const paramCount = (path.match(/\/:/g) || []).length;
        if (/\*$/.test(path)) {
          const re = buildWildcardRegExp(path);
          if (method === METHOD_NAME_ALL) {
            Object.keys(middleware).forEach((m2) => {
              middleware[m2][path] ||= findMiddleware(middleware[m2], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
            });
          } else {
            middleware[method][path] ||= findMiddleware(middleware[method], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
          }
          Object.keys(middleware).forEach((m2) => {
            if (method === METHOD_NAME_ALL || method === m2) {
              Object.keys(middleware[m2]).forEach((p) => {
                re.test(p) && middleware[m2][p].push([handler, paramCount]);
              });
            }
          });
          Object.keys(routes).forEach((m2) => {
            if (method === METHOD_NAME_ALL || method === m2) {
              Object.keys(routes[m2]).forEach(
                (p) => re.test(p) && routes[m2][p].push([handler, paramCount])
              );
            }
          });
          return;
        }
        const paths = checkOptionalParameter(path) || [path];
        for (let i = 0, len = paths.length; i < len; i++) {
          const path2 = paths[i];
          Object.keys(routes).forEach((m2) => {
            if (method === METHOD_NAME_ALL || method === m2) {
              routes[m2][path2] ||= [
                ...findMiddleware(middleware[m2], path2) || findMiddleware(middleware[METHOD_NAME_ALL], path2) || []
              ];
              routes[m2][path2].push([handler, paramCount - len + i + 1]);
            }
          });
        }
      }
      match = match;
      buildAllMatchers() {
        const matchers = /* @__PURE__ */ Object.create(null);
        Object.keys(this.#routes).concat(Object.keys(this.#middleware)).forEach((method) => {
          matchers[method] ||= this.#buildMatcher(method);
        });
        this.#middleware = this.#routes = void 0;
        clearWildcardRegExpCache();
        return matchers;
      }
      #buildMatcher(method) {
        const routes = [];
        let hasOwnRoute = method === METHOD_NAME_ALL;
        [this.#middleware, this.#routes].forEach((r) => {
          const ownRoute = r[method] ? Object.keys(r[method]).map((path) => [path, r[method][path]]) : [];
          if (ownRoute.length !== 0) {
            hasOwnRoute ||= true;
            routes.push(...ownRoute);
          } else if (method !== METHOD_NAME_ALL) {
            routes.push(
              ...Object.keys(r[METHOD_NAME_ALL]).map((path) => [path, r[METHOD_NAME_ALL][path]])
            );
          }
        });
        if (!hasOwnRoute) {
          return null;
        } else {
          return buildMatcherFromPreprocessedRoutes(routes);
        }
      }
    };
  }
});

// node_modules/hono/dist/router/reg-exp-router/prepared-router.js
var init_prepared_router = __esm({
  "node_modules/hono/dist/router/reg-exp-router/prepared-router.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_router();
    init_matcher();
    init_router2();
  }
});

// node_modules/hono/dist/router/reg-exp-router/index.js
var init_reg_exp_router = __esm({
  "node_modules/hono/dist/router/reg-exp-router/index.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_router2();
    init_prepared_router();
  }
});

// node_modules/hono/dist/router/smart-router/router.js
var SmartRouter;
var init_router3 = __esm({
  "node_modules/hono/dist/router/smart-router/router.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_router();
    SmartRouter = class {
      static {
        __name(this, "SmartRouter");
      }
      name = "SmartRouter";
      #routers = [];
      #routes = [];
      constructor(init) {
        this.#routers = init.routers;
      }
      add(method, path, handler) {
        if (!this.#routes) {
          throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
        }
        this.#routes.push([method, path, handler]);
      }
      match(method, path) {
        if (!this.#routes) {
          throw new Error("Fatal error");
        }
        const routers = this.#routers;
        const routes = this.#routes;
        const len = routers.length;
        let i = 0;
        let res;
        for (; i < len; i++) {
          const router = routers[i];
          try {
            for (let i2 = 0, len2 = routes.length; i2 < len2; i2++) {
              router.add(...routes[i2]);
            }
            res = router.match(method, path);
          } catch (e) {
            if (e instanceof UnsupportedPathError) {
              continue;
            }
            throw e;
          }
          this.match = router.match.bind(router);
          this.#routers = [router];
          this.#routes = void 0;
          break;
        }
        if (i === len) {
          throw new Error("Fatal error");
        }
        this.name = `SmartRouter + ${this.activeRouter.name}`;
        return res;
      }
      get activeRouter() {
        if (this.#routes || this.#routers.length !== 1) {
          throw new Error("No active router has been determined yet.");
        }
        return this.#routers[0];
      }
    };
  }
});

// node_modules/hono/dist/router/smart-router/index.js
var init_smart_router = __esm({
  "node_modules/hono/dist/router/smart-router/index.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_router3();
  }
});

// node_modules/hono/dist/router/trie-router/node.js
var emptyParams, hasChildren, Node2;
var init_node2 = __esm({
  "node_modules/hono/dist/router/trie-router/node.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_router();
    init_url();
    emptyParams = /* @__PURE__ */ Object.create(null);
    hasChildren = /* @__PURE__ */ __name((children) => {
      for (const _ in children) {
        return true;
      }
      return false;
    }, "hasChildren");
    Node2 = class _Node2 {
      static {
        __name(this, "_Node");
      }
      #methods;
      #children;
      #patterns;
      #order = 0;
      #params = emptyParams;
      constructor(method, handler, children) {
        this.#children = children || /* @__PURE__ */ Object.create(null);
        this.#methods = [];
        if (method && handler) {
          const m2 = /* @__PURE__ */ Object.create(null);
          m2[method] = { handler, possibleKeys: [], score: 0 };
          this.#methods = [m2];
        }
        this.#patterns = [];
      }
      insert(method, path, handler) {
        this.#order = ++this.#order;
        let curNode = this;
        const parts = splitRoutingPath(path);
        const possibleKeys = [];
        for (let i = 0, len = parts.length; i < len; i++) {
          const p = parts[i];
          const nextP = parts[i + 1];
          const pattern = getPattern(p, nextP);
          const key = Array.isArray(pattern) ? pattern[0] : p;
          if (key in curNode.#children) {
            curNode = curNode.#children[key];
            if (pattern) {
              possibleKeys.push(pattern[1]);
            }
            continue;
          }
          curNode.#children[key] = new _Node2();
          if (pattern) {
            curNode.#patterns.push(pattern);
            possibleKeys.push(pattern[1]);
          }
          curNode = curNode.#children[key];
        }
        curNode.#methods.push({
          [method]: {
            handler,
            possibleKeys: possibleKeys.filter((v, i, a) => a.indexOf(v) === i),
            score: this.#order
          }
        });
        return curNode;
      }
      #pushHandlerSets(handlerSets, node, method, nodeParams, params) {
        for (let i = 0, len = node.#methods.length; i < len; i++) {
          const m2 = node.#methods[i];
          const handlerSet = m2[method] || m2[METHOD_NAME_ALL];
          const processedSet = {};
          if (handlerSet !== void 0) {
            handlerSet.params = /* @__PURE__ */ Object.create(null);
            handlerSets.push(handlerSet);
            if (nodeParams !== emptyParams || params && params !== emptyParams) {
              for (let i2 = 0, len2 = handlerSet.possibleKeys.length; i2 < len2; i2++) {
                const key = handlerSet.possibleKeys[i2];
                const processed = processedSet[handlerSet.score];
                handlerSet.params[key] = params?.[key] && !processed ? params[key] : nodeParams[key] ?? params?.[key];
                processedSet[handlerSet.score] = true;
              }
            }
          }
        }
      }
      search(method, path) {
        const handlerSets = [];
        this.#params = emptyParams;
        const curNode = this;
        let curNodes = [curNode];
        const parts = splitPath(path);
        const curNodesQueue = [];
        const len = parts.length;
        let partOffsets = null;
        for (let i = 0; i < len; i++) {
          const part = parts[i];
          const isLast = i === len - 1;
          const tempNodes = [];
          for (let j = 0, len2 = curNodes.length; j < len2; j++) {
            const node = curNodes[j];
            const nextNode = node.#children[part];
            if (nextNode) {
              nextNode.#params = node.#params;
              if (isLast) {
                if (nextNode.#children["*"]) {
                  this.#pushHandlerSets(handlerSets, nextNode.#children["*"], method, node.#params);
                }
                this.#pushHandlerSets(handlerSets, nextNode, method, node.#params);
              } else {
                tempNodes.push(nextNode);
              }
            }
            for (let k = 0, len3 = node.#patterns.length; k < len3; k++) {
              const pattern = node.#patterns[k];
              const params = node.#params === emptyParams ? {} : { ...node.#params };
              if (pattern === "*") {
                const astNode = node.#children["*"];
                if (astNode) {
                  this.#pushHandlerSets(handlerSets, astNode, method, node.#params);
                  astNode.#params = params;
                  tempNodes.push(astNode);
                }
                continue;
              }
              const [key, name, matcher] = pattern;
              if (!part && !(matcher instanceof RegExp)) {
                continue;
              }
              const child = node.#children[key];
              if (matcher instanceof RegExp) {
                if (partOffsets === null) {
                  partOffsets = new Array(len);
                  let offset = path[0] === "/" ? 1 : 0;
                  for (let p = 0; p < len; p++) {
                    partOffsets[p] = offset;
                    offset += parts[p].length + 1;
                  }
                }
                const restPathString = path.substring(partOffsets[i]);
                const m2 = matcher.exec(restPathString);
                if (m2) {
                  params[name] = m2[0];
                  this.#pushHandlerSets(handlerSets, child, method, node.#params, params);
                  if (hasChildren(child.#children)) {
                    child.#params = params;
                    const componentCount = m2[0].match(/\//)?.length ?? 0;
                    const targetCurNodes = curNodesQueue[componentCount] ||= [];
                    targetCurNodes.push(child);
                  }
                  continue;
                }
              }
              if (matcher === true || matcher.test(part)) {
                params[name] = part;
                if (isLast) {
                  this.#pushHandlerSets(handlerSets, child, method, params, node.#params);
                  if (child.#children["*"]) {
                    this.#pushHandlerSets(
                      handlerSets,
                      child.#children["*"],
                      method,
                      params,
                      node.#params
                    );
                  }
                } else {
                  child.#params = params;
                  tempNodes.push(child);
                }
              }
            }
          }
          const shifted = curNodesQueue.shift();
          curNodes = shifted ? tempNodes.concat(shifted) : tempNodes;
        }
        if (handlerSets.length > 1) {
          handlerSets.sort((a, b) => {
            return a.score - b.score;
          });
        }
        return [handlerSets.map(({ handler, params }) => [handler, params])];
      }
    };
  }
});

// node_modules/hono/dist/router/trie-router/router.js
var TrieRouter;
var init_router4 = __esm({
  "node_modules/hono/dist/router/trie-router/router.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_url();
    init_node2();
    TrieRouter = class {
      static {
        __name(this, "TrieRouter");
      }
      name = "TrieRouter";
      #node;
      constructor() {
        this.#node = new Node2();
      }
      add(method, path, handler) {
        const results = checkOptionalParameter(path);
        if (results) {
          for (let i = 0, len = results.length; i < len; i++) {
            this.#node.insert(method, results[i], handler);
          }
          return;
        }
        this.#node.insert(method, path, handler);
      }
      match(method, path) {
        return this.#node.search(method, path);
      }
    };
  }
});

// node_modules/hono/dist/router/trie-router/index.js
var init_trie_router = __esm({
  "node_modules/hono/dist/router/trie-router/index.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_router4();
  }
});

// node_modules/hono/dist/hono.js
var Hono2;
var init_hono = __esm({
  "node_modules/hono/dist/hono.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_hono_base();
    init_reg_exp_router();
    init_smart_router();
    init_trie_router();
    Hono2 = class extends Hono {
      static {
        __name(this, "Hono");
      }
      /**
       * Creates an instance of the Hono class.
       *
       * @param options - Optional configuration options for the Hono instance.
       */
      constructor(options = {}) {
        super(options);
        this.router = options.router ?? new SmartRouter({
          routers: [new RegExpRouter(), new TrieRouter()]
        });
      }
    };
  }
});

// node_modules/hono/dist/index.js
var init_dist = __esm({
  "node_modules/hono/dist/index.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_hono();
    init_context();
  }
});

// node_modules/unenv/dist/runtime/node/internal/fs/promises.mjs
var access, copyFile, cp, open, opendir, rename, truncate, rm, rmdir, mkdir, readdir, readlink, symlink, lstat, stat, link, unlink, chmod, lchmod, lchown, chown, utimes, lutimes, realpath, mkdtemp, writeFile, appendFile, readFile, watch, statfs, glob;
var init_promises = __esm({
  "node_modules/unenv/dist/runtime/node/internal/fs/promises.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    access = /* @__PURE__ */ notImplemented("fs.access");
    copyFile = /* @__PURE__ */ notImplemented("fs.copyFile");
    cp = /* @__PURE__ */ notImplemented("fs.cp");
    open = /* @__PURE__ */ notImplemented("fs.open");
    opendir = /* @__PURE__ */ notImplemented("fs.opendir");
    rename = /* @__PURE__ */ notImplemented("fs.rename");
    truncate = /* @__PURE__ */ notImplemented("fs.truncate");
    rm = /* @__PURE__ */ notImplemented("fs.rm");
    rmdir = /* @__PURE__ */ notImplemented("fs.rmdir");
    mkdir = /* @__PURE__ */ notImplemented("fs.mkdir");
    readdir = /* @__PURE__ */ notImplemented("fs.readdir");
    readlink = /* @__PURE__ */ notImplemented("fs.readlink");
    symlink = /* @__PURE__ */ notImplemented("fs.symlink");
    lstat = /* @__PURE__ */ notImplemented("fs.lstat");
    stat = /* @__PURE__ */ notImplemented("fs.stat");
    link = /* @__PURE__ */ notImplemented("fs.link");
    unlink = /* @__PURE__ */ notImplemented("fs.unlink");
    chmod = /* @__PURE__ */ notImplemented("fs.chmod");
    lchmod = /* @__PURE__ */ notImplemented("fs.lchmod");
    lchown = /* @__PURE__ */ notImplemented("fs.lchown");
    chown = /* @__PURE__ */ notImplemented("fs.chown");
    utimes = /* @__PURE__ */ notImplemented("fs.utimes");
    lutimes = /* @__PURE__ */ notImplemented("fs.lutimes");
    realpath = /* @__PURE__ */ notImplemented("fs.realpath");
    mkdtemp = /* @__PURE__ */ notImplemented("fs.mkdtemp");
    writeFile = /* @__PURE__ */ notImplemented("fs.writeFile");
    appendFile = /* @__PURE__ */ notImplemented("fs.appendFile");
    readFile = /* @__PURE__ */ notImplemented("fs.readFile");
    watch = /* @__PURE__ */ notImplemented("fs.watch");
    statfs = /* @__PURE__ */ notImplemented("fs.statfs");
    glob = /* @__PURE__ */ notImplemented("fs.glob");
  }
});

// node_modules/unenv/dist/runtime/node/internal/fs/constants.mjs
var constants_exports = {};
__export(constants_exports, {
  COPYFILE_EXCL: () => COPYFILE_EXCL,
  COPYFILE_FICLONE: () => COPYFILE_FICLONE,
  COPYFILE_FICLONE_FORCE: () => COPYFILE_FICLONE_FORCE,
  EXTENSIONLESS_FORMAT_JAVASCRIPT: () => EXTENSIONLESS_FORMAT_JAVASCRIPT,
  EXTENSIONLESS_FORMAT_WASM: () => EXTENSIONLESS_FORMAT_WASM,
  F_OK: () => F_OK,
  O_APPEND: () => O_APPEND,
  O_CREAT: () => O_CREAT,
  O_DIRECT: () => O_DIRECT,
  O_DIRECTORY: () => O_DIRECTORY,
  O_DSYNC: () => O_DSYNC,
  O_EXCL: () => O_EXCL,
  O_NOATIME: () => O_NOATIME,
  O_NOCTTY: () => O_NOCTTY,
  O_NOFOLLOW: () => O_NOFOLLOW,
  O_NONBLOCK: () => O_NONBLOCK,
  O_RDONLY: () => O_RDONLY,
  O_RDWR: () => O_RDWR,
  O_SYNC: () => O_SYNC,
  O_TRUNC: () => O_TRUNC,
  O_WRONLY: () => O_WRONLY,
  R_OK: () => R_OK,
  S_IFBLK: () => S_IFBLK,
  S_IFCHR: () => S_IFCHR,
  S_IFDIR: () => S_IFDIR,
  S_IFIFO: () => S_IFIFO,
  S_IFLNK: () => S_IFLNK,
  S_IFMT: () => S_IFMT,
  S_IFREG: () => S_IFREG,
  S_IFSOCK: () => S_IFSOCK,
  S_IRGRP: () => S_IRGRP,
  S_IROTH: () => S_IROTH,
  S_IRUSR: () => S_IRUSR,
  S_IRWXG: () => S_IRWXG,
  S_IRWXO: () => S_IRWXO,
  S_IRWXU: () => S_IRWXU,
  S_IWGRP: () => S_IWGRP,
  S_IWOTH: () => S_IWOTH,
  S_IWUSR: () => S_IWUSR,
  S_IXGRP: () => S_IXGRP,
  S_IXOTH: () => S_IXOTH,
  S_IXUSR: () => S_IXUSR,
  UV_DIRENT_BLOCK: () => UV_DIRENT_BLOCK,
  UV_DIRENT_CHAR: () => UV_DIRENT_CHAR,
  UV_DIRENT_DIR: () => UV_DIRENT_DIR,
  UV_DIRENT_FIFO: () => UV_DIRENT_FIFO,
  UV_DIRENT_FILE: () => UV_DIRENT_FILE,
  UV_DIRENT_LINK: () => UV_DIRENT_LINK,
  UV_DIRENT_SOCKET: () => UV_DIRENT_SOCKET,
  UV_DIRENT_UNKNOWN: () => UV_DIRENT_UNKNOWN,
  UV_FS_COPYFILE_EXCL: () => UV_FS_COPYFILE_EXCL,
  UV_FS_COPYFILE_FICLONE: () => UV_FS_COPYFILE_FICLONE,
  UV_FS_COPYFILE_FICLONE_FORCE: () => UV_FS_COPYFILE_FICLONE_FORCE,
  UV_FS_O_FILEMAP: () => UV_FS_O_FILEMAP,
  UV_FS_SYMLINK_DIR: () => UV_FS_SYMLINK_DIR,
  UV_FS_SYMLINK_JUNCTION: () => UV_FS_SYMLINK_JUNCTION,
  W_OK: () => W_OK,
  X_OK: () => X_OK
});
var UV_FS_SYMLINK_DIR, UV_FS_SYMLINK_JUNCTION, O_RDONLY, O_WRONLY, O_RDWR, UV_DIRENT_UNKNOWN, UV_DIRENT_FILE, UV_DIRENT_DIR, UV_DIRENT_LINK, UV_DIRENT_FIFO, UV_DIRENT_SOCKET, UV_DIRENT_CHAR, UV_DIRENT_BLOCK, EXTENSIONLESS_FORMAT_JAVASCRIPT, EXTENSIONLESS_FORMAT_WASM, S_IFMT, S_IFREG, S_IFDIR, S_IFCHR, S_IFBLK, S_IFIFO, S_IFLNK, S_IFSOCK, O_CREAT, O_EXCL, UV_FS_O_FILEMAP, O_NOCTTY, O_TRUNC, O_APPEND, O_DIRECTORY, O_NOATIME, O_NOFOLLOW, O_SYNC, O_DSYNC, O_DIRECT, O_NONBLOCK, S_IRWXU, S_IRUSR, S_IWUSR, S_IXUSR, S_IRWXG, S_IRGRP, S_IWGRP, S_IXGRP, S_IRWXO, S_IROTH, S_IWOTH, S_IXOTH, F_OK, R_OK, W_OK, X_OK, UV_FS_COPYFILE_EXCL, COPYFILE_EXCL, UV_FS_COPYFILE_FICLONE, COPYFILE_FICLONE, UV_FS_COPYFILE_FICLONE_FORCE, COPYFILE_FICLONE_FORCE;
var init_constants3 = __esm({
  "node_modules/unenv/dist/runtime/node/internal/fs/constants.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    UV_FS_SYMLINK_DIR = 1;
    UV_FS_SYMLINK_JUNCTION = 2;
    O_RDONLY = 0;
    O_WRONLY = 1;
    O_RDWR = 2;
    UV_DIRENT_UNKNOWN = 0;
    UV_DIRENT_FILE = 1;
    UV_DIRENT_DIR = 2;
    UV_DIRENT_LINK = 3;
    UV_DIRENT_FIFO = 4;
    UV_DIRENT_SOCKET = 5;
    UV_DIRENT_CHAR = 6;
    UV_DIRENT_BLOCK = 7;
    EXTENSIONLESS_FORMAT_JAVASCRIPT = 0;
    EXTENSIONLESS_FORMAT_WASM = 1;
    S_IFMT = 61440;
    S_IFREG = 32768;
    S_IFDIR = 16384;
    S_IFCHR = 8192;
    S_IFBLK = 24576;
    S_IFIFO = 4096;
    S_IFLNK = 40960;
    S_IFSOCK = 49152;
    O_CREAT = 64;
    O_EXCL = 128;
    UV_FS_O_FILEMAP = 0;
    O_NOCTTY = 256;
    O_TRUNC = 512;
    O_APPEND = 1024;
    O_DIRECTORY = 65536;
    O_NOATIME = 262144;
    O_NOFOLLOW = 131072;
    O_SYNC = 1052672;
    O_DSYNC = 4096;
    O_DIRECT = 16384;
    O_NONBLOCK = 2048;
    S_IRWXU = 448;
    S_IRUSR = 256;
    S_IWUSR = 128;
    S_IXUSR = 64;
    S_IRWXG = 56;
    S_IRGRP = 32;
    S_IWGRP = 16;
    S_IXGRP = 8;
    S_IRWXO = 7;
    S_IROTH = 4;
    S_IWOTH = 2;
    S_IXOTH = 1;
    F_OK = 0;
    R_OK = 4;
    W_OK = 2;
    X_OK = 1;
    UV_FS_COPYFILE_EXCL = 1;
    COPYFILE_EXCL = 1;
    UV_FS_COPYFILE_FICLONE = 2;
    COPYFILE_FICLONE = 2;
    UV_FS_COPYFILE_FICLONE_FORCE = 4;
    COPYFILE_FICLONE_FORCE = 4;
  }
});

// node_modules/unenv/dist/runtime/node/fs/promises.mjs
var promises_default;
var init_promises2 = __esm({
  "node_modules/unenv/dist/runtime/node/fs/promises.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_promises();
    init_constants3();
    init_promises();
    promises_default = {
      constants: constants_exports,
      access,
      appendFile,
      chmod,
      chown,
      copyFile,
      cp,
      glob,
      lchmod,
      lchown,
      link,
      lstat,
      lutimes,
      mkdir,
      mkdtemp,
      open,
      opendir,
      readFile,
      readdir,
      readlink,
      realpath,
      rename,
      rm,
      rmdir,
      stat,
      statfs,
      symlink,
      truncate,
      unlink,
      utimes,
      watch,
      writeFile
    };
  }
});

// node_modules/unenv/dist/runtime/node/internal/fs/classes.mjs
var Dir, Dirent, Stats, ReadStream2, WriteStream2, FileReadStream, FileWriteStream;
var init_classes = __esm({
  "node_modules/unenv/dist/runtime/node/internal/fs/classes.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    Dir = /* @__PURE__ */ notImplementedClass("fs.Dir");
    Dirent = /* @__PURE__ */ notImplementedClass("fs.Dirent");
    Stats = /* @__PURE__ */ notImplementedClass("fs.Stats");
    ReadStream2 = /* @__PURE__ */ notImplementedClass("fs.ReadStream");
    WriteStream2 = /* @__PURE__ */ notImplementedClass("fs.WriteStream");
    FileReadStream = ReadStream2;
    FileWriteStream = WriteStream2;
  }
});

// node_modules/unenv/dist/runtime/node/internal/fs/fs.mjs
function callbackify(fn) {
  const fnc = /* @__PURE__ */ __name(function(...args) {
    const cb = args.pop();
    fn().catch((error3) => cb(error3)).then((val) => cb(void 0, val));
  }, "fnc");
  fnc.__promisify__ = fn;
  fnc.native = fnc;
  return fnc;
}
var access2, appendFile2, chown2, chmod2, copyFile2, cp2, lchown2, lchmod2, link2, lstat2, lutimes2, mkdir2, mkdtemp2, realpath2, open2, opendir2, readdir2, readFile2, readlink2, rename2, rm2, rmdir2, stat2, symlink2, truncate2, unlink2, utimes2, writeFile2, statfs2, close, createReadStream, createWriteStream, exists, fchown, fchmod, fdatasync, fstat, fsync, ftruncate, futimes, lstatSync, read, readv, realpathSync, statSync, unwatchFile, watch2, watchFile, write, writev, _toUnixTimestamp, openAsBlob, glob2, appendFileSync, accessSync, chownSync, chmodSync, closeSync, copyFileSync, cpSync, existsSync, fchownSync, fchmodSync, fdatasyncSync, fstatSync, fsyncSync, ftruncateSync, futimesSync, lchownSync, lchmodSync, linkSync, lutimesSync, mkdirSync, mkdtempSync, openSync, opendirSync, readdirSync, readSync, readvSync, readFileSync, readlinkSync, renameSync, rmSync, rmdirSync, symlinkSync, truncateSync, unlinkSync, utimesSync, writeFileSync, writeSync, writevSync, statfsSync, globSync;
var init_fs = __esm({
  "node_modules/unenv/dist/runtime/node/internal/fs/fs.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    init_promises();
    __name(callbackify, "callbackify");
    access2 = callbackify(access);
    appendFile2 = callbackify(appendFile);
    chown2 = callbackify(chown);
    chmod2 = callbackify(chmod);
    copyFile2 = callbackify(copyFile);
    cp2 = callbackify(cp);
    lchown2 = callbackify(lchown);
    lchmod2 = callbackify(lchmod);
    link2 = callbackify(link);
    lstat2 = callbackify(lstat);
    lutimes2 = callbackify(lutimes);
    mkdir2 = callbackify(mkdir);
    mkdtemp2 = callbackify(mkdtemp);
    realpath2 = callbackify(realpath);
    open2 = callbackify(open);
    opendir2 = callbackify(opendir);
    readdir2 = callbackify(readdir);
    readFile2 = callbackify(readFile);
    readlink2 = callbackify(readlink);
    rename2 = callbackify(rename);
    rm2 = callbackify(rm);
    rmdir2 = callbackify(rmdir);
    stat2 = callbackify(stat);
    symlink2 = callbackify(symlink);
    truncate2 = callbackify(truncate);
    unlink2 = callbackify(unlink);
    utimes2 = callbackify(utimes);
    writeFile2 = callbackify(writeFile);
    statfs2 = callbackify(statfs);
    close = /* @__PURE__ */ notImplementedAsync("fs.close");
    createReadStream = /* @__PURE__ */ notImplementedAsync("fs.createReadStream");
    createWriteStream = /* @__PURE__ */ notImplementedAsync("fs.createWriteStream");
    exists = /* @__PURE__ */ notImplementedAsync("fs.exists");
    fchown = /* @__PURE__ */ notImplementedAsync("fs.fchown");
    fchmod = /* @__PURE__ */ notImplementedAsync("fs.fchmod");
    fdatasync = /* @__PURE__ */ notImplementedAsync("fs.fdatasync");
    fstat = /* @__PURE__ */ notImplementedAsync("fs.fstat");
    fsync = /* @__PURE__ */ notImplementedAsync("fs.fsync");
    ftruncate = /* @__PURE__ */ notImplementedAsync("fs.ftruncate");
    futimes = /* @__PURE__ */ notImplementedAsync("fs.futimes");
    lstatSync = /* @__PURE__ */ notImplementedAsync("fs.lstatSync");
    read = /* @__PURE__ */ notImplementedAsync("fs.read");
    readv = /* @__PURE__ */ notImplementedAsync("fs.readv");
    realpathSync = /* @__PURE__ */ notImplementedAsync("fs.realpathSync");
    statSync = /* @__PURE__ */ notImplementedAsync("fs.statSync");
    unwatchFile = /* @__PURE__ */ notImplementedAsync("fs.unwatchFile");
    watch2 = /* @__PURE__ */ notImplementedAsync("fs.watch");
    watchFile = /* @__PURE__ */ notImplementedAsync("fs.watchFile");
    write = /* @__PURE__ */ notImplementedAsync("fs.write");
    writev = /* @__PURE__ */ notImplementedAsync("fs.writev");
    _toUnixTimestamp = /* @__PURE__ */ notImplementedAsync("fs._toUnixTimestamp");
    openAsBlob = /* @__PURE__ */ notImplementedAsync("fs.openAsBlob");
    glob2 = /* @__PURE__ */ notImplementedAsync("fs.glob");
    appendFileSync = /* @__PURE__ */ notImplemented("fs.appendFileSync");
    accessSync = /* @__PURE__ */ notImplemented("fs.accessSync");
    chownSync = /* @__PURE__ */ notImplemented("fs.chownSync");
    chmodSync = /* @__PURE__ */ notImplemented("fs.chmodSync");
    closeSync = /* @__PURE__ */ notImplemented("fs.closeSync");
    copyFileSync = /* @__PURE__ */ notImplemented("fs.copyFileSync");
    cpSync = /* @__PURE__ */ notImplemented("fs.cpSync");
    existsSync = /* @__PURE__ */ __name(() => false, "existsSync");
    fchownSync = /* @__PURE__ */ notImplemented("fs.fchownSync");
    fchmodSync = /* @__PURE__ */ notImplemented("fs.fchmodSync");
    fdatasyncSync = /* @__PURE__ */ notImplemented("fs.fdatasyncSync");
    fstatSync = /* @__PURE__ */ notImplemented("fs.fstatSync");
    fsyncSync = /* @__PURE__ */ notImplemented("fs.fsyncSync");
    ftruncateSync = /* @__PURE__ */ notImplemented("fs.ftruncateSync");
    futimesSync = /* @__PURE__ */ notImplemented("fs.futimesSync");
    lchownSync = /* @__PURE__ */ notImplemented("fs.lchownSync");
    lchmodSync = /* @__PURE__ */ notImplemented("fs.lchmodSync");
    linkSync = /* @__PURE__ */ notImplemented("fs.linkSync");
    lutimesSync = /* @__PURE__ */ notImplemented("fs.lutimesSync");
    mkdirSync = /* @__PURE__ */ notImplemented("fs.mkdirSync");
    mkdtempSync = /* @__PURE__ */ notImplemented("fs.mkdtempSync");
    openSync = /* @__PURE__ */ notImplemented("fs.openSync");
    opendirSync = /* @__PURE__ */ notImplemented("fs.opendirSync");
    readdirSync = /* @__PURE__ */ notImplemented("fs.readdirSync");
    readSync = /* @__PURE__ */ notImplemented("fs.readSync");
    readvSync = /* @__PURE__ */ notImplemented("fs.readvSync");
    readFileSync = /* @__PURE__ */ notImplemented("fs.readFileSync");
    readlinkSync = /* @__PURE__ */ notImplemented("fs.readlinkSync");
    renameSync = /* @__PURE__ */ notImplemented("fs.renameSync");
    rmSync = /* @__PURE__ */ notImplemented("fs.rmSync");
    rmdirSync = /* @__PURE__ */ notImplemented("fs.rmdirSync");
    symlinkSync = /* @__PURE__ */ notImplemented("fs.symlinkSync");
    truncateSync = /* @__PURE__ */ notImplemented("fs.truncateSync");
    unlinkSync = /* @__PURE__ */ notImplemented("fs.unlinkSync");
    utimesSync = /* @__PURE__ */ notImplemented("fs.utimesSync");
    writeFileSync = /* @__PURE__ */ notImplemented("fs.writeFileSync");
    writeSync = /* @__PURE__ */ notImplemented("fs.writeSync");
    writevSync = /* @__PURE__ */ notImplemented("fs.writevSync");
    statfsSync = /* @__PURE__ */ notImplemented("fs.statfsSync");
    globSync = /* @__PURE__ */ notImplemented("fs.globSync");
  }
});

// node_modules/unenv/dist/runtime/node/fs.mjs
var fs_default;
var init_fs2 = __esm({
  "node_modules/unenv/dist/runtime/node/fs.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_promises2();
    init_classes();
    init_fs();
    init_constants3();
    init_constants3();
    init_fs();
    init_classes();
    fs_default = {
      F_OK,
      R_OK,
      W_OK,
      X_OK,
      constants: constants_exports,
      promises: promises_default,
      Dir,
      Dirent,
      FileReadStream,
      FileWriteStream,
      ReadStream: ReadStream2,
      Stats,
      WriteStream: WriteStream2,
      _toUnixTimestamp,
      access: access2,
      accessSync,
      appendFile: appendFile2,
      appendFileSync,
      chmod: chmod2,
      chmodSync,
      chown: chown2,
      chownSync,
      close,
      closeSync,
      copyFile: copyFile2,
      copyFileSync,
      cp: cp2,
      cpSync,
      createReadStream,
      createWriteStream,
      exists,
      existsSync,
      fchmod,
      fchmodSync,
      fchown,
      fchownSync,
      fdatasync,
      fdatasyncSync,
      fstat,
      fstatSync,
      fsync,
      fsyncSync,
      ftruncate,
      ftruncateSync,
      futimes,
      futimesSync,
      glob: glob2,
      lchmod: lchmod2,
      globSync,
      lchmodSync,
      lchown: lchown2,
      lchownSync,
      link: link2,
      linkSync,
      lstat: lstat2,
      lstatSync,
      lutimes: lutimes2,
      lutimesSync,
      mkdir: mkdir2,
      mkdirSync,
      mkdtemp: mkdtemp2,
      mkdtempSync,
      open: open2,
      openAsBlob,
      openSync,
      opendir: opendir2,
      opendirSync,
      read,
      readFile: readFile2,
      readFileSync,
      readSync,
      readdir: readdir2,
      readdirSync,
      readlink: readlink2,
      readlinkSync,
      readv,
      readvSync,
      realpath: realpath2,
      realpathSync,
      rename: rename2,
      renameSync,
      rm: rm2,
      rmSync,
      rmdir: rmdir2,
      rmdirSync,
      stat: stat2,
      statSync,
      statfs: statfs2,
      statfsSync,
      symlink: symlink2,
      symlinkSync,
      truncate: truncate2,
      truncateSync,
      unlink: unlink2,
      unlinkSync,
      unwatchFile,
      utimes: utimes2,
      utimesSync,
      watch: watch2,
      watchFile,
      write,
      writeFile: writeFile2,
      writeFileSync,
      writeSync,
      writev,
      writevSync
    };
  }
});

// node-built-in-modules:fs
var require_fs = __commonJS({
  "node-built-in-modules:fs"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_fs2();
    module.exports = fs_default;
  }
});

// node-built-in-modules:path
import libDefault from "path";
var require_path = __commonJS({
  "node-built-in-modules:path"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = libDefault;
  }
});

// node_modules/unenv/dist/runtime/node/internal/os/constants.mjs
var UV_UDP_REUSEADDR, dlopen2, errno, signals, priority;
var init_constants4 = __esm({
  "node_modules/unenv/dist/runtime/node/internal/os/constants.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    UV_UDP_REUSEADDR = 4;
    dlopen2 = {
      RTLD_LAZY: 1,
      RTLD_NOW: 2,
      RTLD_GLOBAL: 256,
      RTLD_LOCAL: 0,
      RTLD_DEEPBIND: 8
    };
    errno = {
      E2BIG: 7,
      EACCES: 13,
      EADDRINUSE: 98,
      EADDRNOTAVAIL: 99,
      EAFNOSUPPORT: 97,
      EAGAIN: 11,
      EALREADY: 114,
      EBADF: 9,
      EBADMSG: 74,
      EBUSY: 16,
      ECANCELED: 125,
      ECHILD: 10,
      ECONNABORTED: 103,
      ECONNREFUSED: 111,
      ECONNRESET: 104,
      EDEADLK: 35,
      EDESTADDRREQ: 89,
      EDOM: 33,
      EDQUOT: 122,
      EEXIST: 17,
      EFAULT: 14,
      EFBIG: 27,
      EHOSTUNREACH: 113,
      EIDRM: 43,
      EILSEQ: 84,
      EINPROGRESS: 115,
      EINTR: 4,
      EINVAL: 22,
      EIO: 5,
      EISCONN: 106,
      EISDIR: 21,
      ELOOP: 40,
      EMFILE: 24,
      EMLINK: 31,
      EMSGSIZE: 90,
      EMULTIHOP: 72,
      ENAMETOOLONG: 36,
      ENETDOWN: 100,
      ENETRESET: 102,
      ENETUNREACH: 101,
      ENFILE: 23,
      ENOBUFS: 105,
      ENODATA: 61,
      ENODEV: 19,
      ENOENT: 2,
      ENOEXEC: 8,
      ENOLCK: 37,
      ENOLINK: 67,
      ENOMEM: 12,
      ENOMSG: 42,
      ENOPROTOOPT: 92,
      ENOSPC: 28,
      ENOSR: 63,
      ENOSTR: 60,
      ENOSYS: 38,
      ENOTCONN: 107,
      ENOTDIR: 20,
      ENOTEMPTY: 39,
      ENOTSOCK: 88,
      ENOTSUP: 95,
      ENOTTY: 25,
      ENXIO: 6,
      EOPNOTSUPP: 95,
      EOVERFLOW: 75,
      EPERM: 1,
      EPIPE: 32,
      EPROTO: 71,
      EPROTONOSUPPORT: 93,
      EPROTOTYPE: 91,
      ERANGE: 34,
      EROFS: 30,
      ESPIPE: 29,
      ESRCH: 3,
      ESTALE: 116,
      ETIME: 62,
      ETIMEDOUT: 110,
      ETXTBSY: 26,
      EWOULDBLOCK: 11,
      EXDEV: 18
    };
    signals = {
      SIGHUP: 1,
      SIGINT: 2,
      SIGQUIT: 3,
      SIGILL: 4,
      SIGTRAP: 5,
      SIGABRT: 6,
      SIGIOT: 6,
      SIGBUS: 7,
      SIGFPE: 8,
      SIGKILL: 9,
      SIGUSR1: 10,
      SIGSEGV: 11,
      SIGUSR2: 12,
      SIGPIPE: 13,
      SIGALRM: 14,
      SIGTERM: 15,
      SIGCHLD: 17,
      SIGSTKFLT: 16,
      SIGCONT: 18,
      SIGSTOP: 19,
      SIGTSTP: 20,
      SIGTTIN: 21,
      SIGTTOU: 22,
      SIGURG: 23,
      SIGXCPU: 24,
      SIGXFSZ: 25,
      SIGVTALRM: 26,
      SIGPROF: 27,
      SIGWINCH: 28,
      SIGIO: 29,
      SIGPOLL: 29,
      SIGPWR: 30,
      SIGSYS: 31
    };
    priority = {
      PRIORITY_LOW: 19,
      PRIORITY_BELOW_NORMAL: 10,
      PRIORITY_NORMAL: 0,
      PRIORITY_ABOVE_NORMAL: -7,
      PRIORITY_HIGH: -14,
      PRIORITY_HIGHEST: -20
    };
  }
});

// node_modules/unenv/dist/runtime/node/os.mjs
var constants, NUM_CPUS, availableParallelism, arch2, machine, endianness, cpus, getPriority, setPriority, homedir, tmpdir, devNull, freemem, totalmem, loadavg, uptime2, hostname, networkInterfaces, platform2, type, release2, version2, userInfo, EOL, os_default;
var init_os = __esm({
  "node_modules/unenv/dist/runtime/node/os.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    init_constants4();
    constants = {
      UV_UDP_REUSEADDR,
      dlopen: dlopen2,
      errno,
      signals,
      priority
    };
    NUM_CPUS = 8;
    availableParallelism = /* @__PURE__ */ __name(() => NUM_CPUS, "availableParallelism");
    arch2 = /* @__PURE__ */ __name(() => "", "arch");
    machine = /* @__PURE__ */ __name(() => "", "machine");
    endianness = /* @__PURE__ */ __name(() => "LE", "endianness");
    cpus = /* @__PURE__ */ __name(() => {
      const info3 = {
        model: "",
        speed: 0,
        times: {
          user: 0,
          nice: 0,
          sys: 0,
          idle: 0,
          irq: 0
        }
      };
      return Array.from({ length: NUM_CPUS }, () => info3);
    }, "cpus");
    getPriority = /* @__PURE__ */ __name(() => 0, "getPriority");
    setPriority = /* @__PURE__ */ notImplemented("os.setPriority");
    homedir = /* @__PURE__ */ __name(() => "/", "homedir");
    tmpdir = /* @__PURE__ */ __name(() => "/tmp", "tmpdir");
    devNull = "/dev/null";
    freemem = /* @__PURE__ */ __name(() => 0, "freemem");
    totalmem = /* @__PURE__ */ __name(() => 0, "totalmem");
    loadavg = /* @__PURE__ */ __name(() => [
      0,
      0,
      0
    ], "loadavg");
    uptime2 = /* @__PURE__ */ __name(() => 0, "uptime");
    hostname = /* @__PURE__ */ __name(() => "", "hostname");
    networkInterfaces = /* @__PURE__ */ __name(() => {
      return { lo0: [
        {
          address: "127.0.0.1",
          netmask: "255.0.0.0",
          family: "IPv4",
          mac: "00:00:00:00:00:00",
          internal: true,
          cidr: "127.0.0.1/8"
        },
        {
          address: "::1",
          netmask: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff",
          family: "IPv6",
          mac: "00:00:00:00:00:00",
          internal: true,
          cidr: "::1/128",
          scopeid: 0
        },
        {
          address: "fe80::1",
          netmask: "ffff:ffff:ffff:ffff::",
          family: "IPv6",
          mac: "00:00:00:00:00:00",
          internal: true,
          cidr: "fe80::1/64",
          scopeid: 1
        }
      ] };
    }, "networkInterfaces");
    platform2 = /* @__PURE__ */ __name(() => "linux", "platform");
    type = /* @__PURE__ */ __name(() => "Linux", "type");
    release2 = /* @__PURE__ */ __name(() => "", "release");
    version2 = /* @__PURE__ */ __name(() => "", "version");
    userInfo = /* @__PURE__ */ __name((opts) => {
      const encode = /* @__PURE__ */ __name((str2) => {
        if (opts?.encoding) {
          const buff = Buffer.from(str2);
          return opts.encoding === "buffer" ? buff : buff.toString(opts.encoding);
        }
        return str2;
      }, "encode");
      return {
        gid: 1e3,
        uid: 1e3,
        homedir: encode("/"),
        shell: encode("/bin/sh"),
        username: encode("root")
      };
    }, "userInfo");
    EOL = "\n";
    os_default = {
      arch: arch2,
      availableParallelism,
      constants,
      cpus,
      EOL,
      endianness,
      devNull,
      freemem,
      getPriority,
      homedir,
      hostname,
      loadavg,
      machine,
      networkInterfaces,
      platform: platform2,
      release: release2,
      setPriority,
      tmpdir,
      totalmem,
      type,
      uptime: uptime2,
      userInfo,
      version: version2
    };
  }
});

// node-built-in-modules:os
var require_os = __commonJS({
  "node-built-in-modules:os"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_os();
    module.exports = os_default;
  }
});

// node-built-in-modules:crypto
import libDefault2 from "crypto";
var require_crypto = __commonJS({
  "node-built-in-modules:crypto"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = libDefault2;
  }
});

// node_modules/dotenv/package.json
var require_package = __commonJS({
  "node_modules/dotenv/package.json"(exports, module) {
    module.exports = {
      name: "dotenv",
      version: "16.6.1",
      description: "Loads environment variables from .env file",
      main: "lib/main.js",
      types: "lib/main.d.ts",
      exports: {
        ".": {
          types: "./lib/main.d.ts",
          require: "./lib/main.js",
          default: "./lib/main.js"
        },
        "./config": "./config.js",
        "./config.js": "./config.js",
        "./lib/env-options": "./lib/env-options.js",
        "./lib/env-options.js": "./lib/env-options.js",
        "./lib/cli-options": "./lib/cli-options.js",
        "./lib/cli-options.js": "./lib/cli-options.js",
        "./package.json": "./package.json"
      },
      scripts: {
        "dts-check": "tsc --project tests/types/tsconfig.json",
        lint: "standard",
        pretest: "npm run lint && npm run dts-check",
        test: "tap run --allow-empty-coverage --disable-coverage --timeout=60000",
        "test:coverage": "tap run --show-full-coverage --timeout=60000 --coverage-report=text --coverage-report=lcov",
        prerelease: "npm test",
        release: "standard-version"
      },
      repository: {
        type: "git",
        url: "git://github.com/motdotla/dotenv.git"
      },
      homepage: "https://github.com/motdotla/dotenv#readme",
      funding: "https://dotenvx.com",
      keywords: [
        "dotenv",
        "env",
        ".env",
        "environment",
        "variables",
        "config",
        "settings"
      ],
      readmeFilename: "README.md",
      license: "BSD-2-Clause",
      devDependencies: {
        "@types/node": "^18.11.3",
        decache: "^4.6.2",
        sinon: "^14.0.1",
        standard: "^17.0.0",
        "standard-version": "^9.5.0",
        tap: "^19.2.0",
        typescript: "^4.8.4"
      },
      engines: {
        node: ">=12"
      },
      browser: {
        fs: false
      }
    };
  }
});

// node_modules/dotenv/lib/main.js
var require_main = __commonJS({
  "node_modules/dotenv/lib/main.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var fs = require_fs();
    var path = require_path();
    var os = require_os();
    var crypto2 = require_crypto();
    var packageJson = require_package();
    var version4 = packageJson.version;
    var LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
    function parse2(src) {
      const obj = {};
      let lines = src.toString();
      lines = lines.replace(/\r\n?/mg, "\n");
      let match3;
      while ((match3 = LINE.exec(lines)) != null) {
        const key = match3[1];
        let value = match3[2] || "";
        value = value.trim();
        const maybeQuote = value[0];
        value = value.replace(/^(['"`])([\s\S]*)\1$/mg, "$2");
        if (maybeQuote === '"') {
          value = value.replace(/\\n/g, "\n");
          value = value.replace(/\\r/g, "\r");
        }
        obj[key] = value;
      }
      return obj;
    }
    __name(parse2, "parse");
    function _parseVault(options) {
      options = options || {};
      const vaultPath = _vaultPath(options);
      options.path = vaultPath;
      const result = DotenvModule.configDotenv(options);
      if (!result.parsed) {
        const err = new Error(`MISSING_DATA: Cannot parse ${vaultPath} for an unknown reason`);
        err.code = "MISSING_DATA";
        throw err;
      }
      const keys = _dotenvKey(options).split(",");
      const length = keys.length;
      let decrypted;
      for (let i = 0; i < length; i++) {
        try {
          const key = keys[i].trim();
          const attrs = _instructions(result, key);
          decrypted = DotenvModule.decrypt(attrs.ciphertext, attrs.key);
          break;
        } catch (error3) {
          if (i + 1 >= length) {
            throw error3;
          }
        }
      }
      return DotenvModule.parse(decrypted);
    }
    __name(_parseVault, "_parseVault");
    function _warn(message) {
      console.log(`[dotenv@${version4}][WARN] ${message}`);
    }
    __name(_warn, "_warn");
    function _debug(message) {
      console.log(`[dotenv@${version4}][DEBUG] ${message}`);
    }
    __name(_debug, "_debug");
    function _log(message) {
      console.log(`[dotenv@${version4}] ${message}`);
    }
    __name(_log, "_log");
    function _dotenvKey(options) {
      if (options && options.DOTENV_KEY && options.DOTENV_KEY.length > 0) {
        return options.DOTENV_KEY;
      }
      if (process.env.DOTENV_KEY && process.env.DOTENV_KEY.length > 0) {
        return process.env.DOTENV_KEY;
      }
      return "";
    }
    __name(_dotenvKey, "_dotenvKey");
    function _instructions(result, dotenvKey) {
      let uri;
      try {
        uri = new URL(dotenvKey);
      } catch (error3) {
        if (error3.code === "ERR_INVALID_URL") {
          const err = new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development");
          err.code = "INVALID_DOTENV_KEY";
          throw err;
        }
        throw error3;
      }
      const key = uri.password;
      if (!key) {
        const err = new Error("INVALID_DOTENV_KEY: Missing key part");
        err.code = "INVALID_DOTENV_KEY";
        throw err;
      }
      const environment = uri.searchParams.get("environment");
      if (!environment) {
        const err = new Error("INVALID_DOTENV_KEY: Missing environment part");
        err.code = "INVALID_DOTENV_KEY";
        throw err;
      }
      const environmentKey = `DOTENV_VAULT_${environment.toUpperCase()}`;
      const ciphertext = result.parsed[environmentKey];
      if (!ciphertext) {
        const err = new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${environmentKey} in your .env.vault file.`);
        err.code = "NOT_FOUND_DOTENV_ENVIRONMENT";
        throw err;
      }
      return { ciphertext, key };
    }
    __name(_instructions, "_instructions");
    function _vaultPath(options) {
      let possibleVaultPath = null;
      if (options && options.path && options.path.length > 0) {
        if (Array.isArray(options.path)) {
          for (const filepath of options.path) {
            if (fs.existsSync(filepath)) {
              possibleVaultPath = filepath.endsWith(".vault") ? filepath : `${filepath}.vault`;
            }
          }
        } else {
          possibleVaultPath = options.path.endsWith(".vault") ? options.path : `${options.path}.vault`;
        }
      } else {
        possibleVaultPath = path.resolve(process.cwd(), ".env.vault");
      }
      if (fs.existsSync(possibleVaultPath)) {
        return possibleVaultPath;
      }
      return null;
    }
    __name(_vaultPath, "_vaultPath");
    function _resolveHome(envPath) {
      return envPath[0] === "~" ? path.join(os.homedir(), envPath.slice(1)) : envPath;
    }
    __name(_resolveHome, "_resolveHome");
    function _configVault(options) {
      const debug4 = Boolean(options && options.debug);
      const quiet = options && "quiet" in options ? options.quiet : true;
      if (debug4 || !quiet) {
        _log("Loading env from encrypted .env.vault");
      }
      const parsed = DotenvModule._parseVault(options);
      let processEnv = process.env;
      if (options && options.processEnv != null) {
        processEnv = options.processEnv;
      }
      DotenvModule.populate(processEnv, parsed, options);
      return { parsed };
    }
    __name(_configVault, "_configVault");
    function configDotenv(options) {
      const dotenvPath = path.resolve(process.cwd(), ".env");
      let encoding = "utf8";
      const debug4 = Boolean(options && options.debug);
      const quiet = options && "quiet" in options ? options.quiet : true;
      if (options && options.encoding) {
        encoding = options.encoding;
      } else {
        if (debug4) {
          _debug("No encoding is specified. UTF-8 is used by default");
        }
      }
      let optionPaths = [dotenvPath];
      if (options && options.path) {
        if (!Array.isArray(options.path)) {
          optionPaths = [_resolveHome(options.path)];
        } else {
          optionPaths = [];
          for (const filepath of options.path) {
            optionPaths.push(_resolveHome(filepath));
          }
        }
      }
      let lastError;
      const parsedAll = {};
      for (const path2 of optionPaths) {
        try {
          const parsed = DotenvModule.parse(fs.readFileSync(path2, { encoding }));
          DotenvModule.populate(parsedAll, parsed, options);
        } catch (e) {
          if (debug4) {
            _debug(`Failed to load ${path2} ${e.message}`);
          }
          lastError = e;
        }
      }
      let processEnv = process.env;
      if (options && options.processEnv != null) {
        processEnv = options.processEnv;
      }
      DotenvModule.populate(processEnv, parsedAll, options);
      if (debug4 || !quiet) {
        const keysCount = Object.keys(parsedAll).length;
        const shortPaths = [];
        for (const filePath of optionPaths) {
          try {
            const relative = path.relative(process.cwd(), filePath);
            shortPaths.push(relative);
          } catch (e) {
            if (debug4) {
              _debug(`Failed to load ${filePath} ${e.message}`);
            }
            lastError = e;
          }
        }
        _log(`injecting env (${keysCount}) from ${shortPaths.join(",")}`);
      }
      if (lastError) {
        return { parsed: parsedAll, error: lastError };
      } else {
        return { parsed: parsedAll };
      }
    }
    __name(configDotenv, "configDotenv");
    function config4(options) {
      if (_dotenvKey(options).length === 0) {
        return DotenvModule.configDotenv(options);
      }
      const vaultPath = _vaultPath(options);
      if (!vaultPath) {
        _warn(`You set DOTENV_KEY but you are missing a .env.vault file at ${vaultPath}. Did you forget to build it?`);
        return DotenvModule.configDotenv(options);
      }
      return DotenvModule._configVault(options);
    }
    __name(config4, "config");
    function decrypt(encrypted, keyStr) {
      const key = Buffer.from(keyStr.slice(-64), "hex");
      let ciphertext = Buffer.from(encrypted, "base64");
      const nonce = ciphertext.subarray(0, 12);
      const authTag = ciphertext.subarray(-16);
      ciphertext = ciphertext.subarray(12, -16);
      try {
        const aesgcm = crypto2.createDecipheriv("aes-256-gcm", key, nonce);
        aesgcm.setAuthTag(authTag);
        return `${aesgcm.update(ciphertext)}${aesgcm.final()}`;
      } catch (error3) {
        const isRange = error3 instanceof RangeError;
        const invalidKeyLength = error3.message === "Invalid key length";
        const decryptionFailed = error3.message === "Unsupported state or unable to authenticate data";
        if (isRange || invalidKeyLength) {
          const err = new Error("INVALID_DOTENV_KEY: It must be 64 characters long (or more)");
          err.code = "INVALID_DOTENV_KEY";
          throw err;
        } else if (decryptionFailed) {
          const err = new Error("DECRYPTION_FAILED: Please check your DOTENV_KEY");
          err.code = "DECRYPTION_FAILED";
          throw err;
        } else {
          throw error3;
        }
      }
    }
    __name(decrypt, "decrypt");
    function populate(processEnv, parsed, options = {}) {
      const debug4 = Boolean(options && options.debug);
      const override = Boolean(options && options.override);
      if (typeof parsed !== "object") {
        const err = new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");
        err.code = "OBJECT_REQUIRED";
        throw err;
      }
      for (const key of Object.keys(parsed)) {
        if (Object.prototype.hasOwnProperty.call(processEnv, key)) {
          if (override === true) {
            processEnv[key] = parsed[key];
          }
          if (debug4) {
            if (override === true) {
              _debug(`"${key}" is already defined and WAS overwritten`);
            } else {
              _debug(`"${key}" is already defined and was NOT overwritten`);
            }
          }
        } else {
          processEnv[key] = parsed[key];
        }
      }
    }
    __name(populate, "populate");
    var DotenvModule = {
      configDotenv,
      _configVault,
      _parseVault,
      config: config4,
      decrypt,
      parse: parse2,
      populate
    };
    module.exports.configDotenv = DotenvModule.configDotenv;
    module.exports._configVault = DotenvModule._configVault;
    module.exports._parseVault = DotenvModule._parseVault;
    module.exports.config = DotenvModule.config;
    module.exports.decrypt = DotenvModule.decrypt;
    module.exports.parse = DotenvModule.parse;
    module.exports.populate = DotenvModule.populate;
    module.exports = DotenvModule;
  }
});

// node_modules/dotenv/lib/env-options.js
var require_env_options = __commonJS({
  "node_modules/dotenv/lib/env-options.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var options = {};
    if (process.env.DOTENV_CONFIG_ENCODING != null) {
      options.encoding = process.env.DOTENV_CONFIG_ENCODING;
    }
    if (process.env.DOTENV_CONFIG_PATH != null) {
      options.path = process.env.DOTENV_CONFIG_PATH;
    }
    if (process.env.DOTENV_CONFIG_QUIET != null) {
      options.quiet = process.env.DOTENV_CONFIG_QUIET;
    }
    if (process.env.DOTENV_CONFIG_DEBUG != null) {
      options.debug = process.env.DOTENV_CONFIG_DEBUG;
    }
    if (process.env.DOTENV_CONFIG_OVERRIDE != null) {
      options.override = process.env.DOTENV_CONFIG_OVERRIDE;
    }
    if (process.env.DOTENV_CONFIG_DOTENV_KEY != null) {
      options.DOTENV_KEY = process.env.DOTENV_CONFIG_DOTENV_KEY;
    }
    module.exports = options;
  }
});

// node_modules/dotenv/lib/cli-options.js
var require_cli_options = __commonJS({
  "node_modules/dotenv/lib/cli-options.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var re = /^dotenv_config_(encoding|path|quiet|debug|override|DOTENV_KEY)=(.+)$/;
    module.exports = /* @__PURE__ */ __name(function optionMatcher(args) {
      const options = args.reduce(function(acc, cur) {
        const matches = cur.match(re);
        if (matches) {
          acc[matches[1]] = matches[2];
        }
        return acc;
      }, {});
      if (!("quiet" in options)) {
        options.quiet = "true";
      }
      return options;
    }, "optionMatcher");
  }
});

// node_modules/dotenv/config.js
var init_config = __esm({
  "node_modules/dotenv/config.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    (function() {
      require_main().config(
        Object.assign(
          {},
          require_env_options(),
          require_cli_options()(process.argv)
        )
      );
    })();
  }
});

// src/config.ts
function required(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env var: ${name}`);
  return v;
}
var config2;
var init_config2 = __esm({
  "src/config.ts"() {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_config();
    __name(required, "required");
    config2 = {
      databaseUrl: required("DATABASE_URL"),
      publicBaseUrl: required("PUBLIC_BASE_URL").replace(/\/+$/, ""),
      tokenEncKey: Buffer.from(required("TOKEN_ENC_KEY"), "hex"),
      adminApiKey: required("ADMIN_API_KEY"),
      ipHashSalt: required("IP_HASH_SALT"),
      port: Number(process.env.PORT ?? 3e3)
    };
    if (config2.tokenEncKey.length !== 32) {
      throw new Error("TOKEN_ENC_KEY must be 32 bytes of hex (64 hex characters)");
    }
  }
});

// node-built-in-modules:events
import libDefault3 from "events";
var require_events = __commonJS({
  "node-built-in-modules:events"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = libDefault3;
  }
});

// node_modules/postgres-array/index.js
var require_postgres_array = __commonJS({
  "node_modules/postgres-array/index.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    exports.parse = function(source, transform) {
      return new ArrayParser(source, transform).parse();
    };
    var ArrayParser = class _ArrayParser {
      static {
        __name(this, "ArrayParser");
      }
      constructor(source, transform) {
        this.source = source;
        this.transform = transform || identity;
        this.position = 0;
        this.entries = [];
        this.recorded = [];
        this.dimension = 0;
      }
      isEof() {
        return this.position >= this.source.length;
      }
      nextCharacter() {
        var character = this.source[this.position++];
        if (character === "\\") {
          return {
            value: this.source[this.position++],
            escaped: true
          };
        }
        return {
          value: character,
          escaped: false
        };
      }
      record(character) {
        this.recorded.push(character);
      }
      newEntry(includeEmpty) {
        var entry;
        if (this.recorded.length > 0 || includeEmpty) {
          entry = this.recorded.join("");
          if (entry === "NULL" && !includeEmpty) {
            entry = null;
          }
          if (entry !== null) entry = this.transform(entry);
          this.entries.push(entry);
          this.recorded = [];
        }
      }
      consumeDimensions() {
        if (this.source[0] === "[") {
          while (!this.isEof()) {
            var char = this.nextCharacter();
            if (char.value === "=") break;
          }
        }
      }
      parse(nested) {
        var character, parser, quote;
        this.consumeDimensions();
        while (!this.isEof()) {
          character = this.nextCharacter();
          if (character.value === "{" && !quote) {
            this.dimension++;
            if (this.dimension > 1) {
              parser = new _ArrayParser(this.source.substr(this.position - 1), this.transform);
              this.entries.push(parser.parse(true));
              this.position += parser.position - 2;
            }
          } else if (character.value === "}" && !quote) {
            this.dimension--;
            if (!this.dimension) {
              this.newEntry();
              if (nested) return this.entries;
            }
          } else if (character.value === '"' && !character.escaped) {
            if (quote) this.newEntry(true);
            quote = !quote;
          } else if (character.value === "," && !quote) {
            this.newEntry();
          } else {
            this.record(character.value);
          }
        }
        if (this.dimension !== 0) {
          throw new Error("array dimension not balanced");
        }
        return this.entries;
      }
    };
    function identity(value) {
      return value;
    }
    __name(identity, "identity");
  }
});

// node_modules/pg-types/lib/arrayParser.js
var require_arrayParser = __commonJS({
  "node_modules/pg-types/lib/arrayParser.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var array = require_postgres_array();
    module.exports = {
      create: /* @__PURE__ */ __name(function(source, transform) {
        return {
          parse: /* @__PURE__ */ __name(function() {
            return array.parse(source, transform);
          }, "parse")
        };
      }, "create")
    };
  }
});

// node_modules/postgres-date/index.js
var require_postgres_date = __commonJS({
  "node_modules/postgres-date/index.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var DATE_TIME = /(\d{1,})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})(\.\d{1,})?.*?( BC)?$/;
    var DATE = /^(\d{1,})-(\d{2})-(\d{2})( BC)?$/;
    var TIME_ZONE = /([Z+-])(\d{2})?:?(\d{2})?:?(\d{2})?/;
    var INFINITY = /^-?infinity$/;
    module.exports = /* @__PURE__ */ __name(function parseDate(isoDate) {
      if (INFINITY.test(isoDate)) {
        return Number(isoDate.replace("i", "I"));
      }
      var matches = DATE_TIME.exec(isoDate);
      if (!matches) {
        return getDate(isoDate) || null;
      }
      var isBC = !!matches[8];
      var year = parseInt(matches[1], 10);
      if (isBC) {
        year = bcYearToNegativeYear(year);
      }
      var month = parseInt(matches[2], 10) - 1;
      var day = matches[3];
      var hour = parseInt(matches[4], 10);
      var minute = parseInt(matches[5], 10);
      var second = parseInt(matches[6], 10);
      var ms2 = matches[7];
      ms2 = ms2 ? 1e3 * parseFloat(ms2) : 0;
      var date;
      var offset = timeZoneOffset(isoDate);
      if (offset != null) {
        date = new Date(Date.UTC(year, month, day, hour, minute, second, ms2));
        if (is0To99(year)) {
          date.setUTCFullYear(year);
        }
        if (offset !== 0) {
          date.setTime(date.getTime() - offset);
        }
      } else {
        date = new Date(year, month, day, hour, minute, second, ms2);
        if (is0To99(year)) {
          date.setFullYear(year);
        }
      }
      return date;
    }, "parseDate");
    function getDate(isoDate) {
      var matches = DATE.exec(isoDate);
      if (!matches) {
        return;
      }
      var year = parseInt(matches[1], 10);
      var isBC = !!matches[4];
      if (isBC) {
        year = bcYearToNegativeYear(year);
      }
      var month = parseInt(matches[2], 10) - 1;
      var day = matches[3];
      var date = new Date(year, month, day);
      if (is0To99(year)) {
        date.setFullYear(year);
      }
      return date;
    }
    __name(getDate, "getDate");
    function timeZoneOffset(isoDate) {
      if (isoDate.endsWith("+00")) {
        return 0;
      }
      var zone = TIME_ZONE.exec(isoDate.split(" ")[1]);
      if (!zone) return;
      var type2 = zone[1];
      if (type2 === "Z") {
        return 0;
      }
      var sign = type2 === "-" ? -1 : 1;
      var offset = parseInt(zone[2], 10) * 3600 + parseInt(zone[3] || 0, 10) * 60 + parseInt(zone[4] || 0, 10);
      return offset * sign * 1e3;
    }
    __name(timeZoneOffset, "timeZoneOffset");
    function bcYearToNegativeYear(year) {
      return -(year - 1);
    }
    __name(bcYearToNegativeYear, "bcYearToNegativeYear");
    function is0To99(num) {
      return num >= 0 && num < 100;
    }
    __name(is0To99, "is0To99");
  }
});

// node_modules/xtend/mutable.js
var require_mutable = __commonJS({
  "node_modules/xtend/mutable.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = extend;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    function extend(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    }
    __name(extend, "extend");
  }
});

// node_modules/postgres-interval/index.js
var require_postgres_interval = __commonJS({
  "node_modules/postgres-interval/index.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var extend = require_mutable();
    module.exports = PostgresInterval;
    function PostgresInterval(raw2) {
      if (!(this instanceof PostgresInterval)) {
        return new PostgresInterval(raw2);
      }
      extend(this, parse2(raw2));
    }
    __name(PostgresInterval, "PostgresInterval");
    var properties = ["seconds", "minutes", "hours", "days", "months", "years"];
    PostgresInterval.prototype.toPostgres = function() {
      var filtered = properties.filter(this.hasOwnProperty, this);
      if (this.milliseconds && filtered.indexOf("seconds") < 0) {
        filtered.push("seconds");
      }
      if (filtered.length === 0) return "0";
      return filtered.map(function(property) {
        var value = this[property] || 0;
        if (property === "seconds" && this.milliseconds) {
          value = (value + this.milliseconds / 1e3).toFixed(6).replace(/\.?0+$/, "");
        }
        return value + " " + property;
      }, this).join(" ");
    };
    var propertiesISOEquivalent = {
      years: "Y",
      months: "M",
      days: "D",
      hours: "H",
      minutes: "M",
      seconds: "S"
    };
    var dateProperties = ["years", "months", "days"];
    var timeProperties = ["hours", "minutes", "seconds"];
    PostgresInterval.prototype.toISOString = PostgresInterval.prototype.toISO = function() {
      var datePart = dateProperties.map(buildProperty, this).join("");
      var timePart = timeProperties.map(buildProperty, this).join("");
      return "P" + datePart + "T" + timePart;
      function buildProperty(property) {
        var value = this[property] || 0;
        if (property === "seconds" && this.milliseconds) {
          value = (value + this.milliseconds / 1e3).toFixed(6).replace(/0+$/, "");
        }
        return value + propertiesISOEquivalent[property];
      }
      __name(buildProperty, "buildProperty");
    };
    var NUMBER = "([+-]?\\d+)";
    var YEAR = NUMBER + "\\s+years?";
    var MONTH = NUMBER + "\\s+mons?";
    var DAY = NUMBER + "\\s+days?";
    var TIME = "([+-])?([\\d]*):(\\d\\d):(\\d\\d)\\.?(\\d{1,6})?";
    var INTERVAL = new RegExp([YEAR, MONTH, DAY, TIME].map(function(regexString) {
      return "(" + regexString + ")?";
    }).join("\\s*"));
    var positions = {
      years: 2,
      months: 4,
      days: 6,
      hours: 9,
      minutes: 10,
      seconds: 11,
      milliseconds: 12
    };
    var negatives = ["hours", "minutes", "seconds", "milliseconds"];
    function parseMilliseconds(fraction) {
      var microseconds = fraction + "000000".slice(fraction.length);
      return parseInt(microseconds, 10) / 1e3;
    }
    __name(parseMilliseconds, "parseMilliseconds");
    function parse2(interval) {
      if (!interval) return {};
      var matches = INTERVAL.exec(interval);
      var isNegative = matches[8] === "-";
      return Object.keys(positions).reduce(function(parsed, property) {
        var position = positions[property];
        var value = matches[position];
        if (!value) return parsed;
        value = property === "milliseconds" ? parseMilliseconds(value) : parseInt(value, 10);
        if (!value) return parsed;
        if (isNegative && ~negatives.indexOf(property)) {
          value *= -1;
        }
        parsed[property] = value;
        return parsed;
      }, {});
    }
    __name(parse2, "parse");
  }
});

// node_modules/postgres-bytea/index.js
var require_postgres_bytea = __commonJS({
  "node_modules/postgres-bytea/index.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var bufferFrom = Buffer.from || Buffer;
    module.exports = /* @__PURE__ */ __name(function parseBytea(input) {
      if (/^\\x/.test(input)) {
        return bufferFrom(input.substr(2), "hex");
      }
      var output = "";
      var i = 0;
      while (i < input.length) {
        if (input[i] !== "\\") {
          output += input[i];
          ++i;
        } else {
          if (/[0-7]{3}/.test(input.substr(i + 1, 3))) {
            output += String.fromCharCode(parseInt(input.substr(i + 1, 3), 8));
            i += 4;
          } else {
            var backslashes = 1;
            while (i + backslashes < input.length && input[i + backslashes] === "\\") {
              backslashes++;
            }
            for (var k = 0; k < Math.floor(backslashes / 2); ++k) {
              output += "\\";
            }
            i += Math.floor(backslashes / 2) * 2;
          }
        }
      }
      return bufferFrom(output, "binary");
    }, "parseBytea");
  }
});

// node_modules/pg-types/lib/textParsers.js
var require_textParsers = __commonJS({
  "node_modules/pg-types/lib/textParsers.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var array = require_postgres_array();
    var arrayParser = require_arrayParser();
    var parseDate = require_postgres_date();
    var parseInterval = require_postgres_interval();
    var parseByteA = require_postgres_bytea();
    function allowNull(fn) {
      return /* @__PURE__ */ __name(function nullAllowed(value) {
        if (value === null) return value;
        return fn(value);
      }, "nullAllowed");
    }
    __name(allowNull, "allowNull");
    function parseBool(value) {
      if (value === null) return value;
      return value === "TRUE" || value === "t" || value === "true" || value === "y" || value === "yes" || value === "on" || value === "1";
    }
    __name(parseBool, "parseBool");
    function parseBoolArray(value) {
      if (!value) return null;
      return array.parse(value, parseBool);
    }
    __name(parseBoolArray, "parseBoolArray");
    function parseBaseTenInt(string) {
      return parseInt(string, 10);
    }
    __name(parseBaseTenInt, "parseBaseTenInt");
    function parseIntegerArray(value) {
      if (!value) return null;
      return array.parse(value, allowNull(parseBaseTenInt));
    }
    __name(parseIntegerArray, "parseIntegerArray");
    function parseBigIntegerArray(value) {
      if (!value) return null;
      return array.parse(value, allowNull(function(entry) {
        return parseBigInteger(entry).trim();
      }));
    }
    __name(parseBigIntegerArray, "parseBigIntegerArray");
    var parsePointArray = /* @__PURE__ */ __name(function(value) {
      if (!value) {
        return null;
      }
      var p = arrayParser.create(value, function(entry) {
        if (entry !== null) {
          entry = parsePoint(entry);
        }
        return entry;
      });
      return p.parse();
    }, "parsePointArray");
    var parseFloatArray = /* @__PURE__ */ __name(function(value) {
      if (!value) {
        return null;
      }
      var p = arrayParser.create(value, function(entry) {
        if (entry !== null) {
          entry = parseFloat(entry);
        }
        return entry;
      });
      return p.parse();
    }, "parseFloatArray");
    var parseStringArray = /* @__PURE__ */ __name(function(value) {
      if (!value) {
        return null;
      }
      var p = arrayParser.create(value);
      return p.parse();
    }, "parseStringArray");
    var parseDateArray = /* @__PURE__ */ __name(function(value) {
      if (!value) {
        return null;
      }
      var p = arrayParser.create(value, function(entry) {
        if (entry !== null) {
          entry = parseDate(entry);
        }
        return entry;
      });
      return p.parse();
    }, "parseDateArray");
    var parseIntervalArray = /* @__PURE__ */ __name(function(value) {
      if (!value) {
        return null;
      }
      var p = arrayParser.create(value, function(entry) {
        if (entry !== null) {
          entry = parseInterval(entry);
        }
        return entry;
      });
      return p.parse();
    }, "parseIntervalArray");
    var parseByteAArray = /* @__PURE__ */ __name(function(value) {
      if (!value) {
        return null;
      }
      return array.parse(value, allowNull(parseByteA));
    }, "parseByteAArray");
    var parseInteger = /* @__PURE__ */ __name(function(value) {
      return parseInt(value, 10);
    }, "parseInteger");
    var parseBigInteger = /* @__PURE__ */ __name(function(value) {
      var valStr = String(value);
      if (/^\d+$/.test(valStr)) {
        return valStr;
      }
      return value;
    }, "parseBigInteger");
    var parseJsonArray = /* @__PURE__ */ __name(function(value) {
      if (!value) {
        return null;
      }
      return array.parse(value, allowNull(JSON.parse));
    }, "parseJsonArray");
    var parsePoint = /* @__PURE__ */ __name(function(value) {
      if (value[0] !== "(") {
        return null;
      }
      value = value.substring(1, value.length - 1).split(",");
      return {
        x: parseFloat(value[0]),
        y: parseFloat(value[1])
      };
    }, "parsePoint");
    var parseCircle = /* @__PURE__ */ __name(function(value) {
      if (value[0] !== "<" && value[1] !== "(") {
        return null;
      }
      var point = "(";
      var radius = "";
      var pointParsed = false;
      for (var i = 2; i < value.length - 1; i++) {
        if (!pointParsed) {
          point += value[i];
        }
        if (value[i] === ")") {
          pointParsed = true;
          continue;
        } else if (!pointParsed) {
          continue;
        }
        if (value[i] === ",") {
          continue;
        }
        radius += value[i];
      }
      var result = parsePoint(point);
      result.radius = parseFloat(radius);
      return result;
    }, "parseCircle");
    var init = /* @__PURE__ */ __name(function(register) {
      register(20, parseBigInteger);
      register(21, parseInteger);
      register(23, parseInteger);
      register(26, parseInteger);
      register(700, parseFloat);
      register(701, parseFloat);
      register(16, parseBool);
      register(1082, parseDate);
      register(1114, parseDate);
      register(1184, parseDate);
      register(600, parsePoint);
      register(651, parseStringArray);
      register(718, parseCircle);
      register(1e3, parseBoolArray);
      register(1001, parseByteAArray);
      register(1005, parseIntegerArray);
      register(1007, parseIntegerArray);
      register(1028, parseIntegerArray);
      register(1016, parseBigIntegerArray);
      register(1017, parsePointArray);
      register(1021, parseFloatArray);
      register(1022, parseFloatArray);
      register(1231, parseFloatArray);
      register(1014, parseStringArray);
      register(1015, parseStringArray);
      register(1008, parseStringArray);
      register(1009, parseStringArray);
      register(1040, parseStringArray);
      register(1041, parseStringArray);
      register(1115, parseDateArray);
      register(1182, parseDateArray);
      register(1185, parseDateArray);
      register(1186, parseInterval);
      register(1187, parseIntervalArray);
      register(17, parseByteA);
      register(114, JSON.parse.bind(JSON));
      register(3802, JSON.parse.bind(JSON));
      register(199, parseJsonArray);
      register(3807, parseJsonArray);
      register(3907, parseStringArray);
      register(2951, parseStringArray);
      register(791, parseStringArray);
      register(1183, parseStringArray);
      register(1270, parseStringArray);
    }, "init");
    module.exports = {
      init
    };
  }
});

// node_modules/pg-int8/index.js
var require_pg_int8 = __commonJS({
  "node_modules/pg-int8/index.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var BASE = 1e6;
    function readInt8(buffer) {
      var high = buffer.readInt32BE(0);
      var low = buffer.readUInt32BE(4);
      var sign = "";
      if (high < 0) {
        high = ~high + (low === 0);
        low = ~low + 1 >>> 0;
        sign = "-";
      }
      var result = "";
      var carry;
      var t;
      var digits;
      var pad;
      var l;
      var i;
      {
        carry = high % BASE;
        high = high / BASE >>> 0;
        t = 4294967296 * carry + low;
        low = t / BASE >>> 0;
        digits = "" + (t - BASE * low);
        if (low === 0 && high === 0) {
          return sign + digits + result;
        }
        pad = "";
        l = 6 - digits.length;
        for (i = 0; i < l; i++) {
          pad += "0";
        }
        result = pad + digits + result;
      }
      {
        carry = high % BASE;
        high = high / BASE >>> 0;
        t = 4294967296 * carry + low;
        low = t / BASE >>> 0;
        digits = "" + (t - BASE * low);
        if (low === 0 && high === 0) {
          return sign + digits + result;
        }
        pad = "";
        l = 6 - digits.length;
        for (i = 0; i < l; i++) {
          pad += "0";
        }
        result = pad + digits + result;
      }
      {
        carry = high % BASE;
        high = high / BASE >>> 0;
        t = 4294967296 * carry + low;
        low = t / BASE >>> 0;
        digits = "" + (t - BASE * low);
        if (low === 0 && high === 0) {
          return sign + digits + result;
        }
        pad = "";
        l = 6 - digits.length;
        for (i = 0; i < l; i++) {
          pad += "0";
        }
        result = pad + digits + result;
      }
      {
        carry = high % BASE;
        t = 4294967296 * carry + low;
        digits = "" + t % BASE;
        return sign + digits + result;
      }
    }
    __name(readInt8, "readInt8");
    module.exports = readInt8;
  }
});

// node_modules/pg-types/lib/binaryParsers.js
var require_binaryParsers = __commonJS({
  "node_modules/pg-types/lib/binaryParsers.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var parseInt64 = require_pg_int8();
    var parseBits = /* @__PURE__ */ __name(function(data, bits, offset, invert, callback) {
      offset = offset || 0;
      invert = invert || false;
      callback = callback || function(lastValue, newValue, bits2) {
        return lastValue * Math.pow(2, bits2) + newValue;
      };
      var offsetBytes = offset >> 3;
      var inv = /* @__PURE__ */ __name(function(value) {
        if (invert) {
          return ~value & 255;
        }
        return value;
      }, "inv");
      var mask = 255;
      var firstBits = 8 - offset % 8;
      if (bits < firstBits) {
        mask = 255 << 8 - bits & 255;
        firstBits = bits;
      }
      if (offset) {
        mask = mask >> offset % 8;
      }
      var result = 0;
      if (offset % 8 + bits >= 8) {
        result = callback(0, inv(data[offsetBytes]) & mask, firstBits);
      }
      var bytes = bits + offset >> 3;
      for (var i = offsetBytes + 1; i < bytes; i++) {
        result = callback(result, inv(data[i]), 8);
      }
      var lastBits = (bits + offset) % 8;
      if (lastBits > 0) {
        result = callback(result, inv(data[bytes]) >> 8 - lastBits, lastBits);
      }
      return result;
    }, "parseBits");
    var parseFloatFromBits = /* @__PURE__ */ __name(function(data, precisionBits, exponentBits) {
      var bias = Math.pow(2, exponentBits - 1) - 1;
      var sign = parseBits(data, 1);
      var exponent = parseBits(data, exponentBits, 1);
      if (exponent === 0) {
        return 0;
      }
      var precisionBitsCounter = 1;
      var parsePrecisionBits = /* @__PURE__ */ __name(function(lastValue, newValue, bits) {
        if (lastValue === 0) {
          lastValue = 1;
        }
        for (var i = 1; i <= bits; i++) {
          precisionBitsCounter /= 2;
          if ((newValue & 1 << bits - i) > 0) {
            lastValue += precisionBitsCounter;
          }
        }
        return lastValue;
      }, "parsePrecisionBits");
      var mantissa = parseBits(data, precisionBits, exponentBits + 1, false, parsePrecisionBits);
      if (exponent == Math.pow(2, exponentBits + 1) - 1) {
        if (mantissa === 0) {
          return sign === 0 ? Infinity : -Infinity;
        }
        return NaN;
      }
      return (sign === 0 ? 1 : -1) * Math.pow(2, exponent - bias) * mantissa;
    }, "parseFloatFromBits");
    var parseInt16 = /* @__PURE__ */ __name(function(value) {
      if (parseBits(value, 1) == 1) {
        return -1 * (parseBits(value, 15, 1, true) + 1);
      }
      return parseBits(value, 15, 1);
    }, "parseInt16");
    var parseInt32 = /* @__PURE__ */ __name(function(value) {
      if (parseBits(value, 1) == 1) {
        return -1 * (parseBits(value, 31, 1, true) + 1);
      }
      return parseBits(value, 31, 1);
    }, "parseInt32");
    var parseFloat32 = /* @__PURE__ */ __name(function(value) {
      return parseFloatFromBits(value, 23, 8);
    }, "parseFloat32");
    var parseFloat64 = /* @__PURE__ */ __name(function(value) {
      return parseFloatFromBits(value, 52, 11);
    }, "parseFloat64");
    var parseNumeric = /* @__PURE__ */ __name(function(value) {
      var sign = parseBits(value, 16, 32);
      if (sign == 49152) {
        return NaN;
      }
      var weight = Math.pow(1e4, parseBits(value, 16, 16));
      var result = 0;
      var digits = [];
      var ndigits = parseBits(value, 16);
      for (var i = 0; i < ndigits; i++) {
        result += parseBits(value, 16, 64 + 16 * i) * weight;
        weight /= 1e4;
      }
      var scale = Math.pow(10, parseBits(value, 16, 48));
      return (sign === 0 ? 1 : -1) * Math.round(result * scale) / scale;
    }, "parseNumeric");
    var parseDate = /* @__PURE__ */ __name(function(isUTC, value) {
      var sign = parseBits(value, 1);
      var rawValue = parseBits(value, 63, 1);
      var result = new Date((sign === 0 ? 1 : -1) * rawValue / 1e3 + 9466848e5);
      if (!isUTC) {
        result.setTime(result.getTime() + result.getTimezoneOffset() * 6e4);
      }
      result.usec = rawValue % 1e3;
      result.getMicroSeconds = function() {
        return this.usec;
      };
      result.setMicroSeconds = function(value2) {
        this.usec = value2;
      };
      result.getUTCMicroSeconds = function() {
        return this.usec;
      };
      return result;
    }, "parseDate");
    var parseArray = /* @__PURE__ */ __name(function(value) {
      var dim = parseBits(value, 32);
      var flags = parseBits(value, 32, 32);
      var elementType = parseBits(value, 32, 64);
      var offset = 96;
      var dims = [];
      for (var i = 0; i < dim; i++) {
        dims[i] = parseBits(value, 32, offset);
        offset += 32;
        offset += 32;
      }
      var parseElement = /* @__PURE__ */ __name(function(elementType2) {
        var length = parseBits(value, 32, offset);
        offset += 32;
        if (length == 4294967295) {
          return null;
        }
        var result;
        if (elementType2 == 23 || elementType2 == 20) {
          result = parseBits(value, length * 8, offset);
          offset += length * 8;
          return result;
        } else if (elementType2 == 25) {
          result = value.toString(this.encoding, offset >> 3, (offset += length << 3) >> 3);
          return result;
        } else {
          console.log("ERROR: ElementType not implemented: " + elementType2);
        }
      }, "parseElement");
      var parse2 = /* @__PURE__ */ __name(function(dimension, elementType2) {
        var array = [];
        var i2;
        if (dimension.length > 1) {
          var count3 = dimension.shift();
          for (i2 = 0; i2 < count3; i2++) {
            array[i2] = parse2(dimension, elementType2);
          }
          dimension.unshift(count3);
        } else {
          for (i2 = 0; i2 < dimension[0]; i2++) {
            array[i2] = parseElement(elementType2);
          }
        }
        return array;
      }, "parse");
      return parse2(dims, elementType);
    }, "parseArray");
    var parseText = /* @__PURE__ */ __name(function(value) {
      return value.toString("utf8");
    }, "parseText");
    var parseBool = /* @__PURE__ */ __name(function(value) {
      if (value === null) return null;
      return parseBits(value, 8) > 0;
    }, "parseBool");
    var init = /* @__PURE__ */ __name(function(register) {
      register(20, parseInt64);
      register(21, parseInt16);
      register(23, parseInt32);
      register(26, parseInt32);
      register(1700, parseNumeric);
      register(700, parseFloat32);
      register(701, parseFloat64);
      register(16, parseBool);
      register(1114, parseDate.bind(null, false));
      register(1184, parseDate.bind(null, true));
      register(1e3, parseArray);
      register(1007, parseArray);
      register(1016, parseArray);
      register(1008, parseArray);
      register(1009, parseArray);
      register(25, parseText);
    }, "init");
    module.exports = {
      init
    };
  }
});

// node_modules/pg-types/lib/builtins.js
var require_builtins = __commonJS({
  "node_modules/pg-types/lib/builtins.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = {
      BOOL: 16,
      BYTEA: 17,
      CHAR: 18,
      INT8: 20,
      INT2: 21,
      INT4: 23,
      REGPROC: 24,
      TEXT: 25,
      OID: 26,
      TID: 27,
      XID: 28,
      CID: 29,
      JSON: 114,
      XML: 142,
      PG_NODE_TREE: 194,
      SMGR: 210,
      PATH: 602,
      POLYGON: 604,
      CIDR: 650,
      FLOAT4: 700,
      FLOAT8: 701,
      ABSTIME: 702,
      RELTIME: 703,
      TINTERVAL: 704,
      CIRCLE: 718,
      MACADDR8: 774,
      MONEY: 790,
      MACADDR: 829,
      INET: 869,
      ACLITEM: 1033,
      BPCHAR: 1042,
      VARCHAR: 1043,
      DATE: 1082,
      TIME: 1083,
      TIMESTAMP: 1114,
      TIMESTAMPTZ: 1184,
      INTERVAL: 1186,
      TIMETZ: 1266,
      BIT: 1560,
      VARBIT: 1562,
      NUMERIC: 1700,
      REFCURSOR: 1790,
      REGPROCEDURE: 2202,
      REGOPER: 2203,
      REGOPERATOR: 2204,
      REGCLASS: 2205,
      REGTYPE: 2206,
      UUID: 2950,
      TXID_SNAPSHOT: 2970,
      PG_LSN: 3220,
      PG_NDISTINCT: 3361,
      PG_DEPENDENCIES: 3402,
      TSVECTOR: 3614,
      TSQUERY: 3615,
      GTSVECTOR: 3642,
      REGCONFIG: 3734,
      REGDICTIONARY: 3769,
      JSONB: 3802,
      REGNAMESPACE: 4089,
      REGROLE: 4096
    };
  }
});

// node_modules/pg-types/index.js
var require_pg_types = __commonJS({
  "node_modules/pg-types/index.js"(exports) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var textParsers = require_textParsers();
    var binaryParsers = require_binaryParsers();
    var arrayParser = require_arrayParser();
    var builtinTypes = require_builtins();
    exports.getTypeParser = getTypeParser;
    exports.setTypeParser = setTypeParser;
    exports.arrayParser = arrayParser;
    exports.builtins = builtinTypes;
    var typeParsers = {
      text: {},
      binary: {}
    };
    function noParse(val) {
      return String(val);
    }
    __name(noParse, "noParse");
    function getTypeParser(oid, format) {
      format = format || "text";
      if (!typeParsers[format]) {
        return noParse;
      }
      return typeParsers[format][oid] || noParse;
    }
    __name(getTypeParser, "getTypeParser");
    function setTypeParser(oid, format, parseFn) {
      if (typeof format == "function") {
        parseFn = format;
        format = "text";
      }
      typeParsers[format][oid] = parseFn;
    }
    __name(setTypeParser, "setTypeParser");
    textParsers.init(function(oid, converter) {
      typeParsers.text[oid] = converter;
    });
    binaryParsers.init(function(oid, converter) {
      typeParsers.binary[oid] = converter;
    });
  }
});

// node_modules/pg/lib/defaults.js
var require_defaults = __commonJS({
  "node_modules/pg/lib/defaults.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var user;
    try {
      user = process.platform === "win32" ? process.env.USERNAME : process.env.USER;
    } catch {
    }
    module.exports = {
      // database host. defaults to localhost
      host: "localhost",
      // database user's name
      user,
      // name of database to connect
      database: void 0,
      // database user's password
      password: null,
      // a Postgres connection string to be used instead of setting individual connection items
      // NOTE:  Setting this value will cause it to override any other value (such as database or user) defined
      // in the defaults object.
      connectionString: void 0,
      // database port
      port: 5432,
      // number of rows to return at a time from a prepared statement's
      // portal. 0 will return all rows at once
      rows: 0,
      // binary result mode
      binary: false,
      // Connection pool options - see https://github.com/brianc/node-pg-pool
      // number of connections to use in connection pool
      // 0 will disable connection pooling
      max: 10,
      // max milliseconds a client can go unused before it is removed
      // from the pool and destroyed
      idleTimeoutMillis: 3e4,
      client_encoding: "",
      ssl: false,
      // SSL negotiation style: 'postgres' (traditional SSLRequest) or 'direct'
      sslnegotiation: void 0,
      application_name: void 0,
      fallback_application_name: void 0,
      options: void 0,
      parseInputDatesAsUTC: false,
      // max milliseconds any query using this connection will execute for before timing out in error.
      // false=unlimited
      statement_timeout: false,
      // Abort any statement that waits longer than the specified duration in milliseconds while attempting to acquire a lock.
      // false=unlimited
      lock_timeout: false,
      // Terminate any session with an open transaction that has been idle for longer than the specified duration in milliseconds
      // false=unlimited
      idle_in_transaction_session_timeout: false,
      // max milliseconds to wait for query to complete (client side)
      query_timeout: false,
      connect_timeout: 0,
      keepalives: 1,
      keepalives_idle: 0
    };
    var pgTypes = require_pg_types();
    var parseBigInteger = pgTypes.getTypeParser(20, "text");
    var parseBigIntegerArray = pgTypes.getTypeParser(1016, "text");
    module.exports.__defineSetter__("parseInt8", function(val) {
      pgTypes.setTypeParser(20, "text", val ? pgTypes.getTypeParser(23, "text") : parseBigInteger);
      pgTypes.setTypeParser(1016, "text", val ? pgTypes.getTypeParser(1007, "text") : parseBigIntegerArray);
    });
  }
});

// node-built-in-modules:util/types
import libDefault4 from "util/types";
var require_types = __commonJS({
  "node-built-in-modules:util/types"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = libDefault4;
  }
});

// node_modules/pg/lib/utils.js
var require_utils = __commonJS({
  "node_modules/pg/lib/utils.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var defaults2 = require_defaults();
    var { isDate } = require_types();
    function escapeElement(elementRepresentation) {
      const escaped = elementRepresentation.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
      return '"' + escaped + '"';
    }
    __name(escapeElement, "escapeElement");
    function arrayString(val) {
      let result = "{";
      for (let i = 0; i < val.length; i++) {
        if (i > 0) {
          result += ",";
        }
        let item = val[i];
        if (item == null) {
          result += "NULL";
        } else if (Array.isArray(item)) {
          result += arrayString(item);
        } else if (ArrayBuffer.isView(item)) {
          if (!(item instanceof Buffer)) {
            item = Buffer.from(item.buffer, item.byteOffset, item.byteLength);
          }
          result += "\\\\x" + item.toString("hex");
        } else {
          result += escapeElement(prepareValue(item));
        }
      }
      result += "}";
      return result;
    }
    __name(arrayString, "arrayString");
    var prepareValue = /* @__PURE__ */ __name(function(val, seen) {
      if (val == null) {
        return null;
      }
      if (typeof val === "object") {
        if (val instanceof Buffer) {
          return val;
        }
        if (ArrayBuffer.isView(val)) {
          return Buffer.from(val.buffer, val.byteOffset, val.byteLength);
        }
        if (isDate(val)) {
          if (defaults2.parseInputDatesAsUTC) {
            return dateToStringUTC(val);
          } else {
            return dateToString(val);
          }
        }
        if (Array.isArray(val)) {
          return arrayString(val);
        }
        return prepareObject(val, seen);
      }
      return val.toString();
    }, "prepareValue");
    function prepareObject(val, seen) {
      if (val && typeof val.toPostgres === "function") {
        seen = seen || [];
        if (seen.indexOf(val) !== -1) {
          throw new Error('circular reference detected while preparing "' + val + '" for query');
        }
        seen.push(val);
        return prepareValue(val.toPostgres(prepareValue), seen);
      }
      return JSON.stringify(val);
    }
    __name(prepareObject, "prepareObject");
    function dateToString(date) {
      let offset = -date.getTimezoneOffset();
      let year = date.getFullYear();
      const isBCYear = year < 1;
      if (isBCYear) year = Math.abs(year) + 1;
      let ret = String(year).padStart(4, "0") + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0") + "T" + String(date.getHours()).padStart(2, "0") + ":" + String(date.getMinutes()).padStart(2, "0") + ":" + String(date.getSeconds()).padStart(2, "0") + "." + String(date.getMilliseconds()).padStart(3, "0");
      if (offset < 0) {
        ret += "-";
        offset *= -1;
      } else {
        ret += "+";
      }
      ret += String(Math.floor(offset / 60)).padStart(2, "0") + ":" + String(offset % 60).padStart(2, "0");
      if (isBCYear) ret += " BC";
      return ret;
    }
    __name(dateToString, "dateToString");
    function dateToStringUTC(date) {
      let year = date.getUTCFullYear();
      const isBCYear = year < 1;
      if (isBCYear) year = Math.abs(year) + 1;
      let ret = String(year).padStart(4, "0") + "-" + String(date.getUTCMonth() + 1).padStart(2, "0") + "-" + String(date.getUTCDate()).padStart(2, "0") + "T" + String(date.getUTCHours()).padStart(2, "0") + ":" + String(date.getUTCMinutes()).padStart(2, "0") + ":" + String(date.getUTCSeconds()).padStart(2, "0") + "." + String(date.getUTCMilliseconds()).padStart(3, "0");
      ret += "+00:00";
      if (isBCYear) ret += " BC";
      return ret;
    }
    __name(dateToStringUTC, "dateToStringUTC");
    function normalizeQueryConfig(config4, values, callback) {
      config4 = typeof config4 === "string" ? { text: config4 } : config4;
      if (values) {
        if (typeof values === "function") {
          config4.callback = values;
        } else {
          config4.values = values;
        }
      }
      if (callback) {
        config4.callback = callback;
      }
      return config4;
    }
    __name(normalizeQueryConfig, "normalizeQueryConfig");
    var escapeIdentifier2 = /* @__PURE__ */ __name(function(str2) {
      return '"' + str2.replace(/"/g, '""') + '"';
    }, "escapeIdentifier");
    var escapeLiteral2 = /* @__PURE__ */ __name(function(str2) {
      let hasBackslash = false;
      let escaped = "'";
      if (str2 == null) {
        return "''";
      }
      if (typeof str2 !== "string") {
        return "''";
      }
      for (let i = 0; i < str2.length; i++) {
        const c = str2[i];
        if (c === "'") {
          escaped += c + c;
        } else if (c === "\\") {
          escaped += c + c;
          hasBackslash = true;
        } else {
          escaped += c;
        }
      }
      escaped += "'";
      if (hasBackslash === true) {
        escaped = " E" + escaped;
      }
      return escaped;
    }, "escapeLiteral");
    module.exports = {
      prepareValue: /* @__PURE__ */ __name(function prepareValueWrapper(value) {
        return prepareValue(value);
      }, "prepareValueWrapper"),
      normalizeQueryConfig,
      escapeIdentifier: escapeIdentifier2,
      escapeLiteral: escapeLiteral2
    };
  }
});

// node-built-in-modules:util
import libDefault5 from "util";
var require_util = __commonJS({
  "node-built-in-modules:util"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = libDefault5;
  }
});

// node_modules/pg/lib/crypto/utils.js
var require_utils2 = __commonJS({
  "node_modules/pg/lib/crypto/utils.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var nodeCrypto = require_crypto();
    module.exports = {
      postgresMd5PasswordHash,
      randomBytes,
      deriveKey,
      sha256,
      hashByName,
      hmacSha256,
      md5
    };
    var webCrypto = nodeCrypto.webcrypto || globalThis.crypto;
    var subtleCrypto = webCrypto.subtle;
    var textEncoder = new TextEncoder();
    function randomBytes(length) {
      return webCrypto.getRandomValues(Buffer.alloc(length));
    }
    __name(randomBytes, "randomBytes");
    async function md5(string) {
      try {
        return nodeCrypto.createHash("md5").update(string, "utf-8").digest("hex");
      } catch (e) {
        const data = typeof string === "string" ? textEncoder.encode(string) : string;
        const hash = await subtleCrypto.digest("MD5", data);
        return Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, "0")).join("");
      }
    }
    __name(md5, "md5");
    async function postgresMd5PasswordHash(user, password, salt) {
      const inner = await md5(password + user);
      const outer = await md5(Buffer.concat([Buffer.from(inner), salt]));
      return "md5" + outer;
    }
    __name(postgresMd5PasswordHash, "postgresMd5PasswordHash");
    async function sha256(text) {
      return await subtleCrypto.digest("SHA-256", text);
    }
    __name(sha256, "sha256");
    async function hashByName(hashName, text) {
      return await subtleCrypto.digest(hashName, text);
    }
    __name(hashByName, "hashByName");
    async function hmacSha256(keyBuffer, msg) {
      const key = await subtleCrypto.importKey("raw", keyBuffer, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
      return await subtleCrypto.sign("HMAC", key, textEncoder.encode(msg));
    }
    __name(hmacSha256, "hmacSha256");
    async function deriveKey(password, salt, iterations) {
      const key = await subtleCrypto.importKey("raw", textEncoder.encode(password), "PBKDF2", false, ["deriveBits"]);
      const params = { name: "PBKDF2", hash: "SHA-256", salt, iterations };
      return await subtleCrypto.deriveBits(params, key, 32 * 8, ["deriveBits"]);
    }
    __name(deriveKey, "deriveKey");
  }
});

// node_modules/pg/lib/crypto/cert-signatures.js
var require_cert_signatures = __commonJS({
  "node_modules/pg/lib/crypto/cert-signatures.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    function x509Error(msg, cert) {
      return new Error("SASL channel binding: " + msg + " when parsing public certificate " + cert.toString("base64"));
    }
    __name(x509Error, "x509Error");
    function readASN1Length(data, index) {
      let length = data[index++];
      if (length < 128) return { length, index };
      const lengthBytes = length & 127;
      if (lengthBytes > 4) throw x509Error("bad length", data);
      length = 0;
      for (let i = 0; i < lengthBytes; i++) {
        length = length << 8 | data[index++];
      }
      return { length, index };
    }
    __name(readASN1Length, "readASN1Length");
    function readASN1OID(data, index) {
      if (data[index++] !== 6) throw x509Error("non-OID data", data);
      const { length: OIDLength, index: indexAfterOIDLength } = readASN1Length(data, index);
      index = indexAfterOIDLength;
      const lastIndex = index + OIDLength;
      const byte1 = data[index++];
      let oid = (byte1 / 40 >> 0) + "." + byte1 % 40;
      while (index < lastIndex) {
        let value = 0;
        while (index < lastIndex) {
          const nextByte = data[index++];
          value = value << 7 | nextByte & 127;
          if (nextByte < 128) break;
        }
        oid += "." + value;
      }
      return { oid, index };
    }
    __name(readASN1OID, "readASN1OID");
    function expectASN1Seq(data, index) {
      if (data[index++] !== 48) throw x509Error("non-sequence data", data);
      return readASN1Length(data, index);
    }
    __name(expectASN1Seq, "expectASN1Seq");
    function signatureAlgorithmHashFromCertificate(data, index) {
      if (index === void 0) index = 0;
      index = expectASN1Seq(data, index).index;
      const { length: certInfoLength, index: indexAfterCertInfoLength } = expectASN1Seq(data, index);
      index = indexAfterCertInfoLength + certInfoLength;
      index = expectASN1Seq(data, index).index;
      const { oid, index: indexAfterOID } = readASN1OID(data, index);
      switch (oid) {
        // RSA
        case "1.2.840.113549.1.1.4":
          return "MD5";
        case "1.2.840.113549.1.1.5":
          return "SHA-1";
        case "1.2.840.113549.1.1.11":
          return "SHA-256";
        case "1.2.840.113549.1.1.12":
          return "SHA-384";
        case "1.2.840.113549.1.1.13":
          return "SHA-512";
        case "1.2.840.113549.1.1.14":
          return "SHA-224";
        case "1.2.840.113549.1.1.15":
          return "SHA512-224";
        case "1.2.840.113549.1.1.16":
          return "SHA512-256";
        // ECDSA
        case "1.2.840.10045.4.1":
          return "SHA-1";
        case "1.2.840.10045.4.3.1":
          return "SHA-224";
        case "1.2.840.10045.4.3.2":
          return "SHA-256";
        case "1.2.840.10045.4.3.3":
          return "SHA-384";
        case "1.2.840.10045.4.3.4":
          return "SHA-512";
        // RSASSA-PSS: hash is indicated separately
        case "1.2.840.113549.1.1.10": {
          index = indexAfterOID;
          index = expectASN1Seq(data, index).index;
          if (data[index++] !== 160) throw x509Error("non-tag data", data);
          index = readASN1Length(data, index).index;
          index = expectASN1Seq(data, index).index;
          const { oid: hashOID } = readASN1OID(data, index);
          switch (hashOID) {
            // standalone hash OIDs
            case "1.2.840.113549.2.5":
              return "MD5";
            case "1.3.14.3.2.26":
              return "SHA-1";
            case "2.16.840.1.101.3.4.2.1":
              return "SHA-256";
            case "2.16.840.1.101.3.4.2.2":
              return "SHA-384";
            case "2.16.840.1.101.3.4.2.3":
              return "SHA-512";
          }
          throw x509Error("unknown hash OID " + hashOID, data);
        }
        // Ed25519 -- see https: return//github.com/openssl/openssl/issues/15477
        case "1.3.101.110":
        case "1.3.101.112":
          return "SHA-512";
        // Ed448 -- still not in pg 17.2 (if supported, digest would be SHAKE256 x 64 bytes)
        case "1.3.101.111":
        case "1.3.101.113":
          throw x509Error("Ed448 certificate channel binding is not currently supported by Postgres");
      }
      throw x509Error("unknown OID " + oid, data);
    }
    __name(signatureAlgorithmHashFromCertificate, "signatureAlgorithmHashFromCertificate");
    module.exports = { signatureAlgorithmHashFromCertificate };
  }
});

// node_modules/pg/lib/crypto/sasl.js
var require_sasl = __commonJS({
  "node_modules/pg/lib/crypto/sasl.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var crypto2 = require_utils2();
    var { signatureAlgorithmHashFromCertificate } = require_cert_signatures();
    function saslprep(password) {
      const nonAsciiSpace = /[\u00A0\u1680\u2000-\u200B\u202F\u205F\u3000]/g;
      const mappedToNothing = /[\u00AD\u034F\u1806\u180B\u180C\u180D\u200C\u200D\u2060\uFE00-\uFE0F\uFEFF]/g;
      return password.replace(nonAsciiSpace, " ").replace(mappedToNothing, "").normalize("NFKC");
    }
    __name(saslprep, "saslprep");
    var DEFAULT_MAX_SCRAM_ITERATIONS = 1e5;
    function startSession(mechanisms, stream, scramMaxIterations = DEFAULT_MAX_SCRAM_ITERATIONS) {
      const candidates = ["SCRAM-SHA-256"];
      if (stream) candidates.unshift("SCRAM-SHA-256-PLUS");
      const mechanism = candidates.find((candidate) => mechanisms.includes(candidate));
      if (!mechanism) {
        throw new Error("SASL: Only mechanism(s) " + candidates.join(" and ") + " are supported");
      }
      if (mechanism === "SCRAM-SHA-256-PLUS" && typeof stream.getPeerCertificate !== "function") {
        throw new Error("SASL: Mechanism SCRAM-SHA-256-PLUS requires a certificate");
      }
      const clientNonce = crypto2.randomBytes(18).toString("base64");
      const gs2Header = mechanism === "SCRAM-SHA-256-PLUS" ? "p=tls-server-end-point" : stream ? "y" : "n";
      return {
        mechanism,
        clientNonce,
        response: gs2Header + ",,n=*,r=" + clientNonce,
        message: "SASLInitialResponse",
        scramMaxIterations
      };
    }
    __name(startSession, "startSession");
    async function continueSession(session, password, serverData, stream) {
      if (session.message !== "SASLInitialResponse") {
        throw new Error("SASL: Last message was not SASLInitialResponse");
      }
      if (typeof password !== "string") {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a string");
      }
      if (password === "") {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a non-empty string");
      }
      if (typeof serverData !== "string") {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: serverData must be a string");
      }
      const sv = parseServerFirstMessage(serverData);
      if (!sv.nonce.startsWith(session.clientNonce)) {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce does not start with client nonce");
      } else if (sv.nonce.length === session.clientNonce.length) {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce is too short");
      }
      const scramMaxIterations = typeof session.scramMaxIterations === "number" ? session.scramMaxIterations : DEFAULT_MAX_SCRAM_ITERATIONS;
      if (scramMaxIterations !== 0 && sv.iteration > scramMaxIterations) {
        throw new Error(
          "SASL: SCRAM-SERVER-FIRST-MESSAGE: iteration count " + sv.iteration + " exceeds scramMaxIterations of " + scramMaxIterations
        );
      }
      const clientFirstMessageBare = "n=*,r=" + session.clientNonce;
      const serverFirstMessage = "r=" + sv.nonce + ",s=" + sv.salt + ",i=" + sv.iteration;
      let channelBinding = stream ? "eSws" : "biws";
      if (session.mechanism === "SCRAM-SHA-256-PLUS") {
        const peerCert = stream.getPeerCertificate().raw;
        let hashName = signatureAlgorithmHashFromCertificate(peerCert);
        if (hashName === "MD5" || hashName === "SHA-1") hashName = "SHA-256";
        const certHash = await crypto2.hashByName(hashName, peerCert);
        const bindingData = Buffer.concat([Buffer.from("p=tls-server-end-point,,"), Buffer.from(certHash)]);
        channelBinding = bindingData.toString("base64");
      }
      const clientFinalMessageWithoutProof = "c=" + channelBinding + ",r=" + sv.nonce;
      const authMessage = clientFirstMessageBare + "," + serverFirstMessage + "," + clientFinalMessageWithoutProof;
      const saltBytes = Buffer.from(sv.salt, "base64");
      const saltedPassword = await crypto2.deriveKey(saslprep(password), saltBytes, sv.iteration);
      const clientKey = await crypto2.hmacSha256(saltedPassword, "Client Key");
      const storedKey = await crypto2.sha256(clientKey);
      const clientSignature = await crypto2.hmacSha256(storedKey, authMessage);
      const clientProof = xorBuffers(Buffer.from(clientKey), Buffer.from(clientSignature)).toString("base64");
      const serverKey = await crypto2.hmacSha256(saltedPassword, "Server Key");
      const serverSignatureBytes = await crypto2.hmacSha256(serverKey, authMessage);
      session.message = "SASLResponse";
      session.serverSignature = Buffer.from(serverSignatureBytes).toString("base64");
      session.response = clientFinalMessageWithoutProof + ",p=" + clientProof;
    }
    __name(continueSession, "continueSession");
    function finalizeSession(session, serverData) {
      if (session.message !== "SASLResponse") {
        throw new Error("SASL: Last message was not SASLResponse");
      }
      if (typeof serverData !== "string") {
        throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: serverData must be a string");
      }
      const { serverSignature } = parseServerFinalMessage(serverData);
      if (serverSignature !== session.serverSignature) {
        throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature does not match");
      }
    }
    __name(finalizeSession, "finalizeSession");
    function isPrintableChars(text) {
      if (typeof text !== "string") {
        throw new TypeError("SASL: text must be a string");
      }
      return text.split("").map((_, i) => text.charCodeAt(i)).every((c) => c >= 33 && c <= 43 || c >= 45 && c <= 126);
    }
    __name(isPrintableChars, "isPrintableChars");
    function isBase64(text) {
      return /^(?:[a-zA-Z0-9+/]{4})*(?:[a-zA-Z0-9+/]{2}==|[a-zA-Z0-9+/]{3}=)?$/.test(text);
    }
    __name(isBase64, "isBase64");
    function parseAttributePairs(text) {
      if (typeof text !== "string") {
        throw new TypeError("SASL: attribute pairs text must be a string");
      }
      return new Map(
        text.split(",").map((attrValue) => {
          if (!/^.=/.test(attrValue)) {
            throw new Error("SASL: Invalid attribute pair entry");
          }
          const name = attrValue[0];
          const value = attrValue.substring(2);
          return [name, value];
        })
      );
    }
    __name(parseAttributePairs, "parseAttributePairs");
    function parseServerFirstMessage(data) {
      const attrPairs = parseAttributePairs(data);
      const nonce = attrPairs.get("r");
      if (!nonce) {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce missing");
      } else if (!isPrintableChars(nonce)) {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce must only contain printable characters");
      }
      const salt = attrPairs.get("s");
      if (!salt) {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: salt missing");
      } else if (!isBase64(salt)) {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: salt must be base64");
      }
      const iterationText = attrPairs.get("i");
      if (!iterationText) {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: iteration missing");
      } else if (!/^[1-9][0-9]*$/.test(iterationText)) {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: invalid iteration count");
      }
      const iteration = parseInt(iterationText, 10);
      return {
        nonce,
        salt,
        iteration
      };
    }
    __name(parseServerFirstMessage, "parseServerFirstMessage");
    function parseServerFinalMessage(serverData) {
      const attrPairs = parseAttributePairs(serverData);
      const error3 = attrPairs.get("e");
      const serverSignature = attrPairs.get("v");
      if (error3) {
        throw new Error(`SASL: SCRAM-SERVER-FINAL-MESSAGE: server returned error: "${error3}"`);
      }
      if (!serverSignature) {
        throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature is missing");
      } else if (!isBase64(serverSignature)) {
        throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature must be base64");
      }
      return {
        serverSignature
      };
    }
    __name(parseServerFinalMessage, "parseServerFinalMessage");
    function xorBuffers(a, b) {
      if (!Buffer.isBuffer(a)) {
        throw new TypeError("first argument must be a Buffer");
      }
      if (!Buffer.isBuffer(b)) {
        throw new TypeError("second argument must be a Buffer");
      }
      if (a.length !== b.length) {
        throw new Error("Buffer lengths must match");
      }
      if (a.length === 0) {
        throw new Error("Buffers cannot be empty");
      }
      return Buffer.from(a.map((_, i) => a[i] ^ b[i]));
    }
    __name(xorBuffers, "xorBuffers");
    module.exports = {
      startSession,
      continueSession,
      finalizeSession,
      DEFAULT_MAX_SCRAM_ITERATIONS
    };
  }
});

// node_modules/pg/lib/type-overrides.js
var require_type_overrides = __commonJS({
  "node_modules/pg/lib/type-overrides.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var types2 = require_pg_types();
    function TypeOverrides2(userTypes) {
      this._types = userTypes || types2;
      this.text = {};
      this.binary = {};
    }
    __name(TypeOverrides2, "TypeOverrides");
    TypeOverrides2.prototype.getOverrides = function(format) {
      switch (format) {
        case "text":
          return this.text;
        case "binary":
          return this.binary;
        default:
          return {};
      }
    };
    TypeOverrides2.prototype.setTypeParser = function(oid, format, parseFn) {
      if (typeof format === "function") {
        parseFn = format;
        format = "text";
      }
      this.getOverrides(format)[oid] = parseFn;
    };
    TypeOverrides2.prototype.getTypeParser = function(oid, format) {
      format = format || "text";
      return this.getOverrides(format)[oid] || this._types.getTypeParser(oid, format);
    };
    module.exports = TypeOverrides2;
  }
});

// node-built-in-modules:dns
import libDefault6 from "dns";
var require_dns = __commonJS({
  "node-built-in-modules:dns"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = libDefault6;
  }
});

// node_modules/pg-connection-string/index.js
var require_pg_connection_string = __commonJS({
  "node_modules/pg-connection-string/index.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    function parse2(str2, options = {}) {
      if (str2.charAt(0) === "/") {
        const config5 = str2.split(" ");
        return { host: config5[0], database: config5[1] };
      }
      const config4 = /* @__PURE__ */ Object.create(null);
      let result;
      let dummyHost = false;
      if (/ |%[^a-f0-9]|%[a-f0-9][^a-f0-9]/i.test(str2)) {
        str2 = encodeURI(str2).replace(/%25(\d\d)/g, "%$1");
      }
      try {
        try {
          result = new URL(str2, "postgres://base");
        } catch (e) {
          result = new URL(str2.replace("@/", "@___DUMMY___/"), "postgres://base");
          dummyHost = true;
        }
      } catch (err) {
        err.input && (err.input = "*****REDACTED*****");
        throw err;
      }
      for (const entry of result.searchParams.entries()) {
        config4[entry[0]] = entry[1];
      }
      config4.user = config4.user || decodeURIComponent(result.username);
      config4.password = config4.password || decodeURIComponent(result.password);
      if (result.protocol == "socket:") {
        config4.host = decodeURI(result.pathname);
        config4.database = result.searchParams.get("db");
        config4.client_encoding = result.searchParams.get("encoding");
        return config4;
      }
      const hostname2 = dummyHost ? "" : result.hostname;
      if (!config4.host) {
        config4.host = decodeURIComponent(hostname2);
      } else if (hostname2 && /^%2f/i.test(hostname2)) {
        result.pathname = hostname2 + result.pathname;
      }
      if (!config4.port) {
        config4.port = result.port;
      }
      const pathname = result.pathname.slice(1) || null;
      config4.database = pathname ? decodeURI(pathname) : null;
      if (config4.ssl === "true" || config4.ssl === "1") {
        config4.ssl = true;
      }
      if (config4.ssl === "0") {
        config4.ssl = false;
      }
      if (config4.sslcert || config4.sslkey || config4.sslrootcert || config4.sslmode) {
        config4.ssl = {};
      }
      if (config4.sslnegotiation === "direct" && config4.ssl === void 0) {
        config4.ssl = true;
      }
      const fs = config4.sslcert || config4.sslkey || config4.sslrootcert ? require_fs() : null;
      if (config4.sslcert) {
        config4.ssl.cert = fs.readFileSync(config4.sslcert).toString();
      }
      if (config4.sslkey) {
        config4.ssl.key = fs.readFileSync(config4.sslkey).toString();
      }
      if (config4.sslrootcert) {
        config4.ssl.ca = fs.readFileSync(config4.sslrootcert).toString();
      }
      if (options.useLibpqCompat && config4.uselibpqcompat) {
        throw new Error("Both useLibpqCompat and uselibpqcompat are set. Please use only one of them.");
      }
      if (config4.uselibpqcompat === "true" || options.useLibpqCompat) {
        switch (config4.sslmode) {
          case "disable": {
            config4.ssl = false;
            break;
          }
          case "prefer": {
            config4.ssl.rejectUnauthorized = false;
            break;
          }
          case "require": {
            if (config4.sslrootcert) {
              config4.ssl.checkServerIdentity = function() {
              };
            } else {
              config4.ssl.rejectUnauthorized = false;
            }
            break;
          }
          case "verify-ca": {
            if (!config4.ssl.ca) {
              throw new Error(
                "SECURITY WARNING: Using sslmode=verify-ca requires specifying a CA with sslrootcert. If a public CA is used, verify-ca allows connections to a server that somebody else may have registered with the CA, making you vulnerable to Man-in-the-Middle attacks. Either specify a custom CA certificate with sslrootcert parameter or use sslmode=verify-full for proper security."
              );
            }
            config4.ssl.checkServerIdentity = function() {
            };
            break;
          }
          case "verify-full": {
            break;
          }
        }
      } else {
        switch (config4.sslmode) {
          case "disable": {
            config4.ssl = false;
            break;
          }
          case "prefer":
          case "require":
          case "verify-ca":
          case "verify-full": {
            if (config4.sslmode !== "verify-full") {
              deprecatedSslModeWarning(config4.sslmode);
            }
            break;
          }
          case "no-verify": {
            config4.ssl.rejectUnauthorized = false;
            break;
          }
        }
      }
      return config4;
    }
    __name(parse2, "parse");
    function toConnectionOptions(sslConfig) {
      const connectionOptions = Object.entries(sslConfig).reduce((c, [key, value]) => {
        if (value !== void 0 && value !== null) {
          c[key] = value;
        }
        return c;
      }, /* @__PURE__ */ Object.create(null));
      return connectionOptions;
    }
    __name(toConnectionOptions, "toConnectionOptions");
    function toClientConfig(config4) {
      const poolConfig = Object.entries(config4).reduce((c, [key, value]) => {
        if (key === "ssl") {
          const sslConfig = value;
          if (typeof sslConfig === "boolean") {
            c[key] = sslConfig;
          }
          if (typeof sslConfig === "object") {
            c[key] = toConnectionOptions(sslConfig);
          }
        } else if (value !== void 0 && value !== null) {
          if (key === "port") {
            if (value !== "") {
              const v = parseInt(value, 10);
              if (isNaN(v)) {
                throw new Error(`Invalid ${key}: ${value}`);
              }
              c[key] = v;
            }
          } else {
            c[key] = value;
          }
        }
        return c;
      }, /* @__PURE__ */ Object.create(null));
      return poolConfig;
    }
    __name(toClientConfig, "toClientConfig");
    function parseIntoClientConfig(str2) {
      return toClientConfig(parse2(str2));
    }
    __name(parseIntoClientConfig, "parseIntoClientConfig");
    function deprecatedSslModeWarning(sslmode) {
      if (!deprecatedSslModeWarning.warned && typeof process !== "undefined" && process.emitWarning) {
        deprecatedSslModeWarning.warned = true;
        process.emitWarning(`SECURITY WARNING: The SSL modes 'prefer', 'require', and 'verify-ca' are treated as aliases for 'verify-full'.
In the next major version (pg-connection-string v3.0.0 and pg v9.0.0), these modes will adopt standard libpq semantics, which have weaker security guarantees.

To prepare for this change:
- If you want the current behavior, explicitly use 'sslmode=verify-full'
- If you want libpq compatibility now, use 'uselibpqcompat=true&sslmode=${sslmode}'

See https://www.postgresql.org/docs/current/libpq-ssl.html for libpq SSL mode definitions.`);
      }
    }
    __name(deprecatedSslModeWarning, "deprecatedSslModeWarning");
    module.exports = parse2;
    parse2.parse = parse2;
    parse2.toClientConfig = toClientConfig;
    parse2.parseIntoClientConfig = parseIntoClientConfig;
  }
});

// node_modules/pg/lib/connection-parameters.js
var require_connection_parameters = __commonJS({
  "node_modules/pg/lib/connection-parameters.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var dns = require_dns();
    var defaults2 = require_defaults();
    var parse2 = require_pg_connection_string().parse;
    var val = /* @__PURE__ */ __name(function(key, config4, envVar) {
      if (config4[key]) {
        return config4[key];
      }
      if (envVar === void 0) {
        envVar = process.env["PG" + key.toUpperCase()];
      } else if (envVar === false) {
      } else {
        envVar = process.env[envVar];
      }
      return envVar || defaults2[key];
    }, "val");
    var readSSLConfigFromEnvironment = /* @__PURE__ */ __name(function() {
      switch (process.env.PGSSLMODE) {
        case "disable":
          return false;
        case "prefer":
        case "require":
        case "verify-ca":
        case "verify-full":
          return true;
        case "no-verify":
          return { rejectUnauthorized: false };
      }
      return defaults2.ssl;
    }, "readSSLConfigFromEnvironment");
    var quoteParamValue = /* @__PURE__ */ __name(function(value) {
      return "'" + ("" + value).replace(/\\/g, "\\\\").replace(/'/g, "\\'") + "'";
    }, "quoteParamValue");
    var add = /* @__PURE__ */ __name(function(params, config4, paramName) {
      const value = config4[paramName];
      if (value !== void 0 && value !== null) {
        params.push(paramName + "=" + quoteParamValue(value));
      }
    }, "add");
    var ConnectionParameters = class {
      static {
        __name(this, "ConnectionParameters");
      }
      constructor(config4) {
        config4 = typeof config4 === "string" ? parse2(config4) : config4 || {};
        if (config4.connectionString) {
          config4 = Object.assign({}, config4, parse2(config4.connectionString));
        }
        this.user = val("user", config4);
        this.database = val("database", config4);
        if (this.database === void 0) {
          this.database = this.user;
        }
        this.port = parseInt(val("port", config4), 10);
        this.host = val("host", config4);
        Object.defineProperty(this, "password", {
          configurable: true,
          enumerable: false,
          writable: true,
          value: val("password", config4)
        });
        this.binary = val("binary", config4);
        this.options = val("options", config4);
        this.ssl = typeof config4.ssl === "undefined" ? readSSLConfigFromEnvironment() : config4.ssl;
        if (typeof this.ssl === "string") {
          if (this.ssl === "true") {
            this.ssl = true;
          }
        }
        if (this.ssl === "no-verify") {
          this.ssl = { rejectUnauthorized: false };
        }
        if (this.ssl && this.ssl.key) {
          Object.defineProperty(this.ssl, "key", {
            enumerable: false
          });
        }
        this.sslnegotiation = val("sslnegotiation", config4, "PGSSLNEGOTIATION");
        if (this.sslnegotiation !== void 0 && this.sslnegotiation !== "postgres" && this.sslnegotiation !== "direct") {
          throw new Error(
            `Invalid sslnegotiation value: "${this.sslnegotiation}". Valid values are "postgres" and "direct".`
          );
        }
        if (this.sslnegotiation === "direct" && !this.ssl) {
          throw new Error("sslnegotiation=direct requires SSL to be enabled");
        }
        this.client_encoding = val("client_encoding", config4);
        this.replication = val("replication", config4);
        this.isDomainSocket = !(this.host || "").indexOf("/");
        this.application_name = val("application_name", config4, "PGAPPNAME");
        this.fallback_application_name = val("fallback_application_name", config4, false);
        this.statement_timeout = val("statement_timeout", config4, false);
        this.lock_timeout = val("lock_timeout", config4, false);
        this.idle_in_transaction_session_timeout = val("idle_in_transaction_session_timeout", config4, false);
        this.query_timeout = val("query_timeout", config4, false);
        if (config4.connectionTimeoutMillis === void 0) {
          this.connect_timeout = process.env.PGCONNECT_TIMEOUT || 0;
        } else {
          this.connect_timeout = Math.floor(config4.connectionTimeoutMillis / 1e3);
        }
        if (config4.keepAlive === false) {
          this.keepalives = 0;
        } else if (config4.keepAlive === true) {
          this.keepalives = 1;
        }
        if (typeof config4.keepAliveInitialDelayMillis === "number") {
          this.keepalives_idle = Math.floor(config4.keepAliveInitialDelayMillis / 1e3);
        }
      }
      getLibpqConnectionString(cb) {
        const params = [];
        add(params, this, "user");
        add(params, this, "password");
        add(params, this, "port");
        add(params, this, "application_name");
        add(params, this, "fallback_application_name");
        add(params, this, "connect_timeout");
        add(params, this, "options");
        const ssl = typeof this.ssl === "object" ? this.ssl : this.ssl ? { sslmode: this.ssl } : {};
        add(params, ssl, "sslmode");
        add(params, ssl, "sslca");
        add(params, ssl, "sslkey");
        add(params, ssl, "sslcert");
        add(params, ssl, "sslrootcert");
        add(params, this, "sslnegotiation");
        if (this.database) {
          params.push("dbname=" + quoteParamValue(this.database));
        }
        if (this.replication) {
          params.push("replication=" + quoteParamValue(this.replication));
        }
        if (this.host) {
          params.push("host=" + quoteParamValue(this.host));
        }
        if (this.isDomainSocket) {
          return cb(null, params.join(" "));
        }
        if (this.client_encoding) {
          params.push("client_encoding=" + quoteParamValue(this.client_encoding));
        }
        dns.lookup(this.host, function(err, address) {
          if (err) return cb(err, null);
          params.push("hostaddr=" + quoteParamValue(address));
          return cb(null, params.join(" "));
        });
      }
    };
    module.exports = ConnectionParameters;
  }
});

// node_modules/pg/lib/result.js
var require_result = __commonJS({
  "node_modules/pg/lib/result.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var types2 = require_pg_types();
    var matchRegexp = /^([A-Za-z]+)(?: (\d+))?(?: (\d+))?/;
    var Result2 = class {
      static {
        __name(this, "Result");
      }
      constructor(rowMode, types3) {
        this.command = null;
        this.rowCount = null;
        this.oid = null;
        this.rows = [];
        this.fields = [];
        this._parsers = void 0;
        this._types = types3;
        this.RowCtor = null;
        this.rowAsArray = rowMode === "array";
        if (this.rowAsArray) {
          this.parseRow = this._parseRowAsArray;
        }
        this._prebuiltEmptyResultObject = null;
      }
      // adds a command complete message
      addCommandComplete(msg) {
        let match3;
        if (msg.text) {
          match3 = matchRegexp.exec(msg.text);
        } else {
          match3 = matchRegexp.exec(msg.command);
        }
        if (match3) {
          this.command = match3[1];
          if (match3[3]) {
            this.oid = parseInt(match3[2], 10);
            this.rowCount = parseInt(match3[3], 10);
          } else if (match3[2]) {
            this.rowCount = parseInt(match3[2], 10);
          }
        }
      }
      _parseRowAsArray(rowData) {
        const row = new Array(rowData.length);
        for (let i = 0, len = rowData.length; i < len; i++) {
          const rawValue = rowData[i];
          if (rawValue !== null) {
            row[i] = this._parsers[i](rawValue);
          } else {
            row[i] = null;
          }
        }
        return row;
      }
      parseRow(rowData) {
        const row = { ...this._prebuiltEmptyResultObject };
        for (let i = 0, len = rowData.length; i < len; i++) {
          const rawValue = rowData[i];
          const field = this.fields[i].name;
          if (rawValue !== null) {
            const v = this.fields[i].format === "binary" ? Buffer.from(rawValue) : rawValue;
            row[field] = this._parsers[i](v);
          } else {
            row[field] = null;
          }
        }
        return row;
      }
      addRow(row) {
        this.rows.push(row);
      }
      addFields(fieldDescriptions) {
        this.fields = fieldDescriptions;
        if (this.fields.length) {
          this._parsers = new Array(fieldDescriptions.length);
        }
        const row = /* @__PURE__ */ Object.create(null);
        for (let i = 0; i < fieldDescriptions.length; i++) {
          const desc = fieldDescriptions[i];
          row[desc.name] = null;
          if (this._types) {
            this._parsers[i] = this._types.getTypeParser(desc.dataTypeID, desc.format || "text");
          } else {
            this._parsers[i] = types2.getTypeParser(desc.dataTypeID, desc.format || "text");
          }
        }
        this._prebuiltEmptyResultObject = { ...row };
      }
    };
    module.exports = Result2;
  }
});

// node_modules/pg/lib/query.js
var require_query = __commonJS({
  "node_modules/pg/lib/query.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var { EventEmitter: EventEmitter2 } = require_events();
    var Result2 = require_result();
    var utils = require_utils();
    var Query2 = class extends EventEmitter2 {
      static {
        __name(this, "Query");
      }
      constructor(config4, values, callback) {
        super();
        config4 = utils.normalizeQueryConfig(config4, values, callback);
        this.text = config4.text;
        this.values = config4.values;
        this.rows = config4.rows;
        this.types = config4.types;
        this.name = config4.name;
        this.queryMode = config4.queryMode;
        this.binary = config4.binary;
        this.portal = config4.portal || "";
        this.callback = config4.callback;
        this._rowMode = config4.rowMode;
        if (process.domain && config4.callback) {
          this.callback = process.domain.bind(config4.callback);
        }
        this._result = new Result2(this._rowMode, this.types);
        this._results = this._result;
        this._canceledDueToError = false;
      }
      requiresPreparation() {
        if (this.queryMode === "extended") {
          return true;
        }
        if (this.name) {
          return true;
        }
        if (this.rows) {
          return true;
        }
        if (!this.text) {
          return false;
        }
        if (!this.values) {
          return false;
        }
        return this.values.length > 0;
      }
      _checkForMultirow() {
        if (this._result.command) {
          if (!Array.isArray(this._results)) {
            this._results = [this._result];
          }
          this._result = new Result2(this._rowMode, this._result._types);
          this._results.push(this._result);
        }
      }
      // associates row metadata from the supplied
      // message with this query object
      // metadata used when parsing row results
      handleRowDescription(msg) {
        this._checkForMultirow();
        this._result.addFields(msg.fields);
        this._accumulateRows = this.callback || !this.listeners("row").length;
      }
      handleDataRow(msg) {
        let row;
        if (this._canceledDueToError) {
          return;
        }
        try {
          row = this._result.parseRow(msg.fields);
        } catch (err) {
          this._canceledDueToError = err;
          return;
        }
        this.emit("row", row, this._result);
        if (this._accumulateRows) {
          this._result.addRow(row);
        }
      }
      handleCommandComplete(msg, connection) {
        this._checkForMultirow();
        this._result.addCommandComplete(msg);
        if (this.rows) {
          connection.sync();
        }
      }
      // if a named prepared statement is created with empty query text
      // the backend will send an emptyQuery message but *not* a command complete message
      // since we pipeline sync immediately after execute we don't need to do anything here
      // unless we have rows specified, in which case we did not pipeline the initial sync call
      handleEmptyQuery(connection) {
        if (this.rows) {
          connection.sync();
        }
      }
      handleError(err, connection) {
        if (this._canceledDueToError) {
          err = this._canceledDueToError;
          this._canceledDueToError = false;
        }
        if (this.callback) {
          return this.callback(err);
        }
        this.emit("error", err);
      }
      handleReadyForQuery(con) {
        if (this._canceledDueToError) {
          return this.handleError(this._canceledDueToError, con);
        }
        if (this.callback) {
          try {
            this.callback(null, this._results);
          } catch (err) {
            process.nextTick(() => {
              throw err;
            });
          }
        }
        this.emit("end", this._results);
      }
      submit(connection) {
        if (typeof this.text !== "string" && typeof this.name !== "string") {
          return new Error("A query must have either text or a name. Supplying neither is unsupported.");
        }
        const previous = connection.parsedStatements[this.name];
        if (this.text && previous && this.text !== previous) {
          return new Error(`Prepared statements must be unique - '${this.name}' was used for a different statement`);
        }
        if (this.values && !Array.isArray(this.values)) {
          return new Error("Query values must be an array");
        }
        if (this.requiresPreparation()) {
          connection.stream.cork && connection.stream.cork();
          try {
            this.prepare(connection);
          } finally {
            connection.stream.uncork && connection.stream.uncork();
          }
        } else {
          connection.query(this.text);
        }
        return null;
      }
      hasBeenParsed(connection) {
        return this.name && connection.parsedStatements[this.name];
      }
      handlePortalSuspended(connection) {
        this._getRows(connection, this.rows);
      }
      _getRows(connection, rows) {
        connection.execute({
          portal: this.portal,
          rows
        });
        if (!rows) {
          connection.sync();
        } else {
          connection.flush();
        }
      }
      // http://developer.postgresql.org/pgdocs/postgres/protocol-flow.html#PROTOCOL-FLOW-EXT-QUERY
      prepare(connection) {
        if (!this.hasBeenParsed(connection)) {
          connection.parse({
            text: this.text,
            name: this.name,
            types: this.types
          });
        }
        try {
          connection.bind({
            portal: this.portal,
            statement: this.name,
            values: this.values,
            binary: this.binary,
            valueMapper: utils.prepareValue
          });
        } catch (err) {
          connection.close({ type: "S", name: this.name });
          connection.sync();
          this.handleError(err, connection);
          return;
        }
        connection.describe({
          type: "P",
          name: this.portal || ""
        });
        this._getRows(connection, this.rows);
      }
      handleCopyInResponse(connection) {
        connection.sendCopyFail("No source stream defined");
      }
      handleCopyData(msg, connection) {
      }
    };
    module.exports = Query2;
  }
});

// node_modules/pg-protocol/dist/messages.js
var require_messages = __commonJS({
  "node_modules/pg-protocol/dist/messages.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NoticeMessage = exports.DataRowMessage = exports.CommandCompleteMessage = exports.ReadyForQueryMessage = exports.NotificationResponseMessage = exports.BackendKeyDataMessage = exports.AuthenticationMD5Password = exports.ParameterStatusMessage = exports.ParameterDescriptionMessage = exports.RowDescriptionMessage = exports.Field = exports.CopyResponse = exports.CopyDataMessage = exports.DatabaseError = exports.copyDone = exports.emptyQuery = exports.replicationStart = exports.portalSuspended = exports.noData = exports.closeComplete = exports.bindComplete = exports.parseComplete = void 0;
    exports.parseComplete = {
      name: "parseComplete",
      length: 5
    };
    exports.bindComplete = {
      name: "bindComplete",
      length: 5
    };
    exports.closeComplete = {
      name: "closeComplete",
      length: 5
    };
    exports.noData = {
      name: "noData",
      length: 5
    };
    exports.portalSuspended = {
      name: "portalSuspended",
      length: 5
    };
    exports.replicationStart = {
      name: "replicationStart",
      length: 4
    };
    exports.emptyQuery = {
      name: "emptyQuery",
      length: 4
    };
    exports.copyDone = {
      name: "copyDone",
      length: 4
    };
    var DatabaseError2 = class extends Error {
      static {
        __name(this, "DatabaseError");
      }
      constructor(message, length, name) {
        super(message);
        this.length = length;
        this.name = name;
      }
    };
    exports.DatabaseError = DatabaseError2;
    var CopyDataMessage = class {
      static {
        __name(this, "CopyDataMessage");
      }
      constructor(length, chunk) {
        this.length = length;
        this.chunk = chunk;
        this.name = "copyData";
      }
    };
    exports.CopyDataMessage = CopyDataMessage;
    var CopyResponse = class {
      static {
        __name(this, "CopyResponse");
      }
      constructor(length, name, binary, columnCount) {
        this.length = length;
        this.name = name;
        this.binary = binary;
        this.columnTypes = new Array(columnCount);
      }
    };
    exports.CopyResponse = CopyResponse;
    var Field = class {
      static {
        __name(this, "Field");
      }
      constructor(name, tableID, columnID, dataTypeID, dataTypeSize, dataTypeModifier, format) {
        this.name = name;
        this.tableID = tableID;
        this.columnID = columnID;
        this.dataTypeID = dataTypeID;
        this.dataTypeSize = dataTypeSize;
        this.dataTypeModifier = dataTypeModifier;
        this.format = format;
      }
    };
    exports.Field = Field;
    var RowDescriptionMessage = class {
      static {
        __name(this, "RowDescriptionMessage");
      }
      constructor(length, fieldCount) {
        this.length = length;
        this.fieldCount = fieldCount;
        this.name = "rowDescription";
        this.fields = new Array(this.fieldCount);
      }
    };
    exports.RowDescriptionMessage = RowDescriptionMessage;
    var ParameterDescriptionMessage = class {
      static {
        __name(this, "ParameterDescriptionMessage");
      }
      constructor(length, parameterCount) {
        this.length = length;
        this.parameterCount = parameterCount;
        this.name = "parameterDescription";
        this.dataTypeIDs = new Array(this.parameterCount);
      }
    };
    exports.ParameterDescriptionMessage = ParameterDescriptionMessage;
    var ParameterStatusMessage = class {
      static {
        __name(this, "ParameterStatusMessage");
      }
      constructor(length, parameterName, parameterValue) {
        this.length = length;
        this.parameterName = parameterName;
        this.parameterValue = parameterValue;
        this.name = "parameterStatus";
      }
    };
    exports.ParameterStatusMessage = ParameterStatusMessage;
    var AuthenticationMD5Password = class {
      static {
        __name(this, "AuthenticationMD5Password");
      }
      constructor(length, salt) {
        this.length = length;
        this.salt = salt;
        this.name = "authenticationMD5Password";
      }
    };
    exports.AuthenticationMD5Password = AuthenticationMD5Password;
    var BackendKeyDataMessage = class {
      static {
        __name(this, "BackendKeyDataMessage");
      }
      constructor(length, processID, secretKey) {
        this.length = length;
        this.processID = processID;
        this.secretKey = secretKey;
        this.name = "backendKeyData";
      }
    };
    exports.BackendKeyDataMessage = BackendKeyDataMessage;
    var NotificationResponseMessage = class {
      static {
        __name(this, "NotificationResponseMessage");
      }
      constructor(length, processId, channel2, payload) {
        this.length = length;
        this.processId = processId;
        this.channel = channel2;
        this.payload = payload;
        this.name = "notification";
      }
    };
    exports.NotificationResponseMessage = NotificationResponseMessage;
    var ReadyForQueryMessage = class {
      static {
        __name(this, "ReadyForQueryMessage");
      }
      constructor(length, status) {
        this.length = length;
        this.status = status;
        this.name = "readyForQuery";
      }
    };
    exports.ReadyForQueryMessage = ReadyForQueryMessage;
    var CommandCompleteMessage = class {
      static {
        __name(this, "CommandCompleteMessage");
      }
      constructor(length, text) {
        this.length = length;
        this.text = text;
        this.name = "commandComplete";
      }
    };
    exports.CommandCompleteMessage = CommandCompleteMessage;
    var DataRowMessage = class {
      static {
        __name(this, "DataRowMessage");
      }
      constructor(length, fields) {
        this.length = length;
        this.fields = fields;
        this.name = "dataRow";
        this.fieldCount = fields.length;
      }
    };
    exports.DataRowMessage = DataRowMessage;
    var NoticeMessage = class {
      static {
        __name(this, "NoticeMessage");
      }
      constructor(length, message) {
        this.length = length;
        this.message = message;
        this.name = "notice";
      }
    };
    exports.NoticeMessage = NoticeMessage;
  }
});

// node_modules/pg-protocol/dist/buffer-writer.js
var require_buffer_writer = __commonJS({
  "node_modules/pg-protocol/dist/buffer-writer.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Writer = void 0;
    var Writer = class {
      static {
        __name(this, "Writer");
      }
      constructor(size = 256) {
        this.size = size;
        this.offset = 5;
        this.headerPosition = 0;
        this.buffer = Buffer.allocUnsafe(size);
      }
      ensure(size) {
        const remaining = this.buffer.length - this.offset;
        if (remaining < size) {
          const oldBuffer = this.buffer;
          const newSize = oldBuffer.length + (oldBuffer.length >> 1) + size;
          this.buffer = Buffer.allocUnsafe(newSize);
          oldBuffer.copy(this.buffer);
        }
      }
      addInt32(num) {
        this.ensure(4);
        this.buffer[this.offset++] = num >>> 24 & 255;
        this.buffer[this.offset++] = num >>> 16 & 255;
        this.buffer[this.offset++] = num >>> 8 & 255;
        this.buffer[this.offset++] = num >>> 0 & 255;
        return this;
      }
      addInt16(num) {
        this.ensure(2);
        this.buffer[this.offset++] = num >>> 8 & 255;
        this.buffer[this.offset++] = num >>> 0 & 255;
        return this;
      }
      addCString(string) {
        if (!string) {
          this.ensure(1);
        } else {
          const len = Buffer.byteLength(string);
          this.ensure(len + 1);
          this.buffer.write(string, this.offset, "utf-8");
          this.offset += len;
        }
        this.buffer[this.offset++] = 0;
        return this;
      }
      addString(string = "") {
        const len = Buffer.byteLength(string);
        this.ensure(len);
        this.buffer.write(string, this.offset);
        this.offset += len;
        return this;
      }
      // Write an Int32 byte-length prefix immediately followed by the string's UTF-8
      // bytes. Postgres' Bind wire format prefixes every parameter with its length,
      // and doing it in one method computes Buffer.byteLength ONCE — the previous
      // `addInt32(Buffer.byteLength(s)).addString(s)` pairing scanned the string
      // three times (byteLength for the prefix, byteLength again inside addString,
      // then the encode), which is costly for large text parameters.
      addInt32PrefixedString(string) {
        const len = Buffer.byteLength(string);
        this.ensure(4 + len);
        const buffer = this.buffer;
        let offset = this.offset;
        buffer[offset++] = len >>> 24 & 255;
        buffer[offset++] = len >>> 16 & 255;
        buffer[offset++] = len >>> 8 & 255;
        buffer[offset++] = len >>> 0 & 255;
        buffer.write(string, offset, "utf-8");
        this.offset = offset + len;
        return this;
      }
      add(otherBuffer) {
        this.ensure(otherBuffer.length);
        otherBuffer.copy(this.buffer, this.offset);
        this.offset += otherBuffer.length;
        return this;
      }
      join(code) {
        if (code) {
          this.buffer[this.headerPosition] = code;
          const length = this.offset - (this.headerPosition + 1);
          this.buffer.writeInt32BE(length, this.headerPosition + 1);
        }
        return this.buffer.slice(code ? 0 : 5, this.offset);
      }
      flush(code) {
        const result = this.join(code);
        this.offset = 5;
        this.headerPosition = 0;
        this.buffer = Buffer.allocUnsafe(this.size);
        return result;
      }
      clear() {
        this.offset = 5;
        this.headerPosition = 0;
      }
    };
    exports.Writer = Writer;
  }
});

// node_modules/pg-protocol/dist/serializer.js
var require_serializer = __commonJS({
  "node_modules/pg-protocol/dist/serializer.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.serialize = void 0;
    var buffer_writer_1 = require_buffer_writer();
    var writer = new buffer_writer_1.Writer();
    var startup = /* @__PURE__ */ __name((opts) => {
      writer.addInt16(3).addInt16(0);
      for (const key of Object.keys(opts)) {
        writer.addCString(key).addCString(opts[key]);
      }
      writer.addCString("client_encoding").addCString("UTF8");
      const bodyBuffer = writer.addCString("").flush();
      const length = bodyBuffer.length + 4;
      return new buffer_writer_1.Writer().addInt32(length).add(bodyBuffer).flush();
    }, "startup");
    var requestSsl = /* @__PURE__ */ __name(() => {
      const response = Buffer.allocUnsafe(8);
      response.writeInt32BE(8, 0);
      response.writeInt32BE(80877103, 4);
      return response;
    }, "requestSsl");
    var password = /* @__PURE__ */ __name((password2) => {
      return writer.addCString(password2).flush(
        112
        /* code.startup */
      );
    }, "password");
    var sendSASLInitialResponseMessage = /* @__PURE__ */ __name(function(mechanism, initialResponse) {
      writer.addCString(mechanism).addInt32PrefixedString(initialResponse);
      return writer.flush(
        112
        /* code.startup */
      );
    }, "sendSASLInitialResponseMessage");
    var sendSCRAMClientFinalMessage = /* @__PURE__ */ __name(function(additionalData) {
      return writer.addString(additionalData).flush(
        112
        /* code.startup */
      );
    }, "sendSCRAMClientFinalMessage");
    var query2 = /* @__PURE__ */ __name((text) => {
      return writer.addCString(text).flush(
        81
        /* code.query */
      );
    }, "query");
    var emptyArray = [];
    var parse2 = /* @__PURE__ */ __name((query3) => {
      const name = query3.name || "";
      if (name.length > 63) {
        console.error("Warning! Postgres only supports 63 characters for query names.");
        console.error("You supplied %s (%s)", name, name.length);
        console.error("This can cause conflicts and silent errors executing queries");
      }
      const types2 = query3.types || emptyArray;
      const len = types2.length;
      const buffer = writer.addCString(name).addCString(query3.text).addInt16(len);
      for (let i = 0; i < len; i++) {
        buffer.addInt32(types2[i]);
      }
      return writer.flush(
        80
        /* code.parse */
      );
    }, "parse");
    var paramWriter = new buffer_writer_1.Writer();
    var writeValues = /* @__PURE__ */ __name(function(values, valueMapper) {
      for (let i = 0; i < values.length; i++) {
        const mappedVal = valueMapper ? valueMapper(values[i], i) : values[i];
        if (mappedVal == null) {
          writer.addInt16(
            0
            /* ParamType.STRING */
          );
          paramWriter.addInt32(-1);
        } else if (mappedVal instanceof Buffer) {
          writer.addInt16(
            1
            /* ParamType.BINARY */
          );
          paramWriter.addInt32(mappedVal.length);
          paramWriter.add(mappedVal);
        } else {
          writer.addInt16(
            0
            /* ParamType.STRING */
          );
          paramWriter.addInt32PrefixedString(mappedVal);
        }
      }
    }, "writeValues");
    var bind = /* @__PURE__ */ __name((config4 = {}) => {
      const portal = config4.portal || "";
      const statement = config4.statement || "";
      const binary = config4.binary || false;
      const values = config4.values || emptyArray;
      const len = values.length;
      writer.addCString(portal).addCString(statement);
      writer.addInt16(len);
      try {
        writeValues(values, config4.valueMapper);
      } catch (err) {
        writer.clear();
        paramWriter.clear();
        throw err;
      }
      writer.addInt16(len);
      writer.add(paramWriter.flush());
      writer.addInt16(1);
      writer.addInt16(
        binary ? 1 : 0
        /* ParamType.STRING */
      );
      return writer.flush(
        66
        /* code.bind */
      );
    }, "bind");
    var emptyExecute = Buffer.from([69, 0, 0, 0, 9, 0, 0, 0, 0, 0]);
    var execute = /* @__PURE__ */ __name((config4) => {
      if (!config4 || !config4.portal && !config4.rows) {
        return emptyExecute;
      }
      const portal = config4.portal || "";
      const rows = config4.rows || 0;
      const portalLength = Buffer.byteLength(portal);
      const len = 4 + portalLength + 1 + 4;
      const buff = Buffer.allocUnsafe(1 + len);
      buff[0] = 69;
      buff.writeInt32BE(len, 1);
      buff.write(portal, 5, "utf-8");
      buff[portalLength + 5] = 0;
      buff.writeUInt32BE(rows, buff.length - 4);
      return buff;
    }, "execute");
    var cancel = /* @__PURE__ */ __name((processID, secretKey) => {
      const buffer = Buffer.allocUnsafe(16);
      buffer.writeInt32BE(16, 0);
      buffer.writeInt16BE(1234, 4);
      buffer.writeInt16BE(5678, 6);
      buffer.writeInt32BE(processID, 8);
      buffer.writeInt32BE(secretKey, 12);
      return buffer;
    }, "cancel");
    var cstringMessage = /* @__PURE__ */ __name((code, string) => {
      const stringLen = Buffer.byteLength(string);
      const len = 4 + stringLen + 1;
      const buffer = Buffer.allocUnsafe(1 + len);
      buffer[0] = code;
      buffer.writeInt32BE(len, 1);
      buffer.write(string, 5, "utf-8");
      buffer[len] = 0;
      return buffer;
    }, "cstringMessage");
    var emptyDescribePortal = writer.addCString("P").flush(
      68
      /* code.describe */
    );
    var emptyDescribeStatement = writer.addCString("S").flush(
      68
      /* code.describe */
    );
    var describe = /* @__PURE__ */ __name((msg) => {
      return msg.name ? cstringMessage(68, `${msg.type}${msg.name || ""}`) : msg.type === "P" ? emptyDescribePortal : emptyDescribeStatement;
    }, "describe");
    var close2 = /* @__PURE__ */ __name((msg) => {
      const text = `${msg.type}${msg.name || ""}`;
      return cstringMessage(67, text);
    }, "close");
    var copyData = /* @__PURE__ */ __name((chunk) => {
      return writer.add(chunk).flush(
        100
        /* code.copyFromChunk */
      );
    }, "copyData");
    var copyFail = /* @__PURE__ */ __name((message) => {
      return cstringMessage(102, message);
    }, "copyFail");
    var codeOnlyBuffer = /* @__PURE__ */ __name((code) => Buffer.from([code, 0, 0, 0, 4]), "codeOnlyBuffer");
    var flushBuffer = codeOnlyBuffer(
      72
      /* code.flush */
    );
    var syncBuffer = codeOnlyBuffer(
      83
      /* code.sync */
    );
    var endBuffer = codeOnlyBuffer(
      88
      /* code.end */
    );
    var copyDoneBuffer = codeOnlyBuffer(
      99
      /* code.copyDone */
    );
    var serialize = {
      startup,
      password,
      requestSsl,
      sendSASLInitialResponseMessage,
      sendSCRAMClientFinalMessage,
      query: query2,
      parse: parse2,
      bind,
      execute,
      describe,
      close: close2,
      flush: /* @__PURE__ */ __name(() => flushBuffer, "flush"),
      sync: /* @__PURE__ */ __name(() => syncBuffer, "sync"),
      end: /* @__PURE__ */ __name(() => endBuffer, "end"),
      copyData,
      copyDone: /* @__PURE__ */ __name(() => copyDoneBuffer, "copyDone"),
      copyFail,
      cancel
    };
    exports.serialize = serialize;
  }
});

// node_modules/pg-protocol/dist/buffer-reader.js
var require_buffer_reader = __commonJS({
  "node_modules/pg-protocol/dist/buffer-reader.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BufferReader = void 0;
    var BufferReader = class {
      static {
        __name(this, "BufferReader");
      }
      constructor(offset = 0) {
        this.offset = offset;
        this.buffer = Buffer.allocUnsafe(0);
        this.encoding = "utf-8";
      }
      setBuffer(offset, buffer) {
        this.offset = offset;
        this.buffer = buffer;
      }
      int16() {
        const result = this.buffer.readInt16BE(this.offset);
        this.offset += 2;
        return result;
      }
      byte() {
        const result = this.buffer[this.offset];
        this.offset++;
        return result;
      }
      int32() {
        const result = this.buffer.readInt32BE(this.offset);
        this.offset += 4;
        return result;
      }
      uint32() {
        const result = this.buffer.readUInt32BE(this.offset);
        this.offset += 4;
        return result;
      }
      string(length) {
        const result = this.buffer.toString(this.encoding, this.offset, this.offset + length);
        this.offset += length;
        return result;
      }
      cstring() {
        const start = this.offset;
        let end = start;
        while (this.buffer[end++]) {
        }
        this.offset = end;
        return this.buffer.toString(this.encoding, start, end - 1);
      }
      bytes(length) {
        const result = this.buffer.slice(this.offset, this.offset + length);
        this.offset += length;
        return result;
      }
    };
    exports.BufferReader = BufferReader;
  }
});

// node_modules/pg-protocol/dist/parser.js
var require_parser = __commonJS({
  "node_modules/pg-protocol/dist/parser.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Parser = void 0;
    var messages_1 = require_messages();
    var buffer_reader_1 = require_buffer_reader();
    var CODE_LENGTH = 1;
    var LEN_LENGTH = 4;
    var HEADER_LENGTH = CODE_LENGTH + LEN_LENGTH;
    var LATEINIT_LENGTH = -1;
    var emptyBuffer = Buffer.allocUnsafe(0);
    var Parser = class {
      static {
        __name(this, "Parser");
      }
      constructor(opts) {
        this.buffer = emptyBuffer;
        this.bufferLength = 0;
        this.bufferOffset = 0;
        this.reader = new buffer_reader_1.BufferReader();
        if ((opts === null || opts === void 0 ? void 0 : opts.mode) === "binary") {
          throw new Error("Binary mode not supported yet");
        }
        this.mode = (opts === null || opts === void 0 ? void 0 : opts.mode) || "text";
      }
      parse(buffer, callback) {
        this.mergeBuffer(buffer);
        const bufferFullLength = this.bufferOffset + this.bufferLength;
        let offset = this.bufferOffset;
        while (offset + HEADER_LENGTH <= bufferFullLength) {
          const code = this.buffer[offset];
          const length = this.buffer.readUInt32BE(offset + CODE_LENGTH);
          const fullMessageLength = CODE_LENGTH + length;
          if (fullMessageLength + offset <= bufferFullLength) {
            const message = this.handlePacket(offset + HEADER_LENGTH, code, length, this.buffer);
            callback(message);
            offset += fullMessageLength;
          } else {
            break;
          }
        }
        if (offset === bufferFullLength) {
          this.buffer = emptyBuffer;
          this.bufferLength = 0;
          this.bufferOffset = 0;
        } else {
          this.bufferLength = bufferFullLength - offset;
          this.bufferOffset = offset;
        }
      }
      mergeBuffer(buffer) {
        if (this.bufferLength > 0) {
          const newLength = this.bufferLength + buffer.byteLength;
          const newFullLength = newLength + this.bufferOffset;
          if (newFullLength > this.buffer.byteLength) {
            let newBuffer;
            if (newLength <= this.buffer.byteLength && this.bufferOffset >= this.bufferLength) {
              newBuffer = this.buffer;
            } else {
              let newBufferLength = this.buffer.byteLength * 2;
              while (newLength >= newBufferLength) {
                newBufferLength *= 2;
              }
              newBuffer = Buffer.allocUnsafe(newBufferLength);
            }
            this.buffer.copy(newBuffer, 0, this.bufferOffset, this.bufferOffset + this.bufferLength);
            this.buffer = newBuffer;
            this.bufferOffset = 0;
          }
          buffer.copy(this.buffer, this.bufferOffset + this.bufferLength);
          this.bufferLength = newLength;
        } else {
          this.buffer = buffer;
          this.bufferOffset = 0;
          this.bufferLength = buffer.byteLength;
        }
      }
      handlePacket(offset, code, length, bytes) {
        const { reader } = this;
        reader.setBuffer(offset, bytes);
        let message;
        switch (code) {
          case 50:
            message = messages_1.bindComplete;
            break;
          case 49:
            message = messages_1.parseComplete;
            break;
          case 51:
            message = messages_1.closeComplete;
            break;
          case 110:
            message = messages_1.noData;
            break;
          case 115:
            message = messages_1.portalSuspended;
            break;
          case 99:
            message = messages_1.copyDone;
            break;
          case 87:
            message = messages_1.replicationStart;
            break;
          case 73:
            message = messages_1.emptyQuery;
            break;
          case 68:
            message = parseDataRowMessage(reader);
            break;
          case 67:
            message = parseCommandCompleteMessage(reader);
            break;
          case 90:
            message = parseReadyForQueryMessage(reader);
            break;
          case 65:
            message = parseNotificationMessage(reader);
            break;
          case 82:
            message = parseAuthenticationResponse(reader, length);
            break;
          case 83:
            message = parseParameterStatusMessage(reader);
            break;
          case 75:
            message = parseBackendKeyData(reader);
            break;
          case 69:
            message = parseErrorMessage(reader, "error");
            break;
          case 78:
            message = parseErrorMessage(reader, "notice");
            break;
          case 84:
            message = parseRowDescriptionMessage(reader);
            break;
          case 116:
            message = parseParameterDescriptionMessage(reader);
            break;
          case 71:
            message = parseCopyInMessage(reader);
            break;
          case 72:
            message = parseCopyOutMessage(reader);
            break;
          case 100:
            message = parseCopyData(reader, length);
            break;
          default:
            return new messages_1.DatabaseError("received invalid response: " + code.toString(16), length, "error");
        }
        reader.setBuffer(0, emptyBuffer);
        message.length = length;
        return message;
      }
    };
    exports.Parser = Parser;
    var parseReadyForQueryMessage = /* @__PURE__ */ __name((reader) => {
      const status = reader.string(1);
      return new messages_1.ReadyForQueryMessage(LATEINIT_LENGTH, status);
    }, "parseReadyForQueryMessage");
    var parseCommandCompleteMessage = /* @__PURE__ */ __name((reader) => {
      const text = reader.cstring();
      return new messages_1.CommandCompleteMessage(LATEINIT_LENGTH, text);
    }, "parseCommandCompleteMessage");
    var parseCopyData = /* @__PURE__ */ __name((reader, length) => {
      const chunk = reader.bytes(length - 4);
      return new messages_1.CopyDataMessage(LATEINIT_LENGTH, chunk);
    }, "parseCopyData");
    var parseCopyInMessage = /* @__PURE__ */ __name((reader) => parseCopyMessage(reader, "copyInResponse"), "parseCopyInMessage");
    var parseCopyOutMessage = /* @__PURE__ */ __name((reader) => parseCopyMessage(reader, "copyOutResponse"), "parseCopyOutMessage");
    var parseCopyMessage = /* @__PURE__ */ __name((reader, messageName) => {
      const isBinary = reader.byte() !== 0;
      const columnCount = reader.int16();
      const message = new messages_1.CopyResponse(LATEINIT_LENGTH, messageName, isBinary, columnCount);
      for (let i = 0; i < columnCount; i++) {
        message.columnTypes[i] = reader.int16();
      }
      return message;
    }, "parseCopyMessage");
    var parseNotificationMessage = /* @__PURE__ */ __name((reader) => {
      const processId = reader.int32();
      const channel2 = reader.cstring();
      const payload = reader.cstring();
      return new messages_1.NotificationResponseMessage(LATEINIT_LENGTH, processId, channel2, payload);
    }, "parseNotificationMessage");
    var parseRowDescriptionMessage = /* @__PURE__ */ __name((reader) => {
      const fieldCount = reader.int16();
      const message = new messages_1.RowDescriptionMessage(LATEINIT_LENGTH, fieldCount);
      for (let i = 0; i < fieldCount; i++) {
        message.fields[i] = parseField(reader);
      }
      return message;
    }, "parseRowDescriptionMessage");
    var parseField = /* @__PURE__ */ __name((reader) => {
      const name = reader.cstring();
      const tableID = reader.uint32();
      const columnID = reader.int16();
      const dataTypeID = reader.uint32();
      const dataTypeSize = reader.int16();
      const dataTypeModifier = reader.int32();
      const mode = reader.int16() === 0 ? "text" : "binary";
      return new messages_1.Field(name, tableID, columnID, dataTypeID, dataTypeSize, dataTypeModifier, mode);
    }, "parseField");
    var parseParameterDescriptionMessage = /* @__PURE__ */ __name((reader) => {
      const parameterCount = reader.int16();
      const message = new messages_1.ParameterDescriptionMessage(LATEINIT_LENGTH, parameterCount);
      for (let i = 0; i < parameterCount; i++) {
        message.dataTypeIDs[i] = reader.int32();
      }
      return message;
    }, "parseParameterDescriptionMessage");
    var parseDataRowMessage = /* @__PURE__ */ __name((reader) => {
      const fieldCount = reader.int16();
      const fields = new Array(fieldCount);
      for (let i = 0; i < fieldCount; i++) {
        const len = reader.int32();
        fields[i] = len === -1 ? null : reader.string(len);
      }
      return new messages_1.DataRowMessage(LATEINIT_LENGTH, fields);
    }, "parseDataRowMessage");
    var parseParameterStatusMessage = /* @__PURE__ */ __name((reader) => {
      const name = reader.cstring();
      const value = reader.cstring();
      return new messages_1.ParameterStatusMessage(LATEINIT_LENGTH, name, value);
    }, "parseParameterStatusMessage");
    var parseBackendKeyData = /* @__PURE__ */ __name((reader) => {
      const processID = reader.int32();
      const secretKey = reader.int32();
      return new messages_1.BackendKeyDataMessage(LATEINIT_LENGTH, processID, secretKey);
    }, "parseBackendKeyData");
    var parseAuthenticationResponse = /* @__PURE__ */ __name((reader, length) => {
      const code = reader.int32();
      const message = {
        name: "authenticationOk",
        length
      };
      switch (code) {
        case 0:
          break;
        case 3:
          if (message.length === 8) {
            message.name = "authenticationCleartextPassword";
          }
          break;
        case 5:
          if (message.length === 12) {
            message.name = "authenticationMD5Password";
            const salt = reader.bytes(4);
            return new messages_1.AuthenticationMD5Password(LATEINIT_LENGTH, salt);
          }
          break;
        case 10:
          {
            message.name = "authenticationSASL";
            message.mechanisms = [];
            let mechanism;
            do {
              mechanism = reader.cstring();
              if (mechanism) {
                message.mechanisms.push(mechanism);
              }
            } while (mechanism);
          }
          break;
        case 11:
          message.name = "authenticationSASLContinue";
          message.data = reader.string(length - 8);
          break;
        case 12:
          message.name = "authenticationSASLFinal";
          message.data = reader.string(length - 8);
          break;
        default:
          throw new Error("Unknown authenticationOk message type " + code);
      }
      return message;
    }, "parseAuthenticationResponse");
    var parseErrorMessage = /* @__PURE__ */ __name((reader, name) => {
      const fields = {};
      let fieldType = reader.string(1);
      while (fieldType !== "\0") {
        fields[fieldType] = reader.cstring();
        fieldType = reader.string(1);
      }
      const messageValue = fields.M;
      const message = name === "notice" ? new messages_1.NoticeMessage(LATEINIT_LENGTH, messageValue) : new messages_1.DatabaseError(messageValue, LATEINIT_LENGTH, name);
      message.severity = fields.S;
      message.code = fields.C;
      message.detail = fields.D;
      message.hint = fields.H;
      message.position = fields.P;
      message.internalPosition = fields.p;
      message.internalQuery = fields.q;
      message.where = fields.W;
      message.schema = fields.s;
      message.table = fields.t;
      message.column = fields.c;
      message.dataType = fields.d;
      message.constraint = fields.n;
      message.file = fields.F;
      message.line = fields.L;
      message.routine = fields.R;
      return message;
    }, "parseErrorMessage");
  }
});

// node_modules/pg-protocol/dist/index.js
var require_dist = __commonJS({
  "node_modules/pg-protocol/dist/index.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DatabaseError = exports.serialize = void 0;
    exports.parse = parse2;
    var messages_1 = require_messages();
    Object.defineProperty(exports, "DatabaseError", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return messages_1.DatabaseError;
    }, "get") });
    var serializer_1 = require_serializer();
    Object.defineProperty(exports, "serialize", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return serializer_1.serialize;
    }, "get") });
    var parser_1 = require_parser();
    function parse2(stream, callback) {
      const parser = new parser_1.Parser();
      stream.on("data", (buffer) => parser.parse(buffer, callback));
      return new Promise((resolve) => stream.on("end", () => resolve()));
    }
    __name(parse2, "parse");
  }
});

// node-built-in-modules:net
import libDefault7 from "net";
var require_net = __commonJS({
  "node-built-in-modules:net"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = libDefault7;
  }
});

// node-built-in-modules:tls
import libDefault8 from "tls";
var require_tls = __commonJS({
  "node-built-in-modules:tls"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = libDefault8;
  }
});

// node_modules/pg-cloudflare/dist/index.js
var require_dist2 = __commonJS({
  "node_modules/pg-cloudflare/dist/index.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CloudflareSocket = void 0;
    var events_1 = require_events();
    var CloudflareSocket = class extends events_1.EventEmitter {
      static {
        __name(this, "CloudflareSocket");
      }
      constructor(ssl) {
        super();
        this.ssl = ssl;
        this.writable = false;
        this.destroyed = false;
        this._upgrading = false;
        this._upgraded = false;
        this._cfSocket = null;
        this._cfWriter = null;
        this._cfReader = null;
      }
      setNoDelay() {
        return this;
      }
      setKeepAlive() {
        return this;
      }
      ref() {
        return this;
      }
      unref() {
        return this;
      }
      async connect(port, host, connectListener) {
        try {
          log3("connecting");
          if (connectListener)
            this.once("connect", connectListener);
          const options = this.ssl ? { secureTransport: "starttls" } : {};
          const mod = await import("cloudflare:sockets");
          const connect = mod.connect;
          this._cfSocket = connect(`${host}:${port}`, options);
          this._cfWriter = this._cfSocket.writable.getWriter();
          this._addClosedHandler();
          this._cfReader = this._cfSocket.readable.getReader();
          if (this.ssl) {
            this._listenOnce().catch((e) => this.emit("error", e));
          } else {
            this._listen().catch((e) => this.emit("error", e));
          }
          await this._cfWriter.ready;
          log3("socket ready");
          this.writable = true;
          this.emit("connect");
          return this;
        } catch (e) {
          this.emit("error", e);
        }
      }
      async _listen() {
        while (true) {
          log3("awaiting receive from CF socket");
          const { done, value } = await this._cfReader.read();
          log3("CF socket received:", done, value);
          if (done) {
            log3("done");
            break;
          }
          this.emit("data", Buffer.from(value));
        }
      }
      async _listenOnce() {
        log3("awaiting first receive from CF socket");
        const { done, value } = await this._cfReader.read();
        log3("First CF socket received:", done, value);
        this.emit("data", Buffer.from(value));
      }
      write(data, encoding = "utf8", callback = () => {
      }) {
        if (data.length === 0)
          return callback();
        if (typeof data === "string")
          data = Buffer.from(data, encoding);
        log3("sending data direct:", data);
        this._cfWriter.write(data).then(() => {
          log3("data sent");
          callback();
        }, (err) => {
          log3("send error", err);
          callback(err);
        });
        return true;
      }
      end(data = Buffer.alloc(0), encoding = "utf8", callback = () => {
      }) {
        log3("ending CF socket");
        this.write(data, encoding, (err) => {
          this._cfSocket.close();
          if (callback)
            callback(err);
        });
        return this;
      }
      destroy(reason) {
        log3("destroying CF socket", reason);
        this.destroyed = true;
        return this.end();
      }
      startTls(options) {
        if (this._upgraded) {
          this.emit("error", "Cannot call `startTls()` more than once on a socket");
          return;
        }
        this._cfWriter.releaseLock();
        this._cfReader.releaseLock();
        this._upgrading = true;
        this._cfSocket = this._cfSocket.startTls(options);
        this._cfWriter = this._cfSocket.writable.getWriter();
        this._cfReader = this._cfSocket.readable.getReader();
        this._addClosedHandler();
        this._listen().catch((e) => this.emit("error", e));
      }
      _addClosedHandler() {
        this._cfSocket.closed.then(() => {
          if (!this._upgrading) {
            log3("CF socket closed");
            this._cfSocket = null;
            this.emit("close");
          } else {
            this._upgrading = false;
            this._upgraded = true;
          }
        }).catch((e) => this.emit("error", e));
      }
    };
    exports.CloudflareSocket = CloudflareSocket;
    var debug4 = false;
    function dump(data) {
      if (data instanceof Uint8Array || data instanceof ArrayBuffer) {
        const buf = data instanceof Uint8Array ? Buffer.from(data) : Buffer.from(data);
        const hex = buf.toString("hex");
        const str2 = new TextDecoder().decode(data);
        return `
>>> STR: "${str2.replace(/\n/g, "\\n")}"
>>> HEX: ${hex}
`;
      } else {
        return data;
      }
    }
    __name(dump, "dump");
    function log3(...args) {
      debug4 && console.log(...args.map(dump));
    }
    __name(log3, "log");
  }
});

// node_modules/pg/lib/stream.js
var require_stream = __commonJS({
  "node_modules/pg/lib/stream.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var { getStream, getSecureStream } = getStreamFuncs();
    module.exports = {
      /**
       * Get a socket stream compatible with the current runtime environment.
       * @returns {Duplex}
       */
      getStream,
      /**
       * Get a TLS secured socket, compatible with the current environment,
       * using the socket and other settings given in `options`.
       * @returns {Duplex}
       */
      getSecureStream
    };
    function getNodejsStreamFuncs() {
      function getStream2(ssl) {
        const net = require_net();
        return new net.Socket();
      }
      __name(getStream2, "getStream");
      function getSecureStream2(options) {
        const tls = require_tls();
        return tls.connect(options);
      }
      __name(getSecureStream2, "getSecureStream");
      return {
        getStream: getStream2,
        getSecureStream: getSecureStream2
      };
    }
    __name(getNodejsStreamFuncs, "getNodejsStreamFuncs");
    function getCloudflareStreamFuncs() {
      function getStream2(ssl) {
        const { CloudflareSocket } = require_dist2();
        return new CloudflareSocket(ssl);
      }
      __name(getStream2, "getStream");
      function getSecureStream2(options) {
        options.socket.startTls(options);
        return options.socket;
      }
      __name(getSecureStream2, "getSecureStream");
      return {
        getStream: getStream2,
        getSecureStream: getSecureStream2
      };
    }
    __name(getCloudflareStreamFuncs, "getCloudflareStreamFuncs");
    function isCloudflareRuntime() {
      if (typeof navigator === "object" && navigator !== null && true) {
        return true;
      }
      if (typeof Response === "function") {
        const resp = new Response(null, { cf: { thing: true } });
        if (typeof resp.cf === "object" && resp.cf !== null && resp.cf.thing) {
          return true;
        }
      }
      return false;
    }
    __name(isCloudflareRuntime, "isCloudflareRuntime");
    function getStreamFuncs() {
      if (isCloudflareRuntime()) {
        return getCloudflareStreamFuncs();
      }
      return getNodejsStreamFuncs();
    }
    __name(getStreamFuncs, "getStreamFuncs");
  }
});

// node_modules/pg/lib/connection.js
var require_connection = __commonJS({
  "node_modules/pg/lib/connection.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var EventEmitter2 = require_events().EventEmitter;
    var { parse: parse2, serialize } = require_dist();
    var stream = require_stream();
    var { getStream } = stream;
    var flushBuffer = serialize.flush();
    var syncBuffer = serialize.sync();
    var endBuffer = serialize.end();
    var Connection2 = class extends EventEmitter2 {
      static {
        __name(this, "Connection");
      }
      constructor(config4) {
        super();
        config4 = config4 || {};
        this.stream = config4.stream || getStream(config4.ssl);
        if (typeof this.stream === "function") {
          this.stream = this.stream(config4);
        }
        this._keepAlive = config4.keepAlive;
        this._keepAliveInitialDelayMillis = config4.keepAliveInitialDelayMillis;
        this.parsedStatements = {};
        this.ssl = config4.ssl || false;
        this.sslNegotiation = config4.sslNegotiation || "postgres";
        this._ending = false;
        this._emitMessage = false;
        const self2 = this;
        this.on("newListener", function(eventName) {
          if (eventName === "message") {
            self2._emitMessage = true;
          }
        });
      }
      connect(port, host) {
        const self2 = this;
        this._connecting = true;
        this.stream.setNoDelay(true);
        this.stream.connect(port, host);
        this.stream.once("connect", function() {
          if (self2._keepAlive) {
            self2.stream.setKeepAlive(true, self2._keepAliveInitialDelayMillis);
          }
          self2.emit("connect");
        });
        const reportStreamError = /* @__PURE__ */ __name(function(error3) {
          if (self2._ending && (error3.code === "ECONNRESET" || error3.code === "EPIPE")) {
            return;
          }
          self2.emit("error", error3);
        }, "reportStreamError");
        this.stream.on("error", reportStreamError);
        this.stream.on("close", function() {
          self2.emit("end");
        });
        if (!this.ssl) {
          return this.attachListeners(this.stream);
        }
        if (this.sslNegotiation === "direct") {
          return this.stream.once("connect", function() {
            self2.upgradeToSSL(host, reportStreamError);
          });
        }
        this.stream.once("data", function(buffer) {
          const responseCode = buffer.toString("utf8");
          switch (responseCode) {
            case "S":
              break;
            case "N":
              self2.stream.end();
              return self2.emit("error", new Error("The server does not support SSL connections"));
            default:
              self2.stream.end();
              return self2.emit("error", new Error("There was an error establishing an SSL connection"));
          }
          self2.upgradeToSSL(host, reportStreamError);
        });
      }
      upgradeToSSL(host, reportStreamError) {
        const self2 = this;
        const options = {
          socket: self2.stream
        };
        if (self2.ssl !== true) {
          Object.assign(options, self2.ssl);
          if ("key" in self2.ssl) {
            options.key = self2.ssl.key;
          }
        }
        if (self2.sslNegotiation === "direct") {
          options.ALPNProtocols = ["postgresql"];
        }
        const net = require_net();
        if (net.isIP && net.isIP(host) === 0) {
          options.servername = host;
        }
        try {
          self2.stream = stream.getSecureStream(options);
        } catch (err) {
          return self2.emit("error", err);
        }
        self2.attachListeners(self2.stream);
        self2.stream.on("error", reportStreamError);
        self2.emit("sslconnect");
      }
      attachListeners(stream2) {
        parse2(stream2, (msg) => {
          const eventName = msg.name === "error" ? "errorMessage" : msg.name;
          if (this._emitMessage) {
            this.emit("message", msg);
          }
          this.emit(eventName, msg);
        });
      }
      requestSsl() {
        this.stream.write(serialize.requestSsl());
      }
      startup(config4) {
        this.stream.write(serialize.startup(config4));
      }
      cancel(processID, secretKey) {
        this._send(serialize.cancel(processID, secretKey));
      }
      password(password) {
        this._send(serialize.password(password));
      }
      sendSASLInitialResponseMessage(mechanism, initialResponse) {
        this._send(serialize.sendSASLInitialResponseMessage(mechanism, initialResponse));
      }
      sendSCRAMClientFinalMessage(additionalData) {
        this._send(serialize.sendSCRAMClientFinalMessage(additionalData));
      }
      _send(buffer) {
        if (!this.stream.writable) {
          return false;
        }
        return this.stream.write(buffer);
      }
      query(text) {
        this._send(serialize.query(text));
      }
      // send parse message
      parse(query2) {
        this._send(serialize.parse(query2));
      }
      // send bind message
      bind(config4) {
        this._send(serialize.bind(config4));
      }
      // send execute message
      execute(config4) {
        this._send(serialize.execute(config4));
      }
      flush() {
        if (this.stream.writable) {
          this.stream.write(flushBuffer);
        }
      }
      sync() {
        this._ending = true;
        this._send(syncBuffer);
      }
      ref() {
        this.stream.ref();
      }
      unref() {
        this.stream.unref();
      }
      end() {
        this._ending = true;
        if (!this._connecting || !this.stream.writable) {
          this.stream.end();
          return;
        }
        return this.stream.write(endBuffer, () => {
          this.stream.end();
        });
      }
      close(msg) {
        this._send(serialize.close(msg));
      }
      describe(msg) {
        this._send(serialize.describe(msg));
      }
      sendCopyFromChunk(chunk) {
        this._send(serialize.copyData(chunk));
      }
      endCopyFrom() {
        this._send(serialize.copyDone());
      }
      sendCopyFail(msg) {
        this._send(serialize.copyFail(msg));
      }
    };
    module.exports = Connection2;
  }
});

// node-built-in-modules:stream
import libDefault9 from "stream";
var require_stream2 = __commonJS({
  "node-built-in-modules:stream"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = libDefault9;
  }
});

// node-built-in-modules:string_decoder
import libDefault10 from "string_decoder";
var require_string_decoder = __commonJS({
  "node-built-in-modules:string_decoder"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = libDefault10;
  }
});

// node_modules/split2/index.js
var require_split2 = __commonJS({
  "node_modules/split2/index.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var { Transform } = require_stream2();
    var { StringDecoder } = require_string_decoder();
    var kLast = /* @__PURE__ */ Symbol("last");
    var kDecoder = /* @__PURE__ */ Symbol("decoder");
    function transform(chunk, enc2, cb) {
      let list;
      if (this.overflow) {
        const buf = this[kDecoder].write(chunk);
        list = buf.split(this.matcher);
        if (list.length === 1) return cb();
        list.shift();
        this.overflow = false;
      } else {
        this[kLast] += this[kDecoder].write(chunk);
        list = this[kLast].split(this.matcher);
      }
      this[kLast] = list.pop();
      for (let i = 0; i < list.length; i++) {
        try {
          push(this, this.mapper(list[i]));
        } catch (error3) {
          return cb(error3);
        }
      }
      this.overflow = this[kLast].length > this.maxLength;
      if (this.overflow && !this.skipOverflow) {
        cb(new Error("maximum buffer reached"));
        return;
      }
      cb();
    }
    __name(transform, "transform");
    function flush(cb) {
      this[kLast] += this[kDecoder].end();
      if (this[kLast]) {
        try {
          push(this, this.mapper(this[kLast]));
        } catch (error3) {
          return cb(error3);
        }
      }
      cb();
    }
    __name(flush, "flush");
    function push(self2, val) {
      if (val !== void 0) {
        self2.push(val);
      }
    }
    __name(push, "push");
    function noop2(incoming) {
      return incoming;
    }
    __name(noop2, "noop");
    function split(matcher, mapper, options) {
      matcher = matcher || /\r?\n/;
      mapper = mapper || noop2;
      options = options || {};
      switch (arguments.length) {
        case 1:
          if (typeof matcher === "function") {
            mapper = matcher;
            matcher = /\r?\n/;
          } else if (typeof matcher === "object" && !(matcher instanceof RegExp) && !matcher[Symbol.split]) {
            options = matcher;
            matcher = /\r?\n/;
          }
          break;
        case 2:
          if (typeof matcher === "function") {
            options = mapper;
            mapper = matcher;
            matcher = /\r?\n/;
          } else if (typeof mapper === "object") {
            options = mapper;
            mapper = noop2;
          }
      }
      options = Object.assign({}, options);
      options.autoDestroy = true;
      options.transform = transform;
      options.flush = flush;
      options.readableObjectMode = true;
      const stream = new Transform(options);
      stream[kLast] = "";
      stream[kDecoder] = new StringDecoder("utf8");
      stream.matcher = matcher;
      stream.mapper = mapper;
      stream.maxLength = options.maxLength;
      stream.skipOverflow = options.skipOverflow || false;
      stream.overflow = false;
      stream._destroy = function(err, cb) {
        this._writableState.errorEmitted = false;
        cb(err);
      };
      return stream;
    }
    __name(split, "split");
    module.exports = split;
  }
});

// node_modules/pgpass/lib/helper.js
var require_helper = __commonJS({
  "node_modules/pgpass/lib/helper.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var path = require_path();
    var Stream = require_stream2().Stream;
    var split = require_split2();
    var util = require_util();
    var defaultPort = 5432;
    var isWin = process.platform === "win32";
    var warnStream = process.stderr;
    var S_IRWXG2 = 56;
    var S_IRWXO2 = 7;
    var S_IFMT2 = 61440;
    var S_IFREG2 = 32768;
    function isRegFile(mode) {
      return (mode & S_IFMT2) == S_IFREG2;
    }
    __name(isRegFile, "isRegFile");
    var fieldNames = ["host", "port", "database", "user", "password"];
    var nrOfFields = fieldNames.length;
    var passKey = fieldNames[nrOfFields - 1];
    function warn3() {
      var isWritable = warnStream instanceof Stream && true === warnStream.writable;
      if (isWritable) {
        var args = Array.prototype.slice.call(arguments).concat("\n");
        warnStream.write(util.format.apply(util, args));
      }
    }
    __name(warn3, "warn");
    Object.defineProperty(module.exports, "isWin", {
      get: /* @__PURE__ */ __name(function() {
        return isWin;
      }, "get"),
      set: /* @__PURE__ */ __name(function(val) {
        isWin = val;
      }, "set")
    });
    module.exports.warnTo = function(stream) {
      var old = warnStream;
      warnStream = stream;
      return old;
    };
    module.exports.getFileName = function(rawEnv) {
      var env2 = rawEnv || process.env;
      var file = env2.PGPASSFILE || (isWin ? path.join(env2.APPDATA || "./", "postgresql", "pgpass.conf") : path.join(env2.HOME || "./", ".pgpass"));
      return file;
    };
    module.exports.usePgPass = function(stats, fname) {
      if (Object.prototype.hasOwnProperty.call(process.env, "PGPASSWORD")) {
        return false;
      }
      if (isWin) {
        return true;
      }
      fname = fname || "<unkn>";
      if (!isRegFile(stats.mode)) {
        warn3('WARNING: password file "%s" is not a plain file', fname);
        return false;
      }
      if (stats.mode & (S_IRWXG2 | S_IRWXO2)) {
        warn3('WARNING: password file "%s" has group or world access; permissions should be u=rw (0600) or less', fname);
        return false;
      }
      return true;
    };
    var matcher = module.exports.match = function(connInfo, entry) {
      return fieldNames.slice(0, -1).reduce(function(prev, field, idx) {
        if (idx == 1) {
          if (Number(connInfo[field] || defaultPort) === Number(entry[field])) {
            return prev && true;
          }
        }
        return prev && (entry[field] === "*" || entry[field] === connInfo[field]);
      }, true);
    };
    module.exports.getPassword = function(connInfo, stream, cb) {
      var pass2;
      var lineStream = stream.pipe(split());
      function onLine(line) {
        var entry = parseLine(line);
        if (entry && isValidEntry(entry) && matcher(connInfo, entry)) {
          pass2 = entry[passKey];
          lineStream.end();
        }
      }
      __name(onLine, "onLine");
      var onEnd = /* @__PURE__ */ __name(function() {
        stream.destroy();
        cb(pass2);
      }, "onEnd");
      var onErr = /* @__PURE__ */ __name(function(err) {
        stream.destroy();
        warn3("WARNING: error on reading file: %s", err);
        cb(void 0);
      }, "onErr");
      stream.on("error", onErr);
      lineStream.on("data", onLine).on("end", onEnd).on("error", onErr);
    };
    var parseLine = module.exports.parseLine = function(line) {
      if (line.length < 11 || line.match(/^\s+#/)) {
        return null;
      }
      var curChar = "";
      var prevChar = "";
      var fieldIdx = 0;
      var startIdx = 0;
      var endIdx = 0;
      var obj = {};
      var isLastField = false;
      var addToObj = /* @__PURE__ */ __name(function(idx, i0, i1) {
        var field = line.substring(i0, i1);
        if (!Object.hasOwnProperty.call(process.env, "PGPASS_NO_DEESCAPE")) {
          field = field.replace(/\\([:\\])/g, "$1");
        }
        obj[fieldNames[idx]] = field;
      }, "addToObj");
      for (var i = 0; i < line.length - 1; i += 1) {
        curChar = line.charAt(i + 1);
        prevChar = line.charAt(i);
        isLastField = fieldIdx == nrOfFields - 1;
        if (isLastField) {
          addToObj(fieldIdx, startIdx);
          break;
        }
        if (i >= 0 && curChar == ":" && prevChar !== "\\") {
          addToObj(fieldIdx, startIdx, i + 1);
          startIdx = i + 2;
          fieldIdx += 1;
        }
      }
      obj = Object.keys(obj).length === nrOfFields ? obj : null;
      return obj;
    };
    var isValidEntry = module.exports.isValidEntry = function(entry) {
      var rules = {
        // host
        0: function(x) {
          return x.length > 0;
        },
        // port
        1: function(x) {
          if (x === "*") {
            return true;
          }
          x = Number(x);
          return isFinite(x) && x > 0 && x < 9007199254740992 && Math.floor(x) === x;
        },
        // database
        2: function(x) {
          return x.length > 0;
        },
        // username
        3: function(x) {
          return x.length > 0;
        },
        // password
        4: function(x) {
          return x.length > 0;
        }
      };
      for (var idx = 0; idx < fieldNames.length; idx += 1) {
        var rule = rules[idx];
        var value = entry[fieldNames[idx]] || "";
        var res = rule(value);
        if (!res) {
          return false;
        }
      }
      return true;
    };
  }
});

// node_modules/pgpass/lib/index.js
var require_lib = __commonJS({
  "node_modules/pgpass/lib/index.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var path = require_path();
    var fs = require_fs();
    var helper = require_helper();
    module.exports = function(connInfo, cb) {
      var file = helper.getFileName();
      fs.stat(file, function(err, stat3) {
        if (err || !helper.usePgPass(stat3, file)) {
          return cb(void 0);
        }
        var st = fs.createReadStream(file);
        helper.getPassword(connInfo, st, cb);
      });
    };
    module.exports.warnTo = helper.warnTo;
  }
});

// node_modules/pg/lib/client.js
var require_client = __commonJS({
  "node_modules/pg/lib/client.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var EventEmitter2 = require_events().EventEmitter;
    var utils = require_utils();
    var nodeUtils = require_util();
    var sasl = require_sasl();
    var TypeOverrides2 = require_type_overrides();
    var ConnectionParameters = require_connection_parameters();
    var Query2 = require_query();
    var defaults2 = require_defaults();
    var Connection2 = require_connection();
    var crypto2 = require_utils2();
    var activeQueryDeprecationNotice = nodeUtils.deprecate(
      () => {
      },
      "Client.activeQuery is deprecated and will be removed in pg@9.0"
    );
    var queryQueueDeprecationNotice = nodeUtils.deprecate(
      () => {
      },
      "Client.queryQueue is deprecated and will be removed in pg@9.0."
    );
    var pgPassDeprecationNotice = nodeUtils.deprecate(
      () => {
      },
      "pgpass support is deprecated and will be removed in pg@9.0. You can provide an async function as the password property to the Client/Pool constructor that returns a password instead. Within this function you can call the pgpass module in your own code."
    );
    var byoPromiseDeprecationNotice = nodeUtils.deprecate(
      () => {
      },
      "Passing a custom Promise implementation to the Client/Pool constructor is deprecated and will be removed in pg@9.0."
    );
    var queryQueueLengthDeprecationNotice = nodeUtils.deprecate(
      () => {
      },
      "Calling client.query() when the client is already executing a query is deprecated and will be removed in pg@9.0. Use async/await or an external async flow control mechanism instead."
    );
    function coerceNumberOrDefault(value, defaultValue) {
      if (typeof value === "number") {
        return Number.isFinite(value) ? value : defaultValue;
      }
      if (typeof value === "string" && value.trim() !== "") {
        const n = Number(value);
        return Number.isFinite(n) ? n : defaultValue;
      }
      return defaultValue;
    }
    __name(coerceNumberOrDefault, "coerceNumberOrDefault");
    var Client2 = class extends EventEmitter2 {
      static {
        __name(this, "Client");
      }
      constructor(config4) {
        super();
        this.connectionParameters = new ConnectionParameters(config4);
        this.user = this.connectionParameters.user;
        this.database = this.connectionParameters.database;
        this.port = this.connectionParameters.port;
        this.host = this.connectionParameters.host;
        Object.defineProperty(this, "password", {
          configurable: true,
          enumerable: false,
          writable: true,
          value: this.connectionParameters.password
        });
        this.replication = this.connectionParameters.replication;
        const c = config4 || {};
        if (c.Promise) {
          byoPromiseDeprecationNotice();
        }
        this._Promise = c.Promise || global.Promise;
        this._types = new TypeOverrides2(c.types);
        this._ending = false;
        this._ended = false;
        this._connecting = false;
        this._connected = false;
        this._connectionError = false;
        this._queryable = true;
        this._activeQuery = null;
        this._txStatus = null;
        this.enableChannelBinding = Boolean(c.enableChannelBinding);
        this.scramMaxIterations = coerceNumberOrDefault(c.scramMaxIterations, sasl.DEFAULT_MAX_SCRAM_ITERATIONS);
        this.connection = c.connection || new Connection2({
          stream: c.stream,
          ssl: this.connectionParameters.ssl,
          sslNegotiation: this.connectionParameters.sslnegotiation,
          keepAlive: c.keepAlive || false,
          keepAliveInitialDelayMillis: c.keepAliveInitialDelayMillis || 0,
          encoding: this.connectionParameters.client_encoding || "utf8"
        });
        this._queryQueue = [];
        this.binary = c.binary || defaults2.binary;
        this.processID = null;
        this.secretKey = null;
        this.ssl = this.connectionParameters.ssl || false;
        this.sslNegotiation = this.connectionParameters.sslnegotiation || "postgres";
        if (this.ssl && this.ssl.key) {
          Object.defineProperty(this.ssl, "key", {
            enumerable: false
          });
        }
        this._connectionTimeoutMillis = c.connectionTimeoutMillis || 0;
      }
      get activeQuery() {
        activeQueryDeprecationNotice();
        return this._activeQuery;
      }
      set activeQuery(val) {
        activeQueryDeprecationNotice();
        this._activeQuery = val;
      }
      _getActiveQuery() {
        return this._activeQuery;
      }
      _errorAllQueries(err) {
        const enqueueError = /* @__PURE__ */ __name((query2) => {
          process.nextTick(() => {
            query2.handleError(err, this.connection);
          });
        }, "enqueueError");
        const activeQuery = this._getActiveQuery();
        if (activeQuery) {
          enqueueError(activeQuery);
          this._activeQuery = null;
        }
        this._queryQueue.forEach(enqueueError);
        this._queryQueue.length = 0;
      }
      _connect(callback) {
        const self2 = this;
        const con = this.connection;
        this._connectionCallback = callback;
        if (this._connecting || this._connected) {
          const err = new Error("Client has already been connected. You cannot reuse a client.");
          process.nextTick(() => {
            callback(err);
          });
          return;
        }
        this._connecting = true;
        if (this._connectionTimeoutMillis > 0) {
          this.connectionTimeoutHandle = setTimeout(() => {
            con._ending = true;
            con.stream.destroy(new Error("timeout expired"));
          }, this._connectionTimeoutMillis);
          if (this.connectionTimeoutHandle.unref) {
            this.connectionTimeoutHandle.unref();
          }
        }
        if (this.host && this.host.indexOf("/") === 0) {
          con.connect(this.host + "/.s.PGSQL." + this.port);
        } else {
          con.connect(this.port, this.host);
        }
        con.on("connect", function() {
          if (self2.ssl) {
            if (self2.sslNegotiation !== "direct") {
              con.requestSsl();
            }
          } else {
            con.startup(self2.getStartupConf());
          }
        });
        con.on("sslconnect", function() {
          con.startup(self2.getStartupConf());
        });
        this._attachListeners(con);
        con.once("end", () => {
          const error3 = this._ending ? new Error("Connection terminated") : new Error("Connection terminated unexpectedly");
          clearTimeout(this.connectionTimeoutHandle);
          this._errorAllQueries(error3);
          this._ended = true;
          if (!this._ending) {
            if (this._connecting && !this._connectionError) {
              if (this._connectionCallback) {
                this._connectionCallback(error3);
              } else {
                this._handleErrorEvent(error3);
              }
            } else if (!this._connectionError) {
              this._handleErrorEvent(error3);
            }
          }
          process.nextTick(() => {
            this.emit("end");
          });
        });
      }
      connect(callback) {
        if (callback) {
          this._connect(callback);
          return;
        }
        return new this._Promise((resolve, reject) => {
          this._connect((error3) => {
            if (error3) {
              reject(error3);
            } else {
              resolve(this);
            }
          });
        });
      }
      _attachListeners(con) {
        con.on("authenticationCleartextPassword", this._handleAuthCleartextPassword.bind(this));
        con.on("authenticationMD5Password", this._handleAuthMD5Password.bind(this));
        con.on("authenticationSASL", this._handleAuthSASL.bind(this));
        con.on("authenticationSASLContinue", this._handleAuthSASLContinue.bind(this));
        con.on("authenticationSASLFinal", this._handleAuthSASLFinal.bind(this));
        con.on("backendKeyData", this._handleBackendKeyData.bind(this));
        con.on("error", this._handleErrorEvent.bind(this));
        con.on("errorMessage", this._handleErrorMessage.bind(this));
        con.on("readyForQuery", this._handleReadyForQuery.bind(this));
        con.on("notice", this._handleNotice.bind(this));
        con.on("rowDescription", this._handleRowDescription.bind(this));
        con.on("dataRow", this._handleDataRow.bind(this));
        con.on("portalSuspended", this._handlePortalSuspended.bind(this));
        con.on("emptyQuery", this._handleEmptyQuery.bind(this));
        con.on("commandComplete", this._handleCommandComplete.bind(this));
        con.on("parseComplete", this._handleParseComplete.bind(this));
        con.on("copyInResponse", this._handleCopyInResponse.bind(this));
        con.on("copyData", this._handleCopyData.bind(this));
        con.on("notification", this._handleNotification.bind(this));
      }
      _getPassword(cb) {
        const con = this.connection;
        if (typeof this.password === "function") {
          this._Promise.resolve().then(() => this.password(this.connectionParameters)).then((pass2) => {
            if (pass2 !== void 0) {
              if (typeof pass2 !== "string") {
                con.emit("error", new TypeError("Password must be a string"));
                return;
              }
              this.connectionParameters.password = this.password = pass2;
            } else {
              this.connectionParameters.password = this.password = null;
            }
            cb();
          }).catch((err) => {
            con.emit("error", err);
          });
        } else if (this.password !== null) {
          cb();
        } else {
          try {
            const pgPass = require_lib();
            pgPass(this.connectionParameters, (pass2) => {
              if (void 0 !== pass2) {
                pgPassDeprecationNotice();
                this.connectionParameters.password = this.password = pass2;
              }
              cb();
            });
          } catch (e) {
            this.emit("error", e);
          }
        }
      }
      _handleAuthCleartextPassword(msg) {
        this._getPassword(() => {
          this.connection.password(this.password);
        });
      }
      _handleAuthMD5Password(msg) {
        this._getPassword(async () => {
          try {
            const hashedPassword = await crypto2.postgresMd5PasswordHash(this.user, this.password, msg.salt);
            this.connection.password(hashedPassword);
          } catch (e) {
            this.emit("error", e);
          }
        });
      }
      _handleAuthSASL(msg) {
        this._getPassword(() => {
          try {
            this.saslSession = sasl.startSession(
              msg.mechanisms,
              this.enableChannelBinding && this.connection.stream,
              this.scramMaxIterations
            );
            this.connection.sendSASLInitialResponseMessage(this.saslSession.mechanism, this.saslSession.response);
          } catch (err) {
            this.connection.emit("error", err);
          }
        });
      }
      async _handleAuthSASLContinue(msg) {
        try {
          await sasl.continueSession(
            this.saslSession,
            this.password,
            msg.data,
            this.enableChannelBinding && this.connection.stream
          );
          this.connection.sendSCRAMClientFinalMessage(this.saslSession.response);
        } catch (err) {
          this.connection.emit("error", err);
        }
      }
      _handleAuthSASLFinal(msg) {
        try {
          sasl.finalizeSession(this.saslSession, msg.data);
          this.saslSession = null;
        } catch (err) {
          this.connection.emit("error", err);
        }
      }
      _handleBackendKeyData(msg) {
        this.processID = msg.processID;
        this.secretKey = msg.secretKey;
      }
      _handleReadyForQuery(msg) {
        if (this._connecting) {
          this._connecting = false;
          this._connected = true;
          clearTimeout(this.connectionTimeoutHandle);
          if (this._connectionCallback) {
            this._connectionCallback(null, this);
            this._connectionCallback = null;
          }
          this.emit("connect");
        }
        const activeQuery = this._getActiveQuery();
        this._activeQuery = null;
        this._txStatus = msg?.status ?? null;
        this.readyForQuery = true;
        if (activeQuery) {
          activeQuery.handleReadyForQuery(this.connection);
        }
        this._pulseQueryQueue();
      }
      // if we receive an error event or error message
      // during the connection process we handle it here
      _handleErrorWhileConnecting(err) {
        if (this._connectionError) {
          return;
        }
        this._connectionError = true;
        clearTimeout(this.connectionTimeoutHandle);
        if (this._connectionCallback) {
          return this._connectionCallback(err);
        }
        this.emit("error", err);
      }
      // if we're connected and we receive an error event from the connection
      // this means the socket is dead - do a hard abort of all queries and emit
      // the socket error on the client as well
      _handleErrorEvent(err) {
        if (this._connecting) {
          return this._handleErrorWhileConnecting(err);
        }
        this._queryable = false;
        this._errorAllQueries(err);
        this.emit("error", err);
      }
      // handle error messages from the postgres backend
      _handleErrorMessage(msg) {
        if (this._connecting) {
          return this._handleErrorWhileConnecting(msg);
        }
        const activeQuery = this._getActiveQuery();
        if (!activeQuery) {
          this._handleErrorEvent(msg);
          return;
        }
        this._activeQuery = null;
        activeQuery.handleError(msg, this.connection);
      }
      _handleRowDescription(msg) {
        const activeQuery = this._getActiveQuery();
        if (activeQuery == null) {
          const error3 = new Error("Received unexpected rowDescription message from backend.");
          this._handleErrorEvent(error3);
          return;
        }
        activeQuery.handleRowDescription(msg);
      }
      _handleDataRow(msg) {
        const activeQuery = this._getActiveQuery();
        if (activeQuery == null) {
          const error3 = new Error("Received unexpected dataRow message from backend.");
          this._handleErrorEvent(error3);
          return;
        }
        activeQuery.handleDataRow(msg);
      }
      _handlePortalSuspended(msg) {
        const activeQuery = this._getActiveQuery();
        if (activeQuery == null) {
          const error3 = new Error("Received unexpected portalSuspended message from backend.");
          this._handleErrorEvent(error3);
          return;
        }
        activeQuery.handlePortalSuspended(this.connection);
      }
      _handleEmptyQuery(msg) {
        const activeQuery = this._getActiveQuery();
        if (activeQuery == null) {
          const error3 = new Error("Received unexpected emptyQuery message from backend.");
          this._handleErrorEvent(error3);
          return;
        }
        activeQuery.handleEmptyQuery(this.connection);
      }
      _handleCommandComplete(msg) {
        const activeQuery = this._getActiveQuery();
        if (activeQuery == null) {
          const error3 = new Error("Received unexpected commandComplete message from backend.");
          this._handleErrorEvent(error3);
          return;
        }
        activeQuery.handleCommandComplete(msg, this.connection);
      }
      _handleParseComplete() {
        const activeQuery = this._getActiveQuery();
        if (activeQuery == null) {
          const error3 = new Error("Received unexpected parseComplete message from backend.");
          this._handleErrorEvent(error3);
          return;
        }
        if (activeQuery.name) {
          this.connection.parsedStatements[activeQuery.name] = activeQuery.text;
        }
      }
      _handleCopyInResponse(msg) {
        const activeQuery = this._getActiveQuery();
        if (activeQuery == null) {
          const error3 = new Error("Received unexpected copyInResponse message from backend.");
          this._handleErrorEvent(error3);
          return;
        }
        activeQuery.handleCopyInResponse(this.connection);
      }
      _handleCopyData(msg) {
        const activeQuery = this._getActiveQuery();
        if (activeQuery == null) {
          const error3 = new Error("Received unexpected copyData message from backend.");
          this._handleErrorEvent(error3);
          return;
        }
        activeQuery.handleCopyData(msg, this.connection);
      }
      _handleNotification(msg) {
        this.emit("notification", msg);
      }
      _handleNotice(msg) {
        this.emit("notice", msg);
      }
      getStartupConf() {
        const params = this.connectionParameters;
        const data = {
          user: params.user,
          database: params.database
        };
        const appName = params.application_name || params.fallback_application_name;
        if (appName) {
          data.application_name = appName;
        }
        if (params.replication) {
          data.replication = "" + params.replication;
        }
        if (params.statement_timeout) {
          data.statement_timeout = String(parseInt(params.statement_timeout, 10));
        }
        if (params.lock_timeout) {
          data.lock_timeout = String(parseInt(params.lock_timeout, 10));
        }
        if (params.idle_in_transaction_session_timeout) {
          data.idle_in_transaction_session_timeout = String(parseInt(params.idle_in_transaction_session_timeout, 10));
        }
        if (params.options) {
          data.options = params.options;
        }
        return data;
      }
      cancel(client, query2) {
        if (client.activeQuery === query2) {
          const con = this.connection;
          if (this.host && this.host.indexOf("/") === 0) {
            con.connect(this.host + "/.s.PGSQL." + this.port);
          } else {
            con.connect(this.port, this.host);
          }
          con.on("connect", function() {
            con.cancel(client.processID, client.secretKey);
          });
        } else if (client._queryQueue.indexOf(query2) !== -1) {
          client._queryQueue.splice(client._queryQueue.indexOf(query2), 1);
        }
      }
      setTypeParser(oid, format, parseFn) {
        return this._types.setTypeParser(oid, format, parseFn);
      }
      getTypeParser(oid, format) {
        return this._types.getTypeParser(oid, format);
      }
      // escapeIdentifier and escapeLiteral moved to utility functions & exported
      // on PG
      // re-exported here for backwards compatibility
      escapeIdentifier(str2) {
        return utils.escapeIdentifier(str2);
      }
      escapeLiteral(str2) {
        return utils.escapeLiteral(str2);
      }
      _pulseQueryQueue() {
        if (this.readyForQuery === true) {
          this._activeQuery = this._queryQueue.shift();
          const activeQuery = this._getActiveQuery();
          if (activeQuery) {
            this.readyForQuery = false;
            this.hasExecuted = true;
            const queryError = activeQuery.submit(this.connection);
            if (queryError) {
              process.nextTick(() => {
                activeQuery.handleError(queryError, this.connection);
                this.readyForQuery = true;
                this._pulseQueryQueue();
              });
            }
          } else if (this.hasExecuted) {
            this._activeQuery = null;
            this.emit("drain");
          }
        }
      }
      query(config4, values, callback) {
        let query2;
        let result;
        if (config4 == null) {
          throw new TypeError("Client was passed a null or undefined query");
        }
        if (typeof config4.submit === "function") {
          result = query2 = config4;
          if (!query2.callback) {
            if (typeof values === "function") {
              query2.callback = values;
            } else if (callback) {
              query2.callback = callback;
            }
          }
        } else {
          query2 = new Query2(config4, values, callback);
          if (!query2.callback) {
            result = new this._Promise((resolve, reject) => {
              query2.callback = (err, res) => err ? reject(err) : resolve(res);
            }).catch((err) => {
              Error.captureStackTrace(err);
              throw err;
            });
          } else if (typeof query2.callback !== "function") {
            throw new TypeError("callback is not a function");
          }
        }
        const readTimeout = config4.query_timeout || this.connectionParameters.query_timeout;
        if (readTimeout) {
          const queryCallback = query2.callback || (() => {
          });
          const readTimeoutTimer = setTimeout(() => {
            const error3 = new Error("Query read timeout");
            process.nextTick(() => {
              query2.handleError(error3, this.connection);
            });
            queryCallback(error3);
            query2.callback = () => {
            };
            const index = this._queryQueue.indexOf(query2);
            if (index > -1) {
              this._queryQueue.splice(index, 1);
            }
            this._pulseQueryQueue();
          }, readTimeout);
          query2.callback = (err, res) => {
            clearTimeout(readTimeoutTimer);
            queryCallback(err, res);
          };
        }
        if (this.binary && !query2.binary) {
          query2.binary = true;
        }
        if (query2._result && !query2._result._types) {
          query2._result._types = this._types;
        }
        if (!this._queryable) {
          process.nextTick(() => {
            query2.handleError(new Error("Client has encountered a connection error and is not queryable"), this.connection);
          });
          return result;
        }
        if (this._ending) {
          process.nextTick(() => {
            query2.handleError(new Error("Client was closed and is not queryable"), this.connection);
          });
          return result;
        }
        if (this._queryQueue.length > 0) {
          queryQueueLengthDeprecationNotice();
        }
        this._queryQueue.push(query2);
        this._pulseQueryQueue();
        return result;
      }
      ref() {
        this.connection.ref();
      }
      unref() {
        this.connection.unref();
      }
      getTransactionStatus() {
        return this._txStatus;
      }
      end(cb) {
        this._ending = true;
        if (!this.connection._connecting || this._ended) {
          if (cb) {
            cb();
            return;
          } else {
            return this._Promise.resolve();
          }
        }
        if (this._getActiveQuery() || !this._queryable) {
          this.connection.stream.destroy();
        } else {
          this.connection.end();
        }
        if (cb) {
          this.connection.once("end", cb);
        } else {
          return new this._Promise((resolve) => {
            this.connection.once("end", resolve);
          });
        }
      }
      get queryQueue() {
        queryQueueDeprecationNotice();
        return this._queryQueue;
      }
    };
    Client2.Query = Query2;
    module.exports = Client2;
  }
});

// node_modules/pg-pool/index.js
var require_pg_pool = __commonJS({
  "node_modules/pg-pool/index.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var EventEmitter2 = require_events().EventEmitter;
    var NOOP = /* @__PURE__ */ __name(function() {
    }, "NOOP");
    var removeWhere = /* @__PURE__ */ __name((list, predicate) => {
      const i = list.findIndex(predicate);
      return i === -1 ? void 0 : list.splice(i, 1)[0];
    }, "removeWhere");
    var IdleItem = class {
      static {
        __name(this, "IdleItem");
      }
      constructor(client, idleListener, timeoutId) {
        this.client = client;
        this.idleListener = idleListener;
        this.timeoutId = timeoutId;
      }
    };
    var PendingItem = class {
      static {
        __name(this, "PendingItem");
      }
      constructor(callback) {
        this.callback = callback;
      }
    };
    function throwOnDoubleRelease() {
      throw new Error("Release called on client which has already been released to the pool.");
    }
    __name(throwOnDoubleRelease, "throwOnDoubleRelease");
    function promisify(Promise2, callback) {
      if (callback) {
        return { callback, result: void 0 };
      }
      let rej;
      let res;
      const cb = /* @__PURE__ */ __name(function(err, client) {
        err ? rej(err) : res(client);
      }, "cb");
      const result = new Promise2(function(resolve, reject) {
        res = resolve;
        rej = reject;
      }).catch((err) => {
        Error.captureStackTrace(err);
        throw err;
      });
      return { callback: cb, result };
    }
    __name(promisify, "promisify");
    function makeIdleListener(pool2, client) {
      return /* @__PURE__ */ __name(function idleListener(err) {
        err.client = client;
        client.removeListener("error", idleListener);
        client.on("error", () => {
          pool2.log("additional client error after disconnection due to error", err);
        });
        pool2._remove(client);
        pool2.emit("error", err, client);
      }, "idleListener");
    }
    __name(makeIdleListener, "makeIdleListener");
    var Pool2 = class extends EventEmitter2 {
      static {
        __name(this, "Pool");
      }
      constructor(options, Client2) {
        super();
        this.options = Object.assign({}, options);
        if (options != null && "password" in options) {
          Object.defineProperty(this.options, "password", {
            configurable: true,
            enumerable: false,
            writable: true,
            value: options.password
          });
        }
        if (options != null && options.ssl && options.ssl.key) {
          Object.defineProperty(this.options.ssl, "key", {
            enumerable: false
          });
        }
        this.options.max = this.options.max || this.options.poolSize || 10;
        this.options.min = this.options.min || 0;
        this.options.maxUses = this.options.maxUses || Infinity;
        this.options.allowExitOnIdle = this.options.allowExitOnIdle || false;
        this.options.maxLifetimeSeconds = this.options.maxLifetimeSeconds || 0;
        this.log = this.options.log || function() {
        };
        this.Client = this.options.Client || Client2 || require_lib2().Client;
        this.Promise = this.options.Promise || global.Promise;
        if (typeof this.options.idleTimeoutMillis === "undefined") {
          this.options.idleTimeoutMillis = 1e4;
        }
        this._clients = [];
        this._idle = [];
        this._expired = /* @__PURE__ */ new WeakSet();
        this._pendingQueue = [];
        this._endCallback = void 0;
        this.ending = false;
        this.ended = false;
      }
      _promiseTry(f) {
        const Promise2 = this.Promise;
        if (typeof Promise2.try === "function") {
          return Promise2.try(f);
        }
        return new Promise2((resolve) => resolve(f()));
      }
      _isFull() {
        return this._clients.length >= this.options.max;
      }
      _isAboveMin() {
        return this._clients.length > this.options.min;
      }
      _pulseQueue() {
        this.log("pulse queue");
        if (this.ended) {
          this.log("pulse queue ended");
          return;
        }
        if (this.ending) {
          this.log("pulse queue on ending");
          if (this._idle.length) {
            this._idle.slice().map((item) => {
              this._remove(item.client);
            });
          }
          if (!this._clients.length) {
            this.ended = true;
            this._endCallback();
          }
          return;
        }
        if (!this._pendingQueue.length) {
          this.log("no queued requests");
          return;
        }
        if (!this._idle.length && this._isFull()) {
          return;
        }
        const pendingItem = this._pendingQueue.shift();
        if (this._idle.length) {
          const idleItem = this._idle.pop();
          clearTimeout(idleItem.timeoutId);
          const client = idleItem.client;
          client.ref && client.ref();
          const idleListener = idleItem.idleListener;
          return this._acquireClient(client, pendingItem, idleListener, false);
        }
        if (!this._isFull()) {
          return this.newClient(pendingItem);
        }
        throw new Error("unexpected condition");
      }
      _remove(client, callback) {
        const removed = removeWhere(this._idle, (item) => item.client === client);
        if (removed !== void 0) {
          clearTimeout(removed.timeoutId);
        }
        this._clients = this._clients.filter((c) => c !== client);
        const context2 = this;
        client.end(() => {
          context2.emit("remove", client);
          if (typeof callback === "function") {
            callback();
          }
        });
      }
      connect(cb) {
        if (this.ending) {
          const err = new Error("Cannot use a pool after calling end on the pool");
          return cb ? cb(err) : this.Promise.reject(err);
        }
        const response = promisify(this.Promise, cb);
        const result = response.result;
        if (this._isFull() || this._idle.length) {
          if (this._idle.length) {
            process.nextTick(() => this._pulseQueue());
          }
          if (!this.options.connectionTimeoutMillis) {
            this._pendingQueue.push(new PendingItem(response.callback));
            return result;
          }
          const queueCallback = /* @__PURE__ */ __name((err, res, done) => {
            clearTimeout(tid);
            response.callback(err, res, done);
          }, "queueCallback");
          const pendingItem = new PendingItem(queueCallback);
          const tid = setTimeout(() => {
            removeWhere(this._pendingQueue, (i) => i.callback === queueCallback);
            pendingItem.timedOut = true;
            response.callback(new Error("timeout exceeded when trying to connect"));
          }, this.options.connectionTimeoutMillis);
          if (tid.unref) {
            tid.unref();
          }
          this._pendingQueue.push(pendingItem);
          return result;
        }
        this.newClient(new PendingItem(response.callback));
        return result;
      }
      newClient(pendingItem) {
        const client = new this.Client(this.options);
        this._clients.push(client);
        const idleListener = makeIdleListener(this, client);
        this.log("checking client timeout");
        let tid;
        let timeoutHit = false;
        if (this.options.connectionTimeoutMillis) {
          tid = setTimeout(() => {
            if (client.connection) {
              this.log("ending client due to timeout");
              timeoutHit = true;
              client.connection.stream.destroy();
            } else if (!client.isConnected()) {
              this.log("ending client due to timeout");
              timeoutHit = true;
              client.end();
            }
          }, this.options.connectionTimeoutMillis);
        }
        this.log("connecting new client");
        client.connect((err) => {
          if (tid) {
            clearTimeout(tid);
          }
          client.on("error", idleListener);
          if (err) {
            this.log("client failed to connect", err);
            this._clients = this._clients.filter((c) => c !== client);
            if (timeoutHit) {
              err = new Error("Connection terminated due to connection timeout", { cause: err });
            }
            this._pulseQueue();
            if (!pendingItem.timedOut) {
              pendingItem.callback(err, void 0, NOOP);
            }
          } else {
            this.log("new client connected");
            if (this.options.onConnect) {
              this._promiseTry(() => this.options.onConnect(client)).then(
                () => {
                  this._afterConnect(client, pendingItem, idleListener);
                },
                (hookErr) => {
                  this._clients = this._clients.filter((c) => c !== client);
                  client.end(() => {
                    this._pulseQueue();
                    if (!pendingItem.timedOut) {
                      pendingItem.callback(hookErr, void 0, NOOP);
                    }
                  });
                }
              );
              return;
            }
            return this._afterConnect(client, pendingItem, idleListener);
          }
        });
      }
      _afterConnect(client, pendingItem, idleListener) {
        if (this.options.maxLifetimeSeconds !== 0) {
          const maxLifetimeTimeout = setTimeout(() => {
            this.log("ending client due to expired lifetime");
            this._expired.add(client);
            const idleIndex = this._idle.findIndex((idleItem) => idleItem.client === client);
            if (idleIndex !== -1) {
              this._acquireClient(
                client,
                new PendingItem((err, client2, clientRelease) => clientRelease()),
                idleListener,
                false
              );
            }
          }, this.options.maxLifetimeSeconds * 1e3);
          maxLifetimeTimeout.unref();
          client.once("end", () => clearTimeout(maxLifetimeTimeout));
        }
        return this._acquireClient(client, pendingItem, idleListener, true);
      }
      // acquire a client for a pending work item
      _acquireClient(client, pendingItem, idleListener, isNew) {
        if (isNew) {
          this.emit("connect", client);
        }
        this.emit("acquire", client);
        client.release = this._releaseOnce(client, idleListener);
        client.removeListener("error", idleListener);
        if (!pendingItem.timedOut) {
          if (isNew && this.options.verify) {
            this.options.verify(client, (err) => {
              if (err) {
                client.release(err);
                return pendingItem.callback(err, void 0, NOOP);
              }
              pendingItem.callback(void 0, client, client.release);
            });
          } else {
            pendingItem.callback(void 0, client, client.release);
          }
        } else {
          if (isNew && this.options.verify) {
            this.options.verify(client, client.release);
          } else {
            client.release();
          }
        }
      }
      // returns a function that wraps _release and throws if called more than once
      _releaseOnce(client, idleListener) {
        let released = false;
        return (err) => {
          if (released) {
            throwOnDoubleRelease();
          }
          released = true;
          this._release(client, idleListener, err);
        };
      }
      // release a client back to the poll, include an error
      // to remove it from the pool
      _release(client, idleListener, err) {
        client.on("error", idleListener);
        client._poolUseCount = (client._poolUseCount || 0) + 1;
        this.emit("release", err, client);
        if (err || this.ending || !client._queryable || client._ending || client._poolUseCount >= this.options.maxUses) {
          if (client._poolUseCount >= this.options.maxUses) {
            this.log("remove expended client");
          }
          return this._remove(client, this._pulseQueue.bind(this));
        }
        const isExpired = this._expired.has(client);
        if (isExpired) {
          this.log("remove expired client");
          this._expired.delete(client);
          return this._remove(client, this._pulseQueue.bind(this));
        }
        let tid;
        if (this.options.idleTimeoutMillis && this._isAboveMin()) {
          tid = setTimeout(() => {
            if (this._isAboveMin()) {
              this.log("remove idle client");
              this._remove(client, this._pulseQueue.bind(this));
            }
          }, this.options.idleTimeoutMillis);
          if (this.options.allowExitOnIdle) {
            tid.unref();
          }
        }
        if (this.options.allowExitOnIdle) {
          client.unref();
        }
        this._idle.push(new IdleItem(client, idleListener, tid));
        this._pulseQueue();
      }
      query(text, values, cb) {
        if (typeof text === "function") {
          const response2 = promisify(this.Promise, text);
          setImmediate(function() {
            return response2.callback(new Error("Passing a function as the first parameter to pool.query is not supported"));
          });
          return response2.result;
        }
        if (typeof values === "function") {
          cb = values;
          values = void 0;
        }
        const response = promisify(this.Promise, cb);
        cb = response.callback;
        this.connect((err, client) => {
          if (err) {
            return cb(err);
          }
          let clientReleased = false;
          const onError = /* @__PURE__ */ __name((err2) => {
            if (clientReleased) {
              return;
            }
            clientReleased = true;
            client.release(err2);
            cb(err2);
          }, "onError");
          client.once("error", onError);
          this.log("dispatching query");
          try {
            client.query(text, values, (err2, res) => {
              this.log("query dispatched");
              client.removeListener("error", onError);
              if (clientReleased) {
                return;
              }
              clientReleased = true;
              client.release(err2);
              if (err2) {
                return cb(err2);
              }
              return cb(void 0, res);
            });
          } catch (err2) {
            client.release(err2);
            return cb(err2);
          }
        });
        return response.result;
      }
      end(cb) {
        this.log("ending");
        if (this.ending) {
          const err = new Error("Called end on pool more than once");
          return cb ? cb(err) : this.Promise.reject(err);
        }
        this.ending = true;
        const promised = promisify(this.Promise, cb);
        this._endCallback = promised.callback;
        this._pulseQueue();
        return promised.result;
      }
      get waitingCount() {
        return this._pendingQueue.length;
      }
      get idleCount() {
        return this._idle.length;
      }
      get expiredCount() {
        return this._clients.reduce((acc, client) => acc + (this._expired.has(client) ? 1 : 0), 0);
      }
      get totalCount() {
        return this._clients.length;
      }
    };
    module.exports = Pool2;
  }
});

// node_modules/pg/lib/native/query.js
var require_query2 = __commonJS({
  "node_modules/pg/lib/native/query.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var EventEmitter2 = require_events().EventEmitter;
    var util = require_util();
    var utils = require_utils();
    var NativeQuery = module.exports = function(config4, values, callback) {
      EventEmitter2.call(this);
      config4 = utils.normalizeQueryConfig(config4, values, callback);
      this.text = config4.text;
      this.values = config4.values;
      this.name = config4.name;
      this.queryMode = config4.queryMode;
      this.callback = config4.callback;
      this.state = "new";
      this._arrayMode = config4.rowMode === "array";
      this._emitRowEvents = false;
      this.on(
        "newListener",
        function(event) {
          if (event === "row") this._emitRowEvents = true;
        }.bind(this)
      );
    };
    util.inherits(NativeQuery, EventEmitter2);
    var errorFieldMap = {
      sqlState: "code",
      statementPosition: "position",
      messagePrimary: "message",
      context: "where",
      schemaName: "schema",
      tableName: "table",
      columnName: "column",
      dataTypeName: "dataType",
      constraintName: "constraint",
      sourceFile: "file",
      sourceLine: "line",
      sourceFunction: "routine"
    };
    NativeQuery.prototype.handleError = function(err) {
      const fields = this.native.pq.resultErrorFields();
      if (fields) {
        for (const key in fields) {
          const normalizedFieldName = errorFieldMap[key] || key;
          err[normalizedFieldName] = fields[key];
        }
      }
      if (this.callback) {
        this.callback(err);
      } else {
        this.emit("error", err);
      }
      this.state = "error";
    };
    NativeQuery.prototype.then = function(onSuccess, onFailure) {
      return this._getPromise().then(onSuccess, onFailure);
    };
    NativeQuery.prototype.catch = function(callback) {
      return this._getPromise().catch(callback);
    };
    NativeQuery.prototype._getPromise = function() {
      if (this._promise) return this._promise;
      this._promise = new Promise(
        function(resolve, reject) {
          this._once("end", resolve);
          this._once("error", reject);
        }.bind(this)
      );
      return this._promise;
    };
    NativeQuery.prototype.submit = function(client) {
      this.state = "running";
      const self2 = this;
      this.native = client.native;
      client.native.arrayMode = this._arrayMode;
      let after = /* @__PURE__ */ __name(function(err, rows, results) {
        client.native.arrayMode = false;
        setImmediate(function() {
          self2.emit("_done");
        });
        if (err) {
          return self2.handleError(err);
        }
        if (self2._emitRowEvents) {
          if (results.length > 1) {
            rows.forEach((rowOfRows, i) => {
              rowOfRows.forEach((row) => {
                self2.emit("row", row, results[i]);
              });
            });
          } else {
            rows.forEach(function(row) {
              self2.emit("row", row, results);
            });
          }
        }
        self2.state = "end";
        self2.emit("end", results);
        if (self2.callback) {
          self2.callback(null, results);
        }
      }, "after");
      if (process.domain) {
        after = process.domain.bind(after);
      }
      if (this.name) {
        if (this.name.length > 63) {
          console.error("Warning! Postgres only supports 63 characters for query names.");
          console.error("You supplied %s (%s)", this.name, this.name.length);
          console.error("This can cause conflicts and silent errors executing queries");
        }
        const values = (this.values || []).map(utils.prepareValue);
        if (client.namedQueries[this.name]) {
          if (this.text && client.namedQueries[this.name] !== this.text) {
            const err = new Error(`Prepared statements must be unique - '${this.name}' was used for a different statement`);
            return after(err);
          }
          return client.native.execute(this.name, values, after);
        }
        return client.native.prepare(this.name, this.text, values.length, function(err) {
          if (err) return after(err);
          client.namedQueries[self2.name] = self2.text;
          return self2.native.execute(self2.name, values, after);
        });
      } else if (this.values) {
        if (!Array.isArray(this.values)) {
          const err = new Error("Query values must be an array");
          return after(err);
        }
        const vals = this.values.map(utils.prepareValue);
        client.native.query(this.text, vals, after);
      } else if (this.queryMode === "extended") {
        client.native.query(this.text, [], after);
      } else {
        client.native.query(this.text, after);
      }
    };
  }
});

// node_modules/pg/lib/native/client.js
var require_client2 = __commonJS({
  "node_modules/pg/lib/native/client.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var nodeUtils = require_util();
    var Native;
    try {
      Native = __require("pg-native");
    } catch (e) {
      throw e;
    }
    var TypeOverrides2 = require_type_overrides();
    var EventEmitter2 = require_events().EventEmitter;
    var util = require_util();
    var ConnectionParameters = require_connection_parameters();
    var NativeQuery = require_query2();
    var queryQueueLengthDeprecationNotice = nodeUtils.deprecate(
      () => {
      },
      "Calling client.query() when the client is already executing a query is deprecated and will be removed in pg@9.0. Use async/await or an external async flow control mechanism instead."
    );
    var Client2 = module.exports = function(config4) {
      EventEmitter2.call(this);
      config4 = config4 || {};
      this._Promise = config4.Promise || global.Promise;
      this._types = new TypeOverrides2(config4.types);
      this.native = new Native({
        types: this._types
      });
      this._queryQueue = [];
      this._ending = false;
      this._connecting = false;
      this._connected = false;
      this._queryable = true;
      const cp3 = this.connectionParameters = new ConnectionParameters(config4);
      if (config4.nativeConnectionString) cp3.nativeConnectionString = config4.nativeConnectionString;
      this.user = cp3.user;
      Object.defineProperty(this, "password", {
        configurable: true,
        enumerable: false,
        writable: true,
        value: cp3.password
      });
      this.database = cp3.database;
      this.host = cp3.host;
      this.port = cp3.port;
      this.namedQueries = {};
    };
    Client2.Query = NativeQuery;
    util.inherits(Client2, EventEmitter2);
    Client2.prototype._errorAllQueries = function(err) {
      const enqueueError = /* @__PURE__ */ __name((query2) => {
        process.nextTick(() => {
          query2.native = this.native;
          query2.handleError(err);
        });
      }, "enqueueError");
      if (this._hasActiveQuery()) {
        enqueueError(this._activeQuery);
        this._activeQuery = null;
      }
      this._queryQueue.forEach(enqueueError);
      this._queryQueue.length = 0;
    };
    Client2.prototype._connect = function(cb) {
      const self2 = this;
      if (this._connecting) {
        process.nextTick(() => cb(new Error("Client has already been connected. You cannot reuse a client.")));
        return;
      }
      this._connecting = true;
      this.connectionParameters.getLibpqConnectionString(function(err, conString) {
        if (self2.connectionParameters.nativeConnectionString) conString = self2.connectionParameters.nativeConnectionString;
        if (err) return cb(err);
        self2.native.connect(conString, function(err2) {
          if (err2) {
            self2.native.end();
            return cb(err2);
          }
          self2._connected = true;
          self2.native.on("error", function(err3) {
            self2._queryable = false;
            self2._errorAllQueries(err3);
            self2.emit("error", err3);
          });
          self2.native.on("notification", function(msg) {
            self2.emit("notification", {
              channel: msg.relname,
              payload: msg.extra
            });
          });
          self2.emit("connect");
          self2._pulseQueryQueue(true);
          cb(null, this);
        });
      });
    };
    Client2.prototype.connect = function(callback) {
      if (callback) {
        this._connect(callback);
        return;
      }
      return new this._Promise((resolve, reject) => {
        this._connect((error3) => {
          if (error3) {
            reject(error3);
          } else {
            resolve(this);
          }
        });
      });
    };
    Client2.prototype.query = function(config4, values, callback) {
      let query2;
      let result;
      let readTimeout;
      let readTimeoutTimer;
      let queryCallback;
      if (config4 === null || config4 === void 0) {
        throw new TypeError("Client was passed a null or undefined query");
      } else if (typeof config4.submit === "function") {
        readTimeout = config4.query_timeout || this.connectionParameters.query_timeout;
        result = query2 = config4;
        if (typeof values === "function") {
          config4.callback = values;
        }
      } else {
        readTimeout = config4.query_timeout || this.connectionParameters.query_timeout;
        query2 = new NativeQuery(config4, values, callback);
        if (!query2.callback) {
          let resolveOut, rejectOut;
          result = new this._Promise((resolve, reject) => {
            resolveOut = resolve;
            rejectOut = reject;
          }).catch((err) => {
            Error.captureStackTrace(err);
            throw err;
          });
          query2.callback = (err, res) => err ? rejectOut(err) : resolveOut(res);
        }
      }
      if (readTimeout) {
        queryCallback = query2.callback || (() => {
        });
        readTimeoutTimer = setTimeout(() => {
          const error3 = new Error("Query read timeout");
          process.nextTick(() => {
            query2.handleError(error3, this.connection);
          });
          queryCallback(error3);
          query2.callback = () => {
          };
          const index = this._queryQueue.indexOf(query2);
          if (index > -1) {
            this._queryQueue.splice(index, 1);
          }
          this._pulseQueryQueue();
        }, readTimeout);
        query2.callback = (err, res) => {
          clearTimeout(readTimeoutTimer);
          queryCallback(err, res);
        };
      }
      if (!this._queryable) {
        query2.native = this.native;
        process.nextTick(() => {
          query2.handleError(new Error("Client has encountered a connection error and is not queryable"));
        });
        return result;
      }
      if (this._ending) {
        query2.native = this.native;
        process.nextTick(() => {
          query2.handleError(new Error("Client was closed and is not queryable"));
        });
        return result;
      }
      if (this._queryQueue.length > 0) {
        queryQueueLengthDeprecationNotice();
      }
      this._queryQueue.push(query2);
      this._pulseQueryQueue();
      return result;
    };
    Client2.prototype.end = function(cb) {
      const self2 = this;
      this._ending = true;
      if (this._connecting && !this._connected) {
        this.once("connect", () => {
          this.end(() => {
          });
        });
      }
      let result;
      if (!cb) {
        result = new this._Promise(function(resolve, reject) {
          cb = /* @__PURE__ */ __name((err) => err ? reject(err) : resolve(), "cb");
        });
      }
      this.native.end(function() {
        self2._connected = false;
        self2._errorAllQueries(new Error("Connection terminated"));
        process.nextTick(() => {
          self2.emit("end");
          if (cb) cb();
        });
      });
      return result;
    };
    Client2.prototype._hasActiveQuery = function() {
      return this._activeQuery && this._activeQuery.state !== "error" && this._activeQuery.state !== "end";
    };
    Client2.prototype._pulseQueryQueue = function(initialConnection) {
      if (!this._connected) {
        return;
      }
      if (this._hasActiveQuery()) {
        return;
      }
      const query2 = this._queryQueue.shift();
      if (!query2) {
        if (!initialConnection) {
          this.emit("drain");
        }
        return;
      }
      this._activeQuery = query2;
      query2.submit(this);
      const self2 = this;
      query2.once("_done", function() {
        self2._pulseQueryQueue();
      });
    };
    Client2.prototype.cancel = function(query2) {
      if (this._activeQuery === query2) {
        this.native.cancel(function() {
        });
      } else if (this._queryQueue.indexOf(query2) !== -1) {
        this._queryQueue.splice(this._queryQueue.indexOf(query2), 1);
      }
    };
    Client2.prototype.ref = function() {
    };
    Client2.prototype.unref = function() {
    };
    Client2.prototype.setTypeParser = function(oid, format, parseFn) {
      return this._types.setTypeParser(oid, format, parseFn);
    };
    Client2.prototype.getTypeParser = function(oid, format) {
      return this._types.getTypeParser(oid, format);
    };
    Client2.prototype.isConnected = function() {
      return this._connected;
    };
    Client2.prototype.getTransactionStatus = function() {
      return this.native.getTransactionStatus();
    };
  }
});

// node_modules/pg/lib/native/index.js
var require_native = __commonJS({
  "node_modules/pg/lib/native/index.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = require_client2();
  }
});

// node_modules/pg/lib/index.js
var require_lib2 = __commonJS({
  "node_modules/pg/lib/index.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var Client2 = require_client();
    var defaults2 = require_defaults();
    var Connection2 = require_connection();
    var Result2 = require_result();
    var utils = require_utils();
    var Pool2 = require_pg_pool();
    var TypeOverrides2 = require_type_overrides();
    var { DatabaseError: DatabaseError2 } = require_dist();
    var { escapeIdentifier: escapeIdentifier2, escapeLiteral: escapeLiteral2 } = require_utils();
    var poolFactory = /* @__PURE__ */ __name((Client3) => {
      return class BoundPool extends Pool2 {
        static {
          __name(this, "BoundPool");
        }
        constructor(options) {
          super(options, Client3);
        }
      };
    }, "poolFactory");
    var PG = /* @__PURE__ */ __name(function(clientConstructor2) {
      this.defaults = defaults2;
      this.Client = clientConstructor2;
      this.Query = this.Client.Query;
      this.Pool = poolFactory(this.Client);
      this._pools = [];
      this.Connection = Connection2;
      this.types = require_pg_types();
      this.DatabaseError = DatabaseError2;
      this.TypeOverrides = TypeOverrides2;
      this.escapeIdentifier = escapeIdentifier2;
      this.escapeLiteral = escapeLiteral2;
      this.Result = Result2;
      this.utils = utils;
    }, "PG");
    var clientConstructor = Client2;
    var forceNative = false;
    try {
      forceNative = !!process.env.NODE_PG_FORCE_NATIVE;
    } catch {
    }
    if (forceNative) {
      clientConstructor = require_native();
    }
    module.exports = new PG(clientConstructor);
    Object.defineProperty(module.exports, "native", {
      configurable: true,
      enumerable: false,
      get() {
        let native = null;
        try {
          native = new PG(require_native());
        } catch (err) {
          if (err.code !== "MODULE_NOT_FOUND") {
            throw err;
          }
        }
        Object.defineProperty(module.exports, "native", {
          value: native
        });
        return native;
      }
    });
  }
});

// node_modules/pg/esm/index.mjs
var import_lib, Client, Pool, Connection, types, Query, DatabaseError, escapeIdentifier, escapeLiteral, Result, TypeOverrides, defaults;
var init_esm = __esm({
  "node_modules/pg/esm/index.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    import_lib = __toESM(require_lib2(), 1);
    Client = import_lib.default.Client;
    Pool = import_lib.default.Pool;
    Connection = import_lib.default.Connection;
    types = import_lib.default.types;
    Query = import_lib.default.Query;
    DatabaseError = import_lib.default.DatabaseError;
    escapeIdentifier = import_lib.default.escapeIdentifier;
    escapeLiteral = import_lib.default.escapeLiteral;
    Result = import_lib.default.Result;
    TypeOverrides = import_lib.default.TypeOverrides;
    defaults = import_lib.default.defaults;
  }
});

// src/db.ts
async function query(text, params = []) {
  const res = await pool.query(text, params);
  return res.rows;
}
async function one(text, params = []) {
  const rows = await query(text, params);
  return rows[0];
}
var pool;
var init_db = __esm({
  "src/db.ts"() {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_esm();
    init_config2();
    pool = new Pool({ connectionString: config2.databaseUrl });
    __name(query, "query");
    __name(one, "one");
  }
});

// src/crypto.ts
async function getKey() {
  if (_key) return _key;
  _key = await crypto.subtle.importKey(
    "raw",
    config2.tokenEncKey,
    "AES-GCM",
    false,
    ["encrypt", "decrypt"]
  );
  return _key;
}
async function encryptToken(plaintext) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await getKey();
  const ct = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    new TextEncoder().encode(plaintext)
  );
  return Buffer.concat([Buffer.from(iv), Buffer.from(ct)]);
}
async function decryptToken(blob) {
  const iv = new Uint8Array(blob.subarray(0, 12));
  const ct = new Uint8Array(blob.subarray(12));
  const key = await getKey();
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    ct
  );
  return new TextDecoder().decode(decrypted);
}
async function hashIp(ip) {
  const data = new TextEncoder().encode(config2.ipHashSalt + ip);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Buffer.from(hash);
}
function newWebhookSecret() {
  return Buffer.from(crypto.getRandomValues(new Uint8Array(24))).toString("hex");
}
function newLinkSlug() {
  return Buffer.from(crypto.getRandomValues(new Uint8Array(4))).toString("base64url");
}
var _key;
var init_crypto = __esm({
  "src/crypto.ts"() {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_config2();
    _key = null;
    __name(getKey, "getKey");
    __name(encryptToken, "encryptToken");
    __name(decryptToken, "decryptToken");
    __name(hashIp, "hashIp");
    __name(newWebhookSecret, "newWebhookSecret");
    __name(newLinkSlug, "newLinkSlug");
  }
});

// node_modules/grammy/out/web.mjs
function matchFilter(filter) {
  const queries = Array.isArray(filter) ? filter : [
    filter
  ];
  const key = queries.join(",");
  const predicate = filterQueryCache.get(key) ?? (() => {
    const parsed = parse(queries);
    const pred = compile(parsed);
    filterQueryCache.set(key, pred);
    return pred;
  })();
  return (ctx) => predicate(ctx);
}
function parse(filter) {
  return Array.isArray(filter) ? filter.map((q) => q.split(":")) : [
    filter.split(":")
  ];
}
function compile(parsed) {
  const preprocessed = parsed.flatMap((q) => check(q, preprocess(q)));
  const ltree = treeify(preprocessed);
  const predicate = arborist(ltree);
  return (ctx) => !!predicate(ctx.update, ctx);
}
function preprocess(filter) {
  const valid = UPDATE_KEYS;
  const expanded = [
    filter
  ].flatMap((q) => {
    const [l1, l2, l3] = q;
    if (!(l1 in L1_SHORTCUTS)) return [
      q
    ];
    if (!l1 && !l2 && !l3) return [
      q
    ];
    const targets = L1_SHORTCUTS[l1];
    const expanded2 = targets.map((s2) => [
      s2,
      l2,
      l3
    ]);
    if (l2 === void 0) return expanded2;
    if (l2 in L2_SHORTCUTS && (l2 || l3)) return expanded2;
    return expanded2.filter(([s2]) => !!valid[s2]?.[l2]);
  }).flatMap((q) => {
    const [l1, l2, l3] = q;
    if (!(l2 in L2_SHORTCUTS)) return [
      q
    ];
    if (!l2 && !l3) return [
      q
    ];
    const targets = L2_SHORTCUTS[l2];
    const expanded2 = targets.map((s2) => [
      l1,
      s2,
      l3
    ]);
    if (l3 === void 0) return expanded2;
    return expanded2.filter(([, s2]) => !!valid[l1]?.[s2]?.[l3]);
  });
  if (expanded.length === 0) {
    throw new Error(`Shortcuts in '${filter.join(":")}' do not expand to any valid filter query`);
  }
  return expanded;
}
function check(original, preprocessed) {
  if (preprocessed.length === 0) throw new Error("Empty filter query given");
  const errors = preprocessed.map(checkOne).filter((r) => r !== true);
  if (errors.length === 0) return preprocessed;
  else if (errors.length === 1) throw new Error(errors[0]);
  else {
    throw new Error(`Invalid filter query '${original.join(":")}'. There are ${errors.length} errors after expanding the contained shortcuts: ${errors.join("; ")}`);
  }
}
function checkOne(filter) {
  const [l1, l2, l3, ...n] = filter;
  if (l1 === void 0) return "Empty filter query given";
  if (!(l1 in UPDATE_KEYS)) {
    const permitted = Object.keys(UPDATE_KEYS);
    return `Invalid L1 filter '${l1}' given in '${filter.join(":")}'. Permitted values are: ${permitted.map((k) => `'${k}'`).join(", ")}.`;
  }
  if (l2 === void 0) return true;
  const l1Obj = UPDATE_KEYS[l1];
  if (!(l2 in l1Obj)) {
    const permitted = Object.keys(l1Obj);
    return `Invalid L2 filter '${l2}' given in '${filter.join(":")}'. Permitted values are: ${permitted.map((k) => `'${k}'`).join(", ")}.`;
  }
  if (l3 === void 0) return true;
  const l2Obj = l1Obj[l2];
  if (!(l3 in l2Obj)) {
    const permitted = Object.keys(l2Obj);
    return `Invalid L3 filter '${l3}' given in '${filter.join(":")}'. ${permitted.length === 0 ? `No further filtering is possible after '${l1}:${l2}'.` : `Permitted values are: ${permitted.map((k) => `'${k}'`).join(", ")}.`}`;
  }
  if (n.length === 0) return true;
  return `Cannot filter further than three levels, ':${n.join(":")}' is invalid!`;
}
function treeify(paths) {
  const tree = {};
  for (const [l1, l2, l3] of paths) {
    const subtree = tree[l1] ??= {};
    if (l2 !== void 0) {
      const set = subtree[l2] ??= /* @__PURE__ */ new Set();
      if (l3 !== void 0) set.add(l3);
    }
  }
  return tree;
}
function or(left, right) {
  return (obj, ctx) => left(obj, ctx) || right(obj, ctx);
}
function concat(get, test) {
  return (obj, ctx) => {
    const nextObj = get(obj, ctx);
    return nextObj && test(nextObj, ctx);
  };
}
function leaf(pred) {
  return (obj, ctx) => pred(obj, ctx) != null;
}
function arborist(tree) {
  const l1Predicates = Object.entries(tree).map(([l1, subtree]) => {
    const l1Pred = /* @__PURE__ */ __name((obj) => obj[l1], "l1Pred");
    const l2Predicates = Object.entries(subtree).map(([l2, set]) => {
      const l2Pred = /* @__PURE__ */ __name((obj) => obj[l2], "l2Pred");
      const l3Predicates = Array.from(set).map((l3) => {
        const l3Pred = l3 === "me" ? (obj, ctx) => {
          const me = ctx.me.id;
          return testMaybeArray(obj, (u) => u.id === me);
        } : (obj) => testMaybeArray(obj, (e) => e[l3] || e.type === l3);
        return l3Pred;
      });
      return l3Predicates.length === 0 ? leaf(l2Pred) : concat(l2Pred, l3Predicates.reduce(or));
    });
    return l2Predicates.length === 0 ? leaf(l1Pred) : concat(l1Pred, l2Predicates.reduce(or));
  });
  if (l1Predicates.length === 0) {
    throw new Error("Cannot create filter function for empty query");
  }
  return l1Predicates.reduce(or);
}
function testMaybeArray(t, pred) {
  const p = /* @__PURE__ */ __name((x) => x != null && pred(x), "p");
  return Array.isArray(t) ? t.some(p) : p(t);
}
function orThrow(value, method) {
  if (value === void 0) {
    throw new Error(`Missing information for API call to ${method}`);
  }
  return value;
}
function triggerFn(trigger) {
  return toArray(trigger).map((t) => typeof t === "string" ? (txt) => txt === t ? t : null : (txt) => txt.match(t));
}
function match2(ctx, content, triggers) {
  for (const t of triggers) {
    const res = t(content);
    if (res) {
      ctx.match = res;
      return true;
    }
  }
  return false;
}
function toArray(e) {
  return Array.isArray(e) ? e : [
    e
  ];
}
function generateBotErrorMessage(error3) {
  let msg;
  if (error3 instanceof Error) {
    msg = `${error3.name} in middleware: ${error3.message}`;
  } else {
    const type2 = typeof error3;
    msg = `Non-error value of type ${type2} thrown in middleware`;
    switch (type2) {
      case "bigint":
      case "boolean":
      case "number":
      case "symbol":
        msg += `: ${error3}`;
        break;
      case "string":
        msg += `: ${String(error3).substring(0, 50)}`;
        break;
      default:
        msg += "!";
        break;
    }
  }
  return msg;
}
function flatten(mw) {
  return typeof mw === "function" ? mw : (ctx, next) => mw.middleware()(ctx, next);
}
function concat1(first, andThen) {
  return async (ctx, next) => {
    let nextCalled = false;
    await first(ctx, async () => {
      if (nextCalled) throw new Error("`next` already called before!");
      else nextCalled = true;
      await andThen(ctx, next);
    });
  };
}
function pass(_ctx, next) {
  return next();
}
async function run(middleware, ctx) {
  await middleware(ctx, leaf1);
}
function parse1(str2) {
  str2 = String(str2);
  if (str2.length > 100) {
    return;
  }
  var match3 = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str2);
  if (!match3) {
    return;
  }
  var n = parseFloat(match3[1]);
  var type2 = (match3[2] || "ms").toLowerCase();
  switch (type2) {
    case "years":
    case "year":
    case "yrs":
    case "yr":
    case "y":
      return n * y;
    case "weeks":
    case "week":
    case "w":
      return n * w;
    case "days":
    case "day":
    case "d":
      return n * d;
    case "hours":
    case "hour":
    case "hrs":
    case "hr":
    case "h":
      return n * h;
    case "minutes":
    case "minute":
    case "mins":
    case "min":
    case "m":
      return n * m;
    case "seconds":
    case "second":
    case "secs":
    case "sec":
    case "s":
      return n * s;
    case "milliseconds":
    case "millisecond":
    case "msecs":
    case "msec":
    case "ms":
      return n;
    default:
      return void 0;
  }
}
function fmtShort(ms2) {
  var msAbs = Math.abs(ms2);
  if (msAbs >= d) {
    return Math.round(ms2 / d) + "d";
  }
  if (msAbs >= h) {
    return Math.round(ms2 / h) + "h";
  }
  if (msAbs >= m) {
    return Math.round(ms2 / m) + "m";
  }
  if (msAbs >= s) {
    return Math.round(ms2 / s) + "s";
  }
  return ms2 + "ms";
}
function fmtLong(ms2) {
  var msAbs = Math.abs(ms2);
  if (msAbs >= d) {
    return plural(ms2, msAbs, d, "day");
  }
  if (msAbs >= h) {
    return plural(ms2, msAbs, h, "hour");
  }
  if (msAbs >= m) {
    return plural(ms2, msAbs, m, "minute");
  }
  if (msAbs >= s) {
    return plural(ms2, msAbs, s, "second");
  }
  return ms2 + " ms";
}
function plural(ms2, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms2 / n) + " " + name + (isPlural ? "s" : "");
}
function defaultSetTimout() {
  throw new Error("setTimeout has not been defined");
}
function defaultClearTimeout() {
  throw new Error("clearTimeout has not been defined");
}
function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    return setTimeout(fun, 0);
  }
  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }
  try {
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e2) {
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}
function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    return clearTimeout(marker);
  }
  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }
  try {
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      return cachedClearTimeout.call(null, marker);
    } catch (e2) {
      return cachedClearTimeout.call(this, marker);
    }
  }
}
function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }
  draining = false;
  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }
  if (queue.length) {
    drainQueue();
  }
}
function drainQueue() {
  if (draining) {
    return;
  }
  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;
  while (len) {
    currentQueue = queue;
    queue = [];
    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }
    queueIndex = -1;
    len = queue.length;
  }
  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}
function nextTick2(fun) {
  var args = new Array(arguments.length - 1);
  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }
  queue.push(new Item(fun, args));
  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}
function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}
function noop() {
}
function binding2(name) {
  throw new Error("process.binding is not supported");
}
function cwd2() {
  return "/";
}
function chdir2(dir3) {
  throw new Error("process.chdir is not supported");
}
function umask2() {
  return 0;
}
function hrtime4(previousTimestamp) {
  var clocktime = performanceNow.call(performance2) * 1e-3;
  var seconds = Math.floor(clocktime);
  var nanoseconds = Math.floor(clocktime % 1 * 1e9);
  if (previousTimestamp) {
    seconds = seconds - previousTimestamp[0];
    nanoseconds = nanoseconds - previousTimestamp[1];
    if (nanoseconds < 0) {
      seconds--;
      nanoseconds += 1e9;
    }
  }
  return [
    seconds,
    nanoseconds
  ];
}
function uptime3() {
  var currentTime = /* @__PURE__ */ new Date();
  var dif = currentTime - startTime;
  return dif / 1e3;
}
function createCommonjsModule(fn, basedir, module) {
  return module = {
    path: basedir,
    exports: {},
    require: /* @__PURE__ */ __name(function(path, base) {
      return commonjsRequire(path, base === void 0 || base === null ? module.path : base);
    }, "require")
  }, fn(module, module.exports), module.exports;
}
function commonjsRequire() {
  throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
}
function setup(env2) {
  createDebug.debug = createDebug;
  createDebug.default = createDebug;
  createDebug.coerce = coerce;
  createDebug.disable = disable;
  createDebug.enable = enable;
  createDebug.enabled = enabled;
  createDebug.humanize = ms;
  createDebug.destroy = destroy2;
  Object.keys(env2).forEach((key) => {
    createDebug[key] = env2[key];
  });
  createDebug.names = [];
  createDebug.skips = [];
  createDebug.formatters = {};
  function selectColor(namespace) {
    let hash = 0;
    for (let i = 0; i < namespace.length; i++) {
      hash = (hash << 5) - hash + namespace.charCodeAt(i);
      hash |= 0;
    }
    return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
  }
  __name(selectColor, "selectColor");
  createDebug.selectColor = selectColor;
  function createDebug(namespace) {
    let prevTime;
    let enableOverride = null;
    let namespacesCache;
    let enabledCache;
    function debug4(...args) {
      if (!debug4.enabled) {
        return;
      }
      const self2 = debug4;
      const curr = Number(/* @__PURE__ */ new Date());
      const ms2 = curr - (prevTime || curr);
      self2.diff = ms2;
      self2.prev = prevTime;
      self2.curr = curr;
      prevTime = curr;
      args[0] = createDebug.coerce(args[0]);
      if (typeof args[0] !== "string") {
        args.unshift("%O");
      }
      let index = 0;
      args[0] = args[0].replace(/%([a-zA-Z%])/g, (match3, format) => {
        if (match3 === "%%") {
          return "%";
        }
        index++;
        const formatter = createDebug.formatters[format];
        if (typeof formatter === "function") {
          const val = args[index];
          match3 = formatter.call(self2, val);
          args.splice(index, 1);
          index--;
        }
        return match3;
      });
      createDebug.formatArgs.call(self2, args);
      const logFn = self2.log || createDebug.log;
      logFn.apply(self2, args);
    }
    __name(debug4, "debug");
    debug4.namespace = namespace;
    debug4.useColors = createDebug.useColors();
    debug4.color = createDebug.selectColor(namespace);
    debug4.extend = extend;
    debug4.destroy = createDebug.destroy;
    Object.defineProperty(debug4, "enabled", {
      enumerable: true,
      configurable: false,
      get: /* @__PURE__ */ __name(() => {
        if (enableOverride !== null) {
          return enableOverride;
        }
        if (namespacesCache !== createDebug.namespaces) {
          namespacesCache = createDebug.namespaces;
          enabledCache = createDebug.enabled(namespace);
        }
        return enabledCache;
      }, "get"),
      set: /* @__PURE__ */ __name((v) => {
        enableOverride = v;
      }, "set")
    });
    if (typeof createDebug.init === "function") {
      createDebug.init(debug4);
    }
    return debug4;
  }
  __name(createDebug, "createDebug");
  function extend(namespace, delimiter) {
    const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
    newDebug.log = this.log;
    return newDebug;
  }
  __name(extend, "extend");
  function enable(namespaces) {
    createDebug.save(namespaces);
    createDebug.namespaces = namespaces;
    createDebug.names = [];
    createDebug.skips = [];
    const split = (typeof namespaces === "string" ? namespaces : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
    for (const ns of split) {
      if (ns[0] === "-") {
        createDebug.skips.push(ns.slice(1));
      } else {
        createDebug.names.push(ns);
      }
    }
  }
  __name(enable, "enable");
  function matchesTemplate(search, template) {
    let searchIndex = 0;
    let templateIndex = 0;
    let starIndex = -1;
    let matchIndex = 0;
    while (searchIndex < search.length) {
      if (templateIndex < template.length && (template[templateIndex] === search[searchIndex] || template[templateIndex] === "*")) {
        if (template[templateIndex] === "*") {
          starIndex = templateIndex;
          matchIndex = searchIndex;
          templateIndex++;
        } else {
          searchIndex++;
          templateIndex++;
        }
      } else if (starIndex !== -1) {
        templateIndex = starIndex + 1;
        matchIndex++;
        searchIndex = matchIndex;
      } else {
        return false;
      }
    }
    while (templateIndex < template.length && template[templateIndex] === "*") {
      templateIndex++;
    }
    return templateIndex === template.length;
  }
  __name(matchesTemplate, "matchesTemplate");
  function disable() {
    const namespaces = [
      ...createDebug.names,
      ...createDebug.skips.map((namespace) => "-" + namespace)
    ].join(",");
    createDebug.enable("");
    return namespaces;
  }
  __name(disable, "disable");
  function enabled(name) {
    for (const skip of createDebug.skips) {
      if (matchesTemplate(name, skip)) {
        return false;
      }
    }
    for (const ns of createDebug.names) {
      if (matchesTemplate(name, ns)) {
        return true;
      }
    }
    return false;
  }
  __name(enabled, "enabled");
  function coerce(val) {
    if (val instanceof Error) {
      return val.stack || val.message;
    }
    return val;
  }
  __name(coerce, "coerce");
  function destroy2() {
    console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
  }
  __name(destroy2, "destroy2");
  createDebug.enable(createDebug.load());
  return createDebug;
}
function toGrammyError(err, method, payload) {
  switch (err.error_code) {
    case 401:
      debug3("Error 401 means that your bot token is wrong, talk to https://t.me/BotFather to check it.");
      break;
    case 409:
      debug3("Error 409 means that you are running your bot several times on long polling. Consider revoking the bot token if you believe that no other instance is running.");
      break;
  }
  return new GrammyError(`Call to '${method}' failed!`, err, method, payload);
}
function isTelegramError(err) {
  return typeof err === "object" && err !== null && "status" in err && "statusText" in err;
}
function toHttpError(method, sensitiveLogs, err) {
  let msg = `Network request for '${method}' failed!`;
  if (isTelegramError(err)) msg += ` (${err.status}: ${err.statusText})`;
  if (sensitiveLogs && err instanceof Error) msg += ` ${err.message}`;
  return new HttpError(msg, err);
}
function checkWindows() {
  const global2 = globalThis;
  const platform4 = global2.process?.platform;
  if (typeof platform4 === "string") return platform4.startsWith("win");
  const os = global2.Deno?.build?.os;
  if (typeof os === "string") return os === "windows";
  return global2.navigator?.platform?.startsWith("Win") ?? false;
}
function assertPath(path) {
  if (typeof path !== "string") {
    throw new TypeError(`Path must be a string, received "${JSON.stringify(path)}"`);
  }
}
function stripSuffix(name, suffix) {
  if (suffix.length >= name.length) {
    return name;
  }
  const lenDiff = name.length - suffix.length;
  for (let i = suffix.length - 1; i >= 0; --i) {
    if (name.charCodeAt(lenDiff + i) !== suffix.charCodeAt(i)) {
      return name;
    }
  }
  return name.slice(0, -suffix.length);
}
function lastPathSegment(path, isSep, start = 0) {
  let matchedNonSeparator = false;
  let end = path.length;
  for (let i = path.length - 1; i >= start; --i) {
    if (isSep(path.charCodeAt(i))) {
      if (matchedNonSeparator) {
        start = i + 1;
        break;
      }
    } else if (!matchedNonSeparator) {
      matchedNonSeparator = true;
      end = i + 1;
    }
  }
  return path.slice(start, end);
}
function assertArgs(path, suffix) {
  assertPath(path);
  if (path.length === 0) return path;
  if (typeof suffix !== "string") {
    throw new TypeError(`Suffix must be a string, received "${JSON.stringify(suffix)}"`);
  }
}
function assertArg(url) {
  url = url instanceof URL ? url : new URL(url);
  if (url.protocol !== "file:") {
    throw new TypeError(`URL must be a file URL: received "${url.protocol}"`);
  }
  return url;
}
function fromFileUrl(url) {
  url = assertArg(url);
  return decodeURIComponent(url.pathname.replace(/%(?![0-9A-Fa-f]{2})/g, "%25"));
}
function stripTrailingSeparators(segment, isSep) {
  if (segment.length <= 1) {
    return segment;
  }
  let end = segment.length;
  for (let i = segment.length - 1; i > 0; i--) {
    if (isSep(segment.charCodeAt(i))) {
      end = i;
    } else {
      break;
    }
  }
  return segment.slice(0, end);
}
function isPosixPathSeparator(code) {
  return code === 47;
}
function basename(path, suffix = "") {
  if (path instanceof URL) {
    path = fromFileUrl(path);
  }
  assertArgs(path, suffix);
  const lastSegment = lastPathSegment(path, isPosixPathSeparator);
  const strippedSegment = stripTrailingSeparators(lastSegment, isPosixPathSeparator);
  return suffix ? stripSuffix(strippedSegment, suffix) : strippedSegment;
}
function isPathSeparator(code) {
  return code === 47 || code === 92;
}
function isWindowsDeviceRoot(code) {
  return code >= 97 && code <= 122 || code >= 65 && code <= 90;
}
function fromFileUrl1(url) {
  url = assertArg(url);
  let path = decodeURIComponent(url.pathname.replace(/\//g, "\\").replace(/%(?![0-9A-Fa-f]{2})/g, "%25")).replace(/^\\*([A-Za-z]:)(\\|$)/, "$1\\");
  if (url.hostname !== "") {
    path = `\\\\${url.hostname}${path}`;
  }
  return path;
}
function basename1(path, suffix = "") {
  if (path instanceof URL) {
    path = fromFileUrl1(path);
  }
  assertArgs(path, suffix);
  let start = 0;
  if (path.length >= 2) {
    const drive = path.charCodeAt(0);
    if (isWindowsDeviceRoot(drive)) {
      if (path.charCodeAt(1) === 58) start = 2;
    }
  }
  const lastSegment = lastPathSegment(path, isPathSeparator, start);
  const strippedSegment = stripTrailingSeparators(lastSegment, isPathSeparator);
  return suffix ? stripSuffix(strippedSegment, suffix) : strippedSegment;
}
function basename2(path, suffix = "") {
  return isWindows ? basename1(path, suffix) : basename(path, suffix);
}
async function* fetchFile(url) {
  const { body } = await fetch(url);
  if (body === null) {
    throw new Error(`Download failed, no response body from '${url}'`);
  }
  yield* body;
}
function requiresFormDataUpload(payload) {
  return payload instanceof InputFile || typeof payload === "object" && payload !== null && Object.values(payload).some((v) => Array.isArray(v) ? v.some(requiresFormDataUpload) : v instanceof InputFile || requiresFormDataUpload(v));
}
function str(value) {
  return JSON.stringify(value, (_, v) => v ?? void 0);
}
function createJsonPayload(payload) {
  return {
    method: "POST",
    headers: {
      "content-type": "application/json",
      connection: "keep-alive"
    },
    body: str(payload)
  };
}
async function* protectItr(itr, onError) {
  try {
    yield* itr;
  } catch (err) {
    onError(err);
  }
}
function createFormDataPayload(payload, onError) {
  const boundary = createBoundary();
  const itr = payloadToMultipartItr(payload, boundary);
  const safeItr = protectItr(itr, onError);
  const stream = itrToStream(safeItr);
  return {
    method: "POST",
    headers: {
      "content-type": `multipart/form-data; boundary=${boundary}`,
      connection: "keep-alive"
    },
    body: stream
  };
}
function createBoundary() {
  return "----------" + randomId(32);
}
function randomId(length = 16) {
  return Array.from(Array(length)).map(() => Math.random().toString(36)[2] || 0).join("");
}
async function* payloadToMultipartItr(payload, boundary) {
  const files = collectFiles(payload);
  yield enc.encode(`--${boundary}\r
`);
  const separator = enc.encode(`\r
--${boundary}\r
`);
  let first = true;
  for (const [key, value] of Object.entries(payload)) {
    if (value == null) continue;
    if (!first) yield separator;
    yield valuePart(key, value instanceof InputFile ? value.toJSON() : typeof value === "object" ? str(value) : value);
    first = false;
  }
  for (const { id, origin, file } of files) {
    if (!first) yield separator;
    yield* filePart(id, origin, file);
    first = false;
  }
  yield enc.encode(`\r
--${boundary}--\r
`);
}
function collectFiles(value) {
  if (typeof value !== "object" || value === null) return [];
  return Object.entries(value).flatMap(([k, v]) => {
    if (Array.isArray(v)) return v.flatMap((p) => collectFiles(p));
    else if (v instanceof InputFile) {
      const id = randomId();
      Object.assign(v, {
        toJSON: /* @__PURE__ */ __name(() => `attach://${id}`, "toJSON")
      });
      const origin = k === "media" && "type" in value && typeof value.type === "string" ? value.type : k;
      return {
        id,
        origin,
        file: v
      };
    } else return collectFiles(v);
  });
}
function valuePart(key, value) {
  return enc.encode(`content-disposition:form-data;name="${key}"\r
\r
${value}`);
}
async function* filePart(id, origin, input) {
  const filename = input.filename || `${origin}.${getExt(origin)}`;
  if (filename.includes("\r") || filename.includes("\n")) {
    throw new Error(`File paths cannot contain carriage-return (\\r) or newline (\\n) characters! Filename for property '${origin}' was:
"""
${filename}
"""`);
  }
  yield enc.encode(`content-disposition:form-data;name="${id}";filename=${filename}\r
content-type:application/octet-stream\r
\r
`);
  const data = await input.toRaw();
  if (data instanceof Uint8Array) yield data;
  else yield* data;
}
function getExt(key) {
  switch (key) {
    case "certificate":
      return "pem";
    case "photo":
    case "thumbnail":
      return "jpg";
    case "voice":
      return "ogg";
    case "audio":
      return "mp3";
    case "animation":
    case "video":
    case "video_note":
      return "mp4";
    case "sticker":
      return "webp";
    default:
      return "dat";
  }
}
function concatTransformer(prev, trans) {
  return (method, payload, signal) => trans(prev, method, payload, signal);
}
function createRawApi(token, options, webhookReplyEnvelope) {
  const client = new ApiClient(token, options, webhookReplyEnvelope);
  const proxyHandler = {
    get(_, m2) {
      return m2 === "toJSON" ? "__internal" : m2 === "getMe" || m2 === "getWebhookInfo" || m2 === "getForumTopicIconStickers" || m2 === "getAvailableGifts" || m2 === "logOut" || m2 === "close" || m2 === "getMyStarBalance" || m2 === "removeMyProfilePhoto" ? client.callApi.bind(client, m2, {}) : client.callApi.bind(client, m2);
    },
    ...proxyMethods
  };
  const raw2 = new Proxy({}, proxyHandler);
  const installedTransformers = client.installedTransformers;
  const api = {
    raw: raw2,
    installedTransformers,
    use: /* @__PURE__ */ __name((...t) => {
      client.use(...t);
      return api;
    }, "use")
  };
  return api;
}
function createTimeout(controller, seconds, method) {
  let handle = void 0;
  const promise = new Promise((_, reject) => {
    handle = setTimeout(() => {
      const msg = `Request to '${method}' timed out after ${seconds} seconds`;
      reject(new Error(msg));
      controller.abort();
    }, 1e3 * seconds);
  });
  return {
    promise,
    handle
  };
}
function createStreamError(abortController) {
  let onError = /* @__PURE__ */ __name((err) => {
    throw err;
  }, "onError");
  const promise = new Promise((_, reject) => {
    onError = /* @__PURE__ */ __name((err) => {
      reject(err);
      abortController.abort();
    }, "onError");
  });
  return {
    promise,
    catch: onError
  };
}
function createAbortControllerFromSignal(signal) {
  const abortController = new AbortController();
  if (signal === void 0) return abortController;
  const sig = signal;
  function abort2() {
    abortController.abort();
    sig.removeEventListener("abort", abort2);
  }
  __name(abort2, "abort");
  if (sig.aborted) abort2();
  else sig.addEventListener("abort", abort2);
  return {
    abort: abort2,
    signal: abortController.signal
  };
}
function validateSignal(method, payload, signal) {
  if (typeof signal?.addEventListener === "function") {
    return;
  }
  let payload0 = JSON.stringify(payload);
  if (payload0.length > 20) {
    payload0 = payload0.substring(0, 16) + " ...";
  }
  let payload1 = JSON.stringify(signal);
  if (payload1.length > 20) {
    payload1 = payload1.substring(0, 16) + " ...";
  }
  throw new Error(`Incorrect abort signal instance found! You passed two payloads to '${method}' but you should merge the second one containing '${payload1}' into the first one containing '${payload0}'! If you are using context shortcuts, you may want to use a method on 'ctx.api' instead.

If you want to prevent such mistakes in the future, consider using TypeScript. https://www.typescriptlang.org/`);
}
async function withRetries(task, signal) {
  const INITIAL_DELAY = 50;
  let lastDelay = 50;
  async function handleError(error3) {
    let delay = false;
    let strategy = "rethrow";
    if (error3 instanceof HttpError) {
      delay = true;
      strategy = "retry";
    } else if (error3 instanceof GrammyError) {
      if (error3.error_code >= 500) {
        delay = true;
        strategy = "retry";
      } else if (error3.error_code === 429) {
        const retryAfter = error3.parameters.retry_after;
        if (typeof retryAfter === "number") {
          await sleep(retryAfter, signal);
          lastDelay = INITIAL_DELAY;
        } else {
          delay = true;
        }
        strategy = "retry";
      }
    }
    if (delay) {
      if (lastDelay !== 50) {
        await sleep(lastDelay, signal);
      }
      const TWENTY_MINUTES = 20 * 60 * 1e3;
      lastDelay = Math.min(TWENTY_MINUTES, 2 * lastDelay);
    }
    return strategy;
  }
  __name(handleError, "handleError");
  let result = {
    ok: false
  };
  while (!result.ok) {
    try {
      result = {
        ok: true,
        value: await task()
      };
    } catch (error3) {
      debugErr(error3);
      const strategy = await handleError(error3);
      switch (strategy) {
        case "retry":
          continue;
        case "rethrow":
          throw error3;
      }
    }
  }
  return result.value;
}
async function sleep(seconds, signal) {
  let handle;
  let reject;
  function abort2() {
    reject?.(new Error("Aborted delay"));
    if (handle !== void 0) clearTimeout(handle);
  }
  __name(abort2, "abort");
  try {
    await new Promise((res, rej) => {
      reject = rej;
      if (signal?.aborted) {
        abort2();
        return;
      }
      signal?.addEventListener("abort", abort2);
      handle = setTimeout(res, 1e3 * seconds);
    });
  } finally {
    signal?.removeEventListener("abort", abort2);
  }
}
function validateAllowedUpdates(updates, allowed = DEFAULT_UPDATE_TYPES) {
  const impossible = Array.from(updates).filter((u) => !allowed.includes(u));
  if (impossible.length > 0) {
    debugWarn(`You registered listeners for the following update types, but you did not specify them in \`allowed_updates\` so they may not be received: ${impossible.map((u) => `'${u}'`).join(", ")}`);
  }
}
function noUseFunction() {
  throw new Error(`It looks like you are registering more listeners on your bot from within other listeners! This means that every time your bot handles a message like this one, new listeners will be added. This list grows until your machine crashes, so grammY throws this error to tell you that you should probably do things a bit differently. If you're unsure how to resolve this problem, you can ask in the group chat: https://telegram.me/grammyjs

On the other hand, if you actually know what you're doing and you do need to install further middleware while your bot is running, consider installing a composer instance on your bot, and in turn augment the composer after the fact. This way, you can circumvent this protection against memory leaks.`);
}
function transpose(grid) {
  const transposed = [];
  for (let i = 0; i < grid.length; i++) {
    const row = grid[i];
    for (let j = 0; j < row.length; j++) {
      const button = row[j];
      (transposed[j] ??= []).push(button);
    }
  }
  return transposed;
}
function reflow(grid, columns, { fillLastRow = false }) {
  let first = columns;
  if (fillLastRow) {
    const buttonCount = grid.map((row) => row.length).reduce((a, b) => a + b, 0);
    first = buttonCount % columns;
  }
  const reflowed = [];
  for (const row of grid) {
    for (const button of row) {
      const at = Math.max(0, reflowed.length - 1);
      const max = at === 0 ? first : columns;
      let next = reflowed[at] ??= [];
      if (next.length === max) {
        next = [];
        reflowed.push(next);
      }
      next.push(button);
    }
  }
  return reflowed;
}
var filterQueryCache, ENTITY_KEYS, USER_KEYS, FORWARD_ORIGIN_KEYS, STICKER_KEYS, REACTION_KEYS, GIFT_INFO_KEYS, COMMON_MESSAGE_KEYS, MESSAGE_KEYS, CHANNEL_POST_KEYS, BUSINESS_CONNECTION_KEYS, MESSAGE_REACTION_KEYS, MESSAGE_REACTION_COUNT_UPDATED_KEYS, CALLBACK_QUERY_KEYS, CHAT_MEMBER_UPDATED_KEYS, UPDATE_KEYS, L1_SHORTCUTS, L2_SHORTCUTS, checker, Context2, BotError, leaf1, Composer, s, m, h, d, w, y, ms, cachedSetTimeout, cachedClearTimeout, globalContext, queue, draining, currentQueue, queueIndex, title2, platform3, browser, argv2, version3, versions2, release3, config3, on2, addListener2, once2, off2, removeListener2, removeAllListeners2, emit2, performance2, performanceNow, startTime, process2, common, browser$1, itrToStream, baseFetchConfig, debug3, GrammyError, HttpError, isWindows, InputFile, enc, debug1, ApiClient, defaultBuildUrl, proxyMethods, Api, debug22, debugWarn, debugErr, DEFAULT_UPDATE_TYPES, Bot, ALL_UPDATE_TYPES, ALL_CHAT_PERMISSIONS, API_CONSTANTS, InlineKeyboard, debug32, SECRET_HEADER, SECRET_HEADER_LOWERCASE, WRONG_TOKEN_ERROR, ok, okJson, unauthorized, awsLambda, awsLambdaAsync, azure, azureV4, bun, cloudflare, cloudflareModule, express, fastify, hono, http, koa, nextJs, nhttp, oak, serveHttp, stdHttp, sveltekit, worktop, elysia, adapters, debugErr1, callbackAdapter, adapters1;
var init_web = __esm({
  "node_modules/grammy/out/web.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    filterQueryCache = /* @__PURE__ */ new Map();
    __name(matchFilter, "matchFilter");
    __name(parse, "parse");
    __name(compile, "compile");
    __name(preprocess, "preprocess");
    __name(check, "check");
    __name(checkOne, "checkOne");
    __name(treeify, "treeify");
    __name(or, "or");
    __name(concat, "concat");
    __name(leaf, "leaf");
    __name(arborist, "arborist");
    __name(testMaybeArray, "testMaybeArray");
    ENTITY_KEYS = {
      mention: {},
      hashtag: {},
      cashtag: {},
      bot_command: {},
      url: {},
      email: {},
      phone_number: {},
      bold: {},
      italic: {},
      underline: {},
      strikethrough: {},
      spoiler: {},
      blockquote: {},
      expandable_blockquote: {},
      code: {},
      pre: {},
      text_link: {},
      text_mention: {},
      custom_emoji: {},
      date_time: {}
    };
    USER_KEYS = {
      me: {},
      is_bot: {},
      is_premium: {},
      added_to_attachment_menu: {}
    };
    FORWARD_ORIGIN_KEYS = {
      user: {},
      hidden_user: {},
      chat: {},
      channel: {}
    };
    STICKER_KEYS = {
      is_video: {},
      is_animated: {},
      premium_animation: {}
    };
    REACTION_KEYS = {
      emoji: {},
      custom_emoji: {},
      paid: {}
    };
    GIFT_INFO_KEYS = {
      can_be_upgraded: {},
      is_upgrade_separate: {},
      is_private: {}
    };
    COMMON_MESSAGE_KEYS = {
      forward_origin: FORWARD_ORIGIN_KEYS,
      is_topic_message: {},
      is_automatic_forward: {},
      guest_query_id: {},
      business_connection_id: {},
      text: {},
      rich_message: {},
      animation: {},
      audio: {},
      document: {},
      live_photo: {},
      paid_media: {},
      photo: {},
      sticker: STICKER_KEYS,
      story: {},
      video: {},
      video_note: {},
      voice: {},
      contact: {},
      dice: {},
      game: {},
      poll: {},
      venue: {},
      location: {},
      entities: ENTITY_KEYS,
      caption_entities: ENTITY_KEYS,
      caption: {},
      link_preview_options: {
        url: {},
        prefer_small_media: {},
        prefer_large_media: {},
        show_above_text: {}
      },
      effect_id: {},
      paid_star_count: {},
      has_media_spoiler: {},
      new_chat_title: {},
      new_chat_photo: {},
      delete_chat_photo: {},
      message_auto_delete_timer_changed: {},
      pinned_message: {},
      invoice: {},
      proximity_alert_triggered: {},
      chat_background_set: {},
      giveaway_created: {},
      giveaway: {
        only_new_members: {},
        has_public_winners: {}
      },
      giveaway_winners: {
        only_new_members: {},
        was_refunded: {}
      },
      giveaway_completed: {},
      gift: GIFT_INFO_KEYS,
      gift_upgrade_sent: GIFT_INFO_KEYS,
      unique_gift: {
        transfer_star_count: {}
      },
      paid_message_price_changed: {},
      video_chat_scheduled: {},
      video_chat_started: {},
      video_chat_ended: {},
      video_chat_participants_invited: {},
      web_app_data: {}
    };
    MESSAGE_KEYS = {
      ...COMMON_MESSAGE_KEYS,
      direct_messages_topic: {},
      chat_owner_left: {
        new_owner: {}
      },
      chat_owner_changed: {},
      new_chat_members: USER_KEYS,
      left_chat_member: USER_KEYS,
      group_chat_created: {},
      supergroup_chat_created: {},
      migrate_to_chat_id: {},
      migrate_from_chat_id: {},
      successful_payment: {},
      refunded_payment: {},
      users_shared: {},
      chat_shared: {},
      connected_website: {},
      managed_bot_created: {},
      write_access_allowed: {},
      passport_data: {},
      boost_added: {},
      forum_topic_created: {
        is_name_implicit: {}
      },
      forum_topic_edited: {
        name: {},
        icon_custom_emoji_id: {}
      },
      forum_topic_closed: {},
      forum_topic_reopened: {},
      general_forum_topic_hidden: {},
      general_forum_topic_unhidden: {},
      checklist: {
        others_can_add_tasks: {},
        others_can_mark_tasks_as_done: {}
      },
      checklist_tasks_done: {},
      checklist_tasks_added: {},
      poll_option_added: {},
      poll_option_deleted: {},
      suggested_post_info: {},
      suggested_post_approved: {},
      suggested_post_approval_failed: {},
      suggested_post_declined: {},
      suggested_post_paid: {},
      suggested_post_refunded: {},
      sender_boost_count: {}
    };
    CHANNEL_POST_KEYS = {
      ...COMMON_MESSAGE_KEYS,
      channel_chat_created: {},
      direct_message_price_changed: {},
      is_paid_post: {}
    };
    BUSINESS_CONNECTION_KEYS = {
      can_reply: {},
      is_enabled: {}
    };
    MESSAGE_REACTION_KEYS = {
      old_reaction: REACTION_KEYS,
      new_reaction: REACTION_KEYS
    };
    MESSAGE_REACTION_COUNT_UPDATED_KEYS = {
      reactions: REACTION_KEYS
    };
    CALLBACK_QUERY_KEYS = {
      data: {},
      game_short_name: {}
    };
    CHAT_MEMBER_UPDATED_KEYS = {
      from: USER_KEYS
    };
    UPDATE_KEYS = {
      message: MESSAGE_KEYS,
      edited_message: MESSAGE_KEYS,
      channel_post: CHANNEL_POST_KEYS,
      edited_channel_post: CHANNEL_POST_KEYS,
      business_connection: BUSINESS_CONNECTION_KEYS,
      business_message: MESSAGE_KEYS,
      edited_business_message: MESSAGE_KEYS,
      deleted_business_messages: {},
      guest_message: MESSAGE_KEYS,
      inline_query: {},
      chosen_inline_result: {},
      callback_query: CALLBACK_QUERY_KEYS,
      shipping_query: {},
      pre_checkout_query: {},
      poll: {},
      poll_answer: {},
      my_chat_member: CHAT_MEMBER_UPDATED_KEYS,
      chat_member: CHAT_MEMBER_UPDATED_KEYS,
      managed_bot: {},
      chat_join_request: {},
      message_reaction: MESSAGE_REACTION_KEYS,
      message_reaction_count: MESSAGE_REACTION_COUNT_UPDATED_KEYS,
      chat_boost: {},
      removed_chat_boost: {},
      purchased_paid_media: {}
    };
    L1_SHORTCUTS = {
      "": [
        "message",
        "channel_post"
      ],
      msg: [
        "message",
        "channel_post"
      ],
      edit: [
        "edited_message",
        "edited_channel_post"
      ]
    };
    L2_SHORTCUTS = {
      "": [
        "entities",
        "caption_entities"
      ],
      media: [
        "photo",
        "live_photo",
        "video"
      ],
      file: [
        "photo",
        "live_photo",
        "animation",
        "audio",
        "document",
        "video",
        "video_note",
        "voice",
        "sticker"
      ]
    };
    checker = {
      filterQuery(filter) {
        const pred = matchFilter(filter);
        return (ctx) => pred(ctx);
      },
      text(trigger) {
        const hasText = checker.filterQuery([
          ":text",
          ":caption"
        ]);
        const trg = triggerFn(trigger);
        return (ctx) => {
          if (!hasText(ctx)) return false;
          const msg = ctx.message ?? ctx.channelPost;
          const txt = msg.text ?? msg.caption;
          return match2(ctx, txt, trg);
        };
      },
      command(command) {
        const hasEntities = checker.filterQuery(":entities:bot_command");
        const atCommands = /* @__PURE__ */ new Set();
        const noAtCommands = /* @__PURE__ */ new Set();
        toArray(command).forEach((cmd) => {
          if (cmd.startsWith("/")) {
            throw new Error(`Do not include '/' when registering command handlers (use '${cmd.substring(1)}' not '${cmd}')`);
          }
          const set = cmd.includes("@") ? atCommands : noAtCommands;
          set.add(cmd);
        });
        return (ctx) => {
          if (!hasEntities(ctx)) return false;
          const msg = ctx.message ?? ctx.channelPost;
          const txt = msg.text ?? msg.caption;
          return msg.entities.some((e) => {
            if (e.type !== "bot_command") return false;
            if (e.offset !== 0) return false;
            const cmd = txt.substring(1, e.length);
            if (noAtCommands.has(cmd) || atCommands.has(cmd)) {
              ctx.match = txt.substring(cmd.length + 1).trimStart();
              return true;
            }
            const index = cmd.indexOf("@");
            if (index === -1) return false;
            const atTarget = cmd.substring(index + 1).toLowerCase();
            const username = ctx.me.username.toLowerCase();
            if (atTarget !== username) return false;
            const atCommand = cmd.substring(0, index);
            if (noAtCommands.has(atCommand)) {
              ctx.match = txt.substring(cmd.length + 1).trimStart();
              return true;
            }
            return false;
          });
        };
      },
      reaction(reaction) {
        const hasMessageReaction = checker.filterQuery("message_reaction");
        const normalized = typeof reaction === "string" ? [
          {
            type: "emoji",
            emoji: reaction
          }
        ] : (Array.isArray(reaction) ? reaction : [
          reaction
        ]).map((emoji2) => typeof emoji2 === "string" ? {
          type: "emoji",
          emoji: emoji2
        } : emoji2);
        const emoji = new Set(normalized.filter((r) => r.type === "emoji").map((r) => r.emoji));
        const customEmoji = new Set(normalized.filter((r) => r.type === "custom_emoji").map((r) => r.custom_emoji_id));
        const paid = normalized.some((r) => r.type === "paid");
        return (ctx) => {
          if (!hasMessageReaction(ctx)) return false;
          const { old_reaction, new_reaction } = ctx.messageReaction;
          for (const reaction2 of new_reaction) {
            let isOld = false;
            if (reaction2.type === "emoji") {
              for (const old of old_reaction) {
                if (old.type !== "emoji") continue;
                if (old.emoji === reaction2.emoji) {
                  isOld = true;
                  break;
                }
              }
            } else if (reaction2.type === "custom_emoji") {
              for (const old of old_reaction) {
                if (old.type !== "custom_emoji") continue;
                if (old.custom_emoji_id === reaction2.custom_emoji_id) {
                  isOld = true;
                  break;
                }
              }
            } else if (reaction2.type === "paid") {
              for (const old of old_reaction) {
                if (old.type !== "paid") continue;
                isOld = true;
                break;
              }
            } else {
            }
            if (isOld) continue;
            if (reaction2.type === "emoji") {
              if (emoji.has(reaction2.emoji)) return true;
            } else if (reaction2.type === "custom_emoji") {
              if (customEmoji.has(reaction2.custom_emoji_id)) return true;
            } else if (reaction2.type === "paid") {
              if (paid) return true;
            } else {
              return true;
            }
          }
          return false;
        };
      },
      chatType(chatType) {
        const set = new Set(toArray(chatType));
        return (ctx) => ctx.chat?.type !== void 0 && set.has(ctx.chat.type);
      },
      callbackQuery(trigger) {
        const hasCallbackQuery = checker.filterQuery("callback_query:data");
        const trg = triggerFn(trigger);
        return (ctx) => hasCallbackQuery(ctx) && match2(ctx, ctx.callbackQuery.data, trg);
      },
      gameQuery(trigger) {
        const hasGameQuery = checker.filterQuery("callback_query:game_short_name");
        const trg = triggerFn(trigger);
        return (ctx) => hasGameQuery(ctx) && match2(ctx, ctx.callbackQuery.game_short_name, trg);
      },
      inlineQuery(trigger) {
        const hasInlineQuery = checker.filterQuery("inline_query");
        const trg = triggerFn(trigger);
        return (ctx) => hasInlineQuery(ctx) && match2(ctx, ctx.inlineQuery.query, trg);
      },
      chosenInlineResult(trigger) {
        const hasChosenInlineResult = checker.filterQuery("chosen_inline_result");
        const trg = triggerFn(trigger);
        return (ctx) => hasChosenInlineResult(ctx) && match2(ctx, ctx.chosenInlineResult.result_id, trg);
      },
      preCheckoutQuery(trigger) {
        const hasPreCheckoutQuery = checker.filterQuery("pre_checkout_query");
        const trg = triggerFn(trigger);
        return (ctx) => hasPreCheckoutQuery(ctx) && match2(ctx, ctx.preCheckoutQuery.invoice_payload, trg);
      },
      shippingQuery(trigger) {
        const hasShippingQuery = checker.filterQuery("shipping_query");
        const trg = triggerFn(trigger);
        return (ctx) => hasShippingQuery(ctx) && match2(ctx, ctx.shippingQuery.invoice_payload, trg);
      }
    };
    Context2 = class _Context {
      static {
        __name(this, "Context");
      }
      update;
      api;
      me;
      match;
      constructor(update, api, me) {
        this.update = update;
        this.api = api;
        this.me = me;
      }
      get message() {
        return this.update.message;
      }
      get editedMessage() {
        return this.update.edited_message;
      }
      get channelPost() {
        return this.update.channel_post;
      }
      get editedChannelPost() {
        return this.update.edited_channel_post;
      }
      get businessConnection() {
        return this.update.business_connection;
      }
      get businessMessage() {
        return this.update.business_message;
      }
      get editedBusinessMessage() {
        return this.update.edited_business_message;
      }
      get deletedBusinessMessages() {
        return this.update.deleted_business_messages;
      }
      get guestMessage() {
        return this.update.guest_message;
      }
      get messageReaction() {
        return this.update.message_reaction;
      }
      get messageReactionCount() {
        return this.update.message_reaction_count;
      }
      get inlineQuery() {
        return this.update.inline_query;
      }
      get chosenInlineResult() {
        return this.update.chosen_inline_result;
      }
      get callbackQuery() {
        return this.update.callback_query;
      }
      get shippingQuery() {
        return this.update.shipping_query;
      }
      get preCheckoutQuery() {
        return this.update.pre_checkout_query;
      }
      get poll() {
        return this.update.poll;
      }
      get pollAnswer() {
        return this.update.poll_answer;
      }
      get myChatMember() {
        return this.update.my_chat_member;
      }
      get chatMember() {
        return this.update.chat_member;
      }
      get managedBot() {
        return this.update.managed_bot;
      }
      get chatJoinRequest() {
        return this.update.chat_join_request;
      }
      get chatBoost() {
        return this.update.chat_boost;
      }
      get removedChatBoost() {
        return this.update.removed_chat_boost;
      }
      get purchasedPaidMedia() {
        return this.update.purchased_paid_media;
      }
      get msg() {
        return this.message ?? this.editedMessage ?? this.channelPost ?? this.editedChannelPost ?? this.businessMessage ?? this.editedBusinessMessage ?? this.guestMessage ?? this.callbackQuery?.message;
      }
      get chat() {
        return (this.msg ?? this.deletedBusinessMessages ?? this.messageReaction ?? this.messageReactionCount ?? this.myChatMember ?? this.chatMember ?? this.chatJoinRequest ?? this.chatBoost ?? this.removedChatBoost)?.chat;
      }
      get senderChat() {
        return this.msg?.sender_chat;
      }
      get from() {
        return (this.businessConnection ?? this.messageReaction ?? this.managedBot ?? (this.chatBoost?.boost ?? this.removedChatBoost)?.source)?.user ?? (this.callbackQuery ?? this.msg ?? this.inlineQuery ?? this.chosenInlineResult ?? this.shippingQuery ?? this.preCheckoutQuery ?? this.myChatMember ?? this.chatMember ?? this.chatJoinRequest ?? this.purchasedPaidMedia)?.from;
      }
      get msgId() {
        return this.msg?.message_id ?? this.messageReaction?.message_id ?? this.messageReactionCount?.message_id;
      }
      get chatId() {
        return this.chat?.id ?? this.businessConnection?.user_chat_id;
      }
      get inlineMessageId() {
        return this.callbackQuery?.inline_message_id ?? this.chosenInlineResult?.inline_message_id;
      }
      get businessConnectionId() {
        return this.msg?.business_connection_id ?? this.businessConnection?.id ?? this.deletedBusinessMessages?.business_connection_id;
      }
      entities(types2) {
        const message = this.msg;
        if (message === void 0) return [];
        const text = message.text ?? message.caption;
        if (text === void 0) return [];
        let entities = message.entities ?? message.caption_entities;
        if (entities === void 0) return [];
        if (types2 !== void 0) {
          const filters = new Set(toArray(types2));
          entities = entities.filter((entity) => filters.has(entity.type));
        }
        return entities.map((entity) => ({
          ...entity,
          text: text.substring(entity.offset, entity.offset + entity.length)
        }));
      }
      reactions() {
        const emoji = [];
        const emojiAdded = [];
        const emojiKept = [];
        const emojiRemoved = [];
        const customEmoji = [];
        const customEmojiAdded = [];
        const customEmojiKept = [];
        const customEmojiRemoved = [];
        let paid = false;
        let paidAdded = false;
        const r = this.messageReaction;
        if (r !== void 0) {
          const { old_reaction, new_reaction } = r;
          for (const reaction of new_reaction) {
            if (reaction.type === "emoji") {
              emoji.push(reaction.emoji);
            } else if (reaction.type === "custom_emoji") {
              customEmoji.push(reaction.custom_emoji_id);
            } else if (reaction.type === "paid") {
              paid = paidAdded = true;
            }
          }
          for (const reaction of old_reaction) {
            if (reaction.type === "emoji") {
              emojiRemoved.push(reaction.emoji);
            } else if (reaction.type === "custom_emoji") {
              customEmojiRemoved.push(reaction.custom_emoji_id);
            } else if (reaction.type === "paid") {
              paidAdded = false;
            }
          }
          emojiAdded.push(...emoji);
          customEmojiAdded.push(...customEmoji);
          for (let i = 0; i < emojiRemoved.length; i++) {
            const len = emojiAdded.length;
            if (len === 0) break;
            const rem = emojiRemoved[i];
            for (let j = 0; j < len; j++) {
              if (rem === emojiAdded[j]) {
                emojiKept.push(rem);
                emojiRemoved.splice(i, 1);
                emojiAdded.splice(j, 1);
                i--;
                break;
              }
            }
          }
          for (let i = 0; i < customEmojiRemoved.length; i++) {
            const len = customEmojiAdded.length;
            if (len === 0) break;
            const rem = customEmojiRemoved[i];
            for (let j = 0; j < len; j++) {
              if (rem === customEmojiAdded[j]) {
                customEmojiKept.push(rem);
                customEmojiRemoved.splice(i, 1);
                customEmojiAdded.splice(j, 1);
                i--;
                break;
              }
            }
          }
        }
        return {
          emoji,
          emojiAdded,
          emojiKept,
          emojiRemoved,
          customEmoji,
          customEmojiAdded,
          customEmojiKept,
          customEmojiRemoved,
          paid,
          paidAdded
        };
      }
      static has = checker;
      has(filter) {
        return _Context.has.filterQuery(filter)(this);
      }
      hasText(trigger) {
        return _Context.has.text(trigger)(this);
      }
      hasCommand(command) {
        return _Context.has.command(command)(this);
      }
      hasReaction(reaction) {
        return _Context.has.reaction(reaction)(this);
      }
      hasChatType(chatType) {
        return _Context.has.chatType(chatType)(this);
      }
      hasCallbackQuery(trigger) {
        return _Context.has.callbackQuery(trigger)(this);
      }
      hasGameQuery(trigger) {
        return _Context.has.gameQuery(trigger)(this);
      }
      hasInlineQuery(trigger) {
        return _Context.has.inlineQuery(trigger)(this);
      }
      hasChosenInlineResult(trigger) {
        return _Context.has.chosenInlineResult(trigger)(this);
      }
      hasPreCheckoutQuery(trigger) {
        return _Context.has.preCheckoutQuery(trigger)(this);
      }
      hasShippingQuery(trigger) {
        return _Context.has.shippingQuery(trigger)(this);
      }
      reply(text, other, signal) {
        const msg = this.msg;
        return this.api.sendMessage(orThrow(this.chatId, "sendMessage"), text, {
          business_connection_id: this.businessConnectionId,
          ...msg?.is_topic_message ? {
            message_thread_id: msg.message_thread_id
          } : {},
          direct_messages_topic_id: msg?.direct_messages_topic?.topic_id,
          ...other
        }, signal);
      }
      replyWithRichMessage(rich_message, other, signal) {
        const msg = this.msg;
        return this.api.sendRichMessage(orThrow(this.chatId, "sendRichMessage"), rich_message, {
          business_connection_id: this.businessConnectionId,
          ...msg?.is_topic_message ? {
            message_thread_id: msg.message_thread_id
          } : {},
          direct_messages_topic_id: msg?.direct_messages_topic?.topic_id,
          ...other
        }, signal);
      }
      forwardMessage(chat_id, other, signal) {
        const msg = this.msg;
        return this.api.forwardMessage(chat_id, orThrow(this.chatId, "forwardMessage"), orThrow(this.msgId, "forwardMessage"), {
          direct_messages_topic_id: msg?.direct_messages_topic?.topic_id,
          ...other
        }, signal);
      }
      forwardMessages(chat_id, message_ids, other, signal) {
        const msg = this.msg;
        return this.api.forwardMessages(chat_id, orThrow(this.chatId, "forwardMessages"), message_ids, {
          direct_messages_topic_id: msg?.direct_messages_topic?.topic_id,
          ...other
        }, signal);
      }
      copyMessage(chat_id, other, signal) {
        const msg = this.msg;
        return this.api.copyMessage(chat_id, orThrow(this.chatId, "copyMessage"), orThrow(this.msgId, "copyMessage"), {
          direct_messages_topic_id: msg?.direct_messages_topic?.topic_id,
          ...other
        }, signal);
      }
      copyMessages(chat_id, message_ids, other, signal) {
        const msg = this.msg;
        return this.api.copyMessages(chat_id, orThrow(this.chatId, "copyMessages"), message_ids, {
          direct_messages_topic_id: msg?.direct_messages_topic?.topic_id,
          ...other
        }, signal);
      }
      replyWithPhoto(photo, other, signal) {
        const msg = this.msg;
        return this.api.sendPhoto(orThrow(this.chatId, "sendPhoto"), photo, {
          business_connection_id: this.businessConnectionId,
          ...msg?.is_topic_message ? {
            message_thread_id: msg.message_thread_id
          } : {},
          direct_messages_topic_id: msg?.direct_messages_topic?.topic_id,
          ...other
        }, signal);
      }
      replyWithLivePhoto(live_photo, photo, other, signal) {
        const msg = this.msg;
        return this.api.sendLivePhoto(orThrow(this.chatId, "sendLivePhoto"), live_photo, photo, {
          business_connection_id: this.businessConnectionId,
          ...msg?.is_topic_message ? {
            message_thread_id: msg.message_thread_id
          } : {},
          direct_messages_topic_id: msg?.direct_messages_topic?.topic_id,
          ...other
        }, signal);
      }
      replyWithAudio(audio, other, signal) {
        const msg = this.msg;
        return this.api.sendAudio(orThrow(this.chatId, "sendAudio"), audio, {
          business_connection_id: this.businessConnectionId,
          ...msg?.is_topic_message ? {
            message_thread_id: msg.message_thread_id
          } : {},
          direct_messages_topic_id: msg?.direct_messages_topic?.topic_id,
          ...other
        }, signal);
      }
      replyWithDocument(document1, other, signal) {
        const msg = this.msg;
        return this.api.sendDocument(orThrow(this.chatId, "sendDocument"), document1, {
          business_connection_id: this.businessConnectionId,
          ...msg?.is_topic_message ? {
            message_thread_id: msg.message_thread_id
          } : {},
          direct_messages_topic_id: msg?.direct_messages_topic?.topic_id,
          ...other
        }, signal);
      }
      replyWithVideo(video, other, signal) {
        const msg = this.msg;
        return this.api.sendVideo(orThrow(this.chatId, "sendVideo"), video, {
          business_connection_id: this.businessConnectionId,
          ...msg?.is_topic_message ? {
            message_thread_id: msg.message_thread_id
          } : {},
          direct_messages_topic_id: msg?.direct_messages_topic?.topic_id,
          ...other
        }, signal);
      }
      replyWithAnimation(animation, other, signal) {
        const msg = this.msg;
        return this.api.sendAnimation(orThrow(this.chatId, "sendAnimation"), animation, {
          business_connection_id: this.businessConnectionId,
          ...msg?.is_topic_message ? {
            message_thread_id: msg.message_thread_id
          } : {},
          direct_messages_topic_id: msg?.direct_messages_topic?.topic_id,
          ...other
        }, signal);
      }
      replyWithVoice(voice, other, signal) {
        const msg = this.msg;
        return this.api.sendVoice(orThrow(this.chatId, "sendVoice"), voice, {
          business_connection_id: this.businessConnectionId,
          ...msg?.is_topic_message ? {
            message_thread_id: msg.message_thread_id
          } : {},
          direct_messages_topic_id: msg?.direct_messages_topic?.topic_id,
          ...other
        }, signal);
      }
      replyWithVideoNote(video_note, other, signal) {
        const msg = this.msg;
        return this.api.sendVideoNote(orThrow(this.chatId, "sendVideoNote"), video_note, {
          business_connection_id: this.businessConnectionId,
          ...msg?.is_topic_message ? {
            message_thread_id: msg.message_thread_id
          } : {},
          direct_messages_topic_id: msg?.direct_messages_topic?.topic_id,
          ...other
        }, signal);
      }
      sendPaidMedia(...args) {
        return this.replyWithPaidMedia(...args);
      }
      replyWithPaidMedia(star_count, media, other, signal) {
        const msg = this.msg;
        return this.api.sendPaidMedia(orThrow(this.chatId, "sendPaidMedia"), star_count, media, {
          business_connection_id: this.businessConnectionId,
          ...msg?.is_topic_message ? {
            message_thread_id: msg.message_thread_id
          } : {},
          direct_messages_topic_id: this.msg?.direct_messages_topic?.topic_id,
          ...other
        }, signal);
      }
      replyWithMediaGroup(media, other, signal) {
        const msg = this.msg;
        return this.api.sendMediaGroup(orThrow(this.chatId, "sendMediaGroup"), media, {
          business_connection_id: this.businessConnectionId,
          ...msg?.is_topic_message ? {
            message_thread_id: msg.message_thread_id
          } : {},
          direct_messages_topic_id: msg?.direct_messages_topic?.topic_id,
          ...other
        }, signal);
      }
      replyWithLocation(latitude, longitude, other, signal) {
        const msg = this.msg;
        return this.api.sendLocation(orThrow(this.chatId, "sendLocation"), latitude, longitude, {
          business_connection_id: this.businessConnectionId,
          ...msg?.is_topic_message ? {
            message_thread_id: msg.message_thread_id
          } : {},
          direct_messages_topic_id: msg?.direct_messages_topic?.topic_id,
          ...other
        }, signal);
      }
      editMessageLiveLocation(latitude, longitude, other, signal) {
        const inlineId = this.inlineMessageId;
        return inlineId !== void 0 ? this.api.editMessageLiveLocationInline(inlineId, latitude, longitude, {
          business_connection_id: this.businessConnectionId,
          ...other
        }, signal) : this.api.editMessageLiveLocation(orThrow(this.chatId, "editMessageLiveLocation"), orThrow(this.msgId, "editMessageLiveLocation"), latitude, longitude, {
          business_connection_id: this.businessConnectionId,
          ...other
        }, signal);
      }
      stopMessageLiveLocation(other, signal) {
        const inlineId = this.inlineMessageId;
        return inlineId !== void 0 ? this.api.stopMessageLiveLocationInline(inlineId, {
          business_connection_id: this.businessConnectionId,
          ...other
        }, signal) : this.api.stopMessageLiveLocation(orThrow(this.chatId, "stopMessageLiveLocation"), orThrow(this.msgId, "stopMessageLiveLocation"), {
          business_connection_id: this.businessConnectionId,
          ...other
        }, signal);
      }
      replyWithVenue(latitude, longitude, title3, address, other, signal) {
        const msg = this.msg;
        return this.api.sendVenue(orThrow(this.chatId, "sendVenue"), latitude, longitude, title3, address, {
          business_connection_id: this.businessConnectionId,
          ...msg?.is_topic_message ? {
            message_thread_id: msg.message_thread_id
          } : {},
          direct_messages_topic_id: msg?.direct_messages_topic?.topic_id,
          ...other
        }, signal);
      }
      replyWithContact(phone_number, first_name, other, signal) {
        const msg = this.msg;
        return this.api.sendContact(orThrow(this.chatId, "sendContact"), phone_number, first_name, {
          business_connection_id: this.businessConnectionId,
          ...msg?.is_topic_message ? {
            message_thread_id: msg.message_thread_id
          } : {},
          direct_messages_topic_id: msg?.direct_messages_topic?.topic_id,
          ...other
        }, signal);
      }
      replyWithPoll(question, options, other, signal) {
        const msg = this.msg;
        return this.api.sendPoll(orThrow(this.chatId, "sendPoll"), question, options, {
          business_connection_id: this.businessConnectionId,
          ...msg?.is_topic_message ? {
            message_thread_id: msg.message_thread_id
          } : {},
          ...other
        }, signal);
      }
      replyWithChecklist(checklist, other, signal) {
        return this.api.sendChecklist(orThrow(this.businessConnectionId, "sendChecklist"), orThrow(this.chatId, "sendChecklist"), checklist, other, signal);
      }
      editMessageChecklist(checklist, other, signal) {
        const msg = orThrow(this.msg, "editMessageChecklist");
        const target = msg.checklist_tasks_done?.checklist_message ?? msg.checklist_tasks_added?.checklist_message ?? msg;
        return this.api.editMessageChecklist(orThrow(this.businessConnectionId, "editMessageChecklist"), orThrow(target.chat.id, "editMessageChecklist"), orThrow(target.message_id, "editMessageChecklist"), checklist, other, signal);
      }
      replyWithDice(emoji, other, signal) {
        const msg = this.msg;
        return this.api.sendDice(orThrow(this.chatId, "sendDice"), emoji, {
          business_connection_id: this.businessConnectionId,
          ...msg?.is_topic_message ? {
            message_thread_id: msg.message_thread_id
          } : {},
          direct_messages_topic_id: msg?.direct_messages_topic?.topic_id,
          ...other
        }, signal);
      }
      replyWithChatAction(action, other, signal) {
        const msg = this.msg;
        return this.api.sendChatAction(orThrow(this.chatId, "sendChatAction"), action, {
          business_connection_id: this.businessConnectionId,
          message_thread_id: msg?.message_thread_id,
          ...other
        }, signal);
      }
      react(reaction, other, signal) {
        return this.api.setMessageReaction(orThrow(this.chatId, "setMessageReaction"), orThrow(this.msgId, "setMessageReaction"), typeof reaction === "string" ? [
          {
            type: "emoji",
            emoji: reaction
          }
        ] : (Array.isArray(reaction) ? reaction : [
          reaction
        ]).map((emoji) => typeof emoji === "string" ? {
          type: "emoji",
          emoji
        } : emoji), other, signal);
      }
      replyWithDraft(text, other, signal) {
        const msg = this.msg;
        return this.api.sendMessageDraft(orThrow(this.chatId, "sendMessageDraft"), this.update.update_id, text, {
          ...msg?.is_topic_message ? {
            message_thread_id: msg.message_thread_id
          } : {},
          ...other
        }, signal);
      }
      replyWithRichMessageDraft(rich_message, other, signal) {
        const msg = this.msg;
        return this.api.sendRichMessageDraft(orThrow(this.chatId, "sendMessageDraft"), this.update.update_id, rich_message, {
          ...msg?.is_topic_message ? {
            message_thread_id: msg.message_thread_id
          } : {},
          ...other
        }, signal);
      }
      getUserProfilePhotos(other, signal) {
        return this.api.getUserProfilePhotos(orThrow(this.from, "getUserProfilePhotos").id, other, signal);
      }
      getUserProfileAudios(other, signal) {
        return this.api.getUserProfileAudios(orThrow(this.from, "getUserProfileAudios").id, other, signal);
      }
      setUserEmojiStatus(other, signal) {
        return this.api.setUserEmojiStatus(orThrow(this.from, "setUserEmojiStatus").id, other, signal);
      }
      getUserChatBoosts(chat_id, signal) {
        return this.api.getUserChatBoosts(chat_id ?? orThrow(this.chatId, "getUserChatBoosts"), orThrow(this.from, "getUserChatBoosts").id, signal);
      }
      getUserGifts(other, signal) {
        return this.api.getUserGifts(orThrow(this.from, "getUserGifts").id, other, signal);
      }
      getChatGifts(other, signal) {
        return this.api.getChatGifts(orThrow(this.chatId, "getChatGifts"), other, signal);
      }
      getBusinessConnection(signal) {
        return this.api.getBusinessConnection(orThrow(this.businessConnectionId, "getBusinessConnection"), signal);
      }
      getManagedBotToken(signal) {
        return this.api.getManagedBotToken(orThrow(this.managedBot, "getManagedBotToken").bot.id, signal);
      }
      replaceManagedBotToken(signal) {
        return this.api.replaceManagedBotToken(orThrow(this.managedBot, "getManagedBotToken").bot.id, signal);
      }
      getManagedBotAccessSettings(signal) {
        return this.api.getManagedBotAccessSettings(orThrow(this.managedBot, "getManagedBotAccessSettings").bot.id, signal);
      }
      setManagedBotAccessSettings(is_access_restricted, other, signal) {
        return this.api.setManagedBotAccessSettings(orThrow(this.managedBot, "setManagedBotAccessSettings").bot.id, is_access_restricted, other, signal);
      }
      getFile(signal) {
        const m2 = orThrow(this.msg, "getFile");
        const file = m2.photo !== void 0 ? m2.photo[m2.photo.length - 1] : m2.animation ?? m2.audio ?? m2.document ?? m2.video ?? m2.video_note ?? m2.voice ?? m2.sticker;
        return this.api.getFile(orThrow(file, "getFile").file_id, signal);
      }
      kickAuthor(...args) {
        return this.banAuthor(...args);
      }
      banAuthor(other, signal) {
        return this.api.banChatMember(orThrow(this.chatId, "banAuthor"), orThrow(this.from, "banAuthor").id, other, signal);
      }
      kickChatMember(...args) {
        return this.banChatMember(...args);
      }
      banChatMember(user_id, other, signal) {
        return this.api.banChatMember(orThrow(this.chatId, "banChatMember"), user_id, other, signal);
      }
      unbanChatMember(user_id, other, signal) {
        return this.api.unbanChatMember(orThrow(this.chatId, "unbanChatMember"), user_id, other, signal);
      }
      restrictAuthor(permissions, other, signal) {
        return this.api.restrictChatMember(orThrow(this.chatId, "restrictAuthor"), orThrow(this.from, "restrictAuthor").id, permissions, other, signal);
      }
      restrictChatMember(user_id, permissions, other, signal) {
        return this.api.restrictChatMember(orThrow(this.chatId, "restrictChatMember"), user_id, permissions, other, signal);
      }
      promoteAuthor(other, signal) {
        return this.api.promoteChatMember(orThrow(this.chatId, "promoteAuthor"), orThrow(this.from, "promoteAuthor").id, other, signal);
      }
      promoteChatMember(user_id, other, signal) {
        return this.api.promoteChatMember(orThrow(this.chatId, "promoteChatMember"), user_id, other, signal);
      }
      setChatAdministratorAuthorCustomTitle(custom_title, signal) {
        return this.api.setChatAdministratorCustomTitle(orThrow(this.chatId, "setChatAdministratorAuthorCustomTitle"), orThrow(this.from, "setChatAdministratorAuthorCustomTitle").id, custom_title, signal);
      }
      setChatAdministratorCustomTitle(user_id, custom_title, signal) {
        return this.api.setChatAdministratorCustomTitle(orThrow(this.chatId, "setChatAdministratorCustomTitle"), user_id, custom_title, signal);
      }
      setAuthorTag(tag, signal) {
        return this.api.setChatMemberTag(orThrow(this.chatId, "setChatMemberTag"), orThrow(this.from, "setChatMemberTag").id, tag, signal);
      }
      setChatMemberTag(user_id, tag, signal) {
        return this.api.setChatMemberTag(orThrow(this.chatId, "setChatMemberTag"), user_id, tag, signal);
      }
      banChatSenderChat(sender_chat_id, signal) {
        return this.api.banChatSenderChat(orThrow(this.chatId, "banChatSenderChat"), sender_chat_id, signal);
      }
      unbanChatSenderChat(sender_chat_id, signal) {
        return this.api.unbanChatSenderChat(orThrow(this.chatId, "unbanChatSenderChat"), sender_chat_id, signal);
      }
      setChatPermissions(permissions, other, signal) {
        return this.api.setChatPermissions(orThrow(this.chatId, "setChatPermissions"), permissions, other, signal);
      }
      exportChatInviteLink(signal) {
        return this.api.exportChatInviteLink(orThrow(this.chatId, "exportChatInviteLink"), signal);
      }
      createChatInviteLink(other, signal) {
        return this.api.createChatInviteLink(orThrow(this.chatId, "createChatInviteLink"), other, signal);
      }
      editChatInviteLink(invite_link, other, signal) {
        return this.api.editChatInviteLink(orThrow(this.chatId, "editChatInviteLink"), invite_link, other, signal);
      }
      createChatSubscriptionInviteLink(subscription_period, subscription_price, other, signal) {
        return this.api.createChatSubscriptionInviteLink(orThrow(this.chatId, "createChatSubscriptionInviteLink"), subscription_period, subscription_price, other, signal);
      }
      editChatSubscriptionInviteLink(invite_link, other, signal) {
        return this.api.editChatSubscriptionInviteLink(orThrow(this.chatId, "editChatSubscriptionInviteLink"), invite_link, other, signal);
      }
      revokeChatInviteLink(invite_link, signal) {
        return this.api.revokeChatInviteLink(orThrow(this.chatId, "editChatInviteLink"), invite_link, signal);
      }
      approveChatJoinRequest(user_id, signal) {
        return this.api.approveChatJoinRequest(orThrow(this.chatId, "approveChatJoinRequest"), user_id, signal);
      }
      declineChatJoinRequest(user_id, signal) {
        return this.api.declineChatJoinRequest(orThrow(this.chatId, "declineChatJoinRequest"), user_id, signal);
      }
      answerChatJoinRequestQuery(result, signal) {
        return this.api.answerChatJoinRequestQuery(orThrow(this.chatJoinRequest?.query_id, "answerChatJoinRequestQuery"), result, signal);
      }
      replyWithChatJoinRequestWebApp(web_app_url, signal) {
        return this.api.sendChatJoinRequestWebApp(orThrow(this.chatJoinRequest?.query_id, "answerChatJoinRequestQuery"), web_app_url, signal);
      }
      approveSuggestedPost(other, signal) {
        return this.api.approveSuggestedPost(orThrow(this.chatId, "approveSuggestedPost"), orThrow(this.msgId, "approveSuggestedPost"), other, signal);
      }
      declineSuggestedPost(other, signal) {
        return this.api.declineSuggestedPost(orThrow(this.chatId, "declineSuggestedPost"), orThrow(this.msgId, "declineSuggestedPost"), other, signal);
      }
      setChatPhoto(photo, signal) {
        return this.api.setChatPhoto(orThrow(this.chatId, "setChatPhoto"), photo, signal);
      }
      deleteChatPhoto(signal) {
        return this.api.deleteChatPhoto(orThrow(this.chatId, "deleteChatPhoto"), signal);
      }
      setChatTitle(title3, signal) {
        return this.api.setChatTitle(orThrow(this.chatId, "setChatTitle"), title3, signal);
      }
      setChatDescription(description, signal) {
        return this.api.setChatDescription(orThrow(this.chatId, "setChatDescription"), description, signal);
      }
      pinChatMessage(message_id, other, signal) {
        return this.api.pinChatMessage(orThrow(this.chatId, "pinChatMessage"), message_id, {
          business_connection_id: this.businessConnectionId,
          ...other
        }, signal);
      }
      unpinChatMessage(message_id, other, signal) {
        return this.api.unpinChatMessage(orThrow(this.chatId, "unpinChatMessage"), message_id, {
          business_connection_id: this.businessConnectionId,
          ...other
        }, signal);
      }
      unpinAllChatMessages(signal) {
        return this.api.unpinAllChatMessages(orThrow(this.chatId, "unpinAllChatMessages"), signal);
      }
      leaveChat(signal) {
        return this.api.leaveChat(orThrow(this.chatId, "leaveChat"), signal);
      }
      getChat(signal) {
        return this.api.getChat(orThrow(this.chatId, "getChat"), signal);
      }
      getChatAdministrators(other, signal) {
        return this.api.getChatAdministrators(orThrow(this.chatId, "getChatAdministrators"), other, signal);
      }
      getChatMembersCount(...args) {
        return this.getChatMemberCount(...args);
      }
      getChatMemberCount(signal) {
        return this.api.getChatMemberCount(orThrow(this.chatId, "getChatMemberCount"), signal);
      }
      getAuthor(signal) {
        return this.api.getChatMember(orThrow(this.chatId, "getAuthor"), orThrow(this.from, "getAuthor").id, signal);
      }
      getChatMember(user_id, signal) {
        return this.api.getChatMember(orThrow(this.chatId, "getChatMember"), user_id, signal);
      }
      getUserPersonalChatMessages(limit, signal) {
        return this.api.getUserPersonalChatMessages(orThrow(this.from, "getUserPersonalChatMessages").id, limit, signal);
      }
      setChatStickerSet(sticker_set_name, signal) {
        return this.api.setChatStickerSet(orThrow(this.chatId, "setChatStickerSet"), sticker_set_name, signal);
      }
      deleteChatStickerSet(signal) {
        return this.api.deleteChatStickerSet(orThrow(this.chatId, "deleteChatStickerSet"), signal);
      }
      createForumTopic(name, other, signal) {
        return this.api.createForumTopic(orThrow(this.chatId, "createForumTopic"), name, other, signal);
      }
      editForumTopic(other, signal) {
        const message = orThrow(this.msg, "editForumTopic");
        const thread = orThrow(message.message_thread_id, "editForumTopic");
        return this.api.editForumTopic(message.chat.id, thread, other, signal);
      }
      closeForumTopic(signal) {
        const message = orThrow(this.msg, "closeForumTopic");
        const thread = orThrow(message.message_thread_id, "closeForumTopic");
        return this.api.closeForumTopic(message.chat.id, thread, signal);
      }
      reopenForumTopic(signal) {
        const message = orThrow(this.msg, "reopenForumTopic");
        const thread = orThrow(message.message_thread_id, "reopenForumTopic");
        return this.api.reopenForumTopic(message.chat.id, thread, signal);
      }
      deleteForumTopic(signal) {
        const message = orThrow(this.msg, "deleteForumTopic");
        const thread = orThrow(message.message_thread_id, "deleteForumTopic");
        return this.api.deleteForumTopic(message.chat.id, thread, signal);
      }
      unpinAllForumTopicMessages(signal) {
        const message = orThrow(this.msg, "unpinAllForumTopicMessages");
        const thread = orThrow(message.message_thread_id, "unpinAllForumTopicMessages");
        return this.api.unpinAllForumTopicMessages(message.chat.id, thread, signal);
      }
      editGeneralForumTopic(name, signal) {
        return this.api.editGeneralForumTopic(orThrow(this.chatId, "editGeneralForumTopic"), name, signal);
      }
      closeGeneralForumTopic(signal) {
        return this.api.closeGeneralForumTopic(orThrow(this.chatId, "closeGeneralForumTopic"), signal);
      }
      reopenGeneralForumTopic(signal) {
        return this.api.reopenGeneralForumTopic(orThrow(this.chatId, "reopenGeneralForumTopic"), signal);
      }
      hideGeneralForumTopic(signal) {
        return this.api.hideGeneralForumTopic(orThrow(this.chatId, "hideGeneralForumTopic"), signal);
      }
      unhideGeneralForumTopic(signal) {
        return this.api.unhideGeneralForumTopic(orThrow(this.chatId, "unhideGeneralForumTopic"), signal);
      }
      unpinAllGeneralForumTopicMessages(signal) {
        return this.api.unpinAllGeneralForumTopicMessages(orThrow(this.chatId, "unpinAllGeneralForumTopicMessages"), signal);
      }
      answerCallbackQuery(other, signal) {
        return this.api.answerCallbackQuery(orThrow(this.callbackQuery, "answerCallbackQuery").id, typeof other === "string" ? {
          text: other
        } : other, signal);
      }
      answerGuestQuery(result, signal) {
        return this.api.answerGuestQuery(orThrow(this.guestMessage?.guest_query_id, "answerGuestQuery"), result, signal);
      }
      setChatMenuButton(other, signal) {
        return this.api.setChatMenuButton(other, signal);
      }
      getChatMenuButton(other, signal) {
        return this.api.getChatMenuButton(other, signal);
      }
      setMyDefaultAdministratorRights(other, signal) {
        return this.api.setMyDefaultAdministratorRights(other, signal);
      }
      getMyDefaultAdministratorRights(other, signal) {
        return this.api.getMyDefaultAdministratorRights(other, signal);
      }
      editMessageText(text, other, signal) {
        const inlineId = this.inlineMessageId;
        return inlineId !== void 0 ? this.api.editMessageTextInline(inlineId, text, {
          business_connection_id: this.businessConnectionId,
          ...other
        }, signal) : this.api.editMessageText(orThrow(this.chatId, "editMessageText"), orThrow(this.msg?.message_id ?? this.messageReaction?.message_id ?? this.messageReactionCount?.message_id, "editMessageText"), text, {
          business_connection_id: this.businessConnectionId,
          ...other
        }, signal);
      }
      editMessageCaption(other, signal) {
        const inlineId = this.inlineMessageId;
        return inlineId !== void 0 ? this.api.editMessageCaptionInline(inlineId, {
          business_connection_id: this.businessConnectionId,
          ...other
        }, signal) : this.api.editMessageCaption(orThrow(this.chatId, "editMessageCaption"), orThrow(this.msg?.message_id ?? this.messageReaction?.message_id ?? this.messageReactionCount?.message_id, "editMessageCaption"), {
          business_connection_id: this.businessConnectionId,
          ...other
        }, signal);
      }
      editMessageMedia(media, other, signal) {
        const inlineId = this.inlineMessageId;
        return inlineId !== void 0 ? this.api.editMessageMediaInline(inlineId, media, {
          business_connection_id: this.businessConnectionId,
          ...other
        }, signal) : this.api.editMessageMedia(orThrow(this.chatId, "editMessageMedia"), orThrow(this.msg?.message_id ?? this.messageReaction?.message_id ?? this.messageReactionCount?.message_id, "editMessageMedia"), media, {
          business_connection_id: this.businessConnectionId,
          ...other
        }, signal);
      }
      editMessageReplyMarkup(other, signal) {
        const inlineId = this.inlineMessageId;
        return inlineId !== void 0 ? this.api.editMessageReplyMarkupInline(inlineId, {
          business_connection_id: this.businessConnectionId,
          ...other
        }, signal) : this.api.editMessageReplyMarkup(orThrow(this.chatId, "editMessageReplyMarkup"), orThrow(this.msg?.message_id ?? this.messageReaction?.message_id ?? this.messageReactionCount?.message_id, "editMessageReplyMarkup"), {
          business_connection_id: this.businessConnectionId,
          ...other
        }, signal);
      }
      stopPoll(other, signal) {
        return this.api.stopPoll(orThrow(this.chatId, "stopPoll"), orThrow(this.msg?.message_id ?? this.messageReaction?.message_id ?? this.messageReactionCount?.message_id, "stopPoll"), {
          business_connection_id: this.businessConnectionId,
          ...other
        }, signal);
      }
      deleteMessage(signal) {
        return this.api.deleteMessage(orThrow(this.chatId, "deleteMessage"), orThrow(this.msg?.message_id ?? this.messageReaction?.message_id ?? this.messageReactionCount?.message_id, "deleteMessage"), signal);
      }
      deleteMessages(message_ids, signal) {
        return this.api.deleteMessages(orThrow(this.chatId, "deleteMessages"), message_ids, signal);
      }
      deleteMessageReaction(other, signal) {
        const reaction = orThrow(this.messageReaction, "deleteMessageReaction");
        if (reaction.user !== void 0) {
          return this.deleteMessageReactionUser(reaction.user.id, other, signal);
        } else if (reaction.actor_chat !== void 0) {
          return this.deleteMessageReactionChat(reaction.actor_chat.id, other, signal);
        } else {
          throw new Error("Missing information from message_reaction update for API call to deleteMessageReaction");
        }
      }
      deleteMessageReactionUser(user_id, other, signal) {
        return this.api.deleteMessageReactionUser(orThrow(this.chatId, "deleteMessageReactionUser"), orThrow(this.msgId, "deleteMessageReactionUser"), user_id, other, signal);
      }
      deleteMessageReactionChat(actor_chat_id, other, signal) {
        return this.api.deleteMessageReactionChat(orThrow(this.chatId, "deleteMessageReactionChat"), orThrow(this.msgId, "deleteMessageReactionChat"), actor_chat_id, other, signal);
      }
      deleteAllMessageReactions(other, signal) {
        const chatId = orThrow(this.chatId, "deleteAllMessageReactions");
        const actor = this.messageReaction?.actor_chat ?? this.senderChat ?? this.pollAnswer?.voter_chat;
        if (actor !== void 0) {
          return this.api.deleteAllMessageReactionsChat(chatId, actor.id, other, signal);
        }
        const userId = orThrow(this.from, "deleteAllMessageReactions").id;
        return this.api.deleteAllMessageReactionsUser(chatId, userId, other, signal);
      }
      deleteAllMessageReactionsUser(user_id, other, signal) {
        return this.api.deleteAllMessageReactionsUser(orThrow(this.chatId, "deleteAllMessageReactionsUser"), user_id, other, signal);
      }
      deleteAllMessageReactionsChat(actor_chat_id, other, signal) {
        return this.api.deleteAllMessageReactionsChat(orThrow(this.chatId, "deleteAllMessageReactionsChat"), actor_chat_id, other, signal);
      }
      deleteBusinessMessages(message_ids, signal) {
        return this.api.deleteBusinessMessages(orThrow(this.businessConnectionId, "deleteBusinessMessages"), message_ids, signal);
      }
      setBusinessAccountName(first_name, other, signal) {
        return this.api.setBusinessAccountName(orThrow(this.businessConnectionId, "setBusinessAccountName"), first_name, other, signal);
      }
      setBusinessAccountUsername(username, signal) {
        return this.api.setBusinessAccountUsername(orThrow(this.businessConnectionId, "setBusinessAccountUsername"), username, signal);
      }
      setBusinessAccountBio(bio, signal) {
        return this.api.setBusinessAccountBio(orThrow(this.businessConnectionId, "setBusinessAccountBio"), bio, signal);
      }
      setBusinessAccountProfilePhoto(photo, other, signal) {
        return this.api.setBusinessAccountProfilePhoto(orThrow(this.businessConnectionId, "setBusinessAccountProfilePhoto"), photo, other, signal);
      }
      removeBusinessAccountProfilePhoto(other, signal) {
        return this.api.removeBusinessAccountProfilePhoto(orThrow(this.businessConnectionId, "removeBusinessAccountProfilePhoto"), other, signal);
      }
      setBusinessAccountGiftSettings(show_gift_button, accepted_gift_types, signal) {
        return this.api.setBusinessAccountGiftSettings(orThrow(this.businessConnectionId, "setBusinessAccountGiftSettings"), show_gift_button, accepted_gift_types, signal);
      }
      getBusinessAccountStarBalance(signal) {
        return this.api.getBusinessAccountStarBalance(orThrow(this.businessConnectionId, "getBusinessAccountStarBalance"), signal);
      }
      transferBusinessAccountStars(star_count, signal) {
        return this.api.transferBusinessAccountStars(orThrow(this.businessConnectionId, "transferBusinessAccountStars"), star_count, signal);
      }
      getBusinessAccountGifts(other, signal) {
        return this.api.getBusinessAccountGifts(orThrow(this.businessConnectionId, "getBusinessAccountGifts"), other, signal);
      }
      convertGiftToStars(owned_gift_id, signal) {
        return this.api.convertGiftToStars(orThrow(this.businessConnectionId, "convertGiftToStars"), owned_gift_id, signal);
      }
      upgradeGift(owned_gift_id, other, signal) {
        return this.api.upgradeGift(orThrow(this.businessConnectionId, "upgradeGift"), owned_gift_id, other, signal);
      }
      transferGift(owned_gift_id, new_owner_chat_id, star_count, signal) {
        return this.api.transferGift(orThrow(this.businessConnectionId, "transferGift"), owned_gift_id, new_owner_chat_id, star_count, signal);
      }
      postStory(content, active_period, other, signal) {
        return this.api.postStory(orThrow(this.businessConnectionId, "postStory"), content, active_period, other, signal);
      }
      repostStory(active_period, other, signal) {
        const story = orThrow(this.msg?.story, "repostStory");
        return this.api.repostStory(orThrow(this.businessConnectionId, "repostStory"), story.chat.id, story.id, active_period, other, signal);
      }
      editStory(story_id, content, other, signal) {
        return this.api.editStory(orThrow(this.businessConnectionId, "editStory"), story_id, content, other, signal);
      }
      deleteStory(story_id, signal) {
        return this.api.deleteStory(orThrow(this.businessConnectionId, "deleteStory"), story_id, signal);
      }
      replyWithSticker(sticker, other, signal) {
        const msg = this.msg;
        return this.api.sendSticker(orThrow(this.chatId, "sendSticker"), sticker, {
          business_connection_id: this.businessConnectionId,
          ...msg?.is_topic_message ? {
            message_thread_id: msg.message_thread_id
          } : {},
          direct_messages_topic_id: msg?.direct_messages_topic?.topic_id,
          ...other
        }, signal);
      }
      getCustomEmojiStickers(signal) {
        return this.api.getCustomEmojiStickers((this.msg?.entities ?? []).filter((e) => e.type === "custom_emoji").map((e) => e.custom_emoji_id), signal);
      }
      replyWithGift(gift_id, other, signal) {
        return this.api.sendGift(orThrow(this.from, "sendGift").id, gift_id, other, signal);
      }
      giftPremiumSubscription(month_count, star_count, other, signal) {
        return this.api.giftPremiumSubscription(orThrow(this.from, "giftPremiumSubscription").id, month_count, star_count, other, signal);
      }
      replyWithGiftToChannel(gift_id, other, signal) {
        return this.api.sendGiftToChannel(orThrow(this.chat, "sendGift").id, gift_id, other, signal);
      }
      answerInlineQuery(results, other, signal) {
        return this.api.answerInlineQuery(orThrow(this.inlineQuery, "answerInlineQuery").id, results, other, signal);
      }
      savePreparedInlineMessage(result, other, signal) {
        return this.api.savePreparedInlineMessage(orThrow(this.from, "savePreparedInlineMessage").id, result, other, signal);
      }
      savePreparedKeyboardButton(button, signal) {
        return this.api.savePreparedKeyboardButton(orThrow(this.from, "savePreparedKeyboardButton").id, button, signal);
      }
      replyWithInvoice(title3, description, payload, currency, prices, other, signal) {
        const msg = this.msg;
        return this.api.sendInvoice(orThrow(this.chatId, "sendInvoice"), title3, description, payload, currency, prices, {
          ...msg?.is_topic_message ? {
            message_thread_id: msg.message_thread_id
          } : {},
          direct_messages_topic_id: msg?.direct_messages_topic?.topic_id,
          ...other
        }, signal);
      }
      answerShippingQuery(ok2, other, signal) {
        return this.api.answerShippingQuery(orThrow(this.shippingQuery, "answerShippingQuery").id, ok2, other, signal);
      }
      answerPreCheckoutQuery(ok2, other, signal) {
        return this.api.answerPreCheckoutQuery(orThrow(this.preCheckoutQuery, "answerPreCheckoutQuery").id, ok2, typeof other === "string" ? {
          error_message: other
        } : other, signal);
      }
      refundStarPayment(signal) {
        return this.api.refundStarPayment(orThrow(this.from, "refundStarPayment").id, orThrow(this.msg?.successful_payment, "refundStarPayment").telegram_payment_charge_id, signal);
      }
      editUserStarSubscription(telegram_payment_charge_id, is_canceled, signal) {
        return this.api.editUserStarSubscription(orThrow(this.from, "editUserStarSubscription").id, telegram_payment_charge_id, is_canceled, signal);
      }
      verifyUser(other, signal) {
        return this.api.verifyUser(orThrow(this.from, "verifyUser").id, other, signal);
      }
      verifyChat(other, signal) {
        return this.api.verifyChat(orThrow(this.chatId, "verifyChat"), other, signal);
      }
      removeUserVerification(signal) {
        return this.api.removeUserVerification(orThrow(this.from, "removeUserVerification").id, signal);
      }
      removeChatVerification(signal) {
        return this.api.removeChatVerification(orThrow(this.chatId, "removeChatVerification"), signal);
      }
      readBusinessMessage(signal) {
        return this.api.readBusinessMessage(orThrow(this.businessConnectionId, "readBusinessMessage"), orThrow(this.chatId, "readBusinessMessage"), orThrow(this.msgId, "readBusinessMessage"), signal);
      }
      setPassportDataErrors(errors, signal) {
        return this.api.setPassportDataErrors(orThrow(this.from, "setPassportDataErrors").id, errors, signal);
      }
      replyWithGame(game_short_name, other, signal) {
        const msg = this.msg;
        return this.api.sendGame(orThrow(this.chatId, "sendGame"), game_short_name, {
          business_connection_id: this.businessConnectionId,
          ...msg?.is_topic_message ? {
            message_thread_id: msg.message_thread_id
          } : {},
          ...other
        }, signal);
      }
    };
    __name(orThrow, "orThrow");
    __name(triggerFn, "triggerFn");
    __name(match2, "match");
    __name(toArray, "toArray");
    BotError = class extends Error {
      static {
        __name(this, "BotError");
      }
      error;
      ctx;
      constructor(error3, ctx) {
        super(generateBotErrorMessage(error3));
        this.error = error3;
        this.ctx = ctx;
        this.name = "BotError";
        if (error3 instanceof Error) this.stack = error3.stack;
      }
    };
    __name(generateBotErrorMessage, "generateBotErrorMessage");
    __name(flatten, "flatten");
    __name(concat1, "concat1");
    __name(pass, "pass");
    leaf1 = /* @__PURE__ */ __name(() => Promise.resolve(), "leaf1");
    __name(run, "run");
    Composer = class _Composer {
      static {
        __name(this, "Composer");
      }
      handler;
      constructor(...middleware) {
        this.handler = middleware.length === 0 ? pass : middleware.map(flatten).reduce(concat1);
      }
      middleware() {
        return this.handler;
      }
      use(...middleware) {
        const composer = new _Composer(...middleware);
        this.handler = concat1(this.handler, flatten(composer));
        return composer;
      }
      on(filter, ...middleware) {
        return this.filter(Context2.has.filterQuery(filter), ...middleware);
      }
      hears(trigger, ...middleware) {
        return this.filter(Context2.has.text(trigger), ...middleware);
      }
      command(command, ...middleware) {
        return this.filter(Context2.has.command(command), ...middleware);
      }
      reaction(reaction, ...middleware) {
        return this.filter(Context2.has.reaction(reaction), ...middleware);
      }
      chatType(chatType, ...middleware) {
        return this.filter(Context2.has.chatType(chatType), ...middleware);
      }
      callbackQuery(trigger, ...middleware) {
        return this.filter(Context2.has.callbackQuery(trigger), ...middleware);
      }
      gameQuery(trigger, ...middleware) {
        return this.filter(Context2.has.gameQuery(trigger), ...middleware);
      }
      inlineQuery(trigger, ...middleware) {
        return this.filter(Context2.has.inlineQuery(trigger), ...middleware);
      }
      chosenInlineResult(resultId, ...middleware) {
        return this.filter(Context2.has.chosenInlineResult(resultId), ...middleware);
      }
      preCheckoutQuery(trigger, ...middleware) {
        return this.filter(Context2.has.preCheckoutQuery(trigger), ...middleware);
      }
      shippingQuery(trigger, ...middleware) {
        return this.filter(Context2.has.shippingQuery(trigger), ...middleware);
      }
      filter(predicate, ...middleware) {
        const composer = new _Composer(...middleware);
        this.branch(predicate, composer, pass);
        return composer;
      }
      drop(predicate, ...middleware) {
        return this.filter(async (ctx) => !await predicate(ctx), ...middleware);
      }
      fork(...middleware) {
        const composer = new _Composer(...middleware);
        const fork = flatten(composer);
        this.use((ctx, next) => Promise.all([
          next(),
          run(fork, ctx)
        ]));
        return composer;
      }
      lazy(middlewareFactory) {
        return this.use(async (ctx, next) => {
          const middleware = await middlewareFactory(ctx);
          const arr = Array.isArray(middleware) ? middleware : [
            middleware
          ];
          await flatten(new _Composer(...arr))(ctx, next);
        });
      }
      route(router, routeHandlers, fallback = pass) {
        return this.lazy(async (ctx) => {
          const route = await router(ctx);
          return (route === void 0 || !routeHandlers[route] ? fallback : routeHandlers[route]) ?? [];
        });
      }
      branch(predicate, trueMiddleware, falseMiddleware) {
        return this.lazy(async (ctx) => await predicate(ctx) ? trueMiddleware : falseMiddleware);
      }
      errorBoundary(errorHandler2, ...middleware) {
        const composer = new _Composer(...middleware);
        const bound = flatten(composer);
        this.use(async (ctx, next) => {
          let nextCalled = false;
          const cont = /* @__PURE__ */ __name(() => (nextCalled = true, Promise.resolve()), "cont");
          try {
            await bound(ctx, cont);
          } catch (err) {
            nextCalled = false;
            await errorHandler2(new BotError(err, ctx), cont);
          }
          if (nextCalled) await next();
        });
        return composer;
      }
    };
    s = 1e3;
    m = s * 60;
    h = m * 60;
    d = h * 24;
    w = d * 7;
    y = d * 365.25;
    ms = /* @__PURE__ */ __name(function(val, options) {
      options = options || {};
      var type2 = typeof val;
      if (type2 === "string" && val.length > 0) {
        return parse1(val);
      } else if (type2 === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
    }, "ms");
    __name(parse1, "parse1");
    __name(fmtShort, "fmtShort");
    __name(fmtLong, "fmtLong");
    __name(plural, "plural");
    __name(defaultSetTimout, "defaultSetTimout");
    __name(defaultClearTimeout, "defaultClearTimeout");
    cachedSetTimeout = defaultSetTimout;
    cachedClearTimeout = defaultClearTimeout;
    if (typeof window !== "undefined") {
      globalContext = window;
    } else if (typeof self !== "undefined") {
      globalContext = self;
    } else {
      globalContext = {};
    }
    if (typeof globalContext.setTimeout === "function") {
      cachedSetTimeout = setTimeout;
    }
    if (typeof globalContext.clearTimeout === "function") {
      cachedClearTimeout = clearTimeout;
    }
    __name(runTimeout, "runTimeout");
    __name(runClearTimeout, "runClearTimeout");
    queue = [];
    draining = false;
    queueIndex = -1;
    __name(cleanUpNextTick, "cleanUpNextTick");
    __name(drainQueue, "drainQueue");
    __name(nextTick2, "nextTick");
    __name(Item, "Item");
    Item.prototype.run = function() {
      this.fun.apply(null, this.array);
    };
    title2 = "browser";
    platform3 = "browser";
    browser = true;
    argv2 = [];
    version3 = "";
    versions2 = {};
    release3 = {};
    config3 = {};
    __name(noop, "noop");
    on2 = noop;
    addListener2 = noop;
    once2 = noop;
    off2 = noop;
    removeListener2 = noop;
    removeAllListeners2 = noop;
    emit2 = noop;
    __name(binding2, "binding");
    __name(cwd2, "cwd");
    __name(chdir2, "chdir");
    __name(umask2, "umask");
    performance2 = globalContext.performance || {};
    performanceNow = performance2.now || performance2.mozNow || performance2.msNow || performance2.oNow || performance2.webkitNow || function() {
      return (/* @__PURE__ */ new Date()).getTime();
    };
    __name(hrtime4, "hrtime");
    startTime = /* @__PURE__ */ new Date();
    __name(uptime3, "uptime");
    process2 = {
      nextTick: nextTick2,
      title: title2,
      browser,
      env: {
        NODE_ENV: "production"
      },
      argv: argv2,
      version: version3,
      versions: versions2,
      on: on2,
      addListener: addListener2,
      once: once2,
      off: off2,
      removeListener: removeListener2,
      removeAllListeners: removeAllListeners2,
      emit: emit2,
      binding: binding2,
      cwd: cwd2,
      chdir: chdir2,
      umask: umask2,
      hrtime: hrtime4,
      platform: platform3,
      release: release3,
      config: config3,
      uptime: uptime3
    };
    __name(createCommonjsModule, "createCommonjsModule");
    __name(commonjsRequire, "commonjsRequire");
    __name(setup, "setup");
    common = setup;
    browser$1 = createCommonjsModule(function(module, exports) {
      exports.formatArgs = formatArgs2;
      exports.save = save2;
      exports.load = load2;
      exports.useColors = useColors2;
      exports.storage = localstorage();
      exports.destroy = /* @__PURE__ */ (() => {
        let warned = false;
        return () => {
          if (!warned) {
            warned = true;
            console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
          }
        };
      })();
      exports.colors = [
        "#0000CC",
        "#0000FF",
        "#0033CC",
        "#0033FF",
        "#0066CC",
        "#0066FF",
        "#0099CC",
        "#0099FF",
        "#00CC00",
        "#00CC33",
        "#00CC66",
        "#00CC99",
        "#00CCCC",
        "#00CCFF",
        "#3300CC",
        "#3300FF",
        "#3333CC",
        "#3333FF",
        "#3366CC",
        "#3366FF",
        "#3399CC",
        "#3399FF",
        "#33CC00",
        "#33CC33",
        "#33CC66",
        "#33CC99",
        "#33CCCC",
        "#33CCFF",
        "#6600CC",
        "#6600FF",
        "#6633CC",
        "#6633FF",
        "#66CC00",
        "#66CC33",
        "#9900CC",
        "#9900FF",
        "#9933CC",
        "#9933FF",
        "#99CC00",
        "#99CC33",
        "#CC0000",
        "#CC0033",
        "#CC0066",
        "#CC0099",
        "#CC00CC",
        "#CC00FF",
        "#CC3300",
        "#CC3333",
        "#CC3366",
        "#CC3399",
        "#CC33CC",
        "#CC33FF",
        "#CC6600",
        "#CC6633",
        "#CC9900",
        "#CC9933",
        "#CCCC00",
        "#CCCC33",
        "#FF0000",
        "#FF0033",
        "#FF0066",
        "#FF0099",
        "#FF00CC",
        "#FF00FF",
        "#FF3300",
        "#FF3333",
        "#FF3366",
        "#FF3399",
        "#FF33CC",
        "#FF33FF",
        "#FF6600",
        "#FF6633",
        "#FF9900",
        "#FF9933",
        "#FFCC00",
        "#FFCC33"
      ];
      function useColors2() {
        if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
          return true;
        }
        if (typeof navigator !== "undefined" && "Cloudflare-Workers" && "Cloudflare-Workers".toLowerCase().match(/(edge|trident)\/(\d+)/)) {
          return false;
        }
        let m2;
        return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && "Cloudflare-Workers" && (m2 = "Cloudflare-Workers".toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m2[1], 10) >= 31 || typeof navigator !== "undefined" && "Cloudflare-Workers" && "Cloudflare-Workers".toLowerCase().match(/applewebkit\/(\d+)/);
      }
      __name(useColors2, "useColors2");
      function formatArgs2(args) {
        args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
        if (!this.useColors) {
          return;
        }
        const c = "color: " + this.color;
        args.splice(1, 0, c, "color: inherit");
        let index = 0;
        let lastC = 0;
        args[0].replace(/%[a-zA-Z%]/g, (match3) => {
          if (match3 === "%%") {
            return;
          }
          index++;
          if (match3 === "%c") {
            lastC = index;
          }
        });
        args.splice(lastC, 0, c);
      }
      __name(formatArgs2, "formatArgs2");
      exports.log = console.debug || console.log || (() => {
      });
      function save2(namespaces) {
        try {
          if (namespaces) {
            exports.storage.setItem("debug", namespaces);
          } else {
            exports.storage.removeItem("debug");
          }
        } catch (error3) {
        }
      }
      __name(save2, "save2");
      function load2() {
        let r;
        try {
          r = exports.storage.getItem("debug") || exports.storage.getItem("DEBUG");
        } catch (error3) {
        }
        if (!r && typeof process2 !== "undefined" && "env" in process2) {
          r = process2.env.DEBUG;
        }
        return r;
      }
      __name(load2, "load2");
      function localstorage() {
        try {
          return localStorage;
        } catch (error3) {
        }
      }
      __name(localstorage, "localstorage");
      module.exports = common(exports);
      const { formatters } = module.exports;
      formatters.j = function(v) {
        try {
          return JSON.stringify(v);
        } catch (error3) {
          return "[UnexpectedJSONParseError]: " + error3.message;
        }
      };
    });
    browser$1.colors;
    browser$1.destroy;
    browser$1.formatArgs;
    browser$1.load;
    browser$1.log;
    browser$1.save;
    browser$1.storage;
    browser$1.useColors;
    itrToStream = /* @__PURE__ */ __name((itr) => {
      const it = itr[Symbol.asyncIterator]();
      return new ReadableStream({
        async pull(controller) {
          const chunk = await it.next();
          if (chunk.done) controller.close();
          else controller.enqueue(chunk.value);
        }
      });
    }, "itrToStream");
    baseFetchConfig = /* @__PURE__ */ __name((_apiRoot) => ({}), "baseFetchConfig");
    debug3 = browser$1("grammy:warn");
    GrammyError = class extends Error {
      static {
        __name(this, "GrammyError");
      }
      method;
      payload;
      ok;
      error_code;
      description;
      parameters;
      constructor(message, err, method, payload) {
        super(`${message} (${err.error_code}: ${err.description})`);
        this.method = method;
        this.payload = payload;
        this.ok = false;
        this.name = "GrammyError";
        this.error_code = err.error_code;
        this.description = err.description;
        this.parameters = err.parameters ?? {};
      }
    };
    __name(toGrammyError, "toGrammyError");
    HttpError = class extends Error {
      static {
        __name(this, "HttpError");
      }
      error;
      constructor(message, error3) {
        super(message);
        this.error = error3;
        this.name = "HttpError";
      }
    };
    __name(isTelegramError, "isTelegramError");
    __name(toHttpError, "toHttpError");
    __name(checkWindows, "checkWindows");
    isWindows = checkWindows();
    __name(assertPath, "assertPath");
    __name(stripSuffix, "stripSuffix");
    __name(lastPathSegment, "lastPathSegment");
    __name(assertArgs, "assertArgs");
    __name(assertArg, "assertArg");
    __name(fromFileUrl, "fromFileUrl");
    __name(stripTrailingSeparators, "stripTrailingSeparators");
    __name(isPosixPathSeparator, "isPosixPathSeparator");
    __name(basename, "basename");
    __name(isPathSeparator, "isPathSeparator");
    __name(isWindowsDeviceRoot, "isWindowsDeviceRoot");
    __name(fromFileUrl1, "fromFileUrl1");
    __name(basename1, "basename1");
    __name(basename2, "basename2");
    InputFile = class {
      static {
        __name(this, "InputFile");
      }
      consumed = false;
      fileData;
      filename;
      constructor(file, filename) {
        this.fileData = file;
        filename ??= this.guessFilename(file);
        this.filename = filename;
      }
      guessFilename(file) {
        if (typeof file === "string") return basename2(file);
        if (typeof file !== "object") return void 0;
        if ("url" in file) return basename2(file.url);
        if (!(file instanceof URL)) return void 0;
        return basename2(file.pathname) || basename2(file.hostname);
      }
      toRaw() {
        if (this.consumed) {
          throw new Error("Cannot reuse InputFile data source!");
        }
        const data = this.fileData;
        if (data instanceof Blob) return data.stream();
        if (data instanceof URL) return fetchFile(data);
        if ("url" in data) return fetchFile(data.url);
        if (!(data instanceof Uint8Array)) this.consumed = true;
        return data;
      }
      toJSON() {
        throw new Error("InputFile instances must be sent via grammY");
      }
    };
    __name(fetchFile, "fetchFile");
    __name(requiresFormDataUpload, "requiresFormDataUpload");
    __name(str, "str");
    __name(createJsonPayload, "createJsonPayload");
    __name(protectItr, "protectItr");
    __name(createFormDataPayload, "createFormDataPayload");
    __name(createBoundary, "createBoundary");
    __name(randomId, "randomId");
    enc = new TextEncoder();
    __name(payloadToMultipartItr, "payloadToMultipartItr");
    __name(collectFiles, "collectFiles");
    __name(valuePart, "valuePart");
    __name(filePart, "filePart");
    __name(getExt, "getExt");
    debug1 = browser$1("grammy:core");
    __name(concatTransformer, "concatTransformer");
    ApiClient = class {
      static {
        __name(this, "ApiClient");
      }
      token;
      webhookReplyEnvelope;
      options;
      fetch;
      hasUsedWebhookReply;
      installedTransformers;
      constructor(token, options = {}, webhookReplyEnvelope = {}) {
        this.token = token;
        this.webhookReplyEnvelope = webhookReplyEnvelope;
        this.hasUsedWebhookReply = false;
        this.installedTransformers = [];
        this.call = async (method, p, signal) => {
          const payload = p ?? {};
          debug1(`Calling ${method}`);
          if (signal !== void 0) validateSignal(method, payload, signal);
          const opts = this.options;
          const formDataRequired = requiresFormDataUpload(payload);
          if (this.webhookReplyEnvelope.send !== void 0 && !this.hasUsedWebhookReply && !formDataRequired && opts.canUseWebhookReply(method)) {
            this.hasUsedWebhookReply = true;
            const config5 = createJsonPayload({
              ...payload,
              method
            });
            await this.webhookReplyEnvelope.send(config5.body);
            return {
              ok: true,
              result: true
            };
          }
          const controller = createAbortControllerFromSignal(signal);
          const timeout = createTimeout(controller, opts.timeoutSeconds, method);
          const streamErr = createStreamError(controller);
          const url = opts.buildUrl(opts.apiRoot, this.token, method, opts.environment);
          const config4 = formDataRequired ? createFormDataPayload(payload, (err) => streamErr.catch(err)) : createJsonPayload(payload);
          const sig = controller.signal;
          const options2 = {
            ...opts.baseFetchConfig,
            signal: sig,
            ...config4
          };
          const successPromise = this.fetch(url, options2).then((res) => res.json());
          const operations = [
            successPromise,
            streamErr.promise,
            timeout.promise
          ];
          try {
            return await Promise.race(operations);
          } catch (error3) {
            throw toHttpError(method, opts.sensitiveLogs, error3);
          } finally {
            if (timeout.handle !== void 0) clearTimeout(timeout.handle);
          }
        };
        const apiRoot = options.apiRoot ?? "https://api.telegram.org";
        const environment = options.environment ?? "prod";
        const { fetch: customFetch } = options;
        const fetchFn = customFetch ?? fetch;
        this.options = {
          apiRoot,
          environment,
          buildUrl: options.buildUrl ?? defaultBuildUrl,
          timeoutSeconds: options.timeoutSeconds ?? 500,
          baseFetchConfig: {
            ...baseFetchConfig(apiRoot),
            ...options.baseFetchConfig
          },
          canUseWebhookReply: options.canUseWebhookReply ?? (() => false),
          sensitiveLogs: options.sensitiveLogs ?? false,
          fetch: /* @__PURE__ */ __name((...args) => fetchFn(...args), "fetch")
        };
        this.fetch = this.options.fetch;
        if (this.options.apiRoot.endsWith("/")) {
          throw new Error(`Remove the trailing '/' from the 'apiRoot' option (use '${this.options.apiRoot.substring(0, this.options.apiRoot.length - 1)}' instead of '${this.options.apiRoot}')`);
        }
      }
      call;
      use(...transformers) {
        this.call = transformers.reduce(concatTransformer, this.call);
        this.installedTransformers.push(...transformers);
        return this;
      }
      async callApi(method, payload, signal) {
        const data = await this.call(method, payload, signal);
        if (data.ok) return data.result;
        else throw toGrammyError(data, method, payload);
      }
    };
    __name(createRawApi, "createRawApi");
    defaultBuildUrl = /* @__PURE__ */ __name((root, token, method, env2) => {
      const prefix = env2 === "test" ? "test/" : "";
      return `${root}/bot${token}/${prefix}${method}`;
    }, "defaultBuildUrl");
    proxyMethods = {
      set() {
        return false;
      },
      defineProperty() {
        return false;
      },
      deleteProperty() {
        return false;
      },
      ownKeys() {
        return [];
      }
    };
    __name(createTimeout, "createTimeout");
    __name(createStreamError, "createStreamError");
    __name(createAbortControllerFromSignal, "createAbortControllerFromSignal");
    __name(validateSignal, "validateSignal");
    Api = class {
      static {
        __name(this, "Api");
      }
      token;
      options;
      raw;
      config;
      constructor(token, options, webhookReplyEnvelope) {
        this.token = token;
        this.options = options;
        const { raw: raw2, use, installedTransformers } = createRawApi(token, options, webhookReplyEnvelope);
        this.raw = raw2;
        this.config = {
          use,
          installedTransformers: /* @__PURE__ */ __name(() => installedTransformers.slice(), "installedTransformers")
        };
      }
      getUpdates(other, signal) {
        return this.raw.getUpdates({
          ...other
        }, signal);
      }
      setWebhook(url, other, signal) {
        return this.raw.setWebhook({
          url,
          ...other
        }, signal);
      }
      deleteWebhook(other, signal) {
        return this.raw.deleteWebhook({
          ...other
        }, signal);
      }
      getWebhookInfo(signal) {
        return this.raw.getWebhookInfo(signal);
      }
      getMe(signal) {
        return this.raw.getMe(signal);
      }
      logOut(signal) {
        return this.raw.logOut(signal);
      }
      close(signal) {
        return this.raw.close(signal);
      }
      sendMessage(chat_id, text, other, signal) {
        return this.raw.sendMessage({
          chat_id,
          text,
          ...other
        }, signal);
      }
      sendRichMessage(chat_id, rich_message, other, signal) {
        return this.raw.sendRichMessage({
          chat_id,
          rich_message,
          ...other
        }, signal);
      }
      forwardMessage(chat_id, from_chat_id, message_id, other, signal) {
        return this.raw.forwardMessage({
          chat_id,
          from_chat_id,
          message_id,
          ...other
        }, signal);
      }
      forwardMessages(chat_id, from_chat_id, message_ids, other, signal) {
        return this.raw.forwardMessages({
          chat_id,
          from_chat_id,
          message_ids,
          ...other
        }, signal);
      }
      copyMessage(chat_id, from_chat_id, message_id, other, signal) {
        return this.raw.copyMessage({
          chat_id,
          from_chat_id,
          message_id,
          ...other
        }, signal);
      }
      copyMessages(chat_id, from_chat_id, message_ids, other, signal) {
        return this.raw.copyMessages({
          chat_id,
          from_chat_id,
          message_ids,
          ...other
        }, signal);
      }
      sendPhoto(chat_id, photo, other, signal) {
        return this.raw.sendPhoto({
          chat_id,
          photo,
          ...other
        }, signal);
      }
      sendLivePhoto(chat_id, live_photo, photo, other, signal) {
        return this.raw.sendLivePhoto({
          chat_id,
          live_photo,
          photo,
          ...other
        }, signal);
      }
      sendAudio(chat_id, audio, other, signal) {
        return this.raw.sendAudio({
          chat_id,
          audio,
          ...other
        }, signal);
      }
      sendDocument(chat_id, document1, other, signal) {
        return this.raw.sendDocument({
          chat_id,
          document: document1,
          ...other
        }, signal);
      }
      sendVideo(chat_id, video, other, signal) {
        return this.raw.sendVideo({
          chat_id,
          video,
          ...other
        }, signal);
      }
      sendAnimation(chat_id, animation, other, signal) {
        return this.raw.sendAnimation({
          chat_id,
          animation,
          ...other
        }, signal);
      }
      sendVoice(chat_id, voice, other, signal) {
        return this.raw.sendVoice({
          chat_id,
          voice,
          ...other
        }, signal);
      }
      sendVideoNote(chat_id, video_note, other, signal) {
        return this.raw.sendVideoNote({
          chat_id,
          video_note,
          ...other
        }, signal);
      }
      sendPaidMedia(chat_id, star_count, media, other, signal) {
        return this.raw.sendPaidMedia({
          chat_id,
          star_count,
          media,
          ...other
        }, signal);
      }
      sendMediaGroup(chat_id, media, other, signal) {
        return this.raw.sendMediaGroup({
          chat_id,
          media,
          ...other
        }, signal);
      }
      sendLocation(chat_id, latitude, longitude, other, signal) {
        return this.raw.sendLocation({
          chat_id,
          latitude,
          longitude,
          ...other
        }, signal);
      }
      editMessageLiveLocation(chat_id, message_id, latitude, longitude, other, signal) {
        return this.raw.editMessageLiveLocation({
          chat_id,
          message_id,
          latitude,
          longitude,
          ...other
        }, signal);
      }
      editMessageLiveLocationInline(inline_message_id, latitude, longitude, other, signal) {
        return this.raw.editMessageLiveLocation({
          inline_message_id,
          latitude,
          longitude,
          ...other
        }, signal);
      }
      stopMessageLiveLocation(chat_id, message_id, other, signal) {
        return this.raw.stopMessageLiveLocation({
          chat_id,
          message_id,
          ...other
        }, signal);
      }
      stopMessageLiveLocationInline(inline_message_id, other, signal) {
        return this.raw.stopMessageLiveLocation({
          inline_message_id,
          ...other
        }, signal);
      }
      sendVenue(chat_id, latitude, longitude, title3, address, other, signal) {
        return this.raw.sendVenue({
          chat_id,
          latitude,
          longitude,
          title: title3,
          address,
          ...other
        }, signal);
      }
      sendContact(chat_id, phone_number, first_name, other, signal) {
        return this.raw.sendContact({
          chat_id,
          phone_number,
          first_name,
          ...other
        }, signal);
      }
      sendPoll(chat_id, question, options, other, signal) {
        const opts = options.map((o) => typeof o === "string" ? {
          text: o
        } : o);
        return this.raw.sendPoll({
          chat_id,
          question,
          options: opts,
          ...other
        }, signal);
      }
      sendChecklist(business_connection_id, chat_id, checklist, other, signal) {
        return this.raw.sendChecklist({
          business_connection_id,
          chat_id,
          checklist,
          ...other
        }, signal);
      }
      editMessageChecklist(business_connection_id, chat_id, message_id, checklist, other, signal) {
        return this.raw.editMessageChecklist({
          business_connection_id,
          chat_id,
          message_id,
          checklist,
          ...other
        }, signal);
      }
      sendDice(chat_id, emoji, other, signal) {
        return this.raw.sendDice({
          chat_id,
          emoji,
          ...other
        }, signal);
      }
      setMessageReaction(chat_id, message_id, reaction, other, signal) {
        return this.raw.setMessageReaction({
          chat_id,
          message_id,
          reaction,
          ...other
        }, signal);
      }
      sendMessageDraft(chat_id, draft_id, text, other, signal) {
        return this.raw.sendMessageDraft({
          chat_id,
          draft_id,
          text,
          ...other
        }, signal);
      }
      sendRichMessageDraft(chat_id, draft_id, rich_message, other, signal) {
        return this.raw.sendRichMessageDraft({
          chat_id,
          draft_id,
          rich_message,
          ...other
        }, signal);
      }
      sendChatAction(chat_id, action, other, signal) {
        return this.raw.sendChatAction({
          chat_id,
          action,
          ...other
        }, signal);
      }
      getUserProfilePhotos(user_id, other, signal) {
        return this.raw.getUserProfilePhotos({
          user_id,
          ...other
        }, signal);
      }
      getUserProfileAudios(user_id, other, signal) {
        return this.raw.getUserProfileAudios({
          user_id,
          ...other
        }, signal);
      }
      setUserEmojiStatus(user_id, other, signal) {
        return this.raw.setUserEmojiStatus({
          user_id,
          ...other
        }, signal);
      }
      getUserChatBoosts(chat_id, user_id, signal) {
        return this.raw.getUserChatBoosts({
          chat_id,
          user_id
        }, signal);
      }
      getUserGifts(user_id, other, signal) {
        return this.raw.getUserGifts({
          user_id,
          ...other
        }, signal);
      }
      getChatGifts(chat_id, other, signal) {
        return this.raw.getChatGifts({
          chat_id,
          ...other
        }, signal);
      }
      getBusinessConnection(business_connection_id, signal) {
        return this.raw.getBusinessConnection({
          business_connection_id
        }, signal);
      }
      getManagedBotToken(user_id, signal) {
        return this.raw.getManagedBotToken({
          user_id
        }, signal);
      }
      replaceManagedBotToken(user_id, signal) {
        return this.raw.replaceManagedBotToken({
          user_id
        }, signal);
      }
      getManagedBotAccessSettings(user_id, signal) {
        return this.raw.getManagedBotAccessSettings({
          user_id
        }, signal);
      }
      setManagedBotAccessSettings(user_id, is_access_restricted, other, signal) {
        return this.raw.setManagedBotAccessSettings({
          user_id,
          is_access_restricted,
          ...other
        }, signal);
      }
      getFile(file_id, signal) {
        return this.raw.getFile({
          file_id
        }, signal);
      }
      kickChatMember(...args) {
        return this.banChatMember(...args);
      }
      banChatMember(chat_id, user_id, other, signal) {
        return this.raw.banChatMember({
          chat_id,
          user_id,
          ...other
        }, signal);
      }
      unbanChatMember(chat_id, user_id, other, signal) {
        return this.raw.unbanChatMember({
          chat_id,
          user_id,
          ...other
        }, signal);
      }
      restrictChatMember(chat_id, user_id, permissions, other, signal) {
        return this.raw.restrictChatMember({
          chat_id,
          user_id,
          permissions,
          ...other
        }, signal);
      }
      promoteChatMember(chat_id, user_id, other, signal) {
        return this.raw.promoteChatMember({
          chat_id,
          user_id,
          ...other
        }, signal);
      }
      setChatAdministratorCustomTitle(chat_id, user_id, custom_title, signal) {
        return this.raw.setChatAdministratorCustomTitle({
          chat_id,
          user_id,
          custom_title
        }, signal);
      }
      setChatMemberTag(chat_id, user_id, tag, signal) {
        return this.raw.setChatMemberTag({
          chat_id,
          user_id,
          tag
        }, signal);
      }
      banChatSenderChat(chat_id, sender_chat_id, signal) {
        return this.raw.banChatSenderChat({
          chat_id,
          sender_chat_id
        }, signal);
      }
      unbanChatSenderChat(chat_id, sender_chat_id, signal) {
        return this.raw.unbanChatSenderChat({
          chat_id,
          sender_chat_id
        }, signal);
      }
      setChatPermissions(chat_id, permissions, other, signal) {
        return this.raw.setChatPermissions({
          chat_id,
          permissions,
          ...other
        }, signal);
      }
      exportChatInviteLink(chat_id, signal) {
        return this.raw.exportChatInviteLink({
          chat_id
        }, signal);
      }
      createChatInviteLink(chat_id, other, signal) {
        return this.raw.createChatInviteLink({
          chat_id,
          ...other
        }, signal);
      }
      editChatInviteLink(chat_id, invite_link, other, signal) {
        return this.raw.editChatInviteLink({
          chat_id,
          invite_link,
          ...other
        }, signal);
      }
      createChatSubscriptionInviteLink(chat_id, subscription_period, subscription_price, other, signal) {
        return this.raw.createChatSubscriptionInviteLink({
          chat_id,
          subscription_period,
          subscription_price,
          ...other
        }, signal);
      }
      editChatSubscriptionInviteLink(chat_id, invite_link, other, signal) {
        return this.raw.editChatSubscriptionInviteLink({
          chat_id,
          invite_link,
          ...other
        }, signal);
      }
      revokeChatInviteLink(chat_id, invite_link, signal) {
        return this.raw.revokeChatInviteLink({
          chat_id,
          invite_link
        }, signal);
      }
      approveChatJoinRequest(chat_id, user_id, signal) {
        return this.raw.approveChatJoinRequest({
          chat_id,
          user_id
        }, signal);
      }
      declineChatJoinRequest(chat_id, user_id, signal) {
        return this.raw.declineChatJoinRequest({
          chat_id,
          user_id
        }, signal);
      }
      answerChatJoinRequestQuery(chat_join_request_query_id, result, signal) {
        return this.raw.answerChatJoinRequestQuery({
          chat_join_request_query_id,
          result
        }, signal);
      }
      sendChatJoinRequestWebApp(chat_join_request_query_id, web_app_url, signal) {
        return this.raw.sendChatJoinRequestWebApp({
          chat_join_request_query_id,
          web_app_url
        }, signal);
      }
      approveSuggestedPost(chat_id, message_id, other, signal) {
        return this.raw.approveSuggestedPost({
          chat_id,
          message_id,
          ...other
        }, signal);
      }
      declineSuggestedPost(chat_id, message_id, other, signal) {
        return this.raw.declineSuggestedPost({
          chat_id,
          message_id,
          ...other
        }, signal);
      }
      setChatPhoto(chat_id, photo, signal) {
        return this.raw.setChatPhoto({
          chat_id,
          photo
        }, signal);
      }
      deleteChatPhoto(chat_id, signal) {
        return this.raw.deleteChatPhoto({
          chat_id
        }, signal);
      }
      setChatTitle(chat_id, title3, signal) {
        return this.raw.setChatTitle({
          chat_id,
          title: title3
        }, signal);
      }
      setChatDescription(chat_id, description, signal) {
        return this.raw.setChatDescription({
          chat_id,
          description
        }, signal);
      }
      pinChatMessage(chat_id, message_id, other, signal) {
        return this.raw.pinChatMessage({
          chat_id,
          message_id,
          ...other
        }, signal);
      }
      unpinChatMessage(chat_id, message_id, other, signal) {
        return this.raw.unpinChatMessage({
          chat_id,
          message_id,
          ...other
        }, signal);
      }
      unpinAllChatMessages(chat_id, signal) {
        return this.raw.unpinAllChatMessages({
          chat_id
        }, signal);
      }
      leaveChat(chat_id, signal) {
        return this.raw.leaveChat({
          chat_id
        }, signal);
      }
      getChat(chat_id, signal) {
        return this.raw.getChat({
          chat_id
        }, signal);
      }
      getChatAdministrators(chat_id, other, signal) {
        return this.raw.getChatAdministrators({
          chat_id,
          ...other
        }, signal);
      }
      getChatMembersCount(...args) {
        return this.getChatMemberCount(...args);
      }
      getChatMemberCount(chat_id, signal) {
        return this.raw.getChatMemberCount({
          chat_id
        }, signal);
      }
      getChatMember(chat_id, user_id, signal) {
        return this.raw.getChatMember({
          chat_id,
          user_id
        }, signal);
      }
      getUserPersonalChatMessages(user_id, limit, signal) {
        return this.raw.getUserPersonalChatMessages({
          user_id,
          limit
        }, signal);
      }
      setChatStickerSet(chat_id, sticker_set_name, signal) {
        return this.raw.setChatStickerSet({
          chat_id,
          sticker_set_name
        }, signal);
      }
      deleteChatStickerSet(chat_id, signal) {
        return this.raw.deleteChatStickerSet({
          chat_id
        }, signal);
      }
      getForumTopicIconStickers(signal) {
        return this.raw.getForumTopicIconStickers(signal);
      }
      createForumTopic(chat_id, name, other, signal) {
        return this.raw.createForumTopic({
          chat_id,
          name,
          ...other
        }, signal);
      }
      editForumTopic(chat_id, message_thread_id, other, signal) {
        return this.raw.editForumTopic({
          chat_id,
          message_thread_id,
          ...other
        }, signal);
      }
      closeForumTopic(chat_id, message_thread_id, signal) {
        return this.raw.closeForumTopic({
          chat_id,
          message_thread_id
        }, signal);
      }
      reopenForumTopic(chat_id, message_thread_id, signal) {
        return this.raw.reopenForumTopic({
          chat_id,
          message_thread_id
        }, signal);
      }
      deleteForumTopic(chat_id, message_thread_id, signal) {
        return this.raw.deleteForumTopic({
          chat_id,
          message_thread_id
        }, signal);
      }
      unpinAllForumTopicMessages(chat_id, message_thread_id, signal) {
        return this.raw.unpinAllForumTopicMessages({
          chat_id,
          message_thread_id
        }, signal);
      }
      editGeneralForumTopic(chat_id, name, signal) {
        return this.raw.editGeneralForumTopic({
          chat_id,
          name
        }, signal);
      }
      closeGeneralForumTopic(chat_id, signal) {
        return this.raw.closeGeneralForumTopic({
          chat_id
        }, signal);
      }
      reopenGeneralForumTopic(chat_id, signal) {
        return this.raw.reopenGeneralForumTopic({
          chat_id
        }, signal);
      }
      hideGeneralForumTopic(chat_id, signal) {
        return this.raw.hideGeneralForumTopic({
          chat_id
        }, signal);
      }
      unhideGeneralForumTopic(chat_id, signal) {
        return this.raw.unhideGeneralForumTopic({
          chat_id
        }, signal);
      }
      unpinAllGeneralForumTopicMessages(chat_id, signal) {
        return this.raw.unpinAllGeneralForumTopicMessages({
          chat_id
        }, signal);
      }
      answerCallbackQuery(callback_query_id, other, signal) {
        return this.raw.answerCallbackQuery({
          callback_query_id,
          ...other
        }, signal);
      }
      answerGuestQuery(guest_query_id, result, signal) {
        return this.raw.answerGuestQuery({
          guest_query_id,
          result
        }, signal);
      }
      setMyName(name, other, signal) {
        return this.raw.setMyName({
          name,
          ...other
        }, signal);
      }
      getMyName(other, signal) {
        return this.raw.getMyName(other ?? {}, signal);
      }
      setMyCommands(commands, other, signal) {
        return this.raw.setMyCommands({
          commands,
          ...other
        }, signal);
      }
      deleteMyCommands(other, signal) {
        return this.raw.deleteMyCommands({
          ...other
        }, signal);
      }
      getMyCommands(other, signal) {
        return this.raw.getMyCommands({
          ...other
        }, signal);
      }
      setMyDescription(description, other, signal) {
        return this.raw.setMyDescription({
          description,
          ...other
        }, signal);
      }
      getMyDescription(other, signal) {
        return this.raw.getMyDescription({
          ...other
        }, signal);
      }
      setMyShortDescription(short_description, other, signal) {
        return this.raw.setMyShortDescription({
          short_description,
          ...other
        }, signal);
      }
      getMyShortDescription(other, signal) {
        return this.raw.getMyShortDescription({
          ...other
        }, signal);
      }
      setMyProfilePhoto(photo, signal) {
        return this.raw.setMyProfilePhoto({
          photo
        }, signal);
      }
      removeMyProfilePhoto(signal) {
        return this.raw.removeMyProfilePhoto(signal);
      }
      setChatMenuButton(other, signal) {
        return this.raw.setChatMenuButton({
          ...other
        }, signal);
      }
      getChatMenuButton(other, signal) {
        return this.raw.getChatMenuButton({
          ...other
        }, signal);
      }
      setMyDefaultAdministratorRights(other, signal) {
        return this.raw.setMyDefaultAdministratorRights({
          ...other
        }, signal);
      }
      getMyDefaultAdministratorRights(other, signal) {
        return this.raw.getMyDefaultAdministratorRights({
          ...other
        }, signal);
      }
      getMyStarBalance(signal) {
        return this.raw.getMyStarBalance(signal);
      }
      editMessageText(chat_id, message_id, text_or_rich_message, other, signal) {
        return this.raw.editMessageText(typeof text_or_rich_message === "string" ? {
          chat_id,
          message_id,
          text: text_or_rich_message,
          ...other
        } : {
          chat_id,
          message_id,
          rich_message: text_or_rich_message,
          ...other
        }, signal);
      }
      editMessageTextInline(inline_message_id, text_or_rich_message, other, signal) {
        return this.raw.editMessageText(typeof text_or_rich_message === "string" ? {
          inline_message_id,
          text: text_or_rich_message,
          ...other
        } : {
          inline_message_id,
          rich_message: text_or_rich_message,
          ...other
        }, signal);
      }
      editMessageCaption(chat_id, message_id, other, signal) {
        return this.raw.editMessageCaption({
          chat_id,
          message_id,
          ...other
        }, signal);
      }
      editMessageCaptionInline(inline_message_id, other, signal) {
        return this.raw.editMessageCaption({
          inline_message_id,
          ...other
        }, signal);
      }
      editMessageMedia(chat_id, message_id, media, other, signal) {
        return this.raw.editMessageMedia({
          chat_id,
          message_id,
          media,
          ...other
        }, signal);
      }
      editMessageMediaInline(inline_message_id, media, other, signal) {
        return this.raw.editMessageMedia({
          inline_message_id,
          media,
          ...other
        }, signal);
      }
      editMessageReplyMarkup(chat_id, message_id, other, signal) {
        return this.raw.editMessageReplyMarkup({
          chat_id,
          message_id,
          ...other
        }, signal);
      }
      editMessageReplyMarkupInline(inline_message_id, other, signal) {
        return this.raw.editMessageReplyMarkup({
          inline_message_id,
          ...other
        }, signal);
      }
      stopPoll(chat_id, message_id, other, signal) {
        return this.raw.stopPoll({
          chat_id,
          message_id,
          ...other
        }, signal);
      }
      deleteMessage(chat_id, message_id, signal) {
        return this.raw.deleteMessage({
          chat_id,
          message_id
        }, signal);
      }
      deleteMessages(chat_id, message_ids, signal) {
        return this.raw.deleteMessages({
          chat_id,
          message_ids
        }, signal);
      }
      deleteMessageReactionUser(chat_id, message_id, user_id, other, signal) {
        return this.raw.deleteMessageReaction({
          chat_id,
          message_id,
          user_id,
          ...other
        }, signal);
      }
      deleteMessageReactionChat(chat_id, message_id, actor_chat_id, other, signal) {
        return this.raw.deleteMessageReaction({
          chat_id,
          message_id,
          actor_chat_id,
          ...other
        }, signal);
      }
      deleteAllMessageReactionsUser(chat_id, user_id, other, signal) {
        return this.raw.deleteAllMessageReactions({
          chat_id,
          user_id,
          ...other
        }, signal);
      }
      deleteAllMessageReactionsChat(chat_id, actor_chat_id, other, signal) {
        return this.raw.deleteAllMessageReactions({
          chat_id,
          actor_chat_id,
          ...other
        }, signal);
      }
      deleteBusinessMessages(business_connection_id, message_ids, signal) {
        return this.raw.deleteBusinessMessages({
          business_connection_id,
          message_ids
        }, signal);
      }
      setBusinessAccountName(business_connection_id, first_name, other, signal) {
        return this.raw.setBusinessAccountName({
          business_connection_id,
          first_name,
          ...other
        }, signal);
      }
      setBusinessAccountUsername(business_connection_id, username, signal) {
        return this.raw.setBusinessAccountUsername({
          business_connection_id,
          username
        }, signal);
      }
      setBusinessAccountBio(business_connection_id, bio, signal) {
        return this.raw.setBusinessAccountBio({
          business_connection_id,
          bio
        }, signal);
      }
      setBusinessAccountProfilePhoto(business_connection_id, photo, other, signal) {
        return this.raw.setBusinessAccountProfilePhoto({
          business_connection_id,
          photo,
          ...other
        }, signal);
      }
      removeBusinessAccountProfilePhoto(business_connection_id, other, signal) {
        return this.raw.removeBusinessAccountProfilePhoto({
          business_connection_id,
          ...other
        }, signal);
      }
      setBusinessAccountGiftSettings(business_connection_id, show_gift_button, accepted_gift_types, signal) {
        return this.raw.setBusinessAccountGiftSettings({
          business_connection_id,
          show_gift_button,
          accepted_gift_types
        }, signal);
      }
      getBusinessAccountStarBalance(business_connection_id, signal) {
        return this.raw.getBusinessAccountStarBalance({
          business_connection_id
        }, signal);
      }
      transferBusinessAccountStars(business_connection_id, star_count, signal) {
        return this.raw.transferBusinessAccountStars({
          business_connection_id,
          star_count
        }, signal);
      }
      getBusinessAccountGifts(business_connection_id, other, signal) {
        return this.raw.getBusinessAccountGifts({
          business_connection_id,
          ...other
        }, signal);
      }
      convertGiftToStars(business_connection_id, owned_gift_id, signal) {
        return this.raw.convertGiftToStars({
          business_connection_id,
          owned_gift_id
        }, signal);
      }
      upgradeGift(business_connection_id, owned_gift_id, other, signal) {
        return this.raw.upgradeGift({
          business_connection_id,
          owned_gift_id,
          ...other
        }, signal);
      }
      transferGift(business_connection_id, owned_gift_id, new_owner_chat_id, star_count, signal) {
        return this.raw.transferGift({
          business_connection_id,
          owned_gift_id,
          new_owner_chat_id,
          star_count
        }, signal);
      }
      postStory(business_connection_id, content, active_period, other, signal) {
        return this.raw.postStory({
          business_connection_id,
          content,
          active_period,
          ...other
        }, signal);
      }
      repostStory(business_connection_id, from_chat_id, from_story_id, active_period, other, signal) {
        return this.raw.repostStory({
          business_connection_id,
          from_chat_id,
          from_story_id,
          active_period,
          ...other
        }, signal);
      }
      editStory(business_connection_id, story_id, content, other, signal) {
        return this.raw.editStory({
          business_connection_id,
          story_id,
          content,
          ...other
        }, signal);
      }
      deleteStory(business_connection_id, story_id, signal) {
        return this.raw.deleteStory({
          business_connection_id,
          story_id
        }, signal);
      }
      sendSticker(chat_id, sticker, other, signal) {
        return this.raw.sendSticker({
          chat_id,
          sticker,
          ...other
        }, signal);
      }
      getStickerSet(name, signal) {
        return this.raw.getStickerSet({
          name
        }, signal);
      }
      getCustomEmojiStickers(custom_emoji_ids, signal) {
        return this.raw.getCustomEmojiStickers({
          custom_emoji_ids
        }, signal);
      }
      uploadStickerFile(user_id, sticker_format, sticker, signal) {
        return this.raw.uploadStickerFile({
          user_id,
          sticker_format,
          sticker
        }, signal);
      }
      createNewStickerSet(user_id, name, title3, stickers, other, signal) {
        return this.raw.createNewStickerSet({
          user_id,
          name,
          title: title3,
          stickers,
          ...other
        }, signal);
      }
      addStickerToSet(user_id, name, sticker, signal) {
        return this.raw.addStickerToSet({
          user_id,
          name,
          sticker
        }, signal);
      }
      setStickerPositionInSet(sticker, position, signal) {
        return this.raw.setStickerPositionInSet({
          sticker,
          position
        }, signal);
      }
      deleteStickerFromSet(sticker, signal) {
        return this.raw.deleteStickerFromSet({
          sticker
        }, signal);
      }
      replaceStickerInSet(user_id, name, old_sticker, sticker, signal) {
        return this.raw.replaceStickerInSet({
          user_id,
          name,
          old_sticker,
          sticker
        }, signal);
      }
      setStickerEmojiList(sticker, emoji_list, signal) {
        return this.raw.setStickerEmojiList({
          sticker,
          emoji_list
        }, signal);
      }
      setStickerKeywords(sticker, keywords, signal) {
        return this.raw.setStickerKeywords({
          sticker,
          keywords
        }, signal);
      }
      setStickerMaskPosition(sticker, mask_position, signal) {
        return this.raw.setStickerMaskPosition({
          sticker,
          mask_position
        }, signal);
      }
      setStickerSetTitle(name, title3, signal) {
        return this.raw.setStickerSetTitle({
          name,
          title: title3
        }, signal);
      }
      deleteStickerSet(name, signal) {
        return this.raw.deleteStickerSet({
          name
        }, signal);
      }
      setStickerSetThumbnail(name, user_id, thumbnail, format, signal) {
        return this.raw.setStickerSetThumbnail({
          name,
          user_id,
          thumbnail,
          format
        }, signal);
      }
      setCustomEmojiStickerSetThumbnail(name, custom_emoji_id, signal) {
        return this.raw.setCustomEmojiStickerSetThumbnail({
          name,
          custom_emoji_id
        }, signal);
      }
      getAvailableGifts(signal) {
        return this.raw.getAvailableGifts(signal);
      }
      sendGift(user_id, gift_id, other, signal) {
        return this.raw.sendGift({
          user_id,
          gift_id,
          ...other
        }, signal);
      }
      giftPremiumSubscription(user_id, month_count, star_count, other, signal) {
        return this.raw.giftPremiumSubscription({
          user_id,
          month_count,
          star_count,
          ...other
        }, signal);
      }
      sendGiftToChannel(chat_id, gift_id, other, signal) {
        return this.raw.sendGift({
          chat_id,
          gift_id,
          ...other
        }, signal);
      }
      answerInlineQuery(inline_query_id, results, other, signal) {
        return this.raw.answerInlineQuery({
          inline_query_id,
          results,
          ...other
        }, signal);
      }
      answerWebAppQuery(web_app_query_id, result, signal) {
        return this.raw.answerWebAppQuery({
          web_app_query_id,
          result
        }, signal);
      }
      savePreparedInlineMessage(user_id, result, other, signal) {
        return this.raw.savePreparedInlineMessage({
          user_id,
          result,
          ...other
        }, signal);
      }
      savePreparedKeyboardButton(user_id, button, signal) {
        return this.raw.savePreparedKeyboardButton({
          user_id,
          button
        }, signal);
      }
      sendInvoice(chat_id, title3, description, payload, currency, prices, other, signal) {
        return this.raw.sendInvoice({
          chat_id,
          title: title3,
          description,
          payload,
          currency,
          prices,
          ...other
        }, signal);
      }
      createInvoiceLink(title3, description, payload, provider_token, currency, prices, other, signal) {
        return this.raw.createInvoiceLink({
          title: title3,
          description,
          payload,
          provider_token,
          currency,
          prices,
          ...other
        }, signal);
      }
      answerShippingQuery(shipping_query_id, ok2, other, signal) {
        return this.raw.answerShippingQuery({
          shipping_query_id,
          ok: ok2,
          ...other
        }, signal);
      }
      answerPreCheckoutQuery(pre_checkout_query_id, ok2, other, signal) {
        return this.raw.answerPreCheckoutQuery({
          pre_checkout_query_id,
          ok: ok2,
          ...other
        }, signal);
      }
      getStarTransactions(other, signal) {
        return this.raw.getStarTransactions({
          ...other
        }, signal);
      }
      refundStarPayment(user_id, telegram_payment_charge_id, signal) {
        return this.raw.refundStarPayment({
          user_id,
          telegram_payment_charge_id
        }, signal);
      }
      editUserStarSubscription(user_id, telegram_payment_charge_id, is_canceled, signal) {
        return this.raw.editUserStarSubscription({
          user_id,
          telegram_payment_charge_id,
          is_canceled
        }, signal);
      }
      verifyUser(user_id, other, signal) {
        return this.raw.verifyUser({
          user_id,
          ...other
        }, signal);
      }
      verifyChat(chat_id, other, signal) {
        return this.raw.verifyChat({
          chat_id,
          ...other
        }, signal);
      }
      removeUserVerification(user_id, signal) {
        return this.raw.removeUserVerification({
          user_id
        }, signal);
      }
      removeChatVerification(chat_id, signal) {
        return this.raw.removeChatVerification({
          chat_id
        }, signal);
      }
      readBusinessMessage(business_connection_id, chat_id, message_id, signal) {
        return this.raw.readBusinessMessage({
          business_connection_id,
          chat_id,
          message_id
        }, signal);
      }
      setPassportDataErrors(user_id, errors, signal) {
        return this.raw.setPassportDataErrors({
          user_id,
          errors
        }, signal);
      }
      sendGame(chat_id, game_short_name, other, signal) {
        return this.raw.sendGame({
          chat_id,
          game_short_name,
          ...other
        }, signal);
      }
      setGameScore(chat_id, message_id, user_id, score, other, signal) {
        return this.raw.setGameScore({
          chat_id,
          message_id,
          user_id,
          score,
          ...other
        }, signal);
      }
      setGameScoreInline(inline_message_id, user_id, score, other, signal) {
        return this.raw.setGameScore({
          inline_message_id,
          user_id,
          score,
          ...other
        }, signal);
      }
      getGameHighScores(chat_id, message_id, user_id, signal) {
        return this.raw.getGameHighScores({
          chat_id,
          message_id,
          user_id
        }, signal);
      }
      getGameHighScoresInline(inline_message_id, user_id, signal) {
        return this.raw.getGameHighScores({
          inline_message_id,
          user_id
        }, signal);
      }
    };
    debug22 = browser$1("grammy:bot");
    debugWarn = browser$1("grammy:warn");
    debugErr = browser$1("grammy:error");
    DEFAULT_UPDATE_TYPES = [
      "message",
      "edited_message",
      "channel_post",
      "edited_channel_post",
      "business_connection",
      "business_message",
      "edited_business_message",
      "deleted_business_messages",
      "guest_message",
      "inline_query",
      "chosen_inline_result",
      "callback_query",
      "shipping_query",
      "pre_checkout_query",
      "purchased_paid_media",
      "poll",
      "poll_answer",
      "my_chat_member",
      "managed_bot",
      "chat_join_request",
      "chat_boost",
      "removed_chat_boost"
    ];
    Bot = class extends Composer {
      static {
        __name(this, "Bot");
      }
      token;
      pollingRunning;
      pollingAbortController;
      lastTriedUpdateId;
      api;
      me;
      mePromise;
      clientConfig;
      ContextConstructor;
      observedUpdateTypes;
      errorHandler;
      constructor(token, config4) {
        super();
        this.token = token;
        this.pollingRunning = false;
        this.lastTriedUpdateId = 0;
        this.observedUpdateTypes = /* @__PURE__ */ new Set();
        this.errorHandler = async (err) => {
          console.error("Error in middleware while handling update", err.ctx?.update?.update_id, err.error);
          console.error("No error handler was set!");
          console.error("Set your own error handler with `bot.catch = ...`");
          if (this.pollingRunning) {
            console.error("Stopping bot");
            await this.stop();
          }
          throw err;
        };
        if (!token) throw new Error("Empty token!");
        this.me = config4?.botInfo;
        this.clientConfig = config4?.client;
        this.ContextConstructor = config4?.ContextConstructor ?? Context2;
        this.api = new Api(token, this.clientConfig);
      }
      set botInfo(botInfo) {
        this.me = botInfo;
      }
      get botInfo() {
        if (this.me === void 0) {
          throw new Error("Bot information unavailable! Make sure to call `await bot.init()` before accessing `bot.botInfo`!");
        }
        return this.me;
      }
      on(filter, ...middleware) {
        for (const [u] of parse(filter).flatMap(preprocess)) {
          this.observedUpdateTypes.add(u);
        }
        return super.on(filter, ...middleware);
      }
      reaction(reaction, ...middleware) {
        this.observedUpdateTypes.add("message_reaction");
        return super.reaction(reaction, ...middleware);
      }
      isInited() {
        return this.me !== void 0;
      }
      async init(signal) {
        if (!this.isInited()) {
          debug22("Initializing bot");
          this.mePromise ??= withRetries(() => this.api.getMe(signal), signal);
          let me;
          try {
            me = await this.mePromise;
          } finally {
            this.mePromise = void 0;
          }
          if (this.me === void 0) this.me = me;
          else debug22("Bot info was set by now, will not overwrite");
        }
        debug22(`I am ${this.me.username}!`);
      }
      async handleUpdates(updates) {
        for (const update of updates) {
          this.lastTriedUpdateId = update.update_id;
          try {
            await this.handleUpdate(update);
          } catch (err) {
            if (err instanceof BotError) {
              await this.errorHandler(err);
            } else {
              console.error("FATAL: grammY unable to handle:", err);
              throw err;
            }
          }
        }
      }
      async handleUpdate(update, webhookReplyEnvelope) {
        if (this.me === void 0) {
          throw new Error("Bot not initialized! Either call `await bot.init()`, or directly set the `botInfo` option in the `Bot` constructor to specify a known bot info object.");
        }
        debug22(`Processing update ${update.update_id}`);
        const api = new Api(this.token, this.clientConfig, webhookReplyEnvelope);
        const t = this.api.config.installedTransformers();
        if (t.length > 0) api.config.use(...t);
        const ctx = new this.ContextConstructor(update, api, this.me);
        try {
          await run(this.middleware(), ctx);
        } catch (err) {
          debugErr(`Error in middleware for update ${update.update_id}`);
          throw new BotError(err, ctx);
        }
      }
      async start(options) {
        const setup2 = [];
        if (!this.isInited()) {
          setup2.push(this.init(this.pollingAbortController?.signal));
        }
        if (this.pollingRunning) {
          await Promise.all(setup2);
          debug22("Simple long polling already running!");
          return;
        }
        this.pollingRunning = true;
        this.pollingAbortController = new AbortController();
        try {
          setup2.push(withRetries(async () => {
            await this.api.deleteWebhook({
              drop_pending_updates: options?.drop_pending_updates
            }, this.pollingAbortController?.signal);
          }, this.pollingAbortController?.signal));
          await Promise.all(setup2);
          await options?.onStart?.(this.botInfo);
        } catch (err) {
          this.pollingRunning = false;
          this.pollingAbortController = void 0;
          throw err;
        }
        if (!this.pollingRunning) return;
        validateAllowedUpdates(this.observedUpdateTypes, options?.allowed_updates);
        this.use = noUseFunction;
        debug22("Starting simple long polling");
        await this.loop(options);
        debug22("Middleware is done running");
      }
      async stop() {
        if (this.pollingRunning) {
          debug22("Stopping bot, saving update offset");
          this.pollingRunning = false;
          this.pollingAbortController?.abort();
          const offset = this.lastTriedUpdateId + 1;
          await this.api.getUpdates({
            offset,
            limit: 1
          }).finally(() => this.pollingAbortController = void 0);
        } else {
          debug22("Bot is not running!");
        }
      }
      isRunning() {
        return this.pollingRunning;
      }
      catch(errorHandler2) {
        this.errorHandler = errorHandler2;
      }
      async loop(options) {
        const limit = options?.limit;
        const timeout = options?.timeout ?? 30;
        let allowed_updates = options?.allowed_updates ?? [];
        try {
          while (this.pollingRunning) {
            const updates = await this.fetchUpdates({
              limit,
              timeout,
              allowed_updates
            });
            if (updates === void 0) break;
            await this.handleUpdates(updates);
            allowed_updates = void 0;
          }
        } finally {
          this.pollingRunning = false;
        }
      }
      async fetchUpdates({ limit, timeout, allowed_updates }) {
        const offset = this.lastTriedUpdateId + 1;
        let updates = void 0;
        do {
          try {
            updates = await this.api.getUpdates({
              offset,
              limit,
              timeout,
              allowed_updates
            }, this.pollingAbortController?.signal);
          } catch (error3) {
            await this.handlePollingError(error3);
          }
        } while (updates === void 0 && this.pollingRunning);
        return updates;
      }
      async handlePollingError(error3) {
        if (!this.pollingRunning) {
          debug22("Pending getUpdates request cancelled");
          return;
        }
        let sleepSeconds = 3;
        if (error3 instanceof GrammyError) {
          debugErr(error3.message);
          if (error3.error_code === 401 || error3.error_code === 409) {
            throw error3;
          } else if (error3.error_code === 429) {
            debugErr("Bot API server is closing.");
            sleepSeconds = error3.parameters.retry_after ?? sleepSeconds;
          }
        } else debugErr(error3);
        debugErr(`Call to getUpdates failed, retrying in ${sleepSeconds} seconds ...`);
        await sleep(sleepSeconds);
      }
    };
    __name(withRetries, "withRetries");
    __name(sleep, "sleep");
    __name(validateAllowedUpdates, "validateAllowedUpdates");
    __name(noUseFunction, "noUseFunction");
    ALL_UPDATE_TYPES = [
      ...DEFAULT_UPDATE_TYPES,
      "chat_member",
      "message_reaction",
      "message_reaction_count"
    ];
    ALL_CHAT_PERMISSIONS = {
      can_send_messages: true,
      can_send_audios: true,
      can_send_documents: true,
      can_send_photos: true,
      can_send_videos: true,
      can_send_video_notes: true,
      can_send_voice_notes: true,
      can_send_polls: true,
      can_send_other_messages: true,
      can_add_web_page_previews: true,
      can_react_to_messages: true,
      can_change_info: true,
      can_invite_users: true,
      can_edit_tag: true,
      can_pin_messages: true,
      can_manage_topics: true
    };
    API_CONSTANTS = {
      DEFAULT_UPDATE_TYPES,
      ALL_UPDATE_TYPES,
      ALL_CHAT_PERMISSIONS
    };
    Object.freeze(API_CONSTANTS);
    InlineKeyboard = class _InlineKeyboard {
      static {
        __name(this, "InlineKeyboard");
      }
      inline_keyboard;
      constructor(inline_keyboard = [
        []
      ]) {
        this.inline_keyboard = inline_keyboard;
      }
      add(...buttons) {
        this.inline_keyboard[this.inline_keyboard.length - 1]?.push(...buttons);
        return this;
      }
      row(...buttons) {
        this.inline_keyboard.push(buttons);
        return this;
      }
      url(text, url) {
        return this.add(_InlineKeyboard.url(text, url));
      }
      static url(text, url) {
        return typeof text === "string" ? {
          text,
          url
        } : {
          ...text,
          url
        };
      }
      text(text, data = typeof text === "string" ? text : text.text) {
        return this.add(_InlineKeyboard.text(text, data));
      }
      static text(text, data = typeof text === "string" ? text : text.text) {
        return typeof text === "string" ? {
          text,
          callback_data: data
        } : {
          ...text,
          callback_data: data
        };
      }
      webApp(text, url) {
        return this.add(_InlineKeyboard.webApp(text, url));
      }
      static webApp(text, url) {
        const web_app = typeof url === "string" ? {
          url
        } : url;
        return typeof text === "string" ? {
          text,
          web_app
        } : {
          ...text,
          web_app
        };
      }
      login(text, loginUrl) {
        return this.add(_InlineKeyboard.login(text, loginUrl));
      }
      static login(text, loginUrl) {
        const login_url = typeof loginUrl === "string" ? {
          url: loginUrl
        } : loginUrl;
        return typeof text === "string" ? {
          text,
          login_url
        } : {
          ...text,
          login_url
        };
      }
      switchInline(text, query2 = "") {
        return this.add(_InlineKeyboard.switchInline(text, query2));
      }
      static switchInline(text, query2 = "") {
        return typeof text === "string" ? {
          text,
          switch_inline_query: query2
        } : {
          ...text,
          switch_inline_query: query2
        };
      }
      switchInlineCurrent(text, query2 = "") {
        return this.add(_InlineKeyboard.switchInlineCurrent(text, query2));
      }
      static switchInlineCurrent(text, query2 = "") {
        return typeof text === "string" ? {
          text,
          switch_inline_query_current_chat: query2
        } : {
          ...text,
          switch_inline_query_current_chat: query2
        };
      }
      switchInlineChosen(text, query2 = {}) {
        return this.add(_InlineKeyboard.switchInlineChosen(text, query2));
      }
      static switchInlineChosen(text, query2 = {}) {
        return typeof text === "string" ? {
          text,
          switch_inline_query_chosen_chat: query2
        } : {
          ...text,
          switch_inline_query_chosen_chat: query2
        };
      }
      copyText(text, copyText) {
        return this.add(_InlineKeyboard.copyText(text, copyText));
      }
      static copyText(text, copyText) {
        const copy_text = typeof copyText === "string" ? {
          text: copyText
        } : copyText;
        return typeof text === "string" ? {
          text,
          copy_text
        } : {
          ...text,
          copy_text
        };
      }
      game(text) {
        return this.add(_InlineKeyboard.game(text));
      }
      static game(text) {
        const callback_game = {};
        return typeof text === "string" ? {
          text,
          callback_game
        } : {
          ...text,
          callback_game
        };
      }
      pay(text) {
        return this.add(_InlineKeyboard.pay(text));
      }
      static pay(text) {
        return typeof text === "string" ? {
          text,
          pay: true
        } : {
          ...text,
          pay: true
        };
      }
      style(style) {
        const rows = this.inline_keyboard.length;
        if (rows === 0) {
          throw new Error("Need to add a button before applying a style!");
        }
        const lastRow = this.inline_keyboard[rows - 1];
        const cols = lastRow.length;
        if (cols === 0) {
          throw new Error("Need to add a button before applying a style!");
        }
        lastRow[cols - 1].style = style;
        return this;
      }
      danger() {
        return this.style("danger");
      }
      success() {
        return this.style("success");
      }
      primary() {
        return this.style("primary");
      }
      icon(icon) {
        const rows = this.inline_keyboard.length;
        if (rows === 0) {
          throw new Error("Need to add a button before adding an icon!");
        }
        const lastRow = this.inline_keyboard[rows - 1];
        const cols = lastRow.length;
        if (cols === 0) {
          throw new Error("Need to add a button before adding an icon!");
        }
        lastRow[cols - 1].icon_custom_emoji_id = icon;
        return this;
      }
      toTransposed() {
        const original = this.inline_keyboard;
        const transposed = transpose(original);
        return new _InlineKeyboard(transposed);
      }
      toFlowed(columns, options = {}) {
        const original = this.inline_keyboard;
        const flowed = reflow(original, columns, options);
        return new _InlineKeyboard(flowed);
      }
      clone() {
        return new _InlineKeyboard(this.inline_keyboard.map((row) => row.slice()));
      }
      append(...sources) {
        for (const source of sources) {
          const keyboard = _InlineKeyboard.from(source);
          this.inline_keyboard.push(...keyboard.inline_keyboard.map((row) => row.slice()));
        }
        return this;
      }
      static from(source) {
        if (source instanceof _InlineKeyboard) return source.clone();
        return new _InlineKeyboard(source.map((row) => row.slice()));
      }
    };
    __name(transpose, "transpose");
    __name(reflow, "reflow");
    debug32 = browser$1("grammy:session");
    SECRET_HEADER = "X-Telegram-Bot-Api-Secret-Token";
    SECRET_HEADER_LOWERCASE = SECRET_HEADER.toLowerCase();
    WRONG_TOKEN_ERROR = "secret token is wrong";
    ok = /* @__PURE__ */ __name(() => new Response(null, {
      status: 200
    }), "ok");
    okJson = /* @__PURE__ */ __name((json) => new Response(json, {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    }), "okJson");
    unauthorized = /* @__PURE__ */ __name(() => new Response('"unauthorized"', {
      status: 401,
      statusText: WRONG_TOKEN_ERROR
    }), "unauthorized");
    awsLambda = /* @__PURE__ */ __name((event, _context, callback) => ({
      get update() {
        return JSON.parse(event.body ?? "{}");
      },
      header: event.headers[SECRET_HEADER] ?? event.headers[SECRET_HEADER_LOWERCASE],
      end: /* @__PURE__ */ __name(() => callback(null, {
        statusCode: 200
      }), "end"),
      respond: /* @__PURE__ */ __name((json) => callback(null, {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json"
        },
        body: json
      }), "respond"),
      unauthorized: /* @__PURE__ */ __name(() => callback(null, {
        statusCode: 401
      }), "unauthorized")
    }), "awsLambda");
    awsLambdaAsync = /* @__PURE__ */ __name((event, _context) => {
      let resolveResponse;
      return {
        get update() {
          return JSON.parse(event.body ?? "{}");
        },
        header: event.headers[SECRET_HEADER] ?? event.headers[SECRET_HEADER_LOWERCASE],
        end: /* @__PURE__ */ __name(() => resolveResponse({
          statusCode: 200
        }), "end"),
        respond: /* @__PURE__ */ __name((json) => resolveResponse({
          statusCode: 200,
          headers: {
            "Content-Type": "application/json"
          },
          body: json
        }), "respond"),
        unauthorized: /* @__PURE__ */ __name(() => resolveResponse({
          statusCode: 401
        }), "unauthorized"),
        handlerReturn: new Promise((res) => resolveResponse = res)
      };
    }, "awsLambdaAsync");
    azure = /* @__PURE__ */ __name((context2, request) => ({
      get update() {
        return request.body;
      },
      header: request.headers?.[SECRET_HEADER_LOWERCASE],
      end: /* @__PURE__ */ __name(() => context2.res = {
        status: 200,
        body: ""
      }, "end"),
      respond: /* @__PURE__ */ __name((json) => {
        context2.res?.set?.("Content-Type", "application/json");
        context2.res?.send?.(json);
      }, "respond"),
      unauthorized: /* @__PURE__ */ __name(() => {
        context2.res?.send?.(401, WRONG_TOKEN_ERROR);
      }, "unauthorized")
    }), "azure");
    azureV4 = /* @__PURE__ */ __name((request) => {
      let resolveResponse;
      return {
        get update() {
          return request.json();
        },
        header: request.headers.get(SECRET_HEADER) || void 0,
        end: /* @__PURE__ */ __name(() => resolveResponse({
          status: 204
        }), "end"),
        respond: /* @__PURE__ */ __name((json) => resolveResponse({
          jsonBody: json
        }), "respond"),
        unauthorized: /* @__PURE__ */ __name(() => resolveResponse({
          status: 401,
          body: WRONG_TOKEN_ERROR
        }), "unauthorized"),
        handlerReturn: new Promise((resolve) => resolveResponse = resolve)
      };
    }, "azureV4");
    bun = /* @__PURE__ */ __name((request) => {
      let resolveResponse;
      return {
        get update() {
          return request.json();
        },
        header: request.headers.get(SECRET_HEADER) || void 0,
        end: /* @__PURE__ */ __name(() => {
          resolveResponse(ok());
        }, "end"),
        respond: /* @__PURE__ */ __name((json) => {
          resolveResponse(okJson(json));
        }, "respond"),
        unauthorized: /* @__PURE__ */ __name(() => {
          resolveResponse(unauthorized());
        }, "unauthorized"),
        handlerReturn: new Promise((res) => resolveResponse = res)
      };
    }, "bun");
    cloudflare = /* @__PURE__ */ __name((event) => {
      let resolveResponse;
      event.respondWith(new Promise((resolve) => {
        resolveResponse = resolve;
      }));
      return {
        get update() {
          return event.request.json();
        },
        header: event.request.headers.get(SECRET_HEADER) || void 0,
        end: /* @__PURE__ */ __name(() => {
          resolveResponse(ok());
        }, "end"),
        respond: /* @__PURE__ */ __name((json) => {
          resolveResponse(okJson(json));
        }, "respond"),
        unauthorized: /* @__PURE__ */ __name(() => {
          resolveResponse(unauthorized());
        }, "unauthorized")
      };
    }, "cloudflare");
    cloudflareModule = /* @__PURE__ */ __name((request) => {
      let resolveResponse;
      return {
        get update() {
          return request.json();
        },
        header: request.headers.get(SECRET_HEADER) || void 0,
        end: /* @__PURE__ */ __name(() => {
          resolveResponse(ok());
        }, "end"),
        respond: /* @__PURE__ */ __name((json) => {
          resolveResponse(okJson(json));
        }, "respond"),
        unauthorized: /* @__PURE__ */ __name(() => {
          resolveResponse(unauthorized());
        }, "unauthorized"),
        handlerReturn: new Promise((res) => resolveResponse = res)
      };
    }, "cloudflareModule");
    express = /* @__PURE__ */ __name((req, res) => ({
      get update() {
        return req.body;
      },
      header: req.header(SECRET_HEADER),
      end: /* @__PURE__ */ __name(() => res.end(), "end"),
      respond: /* @__PURE__ */ __name((json) => {
        res.set("Content-Type", "application/json");
        res.send(json);
      }, "respond"),
      unauthorized: /* @__PURE__ */ __name(() => {
        res.status(401).send(WRONG_TOKEN_ERROR);
      }, "unauthorized")
    }), "express");
    fastify = /* @__PURE__ */ __name((request, reply) => ({
      get update() {
        return request.body;
      },
      header: request.headers[SECRET_HEADER_LOWERCASE],
      end: /* @__PURE__ */ __name(() => reply.send(""), "end"),
      respond: /* @__PURE__ */ __name((json) => reply.headers({
        "Content-Type": "application/json"
      }).send(json), "respond"),
      unauthorized: /* @__PURE__ */ __name(() => reply.code(401).send(WRONG_TOKEN_ERROR), "unauthorized")
    }), "fastify");
    hono = /* @__PURE__ */ __name((c) => {
      let resolveResponse;
      return {
        get update() {
          return c.req.json();
        },
        header: c.req.header(SECRET_HEADER),
        end: /* @__PURE__ */ __name(() => {
          resolveResponse(c.body(""));
        }, "end"),
        respond: /* @__PURE__ */ __name((json) => {
          resolveResponse(c.json(json));
        }, "respond"),
        unauthorized: /* @__PURE__ */ __name(() => {
          c.status(401);
          resolveResponse(c.body(""));
        }, "unauthorized"),
        handlerReturn: new Promise((res) => resolveResponse = res)
      };
    }, "hono");
    http = /* @__PURE__ */ __name((req, res) => {
      const secretHeaderFromRequest = req.headers[SECRET_HEADER_LOWERCASE];
      return {
        get update() {
          return new Promise((resolve, reject) => {
            const chunks = [];
            req.on("data", (chunk) => chunks.push(chunk)).once("end", () => {
              const raw2 = Buffer.concat(chunks).toString("utf-8");
              try {
                resolve(JSON.parse(raw2));
              } catch (err) {
                reject(err);
              }
            }).once("error", reject);
          });
        },
        header: Array.isArray(secretHeaderFromRequest) ? secretHeaderFromRequest[0] : secretHeaderFromRequest,
        end: /* @__PURE__ */ __name(() => res.end(), "end"),
        respond: /* @__PURE__ */ __name((json) => res.writeHead(200, {
          "Content-Type": "application/json"
        }).end(json), "respond"),
        unauthorized: /* @__PURE__ */ __name(() => res.writeHead(401).end(WRONG_TOKEN_ERROR), "unauthorized")
      };
    }, "http");
    koa = /* @__PURE__ */ __name((ctx) => ({
      get update() {
        return ctx.request.body;
      },
      header: ctx.get(SECRET_HEADER) || void 0,
      end: /* @__PURE__ */ __name(() => {
        ctx.body = "";
      }, "end"),
      respond: /* @__PURE__ */ __name((json) => {
        ctx.set("Content-Type", "application/json");
        ctx.response.body = json;
      }, "respond"),
      unauthorized: /* @__PURE__ */ __name(() => {
        ctx.status = 401;
      }, "unauthorized")
    }), "koa");
    nextJs = /* @__PURE__ */ __name((request, response) => ({
      get update() {
        return request.body;
      },
      header: request.headers[SECRET_HEADER_LOWERCASE],
      end: /* @__PURE__ */ __name(() => response.end(), "end"),
      respond: /* @__PURE__ */ __name((json) => response.status(200).json(json), "respond"),
      unauthorized: /* @__PURE__ */ __name(() => response.status(401).send(WRONG_TOKEN_ERROR), "unauthorized")
    }), "nextJs");
    nhttp = /* @__PURE__ */ __name((rev) => ({
      get update() {
        return rev.body;
      },
      header: rev.headers.get(SECRET_HEADER) || void 0,
      end: /* @__PURE__ */ __name(() => rev.response.sendStatus(200), "end"),
      respond: /* @__PURE__ */ __name((json) => rev.response.status(200).send(json), "respond"),
      unauthorized: /* @__PURE__ */ __name(() => rev.response.status(401).send(WRONG_TOKEN_ERROR), "unauthorized")
    }), "nhttp");
    oak = /* @__PURE__ */ __name((ctx) => ({
      get update() {
        return ctx.request.body.json();
      },
      header: ctx.request.headers.get(SECRET_HEADER) || void 0,
      end: /* @__PURE__ */ __name(() => {
        ctx.response.status = 200;
      }, "end"),
      respond: /* @__PURE__ */ __name((json) => {
        ctx.response.type = "json";
        ctx.response.body = json;
      }, "respond"),
      unauthorized: /* @__PURE__ */ __name(() => {
        ctx.response.status = 401;
      }, "unauthorized")
    }), "oak");
    serveHttp = /* @__PURE__ */ __name((requestEvent) => ({
      get update() {
        return requestEvent.request.json();
      },
      header: requestEvent.request.headers.get(SECRET_HEADER) || void 0,
      end: /* @__PURE__ */ __name(() => requestEvent.respondWith(ok()), "end"),
      respond: /* @__PURE__ */ __name((json) => requestEvent.respondWith(okJson(json)), "respond"),
      unauthorized: /* @__PURE__ */ __name(() => requestEvent.respondWith(unauthorized()), "unauthorized")
    }), "serveHttp");
    stdHttp = /* @__PURE__ */ __name((req) => {
      let resolveResponse;
      return {
        get update() {
          return req.json();
        },
        header: req.headers.get(SECRET_HEADER) || void 0,
        end: /* @__PURE__ */ __name(() => {
          if (resolveResponse) resolveResponse(ok());
        }, "end"),
        respond: /* @__PURE__ */ __name((json) => {
          if (resolveResponse) resolveResponse(okJson(json));
        }, "respond"),
        unauthorized: /* @__PURE__ */ __name(() => {
          if (resolveResponse) resolveResponse(unauthorized());
        }, "unauthorized"),
        handlerReturn: new Promise((res) => resolveResponse = res)
      };
    }, "stdHttp");
    sveltekit = /* @__PURE__ */ __name(({ request }) => {
      let resolveResponse;
      return {
        get update() {
          return request.json();
        },
        header: request.headers.get(SECRET_HEADER) || void 0,
        end: /* @__PURE__ */ __name(() => {
          if (resolveResponse) resolveResponse(ok());
        }, "end"),
        respond: /* @__PURE__ */ __name((json) => {
          if (resolveResponse) resolveResponse(okJson(json));
        }, "respond"),
        unauthorized: /* @__PURE__ */ __name(() => {
          if (resolveResponse) resolveResponse(unauthorized());
        }, "unauthorized"),
        handlerReturn: new Promise((res) => resolveResponse = res)
      };
    }, "sveltekit");
    worktop = /* @__PURE__ */ __name((req, res) => ({
      get update() {
        return req.json();
      },
      header: req.headers.get(SECRET_HEADER) ?? void 0,
      end: /* @__PURE__ */ __name(() => res.end(null), "end"),
      respond: /* @__PURE__ */ __name((json) => res.send(200, json), "respond"),
      unauthorized: /* @__PURE__ */ __name(() => res.send(401, WRONG_TOKEN_ERROR), "unauthorized")
    }), "worktop");
    elysia = /* @__PURE__ */ __name((ctx) => {
      let resolveResponse;
      return {
        get update() {
          return ctx.body;
        },
        header: ctx.headers[SECRET_HEADER_LOWERCASE],
        end() {
          resolveResponse("");
        },
        respond(json) {
          ctx.set.headers["content-type"] = "application/json";
          resolveResponse(json);
        },
        unauthorized() {
          ctx.set.status = 401;
          resolveResponse("");
        },
        handlerReturn: new Promise((res) => resolveResponse = res)
      };
    }, "elysia");
    adapters = {
      "aws-lambda": awsLambda,
      "aws-lambda-async": awsLambdaAsync,
      azure,
      "azure-v4": azureV4,
      bun,
      cloudflare,
      "cloudflare-mod": cloudflareModule,
      elysia,
      express,
      fastify,
      hono,
      http,
      https: http,
      koa,
      "next-js": nextJs,
      nhttp,
      oak,
      serveHttp,
      "std/http": stdHttp,
      sveltekit,
      worktop
    };
    debugErr1 = browser$1("grammy:error");
    callbackAdapter = /* @__PURE__ */ __name((update, callback, header, unauthorized2 = () => callback('"unauthorized"')) => ({
      update: Promise.resolve(update),
      respond: callback,
      header,
      unauthorized: unauthorized2
    }), "callbackAdapter");
    adapters1 = {
      ...adapters,
      callback: callbackAdapter
    };
  }
});

// src/botEngine.ts
async function getBotBySecret(secret) {
  return one(
    `SELECT id, owner_id, tg_bot_id, username, token_encrypted, webhook_secret, status, welcome_message
       FROM bots
      WHERE webhook_secret = $1`,
    [secret]
  );
}
async function handleUpdateForBot(row, update) {
  const token = await decryptToken(Buffer.from(row.token_encrypted));
  const botInfo = {
    id: Number(row.tg_bot_id),
    is_bot: true,
    first_name: row.username ?? "Bot"
  };
  if (row.username) botInfo.username = row.username;
  const bot = new Bot(token, { botInfo });
  wireHandlers(bot, row);
  await bot.handleUpdate(update);
}
function wireHandlers(bot, botRow) {
  bot.use(async (ctx, next) => {
    const from = ctx.from;
    if (from && !from.is_bot) {
      await query(
        `INSERT INTO bot_subscribers (bot_id, tg_user_id, tg_username, first_name, language)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (bot_id, tg_user_id) DO UPDATE
           SET last_seen = now(),
               tg_username = EXCLUDED.tg_username,
               is_blocked = false`,
        [botRow.id, from.id, from.username ?? null, from.first_name ?? null, from.language_code ?? null]
      );
    }
    await next();
  });
  bot.command("start", async (ctx) => {
    const welcome = botRow.welcome_message ?? "Welcome! Send /code to get my current bonus codes and links.";
    await ctx.reply(welcome);
  });
  bot.command(["code", "codes"], async (ctx) => {
    await sendOffers(ctx, botRow);
  });
  bot.on("message::bot_command", async (ctx) => {
    const text = ctx.message?.text ?? "";
    const cmd = text.split(/\s/)[0]?.replace(/^\//, "").split("@")[0]?.toLowerCase();
    if (!cmd || ["start", "code", "codes"].includes(cmd)) return;
    const custom = await one(
      `SELECT response FROM bot_commands
        WHERE bot_id = $1 AND command = $2 AND is_enabled`,
      [botRow.id, cmd]
    );
    if (custom?.response) await ctx.reply(custom.response);
  });
  bot.catch((err) => {
    console.error(`[bot ${botRow.username ?? botRow.id}]`, err.error);
  });
}
async function sendOffers(ctx, botRow) {
  const offers = await query(
    `SELECT o.id, o.label, o.promo_code, o.bonus_text, o.referral_url,
            c.name AS casino_name, sl.slug
       FROM offers o
       JOIN casinos c ON c.id = o.casino_id
       LEFT JOIN LATERAL (
         SELECT slug FROM short_links
          WHERE offer_id = o.id AND source = 'telegram'
          ORDER BY created_at LIMIT 1
       ) sl ON true
      WHERE o.owner_id = $1 AND o.is_active
      ORDER BY o.priority DESC, o.created_at`,
    [botRow.owner_id]
  );
  if (offers.length === 0) {
    await ctx.reply("No active offers right now. Check back soon!");
    return;
  }
  for (const offer of offers) {
    const lines = [`*${offer.label}*`];
    if (offer.bonus_text) lines.push(offer.bonus_text);
    if (offer.promo_code) lines.push(`Code: \`${offer.promo_code}\``);
    const trackable = offer.slug && /^https:\/\//.test(config2.publicBaseUrl) && !/localhost|127\.0\.0\.1|example\.com/.test(config2.publicBaseUrl);
    const u = ctx.from?.id ? `?u=${ctx.from.id}` : "";
    const buttonUrl = trackable ? `${config2.publicBaseUrl}/r/${offer.slug}${u}` : offer.referral_url;
    const kb = new InlineKeyboard().url(
      `Claim on ${offer.casino_name}`,
      buttonUrl
    );
    await ctx.reply(lines.join("\n"), { parse_mode: "Markdown", reply_markup: kb });
  }
}
var init_botEngine = __esm({
  "src/botEngine.ts"() {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_web();
    init_db();
    init_crypto();
    init_config2();
    __name(getBotBySecret, "getBotBySecret");
    __name(handleUpdateForBot, "handleUpdateForBot");
    __name(wireHandlers, "wireHandlers");
    __name(sendOffers, "sendOffers");
  }
});

// src/telegram.ts
async function call(token, method, params) {
  const res = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: params ? JSON.stringify(params) : void 0
  });
  const body = await res.json();
  if (!body.ok || body.result === void 0) {
    throw new Error(`Telegram ${method} failed: ${body.description ?? res.status}`);
  }
  return body.result;
}
var getMe, setWebhook;
var init_telegram = __esm({
  "src/telegram.ts"() {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    __name(call, "call");
    getMe = /* @__PURE__ */ __name((token) => call(token, "getMe"), "getMe");
    setWebhook = /* @__PURE__ */ __name((token, url, secret) => call(token, "setWebhook", {
      url,
      secret_token: secret,
      // Telegram echoes this back on every update
      allowed_updates: ["message", "callback_query"],
      drop_pending_updates: true
    }), "setWebhook");
  }
});

// src/clicks.ts
async function logClick(shortLinkId, ip, userAgent, referer, country, tgUserId) {
  try {
    const ipH = await hashIp(ip);
    const dup = await one(
      `SELECT EXISTS (
         SELECT 1 FROM clicks
          WHERE short_link_id = $1
            AND ip_hash = $2
            AND ts > now() - interval '24 hours'
       ) AS seen`,
      [shortLinkId, ipH]
    );
    await query(
      `INSERT INTO clicks (short_link_id, ip_hash, country, user_agent, referer, tg_user_id, is_unique)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [shortLinkId, ipH, country, userAgent, referer, tgUserId, !dup?.seen]
    );
  } catch (err) {
    console.error("click log failed:", err);
  }
}
var init_clicks = __esm({
  "src/clicks.ts"() {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_db();
    init_crypto();
    __name(logClick, "logClick");
  }
});

// src/hono-app.ts
var hono_app_exports = {};
__export(hono_app_exports, {
  buildHonoApp: () => buildHonoApp
});
function buildHonoApp() {
  const app = new Hono2();
  app.get("/health", (c) => c.json({ ok: true }));
  app.post("/hook/:secret", async (c) => {
    const secret = c.req.param("secret");
    if (c.req.header("x-telegram-bot-api-secret-token") !== secret) {
      return c.body(null, 401);
    }
    const row = await getBotBySecret(secret);
    if (!row || row.status === "revoked") return c.body(null, 404);
    const update = await c.req.json();
    await handleUpdateForBot(row, update);
    return c.body(null, 200);
  });
  app.get("/r/:slug", async (c) => {
    const slug = c.req.param("slug");
    const link3 = await one(
      `SELECT sl.id, o.referral_url
         FROM short_links sl JOIN offers o ON o.id = sl.offer_id
        WHERE sl.slug = $1 AND o.is_active`,
      [slug]
    );
    if (!link3) return c.json({ error: "link not found" }, 404);
    const u = c.req.query("u");
    const tgUserId = u && /^\d+$/.test(u) ? Number(u) : null;
    const country = c.req.header("cf-ipcountry") ?? null;
    const ip = c.req.header("cf-connecting-ip") ?? "0.0.0.0";
    const ctx = c.executionCtx;
    const bg = ctx?.waitUntil ?? ((p) => void p);
    bg(logClick(
      link3.id,
      ip,
      c.req.header("user-agent") ?? null,
      c.req.header("referer") ?? null,
      country,
      tgUserId
    ));
    return c.redirect(link3.referral_url);
  });
  const api = new Hono2();
  api.use("*", async (c, next) => {
    if (c.req.header("x-api-key") !== config2.adminApiKey) {
      return c.json({ error: "bad api key" }, 401);
    }
    await next();
  });
  api.post("/users", async (c) => {
    const body = await c.req.json();
    return c.json(await one(
      `INSERT INTO users (email, display_name) VALUES ($1, $2)
       RETURNING id, email, display_name`,
      [body.email ?? null, body.display_name ?? null]
    ));
  });
  api.post("/bots", async (c) => {
    const { owner_id, token, welcome_message } = await c.req.json();
    if (!owner_id || !token) return c.json({ error: "owner_id and token required" }, 400);
    const me = await getMe(token);
    const secret = newWebhookSecret();
    const encToken = await encryptToken(token);
    const row = await one(
      `INSERT INTO bots (owner_id, tg_bot_id, username, token_encrypted,
                         token_hint, webhook_secret, status, welcome_message)
       VALUES ($1, $2, $3, $4, $5, $6, 'active', $7)
       ON CONFLICT (tg_bot_id) DO UPDATE
         SET token_encrypted = EXCLUDED.token_encrypted,
             token_hint = EXCLUDED.token_hint,
             webhook_secret = EXCLUDED.webhook_secret,
             status = 'active', updated_at = now()
       RETURNING id`,
      [owner_id, me.id, me.username, encToken, token.slice(-4), secret, welcome_message ?? null]
    );
    await setWebhook(token, `${config2.publicBaseUrl}/hook/${secret}`, secret);
    return c.json({ bot_id: row.id, username: me.username, webhook: "set", try_it: `https://t.me/${me.username}` });
  });
  api.post("/offers", async (c) => {
    const body = await c.req.json();
    if (!body.owner_id || !body.casino || !body.label || !body.referral_url)
      return c.json({ error: "owner_id, casino, label, referral_url required" }, 400);
    const slug = body.casino.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const casinoRow = await one(
      `INSERT INTO casinos (slug, name, is_global, created_by)
       VALUES ($1, $2, false, $3)
       ON CONFLICT (slug) DO UPDATE SET name = casinos.name RETURNING id`,
      [slug, body.casino, body.owner_id]
    );
    const offer = await one(
      `INSERT INTO offers (owner_id, casino_id, label, referral_url, promo_code, bonus_text, priority)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
      [
        body.owner_id,
        casinoRow.id,
        body.label,
        body.referral_url,
        body.promo_code ?? null,
        body.bonus_text ?? null,
        body.priority ?? 0
      ]
    );
    const linkSlug = newLinkSlug();
    await query(
      `INSERT INTO short_links (offer_id, slug, source) VALUES ($1, $2, 'telegram')`,
      [offer.id, linkSlug]
    );
    return c.json({ offer_id: offer.id, tracked_link: `${config2.publicBaseUrl}/r/${linkSlug}` });
  });
  api.get("/stats", async (c) => {
    const owner_id = c.req.query("owner_id");
    const days = c.req.query("days") ?? "7";
    if (!owner_id) return c.json({ error: "owner_id required" }, 400);
    return c.json(await query(
      `SELECT o.label, c.name AS casino,
              count(cl.*)::int AS clicks,
              count(cl.*) FILTER (WHERE cl.is_unique)::int AS unique_clicks
         FROM offers o JOIN casinos c ON c.id = o.casino_id
         LEFT JOIN short_links sl ON sl.offer_id = o.id
         LEFT JOIN clicks cl ON cl.short_link_id = sl.id AND cl.ts > now() - make_interval(days => $2::int)
        WHERE o.owner_id = $1
        GROUP BY o.id, o.label, c.name ORDER BY clicks DESC`,
      [owner_id, days]
    ));
  });
  app.route("/api", api);
  return app;
}
var init_hono_app = __esm({
  "src/hono-app.ts"() {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_dist();
    init_config2();
    init_db();
    init_crypto();
    init_botEngine();
    init_telegram();
    init_clicks();
    __name(buildHonoApp, "buildHonoApp");
  }
});

// src/worker.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var worker_default = {
  async fetch(req, env2) {
    if (typeof globalThis.process === "undefined") {
      globalThis.process = { env: {} };
    }
    const pe = globalThis.process.env;
    pe.DATABASE_URL = env2.HYPERDRIVE?.connectionString ?? env2.DATABASE_URL;
    pe.PUBLIC_BASE_URL = env2.PUBLIC_BASE_URL;
    pe.TOKEN_ENC_KEY = env2.TOKEN_ENC_KEY;
    pe.ADMIN_API_KEY = env2.ADMIN_API_KEY;
    pe.IP_HASH_SALT = env2.IP_HASH_SALT;
    const { buildHonoApp: buildHonoApp2 } = await Promise.resolve().then(() => (init_hono_app(), hono_app_exports));
    const app = buildHonoApp2();
    return app.fetch(req, env2);
  }
};
export {
  worker_default as default
};
//# sourceMappingURL=worker.js.map
