/**
 * @brief Checks compatibility between the script and the JS SDK that the
 *        firmware provides
 * 
 * @note The JS SDK that you're looking at is vendored by `"flipperdevices"`,
 * version `0`.`1`.
 * 
 * @param expectedMajor JS SDK major version expected by the script
 * @param expectedMinor JS SDK minor version expected by the script
 * @param expectedVendor JS SDK vendor expected by the script. If not provided,
 *                       vendor compatibility is not checked.
 * @returns Compatibility status:
 *   - `"compatible"` if the script and the JS SDK are compatible
 *   - `"incompatibleVendor"` if `expectedVendor` is a string that does not
 *     match the JS SDK vendor
 *   - `"firmwareTooOld"` if the expected major version is larger than the
 *     version of the firmware, or if the expected minor version is larger than
 *     the version of the firmware
 *   - `"firmwareTooNew"` if the expected major version is lower than the
 *     version of the firmware
 * @version Added in JS SDK 0.1
 */
declare function sdkCompatibilityStatus(expectedMajor: number, expectedMinor: number, expectedVendor?: string):
    "compatible" | "firmwareTooOld" | "firmwareTooNew" | "incompatibleVendor";

/**
 * @brief Checks compatibility between the script and the JS SDK that the
 *        firmware provides in a boolean fashion
 * 
 * @note The JS SDK that you're looking at is vendored by `"flipperdevices"`,
 * version `0`.`1`.
 * 
 * @param expectedMajor JS SDK major version expected by the script
 * @param expectedMinor JS SDK minor version expected by the script
 * @param expectedVendor JS SDK vendor expected by the script. If not provided,
 *                       vendor compatibility is not checked.
 * @returns `true` if the two are compatible, `false` otherwise
 * @version Added in JS SDK 0.1
 */
declare function isSdkCompatible(expectedMajor: number, expectedMinor: number, expectedVendor?: string): boolean;

/**
 * @brief Asserts compatibility with a particular version of the JS SDK that the
 *        firmware provides
 * 
 * @note The JS SDK that you're looking at is vendored by `"flipperdevices"`,
 * version `0`.`1`.
 * 
 * @param expectedMajor JS SDK major version expected by the script
 * @param expectedMinor JS SDK minor version expected by the script
 * @param expectedVendor JS SDK vendor expected by the script. If not provided,
 *                       vendor compatibility is not checked.
 * @returns Nothing if the versions are compatible, halts execution otherwise.
 * @version Added in JS SDK 0.1
 */
declare function assertSdkCompatibility(expectedMajor: number, expectedMinor: number, expectedVendor?: string): void | never;

/**
 * @brief Pauses JavaScript execution for a while
 * @param ms How many milliseconds to pause the execution for
 * @version Added in JS SDK 0.1
 */
declare function delay(ms: number): void;

/**
 * @brief Prints to the GUI console view
 * @param args The arguments are converted to strings, concatenated without any
 *             spaces in between and printed to the console view
 * @version Added in JS SDK 0.1
 */
declare function print(...args: any[]): void;

/**
 * @brief Converts a number to a string
 * @param value The number to convert to a string
 * @param base Integer base (`2`...`16`), default: 10
 * @version Added in JS SDK 0.1
 */
declare function toString(value: number, base?: number): string;

/**
 * @brief Reads a JS value from a file
 * 
 * Reads a file at the specified path, interprets it as a JS value and returns
 * said value.
 * 
 * @param path The path to the file
 * @version Added in JS SDK 0.1
 */
declare function load(path: string): any;

/**
 * @brief Loads a natively implemented module
 * @param module The name of the module to load
 * @version Added in JS SDK 0.1
 */
declare function require(module: string): any;

/**
 * @brief mJS Foreign Pointer type
 * 
 * JavaScript code cannot do anything with values of `RawPointer` type except
 * acquire them from native code and pass them right back to other parts of
 * native code. These values cannot be turned into something meaningful, nor can
 * be they modified.
 * 
 * @version Added in JS SDK 0.1
 */
declare type RawPointer = symbol & { "__tag__": "raw_ptr" };
// introducing a nominal type in a hacky way; the `__tag__` property doesn't really exist.

/**
 * @brief Holds raw bytes
 * @version Added in JS SDK 0.1
 */
declare class ArrayBuffer {
    /**
     * @brief The pointer to the byte buffer
     * @note Like other `RawPointer` values, this value is essentially useless
     *       to JS code.
     * @version Added in JS SDK 0.1
     */
    getPtr: RawPointer;
    /**
     * @brief The length of the buffer in bytes
     * @version Added in JS SDK 0.1
     */
    byteLength: number;
    /**
     * @brief Creates an `ArrayBuffer` that contains a sub-part of the buffer
     * @param start The index of the byte in the source buffer to be used as the
     *              start for the new buffer
     * @param end The index of the byte in the source buffer that follows the
     *            byte to be used as the last byte for the new buffer
     * @version Added in JS SDK 0.1
     */
    slice(start: number, end?: number): ArrayBuffer;
}

declare function ArrayBuffer(): ArrayBuffer;

declare type ElementType = "u8" | "i8" | "u16" | "i16" | "u32" | "i32";

declare class TypedArray<E extends ElementType> {
    /**
     * @brief The length of the buffer in bytes
     * @version Added in JS SDK 0.1
     */
    byteLength: number;
    /**
     * @brief The length of the buffer in typed elements
     * @version Added in JS SDK 0.1
     */
    length: number;
    /**
     * @brief The underlying `ArrayBuffer`
     * @version Added in JS SDK 0.1
     */
    buffer: ArrayBuffer;
}

declare class Uint8Array extends TypedArray<"u8"> { }
declare class Int8Array extends TypedArray<"i8"> { }
declare class Uint16Array extends TypedArray<"u16"> { }
declare class Int16Array extends TypedArray<"i16"> { }
declare class Uint32Array extends TypedArray<"u32"> { }
declare class Int32Array extends TypedArray<"i32"> { }

declare function Uint8Array(data: ArrayBuffer | number | number[]): Uint8Array;
declare function Int8Array(data: ArrayBuffer | number | number[]): Int8Array;
declare function Uint16Array(data: ArrayBuffer | number | number[]): Uint16Array;
declare function Int16Array(data: ArrayBuffer | number | number[]): Int16Array;
declare function Uint32Array(data: ArrayBuffer | number | number[]): Uint32Array;
declare function Int32Array(data: ArrayBuffer | number | number[]): Int32Array;

declare const console: {
    /**
     * @brief Prints to the UART logs at the `[I]` level
     * @param args The arguments are converted to strings, concatenated without any
     *             spaces in between and printed to the logs
     * @version Added in JS SDK 0.1
     */
    log(...args: any[]): void;
    /**
     * @brief Prints to the UART logs at the `[D]` level
     * @param args The arguments are converted to strings, concatenated without any
     *             spaces in between and printed to the logs
     * @version Added in JS SDK 0.1
     */
    debug(...args: any[]): void;
    /**
     * @brief Prints to the UART logs at the `[W]` level
     * @param args The arguments are converted to strings, concatenated without any
     *             spaces in between and printed to the logs
     * @version Added in JS SDK 0.1
     */
    warn(...args: any[]): void;
    /**
     * @brief Prints to the UART logs at the `[E]` level
     * @param args The arguments are converted to strings, concatenated without any
     *             spaces in between and printed to the logs
     * @version Added in JS SDK 0.1
     */
    error(...args: any[]): void;
};

declare class Array<T> {
    /**
     * @brief Takes items out of the array
     * 
     * Removes elements from the array and returns them in a new array
     * 
     * @param start The index to start taking elements from
     * @param deleteCount How many elements to take
     * @returns The elements that were taken out of the original array as a new
     *          array
     * @version Added in JS SDK 0.1
     */
    splice(start: number, deleteCount: number): T[];
    /**
     * @brief Adds a value to the end of the array
     * @param value The value to add
     * @returns New length of the array
     * @version Added in JS SDK 0.1
     */
    push(value: T): number;
    /**
     * @brief How many elements there are in the array
     * @version Added in JS SDK 0.1
     */
    length: number;
}

declare class String {
    /**
     * @brief How many characters there are in the string
     * @version Added in JS SDK 0.1
     */
    length: number;
    /**
     * @brief Returns the character code at an index in the string
     * @param index The index to consult
     * @version Added in JS SDK 0.1
     */
    charCodeAt(index: number): number;
    /**
     * See `charCodeAt`
     * @version Added in JS SDK 0.1
     */
    at(index: number): number;
}

declare class Boolean { }

declare class Function { }

declare class Number { }

declare class Object { }

declare class RegExp { }

declare interface IArguments { }

declare type Partial<O extends object> = { [K in keyof O]?: O[K] };