// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './quickload.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {


  function method_get_software_list_loader(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    return (__l["image_software_list_loader::instance"] ? __l["image_software_list_loader::instance"]() : runtime.macro("image_software_list_loader::instance"));
  }

  function method_process_snapshot_or_quickload(runtime: any, param: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["check_for_file"] ? __l["check_for_file"]() : runtime.macro("check_for_file"));
    let __binding_17: any = (__l["m_load"] ? __l["m_load"](runtime.dereference((members.this ?? 0))) : runtime.macro("m_load", runtime.dereference((members.this ?? 0))));
    let err: any = runtime.readIndex(__binding_17, 0);
    let message: any = runtime.readIndex(__binding_17, 1);
    if (err) {
      (__l["osd_printf_error"] ? __l["osd_printf_error"](((((((message).length === 0 ? 1 : 0)) ? 0 : 1)) ? ("%1$s: Error loading '%2$s': %3$s (%4$s:%5$d %6$s)\n") : ("%1$s: Error loading '%2$s': %6$s (%4$s:%5$d)\n")), (__l["tag"] ? __l["tag"]() : runtime.macro("tag")), (__l["basename"] ? __l["basename"]() : runtime.macro("basename")), message, ((runtime.dereference((typeof (runtime.dereference(err)).category === 'function' ? (runtime.dereference(err)).category() : typeof (runtime.dereference(err)).category === 'number' || typeof (runtime.dereference(err)).category === 'boolean' ? (runtime.dereference(err)).category : runtime.container(err, "category")))).name?.() ?? runtime.container((typeof (runtime.dereference(err)).category === 'function' ? (runtime.dereference(err)).category() : typeof (runtime.dereference(err)).category === 'number' || typeof (runtime.dereference(err)).category === 'boolean' ? (runtime.dereference(err)).category : runtime.container(err, "category")), "name")), (typeof (runtime.dereference(err)).value === 'function' ? (runtime.dereference(err)).value() : typeof (runtime.dereference(err)).value === 'number' || typeof (runtime.dereference(err)).value === 'boolean' ? (runtime.dereference(err)).value : runtime.container(err, "value")), (typeof (runtime.dereference(err)).message === 'function' ? (runtime.dereference(err)).message() : typeof (runtime.dereference(err)).message === 'number' || typeof (runtime.dereference(err)).message === 'boolean' ? (runtime.dereference(err)).message : runtime.container(err, "message"))) : runtime.macro("osd_printf_error", ((((((message).length === 0 ? 1 : 0)) ? 0 : 1)) ? ("%1$s: Error loading '%2$s': %3$s (%4$s:%5$d %6$s)\n") : ("%1$s: Error loading '%2$s': %6$s (%4$s:%5$d)\n")), (__l["tag"] ? __l["tag"]() : runtime.macro("tag")), (__l["basename"] ? __l["basename"]() : runtime.macro("basename")), message, ((runtime.dereference((typeof (runtime.dereference(err)).category === 'function' ? (runtime.dereference(err)).category() : typeof (runtime.dereference(err)).category === 'number' || typeof (runtime.dereference(err)).category === 'boolean' ? (runtime.dereference(err)).category : runtime.container(err, "category")))).name?.() ?? runtime.container((typeof (runtime.dereference(err)).category === 'function' ? (runtime.dereference(err)).category() : typeof (runtime.dereference(err)).category === 'number' || typeof (runtime.dereference(err)).category === 'boolean' ? (runtime.dereference(err)).category : runtime.container(err, "category")), "name")), (typeof (runtime.dereference(err)).value === 'function' ? (runtime.dereference(err)).value() : typeof (runtime.dereference(err)).value === 'number' || typeof (runtime.dereference(err)).value === 'boolean' ? (runtime.dereference(err)).value : runtime.container(err, "value")), (typeof (runtime.dereference(err)).message === 'function' ? (runtime.dereference(err)).message() : typeof (runtime.dereference(err)).message === 'number' || typeof (runtime.dereference(err)).message === 'boolean' ? (runtime.dereference(err)).message : runtime.container(err, "message"))));
      0;
    }
  }

  function method_set_interface(runtime: any, $interface: any): any {
    const members = runtime.members;

    members.m_interface = $interface;
  }

  function method_is_readable(runtime: any): any {
    const members = runtime.members;

    return 1;
  }

  function method_is_writeable(runtime: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_is_creatable(runtime: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_is_reset_on_load(runtime: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_image_interface(runtime: any): any {
    const members = runtime.members;

    return (members.m_interface ?? 0);
  }

  function method_file_extensions(runtime: any): any {
    const members = runtime.members;

    return (members.m_file_extensions ?? 0);
  }

  function method_image_type_name(runtime: any): any {
    const members = runtime.members;

    return "quickload";
  }

  function method_image_brief_type_name(runtime: any): any {
    const members = runtime.members;

    return "quik";
  }

  function method_set_extensions(runtime: any, ext: any): any {
    const members = runtime.members;

    members.m_file_extensions = ext;
  }

  function method_set_delay(runtime: any, delay: any): any {
    const members = runtime.members;

    members.m_delay = delay;
  }

  function method_snapshot_image_device__set_interface(runtime: any, $interface: any): any {
    const members = runtime.members;

    members.m_interface = $interface;
  }

  function method_snapshot_image_device__is_readable(runtime: any): any {
    const members = runtime.members;

    return 1;
  }

  function method_snapshot_image_device__is_writeable(runtime: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_snapshot_image_device__is_creatable(runtime: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_snapshot_image_device__is_reset_on_load(runtime: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_snapshot_image_device__image_interface(runtime: any): any {
    const members = runtime.members;

    return (members.m_interface ?? 0);
  }

  function method_snapshot_image_device__file_extensions(runtime: any): any {
    const members = runtime.members;

    return (members.m_file_extensions ?? 0);
  }

  function method_snapshot_image_device__image_type_name(runtime: any): any {
    const members = runtime.members;

    return "snapshot";
  }

  function method_snapshot_image_device__image_brief_type_name(runtime: any): any {
    const members = runtime.members;

    return "dump";
  }

  function method_snapshot_image_device__set_extensions(runtime: any, ext: any): any {
    const members = runtime.members;

    members.m_file_extensions = ext;
  }

  function method_snapshot_image_device__set_delay(runtime: any, delay: any): any {
    const members = runtime.members;

    members.m_delay = delay;
  }

  function method_quickload_image_device__image_type_name(runtime: any): any {
    const members = runtime.members;

    return "quickload";
  }

  function method_quickload_image_device__image_brief_type_name(runtime: any): any {
    const members = runtime.members;

    return "quik";
  }
  return {
    "get_software_list_loader": method_get_software_list_loader,
    "process_snapshot_or_quickload": method_process_snapshot_or_quickload,
    "set_interface": method_set_interface,
    "is_readable": method_is_readable,
    "is_writeable": method_is_writeable,
    "is_creatable": method_is_creatable,
    "is_reset_on_load": method_is_reset_on_load,
    "image_interface": method_image_interface,
    "file_extensions": method_file_extensions,
    "image_type_name": method_image_type_name,
    "image_brief_type_name": method_image_brief_type_name,
    "set_extensions": method_set_extensions,
    "set_delay": method_set_delay,
    "snapshot_image_device::set_interface": method_snapshot_image_device__set_interface,
    "snapshot_image_device::is_readable": method_snapshot_image_device__is_readable,
    "snapshot_image_device::is_writeable": method_snapshot_image_device__is_writeable,
    "snapshot_image_device::is_creatable": method_snapshot_image_device__is_creatable,
    "snapshot_image_device::is_reset_on_load": method_snapshot_image_device__is_reset_on_load,
    "snapshot_image_device::image_interface": method_snapshot_image_device__image_interface,
    "snapshot_image_device::file_extensions": method_snapshot_image_device__file_extensions,
    "snapshot_image_device::image_type_name": method_snapshot_image_device__image_type_name,
    "snapshot_image_device::image_brief_type_name": method_snapshot_image_device__image_brief_type_name,
    "snapshot_image_device::set_extensions": method_snapshot_image_device__set_extensions,
    "snapshot_image_device::set_delay": method_snapshot_image_device__set_delay,
    "quickload_image_device::image_type_name": method_quickload_image_device__image_type_name,
    "quickload_image_device::image_brief_type_name": method_quickload_image_device__image_brief_type_name
  };
})() as GeneratedDeviceMethodMap;
definition.compiledMethodLinks = ["basename","check_for_file","image_software_list_loader::instance","m_load","osd_printf_error","tag"];

export const device = definition;
export default device;
