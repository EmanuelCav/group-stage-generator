if (typeof global.WeakRef === "undefined") {
  class WeakRefPolyfill<T extends object> {
    private _value: T;

    constructor(value: T) {
      this._value = value;
    }

    deref(): T | undefined {
      return this._value;
    }
  }

  global.WeakRef = WeakRefPolyfill as unknown as WeakRefConstructor;
}