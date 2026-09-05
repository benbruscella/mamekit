// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './slapstic.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {
  function method_tmatch(runtime: any, slot: any, addr: any) {
    const members = runtime.members;
    return ((Number(((addr) & (runtime.readIndex((members.m_t_m ?? runtime.member("m_t_m")), slot)))) === Number(runtime.readIndex((members.m_t_v ?? runtime.member("m_t_v")), slot))) ? 1 : 0);
  }

  function method_test(runtime: any, addr: any) {
    const members = runtime.members;
    if (((Number((members.m_state ?? runtime.member("m_state"))) === Number(0)) ? 1 : 0)) {
      if (method_tmatch(runtime, 0, addr)) {
        members.m_state = 1;
      }
    } else {
      if (((Number((members.m_state ?? runtime.member("m_state"))) === Number(1)) ? 1 : 0)) {
        if (method_tmatch(runtime, 2, addr)) {
          method_change_bank(runtime, 0);
          members.m_state = 0;
        } else {
          if (method_tmatch(runtime, 3, addr)) {
            method_change_bank(runtime, 1);
            members.m_state = 0;
          } else {
            if (method_tmatch(runtime, 4, addr)) {
              method_change_bank(runtime, 2);
              members.m_state = 0;
            } else {
              if (method_tmatch(runtime, 5, addr)) {
                method_change_bank(runtime, 3);
                members.m_state = 0;
              } else {
                if (method_tmatch(runtime, 6, addr)) {
                  members.m_state = 2;
                } else {
                  if (((((members.m_has_bit ?? runtime.member("m_has_bit"))) && (method_tmatch(runtime, 7, addr))) ? 1 : 0)) {
                    members.m_state = 5;
                  } else {
                    if (((((members.m_has_add ?? runtime.member("m_has_add"))) && (method_tmatch(runtime, 8, addr))) ? 1 : 0)) {
                      members.m_state = 8;
                    }
                  }
                }
              }
            }
          }
        }
      } else {
        if (((Number((members.m_state ?? runtime.member("m_state"))) === Number(2)) ? 1 : 0)) {
          if (method_tmatch(runtime, 0, addr)) {
            members.m_state = 1;
          } else {
            if (((((members.m_alt_valid_outside ?? runtime.member("m_alt_valid_outside"))) && (method_tmatch(runtime, 1, addr))) ? 1 : 0)) {
              members.m_state = 1;
            } else {
              if (method_tmatch(runtime, 9, addr)) {
                members.m_state = 3;
              } else {
                if (((((members.m_has_add ?? runtime.member("m_has_add"))) && (method_tmatch(runtime, 10, addr))) ? 1 : 0)) {
                  members.m_state = 8;
                } else {
                  members.m_state = 1;
                }
              }
            }
          }
        } else {
          if (((Number((members.m_state ?? runtime.member("m_state"))) === Number(3)) ? 1 : 0)) {
            if (method_tmatch(runtime, 0, addr)) {
              members.m_state = 1;
            } else {
              if (method_tmatch(runtime, 11, addr)) {
                members.m_loaded_bank = ((((((addr) >>> ((members.m_alt_shift ?? runtime.member("m_alt_shift"))))) & (3))) & 0xff);
                members.m_state = 4;
              } else {
                members.m_state = 1;
              }
            }
          } else {
            if (((Number((members.m_state ?? runtime.member("m_state"))) === Number(4)) ? 1 : 0)) {
              if (method_tmatch(runtime, 0, addr)) {
                members.m_state = 1;
              } else {
                if (method_tmatch(runtime, 12, addr)) {
                  method_commit_bank(runtime);
                  members.m_state = 0;
                }
              }
            } else {
              if (((Number((members.m_state ?? runtime.member("m_state"))) === Number(5)) ? 1 : 0)) {
                if (method_tmatch(runtime, 0, addr)) {
                  members.m_state = 1;
                } else {
                  if (method_tmatch(runtime, 13, addr)) {
                    members.m_loaded_bank = (((members.m_current_bank ?? runtime.member("m_current_bank"))) & 0xff);
                    members.m_state = 6;
                  }
                }
              } else {
                if (((Number((members.m_state ?? runtime.member("m_state"))) === Number(6)) ? 1 : 0)) {
                  if (method_tmatch(runtime, 0, addr)) {
                    members.m_state = 1;
                  } else {
                    if (method_tmatch(runtime, 14, addr)) {
                      members.m_loaded_bank = (((((members.m_loaded_bank ?? runtime.member("m_loaded_bank"))) & ((~1)))) & 0xff);
                      members.m_state = 7;
                    } else {
                      if (method_tmatch(runtime, 15, addr)) {
                        members.m_loaded_bank = (((((members.m_loaded_bank ?? runtime.member("m_loaded_bank"))) | (1))) & 0xff);
                        members.m_state = 7;
                      } else {
                        if (method_tmatch(runtime, 16, addr)) {
                          members.m_loaded_bank = (((((members.m_loaded_bank ?? runtime.member("m_loaded_bank"))) & ((~2)))) & 0xff);
                          members.m_state = 7;
                        } else {
                          if (method_tmatch(runtime, 17, addr)) {
                            members.m_loaded_bank = (((((members.m_loaded_bank ?? runtime.member("m_loaded_bank"))) | (2))) & 0xff);
                            members.m_state = 7;
                          } else {
                            if (method_tmatch(runtime, 22, addr)) {
                              method_commit_bank(runtime);
                              members.m_state = 0;
                            }
                          }
                        }
                      }
                    }
                  }
                } else {
                  if (((Number((members.m_state ?? runtime.member("m_state"))) === Number(7)) ? 1 : 0)) {
                    if (method_tmatch(runtime, 0, addr)) {
                      members.m_state = 1;
                    } else {
                      if (method_tmatch(runtime, 18, addr)) {
                        members.m_loaded_bank = (((((members.m_loaded_bank ?? runtime.member("m_loaded_bank"))) & ((~1)))) & 0xff);
                        members.m_state = 6;
                      } else {
                        if (method_tmatch(runtime, 19, addr)) {
                          members.m_loaded_bank = (((((members.m_loaded_bank ?? runtime.member("m_loaded_bank"))) | (1))) & 0xff);
                          members.m_state = 6;
                        } else {
                          if (method_tmatch(runtime, 20, addr)) {
                            members.m_loaded_bank = (((((members.m_loaded_bank ?? runtime.member("m_loaded_bank"))) & ((~2)))) & 0xff);
                            members.m_state = 6;
                          } else {
                            if (method_tmatch(runtime, 21, addr)) {
                              members.m_loaded_bank = (((((members.m_loaded_bank ?? runtime.member("m_loaded_bank"))) | (2))) & 0xff);
                              members.m_state = 6;
                            } else {
                              if (method_tmatch(runtime, 22, addr)) {
                                method_commit_bank(runtime);
                                members.m_state = 0;
                              }
                            }
                          }
                        }
                      }
                    }
                  } else {
                    if (((Number((members.m_state ?? runtime.member("m_state"))) === Number(8)) ? 1 : 0)) {
                      if (method_tmatch(runtime, 0, addr)) {
                        members.m_state = 1;
                      } else {
                        if (method_tmatch(runtime, 23, addr)) {
                          members.m_loaded_bank = (((members.m_current_bank ?? runtime.member("m_current_bank"))) & 0xff);
                          members.m_state = 9;
                        } else {
                          members.m_state = 1;
                        }
                      }
                    } else {
                      if (((Number((members.m_state ?? runtime.member("m_state"))) === Number(9)) ? 1 : 0)) {
                        if (method_tmatch(runtime, 0, addr)) {
                          members.m_state = 1;
                        } else {
                          if (method_tmatch(runtime, 24, addr)) {
                            members.m_loaded_bank = (((((((members.m_loaded_bank ?? runtime.member("m_loaded_bank"))) + (1))) & (3))) & 0xff);
                          } else {
                            if (method_tmatch(runtime, 25, addr)) {
                              members.m_loaded_bank = (((((((members.m_loaded_bank ?? runtime.member("m_loaded_bank"))) + (2))) & (3))) & 0xff);
                            } else {
                              if (method_tmatch(runtime, 26, addr)) {
                                members.m_state = 4;
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  function method_change_bank(runtime: any, bank: any) {
    const members = runtime.members;
    members.m_current_bank = ((bank) & 0xff);
    (runtime.calls["set_bank_entry"] ? runtime.calls["set_bank_entry"]((members.m_current_bank ?? runtime.member("m_current_bank"))) : runtime.macro("set_bank_entry", (members.m_current_bank ?? runtime.member("m_current_bank"))));
  }

  function method_commit_bank(runtime: any) {
    const members = runtime.members;
    method_change_bank(runtime, (members.m_loaded_bank ?? runtime.member("m_loaded_bank")));
  }
  return {
    "tmatch": method_tmatch,
    "test": method_test,
    "change_bank": method_change_bank,
    "commit_bank": method_commit_bank
  };
})() as GeneratedDeviceMethodMap;

export const device = definition;
export default device;
