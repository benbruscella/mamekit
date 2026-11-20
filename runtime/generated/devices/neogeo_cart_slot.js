import deviceData from './neogeo_cart_slot.device.ir.json' with { type: 'json' };
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
    function method_is_readable(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_is_writeable(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_is_creatable(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_image_type_name(runtime) {
        const members = runtime.members;
        return "cartridge";
    }
    function method_image_brief_type_name(runtime) {
        const members = runtime.members;
        return "cart";
    }
    function method_get_software_list_loader(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["rom_software_list_loader::instance"];
        return (__L0 ? __L0() : runtime.macro("rom_software_list_loader::instance"));
    }
    function method_device_rom_image_interface__is_readable(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_device_rom_image_interface__is_writeable(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_device_rom_image_interface__is_creatable(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_device_rom_image_interface__image_type_name(runtime) {
        const members = runtime.members;
        return "romimage";
    }
    function method_device_rom_image_interface__image_brief_type_name(runtime) {
        const members = runtime.members;
        return "rom";
    }
    function method_device_cartrom_image_interface__image_type_name(runtime) {
        const members = runtime.members;
        return "cartridge";
    }
    function method_device_cartrom_image_interface__image_brief_type_name(runtime) {
        const members = runtime.members;
        return "cart";
    }
    function method_device_start(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["get_card_device"], __L1 = __l["DYNAMIC_CAST"];
        members.m_cart = (__L1 ? __L1((__L0 ? __L0() : runtime.macro("get_card_device")), "device_neogeo_cart_interface") : runtime.macro("DYNAMIC_CAST", (__L0 ? __L0() : runtime.macro("get_card_device")), "device_neogeo_cart_interface"));
    }
    function method_set_cart_type(runtime, slot) {
        const members = runtime.members;
        members.m_type = ((method_neogeo_get_pcb_id(runtime, slot)) | 0);
    }
    function method_neogeo_get_pcb_id(runtime, slot) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["strcmp"];
        const h_slot_list = members.slot_list ?? 0;
        for (let __range0 = h_slot_list, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
            const __range0_item = runtime.readIndex(__range0, __range0_index);
            if ((((__L0 ? __L0(__range0_item.slot_option, slot) : runtime.macro("strcmp", __range0_item.slot_option, slot))) ? 0 : 1)) {
                return __range0_item.pcb_id;
            }
        }
        return 0;
    }
    function method_call_load(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["loaded_through_softlist"], __L1 = __l["get_feature"], __L2 = __l["get_software_region_length"], __L3 = __l["get_software_region"], __L4 = __l["memcpy"], __L5 = __l["std::error_condition"], __L6 = __l["std::string"], __L7 = __l["std::make_pair"];
        if ((members.m_cart ?? 0)) {
            if ((__L0 ? __L0() : runtime.macro("loaded_through_softlist"))) {
                let ROM16 = runtime.packedView(0, false);
                let ROM8 = 0;
                let len = ((0) >>> 0);
                let pcb_name = (__L1 ? __L1("slot") : runtime.macro("get_feature", "slot"));
                let pcb_name$s = undefined, pcb_name$o = 0;
                if (ArrayBuffer.isView(pcb_name) || Array.isArray(pcb_name))
                    pcb_name$s = pcb_name;
                else if (pcb_name !== null && typeof pcb_name === 'object' && pcb_name.generatedPointer === true && pcb_name.path === undefined && pcb_name.target === undefined && (ArrayBuffer.isView(pcb_name.source) || Array.isArray(pcb_name.source))) {
                    pcb_name$s = pcb_name.source;
                    pcb_name$o = pcb_name.offset;
                }
                if (pcb_name) {
                    method_set_cart_type(runtime, pcb_name);
                }
                len = (((__L2 ? __L2("maincpu") : runtime.macro("get_software_region_length", "maincpu"))) >>> 0);
                (members.m_cart.rom_alloc?.(len) ?? 0);
                ROM16 = runtime.packedView((members.m_cart.get_rom_base?.() ?? 0), false);
                (__L4 ? __L4(ROM16, (__L3 ? __L3("maincpu") : runtime.macro("get_software_region", "maincpu")), len) : runtime.macro("memcpy", ROM16, (__L3 ? __L3("maincpu") : runtime.macro("get_software_region", "maincpu")), len));
                len = (((__L2 ? __L2("fixed") : runtime.macro("get_software_region_length", "fixed"))) >>> 0);
                (members.m_cart.fixed_alloc?.(len) ?? 0);
                ROM8 = (members.m_cart.get_fixed_base?.() ?? 0);
                (__L4 ? __L4(ROM8, (__L3 ? __L3("fixed") : runtime.macro("get_software_region", "fixed")), len) : runtime.macro("memcpy", ROM8, (__L3 ? __L3("fixed") : runtime.macro("get_software_region", "fixed")), len));
                if (((Number((__L3 ? __L3("audiocpu") : runtime.macro("get_software_region", "audiocpu"))) !== Number(0)) ? 1 : 0)) {
                    len = (((__L2 ? __L2("audiocpu") : runtime.macro("get_software_region_length", "audiocpu"))) >>> 0);
                    (members.m_cart.audio_alloc?.(((len) + (65536))) ?? 0);
                    ROM8 = (members.m_cart.get_audio_base?.() ?? 0);
                    (__L4 ? __L4(ROM8, (__L3 ? __L3("audiocpu") : runtime.macro("get_software_region", "audiocpu")), len) : runtime.macro("memcpy", ROM8, (__L3 ? __L3("audiocpu") : runtime.macro("get_software_region", "audiocpu")), len));
                    (__L4 ? __L4(__addr_call_load(runtime, ROM8, 65536), (__L3 ? __L3("audiocpu") : runtime.macro("get_software_region", "audiocpu")), len) : runtime.macro("memcpy", __addr_call_load(runtime, ROM8, 65536), (__L3 ? __L3("audiocpu") : runtime.macro("get_software_region", "audiocpu")), len));
                }
                len = (((__L2 ? __L2("ymsnd:adpcma") : runtime.macro("get_software_region_length", "ymsnd:adpcma"))) >>> 0);
                (members.m_cart.ym_alloc?.(len) ?? 0);
                ROM8 = (members.m_cart.get_ym_base?.() ?? 0);
                (__L4 ? __L4(ROM8, (__L3 ? __L3("ymsnd:adpcma") : runtime.macro("get_software_region", "ymsnd:adpcma")), len) : runtime.macro("memcpy", ROM8, (__L3 ? __L3("ymsnd:adpcma") : runtime.macro("get_software_region", "ymsnd:adpcma")), len));
                if (((Number((__L3 ? __L3("ymsnd:adpcmb") : runtime.macro("get_software_region", "ymsnd:adpcmb"))) !== Number(0)) ? 1 : 0)) {
                    len = (((__L2 ? __L2("ymsnd:adpcmb") : runtime.macro("get_software_region_length", "ymsnd:adpcmb"))) >>> 0);
                    (members.m_cart.ymdelta_alloc?.(len) ?? 0);
                    ROM8 = (members.m_cart.get_ymdelta_base?.() ?? 0);
                    (__L4 ? __L4(ROM8, (__L3 ? __L3("ymsnd:adpcmb") : runtime.macro("get_software_region", "ymsnd:adpcmb")), len) : runtime.macro("memcpy", ROM8, (__L3 ? __L3("ymsnd:adpcmb") : runtime.macro("get_software_region", "ymsnd:adpcmb")), len));
                }
                else {
                }
                len = (((__L2 ? __L2("sprites") : runtime.macro("get_software_region_length", "sprites"))) >>> 0);
                (members.m_cart.sprites_alloc?.(len) ?? 0);
                ROM8 = (members.m_cart.get_sprites_base?.() ?? 0);
                (__L4 ? __L4(ROM8, (__L3 ? __L3("sprites") : runtime.macro("get_software_region", "sprites")), len) : runtime.macro("memcpy", ROM8, (__L3 ? __L3("sprites") : runtime.macro("get_software_region", "sprites")), len));
                if (((Number((__L3 ? __L3("audiocrypt") : runtime.macro("get_software_region", "audiocrypt"))) !== Number(0)) ? 1 : 0)) {
                    len = (((__L2 ? __L2("audiocrypt") : runtime.macro("get_software_region_length", "audiocrypt"))) >>> 0);
                    (members.m_cart.audiocrypt_alloc?.(len) ?? 0);
                    ROM8 = (members.m_cart.get_audiocrypt_base?.() ?? 0);
                    (__L4 ? __L4(ROM8, (__L3 ? __L3("audiocrypt") : runtime.macro("get_software_region", "audiocrypt")), len) : runtime.macro("memcpy", ROM8, (__L3 ? __L3("audiocrypt") : runtime.macro("get_software_region", "audiocrypt")), len));
                    (members.m_cart.audio_alloc?.(((len) + (65536))) ?? 0);
                }
                (members.m_cart.decrypt_all?.(runtime.byteView((members.m_cart.get_rom_base?.() ?? 0)), (members.m_cart.get_rom_size?.() ?? 0), (members.m_cart.get_sprites_base?.() ?? 0), (members.m_cart.get_sprites_size?.() ?? 0), (members.m_cart.get_fixed_base?.() ?? 0), (members.m_cart.get_fixed_size?.() ?? 0), (members.m_cart.get_ym_base?.() ?? 0), (members.m_cart.get_ym_size?.() ?? 0), (members.m_cart.get_ymdelta_base?.() ?? 0), (members.m_cart.get_ymdelta_size?.() ?? 0), (members.m_cart.get_audio_base?.() ?? 0), (members.m_cart.get_audio_size?.() ?? 0), (members.m_cart.get_audiocrypt_base?.() ?? 0), (members.m_cart.get_audiocrypt_size?.() ?? 0)) ?? 0);
                (members.m_cart.optimize_sprites?.((members.m_cart.get_sprites_base?.() ?? 0), (members.m_cart.get_sprites_size?.() ?? 0)) ?? 0);
            }
        }
        return (__L7 ? __L7((__L5 ? __L5() : runtime.macro("std::error_condition")), (__L6 ? __L6() : runtime.macro("std::string"))) : runtime.macro("std::make_pair", (__L5 ? __L5() : runtime.macro("std::error_condition")), (__L6 ? __L6() : runtime.macro("std::string"))));
    }
    function __addr_call_load(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_call_unload(runtime) {
        const members = runtime.members;
    }
    function method_get_default_card_software(runtime, hook) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["software_get_default_slot"];
        return (__L0 ? __L0("rom") : runtime.macro("software_get_default_slot", "rom"));
    }
    function method_rom_r(runtime, offset) {
        const members = runtime.members;
        if ((members.m_cart ?? 0)) {
            return (((members.m_cart.rom_r?.(offset) ?? 0)) & 0xffff);
        }
        else {
            return ((65535) & 0xffff);
        }
    }
    function method_banksel_w(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xffff);
        if ((members.m_cart ?? 0)) {
            (members.m_cart.banksel_w?.(data) ?? 0);
        }
    }
    function method_ram_r(runtime, offset) {
        const members = runtime.members;
        if ((members.m_cart ?? 0)) {
            return (((members.m_cart.ram_r?.(offset) ?? 0)) & 0xffff);
        }
        else {
            return ((65535) & 0xffff);
        }
    }
    function method_ram_w(runtime, offset, data, mem_mask) {
        const members = runtime.members;
        data = ((data) & 0xffff);
        mem_mask = ((mem_mask) & 0xffff);
        if ((members.m_cart ?? 0)) {
            (members.m_cart.ram_w?.(offset, data, mem_mask) ?? 0);
        }
    }
    function method_addon_r(runtime, offset) {
        const members = runtime.members;
        if ((members.m_cart ?? 0)) {
            return (((members.m_cart.addon_r?.(offset) ?? 0)) & 0xffff);
        }
        else {
            return ((65535) & 0xffff);
        }
    }
    function method_protection_r(runtime, space, offset) {
        const members = runtime.members;
        if ((members.m_cart ?? 0)) {
            return (((members.m_cart.protection_r?.(space, offset) ?? 0)) & 0xffff);
        }
        else {
            return ((65535) & 0xffff);
        }
    }
    function method_protection_w(runtime, offset, data, mem_mask) {
        const members = runtime.members;
        data = ((data) & 0xffff);
        mem_mask = ((mem_mask) & 0xffff);
        if ((members.m_cart ?? 0)) {
            (members.m_cart.protection_w?.(offset, data, mem_mask) ?? 0);
        }
    }
    function method_neogeo_cart_slot_device(runtime, mconfig, tag, owner, opts, dflt) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::forward"], __L1 = __l["set_options"];
        (__L1 ? __L1((__L0 ? __L0(opts) : runtime.macro("std::forward", opts)), dflt, 0) : runtime.macro("set_options", (__L0 ? __L0(opts) : runtime.macro("std::forward", opts)), dflt, 0));
    }
    function method_is_reset_on_load(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_image_interface(runtime) {
        const members = runtime.members;
        return "neo_cart";
    }
    function method_file_extensions(runtime) {
        const members = runtime.members;
        return "bin";
    }
    function method_get_type(runtime) {
        const members = runtime.members;
        return (((members.m_type ?? 0)) | 0);
    }
    function method_get_rom_base(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["user_loadable"];
        if ((members.m_cart ?? 0)) {
            if ((((__L0 ? __L0() : runtime.macro("user_loadable"))) ? 0 : 1)) {
                return (members.m_cart.get_region_rom_base?.() ?? 0);
            }
            else {
                return (members.m_cart.get_rom_base?.() ?? 0);
            }
        }
        return 0;
    }
    function method_get_rom_size(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["user_loadable"];
        if ((members.m_cart ?? 0)) {
            if ((((__L0 ? __L0() : runtime.macro("user_loadable"))) ? 0 : 1)) {
                return (((members.m_cart.get_region_rom_size?.() ?? 0)) >>> 0);
            }
            else {
                return (((members.m_cart.get_rom_size?.() ?? 0)) >>> 0);
            }
        }
        return ((0) >>> 0);
    }
    function method_get_fixed_base(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["user_loadable"];
        if ((members.m_cart ?? 0)) {
            if ((((__L0 ? __L0() : runtime.macro("user_loadable"))) ? 0 : 1)) {
                return (members.m_cart.get_region_fixed_base?.() ?? 0);
            }
            else {
                return (members.m_cart.get_fixed_base?.() ?? 0);
            }
        }
        return 0;
    }
    function method_get_fixed_size(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["user_loadable"];
        if ((members.m_cart ?? 0)) {
            if ((((__L0 ? __L0() : runtime.macro("user_loadable"))) ? 0 : 1)) {
                return (((members.m_cart.get_region_fixed_size?.() ?? 0)) >>> 0);
            }
            else {
                return (((members.m_cart.get_fixed_size?.() ?? 0)) >>> 0);
            }
        }
        return ((0) >>> 0);
    }
    function method_get_sprites_base(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["user_loadable"];
        if ((members.m_cart ?? 0)) {
            if ((((__L0 ? __L0() : runtime.macro("user_loadable"))) ? 0 : 1)) {
                return (members.m_cart.get_region_sprites_base?.() ?? 0);
            }
            else {
                return (members.m_cart.get_sprites_base?.() ?? 0);
            }
        }
        return 0;
    }
    function method_get_sprites_size(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["user_loadable"];
        if ((members.m_cart ?? 0)) {
            if ((((__L0 ? __L0() : runtime.macro("user_loadable"))) ? 0 : 1)) {
                return (((members.m_cart.get_region_sprites_size?.() ?? 0)) >>> 0);
            }
            else {
                return (((members.m_cart.get_sprites_size?.() ?? 0)) >>> 0);
            }
        }
        return ((0) >>> 0);
    }
    function method_get_audio_base(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["user_loadable"];
        if ((members.m_cart ?? 0)) {
            if ((((__L0 ? __L0() : runtime.macro("user_loadable"))) ? 0 : 1)) {
                return (members.m_cart.get_region_audio_base?.() ?? 0);
            }
            else {
                return (members.m_cart.get_audio_base?.() ?? 0);
            }
        }
        return 0;
    }
    function method_get_audio_size(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["user_loadable"];
        if ((members.m_cart ?? 0)) {
            if ((((__L0 ? __L0() : runtime.macro("user_loadable"))) ? 0 : 1)) {
                return (((members.m_cart.get_region_audio_size?.() ?? 0)) >>> 0);
            }
            else {
                return (((members.m_cart.get_audio_size?.() ?? 0)) >>> 0);
            }
        }
        return ((0) >>> 0);
    }
    function method_get_audiocrypt_base(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["user_loadable"];
        if ((members.m_cart ?? 0)) {
            if ((((__L0 ? __L0() : runtime.macro("user_loadable"))) ? 0 : 1)) {
                return (members.m_cart.get_region_audiocrypt_base?.() ?? 0);
            }
            else {
                return (members.m_cart.get_audiocrypt_base?.() ?? 0);
            }
        }
        return 0;
    }
    function method_get_audiocrypt_size(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["user_loadable"];
        if ((members.m_cart ?? 0)) {
            if ((((__L0 ? __L0() : runtime.macro("user_loadable"))) ? 0 : 1)) {
                return (((members.m_cart.get_region_audiocrypt_size?.() ?? 0)) >>> 0);
            }
            else {
                return (((members.m_cart.get_audiocrypt_size?.() ?? 0)) >>> 0);
            }
        }
        return ((0) >>> 0);
    }
    function method_get_ym_base(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["user_loadable"];
        if ((members.m_cart ?? 0)) {
            if ((((__L0 ? __L0() : runtime.macro("user_loadable"))) ? 0 : 1)) {
                return (members.m_cart.get_region_ym_base?.() ?? 0);
            }
            else {
                return (members.m_cart.get_ym_base?.() ?? 0);
            }
        }
        return 0;
    }
    function method_get_ym_size(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["user_loadable"];
        if ((members.m_cart ?? 0)) {
            if ((((__L0 ? __L0() : runtime.macro("user_loadable"))) ? 0 : 1)) {
                return (((members.m_cart.get_region_ym_size?.() ?? 0)) >>> 0);
            }
            else {
                return (((members.m_cart.get_ym_size?.() ?? 0)) >>> 0);
            }
        }
        return ((0) >>> 0);
    }
    function method_get_ymdelta_base(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["user_loadable"];
        if ((members.m_cart ?? 0)) {
            if ((((__L0 ? __L0() : runtime.macro("user_loadable"))) ? 0 : 1)) {
                return (members.m_cart.get_region_ymdelta_base?.() ?? 0);
            }
            else {
                return (members.m_cart.get_ymdelta_base?.() ?? 0);
            }
        }
        return 0;
    }
    function method_get_ymdelta_size(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["user_loadable"];
        if ((members.m_cart ?? 0)) {
            if ((((__L0 ? __L0() : runtime.macro("user_loadable"))) ? 0 : 1)) {
                return (((members.m_cart.get_region_ymdelta_size?.() ?? 0)) >>> 0);
            }
            else {
                return (((members.m_cart.get_ymdelta_size?.() ?? 0)) >>> 0);
            }
        }
        return ((0) >>> 0);
    }
    function method_get_sprites_opt_base(runtime) {
        const members = runtime.members;
        return (((members.m_cart ?? 0)) ? ((members.m_cart.get_sprites_opt_base?.() ?? 0)) : (0));
    }
    function method_get_sprites_opt_size(runtime) {
        const members = runtime.members;
        return (((((members.m_cart ?? 0)) ? ((members.m_cart.get_sprites_opt_size?.() ?? 0)) : (0))) >>> 0);
    }
    function method_get_fixed_bank_type(runtime) {
        const members = runtime.members;
        return (((((members.m_cart ?? 0)) ? ((members.m_cart.get_fixed_bank_type?.() ?? 0)) : (0))) | 0);
    }
    function method_get_bank_base(runtime, sel) {
        const members = runtime.members;
        sel = ((sel) & 0xffff);
        return (((((members.m_cart ?? 0)) ? ((members.m_cart.get_bank_base?.(sel) ?? 0)) : (0))) >>> 0);
    }
    function method_get_special_bank(runtime) {
        const members = runtime.members;
        return (((((members.m_cart ?? 0)) ? ((members.m_cart.get_special_bank?.() ?? 0)) : (0))) >>> 0);
    }
    function method_get_helper(runtime) {
        const members = runtime.members;
        return (((((members.m_cart ?? 0)) ? ((members.m_cart.get_helper?.() ?? 0)) : (0))) & 0xffff);
    }
    function method_late_decrypt_all(runtime) {
        const members = runtime.members;
        if ((members.m_cart ?? 0)) {
            (members.m_cart.decrypt_all?.(runtime.byteView(method_get_rom_base(runtime)), method_get_rom_size(runtime), method_get_sprites_base(runtime), method_get_sprites_size(runtime), method_get_fixed_base(runtime), method_get_fixed_size(runtime), method_get_ym_base(runtime), method_get_ym_size(runtime), method_get_ymdelta_base(runtime), method_get_ymdelta_size(runtime), method_get_audio_base(runtime), method_get_audio_size(runtime), method_get_audiocrypt_base(runtime), method_get_audiocrypt_size(runtime)) ?? 0);
        }
    }
    function method_neogeo_cart_slot_device__neogeo_cart_slot_device(runtime, mconfig, tag, owner, opts, dflt) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::forward"], __L1 = __l["set_options"];
        (__L1 ? __L1((__L0 ? __L0(opts) : runtime.macro("std::forward", opts)), dflt, 0) : runtime.macro("set_options", (__L0 ? __L0(opts) : runtime.macro("std::forward", opts)), dflt, 0));
    }
    function method_neogeo_cart_slot_device__is_reset_on_load(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_neogeo_cart_slot_device__image_interface(runtime) {
        const members = runtime.members;
        return "neo_cart";
    }
    function method_neogeo_cart_slot_device__file_extensions(runtime) {
        const members = runtime.members;
        return "bin";
    }
    function method_neogeo_cart_slot_device__get_type(runtime) {
        const members = runtime.members;
        return (((members.m_type ?? 0)) | 0);
    }
    function method_neogeo_cart_slot_device__get_rom_base(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["user_loadable"];
        if ((members.m_cart ?? 0)) {
            if ((((__L0 ? __L0() : runtime.macro("user_loadable"))) ? 0 : 1)) {
                return (members.m_cart.get_region_rom_base?.() ?? 0);
            }
            else {
                return (members.m_cart.get_rom_base?.() ?? 0);
            }
        }
        return 0;
    }
    function method_neogeo_cart_slot_device__get_rom_size(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["user_loadable"];
        if ((members.m_cart ?? 0)) {
            if ((((__L0 ? __L0() : runtime.macro("user_loadable"))) ? 0 : 1)) {
                return (((members.m_cart.get_region_rom_size?.() ?? 0)) >>> 0);
            }
            else {
                return (((members.m_cart.get_rom_size?.() ?? 0)) >>> 0);
            }
        }
        return ((0) >>> 0);
    }
    function method_neogeo_cart_slot_device__get_fixed_base(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["user_loadable"];
        if ((members.m_cart ?? 0)) {
            if ((((__L0 ? __L0() : runtime.macro("user_loadable"))) ? 0 : 1)) {
                return (members.m_cart.get_region_fixed_base?.() ?? 0);
            }
            else {
                return (members.m_cart.get_fixed_base?.() ?? 0);
            }
        }
        return 0;
    }
    function method_neogeo_cart_slot_device__get_fixed_size(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["user_loadable"];
        if ((members.m_cart ?? 0)) {
            if ((((__L0 ? __L0() : runtime.macro("user_loadable"))) ? 0 : 1)) {
                return (((members.m_cart.get_region_fixed_size?.() ?? 0)) >>> 0);
            }
            else {
                return (((members.m_cart.get_fixed_size?.() ?? 0)) >>> 0);
            }
        }
        return ((0) >>> 0);
    }
    function method_neogeo_cart_slot_device__get_sprites_base(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["user_loadable"];
        if ((members.m_cart ?? 0)) {
            if ((((__L0 ? __L0() : runtime.macro("user_loadable"))) ? 0 : 1)) {
                return (members.m_cart.get_region_sprites_base?.() ?? 0);
            }
            else {
                return (members.m_cart.get_sprites_base?.() ?? 0);
            }
        }
        return 0;
    }
    function method_neogeo_cart_slot_device__get_sprites_size(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["user_loadable"];
        if ((members.m_cart ?? 0)) {
            if ((((__L0 ? __L0() : runtime.macro("user_loadable"))) ? 0 : 1)) {
                return (((members.m_cart.get_region_sprites_size?.() ?? 0)) >>> 0);
            }
            else {
                return (((members.m_cart.get_sprites_size?.() ?? 0)) >>> 0);
            }
        }
        return ((0) >>> 0);
    }
    function method_neogeo_cart_slot_device__get_audio_base(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["user_loadable"];
        if ((members.m_cart ?? 0)) {
            if ((((__L0 ? __L0() : runtime.macro("user_loadable"))) ? 0 : 1)) {
                return (members.m_cart.get_region_audio_base?.() ?? 0);
            }
            else {
                return (members.m_cart.get_audio_base?.() ?? 0);
            }
        }
        return 0;
    }
    function method_neogeo_cart_slot_device__get_audio_size(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["user_loadable"];
        if ((members.m_cart ?? 0)) {
            if ((((__L0 ? __L0() : runtime.macro("user_loadable"))) ? 0 : 1)) {
                return (((members.m_cart.get_region_audio_size?.() ?? 0)) >>> 0);
            }
            else {
                return (((members.m_cart.get_audio_size?.() ?? 0)) >>> 0);
            }
        }
        return ((0) >>> 0);
    }
    function method_neogeo_cart_slot_device__get_audiocrypt_base(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["user_loadable"];
        if ((members.m_cart ?? 0)) {
            if ((((__L0 ? __L0() : runtime.macro("user_loadable"))) ? 0 : 1)) {
                return (members.m_cart.get_region_audiocrypt_base?.() ?? 0);
            }
            else {
                return (members.m_cart.get_audiocrypt_base?.() ?? 0);
            }
        }
        return 0;
    }
    function method_neogeo_cart_slot_device__get_audiocrypt_size(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["user_loadable"];
        if ((members.m_cart ?? 0)) {
            if ((((__L0 ? __L0() : runtime.macro("user_loadable"))) ? 0 : 1)) {
                return (((members.m_cart.get_region_audiocrypt_size?.() ?? 0)) >>> 0);
            }
            else {
                return (((members.m_cart.get_audiocrypt_size?.() ?? 0)) >>> 0);
            }
        }
        return ((0) >>> 0);
    }
    function method_neogeo_cart_slot_device__get_ym_base(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["user_loadable"];
        if ((members.m_cart ?? 0)) {
            if ((((__L0 ? __L0() : runtime.macro("user_loadable"))) ? 0 : 1)) {
                return (members.m_cart.get_region_ym_base?.() ?? 0);
            }
            else {
                return (members.m_cart.get_ym_base?.() ?? 0);
            }
        }
        return 0;
    }
    function method_neogeo_cart_slot_device__get_ym_size(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["user_loadable"];
        if ((members.m_cart ?? 0)) {
            if ((((__L0 ? __L0() : runtime.macro("user_loadable"))) ? 0 : 1)) {
                return (((members.m_cart.get_region_ym_size?.() ?? 0)) >>> 0);
            }
            else {
                return (((members.m_cart.get_ym_size?.() ?? 0)) >>> 0);
            }
        }
        return ((0) >>> 0);
    }
    function method_neogeo_cart_slot_device__get_ymdelta_base(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["user_loadable"];
        if ((members.m_cart ?? 0)) {
            if ((((__L0 ? __L0() : runtime.macro("user_loadable"))) ? 0 : 1)) {
                return (members.m_cart.get_region_ymdelta_base?.() ?? 0);
            }
            else {
                return (members.m_cart.get_ymdelta_base?.() ?? 0);
            }
        }
        return 0;
    }
    function method_neogeo_cart_slot_device__get_ymdelta_size(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["user_loadable"];
        if ((members.m_cart ?? 0)) {
            if ((((__L0 ? __L0() : runtime.macro("user_loadable"))) ? 0 : 1)) {
                return (((members.m_cart.get_region_ymdelta_size?.() ?? 0)) >>> 0);
            }
            else {
                return (((members.m_cart.get_ymdelta_size?.() ?? 0)) >>> 0);
            }
        }
        return ((0) >>> 0);
    }
    function method_neogeo_cart_slot_device__get_sprites_opt_base(runtime) {
        const members = runtime.members;
        return (((members.m_cart ?? 0)) ? ((members.m_cart.get_sprites_opt_base?.() ?? 0)) : (0));
    }
    function method_neogeo_cart_slot_device__get_sprites_opt_size(runtime) {
        const members = runtime.members;
        return (((((members.m_cart ?? 0)) ? ((members.m_cart.get_sprites_opt_size?.() ?? 0)) : (0))) >>> 0);
    }
    function method_neogeo_cart_slot_device__get_fixed_bank_type(runtime) {
        const members = runtime.members;
        return (((((members.m_cart ?? 0)) ? ((members.m_cart.get_fixed_bank_type?.() ?? 0)) : (0))) | 0);
    }
    function method_neogeo_cart_slot_device__get_bank_base(runtime, sel) {
        const members = runtime.members;
        sel = ((sel) & 0xffff);
        return (((((members.m_cart ?? 0)) ? ((members.m_cart.get_bank_base?.(sel) ?? 0)) : (0))) >>> 0);
    }
    function method_neogeo_cart_slot_device__get_special_bank(runtime) {
        const members = runtime.members;
        return (((((members.m_cart ?? 0)) ? ((members.m_cart.get_special_bank?.() ?? 0)) : (0))) >>> 0);
    }
    function method_neogeo_cart_slot_device__get_helper(runtime) {
        const members = runtime.members;
        return (((((members.m_cart ?? 0)) ? ((members.m_cart.get_helper?.() ?? 0)) : (0))) & 0xffff);
    }
    function method_neogeo_cart_slot_device__late_decrypt_all(runtime) {
        const members = runtime.members;
        if ((members.m_cart ?? 0)) {
            (members.m_cart.decrypt_all?.(runtime.byteView(method_get_rom_base(runtime)), method_get_rom_size(runtime), method_get_sprites_base(runtime), method_get_sprites_size(runtime), method_get_fixed_base(runtime), method_get_fixed_size(runtime), method_get_ym_base(runtime), method_get_ym_size(runtime), method_get_ymdelta_base(runtime), method_get_ymdelta_size(runtime), method_get_audio_base(runtime), method_get_audio_size(runtime), method_get_audiocrypt_base(runtime), method_get_audiocrypt_size(runtime)) ?? 0);
        }
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "is_readable": method_is_readable,
        "is_writeable": method_is_writeable,
        "is_creatable": method_is_creatable,
        "image_type_name": method_image_type_name,
        "image_brief_type_name": method_image_brief_type_name,
        "get_software_list_loader": method_get_software_list_loader,
        "device_rom_image_interface::is_readable": method_device_rom_image_interface__is_readable,
        "device_rom_image_interface::is_writeable": method_device_rom_image_interface__is_writeable,
        "device_rom_image_interface::is_creatable": method_device_rom_image_interface__is_creatable,
        "device_rom_image_interface::image_type_name": method_device_rom_image_interface__image_type_name,
        "device_rom_image_interface::image_brief_type_name": method_device_rom_image_interface__image_brief_type_name,
        "device_cartrom_image_interface::image_type_name": method_device_cartrom_image_interface__image_type_name,
        "device_cartrom_image_interface::image_brief_type_name": method_device_cartrom_image_interface__image_brief_type_name,
        "device_start": method_device_start,
        "set_cart_type": method_set_cart_type,
        "neogeo_get_pcb_id": method_neogeo_get_pcb_id,
        "call_load": method_call_load,
        "call_unload": method_call_unload,
        "get_default_card_software": method_get_default_card_software,
        "rom_r": method_rom_r,
        "banksel_w": method_banksel_w,
        "ram_r": method_ram_r,
        "ram_w": method_ram_w,
        "addon_r": method_addon_r,
        "protection_r": method_protection_r,
        "protection_w": method_protection_w,
        "neogeo_cart_slot_device": method_neogeo_cart_slot_device,
        "is_reset_on_load": method_is_reset_on_load,
        "image_interface": method_image_interface,
        "file_extensions": method_file_extensions,
        "get_type": method_get_type,
        "get_rom_base": method_get_rom_base,
        "get_rom_size": method_get_rom_size,
        "get_fixed_base": method_get_fixed_base,
        "get_fixed_size": method_get_fixed_size,
        "get_sprites_base": method_get_sprites_base,
        "get_sprites_size": method_get_sprites_size,
        "get_audio_base": method_get_audio_base,
        "get_audio_size": method_get_audio_size,
        "get_audiocrypt_base": method_get_audiocrypt_base,
        "get_audiocrypt_size": method_get_audiocrypt_size,
        "get_ym_base": method_get_ym_base,
        "get_ym_size": method_get_ym_size,
        "get_ymdelta_base": method_get_ymdelta_base,
        "get_ymdelta_size": method_get_ymdelta_size,
        "get_sprites_opt_base": method_get_sprites_opt_base,
        "get_sprites_opt_size": method_get_sprites_opt_size,
        "get_fixed_bank_type": method_get_fixed_bank_type,
        "get_bank_base": method_get_bank_base,
        "get_special_bank": method_get_special_bank,
        "get_helper": method_get_helper,
        "late_decrypt_all": method_late_decrypt_all,
        "neogeo_cart_slot_device::neogeo_cart_slot_device": method_neogeo_cart_slot_device__neogeo_cart_slot_device,
        "neogeo_cart_slot_device::is_reset_on_load": method_neogeo_cart_slot_device__is_reset_on_load,
        "neogeo_cart_slot_device::image_interface": method_neogeo_cart_slot_device__image_interface,
        "neogeo_cart_slot_device::file_extensions": method_neogeo_cart_slot_device__file_extensions,
        "neogeo_cart_slot_device::get_type": method_neogeo_cart_slot_device__get_type,
        "neogeo_cart_slot_device::get_rom_base": method_neogeo_cart_slot_device__get_rom_base,
        "neogeo_cart_slot_device::get_rom_size": method_neogeo_cart_slot_device__get_rom_size,
        "neogeo_cart_slot_device::get_fixed_base": method_neogeo_cart_slot_device__get_fixed_base,
        "neogeo_cart_slot_device::get_fixed_size": method_neogeo_cart_slot_device__get_fixed_size,
        "neogeo_cart_slot_device::get_sprites_base": method_neogeo_cart_slot_device__get_sprites_base,
        "neogeo_cart_slot_device::get_sprites_size": method_neogeo_cart_slot_device__get_sprites_size,
        "neogeo_cart_slot_device::get_audio_base": method_neogeo_cart_slot_device__get_audio_base,
        "neogeo_cart_slot_device::get_audio_size": method_neogeo_cart_slot_device__get_audio_size,
        "neogeo_cart_slot_device::get_audiocrypt_base": method_neogeo_cart_slot_device__get_audiocrypt_base,
        "neogeo_cart_slot_device::get_audiocrypt_size": method_neogeo_cart_slot_device__get_audiocrypt_size,
        "neogeo_cart_slot_device::get_ym_base": method_neogeo_cart_slot_device__get_ym_base,
        "neogeo_cart_slot_device::get_ym_size": method_neogeo_cart_slot_device__get_ym_size,
        "neogeo_cart_slot_device::get_ymdelta_base": method_neogeo_cart_slot_device__get_ymdelta_base,
        "neogeo_cart_slot_device::get_ymdelta_size": method_neogeo_cart_slot_device__get_ymdelta_size,
        "neogeo_cart_slot_device::get_sprites_opt_base": method_neogeo_cart_slot_device__get_sprites_opt_base,
        "neogeo_cart_slot_device::get_sprites_opt_size": method_neogeo_cart_slot_device__get_sprites_opt_size,
        "neogeo_cart_slot_device::get_fixed_bank_type": method_neogeo_cart_slot_device__get_fixed_bank_type,
        "neogeo_cart_slot_device::get_bank_base": method_neogeo_cart_slot_device__get_bank_base,
        "neogeo_cart_slot_device::get_special_bank": method_neogeo_cart_slot_device__get_special_bank,
        "neogeo_cart_slot_device::get_helper": method_neogeo_cart_slot_device__get_helper,
        "neogeo_cart_slot_device::late_decrypt_all": method_neogeo_cart_slot_device__late_decrypt_all
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["DYNAMIC_CAST", "get_card_device", "get_feature", "get_software_region", "get_software_region_length", "loaded_through_softlist", "memcpy", "rom_software_list_loader::instance", "set_options", "software_get_default_slot", "std::error_condition", "std::forward", "std::make_pair", "std::string", "strcmp", "user_loadable"];
definition.slot.loadCard = {
    "neogeo_cart_slot/neogeo_rom": () => import("./neogeo_cart_slot/neogeo_rom.js"),
    "neogeo_cart_slot/neogeo_vliner_cart": () => import("./neogeo_cart_slot/neogeo_vliner_cart.js"),
    "neogeo_cart_slot/neogeo_fatfury2_cart": () => import("./neogeo_cart_slot/neogeo_fatfury2_cart.js"),
    "neogeo_cart_slot/neogeo_kof98_cart": () => import("./neogeo_cart_slot/neogeo_kof98_cart.js"),
    "neogeo_cart_slot/neogeo_mslugx_cart": () => import("./neogeo_cart_slot/neogeo_mslugx_cart.js"),
    "neogeo_cart_slot/neogeo_cmc_zupapa_cart": () => import("./neogeo_cart_slot/neogeo_cmc_zupapa_cart.js"),
    "neogeo_cart_slot/neogeo_cmc_mslug3h_cart": () => import("./neogeo_cart_slot/neogeo_cmc_mslug3h_cart.js"),
    "neogeo_cart_slot/neogeo_cmc_ganryu_cart": () => import("./neogeo_cart_slot/neogeo_cmc_ganryu_cart.js"),
    "neogeo_cart_slot/neogeo_cmc_s1945p_cart": () => import("./neogeo_cart_slot/neogeo_cmc_s1945p_cart.js"),
    "neogeo_cart_slot/neogeo_cmc_preisle2_cart": () => import("./neogeo_cart_slot/neogeo_cmc_preisle2_cart.js"),
    "neogeo_cart_slot/neogeo_cmc_bangbead_cart": () => import("./neogeo_cart_slot/neogeo_cmc_bangbead_cart.js"),
    "neogeo_cart_slot/neogeo_cmc_nitd_cart": () => import("./neogeo_cart_slot/neogeo_cmc_nitd_cart.js"),
    "neogeo_cart_slot/neogeo_cmc_sengoku3_cart": () => import("./neogeo_cart_slot/neogeo_cmc_sengoku3_cart.js"),
    "neogeo_cart_slot/neogeo_cmc_kof99k_cart": () => import("./neogeo_cart_slot/neogeo_cmc_kof99k_cart.js"),
    "neogeo_cart_slot/neogeo_cmc_kof2001_cart": () => import("./neogeo_cart_slot/neogeo_cmc_kof2001_cart.js"),
    "neogeo_cart_slot/neogeo_cmc_kof2000n_cart": () => import("./neogeo_cart_slot/neogeo_cmc_kof2000n_cart.js"),
    "neogeo_cart_slot/neogeo_cmc_jockeygp_cart": () => import("./neogeo_cart_slot/neogeo_cmc_jockeygp_cart.js"),
    "neogeo_cart_slot/neogeo_sma_kof99_cart": () => import("./neogeo_cart_slot/neogeo_sma_kof99_cart.js"),
    "neogeo_cart_slot/neogeo_sma_garou_cart": () => import("./neogeo_cart_slot/neogeo_sma_garou_cart.js"),
    "neogeo_cart_slot/neogeo_sma_garouh_cart": () => import("./neogeo_cart_slot/neogeo_sma_garouh_cart.js"),
    "neogeo_cart_slot/neogeo_sma_mslug3_cart": () => import("./neogeo_cart_slot/neogeo_sma_mslug3_cart.js"),
    "neogeo_cart_slot/neogeo_sma_mslug3a_cart": () => import("./neogeo_cart_slot/neogeo_sma_mslug3a_cart.js"),
    "neogeo_cart_slot/neogeo_sma_kof2000_cart": () => import("./neogeo_cart_slot/neogeo_sma_kof2000_cart.js"),
    "neogeo_cart_slot/neogeo_pcm2_mslug4_cart": () => import("./neogeo_cart_slot/neogeo_pcm2_mslug4_cart.js"),
    "neogeo_cart_slot/neogeo_pcm2_rotd_cart": () => import("./neogeo_cart_slot/neogeo_pcm2_rotd_cart.js"),
    "neogeo_cart_slot/neogeo_pcm2_pnyaa_cart": () => import("./neogeo_cart_slot/neogeo_pcm2_pnyaa_cart.js"),
    "neogeo_cart_slot/neogeo_pcm2_ms4plus_cart": () => import("./neogeo_cart_slot/neogeo_pcm2_ms4plus_cart.js"),
    "neogeo_cart_slot/neogeo_k2k2_kof2002_cart": () => import("./neogeo_cart_slot/neogeo_k2k2_kof2002_cart.js"),
    "neogeo_cart_slot/neogeo_k2k2_matrim_cart": () => import("./neogeo_cart_slot/neogeo_k2k2_matrim_cart.js"),
    "neogeo_cart_slot/neogeo_k2k2_samsho5_cart": () => import("./neogeo_cart_slot/neogeo_k2k2_samsho5_cart.js"),
    "neogeo_cart_slot/neogeo_k2k2_samsho5sp_cart": () => import("./neogeo_cart_slot/neogeo_k2k2_samsho5sp_cart.js"),
    "neogeo_cart_slot/neogeo_k2k2_kf2k2pls_cart": () => import("./neogeo_cart_slot/neogeo_k2k2_kf2k2pls_cart.js"),
    "neogeo_cart_slot/neogeo_pvc_mslug5_cart": () => import("./neogeo_cart_slot/neogeo_pvc_mslug5_cart.js"),
    "neogeo_cart_slot/neogeo_pvc_svc_cart": () => import("./neogeo_cart_slot/neogeo_pvc_svc_cart.js"),
    "neogeo_cart_slot/neogeo_pvc_kof2003_cart": () => import("./neogeo_cart_slot/neogeo_pvc_kof2003_cart.js"),
    "neogeo_cart_slot/neogeo_pvc_kof2003h_cart": () => import("./neogeo_cart_slot/neogeo_pvc_kof2003h_cart.js"),
    "neogeo_cart_slot/neogeo_cthd2k3_cart": () => import("./neogeo_cart_slot/neogeo_cthd2k3_cart.js"),
    "neogeo_cart_slot/neogeo_ct2k3sp_cart": () => import("./neogeo_cart_slot/neogeo_ct2k3sp_cart.js"),
    "neogeo_cart_slot/neogeo_ct2k3sa_cart": () => import("./neogeo_cart_slot/neogeo_ct2k3sa_cart.js"),
    "neogeo_cart_slot/neogeo_matrimbl_cart": () => import("./neogeo_cart_slot/neogeo_matrimbl_cart.js"),
    "neogeo_cart_slot/neogeo_svcboot_cart": () => import("./neogeo_cart_slot/neogeo_svcboot_cart.js"),
    "neogeo_cart_slot/neogeo_svcplus_cart": () => import("./neogeo_cart_slot/neogeo_svcplus_cart.js"),
    "neogeo_cart_slot/neogeo_svcplusa_cart": () => import("./neogeo_cart_slot/neogeo_svcplusa_cart.js"),
    "neogeo_cart_slot/neogeo_svcsplus_cart": () => import("./neogeo_cart_slot/neogeo_svcsplus_cart.js"),
    "neogeo_cart_slot/neogeo_kof2002b_cart": () => import("./neogeo_cart_slot/neogeo_kof2002b_cart.js"),
    "neogeo_cart_slot/neogeo_kf2k2mp_cart": () => import("./neogeo_cart_slot/neogeo_kf2k2mp_cart.js"),
    "neogeo_cart_slot/neogeo_kf2k2mp2_cart": () => import("./neogeo_cart_slot/neogeo_kf2k2mp2_cart.js"),
    "neogeo_cart_slot/neogeo_kf2k3bl_cart": () => import("./neogeo_cart_slot/neogeo_kf2k3bl_cart.js"),
    "neogeo_cart_slot/neogeo_kf2k3pl_cart": () => import("./neogeo_cart_slot/neogeo_kf2k3pl_cart.js"),
    "neogeo_cart_slot/neogeo_kf2k3upl_cart": () => import("./neogeo_cart_slot/neogeo_kf2k3upl_cart.js"),
    "neogeo_cart_slot/neogeo_garoubl_cart": () => import("./neogeo_cart_slot/neogeo_garoubl_cart.js"),
    "neogeo_cart_slot/neogeo_kof97oro_cart": () => import("./neogeo_cart_slot/neogeo_kof97oro_cart.js"),
    "neogeo_cart_slot/neogeo_kf10thep_cart": () => import("./neogeo_cart_slot/neogeo_kf10thep_cart.js"),
    "neogeo_cart_slot/neogeo_kf2k5uni_cart": () => import("./neogeo_cart_slot/neogeo_kf2k5uni_cart.js"),
    "neogeo_cart_slot/neogeo_kf2k4se_cart": () => import("./neogeo_cart_slot/neogeo_kf2k4se_cart.js"),
    "neogeo_cart_slot/neogeo_lans2004_cart": () => import("./neogeo_cart_slot/neogeo_lans2004_cart.js"),
    "neogeo_cart_slot/neogeo_samsho5b_cart": () => import("./neogeo_cart_slot/neogeo_samsho5b_cart.js"),
    "neogeo_cart_slot/neogeo_mslug3b6_cart": () => import("./neogeo_cart_slot/neogeo_mslug3b6_cart.js"),
    "neogeo_cart_slot/neogeo_ms5plus_cart": () => import("./neogeo_cart_slot/neogeo_ms5plus_cart.js"),
    "neogeo_cart_slot/neogeo_mslug5b_cart": () => import("./neogeo_cart_slot/neogeo_mslug5b_cart.js"),
    "neogeo_cart_slot/neogeo_kog_cart": () => import("./neogeo_cart_slot/neogeo_kog_cart.js"),
    "neogeo_cart_slot/neogeo_kof10th_cart": () => import("./neogeo_cart_slot/neogeo_kof10th_cart.js"),
    "neogeo_cart_slot/neogeo_sbp_cart": () => import("./neogeo_cart_slot/neogeo_sbp_cart.js"),
};
export const device = definition;
export default device;
