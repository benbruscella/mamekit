import deviceData from './snapshot.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_process_snapshot_or_quickload(runtime, param) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        (__l["check_for_file"] ? __l["check_for_file"]() : runtime.macro("check_for_file"));
        let __binding_17 = (__l["m_load"] ? __l["m_load"](runtime.dereference((members.this ?? 0))) : runtime.macro("m_load", runtime.dereference((members.this ?? 0))));
        let err = runtime.readIndex(__binding_17, 0);
        let message = runtime.readIndex(__binding_17, 1);
        if (err) {
            (__l["osd_printf_error"] ? __l["osd_printf_error"](((((((message).length === 0 ? 1 : 0)) ? 0 : 1)) ? ("%1$s: Error loading '%2$s': %3$s (%4$s:%5$d %6$s)\n") : ("%1$s: Error loading '%2$s': %6$s (%4$s:%5$d)\n")), (__l["tag"] ? __l["tag"]() : runtime.macro("tag")), (__l["basename"] ? __l["basename"]() : runtime.macro("basename")), message, ((runtime.dereference((typeof (runtime.dereference(err)).category === 'function' ? (runtime.dereference(err)).category() : typeof (runtime.dereference(err)).category === 'number' || typeof (runtime.dereference(err)).category === 'boolean' ? (runtime.dereference(err)).category : runtime.container(err, "category")))).name?.() ?? runtime.container((typeof (runtime.dereference(err)).category === 'function' ? (runtime.dereference(err)).category() : typeof (runtime.dereference(err)).category === 'number' || typeof (runtime.dereference(err)).category === 'boolean' ? (runtime.dereference(err)).category : runtime.container(err, "category")), "name")), (typeof (runtime.dereference(err)).value === 'function' ? (runtime.dereference(err)).value() : typeof (runtime.dereference(err)).value === 'number' || typeof (runtime.dereference(err)).value === 'boolean' ? (runtime.dereference(err)).value : runtime.container(err, "value")), (typeof (runtime.dereference(err)).message === 'function' ? (runtime.dereference(err)).message() : typeof (runtime.dereference(err)).message === 'number' || typeof (runtime.dereference(err)).message === 'boolean' ? (runtime.dereference(err)).message : runtime.container(err, "message"))) : runtime.macro("osd_printf_error", ((((((message).length === 0 ? 1 : 0)) ? 0 : 1)) ? ("%1$s: Error loading '%2$s': %3$s (%4$s:%5$d %6$s)\n") : ("%1$s: Error loading '%2$s': %6$s (%4$s:%5$d)\n")), (__l["tag"] ? __l["tag"]() : runtime.macro("tag")), (__l["basename"] ? __l["basename"]() : runtime.macro("basename")), message, ((runtime.dereference((typeof (runtime.dereference(err)).category === 'function' ? (runtime.dereference(err)).category() : typeof (runtime.dereference(err)).category === 'number' || typeof (runtime.dereference(err)).category === 'boolean' ? (runtime.dereference(err)).category : runtime.container(err, "category")))).name?.() ?? runtime.container((typeof (runtime.dereference(err)).category === 'function' ? (runtime.dereference(err)).category() : typeof (runtime.dereference(err)).category === 'number' || typeof (runtime.dereference(err)).category === 'boolean' ? (runtime.dereference(err)).category : runtime.container(err, "category")), "name")), (typeof (runtime.dereference(err)).value === 'function' ? (runtime.dereference(err)).value() : typeof (runtime.dereference(err)).value === 'number' || typeof (runtime.dereference(err)).value === 'boolean' ? (runtime.dereference(err)).value : runtime.container(err, "value")), (typeof (runtime.dereference(err)).message === 'function' ? (runtime.dereference(err)).message() : typeof (runtime.dereference(err)).message === 'number' || typeof (runtime.dereference(err)).message === 'boolean' ? (runtime.dereference(err)).message : runtime.container(err, "message"))));
            0;
        }
    }
    return {
        "process_snapshot_or_quickload": method_process_snapshot_or_quickload
    };
})();
definition.compiledMethodLinks = ["basename", "check_for_file", "m_load", "osd_printf_error", "tag"];
export const device = definition;
export default device;
