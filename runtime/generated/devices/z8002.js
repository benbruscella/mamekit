import deviceData from './z8002.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    const cppMin = (a, b) => (b < a ? b : a);
    const cppMax = (a, b) => (a < b ? b : a);
    // An aggregate initializer's struct, marked as one (execute.ts's
    // isGeneratedStruct) through its prototype: like generatedStruct's
    // non-enumerable marker, field walks and spreads never see it, and a
    // literal with a prototype costs nothing next to defineProperty.
    const cppStructPrototype = { [Symbol.for('mamekit.struct')]: true };
    // CALL_METHOD through a table of method names: each entry's emitted method,
    // resolved once and again only if that entry's name changes (see the
    // CALL_METHOD emission). The last table is held, as a core keeps one until
    // its mode changes.
    const cppDispatch = new WeakMap();
    let cppLastTable, cppLastEntry;
    const cppMethodAt = (table, index) => {
        if (!Array.isArray(table))
            return undefined;
        let entry = table === cppLastTable ? cppLastEntry : undefined;
        if (!entry) {
            entry = cppDispatch.get(table);
            if (!entry)
                cppDispatch.set(table, entry = { names: new Array(table.length), methods: new Array(table.length) });
            cppLastTable = table;
            cppLastEntry = entry;
        }
        const name = table[index];
        if (entry.names[index] === name && name !== undefined)
            return entry.methods[index];
        entry.names[index] = name;
        return entry.methods[index] = typeof name === 'string' ? __methodTable[name] : undefined;
    };
    // execute.ts's clearGeneratedStruct, field names read once per struct.
    const cppUnionElements = Symbol.for('mamekit.unionElements');
    const cppStructKeys = new WeakMap();
    const cppClearStruct = (target, value) => {
        let keys = cppStructKeys.get(target);
        if (!keys)
            cppStructKeys.set(target, keys = Object.keys(target));
        for (let index = 0; index < keys.length; index++) {
            const key = keys[index];
            const field = target[key];
            if (ArrayBuffer.isView(field) || Array.isArray(field))
                field.fill(value);
            else if (field && typeof field === 'object')
                cppClearStruct(field, value);
            else
                target[key] = value;
        }
    };
    // memset: typed memory fills in place; a plain array of numbers is set
    // element by element (as the interpreter's fillGeneratedMemory writes it,
    // count elements from 0); an array holding structs, or a pointer into a
    // plain array, goes to the interpreter's rule, which clears each struct.
    const cppMemset = (runtime, target, value, count) => {
        const bytes = Number(count);
        if (Array.isArray(target)) {
            for (let index = 0; index < bytes; index++) {
                const element = target[index];
                if (element !== null && typeof element === 'object') {
                    // A struct element is cleared field by field (cppClearStruct);
                    // anything else array-like takes the interpreter's rule.
                    if (ArrayBuffer.isView(element) || Array.isArray(element) || element[cppUnionElements] === true) {
                        return runtime.macro("memset", target, value, bytes);
                    }
                    cppClearStruct(element, value);
                    continue;
                }
                target[index] = value;
            }
            return target;
        }
        if (Array.isArray(target?.source))
            return runtime.macro("memset", target, value, bytes);
        if (target?.generatedPointer) {
            const width = target.source.BYTES_PER_ELEMENT ?? 1;
            target.source.fill(value, target.offset, target.offset + Math.ceil(bytes / width));
            return target;
        }
        target.fill(value, 0, bytes);
        return target;
    };
    // A 64-bit local held as two unsigned 32-bit halves (splitWideLocals):
    // the halves of any value, and unsigned 64-bit shifts of a pair, exactly as
    // execute.ts's wide operators answer them (a shift of 64 or more is 0).
    const cppLo64 = (v) => typeof v === 'bigint' ? Number(BigInt.asUintN(32, v)) : (Number(v) >>> 0);
    const cppHi64 = (v) => typeof v === 'bigint' ? Number(BigInt.asUintN(32, v >> 32n)) : (Math.floor(Number(v) / 4294967296) >>> 0);
    const cppShl64Lo = (lo, hi, s) => s < 0 ? cppShr64Lo(lo, hi, -s) : s === 0 ? lo : s < 32 ? (lo << s) >>> 0 : 0;
    const cppShl64Hi = (lo, hi, s) => s < 0 ? cppShr64Hi(lo, hi, -s) : s === 0 ? hi : s < 32 ? ((hi << s) | (lo >>> (32 - s))) >>> 0 : s < 64 ? (lo << (s - 32)) >>> 0 : 0;
    const cppShr64Lo = (lo, hi, s) => s < 0 ? cppShl64Lo(lo, hi, -s) : s === 0 ? lo : s < 32 ? ((lo >>> s) | (hi << (32 - s))) >>> 0 : s < 64 ? hi >>> (s - 32) : 0;
    const cppShr64Hi = (lo, hi, s) => s < 0 ? cppShl64Hi(lo, hi, -s) : s === 0 ? hi : s < 32 ? hi >>> s : 0;
    const cppStringText = (value) => typeof value === 'string' ? value
        : typeof value === 'number' || typeof value === 'boolean' ? String(Number(value))
            : value === undefined || value === null ? '' : String(value);
    const __mame_table_0 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 16, 17, 18, 19, 20, 21, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 32, 33, 34, 35, 36, 37, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 48, 49, 50, 51, 52, 53, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 64, 65, 66, 67, 68, 69, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 80, 81, 82, 83, 84, 85, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 96, 97, 98, 99, 100, 101, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 112, 113, 114, 115, 116, 117, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 128, 129, 130, 131, 132, 133, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 144, 145, 146, 147, 148, 149, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 256, 257, 258, 259, 260, 261, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 272, 273, 274, 275, 276, 277, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 288, 289, 290, 291, 292, 293, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 304, 305, 306, 307, 308, 309, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 320, 321, 322, 323, 324, 325, 320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 336, 337, 338, 339, 340, 341, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 352, 353, 354, 355, 356, 357, 358, 359, 360, 361, 362, 363, 364, 365, 366, 367, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449, 450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 466, 467, 468, 469, 470, 471, 472, 473, 474, 475, 476, 477, 478, 479, 480, 481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494, 495, 496, 497, 498, 499, 500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354, 355, 356, 357, 358, 359, 360, 361, 362, 363, 364, 365, 366, 367, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449, 450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 466, 467, 468, 469, 470, 471, 472, 473, 474, 475, 476, 477, 478, 479, 480, 481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494, 495, 496, 497, 498, 499, 500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354, 355, 356, 357, 358, 359, 360, 361, 362, 363, 364, 365, 366, 367, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449, 450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 466, 467, 468, 469, 470, 471, 472, 473, 474, 475, 476, 477, 478, 479, 480, 481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494, 495, 496, 497, 498, 499, 500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354, 355, 356, 357, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 416, 417, 418, 419, 420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449, 450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 466, 467, 468, 469, 470, 471, 472, 473, 474, 475, 476, 477, 478, 479, 480, 481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494, 495, 496, 497, 498, 499, 500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354, 355, 356, 357, 358, 359, 360, 361, 362, 363, 364, 365, 366, 367, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 506, 507, 508, 509, 510, 511, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354, 355, 356, 357, 358, 359, 360, 361, 362, 363, 364, 365, 366, 367, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449, 450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 466, 467, 468, 469, 470, 471, 472, 473, 474, 475, 476, 477, 478, 479, 480, 481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494, 495, 496, 497, 498, 499, 500, 501, 502, 503, 504, 505, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449, 450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 466, 467, 468, 469, 470, 471, 472, 473, 474, 475, 476, 477, 478, 479, 480, 481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494, 495, 496, 497, 498, 499, 500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354, 355, 356, 357, 358, 359, 360, 361, 362, 363, 364, 365, 366, 367, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409];
    function method_get_segmented_mode(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_adjust_addr_for_nonseg_mode(runtime, addr) {
        const members = runtime.members;
        return ((addr) >>> 0);
    }
    function method_cycles(runtime, cycles) {
        const members = runtime.members;
        members.m_icount = ((((members.m_icount) - (cycles))) | 0);
    }
    function method_make_segmented_addr(runtime, addr) {
        const members = runtime.members;
        return ((((((((((addr) & (8323072))) << (8))) | (2147483648))) | (((addr) & (65535))))) >>> 0);
    }
    function method_segmented_addr(runtime, addr) {
        const members = runtime.members;
        return ((((runtime.shiftRight(((addr) & (2130706432)), 8)) | (((addr) & (65535))))) >>> 0);
    }
    function method_addr_from_reg(runtime, regno) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        if (method_get_segmented_mode(runtime)) {
            return ((method_segmented_addr(runtime, h_m_regs.L[method_BYTE_XOR_BE(runtime, runtime.shiftRight(regno, 1))])) >>> 0);
        }
        else {
            return ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, regno)]) >>> 0);
        }
    }
    function method_BYTE_XOR_BE(runtime, a) {
        const members = runtime.members;
        return ((a) ^ (1));
    }
    function method_BYTE4_XOR_BE(runtime, a) {
        const members = runtime.members;
        return ((a) ^ (3));
    }
    function method_set_pc(runtime, addr) {
        const members = runtime.members;
        if (method_get_segmented_mode(runtime)) {
            members.m_pc = ((addr) >>> 0);
        }
        else {
            members.m_pc = (((((((members.m_pc ?? 0)) & (4294901760))) | (((addr) & (65535))))) >>> 0);
        }
    }
    function method_zinvalid(runtime) {
        const members = runtime.members;
        0;
    }
    function method_Z00_0000_dddd_imm8(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let imm8 = ((((method_get_operand(runtime, 1)) & 0xff)) & 0xff);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = method_ADDB(runtime, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))], imm8);
    }
    function method_get_operand(runtime, opnum) {
        const members = runtime.members;
        const h_m_op = members.m_op ?? 0;
        let i = ((0) | 0);
        for (i = ((0) | 0); (((i) < (opnum)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
        }
        if ((((((members.m_op_valid ?? 0)) & (((1) << (opnum))))) ? 0 : 1)) {
            h_m_op[opnum] = (__deref_get_operand(runtime, members.m_cache).read_word?.((members.m_pc ?? 0)) ?? 0);
            members.m_pc = ((((members.m_pc) + (2))) >>> 0);
            members.m_op_valid = ((((members.m_op_valid) | (((1) << (opnum))))) >>> 0);
        }
        return ((h_m_op[opnum]) >>> 0);
    }
    function __deref_get_operand(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_BYTE8_XOR_BE(runtime, a) {
        const members = runtime.members;
        return ((a) ^ (7));
    }
    function method_ADDB(runtime, dest, value) {
        const members = runtime.members;
        dest = ((dest) & 0xff);
        value = ((value) & 0xff);
        let result = ((((dest) + (value))) & 0xff);
        members.m_fcw = ((((members.m_fcw) & (-245))) & 0xffff);
        members.m_fcw = ((((members.m_fcw) & (-9))) & 0xffff);
        if (((result) ? 0 : 1)) {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
        else {
            if ((((((result) << 24 >> 24)) < (0)) ? 1 : 0)) {
                members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
            }
        }
        if ((((result) < (dest)) ? 1 : 0)) {
            members.m_fcw = ((((members.m_fcw) | (128))) & 0xffff);
        }
        if (((((((((value) & (dest))) & ((~result)))) | ((((((~value)) & ((~dest)))) & (result))))) & (128))) {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
        if (((Number(((result) & (15))) < Number(((dest) & (15)))) ? 1 : 0)) {
            members.m_fcw = ((((members.m_fcw) | (4))) & 0xffff);
        }
        return ((result) & 0xff);
    }
    function method_Z00_ssN0_dddd(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = method_ADDB(runtime, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))], method_RDIR_B(runtime, src));
    }
    function method_RDIR_B(runtime, reg) {
        const members = runtime.members;
        reg = ((reg) & 0xff);
        return ((method_RDMEM_B(runtime, ((((Number(reg) === Number(((method_get_segmented_mode(runtime)) ? (14) : (15)))) ? 1 : 0)) ? ((members.m_stack ?? 0)) : ((members.m_data ?? 0))), method_addr_from_reg(runtime, reg))) & 0xff);
    }
    function method_RDMEM_B(runtime, space, addr) {
        const members = runtime.members;
        addr = ((method_adjust_addr_for_nonseg_mode(runtime, addr)) >>> 0);
        return (((__deref_RDMEM_B(runtime, space).read_byte?.(addr) ?? 0)) & 0xff);
    }
    function __deref_RDMEM_B(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_Z01_0000_dddd_imm16(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let imm16 = ((method_get_operand(runtime, 1)) & 0xffff);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = method_ADDW(runtime, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)], imm16);
    }
    function method_ADDW(runtime, dest, value) {
        const members = runtime.members;
        dest = ((dest) & 0xffff);
        value = ((value) & 0xffff);
        let result = ((((dest) + (value))) & 0xffff);
        members.m_fcw = ((((members.m_fcw) & (-241))) & 0xffff);
        if (((result) ? 0 : 1)) {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
        else {
            if ((((((result) << 16 >> 16)) < (0)) ? 1 : 0)) {
                members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
            }
        }
        if ((((result) < (dest)) ? 1 : 0)) {
            members.m_fcw = ((((members.m_fcw) | (128))) & 0xffff);
        }
        if (((((((((value) & (dest))) & ((~result)))) | ((((((~value)) & ((~dest)))) & (result))))) & (32768))) {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
        return ((result) & 0xffff);
    }
    function method_Z01_ssN0_dddd(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = method_ADDW(runtime, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)], method_RDIR_W(runtime, src));
    }
    function method_RDIR_W(runtime, reg) {
        const members = runtime.members;
        reg = ((reg) & 0xff);
        return ((method_RDMEM_W(runtime, ((((Number(reg) === Number(((method_get_segmented_mode(runtime)) ? (14) : (15)))) ? 1 : 0)) ? ((members.m_stack ?? 0)) : ((members.m_data ?? 0))), method_addr_from_reg(runtime, reg))) & 0xffff);
    }
    function method_RDMEM_W(runtime, space, addr) {
        const members = runtime.members;
        addr = ((method_adjust_addr_for_nonseg_mode(runtime, addr)) >>> 0);
        addr = ((((addr) & (-2))) >>> 0);
        if (((((members.m_m20_hack ?? 0)) && ((((addr) >= (8323072)) ? 1 : 0))) ? 1 : 0)) {
            members.m_irq_req = ((16) & 0xff);
            return ((65535) & 0xffff);
        }
        return (((__deref_RDMEM_W(runtime, space).read_word?.(addr) ?? 0)) & 0xffff);
    }
    function __deref_RDMEM_W(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_Z02_0000_dddd_imm8(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let imm8 = ((((method_get_operand(runtime, 1)) & 0xff)) & 0xff);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = method_SUBB(runtime, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))], imm8);
    }
    function method_SUBB(runtime, dest, value) {
        const members = runtime.members;
        dest = ((dest) & 0xff);
        value = ((value) & 0xff);
        let result = ((((dest) - (value))) & 0xff);
        members.m_fcw = ((((members.m_fcw) & (-245))) & 0xffff);
        members.m_fcw = ((((members.m_fcw) | (8))) & 0xffff);
        if (((result) ? 0 : 1)) {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
        else {
            if ((((((result) << 24 >> 24)) < (0)) ? 1 : 0)) {
                members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
            }
        }
        if ((((result) > (dest)) ? 1 : 0)) {
            members.m_fcw = ((((members.m_fcw) | (128))) & 0xffff);
        }
        if ((((((((((~value)) & (dest))) & ((~result)))) | (((((value) & ((~dest)))) & (result))))) & (128))) {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
        if (((Number(((result) & (15))) > Number(((dest) & (15)))) ? 1 : 0)) {
            members.m_fcw = ((((members.m_fcw) | (4))) & 0xffff);
        }
        return ((result) & 0xff);
    }
    function method_Z02_ssN0_dddd(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = method_SUBB(runtime, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))], method_RDIR_B(runtime, src));
    }
    function method_Z03_0000_dddd_imm16(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let imm16 = ((method_get_operand(runtime, 1)) & 0xffff);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = method_SUBW(runtime, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)], imm16);
    }
    function method_SUBW(runtime, dest, value) {
        const members = runtime.members;
        dest = ((dest) & 0xffff);
        value = ((value) & 0xffff);
        let result = ((((dest) - (value))) & 0xffff);
        members.m_fcw = ((((members.m_fcw) & (-241))) & 0xffff);
        if (((result) ? 0 : 1)) {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
        else {
            if ((((((result) << 16 >> 16)) < (0)) ? 1 : 0)) {
                members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
            }
        }
        if ((((result) > (dest)) ? 1 : 0)) {
            members.m_fcw = ((((members.m_fcw) | (128))) & 0xffff);
        }
        if ((((((((((~value)) & (dest))) & ((~result)))) | (((((value) & ((~dest)))) & (result))))) & (32768))) {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
        return ((result) & 0xffff);
    }
    function method_Z03_ssN0_dddd(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = method_SUBW(runtime, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)], method_RDIR_W(runtime, src));
    }
    function method_Z04_0000_dddd_imm8(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let imm8 = ((((method_get_operand(runtime, 1)) & 0xff)) & 0xff);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = method_ORB(runtime, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))], imm8);
    }
    function method_ORB(runtime, dest, value) {
        const members = runtime.members;
        dest = ((dest) & 0xff);
        value = ((value) & 0xff);
        const h_z8000_zsp = members.z8000_zsp ?? 0;
        let result = ((((dest) | (value))) & 0xff);
        members.m_fcw = ((((members.m_fcw) & (-113))) & 0xffff);
        members.m_fcw = ((((members.m_fcw) | (h_z8000_zsp[result]))) & 0xffff);
        return ((result) & 0xff);
    }
    function method_Z04_ssN0_dddd(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = method_ORB(runtime, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))], method_RDIR_B(runtime, src));
    }
    function method_Z05_0000_dddd_imm16(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let imm16 = ((method_get_operand(runtime, 1)) & 0xffff);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = method_ORW(runtime, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)], imm16);
    }
    function method_ORW(runtime, dest, value) {
        const members = runtime.members;
        dest = ((dest) & 0xffff);
        value = ((value) & 0xffff);
        let result = ((((dest) | (value))) & 0xffff);
        members.m_fcw = ((((members.m_fcw) & (-97))) & 0xffff);
        if (((result) ? 0 : 1)) {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
        else {
            if ((((((result) << 16 >> 16)) < (0)) ? 1 : 0)) {
                members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
            }
        }
        return ((result) & 0xffff);
    }
    function method_Z05_ssN0_dddd(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = method_ORW(runtime, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)], method_RDIR_W(runtime, src));
    }
    function method_Z06_0000_dddd_imm8(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let imm8 = ((((method_get_operand(runtime, 1)) & 0xff)) & 0xff);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = method_ANDB(runtime, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))], imm8);
    }
    function method_ANDB(runtime, dest, value) {
        const members = runtime.members;
        dest = ((dest) & 0xff);
        value = ((value) & 0xff);
        const h_z8000_zsp = members.z8000_zsp ?? 0;
        let result = ((((dest) & (value))) & 0xff);
        members.m_fcw = ((((members.m_fcw) & (-113))) & 0xffff);
        members.m_fcw = ((((members.m_fcw) | (h_z8000_zsp[result]))) & 0xffff);
        return ((result) & 0xff);
    }
    function method_Z06_ssN0_dddd(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = method_ANDB(runtime, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))], method_RDIR_B(runtime, src));
    }
    function method_Z07_0000_dddd_imm16(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let imm16 = ((method_get_operand(runtime, 1)) & 0xffff);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = method_ANDW(runtime, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)], imm16);
    }
    function method_ANDW(runtime, dest, value) {
        const members = runtime.members;
        dest = ((dest) & 0xffff);
        value = ((value) & 0xffff);
        let result = ((((dest) & (value))) & 0xffff);
        members.m_fcw = ((((members.m_fcw) & (-97))) & 0xffff);
        if (((result) ? 0 : 1)) {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
        else {
            if ((((((result) << 16 >> 16)) < (0)) ? 1 : 0)) {
                members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
            }
        }
        return ((result) & 0xffff);
    }
    function method_Z07_ssN0_dddd(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = method_ANDW(runtime, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)], method_RDIR_W(runtime, src));
    }
    function method_Z08_0000_dddd_imm8(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let imm8 = ((((method_get_operand(runtime, 1)) & 0xff)) & 0xff);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = method_XORB(runtime, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))], imm8);
    }
    function method_XORB(runtime, dest, value) {
        const members = runtime.members;
        dest = ((dest) & 0xff);
        value = ((value) & 0xff);
        const h_z8000_zsp = members.z8000_zsp ?? 0;
        let result = ((((dest) ^ (value))) & 0xff);
        members.m_fcw = ((((members.m_fcw) & (-113))) & 0xffff);
        members.m_fcw = ((((members.m_fcw) | (h_z8000_zsp[result]))) & 0xffff);
        return ((result) & 0xff);
    }
    function method_Z08_ssN0_dddd(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = method_XORB(runtime, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))], method_RDIR_B(runtime, src));
    }
    function method_Z09_0000_dddd_imm16(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let imm16 = ((method_get_operand(runtime, 1)) & 0xffff);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = method_XORW(runtime, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)], imm16);
    }
    function method_XORW(runtime, dest, value) {
        const members = runtime.members;
        dest = ((dest) & 0xffff);
        value = ((value) & 0xffff);
        let result = ((((dest) ^ (value))) & 0xffff);
        members.m_fcw = ((((members.m_fcw) & (-97))) & 0xffff);
        if (((result) ? 0 : 1)) {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
        else {
            if ((((((result) << 16 >> 16)) < (0)) ? 1 : 0)) {
                members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
            }
        }
        return ((result) & 0xffff);
    }
    function method_Z09_ssN0_dddd(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = method_XORW(runtime, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)], method_RDIR_W(runtime, src));
    }
    function method_Z0A_0000_dddd_imm8(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let imm8 = ((((method_get_operand(runtime, 1)) & 0xff)) & 0xff);
        method_CPB(runtime, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))], imm8);
    }
    function method_CPB(runtime, dest, value) {
        const members = runtime.members;
        dest = ((dest) & 0xff);
        value = ((value) & 0xff);
        let result = ((((dest) - (value))) & 0xff);
        members.m_fcw = ((((members.m_fcw) & (-241))) & 0xffff);
        if (((result) ? 0 : 1)) {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
        else {
            if ((((((result) << 24 >> 24)) < (0)) ? 1 : 0)) {
                members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
            }
        }
        if ((((result) > (dest)) ? 1 : 0)) {
            members.m_fcw = ((((members.m_fcw) | (128))) & 0xffff);
        }
        if ((((((((((~value)) & (dest))) & ((~result)))) | (((((value) & ((~dest)))) & (result))))) & (128))) {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
    }
    function method_Z0A_ssN0_dddd(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        method_CPB(runtime, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))], method_RDIR_B(runtime, src));
    }
    function method_Z0B_0000_dddd_imm16(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let imm16 = ((method_get_operand(runtime, 1)) & 0xffff);
        method_CPW(runtime, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)], imm16);
    }
    function method_CPW(runtime, dest, value) {
        const members = runtime.members;
        dest = ((dest) & 0xffff);
        value = ((value) & 0xffff);
        let result = ((((dest) - (value))) & 0xffff);
        members.m_fcw = ((((members.m_fcw) & (-241))) & 0xffff);
        if (((result) ? 0 : 1)) {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
        else {
            if ((((((result) << 16 >> 16)) < (0)) ? 1 : 0)) {
                members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
            }
        }
        if ((((result) > (dest)) ? 1 : 0)) {
            members.m_fcw = ((((members.m_fcw) | (128))) & 0xffff);
        }
        if ((((((((((~value)) & (dest))) & ((~result)))) | (((((value) & ((~dest)))) & (result))))) & (32768))) {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
    }
    function method_Z0B_ssN0_dddd(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        method_CPW(runtime, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)], method_RDIR_W(runtime, src));
    }
    function method_Z0C_ddN0_0000(runtime) {
        const members = runtime.members;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let space = ((((Number(dst) === Number(((method_get_segmented_mode(runtime)) ? (14) : (15)))) ? 1 : 0)) ? ((members.m_stack ?? 0)) : ((members.m_data ?? 0)));
        let addr = ((method_addr_from_reg(runtime, dst)) >>> 0);
        method_WRMEM_B(runtime, space, addr, method_COMB(runtime, method_RDMEM_B(runtime, space, addr)));
    }
    function method_WRMEM_B(runtime, space, addr, value) {
        const members = runtime.members;
        value = ((value) & 0xff);
        addr = ((method_adjust_addr_for_nonseg_mode(runtime, addr)) >>> 0);
        let value16 = ((((value) | (((value) << (8))))) & 0xffff);
        (__deref_WRMEM_B(runtime, space).write_word?.(((addr) & (-2)), value16, (((((addr) >>> (0)) & 1)) ? (255) : (65280))) ?? 0);
    }
    function __deref_WRMEM_B(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_COMB(runtime, dest) {
        const members = runtime.members;
        dest = ((dest) & 0xff);
        const h_z8000_zsp = members.z8000_zsp ?? 0;
        let result = (((~dest)) & 0xff);
        members.m_fcw = ((((members.m_fcw) & (-113))) & 0xffff);
        members.m_fcw = ((((members.m_fcw) | (h_z8000_zsp[result]))) & 0xffff);
        return ((result) & 0xff);
    }
    function method_Z0C_ddN0_0001_imm8(runtime) {
        const members = runtime.members;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let imm8 = ((((method_get_operand(runtime, 1)) & 0xff)) & 0xff);
        method_CPB(runtime, method_RDIR_B(runtime, dst), imm8);
    }
    function method_Z0C_ddN0_0010(runtime) {
        const members = runtime.members;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let space = ((((Number(dst) === Number(((method_get_segmented_mode(runtime)) ? (14) : (15)))) ? 1 : 0)) ? ((members.m_stack ?? 0)) : ((members.m_data ?? 0)));
        let addr = ((method_addr_from_reg(runtime, dst)) >>> 0);
        method_WRMEM_B(runtime, space, addr, method_NEGB(runtime, method_RDMEM_B(runtime, space, addr)));
    }
    function method_NEGB(runtime, dest) {
        const members = runtime.members;
        dest = ((dest) & 0xff);
        let result = (((((-dest)) & 0xff)) & 0xff);
        members.m_fcw = ((((members.m_fcw) & (-241))) & 0xffff);
        if (((result) ? 0 : 1)) {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
        else {
            if ((((((result) << 24 >> 24)) < (0)) ? 1 : 0)) {
                members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
            }
        }
        if ((((result) > (0)) ? 1 : 0)) {
            members.m_fcw = ((((members.m_fcw) | (128))) & 0xffff);
        }
        if ((((result) === (128)) ? 1 : 0)) {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
        return ((result) & 0xff);
    }
    function method_Z0C_ddN0_0100(runtime) {
        const members = runtime.members;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        method_TESTB(runtime, method_RDIR_B(runtime, dst));
    }
    function method_TESTB(runtime, result) {
        const members = runtime.members;
        result = ((result) & 0xff);
        const h_z8000_zsp = members.z8000_zsp ?? 0;
        members.m_fcw = ((((members.m_fcw) & (-113))) & 0xffff);
        members.m_fcw = ((((members.m_fcw) | (h_z8000_zsp[result]))) & 0xffff);
    }
    function method_Z0C_ddN0_0101_imm8(runtime) {
        const members = runtime.members;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let imm8 = ((((method_get_operand(runtime, 1)) & 0xff)) & 0xff);
        method_WRIR_B(runtime, dst, imm8);
    }
    function method_WRIR_B(runtime, reg, value) {
        const members = runtime.members;
        reg = ((reg) & 0xff);
        value = ((value) & 0xff);
        method_WRMEM_B(runtime, ((((Number(reg) === Number(((method_get_segmented_mode(runtime)) ? (14) : (15)))) ? 1 : 0)) ? ((members.m_stack ?? 0)) : ((members.m_data ?? 0))), method_addr_from_reg(runtime, reg), value);
    }
    function method_Z0C_ddN0_0110(runtime) {
        const members = runtime.members;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let space = ((((Number(dst) === Number(((method_get_segmented_mode(runtime)) ? (14) : (15)))) ? 1 : 0)) ? ((members.m_stack ?? 0)) : ((members.m_data ?? 0)));
        let addr = ((method_addr_from_reg(runtime, dst)) >>> 0);
        if (((method_RDMEM_B(runtime, space, addr)) & (128))) {
            members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
        }
        else {
            members.m_fcw = ((((members.m_fcw) & (-33))) & 0xffff);
        }
        method_WRMEM_B(runtime, space, addr, 255);
    }
    function method_Z0C_ddN0_1000(runtime) {
        const members = runtime.members;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        method_WRIR_B(runtime, dst, 0);
    }
    function method_Z0D_ddN0_0000(runtime) {
        const members = runtime.members;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let space = ((((Number(dst) === Number(((method_get_segmented_mode(runtime)) ? (14) : (15)))) ? 1 : 0)) ? ((members.m_stack ?? 0)) : ((members.m_data ?? 0)));
        let addr = ((method_addr_from_reg(runtime, dst)) >>> 0);
        method_WRMEM_W(runtime, space, addr, method_COMW(runtime, method_RDMEM_W(runtime, space, addr)));
    }
    function method_WRMEM_W(runtime, space, addr, value) {
        const members = runtime.members;
        value = ((value) & 0xffff);
        addr = ((method_adjust_addr_for_nonseg_mode(runtime, addr)) >>> 0);
        addr = ((((addr) & (-2))) >>> 0);
        (__deref_WRMEM_W(runtime, space).write_word?.(addr, value) ?? 0);
    }
    function __deref_WRMEM_W(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_COMW(runtime, dest) {
        const members = runtime.members;
        dest = ((dest) & 0xffff);
        let result = (((~dest)) & 0xffff);
        members.m_fcw = ((((members.m_fcw) & (-97))) & 0xffff);
        if (((result) ? 0 : 1)) {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
        else {
            if ((((((result) << 16 >> 16)) < (0)) ? 1 : 0)) {
                members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
            }
        }
        return ((result) & 0xffff);
    }
    function method_Z0D_ddN0_0001_imm16(runtime) {
        const members = runtime.members;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let imm16 = ((method_get_operand(runtime, 1)) & 0xffff);
        method_CPW(runtime, method_RDIR_W(runtime, dst), imm16);
    }
    function method_Z0D_ddN0_0010(runtime) {
        const members = runtime.members;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let space = ((((Number(dst) === Number(((method_get_segmented_mode(runtime)) ? (14) : (15)))) ? 1 : 0)) ? ((members.m_stack ?? 0)) : ((members.m_data ?? 0)));
        let addr = ((method_addr_from_reg(runtime, dst)) >>> 0);
        method_WRMEM_W(runtime, space, addr, method_NEGW(runtime, method_RDMEM_W(runtime, space, addr)));
    }
    function method_NEGW(runtime, dest) {
        const members = runtime.members;
        dest = ((dest) & 0xffff);
        let result = (((((-dest)) & 0xffff)) & 0xffff);
        members.m_fcw = ((((members.m_fcw) & (-241))) & 0xffff);
        if (((result) ? 0 : 1)) {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
        else {
            if ((((((result) << 16 >> 16)) < (0)) ? 1 : 0)) {
                members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
            }
        }
        if ((((result) > (0)) ? 1 : 0)) {
            members.m_fcw = ((((members.m_fcw) | (128))) & 0xffff);
        }
        if ((((result) === (32768)) ? 1 : 0)) {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
        return ((result) & 0xffff);
    }
    function method_Z0D_ddN0_0100(runtime) {
        const members = runtime.members;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        method_TESTW(runtime, method_RDIR_W(runtime, dst));
    }
    function method_TESTW(runtime, dest) {
        const members = runtime.members;
        dest = ((dest) & 0xffff);
        members.m_fcw = ((((members.m_fcw) & (-97))) & 0xffff);
        if (((dest) ? 0 : 1)) {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
        else {
            if (((dest) & (32768))) {
                members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
            }
        }
    }
    function method_Z0D_ddN0_0101_imm16(runtime) {
        const members = runtime.members;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let imm16 = ((method_get_operand(runtime, 1)) & 0xffff);
        method_WRIR_W(runtime, dst, imm16);
    }
    function method_WRIR_W(runtime, reg, value) {
        const members = runtime.members;
        reg = ((reg) & 0xff);
        value = ((value) & 0xffff);
        method_WRMEM_W(runtime, ((((Number(reg) === Number(((method_get_segmented_mode(runtime)) ? (14) : (15)))) ? 1 : 0)) ? ((members.m_stack ?? 0)) : ((members.m_data ?? 0))), method_addr_from_reg(runtime, reg), value);
    }
    function method_Z0D_ddN0_0110(runtime) {
        const members = runtime.members;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let space = ((((Number(dst) === Number(((method_get_segmented_mode(runtime)) ? (14) : (15)))) ? 1 : 0)) ? ((members.m_stack ?? 0)) : ((members.m_data ?? 0)));
        let addr = ((method_addr_from_reg(runtime, dst)) >>> 0);
        if (((method_RDMEM_W(runtime, space, addr)) & (32768))) {
            members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
        }
        else {
            members.m_fcw = ((((members.m_fcw) & (-33))) & 0xffff);
        }
        method_WRMEM_W(runtime, space, addr, 65535);
    }
    function method_Z0D_ddN0_1000(runtime) {
        const members = runtime.members;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        method_WRIR_W(runtime, dst, 0);
    }
    function method_Z0D_ddN0_1001_imm16(runtime) {
        const members = runtime.members;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let imm16 = ((method_get_operand(runtime, 1)) & 0xffff);
        method_PUSHW(runtime, dst, imm16);
    }
    function method_PUSHW(runtime, dst, value) {
        const members = runtime.members;
        dst = ((dst) & 0xff);
        value = ((value) & 0xffff);
        const h_m_regs = members.m_regs ?? 0;
        if (method_get_segmented_mode(runtime)) {
            h_m_regs.W[method_BYTE4_XOR_BE(runtime, ((dst) | (1)))] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, ((dst) | (1)))]) + (((-2) - (((h_m_regs.W[method_BYTE4_XOR_BE(runtime, ((dst) | (1)))]) & (1))))));
        }
        else {
            h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)]) + (((-2) - (((h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)]) & (1))))));
        }
        method_WRIR_W(runtime, dst, value);
    }
    function method_Z0E_imm8(runtime) {
        const members = runtime.members;
        if ((((((members.m_fcw ?? 0)) & (8192))) ? 0 : 1)) {
            members.m_irq_req = ((((members.m_irq_req) | (128))) & 0xff);
            return;
        }
        let imm8 = ((((method_get_operand(runtime, 0)) & 0xff)) & 0xff);
        0;
        if ((((members.m_fcw ?? 0)) & (8192))) {
        }
    }
    function method_Z0F_imm8(runtime) {
        const members = runtime.members;
        if ((((((members.m_fcw ?? 0)) & (8192))) ? 0 : 1)) {
            members.m_irq_req = ((((members.m_irq_req) | (128))) & 0xff);
            return;
        }
        let imm8 = ((((method_get_operand(runtime, 0)) & 0xff)) & 0xff);
        0;
        if ((((members.m_fcw ?? 0)) & (8192))) {
        }
    }
    function method_Z10_0000_dddd_imm32(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let imm32 = ((method_get_operand(runtime, 1)) >>> 0);
        imm32 = ((__add_Z10_0000_dddd_imm32(runtime, ((imm32) << (16)), method_get_operand(runtime, 2))) >>> 0);
        method_CPL(runtime, h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))], imm32);
    }
    function __add_Z10_0000_dddd_imm32(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_CPL(runtime, dest, value) {
        const members = runtime.members;
        let result = ((((dest) - (value))) >>> 0);
        members.m_fcw = ((((members.m_fcw) & (-241))) & 0xffff);
        if (((result) ? 0 : 1)) {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
        else {
            if ((((((result) | 0)) < (0)) ? 1 : 0)) {
                members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
            }
        }
        if ((((result) > (dest)) ? 1 : 0)) {
            members.m_fcw = ((((members.m_fcw) | (128))) & 0xffff);
        }
        if ((((((((((~value)) & (dest))) & ((~result)))) | (((((value) & ((~dest)))) & (result))))) & (2147483648))) {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
    }
    function method_Z10_ssN0_dddd(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        method_CPL(runtime, h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))], method_RDIR_L(runtime, src));
    }
    function method_RDIR_L(runtime, reg) {
        const members = runtime.members;
        reg = ((reg) & 0xff);
        return ((method_RDMEM_L(runtime, ((((Number(reg) === Number(((method_get_segmented_mode(runtime)) ? (14) : (15)))) ? 1 : 0)) ? ((members.m_stack ?? 0)) : ((members.m_data ?? 0))), method_addr_from_reg(runtime, reg))) >>> 0);
    }
    function method_RDMEM_L(runtime, space, addr) {
        const members = runtime.members;
        let result = ((0) >>> 0);
        addr = ((method_adjust_addr_for_nonseg_mode(runtime, addr)) >>> 0);
        addr = ((((addr) & (-2))) >>> 0);
        result = (((((__deref_RDMEM_L(runtime, space).read_word?.(addr) ?? 0)) << (16))) >>> 0);
        return ((((result) + ((__deref_RDMEM_L(runtime, space).read_word?.(method_addr_add(runtime, addr, 2)) ?? 0)))) >>> 0);
    }
    function __deref_RDMEM_L(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_addr_add(runtime, addr, addend) {
        const members = runtime.members;
        return ((((((addr) & (4294901760))) | (((((addr) + (addend))) & (65535))))) >>> 0);
    }
    function method_Z11_ddN0_ssN0(runtime) {
        const members = runtime.members;
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        method_PUSHL(runtime, dst, method_RDIR_L(runtime, src));
    }
    function method_PUSHL(runtime, dst, value) {
        const members = runtime.members;
        dst = ((dst) & 0xff);
        const h_m_regs = members.m_regs ?? 0;
        if (method_get_segmented_mode(runtime)) {
            h_m_regs.W[method_BYTE4_XOR_BE(runtime, ((dst) | (1)))] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, ((dst) | (1)))]) + (((-4) - (((h_m_regs.W[method_BYTE4_XOR_BE(runtime, ((dst) | (1)))]) & (1))))));
        }
        else {
            h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)]) + (((-4) - (((h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)]) & (1))))));
        }
        method_WRIR_L(runtime, dst, value);
    }
    function method_WRIR_L(runtime, reg, value) {
        const members = runtime.members;
        reg = ((reg) & 0xff);
        method_WRMEM_L(runtime, ((((Number(reg) === Number(((method_get_segmented_mode(runtime)) ? (14) : (15)))) ? 1 : 0)) ? ((members.m_stack ?? 0)) : ((members.m_data ?? 0))), method_addr_from_reg(runtime, reg), value);
    }
    function method_WRMEM_L(runtime, space, addr, value) {
        const members = runtime.members;
        addr = ((method_adjust_addr_for_nonseg_mode(runtime, addr)) >>> 0);
        addr = ((((addr) & (-2))) >>> 0);
        (__deref_WRMEM_L(runtime, space).write_word?.(addr, ((value) >>> (16))) ?? 0);
        (__deref_WRMEM_L(runtime, space).write_word?.(method_addr_add(runtime, addr, 2), ((value) & (65535))) ?? 0);
    }
    function __deref_WRMEM_L(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_Z12_0000_dddd_imm32(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let imm32 = ((method_get_operand(runtime, 1)) >>> 0);
        imm32 = ((__add_Z12_0000_dddd_imm32(runtime, ((imm32) << (16)), method_get_operand(runtime, 2))) >>> 0);
        h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))] = method_SUBL(runtime, h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))], imm32);
    }
    function __add_Z12_0000_dddd_imm32(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_SUBL(runtime, dest, value) {
        const members = runtime.members;
        let result = ((((dest) - (value))) >>> 0);
        members.m_fcw = ((((members.m_fcw) & (-241))) & 0xffff);
        if (((result) ? 0 : 1)) {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
        else {
            if ((((((result) | 0)) < (0)) ? 1 : 0)) {
                members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
            }
        }
        if ((((result) > (dest)) ? 1 : 0)) {
            members.m_fcw = ((((members.m_fcw) | (128))) & 0xffff);
        }
        if ((((((((((~value)) & (dest))) & ((~result)))) | (((((value) & ((~dest)))) & (result))))) & (2147483648))) {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
        return ((result) >>> 0);
    }
    function method_Z12_ssN0_dddd(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))] = method_SUBL(runtime, h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))], method_RDIR_L(runtime, src));
    }
    function method_Z13_ddN0_ssN0(runtime) {
        const members = runtime.members;
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        method_PUSHW(runtime, dst, method_RDIR_W(runtime, src));
    }
    function method_Z14_0000_dddd_imm32(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let imm32 = ((method_get_operand(runtime, 1)) >>> 0);
        imm32 = ((__add_Z14_0000_dddd_imm32(runtime, ((imm32) << (16)), method_get_operand(runtime, 2))) >>> 0);
        h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))] = imm32;
    }
    function __add_Z14_0000_dddd_imm32(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_Z14_ssN0_dddd(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))] = method_RDIR_L(runtime, src);
    }
    function method_Z15_ssN0_ddN0(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))] = method_POPL(runtime, src);
    }
    function method_POPL(runtime, src) {
        const members = runtime.members;
        src = ((src) & 0xff);
        const h_m_regs = members.m_regs ?? 0;
        let result = ((method_RDIR_L(runtime, src)) >>> 0);
        if (method_get_segmented_mode(runtime)) {
            h_m_regs.W[method_BYTE4_XOR_BE(runtime, ((src) | (1)))] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, ((src) | (1)))]) + (((4) - (((h_m_regs.W[method_BYTE4_XOR_BE(runtime, ((src) | (1)))]) & (1))))));
        }
        else {
            h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]) + (((4) - (((h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]) & (1))))));
        }
        return ((result) >>> 0);
    }
    function method_Z16_0000_dddd_imm32(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let imm32 = ((method_get_operand(runtime, 1)) >>> 0);
        imm32 = ((__add_Z16_0000_dddd_imm32(runtime, ((imm32) << (16)), method_get_operand(runtime, 2))) >>> 0);
        h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))] = method_ADDL(runtime, h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))], imm32);
    }
    function __add_Z16_0000_dddd_imm32(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_ADDL(runtime, dest, value) {
        const members = runtime.members;
        let result = ((((dest) + (value))) >>> 0);
        members.m_fcw = ((((members.m_fcw) & (-241))) & 0xffff);
        if (((result) ? 0 : 1)) {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
        else {
            if ((((((result) | 0)) < (0)) ? 1 : 0)) {
                members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
            }
        }
        if ((((result) < (dest)) ? 1 : 0)) {
            members.m_fcw = ((((members.m_fcw) | (128))) & 0xffff);
        }
        if (((((((((value) & (dest))) & ((~result)))) | ((((((~value)) & ((~dest)))) & (result))))) & (2147483648))) {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
        return ((result) >>> 0);
    }
    function method_Z16_ssN0_dddd(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))] = method_ADDL(runtime, h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))], method_RDIR_L(runtime, src));
    }
    function method_Z17_ssN0_ddN0(runtime) {
        const members = runtime.members;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        method_WRIR_W(runtime, dst, method_POPW(runtime, src));
    }
    function method_POPW(runtime, src) {
        const members = runtime.members;
        src = ((src) & 0xff);
        const h_m_regs = members.m_regs ?? 0;
        let result = ((method_RDIR_W(runtime, src)) & 0xffff);
        if (method_get_segmented_mode(runtime)) {
            h_m_regs.W[method_BYTE4_XOR_BE(runtime, ((src) | (1)))] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, ((src) | (1)))]) + (((2) - (((h_m_regs.W[method_BYTE4_XOR_BE(runtime, ((src) | (1)))]) & (1))))));
        }
        else {
            h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]) + (((2) - (((h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]) & (1))))));
        }
        return ((result) & 0xffff);
    }
    function method_Z18_00N0_dddd_imm32(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let imm32 = ((method_get_operand(runtime, 1)) >>> 0);
        imm32 = ((__add_Z18_00N0_dddd_imm32(runtime, ((imm32) << (16)), method_get_operand(runtime, 2))) >>> 0);
        h_m_regs.Q[((dst) >>> (2))] = method_MULTL(runtime, h_m_regs.Q[((dst) >>> (2))], imm32);
    }
    function __add_Z18_00N0_dddd_imm32(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_MULTL(runtime, dest, value) {
        const members = runtime.members;
        let result = runtime.wide("*", ((dest) | 0), ((value) | 0));
        if (((value) ? 0 : 1)) {
            members.m_icount = ((((members.m_icount) + (252))) | 0);
        }
        else {
            let n = ((0) | 0);
            for (n = ((0) | 0); (((n) < (32)) ? 1 : 0); n = ((((n) + (1))) | 0)) {
                if (((dest) & (((1) << (n))))) {
                    members.m_icount = ((((members.m_icount) - (7))) | 0);
                }
            }
        }
        members.m_fcw = ((((members.m_fcw) & (-241))) & 0xffff);
        if (((result) ? 0 : 1)) {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
        else {
            if (runtime.wide("<", result, 0)) {
                members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
            }
        }
        if ((((runtime.wide("<", result, -2147483647)) || (runtime.wide(">=", result, 2147483647))) ? 1 : 0)) {
            members.m_fcw = ((((members.m_fcw) | (128))) & 0xffff);
        }
        return result;
    }
    function method_Z18_ssN0_dddd(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.Q[((dst) >>> (2))] = method_MULTL(runtime, h_m_regs.Q[((dst) >>> (2))], h_m_regs.L[method_BYTE_XOR_BE(runtime, ((src) >>> (1)))]);
    }
    function method_Z19_0000_dddd_imm16(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let imm16 = ((method_get_operand(runtime, 1)) & 0xffff);
        h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))] = method_MULTW(runtime, h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))], imm16);
    }
    function method_MULTW(runtime, dest, value) {
        const members = runtime.members;
        dest = ((dest) & 0xffff);
        value = ((value) & 0xffff);
        let result = ((((((((dest) << 16 >> 16)) | 0)) * (((value) << 16 >> 16)))) >>> 0);
        members.m_fcw = ((((members.m_fcw) & (-241))) & 0xffff);
        if (((result) ? 0 : 1)) {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
        else {
            if ((((((result) | 0)) < (0)) ? 1 : 0)) {
                members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
            }
        }
        if (((value) ? 0 : 1)) {
            members.m_icount = ((((members.m_icount) + (52))) | 0);
        }
        if ((((((Number(((result) | 0)) < Number(-32767)) ? 1 : 0)) || ((((((result) | 0)) >= (32767)) ? 1 : 0))) ? 1 : 0)) {
            members.m_fcw = ((((members.m_fcw) | (128))) & 0xffff);
        }
        return ((result) >>> 0);
    }
    function method_Z19_ssN0_dddd(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))] = method_MULTW(runtime, h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))], method_RDIR_W(runtime, src));
    }
    function method_Z1A_0000_dddd_imm32(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let imm32 = ((method_get_operand(runtime, 1)) >>> 0);
        imm32 = ((__add_Z1A_0000_dddd_imm32(runtime, ((imm32) << (16)), method_get_operand(runtime, 2))) >>> 0);
        h_m_regs.Q[((dst) >>> (2))] = method_DIVL(runtime, h_m_regs.Q[((dst) >>> (2))], imm32);
    }
    function __add_Z1A_0000_dddd_imm32(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_DIVL(runtime, dest, value) {
        const members = runtime.members;
        let result = dest;
        let remainder = ((0) >>> 0);
        members.m_fcw = ((((members.m_fcw) & (-241))) & 0xffff);
        if (value) {
            let qsign = ((runtime.low32(runtime.wide("&", runtime.wide("^", runtime.wide(">>", dest, 32), ((value) >>> 0)), 2147483648))) >>> 0);
            let rsign = ((runtime.low32(runtime.wide("&", runtime.wide(">>", dest, 32), 2147483648))) >>> 0);
            if (runtime.wide("<", dest, 0)) {
                dest = (-dest);
            }
            if ((((((value) | 0)) < (0)) ? 1 : 0)) {
                value = (((-value)) >>> 0);
            }
            result = runtime.wide("/", dest, ((value) >>> 0));
            remainder = ((runtime.low32(runtime.wide("%", dest, ((value) >>> 0)))) >>> 0);
            if (qsign) {
                result = (-result);
            }
            if (rsign) {
                remainder = (((-remainder)) >>> 0);
            }
            if ((((runtime.wide("<", result, -2147483648)) || (runtime.wide(">", result, 2147483647))) ? 1 : 0)) {
                let temp = runtime.wide(">>", result, 1);
                members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
                if ((((runtime.wide(">=", temp, -2147483648)) && (runtime.wide("<=", temp, 2147483647))) ? 1 : 0)) {
                    result = ((runtime.wide("<", temp, 0)) ? (-1) : (0));
                    if (((result) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        if ((((((result) | 0)) < (0)) ? 1 : 0)) {
                            members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
                        }
                    }
                    members.m_fcw = ((((members.m_fcw) | (128))) & 0xffff);
                }
            }
            else {
                if (((result) ? 0 : 1)) {
                    members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                }
                else {
                    if ((((((result) | 0)) < (0)) ? 1 : 0)) {
                        members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
                    }
                }
            }
            result = runtime.wide("|", runtime.wide("<<", ((remainder) >>> 0), 32), runtime.wide("&", result, 4294967295));
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
        return result;
    }
    function method_Z1A_ssN0_dddd(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.Q[((dst) >>> (2))] = method_DIVL(runtime, h_m_regs.Q[((dst) >>> (2))], method_RDIR_L(runtime, src));
    }
    function method_Z1B_0000_dddd_imm16(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let imm16 = ((method_get_operand(runtime, 1)) & 0xffff);
        h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))] = method_DIVW(runtime, h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))], imm16);
    }
    function method_DIVW(runtime, dest, value) {
        const members = runtime.members;
        value = ((value) & 0xffff);
        let result = ((dest) >>> 0);
        let remainder = ((0) & 0xffff);
        members.m_fcw = ((((members.m_fcw) & (-241))) & 0xffff);
        if (value) {
            let qsign = ((((((((dest) >>> (16))) ^ (value))) & (32768))) & 0xffff);
            let rsign = ((((((dest) >>> (16))) & (32768))) & 0xffff);
            if ((((((dest) | 0)) < (0)) ? 1 : 0)) {
                dest = (((-dest)) >>> 0);
            }
            if ((((((value) << 16 >> 16)) < (0)) ? 1 : 0)) {
                value = (((-value)) & 0xffff);
            }
            result = ((runtime.divide(dest, value)) >>> 0);
            remainder = ((((dest) % (value))) & 0xffff);
            if (qsign) {
                result = (((-result)) >>> 0);
            }
            if (rsign) {
                remainder = (((-remainder)) & 0xffff);
            }
            if ((((((Number(((result) | 0)) < Number(-32768)) ? 1 : 0)) || ((((((result) | 0)) > (32767)) ? 1 : 0))) ? 1 : 0)) {
                let temp = ((runtime.shiftRight(((result) | 0), 1)) | 0);
                members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
                if ((((((Number(temp) >= Number(-32768)) ? 1 : 0)) && ((((temp) <= (32767)) ? 1 : 0))) ? 1 : 0)) {
                    result = (((((((temp) < (0)) ? 1 : 0)) ? (-1) : (0))) >>> 0);
                    if (((result) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        if ((((((result) << 16 >> 16)) < (0)) ? 1 : 0)) {
                            members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
                        }
                    }
                    members.m_fcw = ((((members.m_fcw) | (128))) & 0xffff);
                }
            }
            else {
                if (((result) ? 0 : 1)) {
                    members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                }
                else {
                    if ((((((result) << 16 >> 16)) < (0)) ? 1 : 0)) {
                        members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
                    }
                }
            }
            result = ((((((((remainder) >>> 0)) << (16))) | (((result) & (65535))))) >>> 0);
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
        return ((result) >>> 0);
    }
    function method_Z1B_ssN0_dddd(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))] = method_DIVW(runtime, h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))], method_RDIR_W(runtime, src));
    }
    function method_Z1C_ddN0_1000(runtime) {
        const members = runtime.members;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        method_TESTL(runtime, method_RDIR_L(runtime, dst));
    }
    function method_TESTL(runtime, dest) {
        const members = runtime.members;
        members.m_fcw = ((((members.m_fcw) & (-97))) & 0xffff);
        if (((dest) ? 0 : 1)) {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
        else {
            if (((dest) & (2147483648))) {
                members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
            }
        }
    }
    function method_Z1C_ddN0_1001_0000_ssss_0000_nmin1(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let cnt = ((((runtime.shiftRight(method_get_operand(runtime, 1), 0)) & (15))) << 24 >> 24);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) & 0xff);
        let space = ((((Number(dst) === Number(((method_get_segmented_mode(runtime)) ? (14) : (15)))) ? 1 : 0)) ? ((members.m_stack ?? 0)) : ((members.m_data ?? 0)));
        let addr = ((method_addr_from_reg(runtime, dst)) >>> 0);
        while (((Number((__t0 = cnt, cnt = ((((cnt) - (1))) << 24 >> 24), __t0)) >= Number(0)) ? 1 : 0)) {
            method_WRMEM_W(runtime, space, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]);
            addr = ((method_addr_add(runtime, addr, 2)) >>> 0);
            src = ((((((src) + (1))) & (15))) & 0xff);
        }
    }
    function method_Z1C_ssN0_0001_0000_dddd_0000_nmin1(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_regs = members.m_regs ?? 0;
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let cnt = ((((runtime.shiftRight(method_get_operand(runtime, 1), 0)) & (15))) << 24 >> 24);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) & 0xff);
        let space = ((((Number(src) === Number(((method_get_segmented_mode(runtime)) ? (14) : (15)))) ? 1 : 0)) ? ((members.m_stack ?? 0)) : ((members.m_data ?? 0)));
        let addr = ((method_addr_from_reg(runtime, src)) >>> 0);
        while (((Number((__t0 = cnt, cnt = ((((cnt) - (1))) << 24 >> 24), __t0)) >= Number(0)) ? 1 : 0)) {
            h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = method_RDMEM_W(runtime, space, addr);
            addr = ((method_addr_add(runtime, addr, 2)) >>> 0);
            dst = ((((((dst) + (1))) & (15))) & 0xff);
        }
    }
    function method_Z1D_ddN0_ssss(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        method_WRIR_L(runtime, dst, h_m_regs.L[method_BYTE_XOR_BE(runtime, ((src) >>> (1)))]);
    }
    function method_Z1E_ddN0_cccc(runtime) {
        const members = runtime.members;
        let cc = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        switch (cc) {
            case 0:
                {
                    break;
                }
            case 1:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))) {
                        method_set_pc(runtime, method_addr_from_reg(runtime, dst));
                    }
                    break;
                }
            case 2:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))))) {
                        method_set_pc(runtime, method_addr_from_reg(runtime, dst));
                    }
                    break;
                }
            case 3:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((members.m_fcw ?? 0)) >>> (7))) & (1))))) {
                        method_set_pc(runtime, method_addr_from_reg(runtime, dst));
                    }
                    break;
                }
            case 4:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (4))) & (1))) {
                        method_set_pc(runtime, method_addr_from_reg(runtime, dst));
                    }
                    break;
                }
            case 5:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (5))) & (1))) {
                        method_set_pc(runtime, method_addr_from_reg(runtime, dst));
                    }
                    break;
                }
            case 6:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (6))) & (1))) {
                        method_set_pc(runtime, method_addr_from_reg(runtime, dst));
                    }
                    break;
                }
            case 7:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (7))) & (1))) {
                        method_set_pc(runtime, method_addr_from_reg(runtime, dst));
                    }
                    break;
                }
            case 8:
                {
                    if (1) {
                        method_set_pc(runtime, method_addr_from_reg(runtime, dst));
                    }
                    break;
                }
            case 9:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))) ? 0 : 1)) {
                        method_set_pc(runtime, method_addr_from_reg(runtime, dst));
                    }
                    break;
                }
            case 10:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))))) ? 0 : 1)) {
                        method_set_pc(runtime, method_addr_from_reg(runtime, dst));
                    }
                    break;
                }
            case 11:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((members.m_fcw ?? 0)) >>> (7))) & (1))))) ? 0 : 1)) {
                        method_set_pc(runtime, method_addr_from_reg(runtime, dst));
                    }
                    break;
                }
            case 12:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ? 0 : 1)) {
                        method_set_pc(runtime, method_addr_from_reg(runtime, dst));
                    }
                    break;
                }
            case 13:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (5))) & (1))) ? 0 : 1)) {
                        method_set_pc(runtime, method_addr_from_reg(runtime, dst));
                    }
                    break;
                }
            case 14:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) ? 0 : 1)) {
                        method_set_pc(runtime, method_addr_from_reg(runtime, dst));
                    }
                    break;
                }
            case 15:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (7))) & (1))) ? 0 : 1)) {
                        method_set_pc(runtime, method_addr_from_reg(runtime, dst));
                    }
                    break;
                }
        }
    }
    function method_Z1F_ddN0_0000(runtime) {
        const members = runtime.members;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        if (method_get_segmented_mode(runtime)) {
            method_PUSHL(runtime, ((method_get_segmented_mode(runtime)) ? (14) : (15)), method_make_segmented_addr(runtime, (members.m_pc ?? 0)));
        }
        else {
            method_PUSHW(runtime, ((method_get_segmented_mode(runtime)) ? (14) : (15)), (members.m_pc ?? 0));
        }
        method_set_pc(runtime, method_addr_from_reg(runtime, dst));
    }
    function method_Z20_ssN0_dddd(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = method_RDIR_B(runtime, src);
    }
    function method_Z21_0000_dddd_imm16(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let imm16 = ((method_get_operand(runtime, 1)) & 0xffff);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = imm16;
    }
    function method_Z21_ssN0_dddd(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = method_RDIR_W(runtime, src);
    }
    function method_Z22_0000_ssss_0000_dddd_0000_0000(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) & 0xff);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = ((h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))]) & ((~((1) << (((h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]) & (7)))))));
    }
    function method_Z22_ddN0_imm4(runtime) {
        const members = runtime.members;
        let bit = ((((1) << (((method_get_operand(runtime, 0)) & (15))))) & 0xffff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let space = ((((Number(dst) === Number(((method_get_segmented_mode(runtime)) ? (14) : (15)))) ? 1 : 0)) ? ((members.m_stack ?? 0)) : ((members.m_data ?? 0)));
        let addr = ((method_addr_from_reg(runtime, dst)) >>> 0);
        method_WRMEM_B(runtime, space, addr, ((method_RDMEM_B(runtime, space, addr)) & ((~bit))));
    }
    function method_Z23_0000_ssss_0000_dddd_0000_0000(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) & 0xff);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)]) & ((~((1) << (((h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]) & (15)))))));
    }
    function method_Z23_ddN0_imm4(runtime) {
        const members = runtime.members;
        let bit = ((((1) << (((method_get_operand(runtime, 0)) & (15))))) & 0xffff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let space = ((((Number(dst) === Number(((method_get_segmented_mode(runtime)) ? (14) : (15)))) ? 1 : 0)) ? ((members.m_stack ?? 0)) : ((members.m_data ?? 0)));
        let addr = ((method_addr_from_reg(runtime, dst)) >>> 0);
        method_WRMEM_W(runtime, space, addr, ((method_RDMEM_W(runtime, space, addr)) & ((~bit))));
    }
    function method_Z24_0000_ssss_0000_dddd_0000_0000(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) & 0xff);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = ((h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))]) | (((1) << (((h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]) & (7))))));
    }
    function method_Z24_ddN0_imm4(runtime) {
        const members = runtime.members;
        let bit = ((((1) << (((method_get_operand(runtime, 0)) & (15))))) & 0xffff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let space = ((((Number(dst) === Number(((method_get_segmented_mode(runtime)) ? (14) : (15)))) ? 1 : 0)) ? ((members.m_stack ?? 0)) : ((members.m_data ?? 0)));
        let addr = ((method_addr_from_reg(runtime, dst)) >>> 0);
        method_WRMEM_B(runtime, space, addr, ((method_RDMEM_B(runtime, space, addr)) | (bit)));
    }
    function method_Z25_0000_ssss_0000_dddd_0000_0000(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) & 0xff);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)]) | (((1) << (((h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]) & (15))))));
    }
    function method_Z25_ddN0_imm4(runtime) {
        const members = runtime.members;
        let bit = ((((1) << (((method_get_operand(runtime, 0)) & (15))))) & 0xffff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let space = ((((Number(dst) === Number(((method_get_segmented_mode(runtime)) ? (14) : (15)))) ? 1 : 0)) ? ((members.m_stack ?? 0)) : ((members.m_data ?? 0)));
        let addr = ((method_addr_from_reg(runtime, dst)) >>> 0);
        method_WRMEM_W(runtime, space, addr, ((method_RDMEM_W(runtime, space, addr)) | (bit)));
    }
    function method_Z26_0000_ssss_0000_dddd_0000_0000(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) & 0xff);
        if (((h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))]) & (((1) << (((h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]) & (7))))))) {
            members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
    }
    function method_Z26_ddN0_imm4(runtime) {
        const members = runtime.members;
        let bit = ((((1) << (((method_get_operand(runtime, 0)) & (15))))) & 0xffff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        if (((method_RDIR_B(runtime, dst)) & (bit))) {
            members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
    }
    function method_Z27_0000_ssss_0000_dddd_0000_0000(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) & 0xff);
        if (((h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)]) & (((1) << (((h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]) & (15))))))) {
            members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
    }
    function method_Z27_ddN0_imm4(runtime) {
        const members = runtime.members;
        let bit = ((((1) << (((method_get_operand(runtime, 0)) & (15))))) & 0xffff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        if (((method_RDIR_W(runtime, dst)) & (bit))) {
            members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
    }
    function method_Z28_ddN0_imm4m1(runtime) {
        const members = runtime.members;
        let i4p1 = ((__add_Z28_ddN0_imm4m1(runtime, ((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15)), 1)) & 0xff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let space = ((((Number(dst) === Number(((method_get_segmented_mode(runtime)) ? (14) : (15)))) ? 1 : 0)) ? ((members.m_stack ?? 0)) : ((members.m_data ?? 0)));
        let addr = ((method_addr_from_reg(runtime, dst)) >>> 0);
        method_WRMEM_B(runtime, space, addr, method_INCB(runtime, method_RDMEM_B(runtime, space, addr), i4p1));
    }
    function __add_Z28_ddN0_imm4m1(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_INCB(runtime, dest, value) {
        const members = runtime.members;
        dest = ((dest) & 0xff);
        value = ((value) & 0xff);
        let result = ((((dest) + (value))) & 0xff);
        members.m_fcw = ((((members.m_fcw) & (-113))) & 0xffff);
        if (((result) ? 0 : 1)) {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
        else {
            if ((((((result) << 24 >> 24)) < (0)) ? 1 : 0)) {
                members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
            }
        }
        if (((((((((value) & (dest))) & ((~result)))) | ((((((~value)) & ((~dest)))) & (result))))) & (128))) {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
        return ((result) & 0xff);
    }
    function method_Z29_ddN0_imm4m1(runtime) {
        const members = runtime.members;
        let i4p1 = ((__add_Z29_ddN0_imm4m1(runtime, ((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15)), 1)) & 0xff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let space = ((((Number(dst) === Number(((method_get_segmented_mode(runtime)) ? (14) : (15)))) ? 1 : 0)) ? ((members.m_stack ?? 0)) : ((members.m_data ?? 0)));
        let addr = ((method_addr_from_reg(runtime, dst)) >>> 0);
        method_WRMEM_W(runtime, space, addr, method_INCW(runtime, method_RDMEM_W(runtime, space, addr), i4p1));
    }
    function __add_Z29_ddN0_imm4m1(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_INCW(runtime, dest, value) {
        const members = runtime.members;
        dest = ((dest) & 0xffff);
        value = ((value) & 0xffff);
        let result = ((((dest) + (value))) & 0xffff);
        members.m_fcw = ((((members.m_fcw) & (-113))) & 0xffff);
        if (((result) ? 0 : 1)) {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
        else {
            if ((((((result) << 16 >> 16)) < (0)) ? 1 : 0)) {
                members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
            }
        }
        if (((((((((value) & (dest))) & ((~result)))) | ((((((~value)) & ((~dest)))) & (result))))) & (32768))) {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
        return ((result) & 0xffff);
    }
    function method_Z2A_ddN0_imm4m1(runtime) {
        const members = runtime.members;
        let i4p1 = ((__add_Z2A_ddN0_imm4m1(runtime, ((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15)), 1)) & 0xff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let space = ((((Number(dst) === Number(((method_get_segmented_mode(runtime)) ? (14) : (15)))) ? 1 : 0)) ? ((members.m_stack ?? 0)) : ((members.m_data ?? 0)));
        let addr = ((method_addr_from_reg(runtime, dst)) >>> 0);
        method_WRMEM_B(runtime, space, addr, method_DECB(runtime, method_RDMEM_B(runtime, space, addr), i4p1));
    }
    function __add_Z2A_ddN0_imm4m1(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_DECB(runtime, dest, value) {
        const members = runtime.members;
        dest = ((dest) & 0xff);
        value = ((value) & 0xff);
        let result = ((((dest) - (value))) & 0xff);
        members.m_fcw = ((((members.m_fcw) & (-113))) & 0xffff);
        if (((result) ? 0 : 1)) {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
        else {
            if ((((((result) << 24 >> 24)) < (0)) ? 1 : 0)) {
                members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
            }
        }
        if ((((((((((~value)) & (dest))) & ((~result)))) | (((((value) & ((~dest)))) & (result))))) & (128))) {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
        return ((result) & 0xff);
    }
    function method_Z2B_ddN0_imm4m1(runtime) {
        const members = runtime.members;
        let i4p1 = ((__add_Z2B_ddN0_imm4m1(runtime, ((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15)), 1)) & 0xff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let space = ((((Number(dst) === Number(((method_get_segmented_mode(runtime)) ? (14) : (15)))) ? 1 : 0)) ? ((members.m_stack ?? 0)) : ((members.m_data ?? 0)));
        let addr = ((method_addr_from_reg(runtime, dst)) >>> 0);
        method_WRMEM_W(runtime, space, addr, method_DECW(runtime, method_RDMEM_W(runtime, space, addr), i4p1));
    }
    function __add_Z2B_ddN0_imm4m1(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_DECW(runtime, dest, value) {
        const members = runtime.members;
        dest = ((dest) & 0xffff);
        value = ((value) & 0xffff);
        let result = ((((dest) - (value))) & 0xffff);
        members.m_fcw = ((((members.m_fcw) & (-113))) & 0xffff);
        if (((result) ? 0 : 1)) {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
        else {
            if ((((((result) << 16 >> 16)) < (0)) ? 1 : 0)) {
                members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
            }
        }
        if ((((((((((~value)) & (dest))) & ((~result)))) | (((((value) & ((~dest)))) & (result))))) & (32768))) {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
        return ((result) & 0xffff);
    }
    function method_Z2C_ssN0_dddd(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let space = ((((Number(src) === Number(((method_get_segmented_mode(runtime)) ? (14) : (15)))) ? 1 : 0)) ? ((members.m_stack ?? 0)) : ((members.m_data ?? 0)));
        let addr = ((method_addr_from_reg(runtime, src)) >>> 0);
        let tmp = ((method_RDMEM_B(runtime, space, addr)) & 0xff);
        method_WRMEM_B(runtime, space, addr, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))]);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = tmp;
    }
    function method_Z2D_ssN0_dddd(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let space = ((((Number(src) === Number(((method_get_segmented_mode(runtime)) ? (14) : (15)))) ? 1 : 0)) ? ((members.m_stack ?? 0)) : ((members.m_data ?? 0)));
        let addr = ((method_addr_from_reg(runtime, src)) >>> 0);
        let tmp = ((method_RDMEM_W(runtime, space, addr)) & 0xffff);
        method_WRMEM_W(runtime, space, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)]);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = tmp;
    }
    function method_Z2E_ddN0_ssss(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        method_WRIR_B(runtime, dst, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((src) & (7))) << (1))) | (runtime.shiftRight(((src) & (8)), 3))))]);
    }
    function method_Z2F_ddN0_ssss(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        method_WRIR_W(runtime, dst, h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]);
    }
    function method_Z30_0000_dddd_dsp16(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let tmp16 = ((method_get_operand(runtime, 1)) & 0xffff);
        let dsp16 = ((method_addr_add(runtime, (members.m_pc ?? 0), ((tmp16) << 16 >> 16))) >>> 0);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = method_RDMEM_B(runtime, (members.m_program ?? 0), dsp16);
    }
    function method_Z30_ssN0_dddd_imm16(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let idx16 = ((method_get_operand(runtime, 1)) >>> 0);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = method_RDBX_B(runtime, src, idx16);
    }
    function method_RDBX_B(runtime, reg, idx) {
        const members = runtime.members;
        reg = ((reg) & 0xff);
        idx = ((idx) & 0xffff);
        return ((method_RDMEM_B(runtime, ((((Number(reg) === Number(((method_get_segmented_mode(runtime)) ? (14) : (15)))) ? 1 : 0)) ? ((members.m_stack ?? 0)) : ((members.m_data ?? 0))), method_addr_add(runtime, method_addr_from_reg(runtime, reg), idx))) & 0xff);
    }
    function method_Z31_0000_dddd_dsp16(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let tmp16 = ((method_get_operand(runtime, 1)) & 0xffff);
        let dsp16 = ((method_addr_add(runtime, (members.m_pc ?? 0), ((tmp16) << 16 >> 16))) >>> 0);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = method_RDMEM_W(runtime, (members.m_program ?? 0), dsp16);
    }
    function method_Z31_ssN0_dddd_imm16(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let idx16 = ((method_get_operand(runtime, 1)) >>> 0);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = method_RDBX_W(runtime, src, idx16);
    }
    function method_RDBX_W(runtime, reg, idx) {
        const members = runtime.members;
        reg = ((reg) & 0xff);
        idx = ((idx) & 0xffff);
        return ((method_RDMEM_W(runtime, ((((Number(reg) === Number(((method_get_segmented_mode(runtime)) ? (14) : (15)))) ? 1 : 0)) ? ((members.m_stack ?? 0)) : ((members.m_data ?? 0))), method_addr_add(runtime, method_addr_from_reg(runtime, reg), idx))) & 0xffff);
    }
    function method_Z32_0000_ssss_dsp16(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let tmp16 = ((method_get_operand(runtime, 1)) & 0xffff);
        let dsp16 = ((method_addr_add(runtime, (members.m_pc ?? 0), ((tmp16) << 16 >> 16))) >>> 0);
        method_WRMEM_B(runtime, (members.m_program ?? 0), dsp16, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((src) & (7))) << (1))) | (runtime.shiftRight(((src) & (8)), 3))))]);
    }
    function method_Z32_ddN0_ssss_imm16(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let idx16 = ((method_get_operand(runtime, 1)) >>> 0);
        method_WRBX_B(runtime, dst, idx16, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((src) & (7))) << (1))) | (runtime.shiftRight(((src) & (8)), 3))))]);
    }
    function method_WRBX_B(runtime, reg, idx, value) {
        const members = runtime.members;
        reg = ((reg) & 0xff);
        idx = ((idx) & 0xffff);
        value = ((value) & 0xff);
        method_WRMEM_B(runtime, ((((Number(reg) === Number(((method_get_segmented_mode(runtime)) ? (14) : (15)))) ? 1 : 0)) ? ((members.m_stack ?? 0)) : ((members.m_data ?? 0))), method_addr_add(runtime, method_addr_from_reg(runtime, reg), idx), value);
    }
    function method_Z33_0000_ssss_dsp16(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let tmp16 = ((method_get_operand(runtime, 1)) & 0xffff);
        let dsp16 = ((method_addr_add(runtime, (members.m_pc ?? 0), ((tmp16) << 16 >> 16))) >>> 0);
        method_WRMEM_W(runtime, (members.m_program ?? 0), dsp16, h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]);
    }
    function method_Z33_ddN0_ssss_imm16(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let idx16 = ((method_get_operand(runtime, 1)) >>> 0);
        method_WRBX_W(runtime, dst, idx16, h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]);
    }
    function method_WRBX_W(runtime, reg, idx, value) {
        const members = runtime.members;
        reg = ((reg) & 0xff);
        idx = ((idx) & 0xffff);
        value = ((value) & 0xffff);
        method_WRMEM_W(runtime, ((((Number(reg) === Number(((method_get_segmented_mode(runtime)) ? (14) : (15)))) ? 1 : 0)) ? ((members.m_stack ?? 0)) : ((members.m_data ?? 0))), method_addr_add(runtime, method_addr_from_reg(runtime, reg), idx), value);
    }
    function method_Z34_0000_dddd_dsp16(runtime) {
        const members = runtime.members;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let tmp16 = ((method_get_operand(runtime, 1)) & 0xffff);
        let dsp16 = ((method_addr_add(runtime, (members.m_pc ?? 0), ((tmp16) << 16 >> 16))) >>> 0);
        method_addr_to_reg(runtime, dst, dsp16);
    }
    function method_addr_to_reg(runtime, regno, addr) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        if (method_get_segmented_mode(runtime)) {
            let segaddr = ((method_make_segmented_addr(runtime, addr)) >>> 0);
            h_m_regs.W[method_BYTE4_XOR_BE(runtime, regno)] = ((((h_m_regs.W[method_BYTE4_XOR_BE(runtime, regno)]) & (33023))) | (((((segaddr) >>> (16))) & (32512))));
            h_m_regs.W[method_BYTE4_XOR_BE(runtime, ((regno) | (1)))] = ((segaddr) & (65535));
        }
        else {
            h_m_regs.W[method_BYTE4_XOR_BE(runtime, regno)] = addr;
        }
    }
    function method_Z34_ssN0_dddd_imm16(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let idx16 = ((method_get_operand(runtime, 1)) >>> 0);
        if (method_get_segmented_mode(runtime)) {
            h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))] = h_m_regs.L[method_BYTE_XOR_BE(runtime, ((src) >>> (1)))];
        }
        else {
            h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)];
        }
        method_add_to_addr_reg(runtime, dst, idx16);
    }
    function method_add_to_addr_reg(runtime, regno, addend) {
        const members = runtime.members;
        addend = ((addend) & 0xffff);
        const h_m_regs = members.m_regs ?? 0;
        if (method_get_segmented_mode(runtime)) {
            regno = ((((regno) | (1))) | 0);
        }
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, regno)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, regno)]) + (addend));
    }
    function method_Z35_0000_dddd_dsp16(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let tmp16 = ((method_get_operand(runtime, 1)) & 0xffff);
        let dsp16 = ((method_addr_add(runtime, (members.m_pc ?? 0), ((tmp16) << 16 >> 16))) >>> 0);
        h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))] = method_RDMEM_L(runtime, (members.m_program ?? 0), dsp16);
    }
    function method_Z35_ssN0_dddd_imm16(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let idx16 = ((method_get_operand(runtime, 1)) >>> 0);
        h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))] = method_RDBX_L(runtime, src, idx16);
    }
    function method_RDBX_L(runtime, reg, idx) {
        const members = runtime.members;
        reg = ((reg) & 0xff);
        idx = ((idx) & 0xffff);
        return ((method_RDMEM_L(runtime, ((((Number(reg) === Number(((method_get_segmented_mode(runtime)) ? (14) : (15)))) ? 1 : 0)) ? ((members.m_stack ?? 0)) : ((members.m_data ?? 0))), method_addr_add(runtime, method_addr_from_reg(runtime, reg), idx))) >>> 0);
    }
    function method_Z36_0000_0000(runtime) {
        const members = runtime.members;
        members.m_irq_req = ((((members.m_irq_req) | (64))) & 0xff);
    }
    function method_Z36_imm8(runtime) {
        const members = runtime.members;
        let imm8 = ((((method_get_operand(runtime, 0)) & 0xff)) & 0xff);
        0;
        if ((((members.m_fcw ?? 0)) & (8192))) {
        }
    }
    function method_Z37_0000_ssss_dsp16(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let tmp16 = ((method_get_operand(runtime, 1)) & 0xffff);
        let dsp16 = ((method_addr_add(runtime, (members.m_pc ?? 0), ((tmp16) << 16 >> 16))) >>> 0);
        method_WRMEM_L(runtime, (members.m_program ?? 0), dsp16, h_m_regs.L[method_BYTE_XOR_BE(runtime, ((src) >>> (1)))]);
    }
    function method_Z37_ddN0_ssss_imm16(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let idx16 = ((method_get_operand(runtime, 1)) >>> 0);
        method_WRBX_L(runtime, dst, idx16, h_m_regs.L[method_BYTE_XOR_BE(runtime, ((src) >>> (1)))]);
    }
    function method_WRBX_L(runtime, reg, idx, value) {
        const members = runtime.members;
        reg = ((reg) & 0xff);
        idx = ((idx) & 0xffff);
        method_WRMEM_L(runtime, ((((Number(reg) === Number(((method_get_segmented_mode(runtime)) ? (14) : (15)))) ? 1 : 0)) ? ((members.m_stack ?? 0)) : ((members.m_data ?? 0))), method_addr_add(runtime, method_addr_from_reg(runtime, reg), idx), value);
    }
    function method_Z38_imm8(runtime) {
        const members = runtime.members;
        let imm8 = ((((method_get_operand(runtime, 0)) & 0xff)) & 0xff);
        0;
        if ((((members.m_fcw ?? 0)) & (8192))) {
        }
    }
    function method_Z39_ssN0_0000(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        if ((((((members.m_fcw ?? 0)) & (16384))) ? 0 : 1)) {
            members.m_irq_req = ((((members.m_irq_req) | (64))) & 0xff);
            return;
        }
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let fcw = ((0) & 0xffff);
        let space = ((((Number(src) === Number(((method_get_segmented_mode(runtime)) ? (14) : (15)))) ? 1 : 0)) ? ((members.m_stack ?? 0)) : ((members.m_data ?? 0)));
        if (method_get_segmented_mode(runtime)) {
            let addr = ((method_addr_from_reg(runtime, src)) >>> 0);
            fcw = ((method_RDMEM_W(runtime, space, ((addr) + (2)))) & 0xffff);
            method_set_pc(runtime, method_segmented_addr(runtime, method_RDMEM_L(runtime, space, ((addr) + (4)))));
        }
        else {
            fcw = ((method_RDMEM_W(runtime, space, h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)])) & 0xffff);
            method_set_pc(runtime, method_RDMEM_W(runtime, space, ((__add_Z39_ssN0_0000(runtime, h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)], 2)) & 0xffff)));
        }
        if (((((fcw) ^ ((members.m_fcw ?? 0)))) & (32768))) {
            /* printf: no effect */
        }
        method_CHANGE_FCW(runtime, fcw);
    }
    function __add_Z39_ssN0_0000(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_CHANGE_FCW(runtime, fcw) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_ns_out"];
        fcw = ((fcw) & 0xffff);
        const h_m_regs = members.m_regs ?? 0;
        const h_m_irq_state = members.m_irq_state ?? 0;
        let tmp = ((0) & 0xffff);
        if (((((fcw) ^ ((members.m_fcw ?? 0)))) & (16384))) {
            tmp = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, 15)]) & 0xffff);
            h_m_regs.W[method_BYTE4_XOR_BE(runtime, 15)] = (members.m_nspoff ?? 0);
            members.m_nspoff = ((tmp) & 0xffff);
            (__L0 ? __L0(Number(((((fcw) & (16384))) ? (0) : (1)))) : typeof members.m_ns_out === 'function' ? members.m_ns_out(((((fcw) & (16384))) ? (0) : (1))) : runtime.invoke("m_ns_out", ((((fcw) & (16384))) ? (0) : (1))));
        }
        fcw = ((((fcw) & (-32769))) & 0xffff);
        if ((((((((((((members.m_fcw ?? 0)) & (2048))) ? 0 : 1)) && (((fcw) & (2048)))) ? 1 : 0)) && (((Number(h_m_irq_state[0]) !== Number(0)) ? 1 : 0))) ? 1 : 0)) {
            members.m_irq_req = ((((members.m_irq_req) | (8))) & 0xff);
        }
        if ((((((((((((members.m_fcw ?? 0)) & (4096))) ? 0 : 1)) && (((fcw) & (4096)))) ? 1 : 0)) && (((Number(h_m_irq_state[1]) !== Number(0)) ? 1 : 0))) ? 1 : 0)) {
            members.m_irq_req = ((((members.m_irq_req) | (4))) & 0xff);
        }
        members.m_fcw = ((fcw) & 0xffff);
    }
    function method_Z3A_ssss_0000_0000_aaaa_dddd_x000(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        if ((((((members.m_fcw ?? 0)) & (16384))) ? 0 : 1)) {
            members.m_irq_req = ((((members.m_irq_req) | (64))) & 0xff);
            return;
        }
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let cnt = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) << 24 >> 24);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 1), 4)) & (15))) & 0xff);
        let cc = ((((runtime.shiftRight(method_get_operand(runtime, 1), 0)) & (15))) & 0xff);
        method_WRIR_B(runtime, dst, method_RDPORT_B(runtime, 0, h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]));
        method_add_to_addr_reg(runtime, dst, 1);
        if ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)]) - (1)))) {
            members.m_fcw = ((((members.m_fcw) & (-17))) & 0xffff);
            if ((((cc) === (0)) ? 1 : 0)) {
                members.m_pc = ((((members.m_pc) - (4))) >>> 0);
            }
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
    }
    function method_RDPORT_B(runtime, mode, addr) {
        const members = runtime.members;
        addr = ((addr) & 0xffff);
        let space = (((((mode) === (0)) ? 1 : 0)) ? ((members.m_io ?? 0)) : ((members.m_sio ?? 0)));
        return (((__deref_RDPORT_B(runtime, space).read_byte?.(addr) ?? 0)) & 0xff);
    }
    function __deref_RDPORT_B(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_Z3A_ssss_0001_0000_aaaa_dddd_x000(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        if ((((((members.m_fcw ?? 0)) & (16384))) ? 0 : 1)) {
            members.m_irq_req = ((((members.m_irq_req) | (64))) & 0xff);
            return;
        }
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let cnt = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) << 24 >> 24);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 1), 4)) & (15))) & 0xff);
        let cc = ((((runtime.shiftRight(method_get_operand(runtime, 1), 0)) & (15))) & 0xff);
        method_WRIR_B(runtime, dst, method_RDPORT_B(runtime, 1, h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]));
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)]) + (1));
        if ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)]) - (1)))) {
            members.m_fcw = ((((members.m_fcw) & (-17))) & 0xffff);
            if ((((cc) === (0)) ? 1 : 0)) {
                members.m_pc = ((((members.m_pc) - (4))) >>> 0);
            }
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
    }
    function method_Z3A_ssss_0010_0000_aaaa_dddd_x000(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        if ((((((members.m_fcw ?? 0)) & (16384))) ? 0 : 1)) {
            members.m_irq_req = ((((members.m_irq_req) | (64))) & 0xff);
            return;
        }
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let cnt = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) << 24 >> 24);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 1), 4)) & (15))) & 0xff);
        let cc = ((((runtime.shiftRight(method_get_operand(runtime, 1), 0)) & (15))) & 0xff);
        method_WRPORT_B(runtime, 0, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)], method_RDIR_B(runtime, src));
        method_add_to_addr_reg(runtime, src, 1);
        if ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)]) - (1)))) {
            members.m_fcw = ((((members.m_fcw) & (-17))) & 0xffff);
            if ((((cc) === (0)) ? 1 : 0)) {
                members.m_pc = ((((members.m_pc) - (4))) >>> 0);
            }
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
    }
    function method_WRPORT_B(runtime, mode, addr, value) {
        const members = runtime.members;
        addr = ((addr) & 0xffff);
        value = ((value) & 0xff);
        let space = (((((mode) === (0)) ? 1 : 0)) ? ((members.m_io ?? 0)) : ((members.m_sio ?? 0)));
        let value16 = ((((value) | (((value) << (8))))) & 0xffff);
        (__deref_WRPORT_B(runtime, space).write_word?.(((addr) & (-2)), value16, (((((addr) >>> (0)) & 1)) ? (255) : (65280))) ?? 0);
    }
    function __deref_WRPORT_B(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_Z3A_ssss_0011_0000_aaaa_dddd_x000(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        if ((((((members.m_fcw ?? 0)) & (16384))) ? 0 : 1)) {
            members.m_irq_req = ((((members.m_irq_req) | (64))) & 0xff);
            return;
        }
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let cnt = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) << 24 >> 24);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 1), 4)) & (15))) & 0xff);
        let cc = ((((runtime.shiftRight(method_get_operand(runtime, 1), 0)) & (15))) & 0xff);
        method_WRPORT_B(runtime, 1, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)], method_RDIR_B(runtime, src));
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]) + (1));
        if ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)]) - (1)))) {
            members.m_fcw = ((((members.m_fcw) & (-17))) & 0xffff);
            if ((((cc) === (0)) ? 1 : 0)) {
                members.m_pc = ((((members.m_pc) - (4))) >>> 0);
            }
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
    }
    function method_Z3A_dddd_0100_imm16(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        if ((((((members.m_fcw ?? 0)) & (16384))) ? 0 : 1)) {
            members.m_irq_req = ((((members.m_irq_req) | (64))) & 0xff);
            return;
        }
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let imm16 = ((method_get_operand(runtime, 1)) & 0xffff);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = method_RDPORT_B(runtime, 0, imm16);
    }
    function method_Z3A_dddd_0101_imm16(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        if ((((((members.m_fcw ?? 0)) & (16384))) ? 0 : 1)) {
            members.m_irq_req = ((((members.m_irq_req) | (64))) & 0xff);
            return;
        }
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let imm16 = ((method_get_operand(runtime, 1)) & 0xffff);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = method_RDPORT_B(runtime, 1, imm16);
    }
    function method_Z3A_ssss_0110_imm16(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        if ((((((members.m_fcw ?? 0)) & (16384))) ? 0 : 1)) {
            members.m_irq_req = ((((members.m_irq_req) | (64))) & 0xff);
            return;
        }
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let imm16 = ((method_get_operand(runtime, 1)) & 0xffff);
        method_WRPORT_B(runtime, 0, imm16, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((src) & (7))) << (1))) | (runtime.shiftRight(((src) & (8)), 3))))]);
    }
    function method_Z3A_ssss_0111_imm16(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        if ((((((members.m_fcw ?? 0)) & (16384))) ? 0 : 1)) {
            members.m_irq_req = ((((members.m_irq_req) | (64))) & 0xff);
            return;
        }
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let imm16 = ((method_get_operand(runtime, 1)) & 0xffff);
        method_WRPORT_B(runtime, 1, imm16, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((src) & (7))) << (1))) | (runtime.shiftRight(((src) & (8)), 3))))]);
    }
    function method_Z3A_ssss_1000_0000_aaaa_dddd_x000(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        if ((((((members.m_fcw ?? 0)) & (16384))) ? 0 : 1)) {
            members.m_irq_req = ((((members.m_irq_req) | (64))) & 0xff);
            return;
        }
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let cnt = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) << 24 >> 24);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 1), 4)) & (15))) & 0xff);
        let cc = ((((runtime.shiftRight(method_get_operand(runtime, 1), 0)) & (15))) & 0xff);
        method_WRIR_B(runtime, dst, method_RDPORT_B(runtime, 0, h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]));
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)]) - (1));
        if ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)]) - (1)))) {
            members.m_fcw = ((((members.m_fcw) & (-17))) & 0xffff);
            if ((((cc) === (0)) ? 1 : 0)) {
                members.m_pc = ((((members.m_pc) - (4))) >>> 0);
            }
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
    }
    function method_Z3A_ssss_1001_0000_aaaa_dddd_x000(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        if ((((((members.m_fcw ?? 0)) & (16384))) ? 0 : 1)) {
            members.m_irq_req = ((((members.m_irq_req) | (64))) & 0xff);
            return;
        }
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let cnt = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) << 24 >> 24);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 1), 4)) & (15))) & 0xff);
        let cc = ((((runtime.shiftRight(method_get_operand(runtime, 1), 0)) & (15))) & 0xff);
        method_WRIR_B(runtime, dst, method_RDPORT_B(runtime, 1, h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]));
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)]) - (1));
        if ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)]) - (1)))) {
            members.m_fcw = ((((members.m_fcw) & (-17))) & 0xffff);
            if ((((cc) === (0)) ? 1 : 0)) {
                members.m_pc = ((((members.m_pc) - (4))) >>> 0);
            }
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
    }
    function method_Z3A_ssss_1010_0000_aaaa_dddd_x000(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        if ((((((members.m_fcw ?? 0)) & (16384))) ? 0 : 1)) {
            members.m_irq_req = ((((members.m_irq_req) | (64))) & 0xff);
            return;
        }
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let cnt = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) << 24 >> 24);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 1), 4)) & (15))) & 0xff);
        let cc = ((((runtime.shiftRight(method_get_operand(runtime, 1), 0)) & (15))) & 0xff);
        method_WRPORT_B(runtime, 0, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)], method_RDIR_B(runtime, src));
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]) - (1));
        if ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)]) - (1)))) {
            members.m_fcw = ((((members.m_fcw) & (-17))) & 0xffff);
            if ((((cc) === (0)) ? 1 : 0)) {
                members.m_pc = ((((members.m_pc) - (4))) >>> 0);
            }
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
    }
    function method_Z3A_ssss_1011_0000_aaaa_dddd_x000(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        if ((((((members.m_fcw ?? 0)) & (16384))) ? 0 : 1)) {
            members.m_irq_req = ((((members.m_irq_req) | (64))) & 0xff);
            return;
        }
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let cnt = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) << 24 >> 24);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 1), 4)) & (15))) & 0xff);
        let cc = ((((runtime.shiftRight(method_get_operand(runtime, 1), 0)) & (15))) & 0xff);
        method_WRPORT_B(runtime, 1, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)], method_RDIR_B(runtime, src));
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]) - (1));
        if ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)]) - (1)))) {
            members.m_fcw = ((((members.m_fcw) & (-17))) & 0xffff);
            if ((((cc) === (0)) ? 1 : 0)) {
                members.m_pc = ((((members.m_pc) - (4))) >>> 0);
            }
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
    }
    function method_Z3B_ssss_0000_0000_aaaa_dddd_x000(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        if ((((((members.m_fcw ?? 0)) & (16384))) ? 0 : 1)) {
            members.m_irq_req = ((((members.m_irq_req) | (64))) & 0xff);
            return;
        }
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let cnt = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) << 24 >> 24);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 1), 4)) & (15))) & 0xff);
        let cc = ((((runtime.shiftRight(method_get_operand(runtime, 1), 0)) & (15))) & 0xff);
        method_WRIR_W(runtime, dst, method_RDPORT_W(runtime, 0, h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]));
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)]) + (2));
        if ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)]) - (1)))) {
            members.m_fcw = ((((members.m_fcw) & (-17))) & 0xffff);
            if ((((cc) === (0)) ? 1 : 0)) {
                members.m_pc = ((((members.m_pc) - (4))) >>> 0);
            }
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
    }
    function method_RDPORT_W(runtime, mode, addr) {
        const members = runtime.members;
        addr = ((addr) & 0xffff);
        let space = (((((mode) === (0)) ? 1 : 0)) ? ((members.m_io ?? 0)) : ((members.m_sio ?? 0)));
        if ((((addr) >>> (0)) & 1)) {
            return ((method_swapendian_int16(runtime, (__deref_RDPORT_W(runtime, space).read_word?.(((addr) & (-2)), 65535) ?? 0))) & 0xffff);
        }
        else {
            return (((__deref_RDPORT_W(runtime, space).read_word?.(addr) ?? 0)) & 0xffff);
        }
    }
    function __deref_RDPORT_W(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_swapendian_int16(runtime, val) {
        const members = runtime.members;
        val = ((val) & 0xffff);
        return ((((((val) << (8))) | (((val) >>> (8))))) & 0xffff);
    }
    function method_Z3B_ssss_0001_0000_aaaa_dddd_x000(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        if ((((((members.m_fcw ?? 0)) & (16384))) ? 0 : 1)) {
            members.m_irq_req = ((((members.m_irq_req) | (64))) & 0xff);
            return;
        }
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let cnt = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) << 24 >> 24);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 1), 4)) & (15))) & 0xff);
        let cc = ((((runtime.shiftRight(method_get_operand(runtime, 1), 0)) & (15))) & 0xff);
        method_WRIR_W(runtime, dst, method_RDPORT_W(runtime, 1, h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]));
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)]) + (2));
        if ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)]) - (1)))) {
            members.m_fcw = ((((members.m_fcw) & (-17))) & 0xffff);
            if ((((cc) === (0)) ? 1 : 0)) {
                members.m_pc = ((((members.m_pc) - (4))) >>> 0);
            }
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
    }
    function method_Z3B_ssss_0010_0000_aaaa_dddd_x000(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        if ((((((members.m_fcw ?? 0)) & (16384))) ? 0 : 1)) {
            members.m_irq_req = ((((members.m_irq_req) | (64))) & 0xff);
            return;
        }
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let cnt = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) << 24 >> 24);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 1), 4)) & (15))) & 0xff);
        let cc = ((((runtime.shiftRight(method_get_operand(runtime, 1), 0)) & (15))) & 0xff);
        method_WRPORT_W(runtime, 0, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)], method_RDIR_W(runtime, src));
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]) + (2));
        if ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)]) - (1)))) {
            members.m_fcw = ((((members.m_fcw) & (-17))) & 0xffff);
            if ((((cc) === (0)) ? 1 : 0)) {
                members.m_pc = ((((members.m_pc) - (4))) >>> 0);
            }
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
    }
    function method_WRPORT_W(runtime, mode, addr, value) {
        const members = runtime.members;
        addr = ((addr) & 0xffff);
        value = ((value) & 0xffff);
        let space = (((((mode) === (0)) ? 1 : 0)) ? ((members.m_io ?? 0)) : ((members.m_sio ?? 0)));
        if ((((addr) >>> (0)) & 1)) {
            (__deref_WRPORT_W(runtime, space).write_word?.(((addr) & (-2)), method_swapendian_int16(runtime, value), 65535) ?? 0);
        }
        else {
            (__deref_WRPORT_W(runtime, space).write_word?.(addr, value, 65535) ?? 0);
        }
    }
    function __deref_WRPORT_W(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_Z3B_ssss_0011_0000_aaaa_dddd_x000(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        if ((((((members.m_fcw ?? 0)) & (16384))) ? 0 : 1)) {
            members.m_irq_req = ((((members.m_irq_req) | (64))) & 0xff);
            return;
        }
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let cnt = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) << 24 >> 24);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 1), 4)) & (15))) & 0xff);
        let cc = ((((runtime.shiftRight(method_get_operand(runtime, 1), 0)) & (15))) & 0xff);
        method_WRPORT_W(runtime, 1, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)], method_RDIR_W(runtime, src));
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]) + (2));
        if ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)]) - (1)))) {
            members.m_fcw = ((((members.m_fcw) & (-17))) & 0xffff);
            if ((((cc) === (0)) ? 1 : 0)) {
                members.m_pc = ((((members.m_pc) - (4))) >>> 0);
            }
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
    }
    function method_Z3B_dddd_0100_imm16(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        if ((((((members.m_fcw ?? 0)) & (16384))) ? 0 : 1)) {
            members.m_irq_req = ((((members.m_irq_req) | (64))) & 0xff);
            return;
        }
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let imm16 = ((method_get_operand(runtime, 1)) & 0xffff);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = method_RDPORT_W(runtime, 0, imm16);
    }
    function method_Z3B_dddd_0101_imm16(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        if ((((((members.m_fcw ?? 0)) & (16384))) ? 0 : 1)) {
            members.m_irq_req = ((((members.m_irq_req) | (64))) & 0xff);
            return;
        }
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let imm16 = ((method_get_operand(runtime, 1)) & 0xffff);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = method_RDPORT_W(runtime, 1, imm16);
    }
    function method_Z3B_ssss_0110_imm16(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        if ((((((members.m_fcw ?? 0)) & (16384))) ? 0 : 1)) {
            members.m_irq_req = ((((members.m_irq_req) | (64))) & 0xff);
            return;
        }
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let imm16 = ((method_get_operand(runtime, 1)) & 0xffff);
        method_WRPORT_W(runtime, 0, imm16, h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]);
    }
    function method_Z3B_ssss_0111_imm16(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        if ((((((members.m_fcw ?? 0)) & (16384))) ? 0 : 1)) {
            members.m_irq_req = ((((members.m_irq_req) | (64))) & 0xff);
            return;
        }
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let imm16 = ((method_get_operand(runtime, 1)) & 0xffff);
        method_WRPORT_W(runtime, 1, imm16, h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]);
    }
    function method_Z3B_ssss_1000_0000_aaaa_dddd_x000(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        if ((((((members.m_fcw ?? 0)) & (16384))) ? 0 : 1)) {
            members.m_irq_req = ((((members.m_irq_req) | (64))) & 0xff);
            return;
        }
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let cnt = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) << 24 >> 24);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 1), 4)) & (15))) & 0xff);
        let cc = ((((runtime.shiftRight(method_get_operand(runtime, 1), 0)) & (15))) & 0xff);
        method_WRIR_W(runtime, dst, method_RDPORT_W(runtime, 0, h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]));
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)]) - (2));
        if ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)]) - (1)))) {
            members.m_fcw = ((((members.m_fcw) & (-17))) & 0xffff);
            if ((((cc) === (0)) ? 1 : 0)) {
                members.m_pc = ((((members.m_pc) - (4))) >>> 0);
            }
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
    }
    function method_Z3B_ssss_1001_0000_aaaa_dddd_x000(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        if ((((((members.m_fcw ?? 0)) & (16384))) ? 0 : 1)) {
            members.m_irq_req = ((((members.m_irq_req) | (64))) & 0xff);
            return;
        }
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let cnt = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) << 24 >> 24);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 1), 4)) & (15))) & 0xff);
        let cc = ((((runtime.shiftRight(method_get_operand(runtime, 1), 0)) & (15))) & 0xff);
        method_WRIR_W(runtime, dst, method_RDPORT_W(runtime, 1, h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]));
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)]) - (2));
        if ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)]) - (1)))) {
            members.m_fcw = ((((members.m_fcw) & (-17))) & 0xffff);
            if ((((cc) === (0)) ? 1 : 0)) {
                members.m_pc = ((((members.m_pc) - (4))) >>> 0);
            }
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
    }
    function method_Z3B_ssss_1010_0000_aaaa_dddd_x000(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        if ((((((members.m_fcw ?? 0)) & (16384))) ? 0 : 1)) {
            members.m_irq_req = ((((members.m_irq_req) | (64))) & 0xff);
            return;
        }
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let cnt = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) << 24 >> 24);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 1), 4)) & (15))) & 0xff);
        let cc = ((((runtime.shiftRight(method_get_operand(runtime, 1), 0)) & (15))) & 0xff);
        method_WRPORT_W(runtime, 0, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)], method_RDIR_W(runtime, src));
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]) - (2));
        if ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)]) - (1)))) {
            members.m_fcw = ((((members.m_fcw) & (-17))) & 0xffff);
            if ((((cc) === (0)) ? 1 : 0)) {
                members.m_pc = ((((members.m_pc) - (4))) >>> 0);
            }
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
    }
    function method_Z3B_ssss_1011_0000_aaaa_dddd_x000(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        if ((((((members.m_fcw ?? 0)) & (16384))) ? 0 : 1)) {
            members.m_irq_req = ((((members.m_irq_req) | (64))) & 0xff);
            return;
        }
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let cnt = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) << 24 >> 24);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 1), 4)) & (15))) & 0xff);
        let cc = ((((runtime.shiftRight(method_get_operand(runtime, 1), 0)) & (15))) & 0xff);
        method_WRPORT_W(runtime, 1, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)], method_RDIR_W(runtime, src));
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]) - (2));
        if ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)]) - (1)))) {
            members.m_fcw = ((((members.m_fcw) & (-17))) & 0xffff);
            if ((((cc) === (0)) ? 1 : 0)) {
                members.m_pc = ((((members.m_pc) - (4))) >>> 0);
            }
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
    }
    function method_Z3C_ssss_dddd(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        if ((((((members.m_fcw ?? 0)) & (16384))) ? 0 : 1)) {
            members.m_irq_req = ((((members.m_irq_req) | (64))) & 0xff);
            return;
        }
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = method_RDPORT_B(runtime, 0, h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]);
    }
    function method_Z3D_ssss_dddd(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        if ((((((members.m_fcw ?? 0)) & (16384))) ? 0 : 1)) {
            members.m_irq_req = ((((members.m_irq_req) | (64))) & 0xff);
            return;
        }
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = method_RDPORT_W(runtime, 0, h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]);
    }
    function method_Z3E_dddd_ssss(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        if ((((((members.m_fcw ?? 0)) & (16384))) ? 0 : 1)) {
            members.m_irq_req = ((((members.m_irq_req) | (64))) & 0xff);
            return;
        }
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        method_WRPORT_B(runtime, 0, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)], h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((src) & (7))) << (1))) | (runtime.shiftRight(((src) & (8)), 3))))]);
    }
    function method_Z3F_dddd_ssss(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        if ((((((members.m_fcw ?? 0)) & (16384))) ? 0 : 1)) {
            members.m_irq_req = ((((members.m_irq_req) | (64))) & 0xff);
            return;
        }
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        method_WRPORT_W(runtime, 0, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)], h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]);
    }
    function method_Z40_0000_dddd_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = method_ADDB(runtime, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))], method_RDMEM_B(runtime, (members.m_data ?? 0), addr));
    }
    function method_get_addr_operand(runtime, opnum) {
        const members = runtime.members;
        const h_m_op = members.m_op ?? 0;
        let i = ((0) | 0);
        for (i = ((0) | 0); (((i) < (opnum)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
        }
        if ((((((members.m_op_valid ?? 0)) & (((1) << (opnum))))) ? 0 : 1)) {
            let seg = (((__deref_get_addr_operand(runtime, members.m_cache).read_word?.((members.m_pc ?? 0)) ?? 0)) >>> 0);
            members.m_pc = ((((members.m_pc) + (2))) >>> 0);
            if (method_get_segmented_mode(runtime)) {
                if (((seg) & (32768))) {
                    h_m_op[opnum] = ((((((seg) & (32512))) << (8))) | ((__deref_get_addr_operand(runtime, members.m_cache).read_word?.((members.m_pc ?? 0)) ?? 0)));
                    members.m_pc = ((((members.m_pc) + (2))) >>> 0);
                }
                else {
                    h_m_op[opnum] = ((((((seg) & (32512))) << (8))) | (((seg) & (255))));
                }
            }
            else {
                h_m_op[opnum] = seg;
            }
            members.m_op_valid = ((((members.m_op_valid) | (((1) << (opnum))))) >>> 0);
        }
        return ((h_m_op[opnum]) >>> 0);
    }
    function __deref_get_addr_operand(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_Z40_ssN0_dddd_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)])) >>> 0);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = method_ADDB(runtime, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))], method_RDMEM_B(runtime, (members.m_data ?? 0), addr));
    }
    function method_Z41_0000_dddd_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = method_ADDW(runtime, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)], method_RDMEM_W(runtime, (members.m_data ?? 0), addr));
    }
    function method_Z41_ssN0_dddd_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)])) >>> 0);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = method_ADDW(runtime, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)], method_RDMEM_W(runtime, (members.m_data ?? 0), addr));
    }
    function method_Z42_0000_dddd_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = method_SUBB(runtime, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))], method_RDMEM_B(runtime, (members.m_data ?? 0), addr));
    }
    function method_Z42_ssN0_dddd_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)])) >>> 0);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = method_SUBB(runtime, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))], method_RDMEM_B(runtime, (members.m_data ?? 0), addr));
    }
    function method_Z43_0000_dddd_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = method_SUBW(runtime, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)], method_RDMEM_W(runtime, (members.m_data ?? 0), addr));
    }
    function method_Z43_ssN0_dddd_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)])) >>> 0);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = method_SUBW(runtime, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)], method_RDMEM_W(runtime, (members.m_data ?? 0), addr));
    }
    function method_Z44_0000_dddd_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = method_ORB(runtime, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))], method_RDMEM_B(runtime, (members.m_data ?? 0), addr));
    }
    function method_Z44_ssN0_dddd_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)])) >>> 0);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = method_ORB(runtime, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))], method_RDMEM_B(runtime, (members.m_data ?? 0), addr));
    }
    function method_Z45_0000_dddd_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = method_ORW(runtime, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)], method_RDMEM_W(runtime, (members.m_data ?? 0), addr));
    }
    function method_Z45_ssN0_dddd_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)])) >>> 0);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = method_ORW(runtime, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)], method_RDMEM_W(runtime, (members.m_data ?? 0), addr));
    }
    function method_Z46_0000_dddd_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = method_ANDB(runtime, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))], method_RDMEM_B(runtime, (members.m_data ?? 0), addr));
    }
    function method_Z46_ssN0_dddd_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)])) >>> 0);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = method_ANDB(runtime, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))], method_RDMEM_B(runtime, (members.m_data ?? 0), addr));
    }
    function method_Z47_0000_dddd_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = method_ANDW(runtime, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)], method_RDMEM_W(runtime, (members.m_data ?? 0), addr));
    }
    function method_Z47_ssN0_dddd_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)])) >>> 0);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = method_ANDW(runtime, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)], method_RDMEM_W(runtime, (members.m_data ?? 0), addr));
    }
    function method_Z48_0000_dddd_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = method_XORB(runtime, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))], method_RDMEM_B(runtime, (members.m_data ?? 0), addr));
    }
    function method_Z48_ssN0_dddd_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)])) >>> 0);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = method_XORB(runtime, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))], method_RDMEM_B(runtime, (members.m_data ?? 0), addr));
    }
    function method_Z49_0000_dddd_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = method_XORW(runtime, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)], method_RDMEM_W(runtime, (members.m_data ?? 0), addr));
    }
    function method_Z49_ssN0_dddd_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)])) >>> 0);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = method_XORW(runtime, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)], method_RDMEM_W(runtime, (members.m_data ?? 0), addr));
    }
    function method_Z4A_0000_dddd_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        method_CPB(runtime, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))], method_RDMEM_B(runtime, (members.m_data ?? 0), addr));
    }
    function method_Z4A_ssN0_dddd_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)])) >>> 0);
        method_CPB(runtime, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))], method_RDMEM_B(runtime, (members.m_data ?? 0), addr));
    }
    function method_Z4B_0000_dddd_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        method_CPW(runtime, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)], method_RDMEM_W(runtime, (members.m_data ?? 0), addr));
    }
    function method_Z4B_ssN0_dddd_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)])) >>> 0);
        method_CPW(runtime, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)], method_RDMEM_W(runtime, (members.m_data ?? 0), addr));
    }
    function method_Z4C_0000_0000_addr(runtime) {
        const members = runtime.members;
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        method_WRMEM_B(runtime, (members.m_data ?? 0), addr, method_COMB(runtime, method_RDMEM_W(runtime, (members.m_data ?? 0), addr)));
    }
    function method_Z4C_0000_0001_addr_imm8(runtime) {
        const members = runtime.members;
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        let imm8 = ((((method_get_operand(runtime, 2)) & 0xff)) & 0xff);
        method_CPB(runtime, method_RDMEM_B(runtime, (members.m_data ?? 0), addr), imm8);
    }
    function method_Z4C_0000_0010_addr(runtime) {
        const members = runtime.members;
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        method_WRMEM_B(runtime, (members.m_data ?? 0), addr, method_NEGB(runtime, method_RDMEM_B(runtime, (members.m_data ?? 0), addr)));
    }
    function method_Z4C_0000_0100_addr(runtime) {
        const members = runtime.members;
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        method_TESTB(runtime, method_RDMEM_B(runtime, (members.m_data ?? 0), addr));
    }
    function method_Z4C_0000_0101_addr_imm8(runtime) {
        const members = runtime.members;
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        let imm8 = ((((method_get_operand(runtime, 2)) & 0xff)) & 0xff);
        method_WRMEM_B(runtime, (members.m_data ?? 0), addr, imm8);
    }
    function method_Z4C_0000_0110_addr(runtime) {
        const members = runtime.members;
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        if (((method_RDMEM_B(runtime, (members.m_data ?? 0), addr)) & (128))) {
            members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
        }
        else {
            members.m_fcw = ((((members.m_fcw) & (-33))) & 0xffff);
        }
        method_WRMEM_B(runtime, (members.m_data ?? 0), addr, 255);
    }
    function method_Z4C_0000_1000_addr(runtime) {
        const members = runtime.members;
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        method_WRMEM_B(runtime, (members.m_data ?? 0), addr, 0);
    }
    function method_Z4C_ddN0_0000_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)])) >>> 0);
        method_WRMEM_B(runtime, (members.m_data ?? 0), addr, method_COMB(runtime, method_RDMEM_B(runtime, (members.m_data ?? 0), addr)));
    }
    function method_Z4C_ddN0_0001_addr_imm8(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        let imm8 = ((((method_get_operand(runtime, 2)) & 0xff)) & 0xff);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)])) >>> 0);
        method_CPB(runtime, method_RDMEM_B(runtime, (members.m_data ?? 0), addr), imm8);
    }
    function method_Z4C_ddN0_0010_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)])) >>> 0);
        method_WRMEM_B(runtime, (members.m_data ?? 0), addr, method_NEGB(runtime, method_RDMEM_B(runtime, (members.m_data ?? 0), addr)));
    }
    function method_Z4C_ddN0_0100_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)])) >>> 0);
        method_TESTB(runtime, method_RDMEM_B(runtime, (members.m_data ?? 0), addr));
    }
    function method_Z4C_ddN0_0101_addr_imm8(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        let imm8 = ((((method_get_operand(runtime, 2)) & 0xff)) & 0xff);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)])) >>> 0);
        method_WRMEM_B(runtime, (members.m_data ?? 0), addr, imm8);
    }
    function method_Z4C_ddN0_0110_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)])) >>> 0);
        if (((method_RDMEM_B(runtime, (members.m_data ?? 0), addr)) & (128))) {
            members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
        }
        else {
            members.m_fcw = ((((members.m_fcw) & (-33))) & 0xffff);
        }
        method_WRMEM_B(runtime, (members.m_data ?? 0), addr, 255);
    }
    function method_Z4C_ddN0_1000_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)])) >>> 0);
        method_WRMEM_B(runtime, (members.m_data ?? 0), addr, 0);
    }
    function method_Z4D_0000_0000_addr(runtime) {
        const members = runtime.members;
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        method_WRMEM_W(runtime, (members.m_data ?? 0), addr, method_COMW(runtime, method_RDMEM_W(runtime, (members.m_data ?? 0), addr)));
    }
    function method_Z4D_0000_0001_addr_imm16(runtime) {
        const members = runtime.members;
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        let imm16 = ((method_get_operand(runtime, 2)) & 0xffff);
        method_CPW(runtime, method_RDMEM_W(runtime, (members.m_data ?? 0), addr), imm16);
    }
    function method_Z4D_0000_0010_addr(runtime) {
        const members = runtime.members;
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        method_WRMEM_W(runtime, (members.m_data ?? 0), addr, method_NEGW(runtime, method_RDMEM_W(runtime, (members.m_data ?? 0), addr)));
    }
    function method_Z4D_0000_0100_addr(runtime) {
        const members = runtime.members;
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        method_TESTW(runtime, method_RDMEM_W(runtime, (members.m_data ?? 0), addr));
    }
    function method_Z4D_0000_0101_addr_imm16(runtime) {
        const members = runtime.members;
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        let imm16 = ((method_get_operand(runtime, 2)) & 0xffff);
        method_WRMEM_W(runtime, (members.m_data ?? 0), addr, imm16);
    }
    function method_Z4D_0000_0110_addr(runtime) {
        const members = runtime.members;
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        if (((method_RDMEM_W(runtime, (members.m_data ?? 0), addr)) & (32768))) {
            members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
        }
        else {
            members.m_fcw = ((((members.m_fcw) & (-33))) & 0xffff);
        }
        method_WRMEM_W(runtime, (members.m_data ?? 0), addr, 65535);
    }
    function method_Z4D_0000_1000_addr(runtime) {
        const members = runtime.members;
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        method_WRMEM_W(runtime, (members.m_data ?? 0), addr, 0);
    }
    function method_Z4D_ddN0_0000_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)])) >>> 0);
        method_WRMEM_W(runtime, (members.m_data ?? 0), addr, method_COMW(runtime, method_RDMEM_W(runtime, (members.m_data ?? 0), addr)));
    }
    function method_Z4D_ddN0_0001_addr_imm16(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        let imm16 = ((method_get_operand(runtime, 2)) & 0xffff);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)])) >>> 0);
        method_CPW(runtime, method_RDMEM_W(runtime, (members.m_data ?? 0), addr), imm16);
    }
    function method_Z4D_ddN0_0010_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)])) >>> 0);
        method_WRMEM_W(runtime, (members.m_data ?? 0), addr, method_NEGW(runtime, method_RDMEM_W(runtime, (members.m_data ?? 0), addr)));
    }
    function method_Z4D_ddN0_0100_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)])) >>> 0);
        method_TESTW(runtime, method_RDMEM_W(runtime, (members.m_data ?? 0), addr));
    }
    function method_Z4D_ddN0_0101_addr_imm16(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        let imm16 = ((method_get_operand(runtime, 2)) & 0xffff);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)])) >>> 0);
        method_WRMEM_W(runtime, (members.m_data ?? 0), addr, imm16);
    }
    function method_Z4D_ddN0_0110_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)])) >>> 0);
        if (((method_RDMEM_W(runtime, (members.m_data ?? 0), addr)) & (32768))) {
            members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
        }
        else {
            members.m_fcw = ((((members.m_fcw) & (-33))) & 0xffff);
        }
        method_WRMEM_W(runtime, (members.m_data ?? 0), addr, 65535);
    }
    function method_Z4D_ddN0_1000_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)])) >>> 0);
        method_WRMEM_W(runtime, (members.m_data ?? 0), addr, 0);
    }
    function method_Z4E_ddN0_ssN0_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)])) >>> 0);
        method_WRMEM_B(runtime, (members.m_data ?? 0), addr, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((src) & (7))) << (1))) | (runtime.shiftRight(((src) & (8)), 3))))]);
    }
    function method_Z50_0000_dddd_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        method_CPL(runtime, h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))], method_RDMEM_L(runtime, (members.m_data ?? 0), addr));
    }
    function method_Z50_ssN0_dddd_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)])) >>> 0);
        method_CPL(runtime, h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))], method_RDMEM_L(runtime, (members.m_data ?? 0), addr));
    }
    function method_Z51_ddN0_0000_addr(runtime) {
        const members = runtime.members;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        method_PUSHL(runtime, dst, method_RDMEM_L(runtime, (members.m_data ?? 0), addr));
    }
    function method_Z51_ddN0_ssN0_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)])) >>> 0);
        method_PUSHL(runtime, dst, method_RDMEM_L(runtime, (members.m_data ?? 0), addr));
    }
    function method_Z52_0000_dddd_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))] = method_SUBL(runtime, h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))], method_RDMEM_L(runtime, (members.m_data ?? 0), addr));
    }
    function method_Z52_ssN0_dddd_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)])) >>> 0);
        h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))] = method_SUBL(runtime, h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))], method_RDMEM_L(runtime, (members.m_data ?? 0), addr));
    }
    function method_Z53_ddN0_0000_addr(runtime) {
        const members = runtime.members;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        method_PUSHW(runtime, dst, method_RDMEM_W(runtime, (members.m_data ?? 0), addr));
    }
    function method_Z53_ddN0_ssN0_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)])) >>> 0);
        method_PUSHW(runtime, dst, method_RDMEM_W(runtime, (members.m_data ?? 0), addr));
    }
    function method_Z54_0000_dddd_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))] = method_RDMEM_L(runtime, (members.m_data ?? 0), addr);
    }
    function method_Z54_ssN0_dddd_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)])) >>> 0);
        h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))] = method_RDMEM_L(runtime, (members.m_data ?? 0), addr);
    }
    function method_Z55_ssN0_0000_addr(runtime) {
        const members = runtime.members;
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        method_WRMEM_L(runtime, (members.m_data ?? 0), addr, method_POPL(runtime, src));
    }
    function method_Z55_ssN0_ddN0_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)])) >>> 0);
        method_WRMEM_L(runtime, (members.m_data ?? 0), addr, method_POPL(runtime, src));
    }
    function method_Z56_0000_dddd_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))] = method_ADDL(runtime, h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))], method_RDMEM_L(runtime, (members.m_data ?? 0), addr));
    }
    function method_Z56_ssN0_dddd_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)])) >>> 0);
        h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))] = method_ADDL(runtime, h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))], method_RDMEM_L(runtime, (members.m_data ?? 0), addr));
    }
    function method_Z57_ssN0_0000_addr(runtime) {
        const members = runtime.members;
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        method_WRMEM_W(runtime, (members.m_data ?? 0), addr, method_POPW(runtime, src));
    }
    function method_Z57_ssN0_ddN0_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)])) >>> 0);
        method_WRMEM_W(runtime, (members.m_data ?? 0), addr, method_POPW(runtime, src));
    }
    function method_Z58_0000_dddd_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        h_m_regs.Q[((dst) >>> (2))] = method_MULTL(runtime, h_m_regs.Q[((dst) >>> (2))], method_RDMEM_L(runtime, (members.m_data ?? 0), addr));
    }
    function method_Z58_ssN0_dddd_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)])) >>> 0);
        h_m_regs.Q[((dst) >>> (2))] = method_MULTL(runtime, h_m_regs.Q[((dst) >>> (2))], method_RDMEM_L(runtime, (members.m_data ?? 0), addr));
    }
    function method_Z59_0000_dddd_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))] = method_MULTW(runtime, h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))], method_RDMEM_W(runtime, (members.m_data ?? 0), addr));
    }
    function method_Z59_ssN0_dddd_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)])) >>> 0);
        h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))] = method_MULTW(runtime, h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))], method_RDMEM_W(runtime, (members.m_data ?? 0), addr));
    }
    function method_Z5A_0000_dddd_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        h_m_regs.Q[((dst) >>> (2))] = method_DIVL(runtime, h_m_regs.Q[((dst) >>> (2))], method_RDMEM_L(runtime, (members.m_data ?? 0), addr));
    }
    function method_Z5A_ssN0_dddd_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)])) >>> 0);
        h_m_regs.Q[((dst) >>> (2))] = method_DIVL(runtime, h_m_regs.Q[((dst) >>> (2))], method_RDMEM_L(runtime, (members.m_data ?? 0), addr));
    }
    function method_Z5B_0000_dddd_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))] = method_DIVW(runtime, h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))], method_RDMEM_W(runtime, (members.m_data ?? 0), addr));
    }
    function method_Z5B_ssN0_dddd_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)])) >>> 0);
        h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))] = method_DIVW(runtime, h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))], method_RDMEM_W(runtime, (members.m_data ?? 0), addr));
    }
    function method_Z5C_0000_0001_0000_dddd_0000_nmin1_addr(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) & 0xff);
        let cnt = ((((runtime.shiftRight(method_get_operand(runtime, 1), 0)) & (15))) << 24 >> 24);
        let addr = ((((method_get_addr_operand(runtime, 2)) >>> 0)) >>> 0);
        while (((Number((__t0 = cnt, cnt = ((((cnt) - (1))) << 24 >> 24), __t0)) >= Number(0)) ? 1 : 0)) {
            h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = method_RDMEM_W(runtime, (members.m_data ?? 0), addr);
            dst = ((((((dst) + (1))) & (15))) & 0xff);
            addr = ((method_addr_add(runtime, addr, 2)) >>> 0);
        }
    }
    function method_Z5C_0000_1000_addr(runtime) {
        const members = runtime.members;
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        method_TESTL(runtime, method_RDMEM_L(runtime, (members.m_data ?? 0), addr));
    }
    function method_Z5C_0000_1001_0000_ssss_0000_nmin1_addr(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_regs = members.m_regs ?? 0;
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) & 0xff);
        let cnt = ((((runtime.shiftRight(method_get_operand(runtime, 1), 0)) & (15))) << 24 >> 24);
        let addr = ((((method_get_addr_operand(runtime, 2)) >>> 0)) >>> 0);
        while (((Number((__t0 = cnt, cnt = ((((cnt) - (1))) << 24 >> 24), __t0)) >= Number(0)) ? 1 : 0)) {
            method_WRMEM_W(runtime, (members.m_data ?? 0), addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]);
            src = ((((((src) + (1))) & (15))) & 0xff);
            addr = ((method_addr_add(runtime, addr, 2)) >>> 0);
        }
    }
    function method_Z5C_ddN0_1000_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)])) >>> 0);
        method_TESTL(runtime, method_RDMEM_L(runtime, (members.m_data ?? 0), addr));
    }
    function method_Z5C_ddN0_1001_0000_ssN0_0000_nmin1_addr(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) & 0xff);
        let cnt = ((((runtime.shiftRight(method_get_operand(runtime, 1), 0)) & (15))) << 24 >> 24);
        let addr = ((((method_get_addr_operand(runtime, 2)) >>> 0)) >>> 0);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)])) >>> 0);
        while (((Number((__t0 = cnt, cnt = ((((cnt) - (1))) << 24 >> 24), __t0)) >= Number(0)) ? 1 : 0)) {
            method_WRMEM_W(runtime, (members.m_data ?? 0), addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]);
            src = ((((((src) + (1))) & (15))) & 0xff);
            addr = ((method_addr_add(runtime, addr, 2)) >>> 0);
        }
    }
    function method_Z5C_ssN0_0001_0000_dddd_0000_nmin1_addr(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_regs = members.m_regs ?? 0;
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) & 0xff);
        let cnt = ((((runtime.shiftRight(method_get_operand(runtime, 1), 0)) & (15))) << 24 >> 24);
        let addr = ((((method_get_addr_operand(runtime, 2)) >>> 0)) >>> 0);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)])) >>> 0);
        while (((Number((__t0 = cnt, cnt = ((((cnt) - (1))) << 24 >> 24), __t0)) >= Number(0)) ? 1 : 0)) {
            h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = method_RDMEM_W(runtime, (members.m_data ?? 0), addr);
            dst = ((((((dst) + (1))) & (15))) & 0xff);
            addr = ((method_addr_add(runtime, addr, 2)) >>> 0);
        }
    }
    function method_Z5D_0000_ssss_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        method_WRMEM_L(runtime, (members.m_data ?? 0), addr, h_m_regs.L[method_BYTE_XOR_BE(runtime, ((src) >>> (1)))]);
    }
    function method_Z5D_ddN0_ssss_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)])) >>> 0);
        method_WRMEM_L(runtime, (members.m_data ?? 0), addr, h_m_regs.L[method_BYTE_XOR_BE(runtime, ((src) >>> (1)))]);
    }
    function method_Z5E_0000_cccc_addr(runtime) {
        const members = runtime.members;
        let cc = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        switch (cc) {
            case 0:
                {
                    break;
                }
            case 1:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))) {
                        method_set_pc(runtime, addr);
                    }
                    break;
                }
            case 2:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))))) {
                        method_set_pc(runtime, addr);
                    }
                    break;
                }
            case 3:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((members.m_fcw ?? 0)) >>> (7))) & (1))))) {
                        method_set_pc(runtime, addr);
                    }
                    break;
                }
            case 4:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (4))) & (1))) {
                        method_set_pc(runtime, addr);
                    }
                    break;
                }
            case 5:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (5))) & (1))) {
                        method_set_pc(runtime, addr);
                    }
                    break;
                }
            case 6:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (6))) & (1))) {
                        method_set_pc(runtime, addr);
                    }
                    break;
                }
            case 7:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (7))) & (1))) {
                        method_set_pc(runtime, addr);
                    }
                    break;
                }
            case 8:
                {
                    if (1) {
                        method_set_pc(runtime, addr);
                    }
                    break;
                }
            case 9:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))) ? 0 : 1)) {
                        method_set_pc(runtime, addr);
                    }
                    break;
                }
            case 10:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))))) ? 0 : 1)) {
                        method_set_pc(runtime, addr);
                    }
                    break;
                }
            case 11:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((members.m_fcw ?? 0)) >>> (7))) & (1))))) ? 0 : 1)) {
                        method_set_pc(runtime, addr);
                    }
                    break;
                }
            case 12:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ? 0 : 1)) {
                        method_set_pc(runtime, addr);
                    }
                    break;
                }
            case 13:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (5))) & (1))) ? 0 : 1)) {
                        method_set_pc(runtime, addr);
                    }
                    break;
                }
            case 14:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) ? 0 : 1)) {
                        method_set_pc(runtime, addr);
                    }
                    break;
                }
            case 15:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (7))) & (1))) ? 0 : 1)) {
                        method_set_pc(runtime, addr);
                    }
                    break;
                }
        }
    }
    function method_Z5E_ddN0_cccc_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let cc = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)])) >>> 0);
        switch (cc) {
            case 0:
                {
                    break;
                }
            case 1:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))) {
                        method_set_pc(runtime, addr);
                    }
                    break;
                }
            case 2:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))))) {
                        method_set_pc(runtime, addr);
                    }
                    break;
                }
            case 3:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((members.m_fcw ?? 0)) >>> (7))) & (1))))) {
                        method_set_pc(runtime, addr);
                    }
                    break;
                }
            case 4:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (4))) & (1))) {
                        method_set_pc(runtime, addr);
                    }
                    break;
                }
            case 5:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (5))) & (1))) {
                        method_set_pc(runtime, addr);
                    }
                    break;
                }
            case 6:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (6))) & (1))) {
                        method_set_pc(runtime, addr);
                    }
                    break;
                }
            case 7:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (7))) & (1))) {
                        method_set_pc(runtime, addr);
                    }
                    break;
                }
            case 8:
                {
                    if (1) {
                        method_set_pc(runtime, addr);
                    }
                    break;
                }
            case 9:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))) ? 0 : 1)) {
                        method_set_pc(runtime, addr);
                    }
                    break;
                }
            case 10:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))))) ? 0 : 1)) {
                        method_set_pc(runtime, addr);
                    }
                    break;
                }
            case 11:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((members.m_fcw ?? 0)) >>> (7))) & (1))))) ? 0 : 1)) {
                        method_set_pc(runtime, addr);
                    }
                    break;
                }
            case 12:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ? 0 : 1)) {
                        method_set_pc(runtime, addr);
                    }
                    break;
                }
            case 13:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (5))) & (1))) ? 0 : 1)) {
                        method_set_pc(runtime, addr);
                    }
                    break;
                }
            case 14:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) ? 0 : 1)) {
                        method_set_pc(runtime, addr);
                    }
                    break;
                }
            case 15:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (7))) & (1))) ? 0 : 1)) {
                        method_set_pc(runtime, addr);
                    }
                    break;
                }
        }
    }
    function method_Z5F_0000_0000_addr(runtime) {
        const members = runtime.members;
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        if (method_get_segmented_mode(runtime)) {
            method_PUSHL(runtime, ((method_get_segmented_mode(runtime)) ? (14) : (15)), method_make_segmented_addr(runtime, (members.m_pc ?? 0)));
        }
        else {
            method_PUSHW(runtime, ((method_get_segmented_mode(runtime)) ? (14) : (15)), (members.m_pc ?? 0));
        }
        method_set_pc(runtime, addr);
    }
    function method_Z5F_ddN0_0000_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        if (method_get_segmented_mode(runtime)) {
            method_PUSHL(runtime, ((method_get_segmented_mode(runtime)) ? (14) : (15)), method_make_segmented_addr(runtime, (members.m_pc ?? 0)));
        }
        else {
            method_PUSHW(runtime, ((method_get_segmented_mode(runtime)) ? (14) : (15)), (members.m_pc ?? 0));
        }
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)])) >>> 0);
        method_set_pc(runtime, addr);
    }
    function method_Z60_0000_dddd_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = method_RDMEM_B(runtime, (members.m_data ?? 0), addr);
    }
    function method_Z60_ssN0_dddd_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)])) >>> 0);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = method_RDMEM_B(runtime, (members.m_data ?? 0), addr);
    }
    function method_Z61_0000_dddd_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = method_RDMEM_W(runtime, (members.m_data ?? 0), addr);
    }
    function method_Z61_ssN0_dddd_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)])) >>> 0);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = method_RDMEM_W(runtime, (members.m_data ?? 0), addr);
    }
    function method_Z62_0000_imm4_addr(runtime) {
        const members = runtime.members;
        let bit = ((((1) << (((method_get_operand(runtime, 0)) & (15))))) & 0xffff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        method_WRMEM_B(runtime, (members.m_data ?? 0), addr, ((method_RDMEM_B(runtime, (members.m_data ?? 0), addr)) & ((~bit))));
    }
    function method_Z62_ddN0_imm4_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let bit = ((((1) << (((method_get_operand(runtime, 0)) & (15))))) & 0xffff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)])) >>> 0);
        method_WRMEM_B(runtime, (members.m_data ?? 0), addr, ((method_RDMEM_B(runtime, (members.m_data ?? 0), addr)) & ((~bit))));
    }
    function method_Z63_0000_imm4_addr(runtime) {
        const members = runtime.members;
        let bit = ((((1) << (((method_get_operand(runtime, 0)) & (15))))) & 0xffff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        method_WRMEM_W(runtime, (members.m_data ?? 0), addr, ((method_RDMEM_W(runtime, (members.m_data ?? 0), addr)) & ((~bit))));
    }
    function method_Z63_ddN0_imm4_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let bit = ((((1) << (((method_get_operand(runtime, 0)) & (15))))) & 0xffff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)])) >>> 0);
        method_WRMEM_W(runtime, (members.m_data ?? 0), addr, ((method_RDMEM_W(runtime, (members.m_data ?? 0), addr)) & ((~bit))));
    }
    function method_Z64_0000_imm4_addr(runtime) {
        const members = runtime.members;
        let bit = ((((1) << (((method_get_operand(runtime, 0)) & (15))))) & 0xffff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        method_WRMEM_B(runtime, (members.m_data ?? 0), addr, ((method_RDMEM_B(runtime, (members.m_data ?? 0), addr)) | (bit)));
    }
    function method_Z64_ddN0_imm4_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let bit = ((((1) << (((method_get_operand(runtime, 0)) & (15))))) & 0xffff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)])) >>> 0);
        method_WRMEM_B(runtime, (members.m_data ?? 0), addr, ((method_RDMEM_B(runtime, (members.m_data ?? 0), addr)) | (bit)));
    }
    function method_Z65_0000_imm4_addr(runtime) {
        const members = runtime.members;
        let bit = ((((1) << (((method_get_operand(runtime, 0)) & (15))))) & 0xffff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        method_WRMEM_W(runtime, (members.m_data ?? 0), addr, ((method_RDMEM_W(runtime, (members.m_data ?? 0), addr)) | (bit)));
    }
    function method_Z65_ddN0_imm4_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let bit = ((((1) << (((method_get_operand(runtime, 0)) & (15))))) & 0xffff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)])) >>> 0);
        method_WRMEM_W(runtime, (members.m_data ?? 0), addr, ((method_RDMEM_W(runtime, (members.m_data ?? 0), addr)) | (bit)));
    }
    function method_Z66_0000_imm4_addr(runtime) {
        const members = runtime.members;
        let bit = ((((1) << (((method_get_operand(runtime, 0)) & (15))))) & 0xffff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        if (((method_RDMEM_B(runtime, (members.m_data ?? 0), addr)) & (bit))) {
            members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
    }
    function method_Z66_ddN0_imm4_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let bit = ((((1) << (((method_get_operand(runtime, 0)) & (15))))) & 0xffff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)])) >>> 0);
        if (((method_RDMEM_B(runtime, (members.m_data ?? 0), addr)) & (bit))) {
            members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
    }
    function method_Z67_0000_imm4_addr(runtime) {
        const members = runtime.members;
        let bit = ((((1) << (((method_get_operand(runtime, 0)) & (15))))) & 0xffff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        if (((method_RDMEM_W(runtime, (members.m_data ?? 0), addr)) & (bit))) {
            members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
    }
    function method_Z67_ddN0_imm4_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let bit = ((((1) << (((method_get_operand(runtime, 0)) & (15))))) & 0xffff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)])) >>> 0);
        if (((method_RDMEM_W(runtime, (members.m_data ?? 0), addr)) & (bit))) {
            members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
    }
    function method_Z68_0000_imm4m1_addr(runtime) {
        const members = runtime.members;
        let i4p1 = ((__add_Z68_0000_imm4m1_addr(runtime, ((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15)), 1)) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        method_WRMEM_B(runtime, (members.m_data ?? 0), addr, method_INCB(runtime, method_RDMEM_B(runtime, (members.m_data ?? 0), addr), i4p1));
    }
    function __add_Z68_0000_imm4m1_addr(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_Z68_ddN0_imm4m1_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let i4p1 = ((__add_Z68_ddN0_imm4m1_addr(runtime, ((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15)), 1)) & 0xff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)])) >>> 0);
        method_WRMEM_B(runtime, (members.m_data ?? 0), addr, method_INCB(runtime, method_RDMEM_B(runtime, (members.m_data ?? 0), addr), i4p1));
    }
    function __add_Z68_ddN0_imm4m1_addr(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_Z69_0000_imm4m1_addr(runtime) {
        const members = runtime.members;
        let i4p1 = ((__add_Z69_0000_imm4m1_addr(runtime, ((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15)), 1)) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        method_WRMEM_W(runtime, (members.m_data ?? 0), addr, method_INCW(runtime, method_RDMEM_W(runtime, (members.m_data ?? 0), addr), i4p1));
    }
    function __add_Z69_0000_imm4m1_addr(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_Z69_ddN0_imm4m1_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let i4p1 = ((__add_Z69_ddN0_imm4m1_addr(runtime, ((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15)), 1)) & 0xff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)])) >>> 0);
        method_WRMEM_W(runtime, (members.m_data ?? 0), addr, method_INCW(runtime, method_RDMEM_W(runtime, (members.m_data ?? 0), addr), i4p1));
    }
    function __add_Z69_ddN0_imm4m1_addr(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_Z6A_0000_imm4m1_addr(runtime) {
        const members = runtime.members;
        let i4p1 = ((__add_Z6A_0000_imm4m1_addr(runtime, ((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15)), 1)) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        method_WRMEM_B(runtime, (members.m_data ?? 0), addr, method_DECB(runtime, method_RDMEM_B(runtime, (members.m_data ?? 0), addr), i4p1));
    }
    function __add_Z6A_0000_imm4m1_addr(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_Z6A_ddN0_imm4m1_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let i4p1 = ((__add_Z6A_ddN0_imm4m1_addr(runtime, ((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15)), 1)) & 0xff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)])) >>> 0);
        method_WRMEM_B(runtime, (members.m_data ?? 0), addr, method_DECB(runtime, method_RDMEM_B(runtime, (members.m_data ?? 0), addr), i4p1));
    }
    function __add_Z6A_ddN0_imm4m1_addr(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_Z6B_0000_imm4m1_addr(runtime) {
        const members = runtime.members;
        let i4p1 = ((__add_Z6B_0000_imm4m1_addr(runtime, ((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15)), 1)) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        method_WRMEM_W(runtime, (members.m_data ?? 0), addr, method_DECW(runtime, method_RDMEM_W(runtime, (members.m_data ?? 0), addr), i4p1));
    }
    function __add_Z6B_0000_imm4m1_addr(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_Z6B_ddN0_imm4m1_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let i4p1 = ((__add_Z6B_ddN0_imm4m1_addr(runtime, ((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15)), 1)) & 0xff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)])) >>> 0);
        method_WRMEM_W(runtime, (members.m_data ?? 0), addr, method_DECW(runtime, method_RDMEM_W(runtime, (members.m_data ?? 0), addr), i4p1));
    }
    function __add_Z6B_ddN0_imm4m1_addr(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_Z6C_0000_dddd_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        let tmp = ((method_RDMEM_B(runtime, (members.m_data ?? 0), addr)) & 0xff);
        method_WRMEM_B(runtime, (members.m_data ?? 0), addr, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))]);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = tmp;
    }
    function method_Z6C_ssN0_dddd_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        let tmp = ((0) & 0xff);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)])) >>> 0);
        tmp = ((method_RDMEM_B(runtime, (members.m_data ?? 0), addr)) & 0xff);
        method_WRMEM_B(runtime, (members.m_data ?? 0), addr, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))]);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = tmp;
    }
    function method_Z6D_0000_dddd_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        let tmp = ((method_RDMEM_W(runtime, (members.m_data ?? 0), addr)) & 0xffff);
        method_WRMEM_W(runtime, (members.m_data ?? 0), addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)]);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = tmp;
    }
    function method_Z6D_ssN0_dddd_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        let tmp = ((0) & 0xffff);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)])) >>> 0);
        tmp = ((method_RDMEM_W(runtime, (members.m_data ?? 0), addr)) & 0xffff);
        method_WRMEM_W(runtime, (members.m_data ?? 0), addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)]);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = tmp;
    }
    function method_Z6E_0000_ssss_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        method_WRMEM_B(runtime, (members.m_data ?? 0), addr, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((src) & (7))) << (1))) | (runtime.shiftRight(((src) & (8)), 3))))]);
    }
    function method_Z6E_ddN0_ssss_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)])) >>> 0);
        method_WRMEM_B(runtime, (members.m_data ?? 0), addr, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((src) & (7))) << (1))) | (runtime.shiftRight(((src) & (8)), 3))))]);
    }
    function method_Z6F_0000_ssss_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        method_WRMEM_W(runtime, (members.m_data ?? 0), addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]);
    }
    function method_Z6F_ddN0_ssss_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)])) >>> 0);
        method_WRMEM_W(runtime, (members.m_data ?? 0), addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]);
    }
    function method_Z70_ssN0_dddd_0000_xxxx_0000_0000(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let idx = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) & 0xff);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = method_RDBX_B(runtime, src, h_m_regs.W[method_BYTE4_XOR_BE(runtime, idx)]);
    }
    function method_Z71_ssN0_dddd_0000_xxxx_0000_0000(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let idx = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) & 0xff);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = method_RDBX_W(runtime, src, h_m_regs.W[method_BYTE4_XOR_BE(runtime, idx)]);
    }
    function method_Z72_ddN0_ssss_0000_xxxx_0000_0000(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let idx = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) & 0xff);
        method_WRBX_B(runtime, dst, h_m_regs.W[method_BYTE4_XOR_BE(runtime, idx)], h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((src) & (7))) << (1))) | (runtime.shiftRight(((src) & (8)), 3))))]);
    }
    function method_Z73_ddN0_ssss_0000_xxxx_0000_0000(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let idx = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) & 0xff);
        method_WRBX_W(runtime, dst, h_m_regs.W[method_BYTE4_XOR_BE(runtime, idx)], h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]);
    }
    function method_Z74_ssN0_dddd_0000_xxxx_0000_0000(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let idx = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) & 0xff);
        if (method_get_segmented_mode(runtime)) {
            h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))] = h_m_regs.L[method_BYTE_XOR_BE(runtime, ((src) >>> (1)))];
        }
        else {
            h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)];
        }
        method_add_to_addr_reg(runtime, dst, h_m_regs.W[method_BYTE4_XOR_BE(runtime, idx)]);
    }
    function method_Z75_ssN0_dddd_0000_xxxx_0000_0000(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let idx = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) & 0xff);
        h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))] = method_RDBX_L(runtime, src, h_m_regs.W[method_BYTE4_XOR_BE(runtime, idx)]);
    }
    function method_Z76_0000_dddd_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let addr = ((((method_get_raw_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        if (method_get_segmented_mode(runtime)) {
            h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))] = addr;
        }
        else {
            h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = addr;
        }
    }
    function method_get_raw_addr_operand(runtime, opnum) {
        const members = runtime.members;
        const h_m_op = members.m_op ?? 0;
        let i = ((0) | 0);
        for (i = ((0) | 0); (((i) < (opnum)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
        }
        if ((((((members.m_op_valid ?? 0)) & (((1) << (opnum))))) ? 0 : 1)) {
            let seg = (((__deref_get_raw_addr_operand(runtime, members.m_cache).read_word?.((members.m_pc ?? 0)) ?? 0)) >>> 0);
            members.m_pc = ((((members.m_pc) + (2))) >>> 0);
            if (method_get_segmented_mode(runtime)) {
                if (((seg) & (32768))) {
                    h_m_op[opnum] = ((((seg) << (16))) | ((__deref_get_raw_addr_operand(runtime, members.m_cache).read_word?.((members.m_pc ?? 0)) ?? 0)));
                    members.m_pc = ((((members.m_pc) + (2))) >>> 0);
                }
                else {
                    h_m_op[opnum] = ((((seg) << (16))) | (((seg) & (255))));
                }
            }
            else {
                h_m_op[opnum] = seg;
            }
            members.m_op_valid = ((((members.m_op_valid) | (((1) << (opnum))))) >>> 0);
        }
        return ((h_m_op[opnum]) >>> 0);
    }
    function __deref_get_raw_addr_operand(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_Z76_ssN0_dddd_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_raw_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        let temp = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]) & 0xffff);
        if (method_get_segmented_mode(runtime)) {
            h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))] = addr;
        }
        else {
            h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = addr;
        }
        method_add_to_addr_reg(runtime, dst, temp);
    }
    function method_Z77_ddN0_ssss_0000_xxxx_0000_0000(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let idx = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) & 0xff);
        method_WRBX_L(runtime, dst, h_m_regs.W[method_BYTE4_XOR_BE(runtime, idx)], h_m_regs.L[method_BYTE_XOR_BE(runtime, ((src) >>> (1)))]);
    }
    function method_Z78_imm8(runtime) {
        const members = runtime.members;
        let imm8 = ((((method_get_operand(runtime, 0)) & 0xff)) & 0xff);
        0;
        if ((((members.m_fcw ?? 0)) & (8192))) {
        }
    }
    function method_Z79_0000_0000_addr(runtime) {
        const members = runtime.members;
        if ((((((members.m_fcw ?? 0)) & (16384))) ? 0 : 1)) {
            members.m_irq_req = ((((members.m_irq_req) | (64))) & 0xff);
            return;
        }
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        let fcw = ((0) & 0xffff);
        if (method_get_segmented_mode(runtime)) {
            fcw = ((method_RDMEM_W(runtime, (members.m_data ?? 0), ((addr) + (2)))) & 0xffff);
            method_set_pc(runtime, method_segmented_addr(runtime, method_RDMEM_L(runtime, (members.m_data ?? 0), ((addr) + (4)))));
        }
        else {
            fcw = ((method_RDMEM_W(runtime, (members.m_data ?? 0), addr)) & 0xffff);
            method_set_pc(runtime, method_RDMEM_W(runtime, (members.m_data ?? 0), ((((addr) + (2))) & 0xffff)));
        }
        method_CHANGE_FCW(runtime, fcw);
    }
    function method_Z79_ssN0_0000_addr(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        if ((((((members.m_fcw ?? 0)) & (16384))) ? 0 : 1)) {
            members.m_irq_req = ((((members.m_irq_req) | (64))) & 0xff);
            return;
        }
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let addr = ((((method_get_addr_operand(runtime, 1)) >>> 0)) >>> 0);
        let fcw = ((0) & 0xffff);
        addr = ((method_addr_add(runtime, addr, h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)])) >>> 0);
        if (method_get_segmented_mode(runtime)) {
            fcw = ((method_RDMEM_W(runtime, (members.m_data ?? 0), ((addr) + (2)))) & 0xffff);
            method_set_pc(runtime, method_segmented_addr(runtime, method_RDMEM_L(runtime, (members.m_data ?? 0), ((addr) + (4)))));
        }
        else {
            fcw = ((method_RDMEM_W(runtime, (members.m_data ?? 0), addr)) & 0xffff);
            members.m_pc = ((method_RDMEM_W(runtime, (members.m_data ?? 0), ((((addr) + (2))) & 0xffff))) >>> 0);
        }
        if (((((fcw) ^ ((members.m_fcw ?? 0)))) & (32768))) {
            /* printf: no effect */
        }
        method_CHANGE_FCW(runtime, fcw);
    }
    function method_Z7A_0000_0000(runtime) {
        const members = runtime.members;
        if ((((((members.m_fcw ?? 0)) & (16384))) ? 0 : 1)) {
            members.m_irq_req = ((((members.m_irq_req) | (64))) & 0xff);
            return;
        }
        members.m_halt = ((1) ? 1 : 0);
        if (((((members.m_icount ?? 0)) > (0)) ? 1 : 0)) {
            members.m_icount = ((0) | 0);
        }
    }
    function method_Z7B_0000_0000(runtime) {
        const members = runtime.members;
        let tag = ((0) & 0xffff);
        let fcw = ((0) & 0xffff);
        if ((((((members.m_fcw ?? 0)) & (16384))) ? 0 : 1)) {
            members.m_irq_req = ((((members.m_irq_req) | (64))) & 0xff);
            return;
        }
        tag = ((method_POPW(runtime, ((method_get_segmented_mode(runtime)) ? (14) : (15)))) & 0xffff);
        fcw = ((method_POPW(runtime, ((method_get_segmented_mode(runtime)) ? (14) : (15)))) & 0xffff);
        if (method_get_segmented_mode(runtime)) {
            method_set_pc(runtime, method_segmented_addr(runtime, method_POPL(runtime, ((method_get_segmented_mode(runtime)) ? (14) : (15)))));
        }
        else {
            members.m_pc = ((method_POPW(runtime, ((method_get_segmented_mode(runtime)) ? (14) : (15)))) >>> 0);
        }
        method_CHANGE_FCW(runtime, fcw);
        0;
    }
    function method_Z7B_0000_1000(runtime) {
        const members = runtime.members;
        if ((((((members.m_fcw ?? 0)) & (16384))) ? 0 : 1)) {
            members.m_irq_req = ((((members.m_irq_req) | (64))) & 0xff);
            return;
        }
    }
    function method_Z7B_0000_1001(runtime) {
        const members = runtime.members;
        if ((((((members.m_fcw ?? 0)) & (16384))) ? 0 : 1)) {
            members.m_irq_req = ((((members.m_irq_req) | (64))) & 0xff);
            return;
        }
    }
    function method_Z7B_0000_1010(runtime) {
        const members = runtime.members;
        if ((((((members.m_fcw ?? 0)) & (16384))) ? 0 : 1)) {
            members.m_irq_req = ((((members.m_irq_req) | (64))) & 0xff);
            return;
        }
    }
    function method_Z7B_dddd_1101(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_mo_out"];
        if ((((((members.m_fcw ?? 0)) & (16384))) ? 0 : 1)) {
            members.m_irq_req = ((((members.m_irq_req) | (64))) & 0xff);
            return;
        }
        if ((members.m_mi ?? 0)) {
            members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
            members.m_fcw = ((((members.m_fcw) & (-33))) & 0xffff);
            (__L0 ? __L0(Number(0)) : typeof members.m_mo_out === 'function' ? members.m_mo_out(0) : runtime.invoke("m_mo_out", 0));
            return;
        }
        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        (__L0 ? __L0(Number(1)) : typeof members.m_mo_out === 'function' ? members.m_mo_out(1) : runtime.invoke("m_mo_out", 1));
        if ((members.m_mi ?? 0)) {
            members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
        }
        else {
            members.m_fcw = ((((members.m_fcw) & (-33))) & 0xffff);
            (__L0 ? __L0(Number(0)) : typeof members.m_mo_out === 'function' ? members.m_mo_out(0) : runtime.invoke("m_mo_out", 0));
        }
    }
    function method_Z7C_0000_00ii(runtime) {
        const members = runtime.members;
        if ((((((members.m_fcw ?? 0)) & (16384))) ? 0 : 1)) {
            members.m_irq_req = ((((members.m_irq_req) | (64))) & 0xff);
            return;
        }
        let imm2 = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (3))) & 0xff);
        let fcw = (((members.m_fcw ?? 0)) & 0xffff);
        fcw = ((((fcw) & (((((imm2) << (11))) | (59391))))) & 0xffff);
        method_CHANGE_FCW(runtime, fcw);
    }
    function method_Z7C_0000_01ii(runtime) {
        const members = runtime.members;
        if ((((((members.m_fcw ?? 0)) & (16384))) ? 0 : 1)) {
            members.m_irq_req = ((((members.m_irq_req) | (64))) & 0xff);
            return;
        }
        let imm2 = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (3))) & 0xff);
        let fcw = (((members.m_fcw ?? 0)) & 0xffff);
        fcw = ((((fcw) | ((((((~imm2)) << (11))) & (6144))))) & 0xffff);
        method_CHANGE_FCW(runtime, fcw);
    }
    function method_Z7D_dddd_0ccc(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        if ((((((members.m_fcw ?? 0)) & (16384))) ? 0 : 1)) {
            members.m_irq_req = ((((members.m_irq_req) | (64))) & 0xff);
            return;
        }
        let imm3 = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (7))) & 0xff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        switch (imm3) {
            case 2:
                {
                    h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = (members.m_fcw ?? 0);
                    break;
                }
            case 3:
                {
                    h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = (members.m_refresh ?? 0);
                    break;
                }
            case 4:
                {
                    h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = (((members.m_psapseg ?? 0)) & (32512));
                    break;
                }
            case 5:
                {
                    h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = (((members.m_psapoff ?? 0)) & (65280));
                    break;
                }
            case 6:
                {
                    h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = (members.m_nspseg ?? 0);
                    break;
                }
            case 7:
                {
                    h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = (members.m_nspoff ?? 0);
                    break;
                }
            default:
                {
                    0;
                }
        }
    }
    function method_Z7D_ssss_1ccc(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        if ((((((members.m_fcw ?? 0)) & (16384))) ? 0 : 1)) {
            members.m_irq_req = ((((members.m_irq_req) | (64))) & 0xff);
            return;
        }
        let imm3 = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (7))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        switch (imm3) {
            case 2:
                {
                    let fcw = ((0) & 0xffff);
                    fcw = ((((h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]) & (55548))) & 0xffff);
                    method_CHANGE_FCW(runtime, fcw);
                    break;
                }
            case 3:
                {
                    members.m_refresh = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]) & 0xffff);
                    break;
                }
            case 4:
                {
                    members.m_psapseg = ((((members.m_psapseg) & (-32513))) & 0xffff);
                    members.m_psapseg = ((((members.m_psapseg) | (((h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]) & (32512))))) & 0xffff);
                    break;
                }
            case 5:
                {
                    members.m_psapoff = ((((members.m_psapoff) & (-65281))) & 0xffff);
                    members.m_psapoff = ((((members.m_psapoff) | (((h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]) & (65280))))) & 0xffff);
                    break;
                }
            case 6:
                {
                    members.m_nspseg = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]) & 0xffff);
                    break;
                }
            case 7:
                {
                    members.m_nspoff = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]) & 0xffff);
                    break;
                }
            default:
                {
                    0;
                }
        }
    }
    function method_Z7E_imm8(runtime) {
        const members = runtime.members;
        let imm8 = ((((method_get_operand(runtime, 0)) & 0xff)) & 0xff);
        0;
        if ((((members.m_fcw ?? 0)) & (8192))) {
        }
    }
    function method_Z7F_imm8(runtime) {
        const members = runtime.members;
        let imm8 = ((((method_get_operand(runtime, 0)) & 0xff)) & 0xff);
        members.m_irq_req = ((((members.m_irq_req) | (2))) & 0xff);
    }
    function method_Z80_ssss_dddd(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = method_ADDB(runtime, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))], h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((src) & (7))) << (1))) | (runtime.shiftRight(((src) & (8)), 3))))]);
    }
    function method_Z81_ssss_dddd(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = method_ADDW(runtime, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)], h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]);
    }
    function method_Z82_ssss_dddd(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = method_SUBB(runtime, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))], h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((src) & (7))) << (1))) | (runtime.shiftRight(((src) & (8)), 3))))]);
    }
    function method_Z83_ssss_dddd(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = method_SUBW(runtime, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)], h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]);
    }
    function method_Z84_ssss_dddd(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = method_ORB(runtime, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))], h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((src) & (7))) << (1))) | (runtime.shiftRight(((src) & (8)), 3))))]);
    }
    function method_Z85_ssss_dddd(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = method_ORW(runtime, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)], h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]);
    }
    function method_Z86_ssss_dddd(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = method_ANDB(runtime, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))], h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((src) & (7))) << (1))) | (runtime.shiftRight(((src) & (8)), 3))))]);
    }
    function method_Z87_ssss_dddd(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = method_ANDW(runtime, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)], h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]);
    }
    function method_Z88_ssss_dddd(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = method_XORB(runtime, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))], h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((src) & (7))) << (1))) | (runtime.shiftRight(((src) & (8)), 3))))]);
    }
    function method_Z89_ssss_dddd(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = method_XORW(runtime, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)], h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]);
    }
    function method_Z8A_ssss_dddd(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        method_CPB(runtime, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))], h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((src) & (7))) << (1))) | (runtime.shiftRight(((src) & (8)), 3))))]);
    }
    function method_Z8B_ssss_dddd(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        method_CPW(runtime, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)], h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]);
    }
    function method_Z8C_dddd_0000(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = method_COMB(runtime, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))]);
    }
    function method_Z8C_dddd_0010(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = method_NEGB(runtime, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))]);
    }
    function method_Z8C_dddd_0100(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        method_TESTB(runtime, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))]);
    }
    function method_Z8C_dddd_0110(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        if (((h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))]) & (128))) {
            members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
        }
        else {
            members.m_fcw = ((((members.m_fcw) & (-33))) & 0xffff);
        }
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = 255;
    }
    function method_Z8C_dddd_0001(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = (((members.m_fcw ?? 0)) & (252));
    }
    function method_Z8C_dddd_1000(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = 0;
    }
    function method_Z8C_dddd_1001(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        members.m_fcw = ((((members.m_fcw) & (-253))) & 0xffff);
        members.m_fcw = ((((members.m_fcw) | (((h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))]) & (252))))) & 0xffff);
    }
    function method_Z8D_0000_0111(runtime) {
        const members = runtime.members;
    }
    function method_Z8D_dddd_0000(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = method_COMW(runtime, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)]);
    }
    function method_Z8D_dddd_0010(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = method_NEGW(runtime, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)]);
    }
    function method_Z8D_dddd_0100(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        method_TESTW(runtime, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)]);
    }
    function method_Z8D_dddd_0110(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        if (((h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)]) & (32768))) {
            members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
        }
        else {
            members.m_fcw = ((((members.m_fcw) & (-33))) & 0xffff);
        }
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = 65535;
    }
    function method_Z8D_dddd_1000(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = 0;
    }
    function method_Z8D_imm4_0001(runtime) {
        const members = runtime.members;
        const h_m_op = members.m_op ?? 0;
        members.m_fcw = ((((members.m_fcw) | (((h_m_op[0]) & (240))))) & 0xffff);
    }
    function method_Z8D_imm4_0011(runtime) {
        const members = runtime.members;
        const h_m_op = members.m_op ?? 0;
        members.m_fcw = ((((members.m_fcw) & ((~((h_m_op[0]) & (240)))))) & 0xffff);
    }
    function method_Z8D_imm4_0101(runtime) {
        const members = runtime.members;
        const h_m_op = members.m_op ?? 0;
        members.m_fcw = ((((members.m_fcw) ^ (((h_m_op[0]) & (240))))) & 0xffff);
    }
    function method_Z8E_imm8(runtime) {
        const members = runtime.members;
        if ((((((members.m_fcw ?? 0)) & (8192))) ? 0 : 1)) {
            members.m_irq_req = ((((members.m_irq_req) | (128))) & 0xff);
            return;
        }
        let imm8 = ((((method_get_operand(runtime, 0)) & 0xff)) & 0xff);
        0;
        if ((((members.m_fcw ?? 0)) & (8192))) {
        }
    }
    function method_Z8F_imm8(runtime) {
        const members = runtime.members;
        if ((((((members.m_fcw ?? 0)) & (8192))) ? 0 : 1)) {
            members.m_irq_req = ((((members.m_irq_req) | (128))) & 0xff);
            return;
        }
        let imm8 = ((((method_get_operand(runtime, 0)) & 0xff)) & 0xff);
        0;
        if ((((members.m_fcw ?? 0)) & (8192))) {
        }
    }
    function method_Z90_ssss_dddd(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        method_CPL(runtime, h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))], h_m_regs.L[method_BYTE_XOR_BE(runtime, ((src) >>> (1)))]);
    }
    function method_Z91_ddN0_ssss(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        method_PUSHL(runtime, dst, h_m_regs.L[method_BYTE_XOR_BE(runtime, ((src) >>> (1)))]);
    }
    function method_Z92_ssss_dddd(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))] = method_SUBL(runtime, h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))], h_m_regs.L[method_BYTE_XOR_BE(runtime, ((src) >>> (1)))]);
    }
    function method_Z93_ddN0_ssss(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        method_PUSHW(runtime, dst, h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]);
    }
    function method_Z94_ssss_dddd(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))] = h_m_regs.L[method_BYTE_XOR_BE(runtime, ((src) >>> (1)))];
    }
    function method_Z95_ssN0_dddd(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))] = method_POPL(runtime, src);
    }
    function method_Z96_ssss_dddd(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))] = method_ADDL(runtime, h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))], h_m_regs.L[method_BYTE_XOR_BE(runtime, ((src) >>> (1)))]);
    }
    function method_Z97_ssN0_dddd(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = method_POPW(runtime, src);
    }
    function method_Z98_ssss_dddd(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.Q[((dst) >>> (2))] = method_MULTL(runtime, h_m_regs.Q[((dst) >>> (2))], h_m_regs.L[method_BYTE_XOR_BE(runtime, ((src) >>> (1)))]);
    }
    function method_Z99_ssss_dddd(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))] = method_MULTW(runtime, h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))], h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]);
    }
    function method_Z9A_ssss_dddd(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.Q[((dst) >>> (2))] = method_DIVL(runtime, h_m_regs.Q[((dst) >>> (2))], h_m_regs.L[method_BYTE_XOR_BE(runtime, ((src) >>> (1)))]);
    }
    function method_Z9B_ssss_dddd(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))] = method_DIVW(runtime, h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))], h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]);
    }
    function method_Z9C_dddd_1000(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        members.m_fcw = ((((members.m_fcw) & (-97))) & 0xffff);
        if (((h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))]) ? 0 : 1)) {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
        else {
            if (((h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))]) & (2147483648))) {
                members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
            }
        }
    }
    function method_Z9D_imm8(runtime) {
        const members = runtime.members;
        let imm8 = ((((method_get_operand(runtime, 0)) & 0xff)) & 0xff);
        0;
        if ((((members.m_fcw ?? 0)) & (8192))) {
        }
    }
    function method_Z9E_0000_cccc(runtime) {
        const members = runtime.members;
        let cc = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        if (method_get_segmented_mode(runtime)) {
            switch (cc) {
                case 0:
                    {
                        break;
                    }
                case 1:
                    {
                        if ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))) {
                            method_set_pc(runtime, method_segmented_addr(runtime, method_POPL(runtime, ((method_get_segmented_mode(runtime)) ? (14) : (15)))));
                        }
                        break;
                    }
                case 2:
                    {
                        if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))))) {
                            method_set_pc(runtime, method_segmented_addr(runtime, method_POPL(runtime, ((method_get_segmented_mode(runtime)) ? (14) : (15)))));
                        }
                        break;
                    }
                case 3:
                    {
                        if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((members.m_fcw ?? 0)) >>> (7))) & (1))))) {
                            method_set_pc(runtime, method_segmented_addr(runtime, method_POPL(runtime, ((method_get_segmented_mode(runtime)) ? (14) : (15)))));
                        }
                        break;
                    }
                case 4:
                    {
                        if ((((((members.m_fcw ?? 0)) >>> (4))) & (1))) {
                            method_set_pc(runtime, method_segmented_addr(runtime, method_POPL(runtime, ((method_get_segmented_mode(runtime)) ? (14) : (15)))));
                        }
                        break;
                    }
                case 5:
                    {
                        if ((((((members.m_fcw ?? 0)) >>> (5))) & (1))) {
                            method_set_pc(runtime, method_segmented_addr(runtime, method_POPL(runtime, ((method_get_segmented_mode(runtime)) ? (14) : (15)))));
                        }
                        break;
                    }
                case 6:
                    {
                        if ((((((members.m_fcw ?? 0)) >>> (6))) & (1))) {
                            method_set_pc(runtime, method_segmented_addr(runtime, method_POPL(runtime, ((method_get_segmented_mode(runtime)) ? (14) : (15)))));
                        }
                        break;
                    }
                case 7:
                    {
                        if ((((((members.m_fcw ?? 0)) >>> (7))) & (1))) {
                            method_set_pc(runtime, method_segmented_addr(runtime, method_POPL(runtime, ((method_get_segmented_mode(runtime)) ? (14) : (15)))));
                        }
                        break;
                    }
                case 8:
                    {
                        if (1) {
                            method_set_pc(runtime, method_segmented_addr(runtime, method_POPL(runtime, ((method_get_segmented_mode(runtime)) ? (14) : (15)))));
                        }
                        break;
                    }
                case 9:
                    {
                        if ((((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))) ? 0 : 1)) {
                            method_set_pc(runtime, method_segmented_addr(runtime, method_POPL(runtime, ((method_get_segmented_mode(runtime)) ? (14) : (15)))));
                        }
                        break;
                    }
                case 10:
                    {
                        if ((((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))))) ? 0 : 1)) {
                            method_set_pc(runtime, method_segmented_addr(runtime, method_POPL(runtime, ((method_get_segmented_mode(runtime)) ? (14) : (15)))));
                        }
                        break;
                    }
                case 11:
                    {
                        if ((((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((members.m_fcw ?? 0)) >>> (7))) & (1))))) ? 0 : 1)) {
                            method_set_pc(runtime, method_segmented_addr(runtime, method_POPL(runtime, ((method_get_segmented_mode(runtime)) ? (14) : (15)))));
                        }
                        break;
                    }
                case 12:
                    {
                        if ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ? 0 : 1)) {
                            method_set_pc(runtime, method_segmented_addr(runtime, method_POPL(runtime, ((method_get_segmented_mode(runtime)) ? (14) : (15)))));
                        }
                        break;
                    }
                case 13:
                    {
                        if ((((((((members.m_fcw ?? 0)) >>> (5))) & (1))) ? 0 : 1)) {
                            method_set_pc(runtime, method_segmented_addr(runtime, method_POPL(runtime, ((method_get_segmented_mode(runtime)) ? (14) : (15)))));
                        }
                        break;
                    }
                case 14:
                    {
                        if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) ? 0 : 1)) {
                            method_set_pc(runtime, method_segmented_addr(runtime, method_POPL(runtime, ((method_get_segmented_mode(runtime)) ? (14) : (15)))));
                        }
                        break;
                    }
                case 15:
                    {
                        if ((((((((members.m_fcw ?? 0)) >>> (7))) & (1))) ? 0 : 1)) {
                            method_set_pc(runtime, method_segmented_addr(runtime, method_POPL(runtime, ((method_get_segmented_mode(runtime)) ? (14) : (15)))));
                        }
                        break;
                    }
            }
        }
        else {
            switch (cc) {
                case 0:
                    {
                        break;
                    }
                case 1:
                    {
                        if ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))) {
                            method_set_pc(runtime, method_POPW(runtime, ((method_get_segmented_mode(runtime)) ? (14) : (15))));
                        }
                        break;
                    }
                case 2:
                    {
                        if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))))) {
                            method_set_pc(runtime, method_POPW(runtime, ((method_get_segmented_mode(runtime)) ? (14) : (15))));
                        }
                        break;
                    }
                case 3:
                    {
                        if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((members.m_fcw ?? 0)) >>> (7))) & (1))))) {
                            method_set_pc(runtime, method_POPW(runtime, ((method_get_segmented_mode(runtime)) ? (14) : (15))));
                        }
                        break;
                    }
                case 4:
                    {
                        if ((((((members.m_fcw ?? 0)) >>> (4))) & (1))) {
                            method_set_pc(runtime, method_POPW(runtime, ((method_get_segmented_mode(runtime)) ? (14) : (15))));
                        }
                        break;
                    }
                case 5:
                    {
                        if ((((((members.m_fcw ?? 0)) >>> (5))) & (1))) {
                            method_set_pc(runtime, method_POPW(runtime, ((method_get_segmented_mode(runtime)) ? (14) : (15))));
                        }
                        break;
                    }
                case 6:
                    {
                        if ((((((members.m_fcw ?? 0)) >>> (6))) & (1))) {
                            method_set_pc(runtime, method_POPW(runtime, ((method_get_segmented_mode(runtime)) ? (14) : (15))));
                        }
                        break;
                    }
                case 7:
                    {
                        if ((((((members.m_fcw ?? 0)) >>> (7))) & (1))) {
                            method_set_pc(runtime, method_POPW(runtime, ((method_get_segmented_mode(runtime)) ? (14) : (15))));
                        }
                        break;
                    }
                case 8:
                    {
                        if (1) {
                            method_set_pc(runtime, method_POPW(runtime, ((method_get_segmented_mode(runtime)) ? (14) : (15))));
                        }
                        break;
                    }
                case 9:
                    {
                        if ((((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))) ? 0 : 1)) {
                            method_set_pc(runtime, method_POPW(runtime, ((method_get_segmented_mode(runtime)) ? (14) : (15))));
                        }
                        break;
                    }
                case 10:
                    {
                        if ((((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))))) ? 0 : 1)) {
                            method_set_pc(runtime, method_POPW(runtime, ((method_get_segmented_mode(runtime)) ? (14) : (15))));
                        }
                        break;
                    }
                case 11:
                    {
                        if ((((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((members.m_fcw ?? 0)) >>> (7))) & (1))))) ? 0 : 1)) {
                            method_set_pc(runtime, method_POPW(runtime, ((method_get_segmented_mode(runtime)) ? (14) : (15))));
                        }
                        break;
                    }
                case 12:
                    {
                        if ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ? 0 : 1)) {
                            method_set_pc(runtime, method_POPW(runtime, ((method_get_segmented_mode(runtime)) ? (14) : (15))));
                        }
                        break;
                    }
                case 13:
                    {
                        if ((((((((members.m_fcw ?? 0)) >>> (5))) & (1))) ? 0 : 1)) {
                            method_set_pc(runtime, method_POPW(runtime, ((method_get_segmented_mode(runtime)) ? (14) : (15))));
                        }
                        break;
                    }
                case 14:
                    {
                        if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) ? 0 : 1)) {
                            method_set_pc(runtime, method_POPW(runtime, ((method_get_segmented_mode(runtime)) ? (14) : (15))));
                        }
                        break;
                    }
                case 15:
                    {
                        if ((((((((members.m_fcw ?? 0)) >>> (7))) & (1))) ? 0 : 1)) {
                            method_set_pc(runtime, method_POPW(runtime, ((method_get_segmented_mode(runtime)) ? (14) : (15))));
                        }
                        break;
                    }
            }
        }
    }
    function method_Z9F_imm8(runtime) {
        const members = runtime.members;
        let imm8 = ((((method_get_operand(runtime, 0)) & 0xff)) & 0xff);
        0;
        if ((((members.m_fcw ?? 0)) & (8192))) {
        }
    }
    function method_ZA0_ssss_dddd(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((src) & (7))) << (1))) | (runtime.shiftRight(((src) & (8)), 3))))];
    }
    function method_ZA1_ssss_dddd(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)];
    }
    function method_ZA2_dddd_imm4(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let bit = ((((1) << (((method_get_operand(runtime, 0)) & (15))))) & 0xffff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = runtime.andAssign(h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))], (~bit));
    }
    function method_ZA3_dddd_imm4(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let bit = ((((1) << (((method_get_operand(runtime, 0)) & (15))))) & 0xffff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = runtime.andAssign(h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)], (~bit));
    }
    function method_ZA4_dddd_imm4(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let bit = ((((1) << (((method_get_operand(runtime, 0)) & (15))))) & 0xffff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = ((h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))]) | (bit));
    }
    function method_ZA5_dddd_imm4(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let bit = ((((1) << (((method_get_operand(runtime, 0)) & (15))))) & 0xffff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)]) | (bit));
    }
    function method_ZA6_dddd_imm4(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let bit = ((((1) << (((method_get_operand(runtime, 0)) & (15))))) & 0xffff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        if (((h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))]) & (bit))) {
            members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
    }
    function method_ZA7_dddd_imm4(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let bit = ((((1) << (((method_get_operand(runtime, 0)) & (15))))) & 0xffff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        if (((h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)]) & (bit))) {
            members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
    }
    function method_ZA8_dddd_imm4m1(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let i4p1 = ((__add_ZA8_dddd_imm4m1(runtime, ((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15)), 1)) & 0xff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = method_INCB(runtime, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))], i4p1);
    }
    function __add_ZA8_dddd_imm4m1(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_ZA9_dddd_imm4m1(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let i4p1 = ((__add_ZA9_dddd_imm4m1(runtime, ((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15)), 1)) & 0xff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = method_INCW(runtime, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)], i4p1);
    }
    function __add_ZA9_dddd_imm4m1(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_ZAA_dddd_imm4m1(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let i4p1 = ((__add_ZAA_dddd_imm4m1(runtime, ((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15)), 1)) & 0xff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = method_DECB(runtime, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))], i4p1);
    }
    function __add_ZAA_dddd_imm4m1(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_ZAB_dddd_imm4m1(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let i4p1 = ((__add_ZAB_dddd_imm4m1(runtime, ((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15)), 1)) & 0xff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = method_DECW(runtime, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)], i4p1);
    }
    function __add_ZAB_dddd_imm4m1(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_ZAC_ssss_dddd(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let tmp = ((h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((src) & (7))) << (1))) | (runtime.shiftRight(((src) & (8)), 3))))]) & 0xff);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((src) & (7))) << (1))) | (runtime.shiftRight(((src) & (8)), 3))))] = h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))];
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = tmp;
    }
    function method_ZAD_ssss_dddd(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let tmp = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]) & 0xffff);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)] = h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)];
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = tmp;
    }
    function method_ZAE_dddd_cccc(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let cc = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let tmp = ((((h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))]) & (-2))) & 0xff);
        switch (cc) {
            case 0:
                {
                    break;
                }
            case 1:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))) {
                        tmp = ((((tmp) | (1))) & 0xff);
                    }
                    break;
                }
            case 2:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))))) {
                        tmp = ((((tmp) | (1))) & 0xff);
                    }
                    break;
                }
            case 3:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((members.m_fcw ?? 0)) >>> (7))) & (1))))) {
                        tmp = ((((tmp) | (1))) & 0xff);
                    }
                    break;
                }
            case 4:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (4))) & (1))) {
                        tmp = ((((tmp) | (1))) & 0xff);
                    }
                    break;
                }
            case 5:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (5))) & (1))) {
                        tmp = ((((tmp) | (1))) & 0xff);
                    }
                    break;
                }
            case 6:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (6))) & (1))) {
                        tmp = ((((tmp) | (1))) & 0xff);
                    }
                    break;
                }
            case 7:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (7))) & (1))) {
                        tmp = ((((tmp) | (1))) & 0xff);
                    }
                    break;
                }
            case 8:
                {
                    if (1) {
                        tmp = ((((tmp) | (1))) & 0xff);
                    }
                    break;
                }
            case 9:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))) ? 0 : 1)) {
                        tmp = ((((tmp) | (1))) & 0xff);
                    }
                    break;
                }
            case 10:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))))) ? 0 : 1)) {
                        tmp = ((((tmp) | (1))) & 0xff);
                    }
                    break;
                }
            case 11:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((members.m_fcw ?? 0)) >>> (7))) & (1))))) ? 0 : 1)) {
                        tmp = ((((tmp) | (1))) & 0xff);
                    }
                    break;
                }
            case 12:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ? 0 : 1)) {
                        tmp = ((((tmp) | (1))) & 0xff);
                    }
                    break;
                }
            case 13:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (5))) & (1))) ? 0 : 1)) {
                        tmp = ((((tmp) | (1))) & 0xff);
                    }
                    break;
                }
            case 14:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) ? 0 : 1)) {
                        tmp = ((((tmp) | (1))) & 0xff);
                    }
                    break;
                }
            case 15:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (7))) & (1))) ? 0 : 1)) {
                        tmp = ((((tmp) | (1))) & 0xff);
                    }
                    break;
                }
        }
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = tmp;
    }
    function method_ZAF_dddd_cccc(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let cc = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let tmp = ((((h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)]) & (-2))) & 0xffff);
        switch (cc) {
            case 0:
                {
                    break;
                }
            case 1:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))) {
                        tmp = ((((tmp) | (1))) & 0xffff);
                    }
                    break;
                }
            case 2:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))))) {
                        tmp = ((((tmp) | (1))) & 0xffff);
                    }
                    break;
                }
            case 3:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((members.m_fcw ?? 0)) >>> (7))) & (1))))) {
                        tmp = ((((tmp) | (1))) & 0xffff);
                    }
                    break;
                }
            case 4:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (4))) & (1))) {
                        tmp = ((((tmp) | (1))) & 0xffff);
                    }
                    break;
                }
            case 5:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (5))) & (1))) {
                        tmp = ((((tmp) | (1))) & 0xffff);
                    }
                    break;
                }
            case 6:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (6))) & (1))) {
                        tmp = ((((tmp) | (1))) & 0xffff);
                    }
                    break;
                }
            case 7:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (7))) & (1))) {
                        tmp = ((((tmp) | (1))) & 0xffff);
                    }
                    break;
                }
            case 8:
                {
                    if (1) {
                        tmp = ((((tmp) | (1))) & 0xffff);
                    }
                    break;
                }
            case 9:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))) ? 0 : 1)) {
                        tmp = ((((tmp) | (1))) & 0xffff);
                    }
                    break;
                }
            case 10:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))))) ? 0 : 1)) {
                        tmp = ((((tmp) | (1))) & 0xffff);
                    }
                    break;
                }
            case 11:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((members.m_fcw ?? 0)) >>> (7))) & (1))))) ? 0 : 1)) {
                        tmp = ((((tmp) | (1))) & 0xffff);
                    }
                    break;
                }
            case 12:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ? 0 : 1)) {
                        tmp = ((((tmp) | (1))) & 0xffff);
                    }
                    break;
                }
            case 13:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (5))) & (1))) ? 0 : 1)) {
                        tmp = ((((tmp) | (1))) & 0xffff);
                    }
                    break;
                }
            case 14:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) ? 0 : 1)) {
                        tmp = ((((tmp) | (1))) & 0xffff);
                    }
                    break;
                }
            case 15:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (7))) & (1))) ? 0 : 1)) {
                        tmp = ((((tmp) | (1))) & 0xffff);
                    }
                    break;
                }
        }
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = tmp;
    }
    function method_ZB0_dddd_0000(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let result = ((0) & 0xff);
        let idx = ((h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))]) & 0xffff);
        if ((((members.m_fcw ?? 0)) & (128))) {
            idx = ((((idx) | (256))) & 0xffff);
        }
        if ((((members.m_fcw ?? 0)) & (4))) {
            idx = ((((idx) | (512))) & 0xffff);
        }
        if ((((members.m_fcw ?? 0)) & (8))) {
            idx = ((((idx) | (1024))) & 0xffff);
        }
        result = (((__mame_table_0[((idx) & 2047)] ?? 0)) & 0xff);
        members.m_fcw = ((((members.m_fcw) & (-225))) & 0xffff);
        if (((result) ? 0 : 1)) {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
        else {
            if ((((((result) << 24 >> 24)) < (0)) ? 1 : 0)) {
                members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
            }
        }
        if ((((__mame_table_0[((idx) & 2047)] ?? 0)) & (256))) {
            members.m_fcw = ((((members.m_fcw) | (128))) & 0xffff);
        }
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = result;
    }
    function method_ZB1_dddd_0000(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = ((((h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)]) << 24 >> 24)) << 16 >> 16);
    }
    function method_ZB1_dddd_0111(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.Q[((dst) >>> (2))] = ((h_m_regs.Q[((dst) >>> (2))]) | 0);
    }
    function method_ZB1_dddd_1010(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))] = ((((h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))]) << 16 >> 16)) | 0);
    }
    function method_ZB2_dddd_0001_imm8(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let imm8 = ((((method_get_operand(runtime, 1)) & 0xff)) & 0xff);
        if (((imm8) & (128))) {
            h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = method_SRLB(runtime, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))], (-((imm8) << 24 >> 24)));
        }
        else {
            h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = method_SLLB(runtime, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))], imm8);
        }
    }
    function method_SRLB(runtime, dest, count) {
        const members = runtime.members;
        dest = ((dest) & 0xff);
        count = ((count) & 0xff);
        let c = ((((count) ? (((((dest) >>> (((count) - (1))))) & (1))) : (0))) & 0xff);
        let result = ((((dest) >>> (count))) & 0xff);
        members.m_fcw = ((((members.m_fcw) & (-225))) & 0xffff);
        if (((result) ? 0 : 1)) {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
        else {
            if ((((((result) << 24 >> 24)) < (0)) ? 1 : 0)) {
                members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
            }
        }
        if (c) {
            members.m_fcw = ((((members.m_fcw) | (128))) & 0xffff);
        }
        return ((result) & 0xff);
    }
    function method_SLLB(runtime, dest, count) {
        const members = runtime.members;
        dest = ((dest) & 0xff);
        count = ((count) & 0xff);
        let c = ((((count) ? (((((dest) << (((count) - (1))))) & (128))) : (0))) & 0xff);
        let result = ((((dest) << (count))) & 0xff);
        members.m_fcw = ((((members.m_fcw) & (-225))) & 0xffff);
        if (((result) ? 0 : 1)) {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
        else {
            if ((((((result) << 24 >> 24)) < (0)) ? 1 : 0)) {
                members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
            }
        }
        if (c) {
            members.m_fcw = ((((members.m_fcw) | (128))) & 0xffff);
        }
        return ((result) & 0xff);
    }
    function method_ZB2_dddd_0011_0000_ssss_0000_0000(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) & 0xff);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = method_SRLB(runtime, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))], ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]) << 24 >> 24));
    }
    function method_ZB2_dddd_00I0(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let imm1 = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (2))) & 0xff);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = method_RLB(runtime, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))], imm1);
    }
    function method_RLB(runtime, dest, twice) {
        const members = runtime.members;
        dest = ((dest) & 0xff);
        twice = ((twice) & 0xff);
        let result = ((((((dest) << (1))) | (((dest) >>> (7))))) & 0xff);
        members.m_fcw = ((((members.m_fcw) & (-241))) & 0xffff);
        if (twice) {
            result = ((((((result) << (1))) | (((result) >>> (7))))) & 0xff);
        }
        if (((result) ? 0 : 1)) {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
        else {
            if ((((((result) << 24 >> 24)) < (0)) ? 1 : 0)) {
                members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
            }
        }
        if (((result) & (1))) {
            members.m_fcw = ((((members.m_fcw) | (128))) & 0xffff);
        }
        if (((((result) ^ (dest))) & (128))) {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
        return ((result) & 0xff);
    }
    function method_ZB2_dddd_01I0(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let imm1 = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (2))) & 0xff);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = method_RRB(runtime, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))], imm1);
    }
    function method_RRB(runtime, dest, twice) {
        const members = runtime.members;
        dest = ((dest) & 0xff);
        twice = ((twice) & 0xff);
        let result = ((((((dest) >>> (1))) | (((dest) << (7))))) & 0xff);
        members.m_fcw = ((((members.m_fcw) & (-241))) & 0xffff);
        if (twice) {
            result = ((((((result) >>> (1))) | (((result) << (7))))) & 0xff);
        }
        if (((result) ? 0 : 1)) {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
        else {
            if (((result) & (128))) {
                members.m_fcw = ((((members.m_fcw) | (160))) & 0xffff);
            }
        }
        if (((((result) ^ (dest))) & (128))) {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
        return ((result) & 0xff);
    }
    function method_ZB2_dddd_1001_imm8(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let imm8 = ((((method_get_operand(runtime, 1)) & 0xff)) & 0xff);
        if (((imm8) & (128))) {
            h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = method_SRAB(runtime, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))], (-((imm8) << 24 >> 24)));
        }
        else {
            h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = method_SLAB(runtime, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))], imm8);
        }
    }
    function method_SRAB(runtime, dest, count) {
        const members = runtime.members;
        dest = ((dest) & 0xff);
        count = ((count) & 0xff);
        let c = ((((count) ? (((runtime.shiftRight(((dest) << 24 >> 24), ((count) - (1)))) & (1))) : (0))) & 0xff);
        let result = ((((runtime.shiftRight(((dest) << 24 >> 24), count)) & 0xff)) & 0xff);
        members.m_fcw = ((((members.m_fcw) & (-241))) & 0xffff);
        if (((result) ? 0 : 1)) {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
        else {
            if ((((((result) << 24 >> 24)) < (0)) ? 1 : 0)) {
                members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
            }
        }
        if (c) {
            members.m_fcw = ((((members.m_fcw) | (128))) & 0xffff);
        }
        return ((result) & 0xff);
    }
    function method_SLAB(runtime, dest, count) {
        const members = runtime.members;
        dest = ((dest) & 0xff);
        count = ((count) & 0xff);
        let c = ((((count) ? (((((dest) << (((count) - (1))))) & (128))) : (0))) & 0xff);
        let result = ((((((((dest) << 24 >> 24)) << (count))) & 0xff)) & 0xff);
        members.m_fcw = ((((members.m_fcw) & (-241))) & 0xffff);
        if (((result) ? 0 : 1)) {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
        else {
            if ((((((result) << 24 >> 24)) < (0)) ? 1 : 0)) {
                members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
            }
        }
        if (c) {
            members.m_fcw = ((((members.m_fcw) | (128))) & 0xffff);
        }
        if (((((result) ^ (dest))) & (128))) {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
        return ((result) & 0xff);
    }
    function method_ZB2_dddd_1011_0000_ssss_0000_0000(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) & 0xff);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = method_SDAB(runtime, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))], ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]) << 24 >> 24));
    }
    function method_SDAB(runtime, dest, count) {
        const members = runtime.members;
        dest = ((dest) & 0xff);
        count = ((count) << 24 >> 24);
        let result = ((((dest) << 24 >> 24)) << 24 >> 24);
        let c = ((0) & 0xff);
        members.m_fcw = ((((members.m_fcw) & (-241))) & 0xffff);
        while ((((count) > (0)) ? 1 : 0)) {
            c = ((((result) & (128))) & 0xff);
            result = ((((result) << (1))) << 24 >> 24);
            count = ((((count) - (1))) << 24 >> 24);
        }
        while ((((count) < (0)) ? 1 : 0)) {
            c = ((((result) & (1))) & 0xff);
            result = ((((result) >> (1))) << 24 >> 24);
            count = ((((count) + (1))) << 24 >> 24);
        }
        if (((result) ? 0 : 1)) {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
        else {
            if ((((((result) << 24 >> 24)) < (0)) ? 1 : 0)) {
                members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
            }
        }
        if (c) {
            members.m_fcw = ((((members.m_fcw) | (128))) & 0xffff);
        }
        if (((((result) ^ (dest))) & (128))) {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
        return ((((result) & 0xff)) & 0xff);
    }
    function method_ZB2_dddd_10I0(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let imm1 = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (2))) & 0xff);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = method_RLCB(runtime, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))], imm1);
    }
    function method_RLCB(runtime, dest, twice) {
        const members = runtime.members;
        dest = ((dest) & 0xff);
        twice = ((twice) & 0xff);
        let c = ((((dest) & (128))) & 0xff);
        let result = ((((((dest) << (1))) | ((((((members.m_fcw ?? 0)) >>> (7))) & (1))))) & 0xff);
        members.m_fcw = ((((members.m_fcw) & (-241))) & 0xffff);
        if (twice) {
            let c1 = ((((c) >>> (7))) & 0xff);
            c = ((((result) & (128))) & 0xff);
            result = ((((((result) << (1))) | (c1))) & 0xff);
        }
        if (((result) ? 0 : 1)) {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
        else {
            if ((((((result) << 24 >> 24)) < (0)) ? 1 : 0)) {
                members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
            }
        }
        if (c) {
            members.m_fcw = ((((members.m_fcw) | (128))) & 0xffff);
        }
        if (((((result) ^ (dest))) & (128))) {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
        return ((result) & 0xff);
    }
    function method_ZB2_dddd_11I0(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let imm1 = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (2))) & 0xff);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = method_RRCB(runtime, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))], imm1);
    }
    function method_RRCB(runtime, dest, twice) {
        const members = runtime.members;
        dest = ((dest) & 0xff);
        twice = ((twice) & 0xff);
        let c = ((((dest) & (1))) & 0xff);
        let result = ((((((dest) >>> (1))) | ((((((((members.m_fcw ?? 0)) >>> (7))) & (1))) << (7))))) & 0xff);
        members.m_fcw = ((((members.m_fcw) & (-241))) & 0xffff);
        if (twice) {
            let c1 = ((((c) << (7))) & 0xff);
            c = ((((result) & (1))) & 0xff);
            result = ((((((result) >>> (1))) | (c1))) & 0xff);
        }
        if (((result) ? 0 : 1)) {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
        else {
            if ((((((result) << 24 >> 24)) < (0)) ? 1 : 0)) {
                members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
            }
        }
        if (c) {
            members.m_fcw = ((((members.m_fcw) | (128))) & 0xffff);
        }
        if (((((result) ^ (dest))) & (128))) {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
        return ((result) & 0xff);
    }
    function method_ZB3_dddd_0001_imm8(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let imm16 = ((method_get_operand(runtime, 1)) & 0xffff);
        if (((imm16) & (32768))) {
            h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = method_SRLW(runtime, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)], (-((imm16) << 16 >> 16)));
        }
        else {
            h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = method_SLLW(runtime, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)], imm16);
        }
    }
    function method_SRLW(runtime, dest, count) {
        const members = runtime.members;
        dest = ((dest) & 0xffff);
        count = ((count) & 0xff);
        let c = ((((count) ? (((((dest) >>> (((count) - (1))))) & (1))) : (0))) & 0xff);
        let result = ((((dest) >>> (count))) & 0xffff);
        members.m_fcw = ((((members.m_fcw) & (-225))) & 0xffff);
        if (((result) ? 0 : 1)) {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
        else {
            if ((((((result) << 16 >> 16)) < (0)) ? 1 : 0)) {
                members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
            }
        }
        if (c) {
            members.m_fcw = ((((members.m_fcw) | (128))) & 0xffff);
        }
        return ((result) & 0xffff);
    }
    function method_SLLW(runtime, dest, count) {
        const members = runtime.members;
        dest = ((dest) & 0xffff);
        count = ((count) & 0xff);
        let c = ((((count) ? (((((dest) << (((count) - (1))))) & (32768))) : (0))) & 0xffff);
        let result = ((((dest) << (count))) & 0xffff);
        members.m_fcw = ((((members.m_fcw) & (-225))) & 0xffff);
        if (((result) ? 0 : 1)) {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
        else {
            if ((((((result) << 16 >> 16)) < (0)) ? 1 : 0)) {
                members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
            }
        }
        if (c) {
            members.m_fcw = ((((members.m_fcw) | (128))) & 0xffff);
        }
        return ((result) & 0xffff);
    }
    function method_ZB3_dddd_0011_0000_ssss_0000_0000(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) & 0xff);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = method_SDLW(runtime, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)], ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]) << 24 >> 24));
    }
    function method_SDLW(runtime, dest, count) {
        const members = runtime.members;
        dest = ((dest) & 0xffff);
        count = ((count) << 24 >> 24);
        let result = ((dest) & 0xffff);
        let c = ((0) & 0xffff);
        members.m_fcw = ((((members.m_fcw) & (-241))) & 0xffff);
        while ((((count) > (0)) ? 1 : 0)) {
            c = ((((result) & (32768))) & 0xffff);
            result = ((((result) << (1))) & 0xffff);
            count = ((((count) - (1))) << 24 >> 24);
        }
        while ((((count) < (0)) ? 1 : 0)) {
            c = ((((result) & (1))) & 0xffff);
            result = ((((result) >>> (1))) & 0xffff);
            count = ((((count) + (1))) << 24 >> 24);
        }
        if (((result) ? 0 : 1)) {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
        else {
            if ((((((result) << 16 >> 16)) < (0)) ? 1 : 0)) {
                members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
            }
        }
        if (c) {
            members.m_fcw = ((((members.m_fcw) | (128))) & 0xffff);
        }
        if (((((result) ^ (dest))) & (32768))) {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
        return ((result) & 0xffff);
    }
    function method_ZB3_dddd_00I0(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let imm1 = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (2))) & 0xff);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = method_RLW(runtime, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)], imm1);
    }
    function method_RLW(runtime, dest, twice) {
        const members = runtime.members;
        dest = ((dest) & 0xffff);
        twice = ((twice) & 0xff);
        let result = ((((((dest) << (1))) | (((dest) >>> (15))))) & 0xffff);
        members.m_fcw = ((((members.m_fcw) & (-241))) & 0xffff);
        if (twice) {
            result = ((((((result) << (1))) | (((result) >>> (15))))) & 0xffff);
        }
        if (((result) ? 0 : 1)) {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
        else {
            if ((((((result) << 16 >> 16)) < (0)) ? 1 : 0)) {
                members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
            }
        }
        if (((result) & (1))) {
            members.m_fcw = ((((members.m_fcw) | (128))) & 0xffff);
        }
        if (((((result) ^ (dest))) & (32768))) {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
        return ((result) & 0xffff);
    }
    function method_ZB3_dddd_0101_imm8(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let imm16 = ((method_get_operand(runtime, 1)) & 0xffff);
        if (((imm16) & (32768))) {
            h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))] = method_SRLL(runtime, h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))], (-((imm16) << 16 >> 16)));
        }
        else {
            h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))] = method_SLLL(runtime, h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))], imm16);
        }
    }
    function method_SRLL(runtime, dest, count) {
        const members = runtime.members;
        count = ((count) & 0xff);
        let c = ((((count) ? (((((dest) >>> (((count) - (1))))) & (1))) : (0))) & 0xff);
        let result = ((((dest) >>> (count))) >>> 0);
        members.m_fcw = ((((members.m_fcw) & (-225))) & 0xffff);
        if (((result) ? 0 : 1)) {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
        else {
            if ((((((result) | 0)) < (0)) ? 1 : 0)) {
                members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
            }
        }
        if (c) {
            members.m_fcw = ((((members.m_fcw) | (128))) & 0xffff);
        }
        return ((result) >>> 0);
    }
    function method_SLLL(runtime, dest, count) {
        const members = runtime.members;
        count = ((count) & 0xff);
        let c = ((((count) ? (((((dest) << (((count) - (1))))) & (2147483648))) : (0))) >>> 0);
        let result = ((((dest) << (count))) >>> 0);
        members.m_fcw = ((((members.m_fcw) & (-225))) & 0xffff);
        if (((result) ? 0 : 1)) {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
        else {
            if ((((((result) | 0)) < (0)) ? 1 : 0)) {
                members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
            }
        }
        if (c) {
            members.m_fcw = ((((members.m_fcw) | (128))) & 0xffff);
        }
        return ((result) >>> 0);
    }
    function method_ZB3_dddd_0111_0000_ssss_0000_0000(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) & 0xff);
        h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))] = method_SDLL(runtime, h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))], ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]) & (255)));
    }
    function method_SDLL(runtime, dest, count) {
        const members = runtime.members;
        count = ((count) << 24 >> 24);
        let result = ((dest) >>> 0);
        let c = ((0) >>> 0);
        members.m_fcw = ((((members.m_fcw) & (-241))) & 0xffff);
        while ((((count) > (0)) ? 1 : 0)) {
            c = ((((result) & (2147483648))) >>> 0);
            result = ((((result) << (1))) >>> 0);
            count = ((((count) - (1))) << 24 >> 24);
        }
        while ((((count) < (0)) ? 1 : 0)) {
            c = ((((result) & (1))) >>> 0);
            result = ((((result) >>> (1))) >>> 0);
            count = ((((count) + (1))) << 24 >> 24);
        }
        if (((result) ? 0 : 1)) {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
        else {
            if ((((((result) | 0)) < (0)) ? 1 : 0)) {
                members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
            }
        }
        if (c) {
            members.m_fcw = ((((members.m_fcw) | (128))) & 0xffff);
        }
        if (((((result) ^ (dest))) & (2147483648))) {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
        return ((result) >>> 0);
    }
    function method_ZB3_dddd_01I0(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let imm1 = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (2))) & 0xff);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = method_RRW(runtime, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)], imm1);
    }
    function method_RRW(runtime, dest, twice) {
        const members = runtime.members;
        dest = ((dest) & 0xffff);
        twice = ((twice) & 0xff);
        let result = ((((((dest) >>> (1))) | (((dest) << (15))))) & 0xffff);
        members.m_fcw = ((((members.m_fcw) & (-241))) & 0xffff);
        if (twice) {
            result = ((((((result) >>> (1))) | (((result) << (15))))) & 0xffff);
        }
        if (((result) ? 0 : 1)) {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
        else {
            if (((result) & (32768))) {
                members.m_fcw = ((((members.m_fcw) | (160))) & 0xffff);
            }
        }
        if (((((result) ^ (dest))) & (32768))) {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
        return ((result) & 0xffff);
    }
    function method_ZB3_dddd_1001_imm8(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let imm16 = ((method_get_operand(runtime, 1)) & 0xffff);
        if (((imm16) & (32768))) {
            h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = method_SRAW(runtime, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)], (-((imm16) << 16 >> 16)));
        }
        else {
            h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = method_SLAW(runtime, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)], imm16);
        }
    }
    function method_SRAW(runtime, dest, count) {
        const members = runtime.members;
        dest = ((dest) & 0xffff);
        count = ((count) & 0xff);
        let c = ((((count) ? (((runtime.shiftRight(((dest) << 16 >> 16), ((count) - (1)))) & (1))) : (0))) & 0xff);
        let result = ((((runtime.shiftRight(((dest) << 16 >> 16), count)) & 0xffff)) & 0xffff);
        members.m_fcw = ((((members.m_fcw) & (-241))) & 0xffff);
        if (((result) ? 0 : 1)) {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
        else {
            if ((((((result) << 16 >> 16)) < (0)) ? 1 : 0)) {
                members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
            }
        }
        if (c) {
            members.m_fcw = ((((members.m_fcw) | (128))) & 0xffff);
        }
        return ((result) & 0xffff);
    }
    function method_SLAW(runtime, dest, count) {
        const members = runtime.members;
        dest = ((dest) & 0xffff);
        count = ((count) & 0xff);
        let c = ((((count) ? (((((dest) << (((count) - (1))))) & (32768))) : (0))) & 0xffff);
        let result = ((((((((dest) << 16 >> 16)) << (count))) & 0xffff)) & 0xffff);
        members.m_fcw = ((((members.m_fcw) & (-241))) & 0xffff);
        if (((result) ? 0 : 1)) {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
        else {
            if ((((((result) << 16 >> 16)) < (0)) ? 1 : 0)) {
                members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
            }
        }
        if (c) {
            members.m_fcw = ((((members.m_fcw) | (128))) & 0xffff);
        }
        if (((((result) ^ (dest))) & (32768))) {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
        return ((result) & 0xffff);
    }
    function method_ZB3_dddd_1011_0000_ssss_0000_0000(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) & 0xff);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = method_SDAW(runtime, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)], ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]) << 24 >> 24));
    }
    function method_SDAW(runtime, dest, count) {
        const members = runtime.members;
        dest = ((dest) & 0xffff);
        count = ((count) << 24 >> 24);
        let result = ((((dest) << 16 >> 16)) << 16 >> 16);
        let c = ((0) & 0xffff);
        members.m_fcw = ((((members.m_fcw) & (-241))) & 0xffff);
        while ((((count) > (0)) ? 1 : 0)) {
            c = ((((result) & (32768))) & 0xffff);
            result = ((((result) << (1))) << 16 >> 16);
            count = ((((count) - (1))) << 24 >> 24);
        }
        while ((((count) < (0)) ? 1 : 0)) {
            c = ((((result) & (1))) & 0xffff);
            result = ((((result) >> (1))) << 16 >> 16);
            count = ((((count) + (1))) << 24 >> 24);
        }
        if (((result) ? 0 : 1)) {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
        else {
            if ((((((result) << 16 >> 16)) < (0)) ? 1 : 0)) {
                members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
            }
        }
        if (c) {
            members.m_fcw = ((((members.m_fcw) | (128))) & 0xffff);
        }
        if (((((result) ^ (dest))) & (32768))) {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
        return ((((result) & 0xffff)) & 0xffff);
    }
    function method_ZB3_dddd_10I0(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let imm1 = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (2))) & 0xff);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = method_RLCW(runtime, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)], imm1);
    }
    function method_RLCW(runtime, dest, twice) {
        const members = runtime.members;
        dest = ((dest) & 0xffff);
        twice = ((twice) & 0xff);
        let c = ((((dest) & (32768))) & 0xffff);
        let result = ((((((dest) << (1))) | ((((((members.m_fcw ?? 0)) >>> (7))) & (1))))) & 0xffff);
        members.m_fcw = ((((members.m_fcw) & (-241))) & 0xffff);
        if (twice) {
            let c1 = ((((c) >>> (15))) & 0xffff);
            c = ((((result) & (32768))) & 0xffff);
            result = ((((((result) << (1))) | (c1))) & 0xffff);
        }
        if (((result) ? 0 : 1)) {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
        else {
            if ((((((result) << 16 >> 16)) < (0)) ? 1 : 0)) {
                members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
            }
        }
        if (c) {
            members.m_fcw = ((((members.m_fcw) | (128))) & 0xffff);
        }
        if (((((result) ^ (dest))) & (32768))) {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
        return ((result) & 0xffff);
    }
    function method_ZB3_dddd_1101_imm8(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let imm16 = ((method_get_operand(runtime, 1)) & 0xffff);
        if (((imm16) & (32768))) {
            h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))] = method_SRAL(runtime, h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))], (-((imm16) << 16 >> 16)));
        }
        else {
            h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))] = method_SLAL(runtime, h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))], imm16);
        }
    }
    function method_SRAL(runtime, dest, count) {
        const members = runtime.members;
        count = ((count) & 0xff);
        let c = ((((count) ? (((runtime.shiftRight(((dest) | 0), ((count) - (1)))) & (1))) : (0))) & 0xff);
        let result = ((((runtime.shiftRight(((dest) | 0), count)) >>> 0)) >>> 0);
        members.m_fcw = ((((members.m_fcw) & (-241))) & 0xffff);
        if (((result) ? 0 : 1)) {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
        else {
            if ((((((result) | 0)) < (0)) ? 1 : 0)) {
                members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
            }
        }
        if (c) {
            members.m_fcw = ((((members.m_fcw) | (128))) & 0xffff);
        }
        return ((result) >>> 0);
    }
    function method_SLAL(runtime, dest, count) {
        const members = runtime.members;
        count = ((count) & 0xff);
        let c = ((((count) ? (((((dest) << (((count) - (1))))) & (2147483648))) : (0))) >>> 0);
        let result = ((((((((dest) | 0)) << (count))) >>> 0)) >>> 0);
        members.m_fcw = ((((members.m_fcw) & (-241))) & 0xffff);
        if (((result) ? 0 : 1)) {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
        else {
            if ((((((result) | 0)) < (0)) ? 1 : 0)) {
                members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
            }
        }
        if (c) {
            members.m_fcw = ((((members.m_fcw) | (128))) & 0xffff);
        }
        if (((((result) ^ (dest))) & (2147483648))) {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
        return ((result) >>> 0);
    }
    function method_ZB3_dddd_1111_0000_ssss_0000_0000(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) & 0xff);
        h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))] = method_SDAL(runtime, h_m_regs.L[method_BYTE_XOR_BE(runtime, ((dst) >>> (1)))], ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]) & (255)));
    }
    function method_SDAL(runtime, dest, count) {
        const members = runtime.members;
        count = ((count) << 24 >> 24);
        let result = ((((dest) | 0)) | 0);
        let c = ((0) >>> 0);
        members.m_fcw = ((((members.m_fcw) & (-241))) & 0xffff);
        while ((((count) > (0)) ? 1 : 0)) {
            c = ((((result) & (2147483648))) >>> 0);
            result = ((((result) << (1))) | 0);
            count = ((((count) - (1))) << 24 >> 24);
        }
        while ((((count) < (0)) ? 1 : 0)) {
            c = ((((result) & (1))) >>> 0);
            result = ((((result) >> (1))) | 0);
            count = ((((count) + (1))) << 24 >> 24);
        }
        if (((result) ? 0 : 1)) {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
        else {
            if ((((((result) | 0)) < (0)) ? 1 : 0)) {
                members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
            }
        }
        if (c) {
            members.m_fcw = ((((members.m_fcw) | (128))) & 0xffff);
        }
        if (((((result) ^ (dest))) & (2147483648))) {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
        return ((((result) >>> 0)) >>> 0);
    }
    function method_ZB3_dddd_11I0(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let imm1 = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (2))) & 0xff);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = method_RRCW(runtime, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)], imm1);
    }
    function method_RRCW(runtime, dest, twice) {
        const members = runtime.members;
        dest = ((dest) & 0xffff);
        twice = ((twice) & 0xff);
        let c = ((((dest) & (1))) & 0xffff);
        let result = ((((((dest) >>> (1))) | ((((((((members.m_fcw ?? 0)) >>> (7))) & (1))) << (15))))) & 0xffff);
        members.m_fcw = ((((members.m_fcw) & (-241))) & 0xffff);
        if (twice) {
            let c1 = ((((c) << (15))) & 0xffff);
            c = ((((result) & (1))) & 0xffff);
            result = ((((((result) >>> (1))) | (c1))) & 0xffff);
        }
        if (((result) ? 0 : 1)) {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
        else {
            if ((((((result) << 16 >> 16)) < (0)) ? 1 : 0)) {
                members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
            }
        }
        if (c) {
            members.m_fcw = ((((members.m_fcw) | (128))) & 0xffff);
        }
        if (((((result) ^ (dest))) & (32768))) {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
        return ((result) & 0xffff);
    }
    function method_ZB4_ssss_dddd(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = method_ADCB(runtime, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))], h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((src) & (7))) << (1))) | (runtime.shiftRight(((src) & (8)), 3))))]);
    }
    function method_ADCB(runtime, dest, value) {
        const members = runtime.members;
        dest = ((dest) & 0xff);
        value = ((value) & 0xff);
        let result = ((__add_ADCB(runtime, ((dest) + (value)), (((((members.m_fcw ?? 0)) >>> (7))) & (1)))) & 0xff);
        members.m_fcw = ((((members.m_fcw) & (-245))) & 0xffff);
        members.m_fcw = ((((members.m_fcw) & (-9))) & 0xffff);
        if (((result) ? 0 : 1)) {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
        else {
            if ((((((result) << 24 >> 24)) < (0)) ? 1 : 0)) {
                members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
            }
        }
        if (((((((result) < (dest)) ? 1 : 0)) || (((((((result) === (dest)) ? 1 : 0)) && (value)) ? 1 : 0))) ? 1 : 0)) {
            members.m_fcw = ((((members.m_fcw) | (128))) & 0xffff);
        }
        if (((((((((value) & (dest))) & ((~result)))) | ((((((~value)) & ((~dest)))) & (result))))) & (128))) {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
        if ((((((Number(((result) & (15))) < Number(((dest) & (15)))) ? 1 : 0)) || ((((((Number(((result) & (15))) === Number(((dest) & (15)))) ? 1 : 0)) && (((value) & (15)))) ? 1 : 0))) ? 1 : 0)) {
            members.m_fcw = ((((members.m_fcw) | (4))) & 0xffff);
        }
        return ((result) & 0xff);
    }
    function __add_ADCB(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_ZB5_ssss_dddd(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = method_ADCW(runtime, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)], h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]);
    }
    function method_ADCW(runtime, dest, value) {
        const members = runtime.members;
        dest = ((dest) & 0xffff);
        value = ((value) & 0xffff);
        let result = ((__add_ADCW(runtime, ((dest) + (value)), (((((members.m_fcw ?? 0)) >>> (7))) & (1)))) & 0xffff);
        members.m_fcw = ((((members.m_fcw) & (-241))) & 0xffff);
        if (((result) ? 0 : 1)) {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
        else {
            if ((((((result) << 16 >> 16)) < (0)) ? 1 : 0)) {
                members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
            }
        }
        if (((((((result) < (dest)) ? 1 : 0)) || (((((((result) === (dest)) ? 1 : 0)) && (value)) ? 1 : 0))) ? 1 : 0)) {
            members.m_fcw = ((((members.m_fcw) | (128))) & 0xffff);
        }
        if (((((((((value) & (dest))) & ((~result)))) | ((((((~value)) & ((~dest)))) & (result))))) & (32768))) {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
        return ((result) & 0xffff);
    }
    function __add_ADCW(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_ZB6_ssss_dddd(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = method_SBCB(runtime, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))], h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((src) & (7))) << (1))) | (runtime.shiftRight(((src) & (8)), 3))))]);
    }
    function method_SBCB(runtime, dest, value) {
        const members = runtime.members;
        dest = ((dest) & 0xff);
        value = ((value) & 0xff);
        let result = ((((((dest) - (value))) - ((((((members.m_fcw ?? 0)) >>> (7))) & (1))))) & 0xff);
        members.m_fcw = ((((members.m_fcw) & (-245))) & 0xffff);
        members.m_fcw = ((((members.m_fcw) | (8))) & 0xffff);
        if (((result) ? 0 : 1)) {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
        else {
            if ((((((result) << 24 >> 24)) < (0)) ? 1 : 0)) {
                members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
            }
        }
        if (((((((result) > (dest)) ? 1 : 0)) || (((((((result) === (dest)) ? 1 : 0)) && (value)) ? 1 : 0))) ? 1 : 0)) {
            members.m_fcw = ((((members.m_fcw) | (128))) & 0xffff);
        }
        if ((((((((((~value)) & (dest))) & ((~result)))) | (((((value) & ((~dest)))) & (result))))) & (128))) {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
        if ((((((Number(((result) & (15))) > Number(((dest) & (15)))) ? 1 : 0)) || ((((((Number(((result) & (15))) === Number(((dest) & (15)))) ? 1 : 0)) && (((value) & (15)))) ? 1 : 0))) ? 1 : 0)) {
            members.m_fcw = ((((members.m_fcw) | (4))) & 0xffff);
        }
        return ((result) & 0xff);
    }
    function method_ZB7_ssss_dddd(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = method_SBCW(runtime, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)], h_m_regs.W[method_BYTE4_XOR_BE(runtime, src)]);
    }
    function method_SBCW(runtime, dest, value) {
        const members = runtime.members;
        dest = ((dest) & 0xffff);
        value = ((value) & 0xffff);
        let result = ((((((dest) - (value))) - ((((((members.m_fcw ?? 0)) >>> (7))) & (1))))) & 0xffff);
        members.m_fcw = ((((members.m_fcw) & (-241))) & 0xffff);
        if (((result) ? 0 : 1)) {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
        else {
            if ((((((result) << 16 >> 16)) < (0)) ? 1 : 0)) {
                members.m_fcw = ((((members.m_fcw) | (32))) & 0xffff);
            }
        }
        if (((((((result) > (dest)) ? 1 : 0)) || (((((((result) === (dest)) ? 1 : 0)) && (value)) ? 1 : 0))) ? 1 : 0)) {
            members.m_fcw = ((((members.m_fcw) | (128))) & 0xffff);
        }
        if ((((((((((~value)) & (dest))) & ((~result)))) | (((((value) & ((~dest)))) & (result))))) & (32768))) {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
        return ((result) & 0xffff);
    }
    function method_ZB8_ddN0_0010_0000_rrrr_ssN0_0000(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 1), 4)) & (15))) & 0xff);
        let cnt = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) << 24 >> 24);
        let xlt = ((method_RDBX_B(runtime, src, method_RDIR_B(runtime, dst))) & 0xff);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, 2)] = xlt;
        if (xlt) {
            members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
        method_add_to_addr_reg(runtime, dst, 1);
        if ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)]) - (1)))) {
            members.m_fcw = ((((members.m_fcw) & (-17))) & 0xffff);
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
    }
    function method_ZB8_ddN0_0110_0000_rrrr_ssN0_1110(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 1), 4)) & (15))) & 0xff);
        let cnt = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) << 24 >> 24);
        let xlt = ((method_RDBX_B(runtime, src, method_RDIR_B(runtime, dst))) & 0xff);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, 2)] = xlt;
        if (xlt) {
            members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
        method_add_to_addr_reg(runtime, dst, 1);
        if ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)]) - (1)))) {
            members.m_fcw = ((((members.m_fcw) & (-17))) & 0xffff);
            if (((xlt) ? 0 : 1)) {
                members.m_pc = ((((members.m_pc) - (4))) >>> 0);
            }
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
    }
    function method_ZB8_ddN0_1010_0000_rrrr_ssN0_0000(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 1), 4)) & (15))) & 0xff);
        let cnt = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) << 24 >> 24);
        let xlt = ((method_RDBX_B(runtime, src, method_RDIR_B(runtime, dst))) & 0xff);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, 2)] = xlt;
        if (xlt) {
            members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
        method_sub_from_addr_reg(runtime, dst, 1);
        if ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)]) - (1)))) {
            members.m_fcw = ((((members.m_fcw) & (-17))) & 0xffff);
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
    }
    function method_sub_from_addr_reg(runtime, regno, subtrahend) {
        const members = runtime.members;
        subtrahend = ((subtrahend) & 0xffff);
        const h_m_regs = members.m_regs ?? 0;
        if (method_get_segmented_mode(runtime)) {
            regno = ((((regno) | (1))) | 0);
        }
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, regno)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, regno)]) - (subtrahend));
    }
    function method_ZB8_ddN0_1110_0000_rrrr_ssN0_1110(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 1), 4)) & (15))) & 0xff);
        let cnt = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) << 24 >> 24);
        let xlt = ((method_RDBX_B(runtime, src, method_RDIR_B(runtime, dst))) & 0xff);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, 2)] = xlt;
        if (xlt) {
            members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
        method_sub_from_addr_reg(runtime, dst, 1);
        if ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)]) - (1)))) {
            members.m_fcw = ((((members.m_fcw) & (-17))) & 0xffff);
            if (((xlt) ? 0 : 1)) {
                members.m_pc = ((((members.m_pc) - (4))) >>> 0);
            }
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
    }
    function method_ZB8_ddN0_0000_0000_rrrr_ssN0_0000(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 1), 4)) & (15))) & 0xff);
        let cnt = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) << 24 >> 24);
        let dstspace = ((((Number(dst) === Number(((method_get_segmented_mode(runtime)) ? (14) : (15)))) ? 1 : 0)) ? ((members.m_stack ?? 0)) : ((members.m_data ?? 0)));
        let dstaddr = ((method_addr_from_reg(runtime, dst)) >>> 0);
        let xlt = ((method_RDBX_B(runtime, src, method_RDMEM_B(runtime, dstspace, dstaddr))) & 0xff);
        method_WRMEM_B(runtime, dstspace, dstaddr, xlt);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, 2)] = xlt;
        method_add_to_addr_reg(runtime, dst, 1);
        if ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)]) - (1)))) {
            members.m_fcw = ((((members.m_fcw) & (-17))) & 0xffff);
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
    }
    function method_ZB8_ddN0_0100_0000_rrrr_ssN0_0000(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 1), 4)) & (15))) & 0xff);
        let cnt = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) << 24 >> 24);
        let dstspace = ((((Number(dst) === Number(((method_get_segmented_mode(runtime)) ? (14) : (15)))) ? 1 : 0)) ? ((members.m_stack ?? 0)) : ((members.m_data ?? 0)));
        let dstaddr = ((method_addr_from_reg(runtime, dst)) >>> 0);
        let xlt = ((method_RDBX_B(runtime, src, method_RDMEM_B(runtime, dstspace, dstaddr))) & 0xff);
        method_WRMEM_B(runtime, dstspace, dstaddr, xlt);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, 2)] = xlt;
        method_add_to_addr_reg(runtime, dst, 1);
        if ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)]) - (1)))) {
            members.m_fcw = ((((members.m_fcw) & (-17))) & 0xffff);
            members.m_pc = ((((members.m_pc) - (4))) >>> 0);
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
    }
    function method_ZB8_ddN0_1000_0000_rrrr_ssN0_0000(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 1), 4)) & (15))) & 0xff);
        let cnt = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) << 24 >> 24);
        let dstspace = ((((Number(dst) === Number(((method_get_segmented_mode(runtime)) ? (14) : (15)))) ? 1 : 0)) ? ((members.m_stack ?? 0)) : ((members.m_data ?? 0)));
        let dstaddr = ((method_addr_from_reg(runtime, dst)) >>> 0);
        let xlt = ((method_RDBX_B(runtime, src, method_RDMEM_B(runtime, dstspace, dstaddr))) & 0xff);
        method_WRMEM_B(runtime, dstspace, dstaddr, xlt);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, 2)] = xlt;
        method_sub_from_addr_reg(runtime, dst, 1);
        if ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)]) - (1)))) {
            members.m_fcw = ((((members.m_fcw) & (-17))) & 0xffff);
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
    }
    function method_ZB8_ddN0_1100_0000_rrrr_ssN0_0000(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 1), 4)) & (15))) & 0xff);
        let cnt = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) << 24 >> 24);
        let dstspace = ((((Number(dst) === Number(((method_get_segmented_mode(runtime)) ? (14) : (15)))) ? 1 : 0)) ? ((members.m_stack ?? 0)) : ((members.m_data ?? 0)));
        let dstaddr = ((method_addr_from_reg(runtime, dst)) >>> 0);
        let xlt = ((method_RDBX_B(runtime, src, method_RDMEM_B(runtime, dstspace, dstaddr))) & 0xff);
        method_WRMEM_B(runtime, dstspace, dstaddr, xlt);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, 2)] = xlt;
        method_sub_from_addr_reg(runtime, dst, 1);
        if ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)]) - (1)))) {
            members.m_fcw = ((((members.m_fcw) & (-17))) & 0xffff);
            members.m_pc = ((((members.m_pc) - (4))) >>> 0);
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
    }
    function method_ZB9_imm8(runtime) {
        const members = runtime.members;
        let imm8 = ((((method_get_operand(runtime, 0)) & 0xff)) & 0xff);
        0;
        if ((((members.m_fcw ?? 0)) & (8192))) {
        }
    }
    function method_ZBA_ssN0_0000_0000_rrrr_dddd_cccc(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let cc = ((((runtime.shiftRight(method_get_operand(runtime, 1), 0)) & (15))) & 0xff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 1), 4)) & (15))) & 0xff);
        let cnt = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) << 24 >> 24);
        method_CPB(runtime, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))], method_RDIR_B(runtime, src));
        switch (cc) {
            case 0:
                {
                    if (1) {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 1:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 2:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 3:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((members.m_fcw ?? 0)) >>> (7))) & (1))))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 4:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (4))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 5:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (5))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 6:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (6))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 7:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (7))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 8:
                {
                    if (1) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    break;
                }
            case 9:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 10:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 11:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((members.m_fcw ?? 0)) >>> (7))) & (1))))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 12:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 13:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (5))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 14:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 15:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (7))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
        }
        method_add_to_addr_reg(runtime, src, 1);
        if ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)]) - (1)))) {
            members.m_fcw = ((((members.m_fcw) & (-17))) & 0xffff);
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
    }
    function method_ZBA_ssN0_0001_0000_rrrr_ddN0_x000(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let cnt = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) << 24 >> 24);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 1), 4)) & (15))) & 0xff);
        let cc = ((((runtime.shiftRight(method_get_operand(runtime, 1), 0)) & (15))) & 0xff);
        method_WRIR_B(runtime, dst, method_RDIR_B(runtime, src));
        method_add_to_addr_reg(runtime, src, 1);
        method_add_to_addr_reg(runtime, dst, 1);
        if ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)]) - (1)))) {
            members.m_fcw = ((((members.m_fcw) & (-17))) & 0xffff);
            if ((((cc) === (0)) ? 1 : 0)) {
                members.m_pc = ((((members.m_pc) - (4))) >>> 0);
            }
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
    }
    function method_ZBA_ssN0_0010_0000_rrrr_ddN0_cccc(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let cc = ((((runtime.shiftRight(method_get_operand(runtime, 1), 0)) & (15))) & 0xff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 1), 4)) & (15))) & 0xff);
        let cnt = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) << 24 >> 24);
        method_CPB(runtime, method_RDIR_B(runtime, dst), method_RDIR_B(runtime, src));
        switch (cc) {
            case 0:
                {
                    if (1) {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 1:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 2:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 3:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((members.m_fcw ?? 0)) >>> (7))) & (1))))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 4:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (4))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 5:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (5))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 6:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (6))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 7:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (7))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 8:
                {
                    if (1) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    break;
                }
            case 9:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 10:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 11:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((members.m_fcw ?? 0)) >>> (7))) & (1))))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 12:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 13:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (5))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 14:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 15:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (7))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
        }
        method_add_to_addr_reg(runtime, src, 1);
        method_add_to_addr_reg(runtime, dst, 1);
        if ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)]) - (1)))) {
            members.m_fcw = ((((members.m_fcw) & (-17))) & 0xffff);
            if ((((((members.m_fcw ?? 0)) & (64))) ? 0 : 1)) {
                members.m_pc = ((((members.m_pc) - (4))) >>> 0);
            }
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
    }
    function method_ZBA_ssN0_0100_0000_rrrr_dddd_cccc(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let cc = ((((runtime.shiftRight(method_get_operand(runtime, 1), 0)) & (15))) & 0xff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 1), 4)) & (15))) & 0xff);
        let cnt = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) << 24 >> 24);
        method_CPB(runtime, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))], method_RDIR_B(runtime, src));
        switch (cc) {
            case 0:
                {
                    if (1) {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 1:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 2:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 3:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((members.m_fcw ?? 0)) >>> (7))) & (1))))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 4:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (4))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 5:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (5))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 6:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (6))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 7:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (7))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 8:
                {
                    if (1) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    break;
                }
            case 9:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 10:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 11:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((members.m_fcw ?? 0)) >>> (7))) & (1))))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 12:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 13:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (5))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 14:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 15:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (7))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
        }
        method_add_to_addr_reg(runtime, src, 1);
        if ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)]) - (1)))) {
            members.m_fcw = ((((members.m_fcw) & (-17))) & 0xffff);
            if ((((((members.m_fcw ?? 0)) & (64))) ? 0 : 1)) {
                members.m_pc = ((((members.m_pc) - (4))) >>> 0);
            }
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
    }
    function method_ZBA_ssN0_0110_0000_rrrr_ddN0_cccc(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let cc = ((((runtime.shiftRight(method_get_operand(runtime, 1), 0)) & (15))) & 0xff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 1), 4)) & (15))) & 0xff);
        let cnt = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) << 24 >> 24);
        method_CPB(runtime, method_RDIR_B(runtime, dst), method_RDIR_B(runtime, src));
        switch (cc) {
            case 0:
                {
                    if (1) {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 1:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 2:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 3:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((members.m_fcw ?? 0)) >>> (7))) & (1))))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 4:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (4))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 5:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (5))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 6:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (6))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 7:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (7))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 8:
                {
                    if (1) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    break;
                }
            case 9:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 10:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 11:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((members.m_fcw ?? 0)) >>> (7))) & (1))))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 12:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 13:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (5))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 14:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 15:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (7))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
        }
        method_add_to_addr_reg(runtime, src, 1);
        method_add_to_addr_reg(runtime, dst, 1);
        if ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)]) - (1)))) {
            members.m_fcw = ((((members.m_fcw) & (-17))) & 0xffff);
            if ((((((members.m_fcw ?? 0)) & (64))) ? 0 : 1)) {
                members.m_pc = ((((members.m_pc) - (4))) >>> 0);
            }
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
    }
    function method_ZBA_ssN0_1000_0000_rrrr_dddd_cccc(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let cc = ((((runtime.shiftRight(method_get_operand(runtime, 1), 0)) & (15))) & 0xff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 1), 4)) & (15))) & 0xff);
        let cnt = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) << 24 >> 24);
        method_CPB(runtime, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))], method_RDIR_B(runtime, src));
        switch (cc) {
            case 0:
                {
                    if (1) {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 1:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 2:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 3:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((members.m_fcw ?? 0)) >>> (7))) & (1))))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 4:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (4))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 5:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (5))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 6:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (6))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 7:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (7))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 8:
                {
                    if (1) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    break;
                }
            case 9:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 10:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 11:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((members.m_fcw ?? 0)) >>> (7))) & (1))))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 12:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 13:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (5))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 14:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 15:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (7))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
        }
        method_sub_from_addr_reg(runtime, src, 1);
        if ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)]) - (1)))) {
            members.m_fcw = ((((members.m_fcw) & (-17))) & 0xffff);
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
    }
    function method_ZBA_ssN0_1001_0000_rrrr_ddN0_x000(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let cnt = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) << 24 >> 24);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 1), 4)) & (15))) & 0xff);
        let cc = ((((runtime.shiftRight(method_get_operand(runtime, 1), 0)) & (15))) & 0xff);
        method_WRIR_B(runtime, dst, method_RDIR_B(runtime, src));
        method_sub_from_addr_reg(runtime, src, 1);
        method_sub_from_addr_reg(runtime, dst, 1);
        if ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)]) - (1)))) {
            members.m_fcw = ((((members.m_fcw) & (-17))) & 0xffff);
            if ((((cc) === (0)) ? 1 : 0)) {
                members.m_pc = ((((members.m_pc) - (4))) >>> 0);
            }
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
    }
    function method_ZBA_ssN0_1010_0000_rrrr_ddN0_cccc(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let cc = ((((runtime.shiftRight(method_get_operand(runtime, 1), 0)) & (15))) & 0xff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 1), 4)) & (15))) & 0xff);
        let cnt = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) << 24 >> 24);
        method_CPB(runtime, method_RDIR_B(runtime, dst), method_RDIR_B(runtime, src));
        switch (cc) {
            case 0:
                {
                    if (1) {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 1:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 2:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 3:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((members.m_fcw ?? 0)) >>> (7))) & (1))))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 4:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (4))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 5:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (5))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 6:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (6))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 7:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (7))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 8:
                {
                    if (1) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    break;
                }
            case 9:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 10:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 11:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((members.m_fcw ?? 0)) >>> (7))) & (1))))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 12:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 13:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (5))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 14:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 15:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (7))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
        }
        method_sub_from_addr_reg(runtime, src, 1);
        method_sub_from_addr_reg(runtime, dst, 1);
        if ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)]) - (1)))) {
            members.m_fcw = ((((members.m_fcw) & (-17))) & 0xffff);
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
    }
    function method_ZBA_ssN0_1100_0000_rrrr_dddd_cccc(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let cc = ((((runtime.shiftRight(method_get_operand(runtime, 1), 0)) & (15))) & 0xff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 1), 4)) & (15))) & 0xff);
        let cnt = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) << 24 >> 24);
        method_CPB(runtime, h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))], method_RDIR_B(runtime, src));
        switch (cc) {
            case 0:
                {
                    if (1) {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 1:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 2:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 3:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((members.m_fcw ?? 0)) >>> (7))) & (1))))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 4:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (4))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 5:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (5))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 6:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (6))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 7:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (7))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 8:
                {
                    if (1) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    break;
                }
            case 9:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 10:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 11:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((members.m_fcw ?? 0)) >>> (7))) & (1))))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 12:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 13:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (5))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 14:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 15:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (7))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
        }
        method_sub_from_addr_reg(runtime, src, 1);
        if ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)]) - (1)))) {
            members.m_fcw = ((((members.m_fcw) & (-17))) & 0xffff);
            if ((((((members.m_fcw ?? 0)) & (64))) ? 0 : 1)) {
                members.m_pc = ((((members.m_pc) - (4))) >>> 0);
            }
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
    }
    function method_ZBA_ssN0_1110_0000_rrrr_ddN0_cccc(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let cc = ((((runtime.shiftRight(method_get_operand(runtime, 1), 0)) & (15))) & 0xff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 1), 4)) & (15))) & 0xff);
        let cnt = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) << 24 >> 24);
        method_CPB(runtime, method_RDIR_B(runtime, dst), method_RDIR_B(runtime, src));
        switch (cc) {
            case 0:
                {
                    if (1) {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 1:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 2:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 3:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((members.m_fcw ?? 0)) >>> (7))) & (1))))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 4:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (4))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 5:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (5))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 6:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (6))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 7:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (7))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 8:
                {
                    if (1) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    break;
                }
            case 9:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 10:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 11:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((members.m_fcw ?? 0)) >>> (7))) & (1))))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 12:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 13:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (5))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 14:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 15:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (7))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
        }
        method_sub_from_addr_reg(runtime, src, 1);
        method_sub_from_addr_reg(runtime, dst, 1);
        if ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)]) - (1)))) {
            members.m_fcw = ((((members.m_fcw) & (-17))) & 0xffff);
            if ((((((members.m_fcw ?? 0)) & (64))) ? 0 : 1)) {
                members.m_pc = ((((members.m_pc) - (4))) >>> 0);
            }
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
    }
    function method_ZBB_ssN0_0000_0000_rrrr_dddd_cccc(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let cc = ((((runtime.shiftRight(method_get_operand(runtime, 1), 0)) & (15))) & 0xff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 1), 4)) & (15))) & 0xff);
        let cnt = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) << 24 >> 24);
        method_CPW(runtime, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)], method_RDIR_W(runtime, src));
        switch (cc) {
            case 0:
                {
                    if (1) {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 1:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 2:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 3:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((members.m_fcw ?? 0)) >>> (7))) & (1))))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 4:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (4))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 5:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (5))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 6:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (6))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 7:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (7))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 8:
                {
                    if (1) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    break;
                }
            case 9:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 10:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 11:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((members.m_fcw ?? 0)) >>> (7))) & (1))))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 12:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 13:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (5))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 14:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 15:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (7))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
        }
        method_add_to_addr_reg(runtime, src, 2);
        if ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)]) - (1)))) {
            members.m_fcw = ((((members.m_fcw) & (-17))) & 0xffff);
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
    }
    function method_ZBB_ssN0_0001_0000_rrrr_ddN0_x000(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let cnt = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) << 24 >> 24);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 1), 4)) & (15))) & 0xff);
        let cc = ((((runtime.shiftRight(method_get_operand(runtime, 1), 0)) & (15))) & 0xff);
        method_WRIR_W(runtime, dst, method_RDIR_W(runtime, src));
        method_add_to_addr_reg(runtime, src, 2);
        method_add_to_addr_reg(runtime, dst, 2);
        if ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)]) - (1)))) {
            members.m_fcw = ((((members.m_fcw) & (-17))) & 0xffff);
            if ((((cc) === (0)) ? 1 : 0)) {
                members.m_pc = ((((members.m_pc) - (4))) >>> 0);
            }
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
    }
    function method_ZBB_ssN0_0010_0000_rrrr_ddN0_cccc(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let cc = ((((runtime.shiftRight(method_get_operand(runtime, 1), 0)) & (15))) & 0xff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 1), 4)) & (15))) & 0xff);
        let cnt = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) << 24 >> 24);
        method_CPW(runtime, method_RDIR_W(runtime, dst), method_RDIR_W(runtime, src));
        switch (cc) {
            case 0:
                {
                    if (1) {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 1:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 2:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 3:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((members.m_fcw ?? 0)) >>> (7))) & (1))))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 4:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (4))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 5:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (5))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 6:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (6))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 7:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (7))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 8:
                {
                    if (1) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    break;
                }
            case 9:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 10:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 11:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((members.m_fcw ?? 0)) >>> (7))) & (1))))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 12:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 13:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (5))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 14:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 15:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (7))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
        }
        method_add_to_addr_reg(runtime, src, 2);
        method_add_to_addr_reg(runtime, dst, 2);
        if ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)]) - (1)))) {
            members.m_fcw = ((((members.m_fcw) & (-17))) & 0xffff);
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
    }
    function method_ZBB_ssN0_0100_0000_rrrr_dddd_cccc(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let cc = ((((runtime.shiftRight(method_get_operand(runtime, 1), 0)) & (15))) & 0xff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 1), 4)) & (15))) & 0xff);
        let cnt = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) << 24 >> 24);
        method_CPW(runtime, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)], method_RDIR_W(runtime, src));
        switch (cc) {
            case 0:
                {
                    if (1) {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 1:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 2:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 3:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((members.m_fcw ?? 0)) >>> (7))) & (1))))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 4:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (4))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 5:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (5))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 6:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (6))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 7:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (7))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 8:
                {
                    if (1) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    break;
                }
            case 9:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 10:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 11:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((members.m_fcw ?? 0)) >>> (7))) & (1))))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 12:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 13:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (5))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 14:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 15:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (7))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
        }
        method_add_to_addr_reg(runtime, src, 2);
        if ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)]) - (1)))) {
            members.m_fcw = ((((members.m_fcw) & (-17))) & 0xffff);
            if ((((((members.m_fcw ?? 0)) & (64))) ? 0 : 1)) {
                members.m_pc = ((((members.m_pc) - (4))) >>> 0);
            }
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
    }
    function method_ZBB_ssN0_0110_0000_rrrr_ddN0_cccc(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let cc = ((((runtime.shiftRight(method_get_operand(runtime, 1), 0)) & (15))) & 0xff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 1), 4)) & (15))) & 0xff);
        let cnt = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) << 24 >> 24);
        method_CPW(runtime, method_RDIR_W(runtime, dst), method_RDIR_W(runtime, src));
        switch (cc) {
            case 0:
                {
                    if (1) {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 1:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 2:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 3:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((members.m_fcw ?? 0)) >>> (7))) & (1))))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 4:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (4))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 5:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (5))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 6:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (6))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 7:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (7))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 8:
                {
                    if (1) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    break;
                }
            case 9:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 10:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 11:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((members.m_fcw ?? 0)) >>> (7))) & (1))))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 12:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 13:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (5))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 14:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 15:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (7))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
        }
        method_add_to_addr_reg(runtime, src, 2);
        method_add_to_addr_reg(runtime, dst, 2);
        if ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)]) - (1)))) {
            members.m_fcw = ((((members.m_fcw) & (-17))) & 0xffff);
            if ((((((members.m_fcw ?? 0)) & (64))) ? 0 : 1)) {
                members.m_pc = ((((members.m_pc) - (4))) >>> 0);
            }
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
    }
    function method_ZBB_ssN0_1000_0000_rrrr_dddd_cccc(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let cc = ((((runtime.shiftRight(method_get_operand(runtime, 1), 0)) & (15))) & 0xff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 1), 4)) & (15))) & 0xff);
        let cnt = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) << 24 >> 24);
        method_CPW(runtime, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)], method_RDIR_W(runtime, src));
        switch (cc) {
            case 0:
                {
                    if (1) {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 1:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 2:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 3:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((members.m_fcw ?? 0)) >>> (7))) & (1))))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 4:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (4))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 5:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (5))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 6:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (6))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 7:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (7))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 8:
                {
                    if (1) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    break;
                }
            case 9:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 10:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 11:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((members.m_fcw ?? 0)) >>> (7))) & (1))))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 12:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 13:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (5))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 14:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 15:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (7))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
        }
        method_sub_from_addr_reg(runtime, src, 2);
        if ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)]) - (1)))) {
            members.m_fcw = ((((members.m_fcw) & (-17))) & 0xffff);
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
    }
    function method_ZBB_ssN0_1001_0000_rrrr_ddN0_x000(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let cnt = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) << 24 >> 24);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 1), 4)) & (15))) & 0xff);
        let cc = ((((runtime.shiftRight(method_get_operand(runtime, 1), 0)) & (15))) & 0xff);
        method_WRIR_W(runtime, dst, method_RDIR_W(runtime, src));
        method_sub_from_addr_reg(runtime, src, 2);
        method_sub_from_addr_reg(runtime, dst, 2);
        if ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)]) - (1)))) {
            members.m_fcw = ((((members.m_fcw) & (-17))) & 0xffff);
            if ((((cc) === (0)) ? 1 : 0)) {
                members.m_pc = ((((members.m_pc) - (4))) >>> 0);
            }
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
    }
    function method_ZBB_ssN0_1010_0000_rrrr_ddN0_cccc(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let cc = ((((runtime.shiftRight(method_get_operand(runtime, 1), 0)) & (15))) & 0xff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 1), 4)) & (15))) & 0xff);
        let cnt = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) << 24 >> 24);
        method_CPW(runtime, method_RDIR_W(runtime, dst), method_RDIR_W(runtime, src));
        switch (cc) {
            case 0:
                {
                    if (1) {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 1:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 2:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 3:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((members.m_fcw ?? 0)) >>> (7))) & (1))))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 4:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (4))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 5:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (5))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 6:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (6))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 7:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (7))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 8:
                {
                    if (1) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    break;
                }
            case 9:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 10:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 11:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((members.m_fcw ?? 0)) >>> (7))) & (1))))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 12:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 13:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (5))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 14:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 15:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (7))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
        }
        method_sub_from_addr_reg(runtime, src, 2);
        method_sub_from_addr_reg(runtime, dst, 2);
        if ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)]) - (1)))) {
            members.m_fcw = ((((members.m_fcw) & (-17))) & 0xffff);
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
    }
    function method_ZBB_ssN0_1100_0000_rrrr_dddd_cccc(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let cc = ((((runtime.shiftRight(method_get_operand(runtime, 1), 0)) & (15))) & 0xff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 1), 4)) & (15))) & 0xff);
        let cnt = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) << 24 >> 24);
        method_CPW(runtime, h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)], method_RDIR_W(runtime, src));
        switch (cc) {
            case 0:
                {
                    if (1) {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 1:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 2:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 3:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((members.m_fcw ?? 0)) >>> (7))) & (1))))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 4:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (4))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 5:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (5))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 6:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (6))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 7:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (7))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 8:
                {
                    if (1) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    break;
                }
            case 9:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 10:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 11:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((members.m_fcw ?? 0)) >>> (7))) & (1))))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 12:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 13:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (5))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 14:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 15:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (7))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
        }
        method_sub_from_addr_reg(runtime, src, 2);
        if ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)]) - (1)))) {
            members.m_fcw = ((((members.m_fcw) & (-17))) & 0xffff);
            if ((((((members.m_fcw ?? 0)) & (64))) ? 0 : 1)) {
                members.m_pc = ((((members.m_pc) - (4))) >>> 0);
            }
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
    }
    function method_ZBB_ssN0_1110_0000_rrrr_ddN0_cccc(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let src = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let cc = ((((runtime.shiftRight(method_get_operand(runtime, 1), 0)) & (15))) & 0xff);
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 1), 4)) & (15))) & 0xff);
        let cnt = ((((runtime.shiftRight(method_get_operand(runtime, 1), 8)) & (15))) << 24 >> 24);
        method_CPW(runtime, method_RDIR_W(runtime, dst), method_RDIR_W(runtime, src));
        switch (cc) {
            case 0:
                {
                    if (1) {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 1:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 2:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 3:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((members.m_fcw ?? 0)) >>> (7))) & (1))))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 4:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (4))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 5:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (5))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 6:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (6))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 7:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (7))) & (1))) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 8:
                {
                    if (1) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    break;
                }
            case 9:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 10:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 11:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((members.m_fcw ?? 0)) >>> (7))) & (1))))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 12:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 13:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (5))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 14:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
            case 15:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (7))) & (1))) ? 0 : 1)) {
                        members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
                    }
                    else {
                        members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
                    }
                    break;
                }
        }
        method_sub_from_addr_reg(runtime, src, 2);
        method_sub_from_addr_reg(runtime, dst, 2);
        if ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, cnt)]) - (1)))) {
            members.m_fcw = ((((members.m_fcw) & (-17))) & 0xffff);
            if ((((((members.m_fcw ?? 0)) & (64))) ? 0 : 1)) {
                members.m_pc = ((((members.m_pc) - (4))) >>> 0);
            }
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (16))) & 0xffff);
        }
    }
    function method_ZBC_aaaa_bbbb(runtime) {
        const members = runtime.members;
        const h_m_op = members.m_op ?? 0;
        const h_m_regs = members.m_regs ?? 0;
        let b = ((((h_m_op[0]) & (15))) & 0xff);
        let a = ((((((h_m_op[0]) >>> (4))) & (15))) & 0xff);
        let tmp = ((h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((b) & (7))) << (1))) | (runtime.shiftRight(((b) & (8)), 3))))]) & 0xff);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((a) & (7))) << (1))) | (runtime.shiftRight(((a) & (8)), 3))))] = ((runtime.shiftRight(h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((a) & (7))) << (1))) | (runtime.shiftRight(((a) & (8)), 3))))], 4)) | (((h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((b) & (7))) << (1))) | (runtime.shiftRight(((b) & (8)), 3))))]) << (4))));
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((b) & (7))) << (1))) | (runtime.shiftRight(((b) & (8)), 3))))] = ((((h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((b) & (7))) << (1))) | (runtime.shiftRight(((b) & (8)), 3))))]) & (240))) | (((tmp) & (15))));
        if (h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((b) & (7))) << (1))) | (runtime.shiftRight(((b) & (8)), 3))))]) {
            members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
    }
    function method_ZBD_dddd_imm4(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 4)) & (15))) & 0xff);
        let imm4 = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = imm4;
    }
    function method_ZBE_aaaa_bbbb(runtime) {
        const members = runtime.members;
        const h_m_op = members.m_op ?? 0;
        const h_m_regs = members.m_regs ?? 0;
        let b = ((((h_m_op[0]) & (15))) & 0xff);
        let a = ((((((h_m_op[0]) >>> (4))) & (15))) & 0xff);
        let tmp = ((h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((a) & (7))) << (1))) | (runtime.shiftRight(((a) & (8)), 3))))]) & 0xff);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((a) & (7))) << (1))) | (runtime.shiftRight(((a) & (8)), 3))))] = ((((h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((a) & (7))) << (1))) | (runtime.shiftRight(((a) & (8)), 3))))]) << (4))) | (((h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((b) & (7))) << (1))) | (runtime.shiftRight(((b) & (8)), 3))))]) & (15))));
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((b) & (7))) << (1))) | (runtime.shiftRight(((b) & (8)), 3))))] = ((((h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((b) & (7))) << (1))) | (runtime.shiftRight(((b) & (8)), 3))))]) & (240))) | (((tmp) >>> (4))));
        if (h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((b) & (7))) << (1))) | (runtime.shiftRight(((b) & (8)), 3))))]) {
            members.m_fcw = ((((members.m_fcw) & (-65))) & 0xffff);
        }
        else {
            members.m_fcw = ((((members.m_fcw) | (64))) & 0xffff);
        }
    }
    function method_ZBF_imm8(runtime) {
        const members = runtime.members;
        let imm8 = ((((method_get_operand(runtime, 0)) & 0xff)) & 0xff);
        0;
        if ((((members.m_fcw ?? 0)) & (8192))) {
        }
    }
    function method_Z20_0000_dddd_imm8(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 0)) & (15))) & 0xff);
        let imm8 = ((((method_get_operand(runtime, 1)) & 0xff)) & 0xff);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = imm8;
    }
    function method_ZC_dddd_imm8(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 8)) & (15))) & 0xff);
        let imm8 = ((((method_get_operand(runtime, 0)) & 0xff)) & 0xff);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = imm8;
    }
    function method_ZD_dsp12(runtime) {
        const members = runtime.members;
        const h_m_op = members.m_op ?? 0;
        let dsp12 = ((((h_m_op[0]) & (4095))) << 16 >> 16);
        if (method_get_segmented_mode(runtime)) {
            method_PUSHL(runtime, ((method_get_segmented_mode(runtime)) ? (14) : (15)), method_make_segmented_addr(runtime, (members.m_pc ?? 0)));
        }
        else {
            method_PUSHW(runtime, ((method_get_segmented_mode(runtime)) ? (14) : (15)), (members.m_pc ?? 0));
        }
        dsp12 = ((((((dsp12) & (2048))) ? (((4096) - (((2) * (((dsp12) & (2047))))))) : (((-2) * (((dsp12) & (2047))))))) << 16 >> 16);
        method_set_pc(runtime, method_addr_add(runtime, (members.m_pc ?? 0), dsp12));
    }
    function method_ZE_cccc_dsp8(runtime) {
        const members = runtime.members;
        let dsp8 = ((((method_get_operand(runtime, 0)) << 24 >> 24)) << 24 >> 24);
        let cc = ((((runtime.shiftRight(method_get_operand(runtime, 0), 8)) & (15))) & 0xff);
        switch (cc) {
            case 0:
                {
                    break;
                }
            case 1:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))) {
                        method_set_pc(runtime, method_addr_add(runtime, (members.m_pc ?? 0), ((dsp8) * (2))));
                    }
                    break;
                }
            case 2:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))))) {
                        method_set_pc(runtime, method_addr_add(runtime, (members.m_pc ?? 0), ((dsp8) * (2))));
                    }
                    break;
                }
            case 3:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((members.m_fcw ?? 0)) >>> (7))) & (1))))) {
                        method_set_pc(runtime, method_addr_add(runtime, (members.m_pc ?? 0), ((dsp8) * (2))));
                    }
                    break;
                }
            case 4:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (4))) & (1))) {
                        method_set_pc(runtime, method_addr_add(runtime, (members.m_pc ?? 0), ((dsp8) * (2))));
                    }
                    break;
                }
            case 5:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (5))) & (1))) {
                        method_set_pc(runtime, method_addr_add(runtime, (members.m_pc ?? 0), ((dsp8) * (2))));
                    }
                    break;
                }
            case 6:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (6))) & (1))) {
                        method_set_pc(runtime, method_addr_add(runtime, (members.m_pc ?? 0), ((dsp8) * (2))));
                    }
                    break;
                }
            case 7:
                {
                    if ((((((members.m_fcw ?? 0)) >>> (7))) & (1))) {
                        method_set_pc(runtime, method_addr_add(runtime, (members.m_pc ?? 0), ((dsp8) * (2))));
                    }
                    break;
                }
            case 8:
                {
                    if (1) {
                        method_set_pc(runtime, method_addr_add(runtime, (members.m_pc ?? 0), ((dsp8) * (2))));
                    }
                    break;
                }
            case 9:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))) ? 0 : 1)) {
                        method_set_pc(runtime, method_addr_add(runtime, (members.m_pc ?? 0), ((dsp8) * (2))));
                    }
                    break;
                }
            case 10:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ^ ((((((members.m_fcw ?? 0)) >>> (5))) & (1))))))) ? 0 : 1)) {
                        method_set_pc(runtime, method_addr_add(runtime, (members.m_pc ?? 0), ((dsp8) * (2))));
                    }
                    break;
                }
            case 11:
                {
                    if ((((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) | ((((((members.m_fcw ?? 0)) >>> (7))) & (1))))) ? 0 : 1)) {
                        method_set_pc(runtime, method_addr_add(runtime, (members.m_pc ?? 0), ((dsp8) * (2))));
                    }
                    break;
                }
            case 12:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (4))) & (1))) ? 0 : 1)) {
                        method_set_pc(runtime, method_addr_add(runtime, (members.m_pc ?? 0), ((dsp8) * (2))));
                    }
                    break;
                }
            case 13:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (5))) & (1))) ? 0 : 1)) {
                        method_set_pc(runtime, method_addr_add(runtime, (members.m_pc ?? 0), ((dsp8) * (2))));
                    }
                    break;
                }
            case 14:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (6))) & (1))) ? 0 : 1)) {
                        method_set_pc(runtime, method_addr_add(runtime, (members.m_pc ?? 0), ((dsp8) * (2))));
                    }
                    break;
                }
            case 15:
                {
                    if ((((((((members.m_fcw ?? 0)) >>> (7))) & (1))) ? 0 : 1)) {
                        method_set_pc(runtime, method_addr_add(runtime, (members.m_pc ?? 0), ((dsp8) * (2))));
                    }
                    break;
                }
        }
    }
    function method_ZF_dddd_0dsp7(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 8)) & (15))) & 0xff);
        let dsp7 = ((((method_get_operand(runtime, 0)) & (127))) & 0xff);
        h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))] = ((h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))]) - (1));
        if (h_m_regs.B[method_BYTE8_XOR_BE(runtime, ((((((dst) & (7))) << (1))) | (runtime.shiftRight(((dst) & (8)), 3))))]) {
            method_set_pc(runtime, method_addr_sub(runtime, (members.m_pc ?? 0), ((2) * (dsp7))));
        }
    }
    function method_addr_sub(runtime, addr, subtrahend) {
        const members = runtime.members;
        return ((((((addr) & (4294901760))) | (((((addr) - (subtrahend))) & (65535))))) >>> 0);
    }
    function method_ZF_dddd_1dsp7(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let dst = ((((runtime.shiftRight(method_get_operand(runtime, 0), 8)) & (15))) & 0xff);
        let dsp7 = ((((method_get_operand(runtime, 0)) & (127))) & 0xff);
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)] = ((h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)]) - (1));
        if (h_m_regs.W[method_BYTE4_XOR_BE(runtime, dst)]) {
            method_set_pc(runtime, method_addr_sub(runtime, (members.m_pc ?? 0), ((2) * (dsp7))));
        }
    }
    function method_F_SEG_Z8001(runtime) {
        const members = runtime.members;
        return ((0) >>> 0);
    }
    function method_PSA_ADDR(runtime) {
        const members = runtime.members;
        return (((members.m_psapoff ?? 0)) >>> 0);
    }
    function method_init_tables(runtime) {
        const members = runtime.members;
        const h_z8000_zsp = members.z8000_zsp ?? 0;
        const h_table = members.table ?? 0;
        const h_z8000_exec = members.z8000_exec ?? 0;
        for (let i = ((0) | 0); (((i) < (256)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            h_z8000_zsp[i] = (((((((((i) === (0)) ? 1 : 0)) ? (64) : (0))) | (((((i) & (128))) ? (32) : (0))))) | (((((((((((((((((((runtime.shiftRight(i, 7)) ^ (runtime.shiftRight(i, 6)))) ^ (runtime.shiftRight(i, 5)))) ^ (runtime.shiftRight(i, 4)))) ^ (runtime.shiftRight(i, 3)))) ^ (runtime.shiftRight(i, 2)))) ^ (runtime.shiftRight(i, 1)))) ^ (i))) & (1))) ? (0) : (16))));
        }
        for (let opc = h_table; __deref_init_tables(runtime, opc).size; opc = __add_init_tables(runtime, opc, 1)) {
            for (let val = ((__deref_init_tables(runtime, opc).beg) >>> 0); ((Number(val) <= Number(__deref_init_tables(runtime, opc).end)) ? 1 : 0); val = ((((val) + (__deref_init_tables(runtime, opc).step))) >>> 0)) {
                h_z8000_exec[val] = runtime.subtract(opc, h_table);
            }
        }
    }
    function __add_init_tables(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_init_tables(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_execute_run(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_busack_out"], __L1 = __l["CALL_METHOD"];
        const h_m_op = members.m_op ?? 0;
        const h_table = members.table ?? 0;
        const h_z8000_exec = members.z8000_exec ?? 0;
        do {
            if ((members.m_busreq_state ?? 0)) {
                if ((((members.m_busack_state ?? 0)) ? 0 : 1)) {
                    members.m_busack_state = ((1) | 0);
                    (__L0 ? __L0(Number(1)) : typeof members.m_busack_out === 'function' ? members.m_busack_out(1) : runtime.invoke("m_busack_out", 1));
                }
                if (((((members.m_icount ?? 0)) > (0)) ? 1 : 0)) {
                    members.m_icount = ((0) | 0);
                }
                members.m_refresh = ((((members.m_refresh) & (32767))) & 0xffff);
                return;
            }
            else {
                if ((members.m_busack_state ?? 0)) {
                    members.m_busack_state = ((0) | 0);
                    (__L0 ? __L0(Number(0)) : typeof members.m_busack_out === 'function' ? members.m_busack_out(0) : runtime.invoke("m_busack_out", 0));
                }
            }
            if ((members.m_irq_req ?? 0)) {
                method_Interrupt(runtime);
            }
            members.m_ppc = (((members.m_pc ?? 0)) >>> 0);
            /* debugger_instruction_hook: no effect */
            if ((members.m_halt ?? 0)) {
                /* debugger_wait_hook: no effect */
                members.m_icount = ((0) | 0);
            }
            else {
                h_m_op[0] = method_RDOP(runtime);
                members.m_op_valid = ((1) >>> 0);
                let exec = h_table[h_z8000_exec[h_m_op[0]]];
                members.m_icount = ((((members.m_icount) - (exec.cycles))) | 0);
                ((__method) => __method ? __method(runtime) : (__L1 ? __L1(exec.opcode) : runtime.macro("CALL_METHOD", exec.opcode)))(__methodTable[exec.opcode]);
                members.m_op_valid = ((0) >>> 0);
            }
        } while (((((members.m_icount ?? 0)) > (0)) ? 1 : 0));
    }
    function method_Interrupt(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["standard_irq_callback"];
        const h_m_op = members.m_op ?? 0;
        let fcw = (((members.m_fcw ?? 0)) & 0xffff);
        if ((((members.m_irq_req ?? 0)) & (1))) {
            members.m_pc = ((method_get_reset_pc(runtime)) >>> 0);
            members.m_irq_req = ((((members.m_irq_req) & (12))) & 0xff);
            method_CHANGE_FCW(runtime, method_RDMEM_W(runtime, (members.m_program ?? 0), 2));
        }
        else {
            if ((((members.m_irq_req ?? 0)) & (128))) {
                method_CHANGE_FCW(runtime, ((((fcw) | (16384))) | (method_F_SEG_Z8001(runtime))));
                method_PUSH_PC(runtime);
                method_PUSHW(runtime, ((method_get_segmented_mode(runtime)) ? (14) : (15)), fcw);
                method_PUSHW(runtime, ((method_get_segmented_mode(runtime)) ? (14) : (15)), h_m_op[0]);
                members.m_pc = ((method_GET_PC(runtime, __add_Interrupt(runtime, method_PSA_ADDR(runtime), 4))) >>> 0);
                members.m_irq_req = ((((members.m_irq_req) & (-129))) & 0xff);
                method_CHANGE_FCW(runtime, method_GET_FCW(runtime, __add_Interrupt(runtime, method_PSA_ADDR(runtime), 4)));
                0;
            }
            else {
                if ((((members.m_irq_req ?? 0)) & (64))) {
                    method_CHANGE_FCW(runtime, ((((fcw) | (16384))) | (method_F_SEG_Z8001(runtime))));
                    method_PUSH_PC(runtime);
                    method_PUSHW(runtime, ((method_get_segmented_mode(runtime)) ? (14) : (15)), fcw);
                    method_PUSHW(runtime, ((method_get_segmented_mode(runtime)) ? (14) : (15)), h_m_op[0]);
                    members.m_pc = ((method_GET_PC(runtime, __add_Interrupt(runtime, method_PSA_ADDR(runtime), 8))) >>> 0);
                    members.m_irq_req = ((((members.m_irq_req) & (-65))) & 0xff);
                    method_CHANGE_FCW(runtime, method_GET_FCW(runtime, __add_Interrupt(runtime, method_PSA_ADDR(runtime), 8)));
                    0;
                }
                else {
                    if ((((members.m_irq_req ?? 0)) & (2))) {
                        method_CHANGE_FCW(runtime, ((((fcw) | (16384))) | (method_F_SEG_Z8001(runtime))));
                        method_PUSH_PC(runtime);
                        method_PUSHW(runtime, ((method_get_segmented_mode(runtime)) ? (14) : (15)), fcw);
                        method_PUSHW(runtime, ((method_get_segmented_mode(runtime)) ? (14) : (15)), h_m_op[0]);
                        members.m_pc = ((method_GET_PC(runtime, __add_Interrupt(runtime, method_PSA_ADDR(runtime), 12))) >>> 0);
                        members.m_irq_req = ((((members.m_irq_req) & (-3))) & 0xff);
                        method_CHANGE_FCW(runtime, method_GET_FCW(runtime, __add_Interrupt(runtime, method_PSA_ADDR(runtime), 12)));
                        0;
                    }
                    else {
                        if ((((members.m_irq_req ?? 0)) & (32))) {
                            (__L0 ? __L0(-1, (members.m_pc ?? 0)) : runtime.macro("standard_irq_callback", -1, (members.m_pc ?? 0)));
                            members.m_irq_vec = (((members.m_iack_in ?? 0)[1]((members.m_pc ?? 0))) & 0xffff);
                            members.m_halt = ((0) ? 1 : 0);
                            method_CHANGE_FCW(runtime, ((((fcw) | (16384))) | (method_F_SEG_Z8001(runtime))));
                            method_PUSH_PC(runtime);
                            method_PUSHW(runtime, ((method_get_segmented_mode(runtime)) ? (14) : (15)), fcw);
                            method_PUSHW(runtime, ((method_get_segmented_mode(runtime)) ? (14) : (15)), (members.m_irq_vec ?? 0));
                            members.m_pc = ((method_GET_PC(runtime, __add_Interrupt(runtime, method_PSA_ADDR(runtime), 20))) >>> 0);
                            members.m_irq_req = ((((members.m_irq_req) & (-33))) & 0xff);
                            method_CHANGE_FCW(runtime, method_GET_FCW(runtime, __add_Interrupt(runtime, method_PSA_ADDR(runtime), 20)));
                            0;
                        }
                        else {
                            if ((((members.m_irq_req ?? 0)) & (16))) {
                                (__L0 ? __L0(2, (members.m_pc ?? 0)) : runtime.macro("standard_irq_callback", 2, (members.m_pc ?? 0)));
                                members.m_irq_vec = (((members.m_iack_in ?? 0)[0]((members.m_pc ?? 0))) & 0xffff);
                                method_CHANGE_FCW(runtime, ((((fcw) | (16384))) | (method_F_SEG_Z8001(runtime))));
                                method_PUSH_PC(runtime);
                                method_PUSHW(runtime, ((method_get_segmented_mode(runtime)) ? (14) : (15)), fcw);
                                method_PUSHW(runtime, ((method_get_segmented_mode(runtime)) ? (14) : (15)), (members.m_irq_vec ?? 0));
                                members.m_pc = ((method_GET_PC(runtime, __add_Interrupt(runtime, method_PSA_ADDR(runtime), 16))) >>> 0);
                                members.m_irq_req = ((((members.m_irq_req) & (-17))) & 0xff);
                                method_CHANGE_FCW(runtime, method_GET_FCW(runtime, __add_Interrupt(runtime, method_PSA_ADDR(runtime), 16)));
                                0;
                            }
                            else {
                                if (((((((members.m_irq_req ?? 0)) & (4))) && ((((members.m_fcw ?? 0)) & (4096)))) ? 1 : 0)) {
                                    (__L0 ? __L0(1, (members.m_pc ?? 0)) : runtime.macro("standard_irq_callback", 1, (members.m_pc ?? 0)));
                                    members.m_irq_vec = (((members.m_iack_in ?? 0)[3]((members.m_pc ?? 0))) & 0xffff);
                                    members.m_halt = ((0) ? 1 : 0);
                                    method_CHANGE_FCW(runtime, ((((fcw) | (16384))) | (method_F_SEG_Z8001(runtime))));
                                    method_PUSH_PC(runtime);
                                    method_PUSHW(runtime, ((method_get_segmented_mode(runtime)) ? (14) : (15)), fcw);
                                    method_PUSHW(runtime, ((method_get_segmented_mode(runtime)) ? (14) : (15)), (members.m_irq_vec ?? 0));
                                    members.m_pc = ((method_read_irq_vector(runtime)) >>> 0);
                                    members.m_irq_req = ((((members.m_irq_req) & (-5))) & 0xff);
                                    method_CHANGE_FCW(runtime, method_GET_FCW(runtime, __add_Interrupt(runtime, method_PSA_ADDR(runtime), 28)));
                                    0;
                                }
                                else {
                                    if (((((((members.m_irq_req ?? 0)) & (8))) && ((((members.m_fcw ?? 0)) & (2048)))) ? 1 : 0)) {
                                        (__L0 ? __L0(0, (members.m_pc ?? 0)) : runtime.macro("standard_irq_callback", 0, (members.m_pc ?? 0)));
                                        members.m_irq_vec = (((members.m_iack_in ?? 0)[2]((members.m_pc ?? 0))) & 0xffff);
                                        members.m_halt = ((0) ? 1 : 0);
                                        method_CHANGE_FCW(runtime, ((((fcw) | (16384))) | (method_F_SEG_Z8001(runtime))));
                                        method_PUSH_PC(runtime);
                                        method_PUSHW(runtime, ((method_get_segmented_mode(runtime)) ? (14) : (15)), fcw);
                                        method_PUSHW(runtime, ((method_get_segmented_mode(runtime)) ? (14) : (15)), (members.m_irq_vec ?? 0));
                                        members.m_pc = ((method_GET_PC(runtime, __add_Interrupt(runtime, method_PSA_ADDR(runtime), 24))) >>> 0);
                                        members.m_irq_req = ((((members.m_irq_req) & (-9))) & 0xff);
                                        method_CHANGE_FCW(runtime, method_GET_FCW(runtime, __add_Interrupt(runtime, method_PSA_ADDR(runtime), 24)));
                                        0;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    function __add_Interrupt(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_get_reset_pc(runtime) {
        const members = runtime.members;
        return ((method_RDMEM_W(runtime, (members.m_program ?? 0), 4)) >>> 0);
    }
    function method_PUSH_PC(runtime) {
        const members = runtime.members;
        method_PUSHW(runtime, ((method_get_segmented_mode(runtime)) ? (14) : (15)), (members.m_pc ?? 0));
    }
    function method_GET_PC(runtime, VEC) {
        const members = runtime.members;
        return ((method_RDMEM_W(runtime, (members.m_data ?? 0), ((VEC) + (2)))) >>> 0);
    }
    function method_GET_FCW(runtime, VEC) {
        const members = runtime.members;
        return ((method_RDMEM_W(runtime, (members.m_data ?? 0), VEC)) & 0xffff);
    }
    function method_read_irq_vector(runtime) {
        const members = runtime.members;
        return ((method_RDMEM_W(runtime, (members.m_data ?? 0), __add_read_irq_vector(runtime, __add_read_irq_vector(runtime, method_PSA_ADDR(runtime), 30), ((2) * ((((members.m_irq_vec ?? 0)) & (255))))))) >>> 0);
    }
    function __add_read_irq_vector(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_RDOP(runtime) {
        const members = runtime.members;
        let res = (((__deref_RDOP(runtime, members.m_opcache).read_word?.((members.m_pc ?? 0)) ?? 0)) & 0xffff);
        members.m_pc = ((((members.m_pc) + (2))) >>> 0);
        return ((res) & 0xffff);
    }
    function __deref_RDOP(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_execute_set_input(runtime, irqline, state) {
        const members = runtime.members;
        const h_m_irq_state = members.m_irq_state ?? 0;
        if (((Number(irqline) === Number(-1)) ? 1 : 0)) {
            if (((((members.m_nmi_state ?? 0)) === (state)) ? 1 : 0)) {
                return;
            }
            members.m_nmi_state = ((state) | 0);
            if (((Number(state) !== Number(0)) ? 1 : 0)) {
                members.m_irq_req = ((((members.m_irq_req) | (32))) & 0xff);
            }
        }
        else {
            if (((Number(irqline) === Number(3)) ? 1 : 0)) {
                members.m_busreq_state = ((state) | 0);
            }
            else {
                if ((((irqline) < (3)) ? 1 : 0)) {
                    h_m_irq_state[irqline] = state;
                    if (((Number(irqline) === Number(0)) ? 1 : 0)) {
                        if (((Number(state) === Number(0)) ? 1 : 0)) {
                            if ((((((members.m_fcw ?? 0)) & (2048))) ? 0 : 1)) {
                                members.m_irq_req = ((((members.m_irq_req) & (-9))) & 0xff);
                            }
                        }
                        else {
                            if ((((members.m_fcw ?? 0)) & (2048))) {
                                members.m_irq_req = ((((members.m_irq_req) | (8))) & 0xff);
                            }
                        }
                    }
                    else {
                        if (((Number(irqline) === Number(1)) ? 1 : 0)) {
                            if (((Number(state) === Number(0)) ? 1 : 0)) {
                                if ((((((members.m_fcw ?? 0)) & (4096))) ? 0 : 1)) {
                                    members.m_irq_req = ((((members.m_irq_req) & (-5))) & 0xff);
                                }
                            }
                            else {
                                if ((((members.m_fcw ?? 0)) & (4096))) {
                                    members.m_irq_req = ((((members.m_irq_req) | (4))) & 0xff);
                                }
                            }
                        }
                        else {
                            if (((Number(state) === Number(0)) ? 1 : 0)) {
                                members.m_irq_req = ((((members.m_irq_req) & (-17))) & 0xff);
                            }
                            else {
                                members.m_irq_req = ((((members.m_irq_req) | (16))) & 0xff);
                            }
                        }
                    }
                }
            }
        }
    }
    function method_segtack(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_segtack(runtime, (members.m_iack_in ?? 0)[0]), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container((members.m_iack_in ?? 0)[0], "bind"));
    }
    function __deref_segtack(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_nmiack(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_nmiack(runtime, (members.m_iack_in ?? 0)[1]), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container((members.m_iack_in ?? 0)[1], "bind"));
    }
    function __deref_nmiack(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_nviack(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_nviack(runtime, (members.m_iack_in ?? 0)[2]), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container((members.m_iack_in ?? 0)[2], "bind"));
    }
    function __deref_nviack(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_viack(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_viack(runtime, (members.m_iack_in ?? 0)[3]), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container((members.m_iack_in ?? 0)[3], "bind"));
    }
    function __deref_viack(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_busack(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_busack(runtime, members.m_busack_out), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_busack_out, "bind"));
    }
    function __deref_busack(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_mo(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_mo(runtime, members.m_mo_out), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_mo_out, "bind"));
    }
    function __deref_mo(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_mi_w(runtime, state) {
        const members = runtime.members;
        members.m_mi = ((state) | 0);
    }
    function method_ns(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_ns(runtime, members.m_ns_out), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_ns_out, "bind"));
    }
    function __deref_ns(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_is_ifetch1(runtime) {
        const members = runtime.members;
        return ((((members.m_op_valid ?? 0)) === (0)) ? 1 : 0);
    }
    function method_set_m20_hack(runtime, is_hack) {
        const members = runtime.members;
        members.m_m20_hack = ((is_hack) ? 1 : 0);
    }
    function method_cpu_is_interruptible(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_execute_min_cycles(runtime) {
        const members = runtime.members;
        return ((2) >>> 0);
    }
    function method_execute_max_cycles(runtime) {
        const members = runtime.members;
        return ((744) >>> 0);
    }
    function method_execute_input_edge_triggered(runtime, inputnum) {
        const members = runtime.members;
        return ((Number(inputnum) === Number(-1)) ? 1 : 0);
    }
    function method_z8002_device__segtack(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_z8002_device__segtack(runtime, (members.m_iack_in ?? 0)[0]), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container((members.m_iack_in ?? 0)[0], "bind"));
    }
    function __deref_z8002_device__segtack(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_z8002_device__nmiack(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_z8002_device__nmiack(runtime, (members.m_iack_in ?? 0)[1]), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container((members.m_iack_in ?? 0)[1], "bind"));
    }
    function __deref_z8002_device__nmiack(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_z8002_device__nviack(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_z8002_device__nviack(runtime, (members.m_iack_in ?? 0)[2]), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container((members.m_iack_in ?? 0)[2], "bind"));
    }
    function __deref_z8002_device__nviack(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_z8002_device__viack(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_z8002_device__viack(runtime, (members.m_iack_in ?? 0)[3]), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container((members.m_iack_in ?? 0)[3], "bind"));
    }
    function __deref_z8002_device__viack(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_z8002_device__busack(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_z8002_device__busack(runtime, members.m_busack_out), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_busack_out, "bind"));
    }
    function __deref_z8002_device__busack(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_z8002_device__mo(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_z8002_device__mo(runtime, members.m_mo_out), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_mo_out, "bind"));
    }
    function __deref_z8002_device__mo(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_z8002_device__mi_w(runtime, state) {
        const members = runtime.members;
        members.m_mi = ((state) | 0);
    }
    function method_z8002_device__ns(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_z8002_device__ns(runtime, members.m_ns_out), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_ns_out, "bind"));
    }
    function __deref_z8002_device__ns(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_z8002_device__is_ifetch1(runtime) {
        const members = runtime.members;
        return ((((members.m_op_valid ?? 0)) === (0)) ? 1 : 0);
    }
    function method_z8002_device__set_m20_hack(runtime, is_hack) {
        const members = runtime.members;
        members.m_m20_hack = ((is_hack) ? 1 : 0);
    }
    function method_z8002_device__cpu_is_interruptible(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_z8002_device__execute_min_cycles(runtime) {
        const members = runtime.members;
        return ((2) >>> 0);
    }
    function method_z8002_device__execute_max_cycles(runtime) {
        const members = runtime.members;
        return ((744) >>> 0);
    }
    function method_z8002_device__execute_input_edge_triggered(runtime, inputnum) {
        const members = runtime.members;
        return ((Number(inputnum) === Number(-1)) ? 1 : 0);
    }
    function method___state_read_0(runtime) {
        const members = runtime.members;
        return (members.m_pc ?? 0);
    }
    function method___state_write_0(runtime, value) {
        const members = runtime.members;
        members.m_pc = ((value) >>> 0);
    }
    function method___state_read_1(runtime) {
        const members = runtime.members;
        return (members.m_nspoff ?? 0);
    }
    function method___state_write_1(runtime, value) {
        const members = runtime.members;
        members.m_nspoff = ((value) & 0xffff);
    }
    function method___state_read_2(runtime) {
        const members = runtime.members;
        return (members.m_nspseg ?? 0);
    }
    function method___state_write_2(runtime, value) {
        const members = runtime.members;
        members.m_nspseg = ((value) & 0xffff);
    }
    function method___state_read_3(runtime) {
        const members = runtime.members;
        return (members.m_fcw ?? 0);
    }
    function method___state_write_3(runtime, value) {
        const members = runtime.members;
        members.m_fcw = ((value) & 0xffff);
    }
    function method___state_read_4(runtime) {
        const members = runtime.members;
        return (members.m_psapoff ?? 0);
    }
    function method___state_write_4(runtime, value) {
        const members = runtime.members;
        members.m_psapoff = ((value) & 0xffff);
    }
    function method___state_read_5(runtime) {
        const members = runtime.members;
        return (members.m_psapseg ?? 0);
    }
    function method___state_write_5(runtime, value) {
        const members = runtime.members;
        members.m_psapseg = ((value) & 0xffff);
    }
    function method___state_read_6(runtime) {
        const members = runtime.members;
        return (members.m_refresh ?? 0);
    }
    function method___state_write_6(runtime, value) {
        const members = runtime.members;
        members.m_refresh = ((value) & 0xffff);
    }
    function method___state_read_7(runtime) {
        const members = runtime.members;
        return (members.m_irq_vec ?? 0);
    }
    function method___state_write_7(runtime, value) {
        const members = runtime.members;
        members.m_irq_vec = ((value) & 0xffff);
    }
    function method___state_read_8(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        return h_m_regs.W[method_BYTE4_XOR_BE(runtime, 0)];
    }
    function method___state_write_8(runtime, value) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, 0)] = value;
    }
    function method___state_read_9(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        return h_m_regs.W[method_BYTE4_XOR_BE(runtime, 1)];
    }
    function method___state_write_9(runtime, value) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, 1)] = value;
    }
    function method___state_read_10(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        return h_m_regs.W[method_BYTE4_XOR_BE(runtime, 2)];
    }
    function method___state_write_10(runtime, value) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, 2)] = value;
    }
    function method___state_read_11(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        return h_m_regs.W[method_BYTE4_XOR_BE(runtime, 3)];
    }
    function method___state_write_11(runtime, value) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, 3)] = value;
    }
    function method___state_read_12(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        return h_m_regs.W[method_BYTE4_XOR_BE(runtime, 4)];
    }
    function method___state_write_12(runtime, value) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, 4)] = value;
    }
    function method___state_read_13(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        return h_m_regs.W[method_BYTE4_XOR_BE(runtime, 5)];
    }
    function method___state_write_13(runtime, value) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, 5)] = value;
    }
    function method___state_read_14(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        return h_m_regs.W[method_BYTE4_XOR_BE(runtime, 6)];
    }
    function method___state_write_14(runtime, value) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, 6)] = value;
    }
    function method___state_read_15(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        return h_m_regs.W[method_BYTE4_XOR_BE(runtime, 7)];
    }
    function method___state_write_15(runtime, value) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, 7)] = value;
    }
    function method___state_read_16(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        return h_m_regs.W[method_BYTE4_XOR_BE(runtime, 8)];
    }
    function method___state_write_16(runtime, value) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, 8)] = value;
    }
    function method___state_read_17(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        return h_m_regs.W[method_BYTE4_XOR_BE(runtime, 9)];
    }
    function method___state_write_17(runtime, value) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, 9)] = value;
    }
    function method___state_read_18(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        return h_m_regs.W[method_BYTE4_XOR_BE(runtime, 10)];
    }
    function method___state_write_18(runtime, value) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, 10)] = value;
    }
    function method___state_read_19(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        return h_m_regs.W[method_BYTE4_XOR_BE(runtime, 11)];
    }
    function method___state_write_19(runtime, value) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, 11)] = value;
    }
    function method___state_read_20(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        return h_m_regs.W[method_BYTE4_XOR_BE(runtime, 12)];
    }
    function method___state_write_20(runtime, value) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, 12)] = value;
    }
    function method___state_read_21(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        return h_m_regs.W[method_BYTE4_XOR_BE(runtime, 13)];
    }
    function method___state_write_21(runtime, value) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, 13)] = value;
    }
    function method___state_read_22(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        return h_m_regs.W[method_BYTE4_XOR_BE(runtime, 14)];
    }
    function method___state_write_22(runtime, value) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, 14)] = value;
    }
    function method___state_read_23(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        return h_m_regs.W[method_BYTE4_XOR_BE(runtime, 15)];
    }
    function method___state_write_23(runtime, value) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        h_m_regs.W[method_BYTE4_XOR_BE(runtime, 15)] = value;
    }
    function method___state_read_24(runtime) {
        const members = runtime.members;
        return (members.m_pc ?? 0);
    }
    function method___state_write_24(runtime, value) {
        const members = runtime.members;
        members.m_pc = ((value) >>> 0);
    }
    function method___state_read_25(runtime) {
        const members = runtime.members;
        return (members.m_ppc ?? 0);
    }
    function method___state_write_25(runtime, value) {
        const members = runtime.members;
        members.m_ppc = ((value) >>> 0);
    }
    function method___state_read_26(runtime) {
        const members = runtime.members;
        return (members.m_fcw ?? 0);
    }
    function method___state_write_26(runtime, value) {
        const members = runtime.members;
        members.m_fcw = ((value) & 0xffff);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "get_segmented_mode": method_get_segmented_mode,
        "adjust_addr_for_nonseg_mode": method_adjust_addr_for_nonseg_mode,
        "cycles": method_cycles,
        "make_segmented_addr": method_make_segmented_addr,
        "segmented_addr": method_segmented_addr,
        "addr_from_reg": method_addr_from_reg,
        "BYTE_XOR_BE": method_BYTE_XOR_BE,
        "BYTE4_XOR_BE": method_BYTE4_XOR_BE,
        "set_pc": method_set_pc,
        "zinvalid": method_zinvalid,
        "Z00_0000_dddd_imm8": method_Z00_0000_dddd_imm8,
        "get_operand": method_get_operand,
        "BYTE8_XOR_BE": method_BYTE8_XOR_BE,
        "ADDB": method_ADDB,
        "Z00_ssN0_dddd": method_Z00_ssN0_dddd,
        "RDIR_B": method_RDIR_B,
        "RDMEM_B": method_RDMEM_B,
        "Z01_0000_dddd_imm16": method_Z01_0000_dddd_imm16,
        "ADDW": method_ADDW,
        "Z01_ssN0_dddd": method_Z01_ssN0_dddd,
        "RDIR_W": method_RDIR_W,
        "RDMEM_W": method_RDMEM_W,
        "Z02_0000_dddd_imm8": method_Z02_0000_dddd_imm8,
        "SUBB": method_SUBB,
        "Z02_ssN0_dddd": method_Z02_ssN0_dddd,
        "Z03_0000_dddd_imm16": method_Z03_0000_dddd_imm16,
        "SUBW": method_SUBW,
        "Z03_ssN0_dddd": method_Z03_ssN0_dddd,
        "Z04_0000_dddd_imm8": method_Z04_0000_dddd_imm8,
        "ORB": method_ORB,
        "Z04_ssN0_dddd": method_Z04_ssN0_dddd,
        "Z05_0000_dddd_imm16": method_Z05_0000_dddd_imm16,
        "ORW": method_ORW,
        "Z05_ssN0_dddd": method_Z05_ssN0_dddd,
        "Z06_0000_dddd_imm8": method_Z06_0000_dddd_imm8,
        "ANDB": method_ANDB,
        "Z06_ssN0_dddd": method_Z06_ssN0_dddd,
        "Z07_0000_dddd_imm16": method_Z07_0000_dddd_imm16,
        "ANDW": method_ANDW,
        "Z07_ssN0_dddd": method_Z07_ssN0_dddd,
        "Z08_0000_dddd_imm8": method_Z08_0000_dddd_imm8,
        "XORB": method_XORB,
        "Z08_ssN0_dddd": method_Z08_ssN0_dddd,
        "Z09_0000_dddd_imm16": method_Z09_0000_dddd_imm16,
        "XORW": method_XORW,
        "Z09_ssN0_dddd": method_Z09_ssN0_dddd,
        "Z0A_0000_dddd_imm8": method_Z0A_0000_dddd_imm8,
        "CPB": method_CPB,
        "Z0A_ssN0_dddd": method_Z0A_ssN0_dddd,
        "Z0B_0000_dddd_imm16": method_Z0B_0000_dddd_imm16,
        "CPW": method_CPW,
        "Z0B_ssN0_dddd": method_Z0B_ssN0_dddd,
        "Z0C_ddN0_0000": method_Z0C_ddN0_0000,
        "WRMEM_B": method_WRMEM_B,
        "COMB": method_COMB,
        "Z0C_ddN0_0001_imm8": method_Z0C_ddN0_0001_imm8,
        "Z0C_ddN0_0010": method_Z0C_ddN0_0010,
        "NEGB": method_NEGB,
        "Z0C_ddN0_0100": method_Z0C_ddN0_0100,
        "TESTB": method_TESTB,
        "Z0C_ddN0_0101_imm8": method_Z0C_ddN0_0101_imm8,
        "WRIR_B": method_WRIR_B,
        "Z0C_ddN0_0110": method_Z0C_ddN0_0110,
        "Z0C_ddN0_1000": method_Z0C_ddN0_1000,
        "Z0D_ddN0_0000": method_Z0D_ddN0_0000,
        "WRMEM_W": method_WRMEM_W,
        "COMW": method_COMW,
        "Z0D_ddN0_0001_imm16": method_Z0D_ddN0_0001_imm16,
        "Z0D_ddN0_0010": method_Z0D_ddN0_0010,
        "NEGW": method_NEGW,
        "Z0D_ddN0_0100": method_Z0D_ddN0_0100,
        "TESTW": method_TESTW,
        "Z0D_ddN0_0101_imm16": method_Z0D_ddN0_0101_imm16,
        "WRIR_W": method_WRIR_W,
        "Z0D_ddN0_0110": method_Z0D_ddN0_0110,
        "Z0D_ddN0_1000": method_Z0D_ddN0_1000,
        "Z0D_ddN0_1001_imm16": method_Z0D_ddN0_1001_imm16,
        "PUSHW": method_PUSHW,
        "Z0E_imm8": method_Z0E_imm8,
        "Z0F_imm8": method_Z0F_imm8,
        "Z10_0000_dddd_imm32": method_Z10_0000_dddd_imm32,
        "CPL": method_CPL,
        "Z10_ssN0_dddd": method_Z10_ssN0_dddd,
        "RDIR_L": method_RDIR_L,
        "RDMEM_L": method_RDMEM_L,
        "addr_add": method_addr_add,
        "Z11_ddN0_ssN0": method_Z11_ddN0_ssN0,
        "PUSHL": method_PUSHL,
        "WRIR_L": method_WRIR_L,
        "WRMEM_L": method_WRMEM_L,
        "Z12_0000_dddd_imm32": method_Z12_0000_dddd_imm32,
        "SUBL": method_SUBL,
        "Z12_ssN0_dddd": method_Z12_ssN0_dddd,
        "Z13_ddN0_ssN0": method_Z13_ddN0_ssN0,
        "Z14_0000_dddd_imm32": method_Z14_0000_dddd_imm32,
        "Z14_ssN0_dddd": method_Z14_ssN0_dddd,
        "Z15_ssN0_ddN0": method_Z15_ssN0_ddN0,
        "POPL": method_POPL,
        "Z16_0000_dddd_imm32": method_Z16_0000_dddd_imm32,
        "ADDL": method_ADDL,
        "Z16_ssN0_dddd": method_Z16_ssN0_dddd,
        "Z17_ssN0_ddN0": method_Z17_ssN0_ddN0,
        "POPW": method_POPW,
        "Z18_00N0_dddd_imm32": method_Z18_00N0_dddd_imm32,
        "MULTL": method_MULTL,
        "Z18_ssN0_dddd": method_Z18_ssN0_dddd,
        "Z19_0000_dddd_imm16": method_Z19_0000_dddd_imm16,
        "MULTW": method_MULTW,
        "Z19_ssN0_dddd": method_Z19_ssN0_dddd,
        "Z1A_0000_dddd_imm32": method_Z1A_0000_dddd_imm32,
        "DIVL": method_DIVL,
        "Z1A_ssN0_dddd": method_Z1A_ssN0_dddd,
        "Z1B_0000_dddd_imm16": method_Z1B_0000_dddd_imm16,
        "DIVW": method_DIVW,
        "Z1B_ssN0_dddd": method_Z1B_ssN0_dddd,
        "Z1C_ddN0_1000": method_Z1C_ddN0_1000,
        "TESTL": method_TESTL,
        "Z1C_ddN0_1001_0000_ssss_0000_nmin1": method_Z1C_ddN0_1001_0000_ssss_0000_nmin1,
        "Z1C_ssN0_0001_0000_dddd_0000_nmin1": method_Z1C_ssN0_0001_0000_dddd_0000_nmin1,
        "Z1D_ddN0_ssss": method_Z1D_ddN0_ssss,
        "Z1E_ddN0_cccc": method_Z1E_ddN0_cccc,
        "Z1F_ddN0_0000": method_Z1F_ddN0_0000,
        "Z20_ssN0_dddd": method_Z20_ssN0_dddd,
        "Z21_0000_dddd_imm16": method_Z21_0000_dddd_imm16,
        "Z21_ssN0_dddd": method_Z21_ssN0_dddd,
        "Z22_0000_ssss_0000_dddd_0000_0000": method_Z22_0000_ssss_0000_dddd_0000_0000,
        "Z22_ddN0_imm4": method_Z22_ddN0_imm4,
        "Z23_0000_ssss_0000_dddd_0000_0000": method_Z23_0000_ssss_0000_dddd_0000_0000,
        "Z23_ddN0_imm4": method_Z23_ddN0_imm4,
        "Z24_0000_ssss_0000_dddd_0000_0000": method_Z24_0000_ssss_0000_dddd_0000_0000,
        "Z24_ddN0_imm4": method_Z24_ddN0_imm4,
        "Z25_0000_ssss_0000_dddd_0000_0000": method_Z25_0000_ssss_0000_dddd_0000_0000,
        "Z25_ddN0_imm4": method_Z25_ddN0_imm4,
        "Z26_0000_ssss_0000_dddd_0000_0000": method_Z26_0000_ssss_0000_dddd_0000_0000,
        "Z26_ddN0_imm4": method_Z26_ddN0_imm4,
        "Z27_0000_ssss_0000_dddd_0000_0000": method_Z27_0000_ssss_0000_dddd_0000_0000,
        "Z27_ddN0_imm4": method_Z27_ddN0_imm4,
        "Z28_ddN0_imm4m1": method_Z28_ddN0_imm4m1,
        "INCB": method_INCB,
        "Z29_ddN0_imm4m1": method_Z29_ddN0_imm4m1,
        "INCW": method_INCW,
        "Z2A_ddN0_imm4m1": method_Z2A_ddN0_imm4m1,
        "DECB": method_DECB,
        "Z2B_ddN0_imm4m1": method_Z2B_ddN0_imm4m1,
        "DECW": method_DECW,
        "Z2C_ssN0_dddd": method_Z2C_ssN0_dddd,
        "Z2D_ssN0_dddd": method_Z2D_ssN0_dddd,
        "Z2E_ddN0_ssss": method_Z2E_ddN0_ssss,
        "Z2F_ddN0_ssss": method_Z2F_ddN0_ssss,
        "Z30_0000_dddd_dsp16": method_Z30_0000_dddd_dsp16,
        "Z30_ssN0_dddd_imm16": method_Z30_ssN0_dddd_imm16,
        "RDBX_B": method_RDBX_B,
        "Z31_0000_dddd_dsp16": method_Z31_0000_dddd_dsp16,
        "Z31_ssN0_dddd_imm16": method_Z31_ssN0_dddd_imm16,
        "RDBX_W": method_RDBX_W,
        "Z32_0000_ssss_dsp16": method_Z32_0000_ssss_dsp16,
        "Z32_ddN0_ssss_imm16": method_Z32_ddN0_ssss_imm16,
        "WRBX_B": method_WRBX_B,
        "Z33_0000_ssss_dsp16": method_Z33_0000_ssss_dsp16,
        "Z33_ddN0_ssss_imm16": method_Z33_ddN0_ssss_imm16,
        "WRBX_W": method_WRBX_W,
        "Z34_0000_dddd_dsp16": method_Z34_0000_dddd_dsp16,
        "addr_to_reg": method_addr_to_reg,
        "Z34_ssN0_dddd_imm16": method_Z34_ssN0_dddd_imm16,
        "add_to_addr_reg": method_add_to_addr_reg,
        "Z35_0000_dddd_dsp16": method_Z35_0000_dddd_dsp16,
        "Z35_ssN0_dddd_imm16": method_Z35_ssN0_dddd_imm16,
        "RDBX_L": method_RDBX_L,
        "Z36_0000_0000": method_Z36_0000_0000,
        "Z36_imm8": method_Z36_imm8,
        "Z37_0000_ssss_dsp16": method_Z37_0000_ssss_dsp16,
        "Z37_ddN0_ssss_imm16": method_Z37_ddN0_ssss_imm16,
        "WRBX_L": method_WRBX_L,
        "Z38_imm8": method_Z38_imm8,
        "Z39_ssN0_0000": method_Z39_ssN0_0000,
        "CHANGE_FCW": method_CHANGE_FCW,
        "Z3A_ssss_0000_0000_aaaa_dddd_x000": method_Z3A_ssss_0000_0000_aaaa_dddd_x000,
        "RDPORT_B": method_RDPORT_B,
        "Z3A_ssss_0001_0000_aaaa_dddd_x000": method_Z3A_ssss_0001_0000_aaaa_dddd_x000,
        "Z3A_ssss_0010_0000_aaaa_dddd_x000": method_Z3A_ssss_0010_0000_aaaa_dddd_x000,
        "WRPORT_B": method_WRPORT_B,
        "Z3A_ssss_0011_0000_aaaa_dddd_x000": method_Z3A_ssss_0011_0000_aaaa_dddd_x000,
        "Z3A_dddd_0100_imm16": method_Z3A_dddd_0100_imm16,
        "Z3A_dddd_0101_imm16": method_Z3A_dddd_0101_imm16,
        "Z3A_ssss_0110_imm16": method_Z3A_ssss_0110_imm16,
        "Z3A_ssss_0111_imm16": method_Z3A_ssss_0111_imm16,
        "Z3A_ssss_1000_0000_aaaa_dddd_x000": method_Z3A_ssss_1000_0000_aaaa_dddd_x000,
        "Z3A_ssss_1001_0000_aaaa_dddd_x000": method_Z3A_ssss_1001_0000_aaaa_dddd_x000,
        "Z3A_ssss_1010_0000_aaaa_dddd_x000": method_Z3A_ssss_1010_0000_aaaa_dddd_x000,
        "Z3A_ssss_1011_0000_aaaa_dddd_x000": method_Z3A_ssss_1011_0000_aaaa_dddd_x000,
        "Z3B_ssss_0000_0000_aaaa_dddd_x000": method_Z3B_ssss_0000_0000_aaaa_dddd_x000,
        "RDPORT_W": method_RDPORT_W,
        "swapendian_int16": method_swapendian_int16,
        "Z3B_ssss_0001_0000_aaaa_dddd_x000": method_Z3B_ssss_0001_0000_aaaa_dddd_x000,
        "Z3B_ssss_0010_0000_aaaa_dddd_x000": method_Z3B_ssss_0010_0000_aaaa_dddd_x000,
        "WRPORT_W": method_WRPORT_W,
        "Z3B_ssss_0011_0000_aaaa_dddd_x000": method_Z3B_ssss_0011_0000_aaaa_dddd_x000,
        "Z3B_dddd_0100_imm16": method_Z3B_dddd_0100_imm16,
        "Z3B_dddd_0101_imm16": method_Z3B_dddd_0101_imm16,
        "Z3B_ssss_0110_imm16": method_Z3B_ssss_0110_imm16,
        "Z3B_ssss_0111_imm16": method_Z3B_ssss_0111_imm16,
        "Z3B_ssss_1000_0000_aaaa_dddd_x000": method_Z3B_ssss_1000_0000_aaaa_dddd_x000,
        "Z3B_ssss_1001_0000_aaaa_dddd_x000": method_Z3B_ssss_1001_0000_aaaa_dddd_x000,
        "Z3B_ssss_1010_0000_aaaa_dddd_x000": method_Z3B_ssss_1010_0000_aaaa_dddd_x000,
        "Z3B_ssss_1011_0000_aaaa_dddd_x000": method_Z3B_ssss_1011_0000_aaaa_dddd_x000,
        "Z3C_ssss_dddd": method_Z3C_ssss_dddd,
        "Z3D_ssss_dddd": method_Z3D_ssss_dddd,
        "Z3E_dddd_ssss": method_Z3E_dddd_ssss,
        "Z3F_dddd_ssss": method_Z3F_dddd_ssss,
        "Z40_0000_dddd_addr": method_Z40_0000_dddd_addr,
        "get_addr_operand": method_get_addr_operand,
        "Z40_ssN0_dddd_addr": method_Z40_ssN0_dddd_addr,
        "Z41_0000_dddd_addr": method_Z41_0000_dddd_addr,
        "Z41_ssN0_dddd_addr": method_Z41_ssN0_dddd_addr,
        "Z42_0000_dddd_addr": method_Z42_0000_dddd_addr,
        "Z42_ssN0_dddd_addr": method_Z42_ssN0_dddd_addr,
        "Z43_0000_dddd_addr": method_Z43_0000_dddd_addr,
        "Z43_ssN0_dddd_addr": method_Z43_ssN0_dddd_addr,
        "Z44_0000_dddd_addr": method_Z44_0000_dddd_addr,
        "Z44_ssN0_dddd_addr": method_Z44_ssN0_dddd_addr,
        "Z45_0000_dddd_addr": method_Z45_0000_dddd_addr,
        "Z45_ssN0_dddd_addr": method_Z45_ssN0_dddd_addr,
        "Z46_0000_dddd_addr": method_Z46_0000_dddd_addr,
        "Z46_ssN0_dddd_addr": method_Z46_ssN0_dddd_addr,
        "Z47_0000_dddd_addr": method_Z47_0000_dddd_addr,
        "Z47_ssN0_dddd_addr": method_Z47_ssN0_dddd_addr,
        "Z48_0000_dddd_addr": method_Z48_0000_dddd_addr,
        "Z48_ssN0_dddd_addr": method_Z48_ssN0_dddd_addr,
        "Z49_0000_dddd_addr": method_Z49_0000_dddd_addr,
        "Z49_ssN0_dddd_addr": method_Z49_ssN0_dddd_addr,
        "Z4A_0000_dddd_addr": method_Z4A_0000_dddd_addr,
        "Z4A_ssN0_dddd_addr": method_Z4A_ssN0_dddd_addr,
        "Z4B_0000_dddd_addr": method_Z4B_0000_dddd_addr,
        "Z4B_ssN0_dddd_addr": method_Z4B_ssN0_dddd_addr,
        "Z4C_0000_0000_addr": method_Z4C_0000_0000_addr,
        "Z4C_0000_0001_addr_imm8": method_Z4C_0000_0001_addr_imm8,
        "Z4C_0000_0010_addr": method_Z4C_0000_0010_addr,
        "Z4C_0000_0100_addr": method_Z4C_0000_0100_addr,
        "Z4C_0000_0101_addr_imm8": method_Z4C_0000_0101_addr_imm8,
        "Z4C_0000_0110_addr": method_Z4C_0000_0110_addr,
        "Z4C_0000_1000_addr": method_Z4C_0000_1000_addr,
        "Z4C_ddN0_0000_addr": method_Z4C_ddN0_0000_addr,
        "Z4C_ddN0_0001_addr_imm8": method_Z4C_ddN0_0001_addr_imm8,
        "Z4C_ddN0_0010_addr": method_Z4C_ddN0_0010_addr,
        "Z4C_ddN0_0100_addr": method_Z4C_ddN0_0100_addr,
        "Z4C_ddN0_0101_addr_imm8": method_Z4C_ddN0_0101_addr_imm8,
        "Z4C_ddN0_0110_addr": method_Z4C_ddN0_0110_addr,
        "Z4C_ddN0_1000_addr": method_Z4C_ddN0_1000_addr,
        "Z4D_0000_0000_addr": method_Z4D_0000_0000_addr,
        "Z4D_0000_0001_addr_imm16": method_Z4D_0000_0001_addr_imm16,
        "Z4D_0000_0010_addr": method_Z4D_0000_0010_addr,
        "Z4D_0000_0100_addr": method_Z4D_0000_0100_addr,
        "Z4D_0000_0101_addr_imm16": method_Z4D_0000_0101_addr_imm16,
        "Z4D_0000_0110_addr": method_Z4D_0000_0110_addr,
        "Z4D_0000_1000_addr": method_Z4D_0000_1000_addr,
        "Z4D_ddN0_0000_addr": method_Z4D_ddN0_0000_addr,
        "Z4D_ddN0_0001_addr_imm16": method_Z4D_ddN0_0001_addr_imm16,
        "Z4D_ddN0_0010_addr": method_Z4D_ddN0_0010_addr,
        "Z4D_ddN0_0100_addr": method_Z4D_ddN0_0100_addr,
        "Z4D_ddN0_0101_addr_imm16": method_Z4D_ddN0_0101_addr_imm16,
        "Z4D_ddN0_0110_addr": method_Z4D_ddN0_0110_addr,
        "Z4D_ddN0_1000_addr": method_Z4D_ddN0_1000_addr,
        "Z4E_ddN0_ssN0_addr": method_Z4E_ddN0_ssN0_addr,
        "Z50_0000_dddd_addr": method_Z50_0000_dddd_addr,
        "Z50_ssN0_dddd_addr": method_Z50_ssN0_dddd_addr,
        "Z51_ddN0_0000_addr": method_Z51_ddN0_0000_addr,
        "Z51_ddN0_ssN0_addr": method_Z51_ddN0_ssN0_addr,
        "Z52_0000_dddd_addr": method_Z52_0000_dddd_addr,
        "Z52_ssN0_dddd_addr": method_Z52_ssN0_dddd_addr,
        "Z53_ddN0_0000_addr": method_Z53_ddN0_0000_addr,
        "Z53_ddN0_ssN0_addr": method_Z53_ddN0_ssN0_addr,
        "Z54_0000_dddd_addr": method_Z54_0000_dddd_addr,
        "Z54_ssN0_dddd_addr": method_Z54_ssN0_dddd_addr,
        "Z55_ssN0_0000_addr": method_Z55_ssN0_0000_addr,
        "Z55_ssN0_ddN0_addr": method_Z55_ssN0_ddN0_addr,
        "Z56_0000_dddd_addr": method_Z56_0000_dddd_addr,
        "Z56_ssN0_dddd_addr": method_Z56_ssN0_dddd_addr,
        "Z57_ssN0_0000_addr": method_Z57_ssN0_0000_addr,
        "Z57_ssN0_ddN0_addr": method_Z57_ssN0_ddN0_addr,
        "Z58_0000_dddd_addr": method_Z58_0000_dddd_addr,
        "Z58_ssN0_dddd_addr": method_Z58_ssN0_dddd_addr,
        "Z59_0000_dddd_addr": method_Z59_0000_dddd_addr,
        "Z59_ssN0_dddd_addr": method_Z59_ssN0_dddd_addr,
        "Z5A_0000_dddd_addr": method_Z5A_0000_dddd_addr,
        "Z5A_ssN0_dddd_addr": method_Z5A_ssN0_dddd_addr,
        "Z5B_0000_dddd_addr": method_Z5B_0000_dddd_addr,
        "Z5B_ssN0_dddd_addr": method_Z5B_ssN0_dddd_addr,
        "Z5C_0000_0001_0000_dddd_0000_nmin1_addr": method_Z5C_0000_0001_0000_dddd_0000_nmin1_addr,
        "Z5C_0000_1000_addr": method_Z5C_0000_1000_addr,
        "Z5C_0000_1001_0000_ssss_0000_nmin1_addr": method_Z5C_0000_1001_0000_ssss_0000_nmin1_addr,
        "Z5C_ddN0_1000_addr": method_Z5C_ddN0_1000_addr,
        "Z5C_ddN0_1001_0000_ssN0_0000_nmin1_addr": method_Z5C_ddN0_1001_0000_ssN0_0000_nmin1_addr,
        "Z5C_ssN0_0001_0000_dddd_0000_nmin1_addr": method_Z5C_ssN0_0001_0000_dddd_0000_nmin1_addr,
        "Z5D_0000_ssss_addr": method_Z5D_0000_ssss_addr,
        "Z5D_ddN0_ssss_addr": method_Z5D_ddN0_ssss_addr,
        "Z5E_0000_cccc_addr": method_Z5E_0000_cccc_addr,
        "Z5E_ddN0_cccc_addr": method_Z5E_ddN0_cccc_addr,
        "Z5F_0000_0000_addr": method_Z5F_0000_0000_addr,
        "Z5F_ddN0_0000_addr": method_Z5F_ddN0_0000_addr,
        "Z60_0000_dddd_addr": method_Z60_0000_dddd_addr,
        "Z60_ssN0_dddd_addr": method_Z60_ssN0_dddd_addr,
        "Z61_0000_dddd_addr": method_Z61_0000_dddd_addr,
        "Z61_ssN0_dddd_addr": method_Z61_ssN0_dddd_addr,
        "Z62_0000_imm4_addr": method_Z62_0000_imm4_addr,
        "Z62_ddN0_imm4_addr": method_Z62_ddN0_imm4_addr,
        "Z63_0000_imm4_addr": method_Z63_0000_imm4_addr,
        "Z63_ddN0_imm4_addr": method_Z63_ddN0_imm4_addr,
        "Z64_0000_imm4_addr": method_Z64_0000_imm4_addr,
        "Z64_ddN0_imm4_addr": method_Z64_ddN0_imm4_addr,
        "Z65_0000_imm4_addr": method_Z65_0000_imm4_addr,
        "Z65_ddN0_imm4_addr": method_Z65_ddN0_imm4_addr,
        "Z66_0000_imm4_addr": method_Z66_0000_imm4_addr,
        "Z66_ddN0_imm4_addr": method_Z66_ddN0_imm4_addr,
        "Z67_0000_imm4_addr": method_Z67_0000_imm4_addr,
        "Z67_ddN0_imm4_addr": method_Z67_ddN0_imm4_addr,
        "Z68_0000_imm4m1_addr": method_Z68_0000_imm4m1_addr,
        "Z68_ddN0_imm4m1_addr": method_Z68_ddN0_imm4m1_addr,
        "Z69_0000_imm4m1_addr": method_Z69_0000_imm4m1_addr,
        "Z69_ddN0_imm4m1_addr": method_Z69_ddN0_imm4m1_addr,
        "Z6A_0000_imm4m1_addr": method_Z6A_0000_imm4m1_addr,
        "Z6A_ddN0_imm4m1_addr": method_Z6A_ddN0_imm4m1_addr,
        "Z6B_0000_imm4m1_addr": method_Z6B_0000_imm4m1_addr,
        "Z6B_ddN0_imm4m1_addr": method_Z6B_ddN0_imm4m1_addr,
        "Z6C_0000_dddd_addr": method_Z6C_0000_dddd_addr,
        "Z6C_ssN0_dddd_addr": method_Z6C_ssN0_dddd_addr,
        "Z6D_0000_dddd_addr": method_Z6D_0000_dddd_addr,
        "Z6D_ssN0_dddd_addr": method_Z6D_ssN0_dddd_addr,
        "Z6E_0000_ssss_addr": method_Z6E_0000_ssss_addr,
        "Z6E_ddN0_ssss_addr": method_Z6E_ddN0_ssss_addr,
        "Z6F_0000_ssss_addr": method_Z6F_0000_ssss_addr,
        "Z6F_ddN0_ssss_addr": method_Z6F_ddN0_ssss_addr,
        "Z70_ssN0_dddd_0000_xxxx_0000_0000": method_Z70_ssN0_dddd_0000_xxxx_0000_0000,
        "Z71_ssN0_dddd_0000_xxxx_0000_0000": method_Z71_ssN0_dddd_0000_xxxx_0000_0000,
        "Z72_ddN0_ssss_0000_xxxx_0000_0000": method_Z72_ddN0_ssss_0000_xxxx_0000_0000,
        "Z73_ddN0_ssss_0000_xxxx_0000_0000": method_Z73_ddN0_ssss_0000_xxxx_0000_0000,
        "Z74_ssN0_dddd_0000_xxxx_0000_0000": method_Z74_ssN0_dddd_0000_xxxx_0000_0000,
        "Z75_ssN0_dddd_0000_xxxx_0000_0000": method_Z75_ssN0_dddd_0000_xxxx_0000_0000,
        "Z76_0000_dddd_addr": method_Z76_0000_dddd_addr,
        "get_raw_addr_operand": method_get_raw_addr_operand,
        "Z76_ssN0_dddd_addr": method_Z76_ssN0_dddd_addr,
        "Z77_ddN0_ssss_0000_xxxx_0000_0000": method_Z77_ddN0_ssss_0000_xxxx_0000_0000,
        "Z78_imm8": method_Z78_imm8,
        "Z79_0000_0000_addr": method_Z79_0000_0000_addr,
        "Z79_ssN0_0000_addr": method_Z79_ssN0_0000_addr,
        "Z7A_0000_0000": method_Z7A_0000_0000,
        "Z7B_0000_0000": method_Z7B_0000_0000,
        "Z7B_0000_1000": method_Z7B_0000_1000,
        "Z7B_0000_1001": method_Z7B_0000_1001,
        "Z7B_0000_1010": method_Z7B_0000_1010,
        "Z7B_dddd_1101": method_Z7B_dddd_1101,
        "Z7C_0000_00ii": method_Z7C_0000_00ii,
        "Z7C_0000_01ii": method_Z7C_0000_01ii,
        "Z7D_dddd_0ccc": method_Z7D_dddd_0ccc,
        "Z7D_ssss_1ccc": method_Z7D_ssss_1ccc,
        "Z7E_imm8": method_Z7E_imm8,
        "Z7F_imm8": method_Z7F_imm8,
        "Z80_ssss_dddd": method_Z80_ssss_dddd,
        "Z81_ssss_dddd": method_Z81_ssss_dddd,
        "Z82_ssss_dddd": method_Z82_ssss_dddd,
        "Z83_ssss_dddd": method_Z83_ssss_dddd,
        "Z84_ssss_dddd": method_Z84_ssss_dddd,
        "Z85_ssss_dddd": method_Z85_ssss_dddd,
        "Z86_ssss_dddd": method_Z86_ssss_dddd,
        "Z87_ssss_dddd": method_Z87_ssss_dddd,
        "Z88_ssss_dddd": method_Z88_ssss_dddd,
        "Z89_ssss_dddd": method_Z89_ssss_dddd,
        "Z8A_ssss_dddd": method_Z8A_ssss_dddd,
        "Z8B_ssss_dddd": method_Z8B_ssss_dddd,
        "Z8C_dddd_0000": method_Z8C_dddd_0000,
        "Z8C_dddd_0010": method_Z8C_dddd_0010,
        "Z8C_dddd_0100": method_Z8C_dddd_0100,
        "Z8C_dddd_0110": method_Z8C_dddd_0110,
        "Z8C_dddd_0001": method_Z8C_dddd_0001,
        "Z8C_dddd_1000": method_Z8C_dddd_1000,
        "Z8C_dddd_1001": method_Z8C_dddd_1001,
        "Z8D_0000_0111": method_Z8D_0000_0111,
        "Z8D_dddd_0000": method_Z8D_dddd_0000,
        "Z8D_dddd_0010": method_Z8D_dddd_0010,
        "Z8D_dddd_0100": method_Z8D_dddd_0100,
        "Z8D_dddd_0110": method_Z8D_dddd_0110,
        "Z8D_dddd_1000": method_Z8D_dddd_1000,
        "Z8D_imm4_0001": method_Z8D_imm4_0001,
        "Z8D_imm4_0011": method_Z8D_imm4_0011,
        "Z8D_imm4_0101": method_Z8D_imm4_0101,
        "Z8E_imm8": method_Z8E_imm8,
        "Z8F_imm8": method_Z8F_imm8,
        "Z90_ssss_dddd": method_Z90_ssss_dddd,
        "Z91_ddN0_ssss": method_Z91_ddN0_ssss,
        "Z92_ssss_dddd": method_Z92_ssss_dddd,
        "Z93_ddN0_ssss": method_Z93_ddN0_ssss,
        "Z94_ssss_dddd": method_Z94_ssss_dddd,
        "Z95_ssN0_dddd": method_Z95_ssN0_dddd,
        "Z96_ssss_dddd": method_Z96_ssss_dddd,
        "Z97_ssN0_dddd": method_Z97_ssN0_dddd,
        "Z98_ssss_dddd": method_Z98_ssss_dddd,
        "Z99_ssss_dddd": method_Z99_ssss_dddd,
        "Z9A_ssss_dddd": method_Z9A_ssss_dddd,
        "Z9B_ssss_dddd": method_Z9B_ssss_dddd,
        "Z9C_dddd_1000": method_Z9C_dddd_1000,
        "Z9D_imm8": method_Z9D_imm8,
        "Z9E_0000_cccc": method_Z9E_0000_cccc,
        "Z9F_imm8": method_Z9F_imm8,
        "ZA0_ssss_dddd": method_ZA0_ssss_dddd,
        "ZA1_ssss_dddd": method_ZA1_ssss_dddd,
        "ZA2_dddd_imm4": method_ZA2_dddd_imm4,
        "ZA3_dddd_imm4": method_ZA3_dddd_imm4,
        "ZA4_dddd_imm4": method_ZA4_dddd_imm4,
        "ZA5_dddd_imm4": method_ZA5_dddd_imm4,
        "ZA6_dddd_imm4": method_ZA6_dddd_imm4,
        "ZA7_dddd_imm4": method_ZA7_dddd_imm4,
        "ZA8_dddd_imm4m1": method_ZA8_dddd_imm4m1,
        "ZA9_dddd_imm4m1": method_ZA9_dddd_imm4m1,
        "ZAA_dddd_imm4m1": method_ZAA_dddd_imm4m1,
        "ZAB_dddd_imm4m1": method_ZAB_dddd_imm4m1,
        "ZAC_ssss_dddd": method_ZAC_ssss_dddd,
        "ZAD_ssss_dddd": method_ZAD_ssss_dddd,
        "ZAE_dddd_cccc": method_ZAE_dddd_cccc,
        "ZAF_dddd_cccc": method_ZAF_dddd_cccc,
        "ZB0_dddd_0000": method_ZB0_dddd_0000,
        "ZB1_dddd_0000": method_ZB1_dddd_0000,
        "ZB1_dddd_0111": method_ZB1_dddd_0111,
        "ZB1_dddd_1010": method_ZB1_dddd_1010,
        "ZB2_dddd_0001_imm8": method_ZB2_dddd_0001_imm8,
        "SRLB": method_SRLB,
        "SLLB": method_SLLB,
        "ZB2_dddd_0011_0000_ssss_0000_0000": method_ZB2_dddd_0011_0000_ssss_0000_0000,
        "ZB2_dddd_00I0": method_ZB2_dddd_00I0,
        "RLB": method_RLB,
        "ZB2_dddd_01I0": method_ZB2_dddd_01I0,
        "RRB": method_RRB,
        "ZB2_dddd_1001_imm8": method_ZB2_dddd_1001_imm8,
        "SRAB": method_SRAB,
        "SLAB": method_SLAB,
        "ZB2_dddd_1011_0000_ssss_0000_0000": method_ZB2_dddd_1011_0000_ssss_0000_0000,
        "SDAB": method_SDAB,
        "ZB2_dddd_10I0": method_ZB2_dddd_10I0,
        "RLCB": method_RLCB,
        "ZB2_dddd_11I0": method_ZB2_dddd_11I0,
        "RRCB": method_RRCB,
        "ZB3_dddd_0001_imm8": method_ZB3_dddd_0001_imm8,
        "SRLW": method_SRLW,
        "SLLW": method_SLLW,
        "ZB3_dddd_0011_0000_ssss_0000_0000": method_ZB3_dddd_0011_0000_ssss_0000_0000,
        "SDLW": method_SDLW,
        "ZB3_dddd_00I0": method_ZB3_dddd_00I0,
        "RLW": method_RLW,
        "ZB3_dddd_0101_imm8": method_ZB3_dddd_0101_imm8,
        "SRLL": method_SRLL,
        "SLLL": method_SLLL,
        "ZB3_dddd_0111_0000_ssss_0000_0000": method_ZB3_dddd_0111_0000_ssss_0000_0000,
        "SDLL": method_SDLL,
        "ZB3_dddd_01I0": method_ZB3_dddd_01I0,
        "RRW": method_RRW,
        "ZB3_dddd_1001_imm8": method_ZB3_dddd_1001_imm8,
        "SRAW": method_SRAW,
        "SLAW": method_SLAW,
        "ZB3_dddd_1011_0000_ssss_0000_0000": method_ZB3_dddd_1011_0000_ssss_0000_0000,
        "SDAW": method_SDAW,
        "ZB3_dddd_10I0": method_ZB3_dddd_10I0,
        "RLCW": method_RLCW,
        "ZB3_dddd_1101_imm8": method_ZB3_dddd_1101_imm8,
        "SRAL": method_SRAL,
        "SLAL": method_SLAL,
        "ZB3_dddd_1111_0000_ssss_0000_0000": method_ZB3_dddd_1111_0000_ssss_0000_0000,
        "SDAL": method_SDAL,
        "ZB3_dddd_11I0": method_ZB3_dddd_11I0,
        "RRCW": method_RRCW,
        "ZB4_ssss_dddd": method_ZB4_ssss_dddd,
        "ADCB": method_ADCB,
        "ZB5_ssss_dddd": method_ZB5_ssss_dddd,
        "ADCW": method_ADCW,
        "ZB6_ssss_dddd": method_ZB6_ssss_dddd,
        "SBCB": method_SBCB,
        "ZB7_ssss_dddd": method_ZB7_ssss_dddd,
        "SBCW": method_SBCW,
        "ZB8_ddN0_0010_0000_rrrr_ssN0_0000": method_ZB8_ddN0_0010_0000_rrrr_ssN0_0000,
        "ZB8_ddN0_0110_0000_rrrr_ssN0_1110": method_ZB8_ddN0_0110_0000_rrrr_ssN0_1110,
        "ZB8_ddN0_1010_0000_rrrr_ssN0_0000": method_ZB8_ddN0_1010_0000_rrrr_ssN0_0000,
        "sub_from_addr_reg": method_sub_from_addr_reg,
        "ZB8_ddN0_1110_0000_rrrr_ssN0_1110": method_ZB8_ddN0_1110_0000_rrrr_ssN0_1110,
        "ZB8_ddN0_0000_0000_rrrr_ssN0_0000": method_ZB8_ddN0_0000_0000_rrrr_ssN0_0000,
        "ZB8_ddN0_0100_0000_rrrr_ssN0_0000": method_ZB8_ddN0_0100_0000_rrrr_ssN0_0000,
        "ZB8_ddN0_1000_0000_rrrr_ssN0_0000": method_ZB8_ddN0_1000_0000_rrrr_ssN0_0000,
        "ZB8_ddN0_1100_0000_rrrr_ssN0_0000": method_ZB8_ddN0_1100_0000_rrrr_ssN0_0000,
        "ZB9_imm8": method_ZB9_imm8,
        "ZBA_ssN0_0000_0000_rrrr_dddd_cccc": method_ZBA_ssN0_0000_0000_rrrr_dddd_cccc,
        "ZBA_ssN0_0001_0000_rrrr_ddN0_x000": method_ZBA_ssN0_0001_0000_rrrr_ddN0_x000,
        "ZBA_ssN0_0010_0000_rrrr_ddN0_cccc": method_ZBA_ssN0_0010_0000_rrrr_ddN0_cccc,
        "ZBA_ssN0_0100_0000_rrrr_dddd_cccc": method_ZBA_ssN0_0100_0000_rrrr_dddd_cccc,
        "ZBA_ssN0_0110_0000_rrrr_ddN0_cccc": method_ZBA_ssN0_0110_0000_rrrr_ddN0_cccc,
        "ZBA_ssN0_1000_0000_rrrr_dddd_cccc": method_ZBA_ssN0_1000_0000_rrrr_dddd_cccc,
        "ZBA_ssN0_1001_0000_rrrr_ddN0_x000": method_ZBA_ssN0_1001_0000_rrrr_ddN0_x000,
        "ZBA_ssN0_1010_0000_rrrr_ddN0_cccc": method_ZBA_ssN0_1010_0000_rrrr_ddN0_cccc,
        "ZBA_ssN0_1100_0000_rrrr_dddd_cccc": method_ZBA_ssN0_1100_0000_rrrr_dddd_cccc,
        "ZBA_ssN0_1110_0000_rrrr_ddN0_cccc": method_ZBA_ssN0_1110_0000_rrrr_ddN0_cccc,
        "ZBB_ssN0_0000_0000_rrrr_dddd_cccc": method_ZBB_ssN0_0000_0000_rrrr_dddd_cccc,
        "ZBB_ssN0_0001_0000_rrrr_ddN0_x000": method_ZBB_ssN0_0001_0000_rrrr_ddN0_x000,
        "ZBB_ssN0_0010_0000_rrrr_ddN0_cccc": method_ZBB_ssN0_0010_0000_rrrr_ddN0_cccc,
        "ZBB_ssN0_0100_0000_rrrr_dddd_cccc": method_ZBB_ssN0_0100_0000_rrrr_dddd_cccc,
        "ZBB_ssN0_0110_0000_rrrr_ddN0_cccc": method_ZBB_ssN0_0110_0000_rrrr_ddN0_cccc,
        "ZBB_ssN0_1000_0000_rrrr_dddd_cccc": method_ZBB_ssN0_1000_0000_rrrr_dddd_cccc,
        "ZBB_ssN0_1001_0000_rrrr_ddN0_x000": method_ZBB_ssN0_1001_0000_rrrr_ddN0_x000,
        "ZBB_ssN0_1010_0000_rrrr_ddN0_cccc": method_ZBB_ssN0_1010_0000_rrrr_ddN0_cccc,
        "ZBB_ssN0_1100_0000_rrrr_dddd_cccc": method_ZBB_ssN0_1100_0000_rrrr_dddd_cccc,
        "ZBB_ssN0_1110_0000_rrrr_ddN0_cccc": method_ZBB_ssN0_1110_0000_rrrr_ddN0_cccc,
        "ZBC_aaaa_bbbb": method_ZBC_aaaa_bbbb,
        "ZBD_dddd_imm4": method_ZBD_dddd_imm4,
        "ZBE_aaaa_bbbb": method_ZBE_aaaa_bbbb,
        "ZBF_imm8": method_ZBF_imm8,
        "Z20_0000_dddd_imm8": method_Z20_0000_dddd_imm8,
        "ZC_dddd_imm8": method_ZC_dddd_imm8,
        "ZD_dsp12": method_ZD_dsp12,
        "ZE_cccc_dsp8": method_ZE_cccc_dsp8,
        "ZF_dddd_0dsp7": method_ZF_dddd_0dsp7,
        "addr_sub": method_addr_sub,
        "ZF_dddd_1dsp7": method_ZF_dddd_1dsp7,
        "F_SEG_Z8001": method_F_SEG_Z8001,
        "PSA_ADDR": method_PSA_ADDR,
        "init_tables": method_init_tables,
        "execute_run": method_execute_run,
        "Interrupt": method_Interrupt,
        "get_reset_pc": method_get_reset_pc,
        "PUSH_PC": method_PUSH_PC,
        "GET_PC": method_GET_PC,
        "GET_FCW": method_GET_FCW,
        "read_irq_vector": method_read_irq_vector,
        "RDOP": method_RDOP,
        "execute_set_input": method_execute_set_input,
        "segtack": method_segtack,
        "nmiack": method_nmiack,
        "nviack": method_nviack,
        "viack": method_viack,
        "busack": method_busack,
        "mo": method_mo,
        "mi_w": method_mi_w,
        "ns": method_ns,
        "is_ifetch1": method_is_ifetch1,
        "set_m20_hack": method_set_m20_hack,
        "cpu_is_interruptible": method_cpu_is_interruptible,
        "execute_min_cycles": method_execute_min_cycles,
        "execute_max_cycles": method_execute_max_cycles,
        "execute_input_edge_triggered": method_execute_input_edge_triggered,
        "z8002_device::segtack": method_z8002_device__segtack,
        "z8002_device::nmiack": method_z8002_device__nmiack,
        "z8002_device::nviack": method_z8002_device__nviack,
        "z8002_device::viack": method_z8002_device__viack,
        "z8002_device::busack": method_z8002_device__busack,
        "z8002_device::mo": method_z8002_device__mo,
        "z8002_device::mi_w": method_z8002_device__mi_w,
        "z8002_device::ns": method_z8002_device__ns,
        "z8002_device::is_ifetch1": method_z8002_device__is_ifetch1,
        "z8002_device::set_m20_hack": method_z8002_device__set_m20_hack,
        "z8002_device::cpu_is_interruptible": method_z8002_device__cpu_is_interruptible,
        "z8002_device::execute_min_cycles": method_z8002_device__execute_min_cycles,
        "z8002_device::execute_max_cycles": method_z8002_device__execute_max_cycles,
        "z8002_device::execute_input_edge_triggered": method_z8002_device__execute_input_edge_triggered,
        "__state_read_0": method___state_read_0,
        "__state_write_0": method___state_write_0,
        "__state_read_1": method___state_read_1,
        "__state_write_1": method___state_write_1,
        "__state_read_2": method___state_read_2,
        "__state_write_2": method___state_write_2,
        "__state_read_3": method___state_read_3,
        "__state_write_3": method___state_write_3,
        "__state_read_4": method___state_read_4,
        "__state_write_4": method___state_write_4,
        "__state_read_5": method___state_read_5,
        "__state_write_5": method___state_write_5,
        "__state_read_6": method___state_read_6,
        "__state_write_6": method___state_write_6,
        "__state_read_7": method___state_read_7,
        "__state_write_7": method___state_write_7,
        "__state_read_8": method___state_read_8,
        "__state_write_8": method___state_write_8,
        "__state_read_9": method___state_read_9,
        "__state_write_9": method___state_write_9,
        "__state_read_10": method___state_read_10,
        "__state_write_10": method___state_write_10,
        "__state_read_11": method___state_read_11,
        "__state_write_11": method___state_write_11,
        "__state_read_12": method___state_read_12,
        "__state_write_12": method___state_write_12,
        "__state_read_13": method___state_read_13,
        "__state_write_13": method___state_write_13,
        "__state_read_14": method___state_read_14,
        "__state_write_14": method___state_write_14,
        "__state_read_15": method___state_read_15,
        "__state_write_15": method___state_write_15,
        "__state_read_16": method___state_read_16,
        "__state_write_16": method___state_write_16,
        "__state_read_17": method___state_read_17,
        "__state_write_17": method___state_write_17,
        "__state_read_18": method___state_read_18,
        "__state_write_18": method___state_write_18,
        "__state_read_19": method___state_read_19,
        "__state_write_19": method___state_write_19,
        "__state_read_20": method___state_read_20,
        "__state_write_20": method___state_write_20,
        "__state_read_21": method___state_read_21,
        "__state_write_21": method___state_write_21,
        "__state_read_22": method___state_read_22,
        "__state_write_22": method___state_write_22,
        "__state_read_23": method___state_read_23,
        "__state_write_23": method___state_write_23,
        "__state_read_24": method___state_read_24,
        "__state_write_24": method___state_write_24,
        "__state_read_25": method___state_read_25,
        "__state_write_25": method___state_write_25,
        "__state_read_26": method___state_read_26,
        "__state_write_26": method___state_write_26
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["CALL_METHOD", "m_busack_out", "m_mo_out", "m_ns_out", "standard_irq_callback"];
export const device = definition;
export default device;
