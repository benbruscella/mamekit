import deviceData from './alps_3255190x.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_setup_load_cb(runtime, cb) {
        const members = runtime.members;
        members.m_cur_load_cb = cb;
    }
    function method_setup_unload_cb(runtime, cb) {
        const members = runtime.members;
        members.m_cur_unload_cb = cb;
    }
    function method_setup_index_pulse_cb(runtime, cb) {
        const members = runtime.members;
        members.m_cur_index_pulse_cb = cb;
    }
    function method_setup_ready_cb(runtime, cb) {
        const members = runtime.members;
        members.m_cur_ready_cb = cb;
    }
    function method_setup_wpt_cb(runtime, cb) {
        const members = runtime.members;
        members.m_cur_wpt_cb = cb;
    }
    function method_setup_led_cb(runtime, cb) {
        const members = runtime.members;
        members.m_cur_led_cb = cb;
    }
    function method_add_variant(runtime, variant) {
        const members = runtime.members;
        let actual_variant = ((variant) >>> 0);
        if (((Number((members.m_sectoring_type ?? 0)) === Number(540029256)) ? 1 : 0)) {
            switch (variant) {
                case 1146311507:
                    {
                        actual_variant = ((808538963) >>> 0);
                        break;
                    }
                case 1145328467:
                    {
                        actual_variant = ((808535123) >>> 0);
                        break;
                    }
                case 1146180435:
                    {
                        actual_variant = ((808538451) >>> 0);
                        break;
                    }
                case 1146311492:
                    {
                        actual_variant = ((808538948) >>> 0);
                        break;
                    }
                case 1145328452:
                    {
                        actual_variant = ((808535108) >>> 0);
                        break;
                    }
                case 1146180420:
                    {
                        actual_variant = ((808538436) >>> 0);
                        break;
                    }
            }
        }
        else {
            if (((Number((members.m_sectoring_type ?? 0)) === Number(540422472)) ? 1 : 0)) {
                switch (variant) {
                    case 1146311507:
                        {
                            actual_variant = ((909198419) >>> 0);
                            break;
                        }
                    case 1145328467:
                        {
                            actual_variant = ((909202259) >>> 0);
                            break;
                        }
                    case 1146180435:
                        {
                            actual_variant = ((909201747) >>> 0);
                            break;
                        }
                    case 1146311492:
                        {
                            actual_variant = ((909202244) >>> 0);
                            break;
                        }
                    case 1145328452:
                        {
                            actual_variant = ((909198404) >>> 0);
                            break;
                        }
                    case 1146180420:
                        {
                            actual_variant = ((909201732) >>> 0);
                            break;
                        }
                }
            }
            else {
                if (((Number((members.m_sectoring_type ?? 0)) === Number(540160840)) ? 1 : 0)) {
                    switch (variant) {
                        case 1146311507:
                            {
                                actual_variant = ((842224467) >>> 0);
                                break;
                            }
                        case 1145328467:
                            {
                                actual_variant = ((842220627) >>> 0);
                                break;
                            }
                        case 1146311492:
                            {
                                actual_variant = ((842224452) >>> 0);
                                break;
                            }
                        case 1145328452:
                            {
                                actual_variant = ((842220612) >>> 0);
                                break;
                            }
                    }
                }
            }
        }
        (members.m_variants).push(actual_variant);
    }
    function method_set_rpm(runtime, _rpm) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        if (((Number((members.m_rpm ?? 0)) === Number(_rpm)) ? 1 : 0)) {
            return;
        }
        members.m_rpm = _rpm;
        members.m_rev_time = (__l["attotime::from_double"] ? __l["attotime::from_double"](((60) / ((members.m_rpm ?? 0)))) : runtime.macro("attotime::from_double", ((60) / ((members.m_rpm ?? 0)))));
        members.m_angular_speed = (((((members.m_rpm ?? 0)) / (60))) * (200000000));
    }
    function method_set_sectoring_type(runtime, sectoring_type) {
        const members = runtime.members;
        members.m_sectoring_type = ((sectoring_type) >>> 0);
    }
    function method_get_sectoring_type(runtime) {
        const members = runtime.members;
        return (members.m_sectoring_type ?? 0);
    }
    function method_device_config_complete(runtime) {
        const members = runtime.members;
        members.m_rpm = 0;
        members.m_motor_always_on = ((0) ? 1 : 0);
        members.m_dskchg_writable = ((0) ? 1 : 0);
        members.m_has_trk00_sensor = ((1) ? 1 : 0);
        method_setup_characteristics(runtime);
    }
    function method_setup_characteristics(runtime) {
        const members = runtime.members;
        members.m_form_factor = ((540357173) >>> 0);
        members.m_tracks = ((84) | 0);
        members.m_sides = ((1) | 0);
        method_set_rpm(runtime, 300);
        members.m_cyl = ((34) | 0);
        method_add_variant(runtime, 1146311507);
    }
    function method_device_reset(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        if ((members.m_make_sound ?? 0)) {
            members.m_make_sound = (((__l["m_sound_out.samples_loaded"] ? __l["m_sound_out.samples_loaded"]() : ((members.m_sound_out)?.samples_loaded?.() ?? 0))) ? 1 : 0);
        }
        members.m_revolution_start_time = Infinity;
        members.m_revolution_count = ((0) >>> 0);
        members.m_mon = ((1) | 0);
        method_set_ready(runtime, 1);
        if (((((members.m_motor_always_on ?? 0)) && ((members.m_image ?? 0))) ? 1 : 0)) {
            method_mon_w(runtime, 0);
        }
        method_cache_clear(runtime);
    }
    function method_set_ready(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        if (((Number(state) !== Number((members.m_ready ?? 0))) ? 1 : 0)) {
            members.m_ready = ((state) ? 1 : 0);
            method_check_led(runtime);
            if ((((__l["m_cur_ready_cb.isnull"] ? __l["m_cur_ready_cb.isnull"]() : typeof ((members.m_cur_ready_cb ?? 0))?.isnull === 'function' ? ((members.m_cur_ready_cb ?? 0)).isnull() : ((__l["m_cur_ready_cb.isnull"] ?? globalThis.mamekitMissingCall?.("m_cur_ready_cb.isnull"))?.() ?? 0))) ? 0 : 1)) {
                (__l["m_cur_ready_cb"] ? __l["m_cur_ready_cb"]((members.this ?? 0), (members.m_ready ?? 0)) : runtime.macro("m_cur_ready_cb", (members.this ?? 0), (members.m_ready ?? 0)));
            }
        }
    }
    function method_check_led(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        if ((((__l["m_cur_led_cb.isnull"] ? __l["m_cur_led_cb.isnull"]() : typeof ((members.m_cur_led_cb ?? 0))?.isnull === 'function' ? ((members.m_cur_led_cb ?? 0)).isnull() : ((__l["m_cur_led_cb.isnull"] ?? globalThis.mamekitMissingCall?.("m_cur_led_cb.isnull"))?.() ?? 0))) ? 0 : 1)) {
            (__l["m_cur_led_cb"] ? __l["m_cur_led_cb"]((members.this ?? 0), (((((((Number((members.m_ds ?? 0)) === Number((members.m_drive_index ?? 0))) ? 1 : 0)) && ((((members.m_ready ?? 0)) ? 0 : 1))) ? 1 : 0)) ? (1) : (0))) : runtime.macro("m_cur_led_cb", (members.this ?? 0), (((((((Number((members.m_ds ?? 0)) === Number((members.m_drive_index ?? 0))) ? 1 : 0)) && ((((members.m_ready ?? 0)) ? 0 : 1))) ? 1 : 0)) ? (1) : (0))));
        }
    }
    function method_mon_w(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        if (((Number((members.m_mon ?? 0)) === Number(state)) ? 1 : 0)) {
            return;
        }
        members.m_mon = ((state) | 0);
        if (((((((members.m_mon ?? 0)) ? 0 : 1)) && ((members.m_image ?? 0))) ? 1 : 0)) {
            members.m_revolution_start_time = ((__l["machine().time"] ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0);
            method_cache_clear(runtime);
            if ((members.m_motor_always_on ?? 0)) {
                method_set_ready(runtime, 0);
            }
            else {
                members.m_ready_counter = ((2) | 0);
            }
            method_index_resync(runtime, 0);
        }
        else {
            if ((members.m_image_dirty ?? 0)) {
                (__l["commit_image"] ? __l["commit_image"]() : runtime.macro("commit_image"));
            }
            method_cache_clear(runtime);
            members.m_revolution_start_time = Infinity;
            ((runtime.dereference(members.m_index_timer)).adjust?.(0) ?? 0);
            method_set_ready(runtime, 1);
        }
        if ((members.m_make_sound ?? 0)) {
            (__l["m_sound_out.motor"] ? __l["m_sound_out.motor"](((Number(state) === Number(0)) ? 1 : 0), (__l["exists"] ? __l["exists"]() : runtime.macro("exists"))) : ((members.m_sound_out)?.motor?.(((Number(state) === Number(0)) ? 1 : 0), (__l["exists"] ? __l["exists"]() : runtime.macro("exists"))) ?? 0));
        }
    }
    function method_cache_clear(runtime) {
        const members = runtime.members;
        members.m_cache_start_time = (members.m_cache_end_time = (members.m_cache_weak_start = 0));
        members.m_cache_index = ((0) | 0);
        members.m_cache_entry = ((0) >>> 0);
        members.m_cache_weak = ((0) ? 1 : 0);
    }
    function method_index_resync(runtime, param) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        if ((typeof members.m_revolution_start_time === 'number' ? ((members.m_revolution_start_time) === Infinity ? 1 : 0) : ((runtime.dereference(members.m_revolution_start_time)).is_never?.() ?? 0))) {
            if ((members.m_idx ?? 0)) {
                members.m_idx = ((0) | 0);
                if ((((__l["m_cur_index_pulse_cb.isnull"] ? __l["m_cur_index_pulse_cb.isnull"]() : typeof ((members.m_cur_index_pulse_cb ?? 0))?.isnull === 'function' ? ((members.m_cur_index_pulse_cb ?? 0)).isnull() : ((__l["m_cur_index_pulse_cb.isnull"] ?? globalThis.mamekitMissingCall?.("m_cur_index_pulse_cb.isnull"))?.() ?? 0))) ? 0 : 1)) {
                    (__l["m_cur_index_pulse_cb"] ? __l["m_cur_index_pulse_cb"]((members.this ?? 0), (members.m_idx ?? 0)) : runtime.macro("m_cur_index_pulse_cb", (members.this ?? 0), (members.m_idx ?? 0)));
                }
            }
            return;
        }
        let delta = ((((__l["machine().time"] ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0)) - ((members.m_revolution_start_time ?? 0)));
        while (((Number(delta) >= Number((members.m_rev_time ?? 0))) ? 1 : 0)) {
            delta = ((delta) - ((members.m_rev_time ?? 0)));
            members.m_revolution_start_time = ((members.m_revolution_start_time) + ((members.m_rev_time ?? 0)));
            members.m_revolution_count = ((((members.m_revolution_count) + (1))) >>> 0);
        }
        let position = ((((runtime.add((((typeof delta === 'number' ? (delta) : ((runtime.dereference(delta)).as_double?.() ?? 0))) * ((members.m_angular_speed ?? 0))), 0.5)) | 0)) | 0);
        let last_index = ((0) >>> 0);
        let next_index = ((200000000) >>> 0);
        if ((members.m_image ?? 0)) {
            ((runtime.dereference(members.m_image)).find_index_hole?.(position, last_index, next_index) ?? 0);
        }
        let new_idx = ((((Number(((position) - (last_index))) < Number(2000000)) ? 1 : 0)) | 0);
        if (new_idx) {
            let index_up = ((((last_index) + (2000000))) >>> 0);
            let index_up_time = (__l["attotime::from_double"] ? __l["attotime::from_double"](((index_up) / ((members.m_angular_speed ?? 0)))) : runtime.macro("attotime::from_double", ((index_up) / ((members.m_angular_speed ?? 0)))));
            ((runtime.dereference(members.m_index_timer)).adjust?.(((index_up_time) - (delta))) ?? 0);
        }
        else {
            let next_index_time = ((((Number(next_index) >= Number(200000000)) ? 1 : 0)) ? ((members.m_rev_time ?? 0)) : ((__l["attotime::from_double"] ? __l["attotime::from_double"](((next_index) / ((members.m_angular_speed ?? 0)))) : runtime.macro("attotime::from_double", ((next_index) / ((members.m_angular_speed ?? 0)))))));
            ((runtime.dereference(members.m_index_timer)).adjust?.(((next_index_time) - (delta))) ?? 0);
        }
        if (((Number(new_idx) !== Number((members.m_idx ?? 0))) ? 1 : 0)) {
            members.m_idx = ((new_idx) | 0);
            if (((((members.m_idx ?? 0)) && ((members.m_ready ?? 0))) ? 1 : 0)) {
                members.m_ready_counter = ((((members.m_ready_counter) - (1))) | 0);
                if ((((members.m_ready_counter ?? 0)) ? 0 : 1)) {
                    method_set_ready(runtime, 0);
                }
            }
            if ((((__l["m_cur_index_pulse_cb.isnull"] ? __l["m_cur_index_pulse_cb.isnull"]() : typeof ((members.m_cur_index_pulse_cb ?? 0))?.isnull === 'function' ? ((members.m_cur_index_pulse_cb ?? 0)).isnull() : ((__l["m_cur_index_pulse_cb.isnull"] ?? globalThis.mamekitMissingCall?.("m_cur_index_pulse_cb.isnull"))?.() ?? 0))) ? 0 : 1)) {
                (__l["m_cur_index_pulse_cb"] ? __l["m_cur_index_pulse_cb"]((members.this ?? 0), (members.m_idx ?? 0)) : runtime.macro("m_cur_index_pulse_cb", (members.this ?? 0), (members.m_idx ?? 0)));
            }
        }
    }
    function method_floppy_image_device__device_reset(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        if ((members.m_make_sound ?? 0)) {
            members.m_make_sound = (((__l["m_sound_out.samples_loaded"] ? __l["m_sound_out.samples_loaded"]() : ((members.m_sound_out)?.samples_loaded?.() ?? 0))) ? 1 : 0);
        }
        members.m_revolution_start_time = Infinity;
        members.m_revolution_count = ((0) >>> 0);
        members.m_mon = ((1) | 0);
        method_set_ready(runtime, 1);
        if (((((members.m_motor_always_on ?? 0)) && ((members.m_image ?? 0))) ? 1 : 0)) {
            method_mon_w(runtime, 0);
        }
        method_cache_clear(runtime);
    }
    function method_init_floppy_load(runtime, write_supported) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        method_cache_clear(runtime);
        members.m_revolution_start_time = (((members.m_mon ?? 0)) ? (Infinity) : (((__l["machine().time"] ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0)));
        members.m_revolution_count = ((0) >>> 0);
        method_index_resync(runtime, 0);
        members.m_wpt = ((1) | 0);
        if ((((__l["m_cur_wpt_cb.isnull"] ? __l["m_cur_wpt_cb.isnull"]() : typeof ((members.m_cur_wpt_cb ?? 0))?.isnull === 'function' ? ((members.m_cur_wpt_cb ?? 0)).isnull() : ((__l["m_cur_wpt_cb.isnull"] ?? globalThis.mamekitMissingCall?.("m_cur_wpt_cb.isnull"))?.() ?? 0))) ? 0 : 1)) {
            (__l["m_cur_wpt_cb"] ? __l["m_cur_wpt_cb"]((members.this ?? 0), (members.m_wpt ?? 0)) : runtime.macro("m_cur_wpt_cb", (members.this ?? 0), (members.m_wpt ?? 0)));
        }
        members.m_wpt = ((((((__l["is_readonly"] ? __l["is_readonly"]() : runtime.macro("is_readonly"))) || (((write_supported) ? 0 : 1))) ? 1 : 0)) | 0);
        if ((((__l["m_cur_wpt_cb.isnull"] ? __l["m_cur_wpt_cb.isnull"]() : typeof ((members.m_cur_wpt_cb ?? 0))?.isnull === 'function' ? ((members.m_cur_wpt_cb ?? 0)).isnull() : ((__l["m_cur_wpt_cb.isnull"] ?? globalThis.mamekitMissingCall?.("m_cur_wpt_cb.isnull"))?.() ?? 0))) ? 0 : 1)) {
            (__l["m_cur_wpt_cb"] ? __l["m_cur_wpt_cb"]((members.this ?? 0), (members.m_wpt ?? 0)) : runtime.macro("m_cur_wpt_cb", (members.this ?? 0), (members.m_wpt ?? 0)));
        }
        if ((members.m_motor_always_on ?? 0)) {
            method_mon_w(runtime, 0);
            members.m_ready_counter = ((2) | 0);
        }
        else {
            if ((((members.m_mon ?? 0)) ? 0 : 1)) {
                members.m_ready_counter = ((2) | 0);
            }
        }
        if ((members.m_dskchg_writable ?? 0)) {
            members.m_dskchg = ((1) | 0);
        }
    }
    function method_wpt_r(runtime) {
        const members = runtime.members;
        return ((((members.m_wpt ?? 0)) || ((((members.m_phases ?? 0)) & (2)))) ? 1 : 0);
    }
    function method_floppy_image_device__mon_w(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        if (((Number((members.m_mon ?? 0)) === Number(state)) ? 1 : 0)) {
            return;
        }
        members.m_mon = ((state) | 0);
        if (((((((members.m_mon ?? 0)) ? 0 : 1)) && ((members.m_image ?? 0))) ? 1 : 0)) {
            members.m_revolution_start_time = ((__l["machine().time"] ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0);
            method_cache_clear(runtime);
            if ((members.m_motor_always_on ?? 0)) {
                method_set_ready(runtime, 0);
            }
            else {
                members.m_ready_counter = ((2) | 0);
            }
            method_index_resync(runtime, 0);
        }
        else {
            if ((members.m_image_dirty ?? 0)) {
                (__l["commit_image"] ? __l["commit_image"]() : runtime.macro("commit_image"));
            }
            method_cache_clear(runtime);
            members.m_revolution_start_time = Infinity;
            ((runtime.dereference(members.m_index_timer)).adjust?.(0) ?? 0);
            method_set_ready(runtime, 1);
        }
        if ((members.m_make_sound ?? 0)) {
            (__l["m_sound_out.motor"] ? __l["m_sound_out.motor"](((Number(state) === Number(0)) ? 1 : 0), (__l["exists"] ? __l["exists"]() : runtime.macro("exists"))) : ((members.m_sound_out)?.motor?.(((Number(state) === Number(0)) ? 1 : 0), (__l["exists"] ? __l["exists"]() : runtime.macro("exists"))) ?? 0));
        }
    }
    function method_time_next_index(runtime) {
        const members = runtime.members;
        if ((typeof members.m_revolution_start_time === 'number' ? ((members.m_revolution_start_time) === Infinity ? 1 : 0) : ((runtime.dereference(members.m_revolution_start_time)).is_never?.() ?? 0))) {
            return Infinity;
        }
        return (((members.m_revolution_start_time ?? 0)) + ((members.m_rev_time ?? 0)));
    }
    function method_ready_r(runtime) {
        const members = runtime.members;
        return (members.m_ready ?? 0);
    }
    function method_twosid_r(runtime) {
        const members = runtime.members;
        if ((((members.m_image ?? 0)) ? 0 : 1)) {
            return 0;
        }
        switch ((typeof (runtime.dereference(members.m_image)).get_variant === 'function' ? (runtime.dereference(members.m_image)).get_variant() : typeof (runtime.dereference(members.m_image)).get_variant === 'number' || typeof (runtime.dereference(members.m_image)).get_variant === 'boolean' ? (runtime.dereference(members.m_image)).get_variant : runtime.container(members.m_image, "get_variant"))) {
            case 1146311507:
            case 808538963:
            case 909202259:
            case 842224467:
            case 1145328467:
            case 808535123:
            case 909198419:
            case 842220627:
            case 1146180435:
            case 909201747:
                {
                    return 1;
                }
            case 0:
                {
                    let tracks = ((0) | 0);
                    let heads = ((0) | 0);
                    ((runtime.dereference(members.m_image)).get_actual_geometry?.(tracks, heads) ?? 0);
                    return ((Number(heads) === Number(1)) ? 1 : 0);
                }
            default:
                {
                    return 0;
                }
        }
    }
    function method_floppy_is_hd(runtime) {
        const members = runtime.members;
        if ((((members.m_image ?? 0)) ? 0 : 1)) {
            return 0;
        }
        let variant = (((typeof (runtime.dereference(members.m_image)).get_variant === 'function' ? (runtime.dereference(members.m_image)).get_variant() : typeof (runtime.dereference(members.m_image)).get_variant === 'number' || typeof (runtime.dereference(members.m_image)).get_variant === 'boolean' ? (runtime.dereference(members.m_image)).get_variant : runtime.container(members.m_image, "get_variant"))) >>> 0);
        return ((Number(variant) === Number(1145590596)) ? 1 : 0);
    }
    function method_floppy_is_ed(runtime) {
        const members = runtime.members;
        if ((((members.m_image ?? 0)) ? 0 : 1)) {
            return 0;
        }
        let variant = (((typeof (runtime.dereference(members.m_image)).get_variant === 'function' ? (runtime.dereference(members.m_image)).get_variant() : typeof (runtime.dereference(members.m_image)).get_variant === 'number' || typeof (runtime.dereference(members.m_image)).get_variant === 'boolean' ? (runtime.dereference(members.m_image)).get_variant : runtime.container(members.m_image, "get_variant"))) >>> 0);
        return ((Number(variant) === Number(1145393988)) ? 1 : 0);
    }
    function method_track_changed(runtime) {
        const members = runtime.members;
    }
    function method_floppy_image_device__track_changed(runtime) {
        const members = runtime.members;
    }
    function method_stp_w(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        if (((Number((members.m_stp ?? 0)) !== Number(state)) ? 1 : 0)) {
            method_cache_clear(runtime);
            members.m_stp = ((state) | 0);
            if (((Number((members.m_stp ?? 0)) === Number(0)) ? 1 : 0)) {
                if ((members.m_dir ?? 0)) {
                    members.m_cyl = ((((members.m_cyl) - (1))) | 0);
                }
                else {
                    members.m_cyl = ((((members.m_cyl) + (1))) | 0);
                }
                0;
                if ((members.m_make_sound ?? 0)) {
                    (__l["m_sound_out.step"] ? __l["m_sound_out.step"]((members.m_cyl ?? 0)) : ((members.m_sound_out)?.step?.((members.m_cyl ?? 0)) ?? 0));
                }
                if (((Number((members.m_cyl ?? 0)) < Number(0)) ? 1 : 0)) {
                    members.m_cyl = ((0) | 0);
                }
                else {
                    if (((Number((members.m_cyl ?? 0)) > Number((((members.m_tracks ?? 0)) - (1)))) ? 1 : 0)) {
                        members.m_cyl = (((((members.m_tracks ?? 0)) - (1))) | 0);
                    }
                    else {
                        method_track_changed(runtime);
                    }
                }
                if (((((__l["exists"] ? __l["exists"]() : runtime.macro("exists"))) && ((((members.m_dskchg_writable ?? 0)) ? 0 : 1))) ? 1 : 0)) {
                    if (((Number((members.m_dskchg ?? 0)) === Number(0)) ? 1 : 0)) {
                        members.m_dskchg = ((1) | 0);
                    }
                }
            }
            members.m_subcyl = ((0) | 0);
        }
    }
    function method_seek_phase_w(runtime, _phases) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        members.m_phases = ((_phases) | 0);
        let cur_pos = (((((((members.m_cyl ?? 0)) << (2))) | ((members.m_subcyl ?? 0)))) | 0);
        let req_pos = ((0) | 0);
        switch ((members.m_phases ?? 0)) {
            case 1:
                {
                    req_pos = ((0) | 0);
                    break;
                }
            case 3:
                {
                    req_pos = ((1) | 0);
                    break;
                }
            case 2:
                {
                    req_pos = ((2) | 0);
                    break;
                }
            case 6:
                {
                    req_pos = ((3) | 0);
                    break;
                }
            case 4:
                {
                    req_pos = ((4) | 0);
                    break;
                }
            case 12:
                {
                    req_pos = ((5) | 0);
                    break;
                }
            case 8:
                {
                    req_pos = ((6) | 0);
                    break;
                }
            case 9:
                {
                    req_pos = ((7) | 0);
                    break;
                }
            default:
                {
                    return;
                }
        }
        if (((Number(((((cur_pos) ^ (req_pos))) & (7))) === Number(4)) ? 1 : 0)) {
            return;
        }
        let next_pos = ((((((cur_pos) & (-8))) | (req_pos))) | 0);
        if (((Number(next_pos) < Number(((cur_pos) - (4)))) ? 1 : 0)) {
            next_pos = ((((next_pos) + (8))) | 0);
        }
        else {
            if (((Number(next_pos) > Number(((cur_pos) + (4)))) ? 1 : 0)) {
                next_pos = ((((next_pos) - (8))) | 0);
            }
        }
        if (((Number(next_pos) < Number(0)) ? 1 : 0)) {
            next_pos = ((0) | 0);
        }
        else {
            if (((Number(next_pos) > Number((((((members.m_tracks ?? 0)) - (1))) * (4)))) ? 1 : 0)) {
                next_pos = (((((((members.m_tracks ?? 0)) - (1))) * (4))) | 0);
            }
        }
        members.m_cyl = ((runtime.shiftRight(next_pos, 2)) | 0);
        members.m_subcyl = ((((next_pos) & (3))) | 0);
        method_cache_clear(runtime);
        if (((Number(next_pos) !== Number(cur_pos)) ? 1 : 0)) {
            0;
            if ((members.m_make_sound ?? 0)) {
                (__l["m_sound_out.step"] ? __l["m_sound_out.step"]((members.m_cyl ?? 0), (members.m_subcyl ?? 0)) : ((members.m_sound_out)?.step?.((members.m_cyl ?? 0), (members.m_subcyl ?? 0)) ?? 0));
            }
        }
        if (((((__l["exists"] ? __l["exists"]() : runtime.macro("exists"))) && ((((members.m_dskchg_writable ?? 0)) ? 0 : 1))) ? 1 : 0)) {
            if (((Number((members.m_dskchg ?? 0)) === Number(0)) ? 1 : 0)) {
                members.m_dskchg = ((1) | 0);
            }
        }
    }
    function method_hash32(runtime, a) {
        const members = runtime.members;
        a = ((runtime.add(((a) + (2127912214)), ((a) << (12)))) >>> 0);
        a = ((((((a) ^ (3345072700))) ^ (((a) >>> (19))))) >>> 0);
        a = ((runtime.add(((a) + (374761393)), ((a) << (5)))) >>> 0);
        a = ((((((a) + (3550635116))) ^ (((a) << (9))))) >>> 0);
        a = ((runtime.add(((a) + (4251993797)), ((a) << (3)))) >>> 0);
        a = ((((((a) ^ (3042594569))) ^ (((a) >>> (16))))) >>> 0);
        return a;
    }
    function method_find_position(runtime, base, when) {
        const members = runtime.members;
        base.set((members.m_revolution_start_time ?? 0));
        let delta = ((when) - (base.get()));
        while (((Number(delta) >= Number((members.m_rev_time ?? 0))) ? 1 : 0)) {
            delta = ((delta) - ((members.m_rev_time ?? 0)));
            base.set(((base.get()) + ((members.m_rev_time ?? 0))));
        }
        while (((Number(delta) < Number(0)) ? 1 : 0)) {
            delta = ((delta) + ((members.m_rev_time ?? 0)));
            base.set(((base.get()) - ((members.m_rev_time ?? 0))));
        }
        let res = ((((runtime.add((((typeof delta === 'number' ? (delta) : ((runtime.dereference(delta)).as_double?.() ?? 0))) * ((members.m_angular_speed ?? 0))), 0.5)) >>> 0)) >>> 0);
        if (((Number(res) >= Number(200000000)) ? 1 : 0)) {
            res = ((((res) - (200000000))) >>> 0);
            base.set(((base.get()) + ((members.m_rev_time ?? 0))));
        }
        return res;
    }
    function method_position_to_time(runtime, base, position) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        return runtime.add(base, (__l["attotime::from_double"] ? __l["attotime::from_double"](((position) / ((members.m_angular_speed ?? 0)))) : runtime.macro("attotime::from_double", ((position) / ((members.m_angular_speed ?? 0))))));
    }
    function method_cache_fill_index(runtime, buf, index, base) {
        const members = runtime.members;
        let cells = (((buf).length) | 0);
        members.m_cache_index = ((index.get()) | 0);
        members.m_cache_start_time = method_position_to_time(runtime, base.get(), ((runtime.readIndex(buf, index.get())) & (268435455)));
        members.m_cache_entry = ((runtime.readIndex(buf, (members.m_cache_index ?? 0))) >>> 0);
        index.set(((((index.get()) + (1))) | 0));
        if (((Number(index.get()) >= Number(cells)) ? 1 : 0)) {
            index.set(((0) | 0));
            base.set(((base.get()) + ((members.m_rev_time ?? 0))));
        }
        members.m_cache_end_time = method_position_to_time(runtime, base.get(), ((runtime.readIndex(buf, index.get())) & (268435455)));
    }
    function method_cache_fill(runtime, when) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let buf = ((runtime.dereference(members.m_image)).get_buffer?.((members.m_cyl ?? 0), (members.m_ss ?? 0), (members.m_subcyl ?? 0)) ?? 0);
        let cells = (((buf).length) >>> 0);
        if (((Number(cells) <= Number(1)) ? 1 : 0)) {
            members.m_cache_start_time = 0;
            members.m_cache_end_time = Infinity;
            members.m_cache_index = ((0) | 0);
            members.m_cache_entry = ((((((Number(cells) === Number(1)) ? 1 : 0)) ? (runtime.readIndex(buf, 0)) : (268435456))) >>> 0);
            method_cache_weakness_setup(runtime);
            return;
        }
        let base = 0;
        let position = ((method_find_position(runtime, ({ generatedLValue: true, get: () => base, set: (value) => { base = value; } }), when)) >>> 0);
        let it = (__l["std::upper_bound"] ? __l["std::upper_bound"](runtime.container(buf, "begin"), runtime.container(buf, "end"), position, ((a, b) => {
            return ((Number(a) < Number(((b) & (268435455)))) ? 1 : 0);
        })) : runtime.macro("std::upper_bound", runtime.container(buf, "begin"), runtime.container(buf, "end"), position, ((a, b) => {
            return ((Number(a) < Number(((b) & (268435455)))) ? 1 : 0);
        })));
        let index = ((0) | 0);
        if ((runtime.same(runtime.container(buf, "begin"), it) ? 1 : 0)) {
            base = ((base) - ((members.m_rev_time ?? 0)));
            index = ((runtime.subtract((buf).length, 1)) | 0);
        }
        else {
            index = ((((((runtime.subtract(it, runtime.container(buf, "begin"))) | 0)) - (1))) | 0);
        }
        for (; 1;) {
            method_cache_fill_index(runtime, buf, ({ generatedLValue: true, get: () => index, set: (value) => { index = ((value) | 0); } }), ({ generatedLValue: true, get: () => base, set: (value) => { base = value; } }));
            if (((Number((members.m_cache_end_time ?? 0)) > Number(when)) ? 1 : 0)) {
                method_cache_weakness_setup(runtime);
                break;
            }
        }
    }
    function method_cache_weakness_setup(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_m_amplifier_freakout_time = members.m_amplifier_freakout_time ?? 0;
        let type = (((((members.m_cache_entry ?? 0)) & (4026531840))) >>> 0);
        if ((((((Number(type) === Number(268435456)) ? 1 : 0)) || (((Number(type) === Number(536870912)) ? 1 : 0))) ? 1 : 0)) {
            members.m_cache_weak = ((1) ? 1 : 0);
            members.m_cache_weak_start = (members.m_cache_start_time ?? 0);
            return;
        }
        members.m_cache_weak = ((((((typeof members.m_cache_end_time === 'number' ? ((members.m_cache_end_time) === Infinity ? 1 : 0) : ((runtime.dereference(members.m_cache_end_time)).is_never?.() ?? 0))) || (((Number((((members.m_cache_end_time ?? 0)) - ((members.m_cache_start_time ?? 0)))) >= Number(h_m_amplifier_freakout_time)) ? 1 : 0))) ? 1 : 0)) ? 1 : 0);
        if ((((members.m_cache_weak ?? 0)) ? 0 : 1)) {
            members.m_cache_weak_start = Infinity;
            return;
        }
        members.m_cache_weak_start = (((members.m_cache_start_time ?? 0)) + ((__l["attotime::from_usec"] ? __l["attotime::from_usec"](16) : runtime.macro("attotime::from_usec", 16))));
    }
    function method_get_next_transition(runtime, from_when) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        if (((((((members.m_image ?? 0)) ? 0 : 1)) || ((members.m_mon ?? 0))) ? 1 : 0)) {
            return Infinity;
        }
        if (((((((((Number(from_when) < Number((members.m_cache_start_time ?? 0))) ? 1 : 0)) || ((typeof members.m_cache_start_time === 'number' ? ((members.m_cache_start_time) === 0 ? 1 : 0) : ((runtime.dereference(members.m_cache_start_time)).is_zero?.() ?? 0)))) ? 1 : 0)) || (((((((typeof members.m_cache_end_time === 'number' ? ((members.m_cache_end_time) === Infinity ? 1 : 0) : ((runtime.dereference(members.m_cache_end_time)).is_never?.() ?? 0))) ? 0 : 1)) && (((Number(from_when) >= Number((members.m_cache_end_time ?? 0))) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
            method_cache_fill(runtime, from_when);
        }
        if ((((members.m_cache_weak ?? 0)) ? 0 : 1)) {
            return (members.m_cache_end_time ?? 0);
        }
        let interval_index = ((((Number(from_when) < Number((members.m_cache_weak_start ?? 0))) ? 1 : 0)) ? (0) : ((typeof ((from_when) - ((members.m_cache_weak_start ?? 0))) === 'number' ? runtime.attotime(((from_when) - ((members.m_cache_weak_start ?? 0))), "as_ticks", 250000) : ((runtime.dereference(((from_when) - ((members.m_cache_weak_start ?? 0))))).as_ticks?.(250000) ?? 0))));
        let weak_time = (((members.m_cache_weak_start ?? 0)) + ((__l["attotime::from_ticks"] ? __l["attotime::from_ticks"](runtime.add(((interval_index) * (2)), 1), 500000) : runtime.macro("attotime::from_ticks", runtime.add(((interval_index) * (2)), 1), 500000))));
        for (; 1;) {
            if (((Number(weak_time) >= Number((members.m_cache_end_time ?? 0))) ? 1 : 0)) {
                return (members.m_cache_end_time ?? 0);
            }
            if (((Number(weak_time) > Number(from_when)) ? 1 : 0)) {
                let test = ((method_hash32(runtime, ((method_hash32(runtime, ((method_hash32(runtime, ((method_hash32(runtime, (members.m_revolution_count ?? 0))) ^ (16962)))) + ((members.m_cache_index ?? 0))))) + (interval_index)))) >>> 0);
                if (((test) & (1))) {
                    return weak_time;
                }
            }
            weak_time = ((weak_time) + ((__l["attotime::from_usec"] ? __l["attotime::from_usec"](4) : runtime.macro("attotime::from_usec", 4))));
            interval_index = ((interval_index) + (1));
        }
    }
    function method_writing_disabled(runtime) {
        const members = runtime.members;
        return ((((members.m_wpt ?? 0)) || ((((members.m_phases ?? 0)) & (2)))) ? 1 : 0);
    }
    function method_write_flux(runtime, start, end, transition_count, transitions) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        if (((((((members.m_image ?? 0)) ? 0 : 1)) || ((members.m_mon ?? 0))) ? 1 : 0)) {
            return;
        }
        if (method_writing_disabled(runtime)) {
            return;
        }
        members.m_image_dirty = ((1) ? 1 : 0);
        members.m_track_dirty = ((1) ? 1 : 0);
        method_cache_clear(runtime);
        let wspans = (__l["VECTOR_OF"] ? __l["VECTOR_OF"]("wspan", 1) : runtime.macro("VECTOR_OF", "wspan", 1));
        let base = 0;
        runtime.readIndex(wspans, 0).start = method_find_position(runtime, ({ generatedLValue: true, get: () => base, set: (value) => { base = value; } }), start);
        runtime.readIndex(wspans, 0).end = method_find_position(runtime, ({ generatedLValue: true, get: () => base, set: (value) => { base = value; } }), end);
        for (let i = ((0) | 0); ((Number(i) !== Number(transition_count)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            (runtime.readIndex(wspans, 0).flux_change_positions).push(method_find_position(runtime, ({ generatedLValue: true, get: () => base, set: (value) => { base = value; } }), runtime.readIndex(transitions, i)));
        }
        method_wspan_split_on_wrap(runtime, wspans);
        let buf = ((runtime.dereference(members.m_image)).get_buffer?.((members.m_cyl ?? 0), (members.m_ss ?? 0), (members.m_subcyl ?? 0)) ?? 0);
        if (((buf).length === 0 ? 1 : 0)) {
            (buf).push(268435456);
            (buf).push(1005306367);
        }
        method_wspan_remove_damaged(runtime, wspans, buf);
        method_wspan_write(runtime, wspans, buf);
        method_cache_clear(runtime);
    }
    function method_wspan_split_on_wrap(runtime, wspans) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let ne = (((wspans).length) | 0);
        for (let i = ((0) | 0); ((Number(i) !== Number(ne)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            if (((Number(runtime.readIndex(wspans, i).end) < Number(runtime.readIndex(wspans, i).start)) ? 1 : 0)) {
                (wspans = runtime.resize(wspans, runtime.add((wspans).length, 1)));
                let ws = runtime.readIndex(wspans, i);
                let we = (typeof (runtime.dereference(wspans)).back === 'function' ? (runtime.dereference(wspans)).back() : typeof (runtime.dereference(wspans)).back === 'number' || typeof (runtime.dereference(wspans)).back === 'boolean' ? (runtime.dereference(wspans)).back : runtime.container(wspans, "back"));
                we.start = 0;
                we.end = ws.end;
                ws.end = 200000000;
                let start = ((ws.start) | 0);
                let split_index = ((0) | 0);
                for (split_index = ((0) | 0); ((Number(split_index) !== Number((ws.flux_change_positions).length)) ? 1 : 0); split_index = ((((split_index) + (1))) | 0)) {
                    if (((Number(runtime.readIndex(ws.flux_change_positions, split_index)) < Number(start)) ? 1 : 0)) {
                        break;
                    }
                }
                if (((Number(split_index) === Number(0)) ? 1 : 0)) {
                    (__l["std::swap"] ? __l["std::swap"](ws.flux_change_positions, we.flux_change_positions) : runtime.macro("std::swap", ws.flux_change_positions, we.flux_change_positions));
                }
                else {
                    runtime.resize(we.flux_change_positions, (((ws.flux_change_positions).length) - (split_index)));
                    (__l["std::copy"] ? __l["std::copy"](runtime.addressOf((typeof (runtime.dereference(ws.flux_change_positions)).begin === 'function' ? (runtime.dereference(ws.flux_change_positions)).begin() : typeof (runtime.dereference(ws.flux_change_positions)).begin === 'number' || typeof (runtime.dereference(ws.flux_change_positions)).begin === 'boolean' ? (runtime.dereference(ws.flux_change_positions)).begin : runtime.container(ws.flux_change_positions, "begin")), split_index), (typeof (runtime.dereference(ws.flux_change_positions)).end === 'function' ? (runtime.dereference(ws.flux_change_positions)).end() : typeof (runtime.dereference(ws.flux_change_positions)).end === 'number' || typeof (runtime.dereference(ws.flux_change_positions)).end === 'boolean' ? (runtime.dereference(ws.flux_change_positions)).end : runtime.container(ws.flux_change_positions, "end")), (typeof (runtime.dereference(we.flux_change_positions)).begin === 'function' ? (runtime.dereference(we.flux_change_positions)).begin() : typeof (runtime.dereference(we.flux_change_positions)).begin === 'number' || typeof (runtime.dereference(we.flux_change_positions)).begin === 'boolean' ? (runtime.dereference(we.flux_change_positions)).begin : runtime.container(we.flux_change_positions, "begin"))) : runtime.macro("std::copy", runtime.addressOf((typeof (runtime.dereference(ws.flux_change_positions)).begin === 'function' ? (runtime.dereference(ws.flux_change_positions)).begin() : typeof (runtime.dereference(ws.flux_change_positions)).begin === 'number' || typeof (runtime.dereference(ws.flux_change_positions)).begin === 'boolean' ? (runtime.dereference(ws.flux_change_positions)).begin : runtime.container(ws.flux_change_positions, "begin")), split_index), (typeof (runtime.dereference(ws.flux_change_positions)).end === 'function' ? (runtime.dereference(ws.flux_change_positions)).end() : typeof (runtime.dereference(ws.flux_change_positions)).end === 'number' || typeof (runtime.dereference(ws.flux_change_positions)).end === 'boolean' ? (runtime.dereference(ws.flux_change_positions)).end : runtime.container(ws.flux_change_positions, "end")), (typeof (runtime.dereference(we.flux_change_positions)).begin === 'function' ? (runtime.dereference(we.flux_change_positions)).begin() : typeof (runtime.dereference(we.flux_change_positions)).begin === 'number' || typeof (runtime.dereference(we.flux_change_positions)).begin === 'boolean' ? (runtime.dereference(we.flux_change_positions)).begin : runtime.container(we.flux_change_positions, "begin"))));
                    runtime.vectorMethod(ws.flux_change_positions, "erase", runtime.addressOf((typeof (runtime.dereference(ws.flux_change_positions)).begin === 'function' ? (runtime.dereference(ws.flux_change_positions)).begin() : typeof (runtime.dereference(ws.flux_change_positions)).begin === 'number' || typeof (runtime.dereference(ws.flux_change_positions)).begin === 'boolean' ? (runtime.dereference(ws.flux_change_positions)).begin : runtime.container(ws.flux_change_positions, "begin")), split_index), (typeof (runtime.dereference(ws.flux_change_positions)).end === 'function' ? (runtime.dereference(ws.flux_change_positions)).end() : typeof (runtime.dereference(ws.flux_change_positions)).end === 'number' || typeof (runtime.dereference(ws.flux_change_positions)).end === 'boolean' ? (runtime.dereference(ws.flux_change_positions)).end : runtime.container(ws.flux_change_positions, "end")));
                }
            }
        }
    }
    function method_wspan_remove_damaged(runtime, wspans, track) {
        const members = runtime.members;
        for (let pos = 0; ((Number(pos) !== Number((track).length)) ? 1 : 0); pos = ((pos) + (1))) {
            if (((Number(((runtime.readIndex(track, pos)) & (4026531840))) === Number(536870912)) ? 1 : 0)) {
                let start = ((((runtime.readIndex(track, pos)) & (268435455))) | 0);
                let end = ((((runtime.readIndex(track, ((pos) + (1)))) & (268435455))) | 0);
                let ne = (((wspans).length) | 0);
                for (let i = ((0) | 0); ((Number(i) !== Number(ne)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    if ((((((Number(runtime.readIndex(wspans, i).start) > Number(end)) ? 1 : 0)) || (((Number(runtime.readIndex(wspans, i).end) <= Number(start)) ? 1 : 0))) ? 1 : 0)) {
                        continue;
                    }
                    if ((((((Number(runtime.readIndex(wspans, i).start) >= Number(start)) ? 1 : 0)) && (((Number(((runtime.readIndex(wspans, i).end) - (1))) <= Number(end)) ? 1 : 0))) ? 1 : 0)) {
                        runtime.vectorMethod(wspans, "erase", runtime.addressOf(runtime.container(wspans, "begin"), i));
                        i = ((((i) - (1))) | 0);
                        ne = ((((ne) - (1))) | 0);
                        continue;
                    }
                    if ((((((Number(runtime.readIndex(wspans, i).start) >= Number(start)) ? 1 : 0)) && (((Number(((runtime.readIndex(wspans, i).end) - (1))) > Number(end)) ? 1 : 0))) ? 1 : 0)) {
                        runtime.readIndex(wspans, i).start = ((end) + (1));
                        while ((((((((runtime.readIndex(wspans, i).flux_change_positions).length === 0 ? 1 : 0)) ? 0 : 1)) && (((Number(runtime.readIndex(runtime.readIndex(wspans, i).flux_change_positions, 0)) <= Number(end)) ? 1 : 0))) ? 1 : 0)) {
                            runtime.vectorMethod(runtime.readIndex(wspans, i).flux_change_positions, "erase", ((runtime.dereference(runtime.readIndex(wspans, i).flux_change_positions)).begin?.() ?? runtime.container(runtime.readIndex(wspans, i).flux_change_positions, "begin")));
                        }
                        continue;
                    }
                    if ((((((Number(runtime.readIndex(wspans, i).start) < Number(start)) ? 1 : 0)) && (((Number(((runtime.readIndex(wspans, i).end) - (1))) <= Number(end)) ? 1 : 0))) ? 1 : 0)) {
                        runtime.readIndex(wspans, i).end = start;
                        while ((((((((runtime.readIndex(wspans, i).flux_change_positions).length === 0 ? 1 : 0)) ? 0 : 1)) && (((Number(runtime.readIndex(runtime.readIndex(wspans, i).flux_change_positions, runtime.subtract((runtime.readIndex(wspans, i).flux_change_positions).length, 1))) >= Number(start)) ? 1 : 0))) ? 1 : 0)) {
                            runtime.vectorMethod(runtime.readIndex(wspans, i).flux_change_positions, "erase", runtime.addressOf(((runtime.dereference(runtime.readIndex(wspans, i).flux_change_positions)).end?.() ?? runtime.container(runtime.readIndex(wspans, i).flux_change_positions, "end")), -(1)));
                        }
                        continue;
                    }
                    let id = (((wspans).length) | 0);
                    (wspans = runtime.resize(wspans, ((id) + (1))));
                    runtime.readIndex(wspans, id).start = ((end) + (1));
                    runtime.readIndex(wspans, id).end = runtime.readIndex(wspans, i).end;
                    runtime.readIndex(wspans, id).flux_change_positions = runtime.readIndex(wspans, i).flux_change_positions;
                    runtime.readIndex(wspans, i).end = start;
                    while ((((((((runtime.readIndex(wspans, i).flux_change_positions).length === 0 ? 1 : 0)) ? 0 : 1)) && (((Number(runtime.readIndex(runtime.readIndex(wspans, i).flux_change_positions, runtime.subtract((runtime.readIndex(wspans, i).flux_change_positions).length, 1))) >= Number(start)) ? 1 : 0))) ? 1 : 0)) {
                        runtime.vectorMethod(runtime.readIndex(wspans, i).flux_change_positions, "erase", runtime.addressOf(((runtime.dereference(runtime.readIndex(wspans, i).flux_change_positions)).end?.() ?? runtime.container(runtime.readIndex(wspans, i).flux_change_positions, "end")), -(1)));
                    }
                    while ((((((((runtime.readIndex(wspans, id).flux_change_positions).length === 0 ? 1 : 0)) ? 0 : 1)) && (((Number(runtime.readIndex(runtime.readIndex(wspans, id).flux_change_positions, 0)) <= Number(end)) ? 1 : 0))) ? 1 : 0)) {
                        runtime.vectorMethod(runtime.readIndex(wspans, id).flux_change_positions, "erase", ((runtime.dereference(runtime.readIndex(wspans, id).flux_change_positions)).begin?.() ?? runtime.container(runtime.readIndex(wspans, id).flux_change_positions, "begin")));
                    }
                }
            }
        }
    }
    function method_wspan_write(runtime, wspans, track) {
        const members = runtime.members;
        for (let __range0 = wspans, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
            let si = 0;
            let ei = 0;
            for (si = 0; ((Number(si) !== Number((track).length)) ? 1 : 0); si = ((si) + (1))) {
                if (((Number(((runtime.readIndex(track, si)) & (268435455))) >= Number(runtime.readIndex(__range0, __range0_index).start)) ? 1 : 0)) {
                    break;
                }
            }
            for (ei = si; ((Number(ei) !== Number((track).length)) ? 1 : 0); ei = ((ei) + (1))) {
                if (((Number(((runtime.readIndex(track, ei)) & (268435455))) >= Number(runtime.readIndex(__range0, __range0_index).end)) ? 1 : 0)) {
                    break;
                }
            }
            if ((((((Number(si) !== Number((track).length)) ? 1 : 0)) && (((Number(((runtime.readIndex(track, si)) & (4026531840))) === Number(805306368)) ? 1 : 0))) ? 1 : 0)) {
                if (((Number(si) === Number(ei)) ? 1 : 0)) {
                    runtime.vectorMethod(track, "insert", runtime.addressOf(runtime.container(track, "begin"), si), ((805306368) | (((runtime.readIndex(__range0, __range0_index).start) - (1)))));
                    runtime.vectorMethod(track, "insert", runtime.addressOf(runtime.addressOf(runtime.container(track, "begin"), si), 1), ((((runtime.readIndex(track, ((si) - (1)))) & (4026531840))) | (runtime.readIndex(__range0, __range0_index).end)));
                    si = (ei = ((si) + (1)));
                }
                else {
                    runtime.writeIndex(track, si, ((805306368) | (((runtime.readIndex(__range0, __range0_index).start) - (1)))));
                    si = ((si) + (1));
                }
            }
            if ((((((Number(ei) !== Number((track).length)) ? 1 : 0)) && (((Number(((runtime.readIndex(track, ei)) & (4026531840))) === Number(805306368)) ? 1 : 0))) ? 1 : 0)) {
                runtime.writeIndex(track, ((ei) - (1)), ((268435456) | (runtime.readIndex(__range0, __range0_index).end)));
                ei = ((ei) - (1));
            }
            runtime.vectorMethod(track, "erase", runtime.addressOf(runtime.container(track, "begin"), si), runtime.addressOf(runtime.container(track, "begin"), ei));
            for (let __range1 = runtime.readIndex(__range0, __range0_index).flux_change_positions, __range1_index = 0; ((Number(__range1_index) < Number(__range1.length)) ? 1 : 0); __range1_index = ((__range1_index) + (1))) {
                runtime.vectorMethod(track, "insert", runtime.addressOf(runtime.container(track, "begin"), si), ((0) | (runtime.readIndex(__range1, __range1_index))));
                si = ((si) + (1));
            }
        }
    }
    function method_set_write_splice(runtime, when) {
        const members = runtime.members;
        if (((((members.m_image ?? 0)) && ((((members.m_mon ?? 0)) ? 0 : 1))) ? 1 : 0)) {
            members.m_image_dirty = ((1) ? 1 : 0);
            let base = 0;
            let splice_pos = ((method_find_position(runtime, ({ generatedLValue: true, get: () => base, set: (value) => { base = value; } }), when)) | 0);
            ((runtime.dereference(members.m_image)).set_write_splice_position?.((members.m_cyl ?? 0), (members.m_ss ?? 0), splice_pos, (members.m_subcyl ?? 0)) ?? 0);
        }
    }
    function method_get_form_factor(runtime) {
        const members = runtime.members;
        return (members.m_form_factor ?? 0);
    }
    function method_get_variant(runtime) {
        const members = runtime.members;
        return (((members.m_image ?? 0)) ? ((typeof (runtime.dereference(members.m_image)).get_variant === 'function' ? (runtime.dereference(members.m_image)).get_variant() : typeof (runtime.dereference(members.m_image)).get_variant === 'number' || typeof (runtime.dereference(members.m_image)).get_variant === 'boolean' ? (runtime.dereference(members.m_image)).get_variant : runtime.container(members.m_image, "get_variant"))) : (0));
    }
    function method_get_cyl(runtime) {
        const members = runtime.members;
        return (members.m_cyl ?? 0);
    }
    function method_on_track(runtime) {
        const members = runtime.members;
        return (((members.m_subcyl ?? 0)) ? 0 : 1);
    }
    function method_tfsel_w(runtime, state) {
        const members = runtime.members;
    }
    function method_dskchg_r(runtime) {
        const members = runtime.members;
        return (members.m_dskchg ?? 0);
    }
    function method_trk00_r(runtime) {
        const members = runtime.members;
        return (((members.m_has_trk00_sensor ?? 0)) ? (((Number((members.m_cyl ?? 0)) !== Number(0)) ? 1 : 0)) : (1));
    }
    function method_idx_r(runtime) {
        const members = runtime.members;
        return (members.m_idx ?? 0);
    }
    function method_mon_r(runtime) {
        const members = runtime.members;
        return (members.m_mon ?? 0);
    }
    function method_floppy_image_device__mon_r(runtime) {
        const members = runtime.members;
        return (members.m_mon ?? 0);
    }
    function method_ss_r(runtime) {
        const members = runtime.members;
        return (members.m_ss ?? 0);
    }
    function method_dir_w(runtime, state) {
        const members = runtime.members;
        members.m_dir = ((state) | 0);
    }
    function method_ss_w(runtime, state) {
        const members = runtime.members;
        members.m_actual_ss = ((state) | 0);
        if (((Number((members.m_sides ?? 0)) > Number(1)) ? 1 : 0)) {
            members.m_ss = ((state) | 0);
        }
    }
    function method_inuse_w(runtime, state) {
        const members = runtime.members;
    }
    function method_dskchg_w(runtime, state) {
        const members = runtime.members;
        if ((members.m_dskchg_writable ?? 0)) {
            members.m_dskchg = ((state) | 0);
        }
    }
    function method_ds_w(runtime, state) {
        const members = runtime.members;
        members.m_ds = ((state) | 0);
        method_check_led(runtime);
    }
    function method_get_sides(runtime) {
        const members = runtime.members;
        return (members.m_sides ?? 0);
    }
    function method_floppy_image_device__get_cyl(runtime) {
        const members = runtime.members;
        return (members.m_cyl ?? 0);
    }
    function method_floppy_image_device__on_track(runtime) {
        const members = runtime.members;
        return (((members.m_subcyl ?? 0)) ? 0 : 1);
    }
    function method_floppy_image_device__tfsel_w(runtime, state) {
        const members = runtime.members;
    }
    function method_floppy_image_device__dskchg_r(runtime) {
        const members = runtime.members;
        return (members.m_dskchg ?? 0);
    }
    function method_floppy_image_device__trk00_r(runtime) {
        const members = runtime.members;
        return (((members.m_has_trk00_sensor ?? 0)) ? (((Number((members.m_cyl ?? 0)) !== Number(0)) ? 1 : 0)) : (1));
    }
    function method_floppy_image_device__idx_r(runtime) {
        const members = runtime.members;
        return (members.m_idx ?? 0);
    }
    function method_floppy_image_device__ss_r(runtime) {
        const members = runtime.members;
        return (members.m_ss ?? 0);
    }
    function method_floppy_image_device__dir_w(runtime, state) {
        const members = runtime.members;
        members.m_dir = ((state) | 0);
    }
    function method_floppy_image_device__ss_w(runtime, state) {
        const members = runtime.members;
        members.m_actual_ss = ((state) | 0);
        if (((Number((members.m_sides ?? 0)) > Number(1)) ? 1 : 0)) {
            members.m_ss = ((state) | 0);
        }
    }
    function method_floppy_image_device__inuse_w(runtime, state) {
        const members = runtime.members;
    }
    function method_floppy_image_device__dskchg_w(runtime, state) {
        const members = runtime.members;
        if ((members.m_dskchg_writable ?? 0)) {
            members.m_dskchg = ((state) | 0);
        }
    }
    function method_floppy_image_device__ds_w(runtime, state) {
        const members = runtime.members;
        members.m_ds = ((state) | 0);
        method_check_led(runtime);
    }
    function method_floppy_image_device__get_sides(runtime) {
        const members = runtime.members;
        return (members.m_sides ?? 0);
    }
    function method_mount_image(runtime, image, best_format) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        members.m_image = image;
        let wp = (__l["get_feature"] ? __l["get_feature"]("write_protected") : runtime.macro("get_feature", "write_protected"));
        if ((((wp) && ((((__l["std::strcmp"] ? __l["std::strcmp"](wp, "true") : runtime.macro("std::strcmp", wp, "true"))) ? 0 : 1))) ? 1 : 0)) {
            (__l["make_readonly"] ? __l["make_readonly"]() : runtime.macro("make_readonly"));
        }
        members.m_output_format = (((__l["is_readonly"] ? __l["is_readonly"]() : runtime.macro("is_readonly"))) ? (0) : (best_format));
        members.m_image_dirty = ((0) ? 1 : 0);
        method_init_floppy_load(runtime, (((members.m_output_format ?? 0)) ? 1 : 0));
    }
    function method_unmount_image(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        method_cache_clear(runtime);
        members.m_dskchg = ((0) | 0);
        if ((members.m_image ?? 0)) {
            if ((members.m_image_dirty ?? 0)) {
                (__l["commit_image"] ? __l["commit_image"]() : runtime.macro("commit_image"));
            }
            members.m_image = 0;
        }
        members.m_wpt = ((1) | 0);
        if ((((__l["m_cur_wpt_cb.isnull"] ? __l["m_cur_wpt_cb.isnull"]() : typeof ((members.m_cur_wpt_cb ?? 0))?.isnull === 'function' ? ((members.m_cur_wpt_cb ?? 0)).isnull() : ((__l["m_cur_wpt_cb.isnull"] ?? globalThis.mamekitMissingCall?.("m_cur_wpt_cb.isnull"))?.() ?? 0))) ? 0 : 1)) {
            (__l["m_cur_wpt_cb"] ? __l["m_cur_wpt_cb"]((members.this ?? 0), (members.m_wpt ?? 0)) : runtime.macro("m_cur_wpt_cb", (members.this ?? 0), (members.m_wpt ?? 0)));
        }
        members.m_wpt = ((0) | 0);
        if ((((__l["m_cur_wpt_cb.isnull"] ? __l["m_cur_wpt_cb.isnull"]() : typeof ((members.m_cur_wpt_cb ?? 0))?.isnull === 'function' ? ((members.m_cur_wpt_cb ?? 0)).isnull() : ((__l["m_cur_wpt_cb.isnull"] ?? globalThis.mamekitMissingCall?.("m_cur_wpt_cb.isnull"))?.() ?? 0))) ? 0 : 1)) {
            (__l["m_cur_wpt_cb"] ? __l["m_cur_wpt_cb"]((members.this ?? 0), (members.m_wpt ?? 0)) : runtime.macro("m_cur_wpt_cb", (members.this ?? 0), (members.m_wpt ?? 0)));
        }
        if ((((__l["m_cur_unload_cb.isnull"] ? __l["m_cur_unload_cb.isnull"]() : typeof ((members.m_cur_unload_cb ?? 0))?.isnull === 'function' ? ((members.m_cur_unload_cb ?? 0)).isnull() : ((__l["m_cur_unload_cb.isnull"] ?? globalThis.mamekitMissingCall?.("m_cur_unload_cb.isnull"))?.() ?? 0))) ? 0 : 1)) {
            (__l["m_cur_unload_cb"] ? __l["m_cur_unload_cb"]((members.this ?? 0)) : runtime.macro("m_cur_unload_cb", (members.this ?? 0)));
        }
        if ((members.m_motor_always_on ?? 0)) {
            method_mon_w(runtime, 1);
        }
        if ((members.m_make_sound ?? 0)) {
            (__l["m_sound_out.unload"] ? __l["m_sound_out.unload"]() : ((members.m_sound_out)?.unload?.() ?? 0));
        }
        method_set_ready(runtime, 1);
    }
    return {
        "setup_load_cb": method_setup_load_cb,
        "setup_unload_cb": method_setup_unload_cb,
        "setup_index_pulse_cb": method_setup_index_pulse_cb,
        "setup_ready_cb": method_setup_ready_cb,
        "setup_wpt_cb": method_setup_wpt_cb,
        "setup_led_cb": method_setup_led_cb,
        "add_variant": method_add_variant,
        "set_rpm": method_set_rpm,
        "set_sectoring_type": method_set_sectoring_type,
        "get_sectoring_type": method_get_sectoring_type,
        "device_config_complete": method_device_config_complete,
        "setup_characteristics": method_setup_characteristics,
        "device_reset": method_device_reset,
        "set_ready": method_set_ready,
        "check_led": method_check_led,
        "mon_w": method_mon_w,
        "cache_clear": method_cache_clear,
        "index_resync": method_index_resync,
        "floppy_image_device::device_reset": method_floppy_image_device__device_reset,
        "init_floppy_load": method_init_floppy_load,
        "wpt_r": method_wpt_r,
        "floppy_image_device::mon_w": method_floppy_image_device__mon_w,
        "time_next_index": method_time_next_index,
        "ready_r": method_ready_r,
        "twosid_r": method_twosid_r,
        "floppy_is_hd": method_floppy_is_hd,
        "floppy_is_ed": method_floppy_is_ed,
        "track_changed": method_track_changed,
        "floppy_image_device::track_changed": method_floppy_image_device__track_changed,
        "stp_w": method_stp_w,
        "seek_phase_w": method_seek_phase_w,
        "hash32": method_hash32,
        "position_to_time": method_position_to_time,
        "cache_fill": method_cache_fill,
        "cache_weakness_setup": method_cache_weakness_setup,
        "get_next_transition": method_get_next_transition,
        "writing_disabled": method_writing_disabled,
        "write_flux": method_write_flux,
        "wspan_split_on_wrap": method_wspan_split_on_wrap,
        "wspan_remove_damaged": method_wspan_remove_damaged,
        "wspan_write": method_wspan_write,
        "set_write_splice": method_set_write_splice,
        "get_form_factor": method_get_form_factor,
        "get_variant": method_get_variant,
        "get_cyl": method_get_cyl,
        "on_track": method_on_track,
        "tfsel_w": method_tfsel_w,
        "dskchg_r": method_dskchg_r,
        "trk00_r": method_trk00_r,
        "idx_r": method_idx_r,
        "mon_r": method_mon_r,
        "floppy_image_device::mon_r": method_floppy_image_device__mon_r,
        "ss_r": method_ss_r,
        "dir_w": method_dir_w,
        "ss_w": method_ss_w,
        "inuse_w": method_inuse_w,
        "dskchg_w": method_dskchg_w,
        "ds_w": method_ds_w,
        "get_sides": method_get_sides,
        "floppy_image_device::get_cyl": method_floppy_image_device__get_cyl,
        "floppy_image_device::on_track": method_floppy_image_device__on_track,
        "floppy_image_device::tfsel_w": method_floppy_image_device__tfsel_w,
        "floppy_image_device::dskchg_r": method_floppy_image_device__dskchg_r,
        "floppy_image_device::trk00_r": method_floppy_image_device__trk00_r,
        "floppy_image_device::idx_r": method_floppy_image_device__idx_r,
        "floppy_image_device::ss_r": method_floppy_image_device__ss_r,
        "floppy_image_device::dir_w": method_floppy_image_device__dir_w,
        "floppy_image_device::ss_w": method_floppy_image_device__ss_w,
        "floppy_image_device::inuse_w": method_floppy_image_device__inuse_w,
        "floppy_image_device::dskchg_w": method_floppy_image_device__dskchg_w,
        "floppy_image_device::ds_w": method_floppy_image_device__ds_w,
        "floppy_image_device::get_sides": method_floppy_image_device__get_sides,
        "mount_image": method_mount_image,
        "unmount_image": method_unmount_image
    };
})();
definition.compiledMethodLinks = ["VECTOR_OF", "attotime::from_double", "attotime::from_ticks", "attotime::from_usec", "commit_image", "exists", "get_feature", "is_readonly", "m_cur_index_pulse_cb", "m_cur_index_pulse_cb.isnull", "m_cur_led_cb", "m_cur_led_cb.isnull", "m_cur_ready_cb", "m_cur_ready_cb.isnull", "m_cur_unload_cb", "m_cur_unload_cb.isnull", "m_cur_wpt_cb", "m_cur_wpt_cb.isnull", "m_sound_out.motor", "m_sound_out.samples_loaded", "m_sound_out.step", "m_sound_out.unload", "machine", "machine().time", "make_readonly", "std::copy", "std::strcmp", "std::swap", "std::upper_bound"];
definition.floppyFormats[0].definition.compiledMethods = (() => {
    const __mame_table_0 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 1, 0, 12, 4, 5, 0, 0, 2, 3, 0, 15, 6, 7, 0, 9, 10, 11, 0, 13, 14, 0];
    const __mame_table_1 = [10, 11, 18, 19, 14, 15, 22, 23, 9, 25, 26, 27, 13, 29, 30, 21];
    const __mame_table_2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 3, 0, 4, 5, 6, 0, 0, 0, 0, 0, 0, 7, 8, 0, 0, 0, 9, 10, 11, 12, 13, 0, 0, 14, 15, 16, 17, 18, 19, 0, 20, 21, 22, 23, 24, 25, 26, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 27, 0, 28, 29, 30, 0, 0, 0, 31, 0, 0, 32, 33, 0, 34, 35, 36, 37, 38, 39, 40, 0, 0, 0, 0, 0, 41, 42, 43, 0, 44, 45, 46, 47, 48, 49, 50, 0, 0, 51, 52, 53, 54, 55, 56, 0, 57, 58, 59, 60, 61, 62, 63];
    const __mame_table_3 = [150, 151, 154, 155, 157, 158, 159, 166, 167, 171, 172, 173, 174, 175, 178, 179, 180, 181, 182, 183, 185, 186, 187, 188, 189, 190, 191, 203, 205, 206, 207, 211, 214, 215, 217, 218, 219, 220, 221, 222, 223, 229, 230, 231, 233, 234, 235, 236, 237, 238, 239, 242, 243, 244, 245, 246, 247, 249, 250, 251, 252, 253, 254, 255];
    const __mame_table_4 = [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const __mame_table_5 = [4000, 3750, 3500, 3250];
    const __mame_table_6 = [21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 19, 19, 19, 19, 19, 19, 19, 18, 18, 18, 18, 18, 18, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17];
    function method_type_no_data(runtime, type) {
        const members = runtime.members;
        return (((((((((((((((((((((((((((((((((((Number(type) === Number(46)) ? 1 : 0)) || (((Number(type) === Number(47)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(48)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(49)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(50)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(51)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(52)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(53)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(54)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(56)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(57)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(0)) ? 1 : 0))) ? 1 : 0);
    }
    function method_type_data_mfm(runtime, type, p1, crcs) {
        const members = runtime.members;
        const __pointee_crcs = runtime.dereference(crcs);
        return (((((((((((((((((((((((((((((((((((((((((((((((((((((Number(type) === Number(2)) ? 1 : 0)) || (((Number(type) === Number(3)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(10)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(17)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(19)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(21)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(26)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(29)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(30)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(31)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(33)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(34)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(35)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(36)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(37)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(39)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(40)) ? 1 : 0))) ? 1 : 0)) || ((((((Number(type) === Number(55)) ? 1 : 0)) && ((((((Number(runtime.readIndex(crcs, p1).type) === Number(3)) ? 1 : 0)) || (((Number(runtime.readIndex(crcs, p1).type) === Number(1)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0))) ? 1 : 0);
    }
    function method_collect_crcs(runtime, desc, crcs) {
        const members = runtime.members;
        const __pointee_desc = runtime.dereference(desc);
        const __pointee_crcs = runtime.dereference(crcs);
        (() => { const target = crcs; const bytes = Number(((64) * (((runtime.dereference(crcs))?.byteLength ?? 1)))); if (Array.isArray(target) || Array.isArray(target?.source))
            return runtime.macro("memset", target, 0, bytes); if (target?.generatedPointer) {
            const width = target.source.BYTES_PER_ELEMENT ?? 1;
            target.source.fill(0, target.offset, target.offset + Math.ceil(bytes / width));
            return target;
        } target.fill(0, 0, bytes); return target; })();
        for (let i = ((0) | 0); ((Number(i) !== Number(64)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            runtime.readIndex(crcs, i).write = ((-1) | 0);
        }
        for (let i = ((0) | 0); ((Number(runtime.readIndex(desc, i).type) !== Number(0)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            switch (runtime.readIndex(desc, i).type) {
                case 46:
                    {
                        runtime.readIndex(crcs, runtime.readIndex(desc, i).p1).type = ((3) | 0);
                        break;
                    }
                case 47:
                    {
                        runtime.readIndex(crcs, runtime.readIndex(desc, i).p1).type = ((4) | 0);
                        break;
                    }
                case 48:
                    {
                        runtime.readIndex(crcs, runtime.readIndex(desc, i).p1).type = ((1) | 0);
                        break;
                    }
                case 49:
                    {
                        runtime.readIndex(crcs, runtime.readIndex(desc, i).p1).type = ((2) | 0);
                        break;
                    }
                case 50:
                    {
                        runtime.readIndex(crcs, runtime.readIndex(desc, i).p1).type = ((5) | 0);
                        break;
                    }
                case 51:
                    {
                        runtime.readIndex(crcs, runtime.readIndex(desc, i).p1).type = ((6) | 0);
                        break;
                    }
                case 52:
                    {
                        runtime.readIndex(crcs, runtime.readIndex(desc, i).p1).type = ((7) | 0);
                        break;
                    }
                case 53:
                    {
                        runtime.readIndex(crcs, runtime.readIndex(desc, i).p1).type = ((8) | 0);
                        break;
                    }
            }
        }
        for (let i = ((0) | 0); ((Number(runtime.readIndex(desc, i).type) !== Number(0)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            if (((Number(runtime.readIndex(desc, i).type) === Number(55)) ? 1 : 0)) {
                let j = ((0) | 0);
                for (j = ((((i) + (1))) | 0); (((((Number(runtime.readIndex(desc, j).type) !== Number(0)) ? 1 : 0)) && (method_type_no_data(runtime, runtime.readIndex(desc, j).type))) ? 1 : 0); j = ((((j) + (1))) | 0)) {
                }
                runtime.readIndex(crcs, runtime.readIndex(desc, i).p1).fixup_mfm_clock = ((method_type_data_mfm(runtime, runtime.readIndex(desc, j).type, runtime.readIndex(desc, j).p1, crcs)) & 0xff);
            }
        }
    }
    function method_crc_cells_size(runtime, type) {
        const members = runtime.members;
        switch (type) {
            case 3:
                {
                    return 32;
                }
            case 4:
                {
                    return 32;
                }
            case 1:
                {
                    return 64;
                }
            case 2:
                {
                    return 10;
                }
            case 5:
                {
                    return 8;
                }
            case 6:
                {
                    return 20;
                }
            case 7:
                {
                    return 10;
                }
            case 8:
                {
                    return 20;
                }
            default:
                {
                    return 0;
                }
        }
    }
    function method_bit_r(runtime, buffer, offset) {
        const members = runtime.members;
        return ((Number(((runtime.readIndex(buffer, offset)) & (4026531840))) === Number(1342177280)) ? 1 : 0);
    }
    function method_bitn_r(runtime, buffer, offset, count) {
        const members = runtime.members;
        let r = ((0) >>> 0);
        for (let i = ((0) | 0); ((Number(i) < Number(count)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            r = ((((((r) << (1))) | (((method_bit_r(runtime, buffer, ((offset) + (i)))) >>> 0)))) >>> 0);
        }
        return r;
    }
    function method_mfm_half_w(runtime, buffer, start_bit, val, size = 1000) {
        const members = runtime.members;
        let prec = ((((((buffer).length === 0 ? 1 : 0)) ? (0) : (method_bit_r(runtime, buffer, runtime.subtract((buffer).length, 1))))) | 0);
        for (let i = ((start_bit) | 0); ((Number(i) >= Number(0)) ? 1 : 0); i = ((((i) - (2))) | 0)) {
            let bit = ((((((val) >>> (i))) & (1))) | 0);
            method_bit_w__3(runtime, buffer, (((((prec) || (bit)) ? 1 : 0)) ? 0 : 1), size);
            method_bit_w__3(runtime, buffer, bit, size);
            prec = ((bit) | 0);
        }
    }
    function method_bit_w__3(runtime, buffer, val, size = 1000) {
        const members = runtime.members;
        (buffer).push(((((val) ? (1342177280) : (1073741824))) | (size)));
    }
    function method__8n1_w(runtime, buffer, n, val, size = 1000) {
        const members = runtime.members;
        method_bit_w__3(runtime, buffer, 0, size);
        for (let i = ((((n) - (1))) | 0); ((Number(i) >= Number(0)) ? 1 : 0); i = ((((i) - (1))) | 0)) {
            let bit = ((((((val) >>> (i))) & (1))) | 0);
            method_bit_w__3(runtime, buffer, bit, size);
        }
        method_bit_w__3(runtime, buffer, 1, size);
    }
    function method_fixup_crc_amiga(runtime, buffer, crc) {
        const members = runtime.members;
        const __pointee_crc = runtime.dereference(crc);
        let res = ((0) & 0xffff);
        let size = ((((__pointee_crc.end) - (__pointee_crc.start))) | 0);
        for (let i = ((1) | 0); ((Number(i) < Number(size)) ? 1 : 0); i = ((((i) + (2))) | 0)) {
            if (method_bit_r(runtime, buffer, ((__pointee_crc.start) + (i)))) {
                res = ((((res) ^ (runtime.shiftRight(32768, ((runtime.shiftRight(i, 1)) & (15)))))) & 0xffff);
            }
        }
        method_mfm_w__5(runtime, buffer, 16, 0, 1000, __pointee_crc.write);
        method_mfm_w__5(runtime, buffer, 16, res, 1000, ((__pointee_crc.write) + (32)));
    }
    function method_mfm_w__5(runtime, buffer, n, val, size, offset) {
        const members = runtime.members;
        let prec = ((((offset) ? (method_bit_r(runtime, buffer, ((offset) - (1)))) : (0))) | 0);
        for (let i = ((((n) - (1))) | 0); ((Number(i) >= Number(0)) ? 1 : 0); i = ((((i) - (1))) | 0)) {
            let bit = ((((((val) >>> (i))) & (1))) | 0);
            method_bit_w__4(runtime, buffer, (((((prec) || (bit)) ? 1 : 0)) ? 0 : 1), size, (() => { const previous = offset; offset = ((((offset) + (1))) | 0); return previous; })());
            method_bit_w__4(runtime, buffer, bit, size, (() => { const previous = offset; offset = ((((offset) + (1))) | 0); return previous; })());
            prec = ((bit) | 0);
        }
    }
    function method_bit_w__4(runtime, buffer, val, size, offset) {
        const members = runtime.members;
        runtime.writeIndex(buffer, offset, ((((val) ? (1342177280) : (1073741824))) | (size)));
    }
    function method_fixup_crc_cbm(runtime, buffer, crc) {
        const members = runtime.members;
        const __pointee_crc = runtime.dereference(crc);
        let v = ((0) & 0xff);
        for (let o = ((__pointee_crc.start) | 0); ((Number(o) < Number(__pointee_crc.end)) ? 1 : 0); o = ((((o) + (10))) | 0)) {
            v = ((((v) ^ ((((__mame_table_0[(((method_bitn_r(runtime, buffer, o, 5)) % 32) + 32) % 32] ?? 0)) << (4))))) & 0xff);
            v = ((((v) ^ ((__mame_table_0[(((method_bitn_r(runtime, buffer, ((o) + (5)), 5)) % 32) + 32) % 32] ?? 0)))) & 0xff);
        }
        method_gcr5_w__4(runtime, buffer, v, 1000, __pointee_crc.write);
    }
    function method_gcr5_w__4(runtime, buffer, val, size, offset) {
        const members = runtime.members;
        let e0 = (((__mame_table_1[(((((val) >>> (4))) % 16) + 16) % 16] ?? 0)) >>> 0);
        let e1 = (((__mame_table_1[(((((val) & (15))) % 16) + 16) % 16] ?? 0)) >>> 0);
        method_raw_w__5(runtime, buffer, 5, e0, size, offset);
        method_raw_w__5(runtime, buffer, 5, e1, size, ((offset) + (5)));
    }
    function method_raw_w__5(runtime, buffer, n, val, size, offset) {
        const members = runtime.members;
        for (let i = ((((n) - (1))) | 0); ((Number(i) >= Number(0)) ? 1 : 0); i = ((((i) - (1))) | 0)) {
            method_bit_w__4(runtime, buffer, ((((val) >>> (i))) & (1)), size, (() => { const previous = offset; offset = ((((offset) + (1))) | 0); return previous; })());
        }
    }
    function method_calc_crc_ccitt(runtime, buffer, start, end) {
        const members = runtime.members;
        let res = ((65535) >>> 0);
        let size = ((((end) - (start))) | 0);
        for (let i = ((1) | 0); ((Number(i) < Number(size)) ? 1 : 0); i = ((((i) + (2))) | 0)) {
            res = ((((res) << (1))) >>> 0);
            if (method_bit_r(runtime, buffer, ((start) + (i)))) {
                res = ((((res) ^ (65536))) >>> 0);
            }
            if (((res) & (65536))) {
                res = ((((res) ^ (69665))) >>> 0);
            }
        }
        return ((res) & 0xffff);
    }
    function method_fixup_crc_ccitt(runtime, buffer, crc) {
        const members = runtime.members;
        const __pointee_crc = runtime.dereference(crc);
        method_mfm_w__5(runtime, buffer, 16, method_calc_crc_ccitt(runtime, buffer, __pointee_crc.start, __pointee_crc.end), 1000, __pointee_crc.write);
    }
    function method_fixup_crc_ccitt_fm(runtime, buffer, crc) {
        const members = runtime.members;
        const __pointee_crc = runtime.dereference(crc);
        method_fm_w__5(runtime, buffer, 16, method_calc_crc_ccitt(runtime, buffer, __pointee_crc.start, __pointee_crc.end), 1000, __pointee_crc.write);
    }
    function method_fm_w__5(runtime, buffer, n, val, size, offset) {
        const members = runtime.members;
        for (let i = ((((n) - (1))) | 0); ((Number(i) >= Number(0)) ? 1 : 0); i = ((((i) - (1))) | 0)) {
            let bit = ((((((val) >>> (i))) & (1))) | 0);
            method_bit_w__4(runtime, buffer, 1, size, (() => { const previous = offset; offset = ((((offset) + (1))) | 0); return previous; })());
            method_bit_w__4(runtime, buffer, bit, size, (() => { const previous = offset; offset = ((((offset) + (1))) | 0); return previous; })());
        }
    }
    function method_fixup_crc_machead(runtime, buffer, crc) {
        const members = runtime.members;
        const __pointee_crc = runtime.dereference(crc);
        let v = ((0) & 0xff);
        for (let o = ((__pointee_crc.start) | 0); ((Number(o) < Number(__pointee_crc.end)) ? 1 : 0); o = ((((o) + (8))) | 0)) {
            v = ((((v) ^ ((__mame_table_2[(((method_bitn_r(runtime, buffer, o, 8)) % 256) + 256) % 256] ?? 0)))) & 0xff);
        }
        method_raw_w__5(runtime, buffer, 8, (__mame_table_3[((v) & 63)] ?? 0), 1000, __pointee_crc.write);
    }
    function method_fixup_crc_fcs(runtime, buffer, crc) {
        const members = runtime.members;
        const __pointee_crc = runtime.dereference(crc);
    }
    function method_fixup_crc_victor_header(runtime, buffer, crc) {
        const members = runtime.members;
        const __pointee_crc = runtime.dereference(crc);
        let v = ((0) & 0xff);
        for (let o = ((__pointee_crc.start) | 0); ((Number(o) < Number(__pointee_crc.end)) ? 1 : 0); o = ((((o) + (10))) | 0)) {
            v = ((((v) + ((((((__mame_table_0[(((method_bitn_r(runtime, buffer, o, 5)) % 32) + 32) % 32] ?? 0)) << (4))) | ((__mame_table_0[(((method_bitn_r(runtime, buffer, ((o) + (5)), 5)) % 32) + 32) % 32] ?? 0)))))) & 0xff);
        }
        method_gcr5_w__4(runtime, buffer, v, 1000, __pointee_crc.write);
    }
    function method_fixup_crc_victor_data(runtime, buffer, crc) {
        const members = runtime.members;
        const __pointee_crc = runtime.dereference(crc);
        let v = ((0) & 0xffff);
        for (let o = ((__pointee_crc.start) | 0); ((Number(o) < Number(__pointee_crc.end)) ? 1 : 0); o = ((((o) + (10))) | 0)) {
            v = ((((v) + ((((((__mame_table_0[(((method_bitn_r(runtime, buffer, o, 5)) % 32) + 32) % 32] ?? 0)) << (4))) | ((__mame_table_0[(((method_bitn_r(runtime, buffer, ((o) + (5)), 5)) % 32) + 32) % 32] ?? 0)))))) & 0xffff);
        }
        method_gcr5_w__4(runtime, buffer, ((v) & (255)), 1000, __pointee_crc.write);
        method_gcr5_w__4(runtime, buffer, ((v) >>> (8)), 1000, ((__pointee_crc.write) + (10)));
    }
    function method_fixup_crcs(runtime, buffer, crcs) {
        const members = runtime.members;
        const __pointee_crcs = runtime.dereference(crcs);
        for (let i = ((0) | 0); ((Number(i) !== Number(64)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            if (((Number(runtime.readIndex(crcs, i).write) !== Number(-1)) ? 1 : 0)) {
                switch (runtime.readIndex(crcs, i).type) {
                    case 1:
                        {
                            method_fixup_crc_amiga(runtime, buffer, runtime.addressOf(crcs, i));
                            break;
                        }
                    case 2:
                        {
                            method_fixup_crc_cbm(runtime, buffer, runtime.addressOf(crcs, i));
                            break;
                        }
                    case 3:
                        {
                            method_fixup_crc_ccitt(runtime, buffer, runtime.addressOf(crcs, i));
                            break;
                        }
                    case 4:
                        {
                            method_fixup_crc_ccitt_fm(runtime, buffer, runtime.addressOf(crcs, i));
                            break;
                        }
                    case 5:
                        {
                            method_fixup_crc_machead(runtime, buffer, runtime.addressOf(crcs, i));
                            break;
                        }
                    case 6:
                        {
                            method_fixup_crc_fcs(runtime, buffer, runtime.addressOf(crcs, i));
                            break;
                        }
                    case 7:
                        {
                            method_fixup_crc_victor_header(runtime, buffer, runtime.addressOf(crcs, i));
                            break;
                        }
                    case 8:
                        {
                            method_fixup_crc_victor_data(runtime, buffer, runtime.addressOf(crcs, i));
                            break;
                        }
                }
                if (runtime.readIndex(crcs, i).fixup_mfm_clock) {
                    let offset = ((((runtime.readIndex(crcs, i).write) + (method_crc_cells_size(runtime, runtime.readIndex(crcs, i).type)))) | 0);
                    method_bit_w__4(runtime, buffer, (((((((offset) ? (method_bit_r(runtime, buffer, ((offset) - (1)))) : (0))) || (method_bit_r(runtime, buffer, ((offset) + (1))))) ? 1 : 0)) ? 0 : 1), 1000, offset);
                }
                runtime.readIndex(crcs, i).write = ((-1) | 0);
            }
        }
    }
    function method_gcr6_encode(runtime, va, vb, vc) {
        const members = runtime.members;
        let r = ((0) >>> 0);
        r = (((((__mame_table_3[(((((((((((va) >>> (2))) & (48))) | (((((vb) >>> (4))) & (12))))) | (((((vc) >>> (6))) & (3))))) % 64) + 64) % 64] ?? 0)) << (24))) >>> 0);
        r = ((((r) | ((((__mame_table_3[(((((va) & (63))) % 64) + 64) % 64] ?? 0)) << (16))))) >>> 0);
        r = ((((r) | ((((__mame_table_3[(((((vb) & (63))) % 64) + 64) % 64] ?? 0)) << (8))))) >>> 0);
        r = ((((r) | ((__mame_table_3[(((((vc) & (63))) % 64) + 64) % 64] ?? 0)))) >>> 0);
        return r;
    }
    function method_calc_sector_index(runtime, num, interleave, skew, total_sectors, track_head) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let i = ((0) | 0);
        let sec = ((0) | 0);
        while (((Number(i) !== Number(num)) ? 1 : 0)) {
            i = ((((i) + (1))) | 0);
            i = ((((i) + (interleave))) | 0);
            i = ((((i) % (total_sectors))) | 0);
            sec = ((((sec) + (1))) | 0);
            if (((Number(sec) > Number(total_sectors)) ? 1 : 0)) {
                (__l["__throw"] ? __l["__throw"]((__l["std::invalid_argument"] ? __l["std::invalid_argument"]((__l["util::string_format"] ? __l["util::string_format"]("Format error: interleave %d not appropriate for %d sectors per track", interleave, total_sectors) : runtime.macro("util::string_format", "Format error: interleave %d not appropriate for %d sectors per track", interleave, total_sectors))) : runtime.macro("std::invalid_argument", (__l["util::string_format"] ? __l["util::string_format"]("Format error: interleave %d not appropriate for %d sectors per track", interleave, total_sectors) : runtime.macro("util::string_format", "Format error: interleave %d not appropriate for %d sectors per track", interleave, total_sectors))))) : runtime.macro("__throw", (__l["std::invalid_argument"] ? __l["std::invalid_argument"]((__l["util::string_format"] ? __l["util::string_format"]("Format error: interleave %d not appropriate for %d sectors per track", interleave, total_sectors) : runtime.macro("util::string_format", "Format error: interleave %d not appropriate for %d sectors per track", interleave, total_sectors))) : runtime.macro("std::invalid_argument", (__l["util::string_format"] ? __l["util::string_format"]("Format error: interleave %d not appropriate for %d sectors per track", interleave, total_sectors) : runtime.macro("util::string_format", "Format error: interleave %d not appropriate for %d sectors per track", interleave, total_sectors))))));
            }
        }
        sec = ((((sec) - (((track_head) * (skew))))) | 0);
        sec = ((((sec) % (total_sectors))) | 0);
        if (((Number(sec) < Number(0)) ? 1 : 0)) {
            sec = ((((sec) + (total_sectors))) | 0);
        }
        return sec;
    }
    function method_generate_track(runtime, desc, track, head, sect, sect_count, track_size, image) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __pointee_desc = runtime.dereference(desc);
        const __pointee_sect = runtime.dereference(sect);
        let buffer = [];
        let crcs = (__l["STRUCT_ARRAY_OF"] ? __l["STRUCT_ARRAY_OF"](64, "gen_crc_info") : runtime.macro("STRUCT_ARRAY_OF", 64, "gen_crc_info"));
        method_collect_crcs(runtime, desc, crcs);
        let index = ((0) | 0);
        let sector_loop_start = ((0) | 0);
        let sector_idx = ((0) | 0);
        let sector_cnt = ((0) | 0);
        let sector_limit = ((0) | 0);
        let sector_interleave = ((0) | 0);
        let sector_skew = ((0) | 0);
        while (((Number(runtime.readIndex(desc, index).type) !== Number(0)) ? 1 : 0)) {
            switch (runtime.readIndex(desc, index).type) {
                case 1:
                    {
                        for (let i = ((0) | 0); ((Number(i) < Number(runtime.readIndex(desc, index).p2)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                            method_fm_w__4(runtime, buffer, 8, runtime.readIndex(desc, index).p1);
                        }
                        break;
                    }
                case 2:
                    {
                        for (let i = ((0) | 0); ((Number(i) < Number(runtime.readIndex(desc, index).p2)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                            method_mfm_w__4(runtime, buffer, 8, runtime.readIndex(desc, index).p1);
                        }
                        break;
                    }
                case 3:
                    {
                        method_mfm_w__4(runtime, buffer, runtime.readIndex(desc, index).p2, runtime.readIndex(desc, index).p1);
                        break;
                    }
                case 4:
                    {
                        for (let i = ((0) | 0); ((Number(i) < Number(runtime.readIndex(desc, index).p2)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                            method_gcr5_w__3(runtime, buffer, runtime.readIndex(desc, index).p1);
                        }
                        break;
                    }
                case 5:
                    {
                        for (let i = ((0) | 0); ((Number(i) < Number(runtime.readIndex(desc, index).p2)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                            method__8n1_w(runtime, buffer, 8, runtime.readIndex(desc, index).p1);
                        }
                        break;
                    }
                case 6:
                    {
                        for (let i = ((0) | 0); ((Number(i) < Number(runtime.readIndex(desc, index).p2)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                            method_raw_w__4(runtime, buffer, 16, runtime.readIndex(desc, index).p1);
                        }
                        break;
                    }
                case 7:
                    {
                        for (let i = ((0) | 0); ((Number(i) < Number(runtime.readIndex(desc, index).p2)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                            method_raw_w__4(runtime, buffer, 8, runtime.readIndex(desc, index).p1);
                        }
                        break;
                    }
                case 8:
                    {
                        method_raw_w__4(runtime, buffer, runtime.readIndex(desc, index).p2, runtime.readIndex(desc, index).p1);
                        break;
                    }
                case 9:
                    {
                        for (let i = ((0) | 0); ((Number(i) < Number(runtime.readIndex(desc, index).p1)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                            method_raw_w__4(runtime, buffer, 10, 65535);
                        }
                        break;
                    }
                case 10:
                    {
                        method_mfm_w__4(runtime, buffer, 8, track);
                        break;
                    }
                case 11:
                    {
                        method_fm_w__4(runtime, buffer, 8, track);
                        break;
                    }
                case 12:
                    {
                        method_gcr5_w__3(runtime, buffer, runtime.add(runtime.add(1, runtime.shiftRight(track, 1)), ((head) * (35))));
                        break;
                    }
                case 13:
                    {
                        method_gcr5_w__3(runtime, buffer, runtime.add(((1) + (track)), ((head) * (77))));
                        break;
                    }
                case 14:
                    {
                        method_raw_w__4(runtime, buffer, 8, (__mame_table_3[(((((track) & (63))) % 64) + 64) % 64] ?? 0));
                        break;
                    }
                case 15:
                    {
                        method__8n1_w(runtime, buffer, 8, track);
                        break;
                    }
                case 16:
                    {
                        method_gcr5_w__3(runtime, buffer, ((track) + (((head) * (128)))));
                        break;
                    }
                case 17:
                    {
                        method_mfm_w__4(runtime, buffer, 8, head);
                        break;
                    }
                case 18:
                    {
                        method_fm_w__4(runtime, buffer, 8, head);
                        break;
                    }
                case 19:
                    {
                        method_mfm_w__4(runtime, buffer, 8, ((head) ? 0 : 1));
                        break;
                    }
                case 20:
                    {
                        method_raw_w__4(runtime, buffer, 8, (__mame_table_3[(((((((((track) & (64))) ? (1) : (0))) | (((head) ? (32) : (0))))) % 64) + 64) % 64] ?? 0));
                        break;
                    }
                case 21:
                    {
                        method_mfm_w__4(runtime, buffer, 8, runtime.readIndex(sect, sector_idx).sector_id);
                        break;
                    }
                case 22:
                    {
                        method_fm_w__4(runtime, buffer, 8, runtime.readIndex(sect, sector_idx).sector_id);
                        break;
                    }
                case 23:
                    {
                        method_gcr5_w__3(runtime, buffer, runtime.readIndex(sect, sector_idx).sector_id);
                        break;
                    }
                case 24:
                    {
                        method_raw_w__4(runtime, buffer, 8, (__mame_table_3[((runtime.readIndex(sect, sector_idx).sector_id) & 63)] ?? 0));
                        break;
                    }
                case 25:
                    {
                        method__8n1_w(runtime, buffer, 8, runtime.readIndex(sect, sector_idx).sector_id);
                        break;
                    }
                case 26:
                    {
                        let size = ((runtime.readIndex(sect, sector_idx).size) | 0);
                        let id = ((0) | 0);
                        for (id = ((0) | 0); ((Number(size) > Number(128)) ? 1 : 0); size = ((runtime.shiftRight(size, 1)) | 0), id = ((((id) + (1))) | 0)) {
                        }
                        method_mfm_w__4(runtime, buffer, 8, id);
                        break;
                    }
                case 27:
                    {
                        let size__1 = ((runtime.readIndex(sect, sector_idx).size) | 0);
                        let id__1 = ((0) | 0);
                        for (id__1 = ((0) | 0); ((Number(size__1) > Number(128)) ? 1 : 0); size__1 = ((runtime.shiftRight(size__1, 1)) | 0), id__1 = ((((id__1) + (1))) | 0)) {
                        }
                        method_fm_w__4(runtime, buffer, 8, id__1);
                        break;
                    }
                case 28:
                    {
                        method_raw_w__4(runtime, buffer, 8, (__mame_table_3[((runtime.readIndex(sect, sector_idx).sector_info) & 63)] ?? 0));
                        break;
                    }
                case 29:
                    {
                        method_mfm_half_w(runtime, buffer, 7, ((((track) * (2))) + (head)));
                        break;
                    }
                case 30:
                    {
                        method_mfm_half_w(runtime, buffer, 6, ((((track) * (2))) + (head)));
                        break;
                    }
                case 31:
                    {
                        method_fm_w__4(runtime, buffer, 8, ((((track) * (2))) + (head)));
                        break;
                    }
                case 32:
                    {
                        method_mfm_w__4(runtime, buffer, 8, ((((track) * (2))) + (head)));
                        break;
                    }
                case 33:
                    {
                        method_mfm_half_w(runtime, buffer, 7, sector_idx);
                        break;
                    }
                case 34:
                    {
                        method_mfm_half_w(runtime, buffer, 6, sector_idx);
                        break;
                    }
                case 35:
                    {
                        method_mfm_half_w(runtime, buffer, 7, ((runtime.readIndex(desc, index).p1) - (sector_idx)));
                        break;
                    }
                case 36:
                    {
                        method_mfm_half_w(runtime, buffer, 6, ((runtime.readIndex(desc, index).p1) - (sector_idx)));
                        break;
                    }
                case 56:
                    {
                        method_fixup_crcs(runtime, buffer, crcs);
                        sector_loop_start = ((index) | 0);
                        sector_idx = ((runtime.readIndex(desc, index).p1) | 0);
                        sector_cnt = ((sector_idx) | 0);
                        sector_limit = ((((((Number(runtime.readIndex(desc, index).p2) === Number(-1)) ? 1 : 0)) ? (((((sector_idx) + (sect_count))) - (1))) : (runtime.readIndex(desc, index).p2))) | 0);
                        sector_idx = ((method_calc_sector_index(runtime, sector_cnt, sector_interleave, sector_skew, ((sector_limit) + (1)), ((((track) * (2))) + (head)))) | 0);
                        break;
                    }
                case 57:
                    {
                        method_fixup_crcs(runtime, buffer, crcs);
                        if (((Number(sector_cnt) < Number(sector_limit)) ? 1 : 0)) {
                            sector_cnt = ((((sector_cnt) + (1))) | 0);
                            sector_idx = ((method_calc_sector_index(runtime, sector_cnt, sector_interleave, sector_skew, ((sector_limit) + (1)), ((((track) * (2))) + (head)))) | 0);
                            index = ((sector_loop_start) | 0);
                        }
                        break;
                    }
                case 58:
                    {
                        sector_interleave = ((runtime.readIndex(desc, index).p1) | 0);
                        sector_skew = ((runtime.readIndex(desc, index).p2) | 0);
                        break;
                    }
                case 48:
                case 49:
                case 46:
                case 47:
                case 50:
                case 51:
                case 52:
                case 53:
                    {
                        runtime.readIndex(crcs, runtime.readIndex(desc, index).p1).start = (((buffer).length) | 0);
                        break;
                    }
                case 54:
                    {
                        runtime.readIndex(crcs, runtime.readIndex(desc, index).p1).end = (((buffer).length) | 0);
                        break;
                    }
                case 55:
                    {
                        runtime.readIndex(crcs, runtime.readIndex(desc, index).p1).write = (((buffer).length) | 0);
                        (buffer = runtime.resize(buffer, runtime.add((buffer).length, method_crc_cells_size(runtime, runtime.readIndex(crcs, runtime.readIndex(desc, index).p1).type))));
                        break;
                    }
                case 37:
                    {
                        let csect = runtime.addressOf(sect, ((((Number(runtime.readIndex(desc, index).p1) >= Number(0)) ? 1 : 0)) ? (runtime.readIndex(desc, index).p1) : (sector_idx)));
                        for (let i = ((0) | 0); ((Number(i) !== Number(runtime.dereference(csect).size)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                            method_mfm_w__4(runtime, buffer, 8, runtime.readIndex(runtime.dereference(csect).data, i));
                        }
                        break;
                    }
                case 38:
                    {
                        let csect__1 = runtime.addressOf(sect, ((((Number(runtime.readIndex(desc, index).p1) >= Number(0)) ? 1 : 0)) ? (runtime.readIndex(desc, index).p1) : (sector_idx)));
                        for (let i = ((0) | 0); ((Number(i) !== Number(runtime.dereference(csect__1).size)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                            method_fm_w__4(runtime, buffer, 8, runtime.readIndex(runtime.dereference(csect__1).data, i));
                        }
                        break;
                    }
                case 39:
                    {
                        let csect__2 = runtime.addressOf(sect, ((((Number(runtime.readIndex(desc, index).p1) >= Number(0)) ? 1 : 0)) ? (runtime.readIndex(desc, index).p1) : (sector_idx)));
                        for (let i = ((0) | 0); ((Number(i) !== Number(runtime.dereference(csect__2).size)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                            method_mfm_half_w(runtime, buffer, 7, runtime.readIndex(runtime.dereference(csect__2).data, i));
                        }
                        break;
                    }
                case 40:
                    {
                        let csect__3 = runtime.addressOf(sect, ((((Number(runtime.readIndex(desc, index).p1) >= Number(0)) ? 1 : 0)) ? (runtime.readIndex(desc, index).p1) : (sector_idx)));
                        for (let i = ((0) | 0); ((Number(i) !== Number(runtime.dereference(csect__3).size)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                            method_mfm_half_w(runtime, buffer, 6, runtime.readIndex(runtime.dereference(csect__3).data, i));
                        }
                        break;
                    }
                case 41:
                    {
                        let csect__4 = runtime.addressOf(sect, ((((Number(runtime.readIndex(desc, index).p1) >= Number(0)) ? 1 : 0)) ? (runtime.readIndex(desc, index).p1) : (sector_idx)));
                        for (let i = ((0) | 0); ((Number(i) !== Number(runtime.dereference(csect__4).size)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                            method_gcr5_w__3(runtime, buffer, runtime.readIndex(runtime.dereference(csect__4).data, i));
                        }
                        break;
                    }
                case 42:
                    {
                        let csect__5 = runtime.addressOf(sect, ((((Number(runtime.readIndex(desc, index).p1) >= Number(0)) ? 1 : 0)) ? (runtime.readIndex(desc, index).p1) : (sector_idx)));
                        let data = runtime.dereference(csect__5).data;
                        let size__2 = ((runtime.dereference(csect__5).size) | 0);
                        let ca = ((0) & 0xff);
                        let cb = ((0) & 0xff);
                        let cc = ((0) & 0xff);
                        for (let i = ((0) | 0); ((Number(i) < Number(size__2)) ? 1 : 0); i = ((((i) + (3))) | 0)) {
                            let dt = ((((size__2) - (i))) | 0);
                            let va = ((runtime.readIndex(data, i)) & 0xff);
                            let vb = ((((((Number(dt) > Number(1)) ? 1 : 0)) ? (runtime.readIndex(data, ((i) + (1)))) : (0))) & 0xff);
                            let vc = ((((((Number(dt) > Number(2)) ? 1 : 0)) ? (runtime.readIndex(data, ((i) + (2)))) : (0))) & 0xff);
                            cc = ((((((cc) << (1))) | (((cc) >>> (7))))) & 0xff);
                            let suma = ((runtime.add(((ca) + (va)), ((cc) & (1)))) | 0);
                            ca = ((suma) & 0xff);
                            va = ((((va) ^ (cc))) & 0xff);
                            let sumb = ((runtime.add(((cb) + (vb)), runtime.shiftRight(suma, 8))) | 0);
                            cb = ((sumb) & 0xff);
                            vb = ((((vb) ^ (ca))) & 0xff);
                            cc = ((runtime.add(((cc) + (vc)), runtime.shiftRight(sumb, 8))) & 0xff);
                            vc = ((((vc) ^ (cb))) & 0xff);
                            let nb = ((((((Number(dt) > Number(2)) ? 1 : 0)) ? (32) : (((((Number(dt) > Number(1)) ? 1 : 0)) ? (24) : (16))))) | 0);
                            method_raw_w__4(runtime, buffer, nb, runtime.shiftRight(method_gcr6_encode(runtime, va, vb, vc), ((32) - (nb))));
                        }
                        method_raw_w__4(runtime, buffer, 32, method_gcr6_encode(runtime, ca, cb, cc));
                        break;
                    }
                case 43:
                    {
                        let csect__6 = runtime.addressOf(sect, ((((Number(runtime.readIndex(desc, index).p1) >= Number(0)) ? 1 : 0)) ? (runtime.readIndex(desc, index).p1) : (sector_idx)));
                        for (let i = ((0) | 0); ((Number(i) !== Number(runtime.dereference(csect__6).size)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                            method__8n1_w(runtime, buffer, 8, runtime.readIndex(runtime.dereference(csect__6).data, i));
                        }
                        break;
                    }
                case 44:
                    {
                        let csect__7 = runtime.addressOf(sect, ((((Number(runtime.readIndex(desc, index).p1) >= Number(0)) ? 1 : 0)) ? (runtime.readIndex(desc, index).p1) : (sector_idx)));
                        let cksum = ((0) & 0xffff);
                        let data__1 = ((0) & 0xffff);
                        for (let i = ((0) | 0); ((Number(i) < Number(runtime.dereference(csect__7).size)) ? 1 : 0); i = ((((i) + (2))) | 0)) {
                            data__1 = ((runtime.readIndex(runtime.dereference(csect__7).data, ((i) + (1)))) & 0xffff);
                            method_fm_w__4(runtime, buffer, 8, data__1);
                            data__1 = ((((((data__1) << (8))) | (runtime.readIndex(runtime.dereference(csect__7).data, i)))) & 0xffff);
                            method_fm_w__4(runtime, buffer, 8, runtime.readIndex(runtime.dereference(csect__7).data, i));
                            cksum = ((((cksum) + (data__1))) & 0xffff);
                        }
                        method_fm_w__4(runtime, buffer, 16, cksum);
                        break;
                    }
                case 45:
                    {
                        let csect__8 = runtime.addressOf(sect, ((((Number(runtime.readIndex(desc, index).p1) >= Number(0)) ? 1 : 0)) ? (runtime.readIndex(desc, index).p1) : (sector_idx)));
                        let data__2 = ((0) & 0xff);
                        let cksum__1 = ((0) | 0);
                        for (let i = ((0) | 0); ((Number(i) !== Number(runtime.dereference(csect__8).size)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                            if (((Number(cksum__1) > Number(255)) ? 1 : 0)) {
                                cksum__1 = ((((cksum__1) + (1))) | 0);
                                cksum__1 = ((((cksum__1) & (255))) | 0);
                            }
                            data__2 = ((runtime.readIndex(runtime.dereference(csect__8).data, i)) & 0xff);
                            method_mfm_w__4(runtime, buffer, 8, data__2);
                            cksum__1 = ((((cksum__1) + (data__2))) | 0);
                        }
                        cksum__1 = ((((cksum__1) & (255))) | 0);
                        method_mfm_w__4(runtime, buffer, 8, cksum__1);
                        break;
                    }
                default:
                    {
                        (__l["printf"] ? __l["printf"]("%d.%d.%d (%d) unhandled\n", runtime.readIndex(desc, index).type, runtime.readIndex(desc, index).p1, runtime.readIndex(desc, index).p2, index) : runtime.macro("printf", "%d.%d.%d (%d) unhandled\n", runtime.readIndex(desc, index).type, runtime.readIndex(desc, index).p1, runtime.readIndex(desc, index).p2, index));
                        break;
                    }
            }
            index = ((((index) + (1))) | 0);
        }
        if (((Number((((buffer).length) | 0)) !== Number(track_size)) ? 1 : 0)) {
            (__l["__throw"] ? __l["__throw"]((__l["std::invalid_argument"] ? __l["std::invalid_argument"]((__l["util::string_format"] ? __l["util::string_format"]("Wrong track size in generate_track, expected %d, got %d", track_size, (buffer).length) : runtime.macro("util::string_format", "Wrong track size in generate_track, expected %d, got %d", track_size, (buffer).length))) : runtime.macro("std::invalid_argument", (__l["util::string_format"] ? __l["util::string_format"]("Wrong track size in generate_track, expected %d, got %d", track_size, (buffer).length) : runtime.macro("util::string_format", "Wrong track size in generate_track, expected %d, got %d", track_size, (buffer).length))))) : runtime.macro("__throw", (__l["std::invalid_argument"] ? __l["std::invalid_argument"]((__l["util::string_format"] ? __l["util::string_format"]("Wrong track size in generate_track, expected %d, got %d", track_size, (buffer).length) : runtime.macro("util::string_format", "Wrong track size in generate_track, expected %d, got %d", track_size, (buffer).length))) : runtime.macro("std::invalid_argument", (__l["util::string_format"] ? __l["util::string_format"]("Wrong track size in generate_track, expected %d, got %d", track_size, (buffer).length) : runtime.macro("util::string_format", "Wrong track size in generate_track, expected %d, got %d", track_size, (buffer).length))))));
        }
        method_fixup_crcs(runtime, buffer, crcs);
        method_generate_track_from_levels(runtime, track, head, buffer, 0, image);
    }
    function method_fm_w__4(runtime, buffer, n, val, size = 1000) {
        const members = runtime.members;
        for (let i = ((((n) - (1))) | 0); ((Number(i) >= Number(0)) ? 1 : 0); i = ((((i) - (1))) | 0)) {
            let bit = ((((((val) >>> (i))) & (1))) | 0);
            method_bit_w__3(runtime, buffer, 1, size);
            method_bit_w__3(runtime, buffer, bit, size);
        }
    }
    function method_mfm_w__4(runtime, buffer, n, val, size = 1000) {
        const members = runtime.members;
        let prec = ((((((buffer).length === 0 ? 1 : 0)) ? (0) : (method_bit_r(runtime, buffer, runtime.subtract((buffer).length, 1))))) | 0);
        for (let i = ((((n) - (1))) | 0); ((Number(i) >= Number(0)) ? 1 : 0); i = ((((i) - (1))) | 0)) {
            let bit = ((((((val) >>> (i))) & (1))) | 0);
            method_bit_w__3(runtime, buffer, (((((prec) || (bit)) ? 1 : 0)) ? 0 : 1), size);
            method_bit_w__3(runtime, buffer, bit, size);
            prec = ((bit) | 0);
        }
    }
    function method_gcr5_w__3(runtime, buffer, val, size = 1000) {
        const members = runtime.members;
        let e0 = (((__mame_table_1[(((((val) >>> (4))) % 16) + 16) % 16] ?? 0)) >>> 0);
        let e1 = (((__mame_table_1[(((((val) & (15))) % 16) + 16) % 16] ?? 0)) >>> 0);
        method_raw_w__4(runtime, buffer, 5, e0, size);
        method_raw_w__4(runtime, buffer, 5, e1, size);
    }
    function method_raw_w__4(runtime, buffer, n, val, size = 1000) {
        const members = runtime.members;
        for (let i = ((((n) - (1))) | 0); ((Number(i) >= Number(0)) ? 1 : 0); i = ((((i) - (1))) | 0)) {
            method_bit_w__3(runtime, buffer, ((((val) >>> (i))) & (1)), size);
        }
    }
    function method_generate_track_from_levels(runtime, track, head, trackbuf, splice_pos, image) {
        const members = runtime.members;
        splice_pos = ((((splice_pos) % ((trackbuf).length))) | 0);
        let splice_angular_pos = ((((runtime.readIndex(trackbuf, splice_pos)) & (268435455))) >>> 0);
        let dest = ((runtime.dereference(image)).get_buffer?.(track, head) ?? 0);
        (typeof (runtime.dereference(dest)).clear === 'function' ? (runtime.dereference(dest)).clear() : typeof (runtime.dereference(dest)).clear === 'number' || typeof (runtime.dereference(dest)).clear === 'boolean' ? (runtime.dereference(dest)).clear : runtime.container(dest, "clear"));
        let total_time = ((0) >>> 0);
        for (let __range0 = trackbuf, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
            let bit = ((((runtime.readIndex(__range0, __range0_index)) & (4026531840))) >>> 0);
            let time = ((((runtime.readIndex(__range0, __range0_index)) & (268435455))) >>> 0);
            if (((Number(bit) === Number(1342177280)) ? 1 : 0)) {
                (dest).push(((0) | (((total_time) + (((time) >>> (1)))))));
            }
            else {
                if (((Number(bit) !== Number(1073741824)) ? 1 : 0)) {
                    (dest).push(((bit) | (total_time)));
                }
            }
            total_time = ((((total_time) + (time))) >>> 0);
        }
        method_normalize_times(runtime, dest, total_time);
        ((runtime.dereference(image)).set_write_splice_position?.(track, head, splice_angular_pos) ?? 0);
    }
    function method_normalize_times(runtime, buffer, last_position) {
        const members = runtime.members;
        for (let i = 0; ((Number(i) !== Number((buffer).length)) ? 1 : 0); i = ((i) + (1))) {
            let time = ((((runtime.readIndex(buffer, i)) & (268435455))) >>> 0);
            runtime.writeIndex(buffer, i, ((((runtime.readIndex(buffer, i)) & (4026531840))) | (runtime.divide(((200000000) * (time)), last_position))));
        }
    }
    function method_extensions(runtime) {
        const members = runtime.members;
        return "d64";
    }
    function method_find_size(runtime, io, form_factor) {
        const members = runtime.members;
        let size = 0;
        size = (io).length();
        for (let i = ((0) | 0); runtime.readIndex((members.formats ?? 0), i).sector_count; i = ((((i) + (1))) | 0)) {
            let f = runtime.readIndex((members.formats ?? 0), i);
            if (((Number(size) === Number(((((((f.sector_count) >>> 0)) * (f.sector_base_size))) * (f.head_count)))) ? 1 : 0)) {
                return i;
            }
            if (((Number(size) === Number(((((((((f.sector_count) * (f.sector_base_size))) * (f.head_count))) >>> 0)) + (f.sector_count)))) ? 1 : 0)) {
                return i;
            }
        }
        return -1;
    }
    function method_identify(runtime, io, form_factor, variants) {
        const members = runtime.members;
        let type = ((method_find_size(runtime, io, form_factor)) | 0);
        if (((Number(type) !== Number(-1)) ? 1 : 0)) {
            return 4;
        }
        return 0;
    }
    function method_get_physical_track(runtime, f, head, track) {
        const members = runtime.members;
        return ((track) * (2));
    }
    function method_get_disk_id_offset(runtime, f) {
        const members = runtime.members;
        return 91554;
    }
    function method_get_disk_id(runtime, f, io, id1, id2) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let id = new Uint8Array(Math.max(0, Number(2)));
        (__l["read_at"] ? __l["read_at"](io, method_get_disk_id_offset(runtime, f), id, 2) : runtime.macro("read_at", io, method_get_disk_id_offset(runtime, f), id, 2));
        id1.set(((runtime.readIndex(id, 0)) & 0xff));
        id2.set(((runtime.readIndex(id, 1)) & 0xff));
    }
    function method_get_cell_size(runtime, f, track) {
        const members = runtime.members;
        return (__mame_table_5[((((__mame_table_4[(((track) % 42) + 42) % 42] ?? 0)) % 4) + 4) % 4] ?? 0);
    }
    function method_get_sectors_per_track(runtime, f, track) {
        const members = runtime.members;
        return (__mame_table_6[(((track) % 42) + 42) % 42] ?? 0);
    }
    function method_get_sector_desc(runtime, f, current_size, sector_count, id1, id2, gap_2) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        if ((((members.__static_get_sector_desc_desc__initialised ?? 0)) ? 0 : 1)) {
            members.__static_get_sector_desc_desc = [(__l["STRUCT"] ? __l["STRUCT"]("type", 56, "p1", 0, "p2", -1) : runtime.macro("STRUCT", "type", 56, "p1", 0, "p2", -1)), (__l["STRUCT"] ? __l["STRUCT"]("type", 7, "p1", 255, "p2", 5) : runtime.macro("STRUCT", "type", 7, "p1", 255, "p2", 5)), (__l["STRUCT"] ? __l["STRUCT"]("type", 4, "p1", 8, "p2", 1) : runtime.macro("STRUCT", "type", 4, "p1", 8, "p2", 1)), (__l["STRUCT"] ? __l["STRUCT"]("type", 55, "p1", 1, "p2", 0) : runtime.macro("STRUCT", "type", 55, "p1", 1, "p2", 0)), (__l["STRUCT"] ? __l["STRUCT"]("type", 49, "p1", 1, "p2", 0) : runtime.macro("STRUCT", "type", 49, "p1", 1, "p2", 0)), (__l["STRUCT"] ? __l["STRUCT"]("type", 23, "p1", 0, "p2", 0) : runtime.macro("STRUCT", "type", 23, "p1", 0, "p2", 0)), (__l["STRUCT"] ? __l["STRUCT"]("type", 12, "p1", 0, "p2", 0) : runtime.macro("STRUCT", "type", 12, "p1", 0, "p2", 0)), (__l["STRUCT"] ? __l["STRUCT"]("type", 4, "p1", id2, "p2", 1) : runtime.macro("STRUCT", "type", 4, "p1", id2, "p2", 1)), (__l["STRUCT"] ? __l["STRUCT"]("type", 4, "p1", id1, "p2", 1) : runtime.macro("STRUCT", "type", 4, "p1", id1, "p2", 1)), (__l["STRUCT"] ? __l["STRUCT"]("type", 54, "p1", 1, "p2", 0) : runtime.macro("STRUCT", "type", 54, "p1", 1, "p2", 0)), (__l["STRUCT"] ? __l["STRUCT"]("type", 4, "p1", 15, "p2", 2) : runtime.macro("STRUCT", "type", 4, "p1", 15, "p2", 2)), (__l["STRUCT"] ? __l["STRUCT"]("type", 7, "p1", 85, "p2", f.gap_1) : runtime.macro("STRUCT", "type", 7, "p1", 85, "p2", f.gap_1)), (__l["STRUCT"] ? __l["STRUCT"]("type", 7, "p1", 255, "p2", 5) : runtime.macro("STRUCT", "type", 7, "p1", 255, "p2", 5)), (__l["STRUCT"] ? __l["STRUCT"]("type", 4, "p1", 7, "p2", 1) : runtime.macro("STRUCT", "type", 4, "p1", 7, "p2", 1)), (__l["STRUCT"] ? __l["STRUCT"]("type", 49, "p1", 2, "p2", 0) : runtime.macro("STRUCT", "type", 49, "p1", 2, "p2", 0)), (__l["STRUCT"] ? __l["STRUCT"]("type", 41, "p1", -1, "p2", 0) : runtime.macro("STRUCT", "type", 41, "p1", -1, "p2", 0)), (__l["STRUCT"] ? __l["STRUCT"]("type", 54, "p1", 2, "p2", 0) : runtime.macro("STRUCT", "type", 54, "p1", 2, "p2", 0)), (__l["STRUCT"] ? __l["STRUCT"]("type", 55, "p1", 2, "p2", 0) : runtime.macro("STRUCT", "type", 55, "p1", 2, "p2", 0)), (__l["STRUCT"] ? __l["STRUCT"]("type", 4, "p1", 0, "p2", 2) : runtime.macro("STRUCT", "type", 4, "p1", 0, "p2", 2)), (__l["STRUCT"] ? __l["STRUCT"]("type", 7, "p1", 85, "p2", gap_2) : runtime.macro("STRUCT", "type", 7, "p1", 85, "p2", gap_2)), (__l["STRUCT"] ? __l["STRUCT"]("type", 57, "p1", 0, "p2", 0) : runtime.macro("STRUCT", "type", 57, "p1", 0, "p2", 0)), (__l["STRUCT"] ? __l["STRUCT"]("type", 7, "p1", 85, "p2", 0) : runtime.macro("STRUCT", "type", 7, "p1", 85, "p2", 0)), (__l["STRUCT"] ? __l["STRUCT"]("type", 8, "p1", 21845, "p2", 0) : runtime.macro("STRUCT", "type", 8, "p1", 21845, "p2", 0)), (__l["STRUCT"] ? __l["STRUCT"]("type", 0, "p1", 0, "p2", 0) : runtime.macro("STRUCT", "type", 0, "p1", 0, "p2", 0))];
            members.__static_get_sector_desc_desc__initialised = 1;
        }
        let desc = (members.__static_get_sector_desc_desc ?? 0);
        current_size.set(((runtime.add(runtime.add(runtime.add(runtime.add(120, ((f.gap_1) * (8))), 40), ((runtime.add(runtime.add(((1) + (f.sector_base_size)), 1), 2)) * (10))), ((gap_2) * (8)))) | 0));
        current_size.set(((((current_size.get()) * (sector_count))) | 0));
        return desc;
    }
    function method_build_sector_description(runtime, f, sectdata, sect_offs, error_offs, sectors, sector_count) {
        const members = runtime.members;
        const __pointee_sectors = runtime.dereference(sectors);
        for (let i = ((0) | 0); ((Number(i) < Number(sector_count)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            runtime.readIndex(sectors, i).data = runtime.addressOf(sectdata, sect_offs);
            runtime.readIndex(sectors, i).size = ((f.sector_base_size) | 0);
            runtime.readIndex(sectors, i).sector_id = ((i) & 0xff);
            runtime.readIndex(sectors, i).sector_info = ((runtime.readIndex(sectdata, error_offs)) & 0xff);
            sect_offs = ((((sect_offs) + (runtime.readIndex(sectors, i).size))) >>> 0);
            error_offs = ((((error_offs) + (1))) >>> 0);
        }
    }
    function method_fix_end_gap(runtime, desc, remaining_size) {
        const members = runtime.members;
        runtime.readIndex(desc, 21).p2 = runtime.divide(remaining_size, 8);
        runtime.readIndex(desc, 22).p2 = ((remaining_size) & (7));
        runtime.readIndex(desc, 22).p1 = runtime.shiftRight(runtime.readIndex(desc, 22).p1, ((remaining_size) & (1)));
    }
    function method_load(runtime, io, form_factor, variants, image) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h___local_load_sectors = members.__local_load_sectors ?? 0;
        let type = ((method_find_size(runtime, io, form_factor)) | 0);
        if (((Number(type) === Number(-1)) ? 1 : 0)) {
            return 0;
        }
        let f = runtime.readIndex((members.formats ?? 0), type);
        let size = 0;
        size = (io).length();
        let img = [];
        if (((Number(size) === Number(((((f.sector_count) >>> 0)) * (f.sector_base_size)))) ? 1 : 0)) {
            (img = runtime.resize(img, ((size) + (f.sector_count))));
            (() => { const target = runtime.addressOf(img, 0); const bytes = Number(((size) + (f.sector_count))); if (Array.isArray(target) || Array.isArray(target?.source))
                return runtime.macro("memset", target, 1, bytes); if (target?.generatedPointer) {
                const width = target.source.BYTES_PER_ELEMENT ?? 1;
                target.source.fill(1, target.offset, target.offset + Math.ceil(bytes / width));
                return target;
            } target.fill(1, 0, bytes); return target; })();
        }
        else {
            (img = runtime.resize(img, size));
        }
        (__l["read_at"] ? __l["read_at"](io, 0, runtime.addressOf(img, 0), size) : runtime.macro("read_at", io, 0, runtime.addressOf(img, 0), size));
        let track_offset = ((0) | 0);
        let error_offset = ((((f.sector_count) * (f.sector_base_size))) | 0);
        let id1 = ((0) & 0xff);
        let id2 = ((0) & 0xff);
        method_get_disk_id(runtime, f, io, ({ generatedLValue: true, get: () => id1, set: (value) => { id1 = ((value) & 0xff); } }), ({ generatedLValue: true, get: () => id2, set: (value) => { id2 = ((value) & 0xff); } }));
        for (let head = ((0) | 0); ((Number(head) < Number(f.head_count)) ? 1 : 0); head = ((((head) + (1))) | 0)) {
            for (let track = ((0) | 0); ((Number(track) < Number(f.track_count)) ? 1 : 0); track = ((((track) + (1))) | 0)) {
                let current_size = ((0) | 0);
                let total_size = ((((200000000) / (method_get_cell_size(runtime, f, track)))) | 0);
                let physical_track = ((method_get_physical_track(runtime, f, head, track)) | 0);
                let sector_count = ((method_get_sectors_per_track(runtime, f, track)) | 0);
                let track_size = ((((sector_count) * (f.sector_base_size))) | 0);
                let gap2 = ((method_get_gap2(runtime, f, head, track)) | 0);
                let desc = method_get_sector_desc(runtime, f, ({ generatedLValue: true, get: () => current_size, set: (value) => { current_size = ((value) | 0); } }), sector_count, id1, id2, gap2);
                let remaining_size = ((((total_size) - (current_size))) | 0);
                if (((Number(remaining_size) < Number(0)) ? 1 : 0)) {
                    (__l["osd_printf_error"] ? __l["osd_printf_error"]("d64_format: Incorrect track layout, max_size=%d, current_size=%d\n", total_size, current_size) : runtime.macro("osd_printf_error", "d64_format: Incorrect track layout, max_size=%d, current_size=%d\n", total_size, current_size));
                    return 0;
                }
                ((runtime.dereference((members.this ?? 0))).fix_end_gap?.(desc, remaining_size) ?? 0);
                let sectors = h___local_load_sectors;
                method_build_sector_description(runtime, f, runtime.addressOf(img, 0), track_offset, error_offset, sectors, sector_count);
                method_generate_track(runtime, desc, physical_track, head, sectors, sector_count, total_size, image);
                track_offset = ((((track_offset) + (track_size))) | 0);
                error_offset = ((((error_offset) + (sector_count))) | 0);
            }
        }
        ((runtime.dereference(image)).set_variant?.(f.variant) ?? 0);
        return 1;
    }
    function method_get_gap2(runtime, f, head, track) {
        const members = runtime.members;
        return f.gap_2;
    }
    function method___construct(runtime) {
        const members = runtime.members;
        const h_file_formats = members.file_formats ?? 0;
        members.formats = h_file_formats;
    }
    return {
        "type_no_data": method_type_no_data,
        "type_data_mfm": method_type_data_mfm,
        "collect_crcs": method_collect_crcs,
        "crc_cells_size": method_crc_cells_size,
        "bit_r": method_bit_r,
        "bitn_r": method_bitn_r,
        "mfm_half_w": method_mfm_half_w,
        "bit_w__3": method_bit_w__3,
        "_8n1_w": method__8n1_w,
        "fixup_crc_amiga": method_fixup_crc_amiga,
        "mfm_w__5": method_mfm_w__5,
        "bit_w__4": method_bit_w__4,
        "fixup_crc_cbm": method_fixup_crc_cbm,
        "gcr5_w__4": method_gcr5_w__4,
        "raw_w__5": method_raw_w__5,
        "calc_crc_ccitt": method_calc_crc_ccitt,
        "fixup_crc_ccitt": method_fixup_crc_ccitt,
        "fixup_crc_ccitt_fm": method_fixup_crc_ccitt_fm,
        "fm_w__5": method_fm_w__5,
        "fixup_crc_machead": method_fixup_crc_machead,
        "fixup_crc_fcs": method_fixup_crc_fcs,
        "fixup_crc_victor_header": method_fixup_crc_victor_header,
        "fixup_crc_victor_data": method_fixup_crc_victor_data,
        "fixup_crcs": method_fixup_crcs,
        "gcr6_encode": method_gcr6_encode,
        "calc_sector_index": method_calc_sector_index,
        "generate_track": method_generate_track,
        "fm_w__4": method_fm_w__4,
        "mfm_w__4": method_mfm_w__4,
        "gcr5_w__3": method_gcr5_w__3,
        "raw_w__4": method_raw_w__4,
        "generate_track_from_levels": method_generate_track_from_levels,
        "normalize_times": method_normalize_times,
        "extensions": method_extensions,
        "find_size": method_find_size,
        "identify": method_identify,
        "get_physical_track": method_get_physical_track,
        "get_disk_id_offset": method_get_disk_id_offset,
        "get_cell_size": method_get_cell_size,
        "get_sectors_per_track": method_get_sectors_per_track,
        "build_sector_description": method_build_sector_description,
        "fix_end_gap": method_fix_end_gap,
        "load": method_load,
        "get_gap2": method_get_gap2,
        "__construct": method___construct
    };
})();
definition.floppyFormats[0].definition.compiledMethodLinks = ["STRUCT", "STRUCT_ARRAY_OF", "__throw", "osd_printf_error", "printf", "read_at", "std::invalid_argument", "util::string_format"];
definition.floppyFormats[1].definition.compiledMethods = (() => {
    function method_normalize_times(runtime, buffer, last_position) {
        const members = runtime.members;
        for (let i = 0; ((Number(i) !== Number((buffer).length)) ? 1 : 0); i = ((i) + (1))) {
            let time = ((((runtime.readIndex(buffer, i)) & (268435455))) >>> 0);
            runtime.writeIndex(buffer, i, ((((runtime.readIndex(buffer, i)) & (4026531840))) | (runtime.divide(((200000000) * (time)), last_position))));
        }
    }
    function method_generate_track_from_bitstream(runtime, track, head, trackbuf, track_size, image, subtrack = 0, splice = 0) {
        const members = runtime.members;
        let dest = ((runtime.dereference(image)).get_buffer?.(track, head, subtrack) ?? 0);
        (typeof (runtime.dereference(dest)).clear === 'function' ? (runtime.dereference(dest)).clear() : typeof (runtime.dereference(dest)).clear === 'number' || typeof (runtime.dereference(dest)).clear === 'boolean' ? (runtime.dereference(dest)).clear : runtime.container(dest, "clear"));
        for (let i = ((0) | 0); ((Number(i) !== Number(track_size)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            if (((runtime.readIndex(trackbuf, runtime.shiftRight(i, 3))) & (runtime.shiftRight(128, ((i) & (7)))))) {
                (dest).push(((0) | (runtime.add(((i) * (2)), 1))));
            }
        }
        method_normalize_times(runtime, dest, ((track_size) * (2)));
        if ((((((Number(splice) >= Number(0)) ? 1 : 0)) && (((Number(splice) < Number(track_size)) ? 1 : 0))) ? 1 : 0)) {
            let splpos = ((runtime.divide(((200000000) * (splice)), track_size)) | 0);
            ((runtime.dereference(image)).set_write_splice_position?.(track, head, splpos, subtrack) ?? 0);
        }
    }
    function method_identify(runtime, io, form_factor, variants) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let h = new Uint8Array(Math.max(0, Number(8)));
        let __binding_25 = (__l["read_at"] ? __l["read_at"](io, 0, h, 8) : runtime.macro("read_at", io, 0, h, 8));
        let err = runtime.readIndex(__binding_25, 0);
        let actual = runtime.readIndex(__binding_25, 1);
        if ((((err) || (((Number(8) !== Number(actual)) ? 1 : 0))) ? 1 : 0)) {
            return 0;
        }
        if ((((__l["memcmp"] ? __l["memcmp"](h, "GCR-1541", 8) : runtime.macro("memcmp", h, "GCR-1541", 8))) ? 0 : 1)) {
            return 8;
        }
        return 0;
    }
    function method_load(runtime, io, form_factor, variants, image) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let size = 0;
        size = (io).length();
        let __binding_30 = (__l["read_at"] ? __l["read_at"](io, 0, size) : runtime.macro("read_at", io, 0, size));
        let err = runtime.readIndex(__binding_30, 0);
        let img = runtime.readIndex(__binding_30, 1);
        let actual = runtime.readIndex(__binding_30, 2);
        if ((((err) || (((Number(actual) !== Number(size)) ? 1 : 0))) ? 1 : 0)) {
            return 0;
        }
        if (runtime.readIndex(img, 8)) {
            (__l["osd_printf_error"] ? __l["osd_printf_error"]("g64_format: Unsupported version %u\n", runtime.readIndex(img, 8)) : runtime.macro("osd_printf_error", "g64_format: Unsupported version %u\n", runtime.readIndex(img, 8)));
            return 0;
        }
        let track_count = ((runtime.readIndex(img, 9)) | 0);
        let head = ((0) | 0);
        for (let track = ((0) | 0); ((Number(track) < Number(track_count)) ? 1 : 0); track = ((((track) + (1))) | 0)) {
            let cylinder = ((((track) % (84))) | 0);
            if (((Number(track) === Number(84)) ? 1 : 0)) {
                head = ((1) | 0);
            }
            let tpos = ((runtime.add(12, ((track) * (4)))) >>> 0);
            let spos = ((((tpos) + (((track_count) * (4))))) >>> 0);
            let dpos = (((__l["get_u32le"] ? __l["get_u32le"](runtime.addressOf(img, tpos)) : runtime.macro("get_u32le", runtime.addressOf(img, tpos)))) >>> 0);
            if (((dpos) ? 0 : 1)) {
                continue;
            }
            if (((Number(dpos) > Number(size)) ? 1 : 0)) {
                (__l["osd_printf_error"] ? __l["osd_printf_error"]("g64_format: Track %u offset %06x out of bounds\n", track, dpos) : runtime.macro("osd_printf_error", "g64_format: Track %u offset %06x out of bounds\n", track, dpos));
                return 0;
            }
            let speed_zone = (((__l["get_u32le"] ? __l["get_u32le"](runtime.addressOf(img, spos)) : runtime.macro("get_u32le", runtime.addressOf(img, spos)))) >>> 0);
            if (((Number(speed_zone) > Number(3)) ? 1 : 0)) {
                (__l["osd_printf_error"] ? __l["osd_printf_error"]("g64_format: Unsupported variable speed zones on track %d\n", track) : runtime.macro("osd_printf_error", "g64_format: Unsupported variable speed zones on track %d\n", track));
                return 0;
            }
            let track_bytes = (((__l["get_u16le"] ? __l["get_u16le"](runtime.addressOf(img, dpos)) : runtime.macro("get_u16le", runtime.addressOf(img, dpos)))) & 0xffff);
            let track_size = ((((track_bytes) * (8))) | 0);
            0;
            method_generate_track_from_bitstream(runtime, cylinder, head, runtime.addressOf(img, ((dpos) + (2))), track_size, image);
        }
        if (((head) ? 0 : 1)) {
            ((runtime.dereference(image)).set_variant?.(1146311507) ?? 0);
        }
        else {
            ((runtime.dereference(image)).set_variant?.(1146311492) ?? 0);
        }
        return 1;
    }
    function method_extensions(runtime) {
        const members = runtime.members;
        return "g64,g41,g71";
    }
    function method___construct(runtime) {
        const members = runtime.members;
    }
    return {
        "normalize_times": method_normalize_times,
        "generate_track_from_bitstream": method_generate_track_from_bitstream,
        "identify": method_identify,
        "load": method_load,
        "extensions": method_extensions,
        "__construct": method___construct
    };
})();
definition.floppyFormats[1].definition.compiledMethodLinks = ["get_u16le", "get_u32le", "memcmp", "osd_printf_error", "read_at"];
definition.floppyImage.compiledMethods = (() => {
    function method_set_variant(runtime, _variant) {
        const members = runtime.members;
        const h_index_array = members.index_array ?? 0;
        members.variant = ((_variant) >>> 0);
        (typeof (runtime.dereference(h_index_array)).clear === 'function' ? (runtime.dereference(h_index_array)).clear() : typeof (runtime.dereference(h_index_array)).clear === 'number' || typeof (runtime.dereference(h_index_array)).clear === 'boolean' ? (runtime.dereference(h_index_array)).clear : runtime.container(h_index_array, "clear"));
        let sectors = ((0) >>> 0);
        switch ((members.variant ?? 0)) {
            case 909198419:
            case 909201747:
            case 909198404:
            case 909201732:
                {
                    sectors = ((16) >>> 0);
                    break;
                }
            default:
                {
                    sectors = ((0) >>> 0);
                }
        }
        if (sectors) {
            let sector_angle = ((runtime.divide(200000000, sectors)) >>> 0);
            for (let i = ((1) | 0); ((Number(i) < Number(sectors)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                (h_index_array).push(((i) * (sector_angle)));
            }
            (h_index_array).push(runtime.add(((((sectors) - (1))) * (sector_angle)), runtime.divide(sector_angle, 2)));
        }
    }
    function method_find_index_hole(runtime, pos, last, next) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_index_array = members.index_array ?? 0;
        let nexti = (__l["std::lower_bound"] ? __l["std::lower_bound"](runtime.container(h_index_array, "begin"), runtime.container(h_index_array, "end"), ((pos) + (1))) : runtime.macro("std::lower_bound", runtime.container(h_index_array, "begin"), runtime.container(h_index_array, "end"), ((pos) + (1))));
        next.set((((((runtime.same(nexti, runtime.container(h_index_array, "end")) ? 1 : 0)) ? (200000000) : (runtime.dereference(nexti)))) >>> 0));
        last.set((((((runtime.same(nexti, runtime.container(h_index_array, "begin")) ? 1 : 0)) ? (0) : (runtime.dereference((nexti = ((nexti) - (1))))))) >>> 0));
    }
    function method_get_maximal_geometry(runtime, _tracks, _heads) {
        const members = runtime.members;
        _tracks.set((((members.tracks ?? 0)) | 0));
        _heads.set((((members.heads ?? 0)) | 0));
    }
    function method_get_actual_geometry(runtime, _tracks, _heads) {
        const members = runtime.members;
        let maxt = ((0) | 0);
        let maxh = ((0) | 0);
        let __goto_track_done = ((0) | 0);
        while (1) {
            maxt = (((((((members.tracks ?? 0)) - (1))) * (4))) | 0);
            maxh = (((((members.heads ?? 0)) - (1))) | 0);
            while (((Number(maxt) >= Number(0)) ? 1 : 0)) {
                for (let i = ((0) | 0); ((Number(i) <= Number(maxh)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    if (((((runtime.readIndex(runtime.readIndex((members.track_array ?? 0), maxt), i).cell_data).length === 0 ? 1 : 0)) ? 0 : 1)) {
                        __goto_track_done = ((1) | 0);
                        break;
                    }
                }
                if (__goto_track_done) {
                    break;
                }
                maxt = ((((maxt) - (1))) | 0);
            }
            if (__goto_track_done) {
                break;
            }
            break;
        }
        let __goto_head_done = ((0) | 0);
        while (1) {
            if (((Number(maxt) >= Number(0)) ? 1 : 0)) {
                while (((Number(maxh) >= Number(0)) ? 1 : 0)) {
                    for (let i = ((0) | 0); ((Number(i) <= Number(maxt)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                        if (((((runtime.readIndex(runtime.readIndex((members.track_array ?? 0), i), maxh).cell_data).length === 0 ? 1 : 0)) ? 0 : 1)) {
                            __goto_head_done = ((1) | 0);
                            break;
                        }
                    }
                    if (__goto_head_done) {
                        break;
                    }
                    maxh = ((((maxh) - (1))) | 0);
                }
                if (__goto_head_done) {
                    break;
                }
            }
            else {
                maxh = ((-1) | 0);
            }
            break;
        }
        _tracks.set(((runtime.divide(((maxt) + (4)), 4)) | 0));
        _heads.set(((((maxh) + (1))) | 0));
    }
    function method_get_resolution(runtime) {
        const members = runtime.members;
        let mask = ((0) | 0);
        for (let i = ((0) | 0); ((Number(i) <= Number((((((members.tracks ?? 0)) - (1))) * (4)))) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            for (let j = ((0) | 0); ((Number(j) < Number((members.heads ?? 0))) ? 1 : 0); j = ((((j) + (1))) | 0)) {
                if (((((runtime.readIndex(runtime.readIndex((members.track_array ?? 0), i), j).cell_data).length === 0 ? 1 : 0)) ? 0 : 1)) {
                    mask = ((((mask) | (((1) << (((i) & (3))))))) | 0);
                }
            }
        }
        if (((mask) & (10))) {
            return 2;
        }
        if (((mask) & (4))) {
            return 1;
        }
        return 0;
    }
    function method_track_is_formatted(runtime, track, head, subtrack = 0) {
        const members = runtime.members;
        let idx = ((((((track) * (4))) + (subtrack))) | 0);
        if (((Number(((((members.track_array ?? 0)).length) | 0)) <= Number(idx)) ? 1 : 0)) {
            return 0;
        }
        if (((Number((((runtime.readIndex((members.track_array ?? 0), idx)).length) | 0)) <= Number(head)) ? 1 : 0)) {
            return 0;
        }
        let data = runtime.readIndex(runtime.readIndex((members.track_array ?? 0), idx), head).cell_data;
        if (((data).length === 0 ? 1 : 0)) {
            return 0;
        }
        for (let __range0 = data, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
            if (((Number(((runtime.readIndex(__range0, __range0_index)) & (4026531840))) === Number(0)) ? 1 : 0)) {
                return 1;
            }
        }
        return 0;
    }
    function method_get_variant_name(runtime, form_factor, variant) {
        const members = runtime.members;
        switch (variant) {
            case 1146311507:
                {
                    return "Single side, single density";
                }
            case 808538963:
                {
                    return "Single side, single density, 10-sector";
                }
            case 909202259:
                {
                    return "Single side, single density, 16-sector";
                }
            case 842224467:
                {
                    return "Single side, single density, 32-sector";
                }
            case 1145328467:
                {
                    return "Single side, double density";
                }
            case 808535123:
                {
                    return "Single side, double density, 10-sector";
                }
            case 909198419:
                {
                    return "Single side, double density, 16 hard sector";
                }
            case 842220627:
                {
                    return "Single side, double density, 32-sector";
                }
            case 1146180435:
                {
                    return "Single side, quad density";
                }
            case 808538451:
                {
                    return "Single side, quad density, 10-sector";
                }
            case 909201747:
                {
                    return "Single side, quad density, 16 hard sector";
                }
            case 1146311492:
                {
                    return "Double side, single density";
                }
            case 808538948:
                {
                    return "Double side, single density, 10-sector";
                }
            case 909202244:
                {
                    return "Double side, single density, 16-sector";
                }
            case 842224452:
                {
                    return "Double side, single density, 32-sector";
                }
            case 1145328452:
                {
                    return "Double side, double density";
                }
            case 808535108:
                {
                    return "Double side, double density, 10-sector";
                }
            case 909198404:
                {
                    return "Double side, double density, 16 hard sector";
                }
            case 842220612:
                {
                    return "Double side, double density, 32-sector";
                }
            case 1146180420:
                {
                    return "Double side, quad density";
                }
            case 808538436:
                {
                    return "Double side, quad density, 10-sector";
                }
            case 909201732:
                {
                    return "Double side, quad density, 16 hard sector";
                }
            case 1145590596:
                {
                    return "Double side, high density";
                }
            case 1145393988:
                {
                    return "Double side, extended density";
                }
        }
        return "Unknown";
    }
    function method_get_form_factor(runtime) {
        const members = runtime.members;
        return (members.form_factor ?? 0);
    }
    function method_get_variant(runtime) {
        const members = runtime.members;
        return (members.variant ?? 0);
    }
    function method_get_sectoring(runtime) {
        const members = runtime.members;
        return (members.sectoring ?? 0);
    }
    function method_set_form_variant(runtime, f, v) {
        const members = runtime.members;
        if (((Number((members.form_factor ?? 0)) === Number(0)) ? 1 : 0)) {
            members.form_factor = ((f) >>> 0);
        }
        method_set_variant(runtime, v);
    }
    function method_set_sectoring(runtime, s) {
        const members = runtime.members;
        members.sectoring = ((s) >>> 0);
    }
    function method_get_buffer(runtime, track, head, subtrack = 0) {
        const members = runtime.members;
        0;
        return runtime.readIndex(runtime.readIndex((members.track_array ?? 0), ((((track) * (4))) + (subtrack))), head).cell_data;
    }
    function method_floppy_image__get_buffer(runtime, track, head, subtrack = 0) {
        const members = runtime.members;
        0;
        return runtime.readIndex(runtime.readIndex((members.track_array ?? 0), ((((track) * (4))) + (subtrack))), head).cell_data;
    }
    function method_set_write_splice_position(runtime, track, head, pos, subtrack = 0) {
        const members = runtime.members;
        0;
        runtime.readIndex(runtime.readIndex((members.track_array ?? 0), ((((track) * (4))) + (subtrack))), head).write_splice = pos;
    }
    function method_get_write_splice_position(runtime, track, head, subtrack = 0) {
        const members = runtime.members;
        0;
        return runtime.readIndex(runtime.readIndex((members.track_array ?? 0), ((((track) * (4))) + (subtrack))), head).write_splice;
    }
    function method_floppy_image__get_form_factor(runtime) {
        const members = runtime.members;
        return (members.form_factor ?? 0);
    }
    function method_floppy_image__get_variant(runtime) {
        const members = runtime.members;
        return (members.variant ?? 0);
    }
    function method_floppy_image__get_sectoring(runtime) {
        const members = runtime.members;
        return (members.sectoring ?? 0);
    }
    function method_floppy_image__set_form_variant(runtime, f, v) {
        const members = runtime.members;
        if (((Number((members.form_factor ?? 0)) === Number(0)) ? 1 : 0)) {
            members.form_factor = ((f) >>> 0);
        }
        method_set_variant(runtime, v);
    }
    function method_floppy_image__set_sectoring(runtime, s) {
        const members = runtime.members;
        members.sectoring = ((s) >>> 0);
    }
    function method_floppy_image__set_write_splice_position(runtime, track, head, pos, subtrack = 0) {
        const members = runtime.members;
        0;
        runtime.readIndex(runtime.readIndex((members.track_array ?? 0), ((((track) * (4))) + (subtrack))), head).write_splice = pos;
    }
    function method_floppy_image__get_write_splice_position(runtime, track, head, subtrack = 0) {
        const members = runtime.members;
        0;
        return runtime.readIndex(runtime.readIndex((members.track_array ?? 0), ((((track) * (4))) + (subtrack))), head).write_splice;
    }
    function method___construct(runtime, _tracks, _heads, _form_factor) {
        const members = runtime.members;
        members.tracks = ((_tracks) | 0);
        members.heads = ((_heads) | 0);
        members.form_factor = ((_form_factor) >>> 0);
        members.variant = ((0) >>> 0);
        (members.track_array = runtime.resize((members.track_array ?? 0), runtime.add((((members.tracks ?? 0)) * (4)), 1)));
        for (let i = ((0) | 0); ((Number(i) < Number(runtime.add((((members.tracks ?? 0)) * (4)), 1))) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            runtime.resize(runtime.readIndex((members.track_array ?? 0), i), (members.heads ?? 0));
        }
    }
    return {
        "set_variant": method_set_variant,
        "get_resolution": method_get_resolution,
        "track_is_formatted": method_track_is_formatted,
        "get_variant_name": method_get_variant_name,
        "get_form_factor": method_get_form_factor,
        "get_variant": method_get_variant,
        "get_sectoring": method_get_sectoring,
        "set_form_variant": method_set_form_variant,
        "set_sectoring": method_set_sectoring,
        "get_buffer": method_get_buffer,
        "floppy_image::get_buffer": method_floppy_image__get_buffer,
        "set_write_splice_position": method_set_write_splice_position,
        "get_write_splice_position": method_get_write_splice_position,
        "floppy_image::get_form_factor": method_floppy_image__get_form_factor,
        "floppy_image::get_variant": method_floppy_image__get_variant,
        "floppy_image::get_sectoring": method_floppy_image__get_sectoring,
        "floppy_image::set_form_variant": method_floppy_image__set_form_variant,
        "floppy_image::set_sectoring": method_floppy_image__set_sectoring,
        "floppy_image::set_write_splice_position": method_floppy_image__set_write_splice_position,
        "floppy_image::get_write_splice_position": method_floppy_image__get_write_splice_position,
        "__construct": method___construct
    };
})();
definition.floppyImage.compiledMethodLinks = ["std::lower_bound"];
export const device = definition;
export default device;
