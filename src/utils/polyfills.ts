if (typeof globalThis.WeakRef === "undefined") {
  class WeakRefPolyfill<T extends object> {
    private _value: T;

    constructor(value: T) {
      this._value = value;
    }

    deref(): T | undefined {
      return this._value;
    }
  }

  globalThis.WeakRef =
    WeakRefPolyfill as unknown as WeakRefConstructor;
}