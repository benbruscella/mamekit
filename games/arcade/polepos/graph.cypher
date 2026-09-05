// mamekit knowledge graph — driver src/mame/namco/polepos.cpp
// generated 2026-09-05T03:49:57.652Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/namco/polepos.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/namco/polepos.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:polepos.h'}) SET n:SourceFile SET n += {path: 'polepos.h', external: true};
MERGE (n:KG {id: 'file:namco52.h'}) SET n:SourceFile SET n += {path: 'namco52.h', external: true};
MERGE (n:KG {id: 'file:namco54.h'}) SET n:SourceFile SET n += {path: 'namco54.h', external: true};
MERGE (n:KG {id: 'file:polepos_a.h'}) SET n:SourceFile SET n += {path: 'polepos_a.h', external: true};
MERGE (n:KG {id: 'file:cpu/z80/z80.h'}) SET n:SourceFile SET n += {path: 'cpu/z80/z80.h', external: true};
MERGE (n:KG {id: 'file:cpu/z8000/z8000.h'}) SET n:SourceFile SET n += {path: 'cpu/z8000/z8000.h', external: true};
MERGE (n:KG {id: 'file:cpu/mb88xx/mb88xx.h'}) SET n:SourceFile SET n += {path: 'cpu/mb88xx/mb88xx.h', external: true};
MERGE (n:KG {id: 'file:namco06.h'}) SET n:SourceFile SET n += {path: 'namco06.h', external: true};
MERGE (n:KG {id: 'file:namco51.h'}) SET n:SourceFile SET n += {path: 'namco51.h', external: true};
MERGE (n:KG {id: 'file:namco53.h'}) SET n:SourceFile SET n += {path: 'namco53.h', external: true};
MERGE (n:KG {id: 'file:machine/nvram.h'}) SET n:SourceFile SET n += {path: 'machine/nvram.h', external: true};
MERGE (n:KG {id: 'file:machine/watchdog.h'}) SET n:SourceFile SET n += {path: 'machine/watchdog.h', external: true};
MERGE (n:KG {id: 'file:sound/dac.h'}) SET n:SourceFile SET n += {path: 'sound/dac.h', external: true};
MERGE (n:KG {id: 'file:sound/tms5220.h'}) SET n:SourceFile SET n += {path: 'sound/tms5220.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'file:polepos.lh'}) SET n:SourceFile SET n += {path: 'polepos.lh', external: true};
MERGE (n:KG {id: 'file:topracer.lh'}) SET n:SourceFile SET n += {path: 'topracer.lh', external: true};
MERGE (n:KG {id: 'file:logmacro.h'}) SET n:SourceFile SET n += {path: 'logmacro.h', external: true};
MERGE (n:KG {id: 'file:screen.h'}) SET n:SourceFile SET n += {path: 'screen.h', external: true};
MERGE (n:KG {id: 'file:src/mame/namco/namco52.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/namco/namco52.cpp'};
MERGE (n:KG {id: 'file:src/mame/namco/namco54.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/namco/namco54.cpp'};
MERGE (n:KG {id: 'file:src/mame/namco/namco51.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/namco/namco51.cpp'};
MERGE (n:KG {id: 'file:src/mame/namco/namco53.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/namco/namco53.cpp'};
MERGE (n:KG {id: 'game:polepos'}) SET n:Game SET n += {name: 'polepos', year: '1982', company: 'Namco', fullname: 'Pole Position (World)', monitor: 'ROT0', cls: 'polepos_state', init: 'empty_init', flags: 'MACHINE_SUPPORTS_SAVE', kind: 'arcade', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 2566, sourceColumn: 1, sourceEndLine: 2566};
MERGE (n:KG {id: 'romset:polepos'}) SET n:RomSet SET n += {name: 'polepos', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 1129, sourceColumn: 1, sourceEndLine: 1129};
MERGE (n:KG {id: 'region:polepos/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 12288, flags: '0', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 1131, sourceColumn: 2, sourceEndLine: 1131};
MERGE (n:KG {id: 'rom:polepos/maincpu/pp3_9.6h'}) SET n:Rom SET n += {file: 'pp3_9.6h', offset: 0, size: 8192, crc: 'c0511173', sha1: '88a1d4eefacbcf7d0e59edc0110edf225cad15c4', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 1132, sourceColumn: 2, sourceEndLine: 1132};
MERGE (n:KG {id: 'rom:polepos/maincpu/pp1_10b.5h'}) SET n:Rom SET n += {file: 'pp1_10b.5h', offset: 8192, size: 4096, crc: '7174bcb7', sha1: '460326a6cea201db2df813013c95562a222ea95d', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 1133, sourceColumn: 2, sourceEndLine: 1133};
MERGE (n:KG {id: 'region:polepos/sub1'}) SET n:RomRegion SET n += {tag: 'sub1', size: 32768, flags: 'ROMREGION_ERASE00', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 1136, sourceColumn: 2, sourceEndLine: 1136};
MERGE (n:KG {id: 'rom:polepos/sub1/pp3_1.8m'}) SET n:Rom SET n += {file: 'pp3_1.8m', offset: 1, size: 8192, crc: '65c1c2c2', sha1: '69f3e2e871f1cdc1efee91688acad4417683474d', skip: 1};
MERGE (n:KG {id: 'rom:polepos/sub1/pp3_2.8l'}) SET n:Rom SET n += {file: 'pp3_2.8l', offset: 0, size: 8192, crc: 'fafb9049', sha1: '92424c1042f520af115fb271fc11f4914a346ae2', skip: 1};
MERGE (n:KG {id: 'region:polepos/sub2'}) SET n:RomRegion SET n += {tag: 'sub2', size: 32768, flags: 'ROMREGION_ERASE00', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 1141, sourceColumn: 2, sourceEndLine: 1141};
MERGE (n:KG {id: 'rom:polepos/sub2/pp3_5.4m'}) SET n:Rom SET n += {file: 'pp3_5.4m', offset: 1, size: 8192, crc: '46e5c99a', sha1: 'd5fd657a9197f1751f6fca430d3ef18d37ed774e', skip: 1};
MERGE (n:KG {id: 'rom:polepos/sub2/pp3_6.4l'}) SET n:Rom SET n += {file: 'pp3_6.4l', offset: 0, size: 8192, crc: 'acc1ebc3', sha1: '41745f5b6b0af2cb1ee80843194c070eac9e74e7', skip: 1};
MERGE (n:KG {id: 'region:polepos/chars'}) SET n:RomRegion SET n += {tag: 'chars', size: 4096, flags: '0', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 1146, sourceColumn: 2, sourceEndLine: 1146};
MERGE (n:KG {id: 'rom:polepos/chars/pp3_28.1f'}) SET n:Rom SET n += {file: 'pp3_28.1f', offset: 0, size: 4096, crc: '2e77187e', sha1: '869a7389a684ccedd14868fb03400b1f8088acca', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 1147, sourceColumn: 2, sourceEndLine: 1147};
MERGE (n:KG {id: 'region:polepos/tiles'}) SET n:RomRegion SET n += {tag: 'tiles', size: 4096, flags: '0', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 1149, sourceColumn: 2, sourceEndLine: 1149};
MERGE (n:KG {id: 'rom:polepos/tiles/pp1_29.1e'}) SET n:Rom SET n += {file: 'pp1_29.1e', offset: 0, size: 4096, crc: '706e888a', sha1: 'af1aa2199fcf73a3afbe760857ff117865350954', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 1150, sourceColumn: 2, sourceEndLine: 1150};
MERGE (n:KG {id: 'region:polepos/sprites'}) SET n:RomRegion SET n += {tag: 'sprites', size: 16384, flags: '0', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 1152, sourceColumn: 2, sourceEndLine: 1152};
MERGE (n:KG {id: 'rom:polepos/sprites/pp3_25.1n'}) SET n:Rom SET n += {file: 'pp3_25.1n', offset: 0, size: 8192, crc: 'b52c086b', sha1: 'ea4a58fcc1d829ad0efa13a02f90fadc61e6e0bc', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 1153, sourceColumn: 2, sourceEndLine: 1153};
MERGE (n:KG {id: 'rom:polepos/sprites/pp3_26.1m'}) SET n:Rom SET n += {file: 'pp3_26.1m', offset: 8192, size: 8192, crc: 'd24a5707', sha1: '468319469bde6b7dc0cf8244299d8dc927059b2d', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 1154, sourceColumn: 2, sourceEndLine: 1154};
MERGE (n:KG {id: 'region:polepos/bigsprites'}) SET n:RomRegion SET n += {tag: 'bigsprites', size: 65536, flags: '0', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 1156, sourceColumn: 2, sourceEndLine: 1156};
MERGE (n:KG {id: 'rom:polepos/bigsprites/pp1_17.5n'}) SET n:Rom SET n += {file: 'pp1_17.5n', offset: 0, size: 8192, crc: '2e134b46', sha1: '0938f5f9f5cc6d7c1096c569449db78dbc42da01', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 1157, sourceColumn: 2, sourceEndLine: 1157};
MERGE (n:KG {id: 'rom:polepos/bigsprites/pp1_19.4n'}) SET n:Rom SET n += {file: 'pp1_19.4n', offset: 8192, size: 8192, crc: '43ff83e1', sha1: '8f830549a629b019125e59801e5027e4e4b3c0f2', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 1158, sourceColumn: 2, sourceEndLine: 1158};
MERGE (n:KG {id: 'rom:polepos/bigsprites/pp1_21.3n'}) SET n:Rom SET n += {file: 'pp1_21.3n', offset: 16384, size: 8192, crc: '5f958eb4', sha1: 'b56d84e5e5e0ddeb0e71851ba66e5fa1b1409551', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 1159, sourceColumn: 2, sourceEndLine: 1159};
MERGE (n:KG {id: 'rom:polepos/bigsprites/pp1_18.5m'}) SET n:Rom SET n += {file: 'pp1_18.5m', offset: 32768, size: 8192, crc: '6f9997d2', sha1: 'b26d505266ccf23bfd867f881756c3251c80f57b', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 1160, sourceColumn: 2, sourceEndLine: 1160};
MERGE (n:KG {id: 'rom:polepos/bigsprites/pp1_20.4m'}) SET n:Rom SET n += {file: 'pp1_20.4m', offset: 40960, size: 8192, crc: 'ec18075b', sha1: 'af7be549c5fa47551a8dca4c0a531552147fa50f', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 1161, sourceColumn: 2, sourceEndLine: 1161};
MERGE (n:KG {id: 'rom:polepos/bigsprites/pp1_22.3m'}) SET n:Rom SET n += {file: 'pp1_22.3m', offset: 49152, size: 8192, crc: '1d2f30b1', sha1: '1d88a3069e9b15febd2835dd63e5511b3b2a6b45', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 1162, sourceColumn: 2, sourceEndLine: 1162};
MERGE (n:KG {id: 'region:polepos/road'}) SET n:RomRegion SET n += {tag: 'road', size: 20480, flags: '0', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 1164, sourceColumn: 2, sourceEndLine: 1164};
MERGE (n:KG {id: 'rom:polepos/road/pp1_30.3a'}) SET n:Rom SET n += {file: 'pp1_30.3a', offset: 0, size: 8192, crc: 'ee6b3315', sha1: '9cc26c6d3604c0f60d716f86e67e9d9c0487f87d', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 1165, sourceColumn: 2, sourceEndLine: 1165};
MERGE (n:KG {id: 'rom:polepos/road/pp1_31.2a'}) SET n:Rom SET n += {file: 'pp1_31.2a', offset: 8192, size: 8192, crc: '6d1e7042', sha1: '90113ff0c93ed86d95067290088705bb5e6608d1', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 1166, sourceColumn: 2, sourceEndLine: 1166};
MERGE (n:KG {id: 'rom:polepos/road/pp1_32.1a'}) SET n:Rom SET n += {file: 'pp1_32.1a', offset: 16384, size: 4096, crc: '4e97f101', sha1: 'f377d053821c74aee93ebcd30a4d43e6156f3cfe', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 1167, sourceColumn: 2, sourceEndLine: 1167};
MERGE (n:KG {id: 'region:polepos/scalelut'}) SET n:RomRegion SET n += {tag: 'scalelut', size: 4096, flags: '0', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 1169, sourceColumn: 2, sourceEndLine: 1169};
MERGE (n:KG {id: 'rom:polepos/scalelut/pp1_27.1l'}) SET n:Rom SET n += {file: 'pp1_27.1l', offset: 0, size: 4096, crc: 'a61bff15', sha1: 'f7a59970831cdaaa7bf59c2221a38e4746c54244', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 1170, sourceColumn: 2, sourceEndLine: 1170};
MERGE (n:KG {id: 'region:polepos/proms'}) SET n:RomRegion SET n += {tag: 'proms', size: 4160, flags: '0', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 1173, sourceColumn: 2, sourceEndLine: 1173};
MERGE (n:KG {id: 'rom:polepos/proms/pp1-7.8l'}) SET n:Rom SET n += {file: 'pp1-7.8l', offset: 0, size: 256, crc: 'f07ff2ad', sha1: 'e1f3cb10a03d23f8c1d422acf271dba4e7b98cb1', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 1174, sourceColumn: 2, sourceEndLine: 1174};
MERGE (n:KG {id: 'rom:polepos/proms/pp1-8.9l'}) SET n:Rom SET n += {file: 'pp1-8.9l', offset: 256, size: 256, crc: 'adbde7d7', sha1: '956ac5117c1e310f554ac705aa2dc24a796c36a5', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 1175, sourceColumn: 2, sourceEndLine: 1175};
MERGE (n:KG {id: 'rom:polepos/proms/pp1-9.10l'}) SET n:Rom SET n += {file: 'pp1-9.10l', offset: 512, size: 256, crc: 'ddac786a', sha1: 'd1860105bf91297533ccc4aa6775987df198d0fa', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 1176, sourceColumn: 2, sourceEndLine: 1176};
MERGE (n:KG {id: 'rom:polepos/proms/pp2-10.2h'}) SET n:Rom SET n += {file: 'pp2-10.2h', offset: 768, size: 256, crc: '1e8d0491', sha1: 'e8bf1db5c1fb04a35763099965cf5c588240bde5', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 1177, sourceColumn: 2, sourceEndLine: 1177};
MERGE (n:KG {id: 'rom:polepos/proms/pp1-11.4d'}) SET n:Rom SET n += {file: 'pp1-11.4d', offset: 1024, size: 256, crc: '0e4fe8a0', sha1: 'd330b1e5ebccf5bbefcf71486fd80d816de38196', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 1178, sourceColumn: 2, sourceEndLine: 1178};
MERGE (n:KG {id: 'rom:polepos/proms/pp1-15.9a'}) SET n:Rom SET n += {file: 'pp1-15.9a', offset: 1280, size: 256, crc: '2d502464', sha1: '682b7dd22e51d5db52c0804b7e27e47641dfa6bd', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 1179, sourceColumn: 2, sourceEndLine: 1179};
MERGE (n:KG {id: 'rom:polepos/proms/pp1-16.10a'}) SET n:Rom SET n += {file: 'pp1-16.10a', offset: 1536, size: 256, crc: '027aa62c', sha1: 'c7030d8b64b80e107c446f6fbdd63f560c0a91c0', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 1180, sourceColumn: 2, sourceEndLine: 1180};
MERGE (n:KG {id: 'rom:polepos/proms/pp1-17.11a'}) SET n:Rom SET n += {file: 'pp1-17.11a', offset: 1792, size: 256, crc: '1f8d0df3', sha1: 'b8f17758f114f5e247b65b3f2922ca2660757e66', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 1181, sourceColumn: 2, sourceEndLine: 1181};
MERGE (n:KG {id: 'rom:polepos/proms/pp1-12.3c'}) SET n:Rom SET n += {file: 'pp1-12.3c', offset: 2048, size: 1024, crc: '7afc7cfc', sha1: 'ba2407f6eff124e881b354f13205a4c058b7cf60', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 1182, sourceColumn: 2, sourceEndLine: 1182};
MERGE (n:KG {id: 'rom:polepos/proms/pp3-6.6m'}) SET n:Rom SET n += {file: 'pp3-6.6m', offset: 3072, size: 1024, crc: '63fb6057', sha1: '453fbdfd053c2a026cd41b57d0a71754b69a15da', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 1183, sourceColumn: 2, sourceEndLine: 1183};
MERGE (n:KG {id: 'rom:polepos/proms/pp1-13.8e'}) SET n:Rom SET n += {file: 'pp1-13.8e', offset: 4096, size: 32, crc: '4330a51b', sha1: '9531d18ce2de4eda9913d47ef8c5cd8f05791716', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 1184, sourceColumn: 2, sourceEndLine: 1184};
MERGE (n:KG {id: 'rom:polepos/proms/pp1-14.9e'}) SET n:Rom SET n += {file: 'pp1-14.9e', offset: 4128, size: 32, crc: '4330a51b', sha1: '9531d18ce2de4eda9913d47ef8c5cd8f05791716', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 1185, sourceColumn: 2, sourceEndLine: 1185};
MERGE (n:KG {id: 'region:polepos/namco'}) SET n:RomRegion SET n += {tag: 'namco', size: 256, flags: '0', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 1188, sourceColumn: 2, sourceEndLine: 1188};
MERGE (n:KG {id: 'rom:polepos/namco/pp1-5.3b'}) SET n:Rom SET n += {file: 'pp1-5.3b', offset: 0, size: 256, crc: '8568decc', sha1: '0aac1fa082858d4d201e21511c609a989f9a1535', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 1189, sourceColumn: 2, sourceEndLine: 1189};
MERGE (n:KG {id: 'region:polepos/engine'}) SET n:RomRegion SET n += {tag: 'engine', size: 16384, flags: '0', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 1191, sourceColumn: 2, sourceEndLine: 1191};
MERGE (n:KG {id: 'rom:polepos/engine/pp1_15.6a'}) SET n:Rom SET n += {file: 'pp1_15.6a', offset: 0, size: 8192, crc: 'b5ad4d5f', sha1: 'c07e77a050200d6fe9952031f971ca35f4d15ff8', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 1192, sourceColumn: 2, sourceEndLine: 1192};
MERGE (n:KG {id: 'rom:polepos/engine/pp1_16.5a'}) SET n:Rom SET n += {file: 'pp1_16.5a', offset: 8192, size: 8192, crc: '8fdd2f6f', sha1: '3818dc94c60cd78c4212ab7a4367cf3d98166ee6', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 1193, sourceColumn: 2, sourceEndLine: 1193};
MERGE (n:KG {id: 'region:polepos/52xx'}) SET n:RomRegion SET n += {tag: '52xx', size: 32768, flags: '0', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 1195, sourceColumn: 2, sourceEndLine: 1195};
MERGE (n:KG {id: 'rom:polepos/52xx/pp2_11.2e'}) SET n:Rom SET n += {file: 'pp2_11.2e', offset: 0, size: 8192, crc: '5b4cf05e', sha1: '52342572940489175607bbf5b6cfd05ee9b0f004', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 1196, sourceColumn: 2, sourceEndLine: 1196};
MERGE (n:KG {id: 'rom:polepos/52xx/pp2_12.2f'}) SET n:Rom SET n += {file: 'pp2_12.2f', offset: 8192, size: 8192, crc: '32b694c2', sha1: '101d9da28333ca290b0235eefb5ec9b094e1736e', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 1197, sourceColumn: 2, sourceEndLine: 1197};
MERGE (n:KG {id: 'rom:polepos/52xx/pp2_13.1e'}) SET n:Rom SET n += {file: 'pp2_13.1e', offset: 16384, size: 8192, crc: '8842138a', sha1: '7e94f5b6ee32f6af37df54cfb72d96f9b543f9e2', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 1198, sourceColumn: 2, sourceEndLine: 1198};
MERGE (n:KG {id: 'region:polepos/user1'}) SET n:RomRegion SET n += {tag: 'user1', size: 256, flags: '0', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 1202, sourceColumn: 2, sourceEndLine: 1202};
MERGE (n:KG {id: 'rom:polepos/user1/pp1-4.9h'}) SET n:Rom SET n += {file: 'pp1-4.9h', offset: 0, size: 256, crc: '2401c817', sha1: '8991b7994513a469e64392fa8f233af5e5f06d54', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 1203, sourceColumn: 2, sourceEndLine: 1203};
MERGE (n:KG {id: 'map:polepos_state.z80_map'}) SET n:AddressMap SET n += {cls: 'polepos_state', name: 'z80_map', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 435, sourceColumn: 1, sourceEndLine: 454};
MERGE (n:KG {id: 'map:polepos_state.z80_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 12287, raw: 'map(0x0000, 0x2fff).rom().region("maincpu", 0)', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 437, sourceColumn: 2, sourceEndLine: 437, rom: true, region: 'maincpu', regionOffset: 0};
MERGE (n:KG {id: 'map:polepos_state.z80_map/range1'}) SET n:AddressRange SET n += {start: 12288, end: 14335, raw: 'map(0x3000, 0x37ff).mirror(0x0800).ram().share("nvram")', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 438, sourceColumn: 2, sourceEndLine: 438, mirror: 2048, ram: true, share: 'nvram'};
MERGE (n:KG {id: 'map:polepos_state.z80_map/range2'}) SET n:AddressRange SET n += {start: 16384, end: 18431, raw: 'map(0x4000, 0x47ff).rw(FUNC(polepos_state::sprite_r), FUNC(polepos_state::sprite_w))', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 439, sourceColumn: 2, sourceEndLine: 439};
MERGE (n:KG {id: 'handler:polepos_state.sprite_r'}) SET n:Handler SET n += {method: 'sprite_r', ownerClass: 'polepos_state', sourceFile: 'src/mame/namco/polepos_v.cpp', sourceLine: 202, sourceColumn: 1, sourceEndLine: 205, sourceParameters: 'offs_t offset', sourceBody: 'return m_sprite16_memory[offset] & 0xff;'};
MERGE (n:KG {id: 'handler:polepos_state.sprite_w'}) SET n:Handler SET n += {method: 'sprite_w', ownerClass: 'polepos_state', sourceFile: 'src/mame/namco/polepos_v.cpp', sourceLine: 207, sourceColumn: 1, sourceEndLine: 210, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_sprite16_memory[offset] = (m_sprite16_memory[offset] & 0xff00) | data;'};
MERGE (n:KG {id: 'map:polepos_state.z80_map/range3'}) SET n:AddressRange SET n += {start: 18432, end: 19455, raw: 'map(0x4800, 0x4bff).rw(FUNC(polepos_state::road_r), FUNC(polepos_state::road_w))', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 440, sourceColumn: 2, sourceEndLine: 440};
MERGE (n:KG {id: 'handler:polepos_state.road_r'}) SET n:Handler SET n += {method: 'road_r', ownerClass: 'polepos_state', sourceFile: 'src/mame/namco/polepos_v.cpp', sourceLine: 219, sourceColumn: 1, sourceEndLine: 222, sourceParameters: 'offs_t offset', sourceBody: 'return m_road16_memory[offset] & 0xff;'};
MERGE (n:KG {id: 'handler:polepos_state.road_w'}) SET n:Handler SET n += {method: 'road_w', ownerClass: 'polepos_state', sourceFile: 'src/mame/namco/polepos_v.cpp', sourceLine: 224, sourceColumn: 1, sourceEndLine: 227, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_road16_memory[offset] = (m_road16_memory[offset] & 0xff00) | data;'};
MERGE (n:KG {id: 'map:polepos_state.z80_map/range4'}) SET n:AddressRange SET n += {start: 19456, end: 20479, raw: 'map(0x4c00, 0x4fff).rw(FUNC(polepos_state::alpha_r), FUNC(polepos_state::alpha_w))', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 441, sourceColumn: 2, sourceEndLine: 441};
MERGE (n:KG {id: 'handler:polepos_state.alpha_r'}) SET n:Handler SET n += {method: 'alpha_r', ownerClass: 'polepos_state', sourceFile: 'src/mame/namco/polepos_v.cpp', sourceLine: 285, sourceColumn: 1, sourceEndLine: 288, sourceParameters: 'offs_t offset', sourceBody: 'return m_alpha16_memory[offset] & 0xff;'};
MERGE (n:KG {id: 'handler:polepos_state.alpha_w'}) SET n:Handler SET n += {method: 'alpha_w', ownerClass: 'polepos_state', sourceFile: 'src/mame/namco/polepos_v.cpp', sourceLine: 290, sourceColumn: 1, sourceEndLine: 294, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_alpha16_memory[offset] = (m_alpha16_memory[offset] & 0xff00) | data;
	m_tx_tilemap->mark_tile_dirty(offset);'};
MERGE (n:KG {id: 'map:polepos_state.z80_map/range5'}) SET n:AddressRange SET n += {start: 20480, end: 22527, raw: 'map(0x5000, 0x57ff).rw(FUNC(polepos_state::view_r), FUNC(polepos_state::view_w))', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 442, sourceColumn: 2, sourceEndLine: 442};
MERGE (n:KG {id: 'handler:polepos_state.view_r'}) SET n:Handler SET n += {method: 'view_r', ownerClass: 'polepos_state', sourceFile: 'src/mame/namco/polepos_v.cpp', sourceLine: 248, sourceColumn: 1, sourceEndLine: 251, sourceParameters: 'offs_t offset', sourceBody: 'return m_view16_memory[offset] & 0xff;'};
MERGE (n:KG {id: 'handler:polepos_state.view_w'}) SET n:Handler SET n += {method: 'view_w', ownerClass: 'polepos_state', sourceFile: 'src/mame/namco/polepos_v.cpp', sourceLine: 253, sourceColumn: 1, sourceEndLine: 258, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_view16_memory[offset] = (m_view16_memory[offset] & 0xff00) | data;
	if (offset < 0x400)
		m_bg_tilemap->mark_tile_dirty(offset);'};
MERGE (n:KG {id: 'map:polepos_state.z80_map/range6'}) SET n:AddressRange SET n += {start: 32768, end: 33727, raw: 'map(0x8000, 0x83bf).mirror(0x0c00).ram()', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 444, sourceColumn: 2, sourceEndLine: 444, mirror: 3072, ram: true};
MERGE (n:KG {id: 'map:polepos_state.z80_map/range7'}) SET n:AddressRange SET n += {start: 33728, end: 33791, raw: 'map(0x83c0, 0x83ff).mirror(0x0c00).rw(m_namco_sound, FUNC(polepos_wsg_device::polepos_sound_r), FUNC(polepos_wsg_device::polepos_sound_w))', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 445, sourceColumn: 2, sourceEndLine: 445, mirror: 3072};
MERGE (n:KG {id: 'handler:polepos_wsg_device.polepos_sound_r'}) SET n:Handler SET n += {method: 'polepos_sound_r', ownerClass: 'polepos_wsg_device', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 445, sourceColumn: 2, sourceEndLine: 445};
MERGE (n:KG {id: 'handler:polepos_wsg_device.polepos_sound_w'}) SET n:Handler SET n += {method: 'polepos_sound_w', ownerClass: 'polepos_wsg_device', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 445, sourceColumn: 2, sourceEndLine: 445};
MERGE (n:KG {id: 'map:polepos_state.z80_map/range8'}) SET n:AddressRange SET n += {start: 36864, end: 36864, raw: 'map(0x9000, 0x9000).mirror(0x0eff).rw("06xx", FUNC(namco_06xx_device::data_r), FUNC(namco_06xx_device::data_w))', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 447, sourceColumn: 2, sourceEndLine: 447, mirror: 3839};
MERGE (n:KG {id: 'handler:namco_06xx_device.data_r'}) SET n:Handler SET n += {method: 'data_r', ownerClass: 'namco_06xx_device', sourceFile: 'src/mame/namco/namco06.cpp', sourceLine: 135, sourceColumn: 1, sourceEndLine: 151, sourceParameters: 'offs_t offset', sourceBody: 'uint8_t result = 0xff;

	if (!BIT(m_control, 4))
	{
		logerror("%s: 06XX \'%s\' read in write mode %02x\\n",machine().describe_context(),tag(),m_control);
		return 0;
	}

	if (BIT(m_control, 0)) result &= m_read[0](0);
	if (BIT(m_control, 1)) result &= m_read[1](0);
	if (BIT(m_control, 2)) result &= m_read[2](0);
	if (BIT(m_control, 3)) result &= m_read[3](0);

	return result;'};
MERGE (n:KG {id: 'handler:namco_06xx_device.data_w'}) SET n:Handler SET n += {method: 'data_w', ownerClass: 'namco_06xx_device', sourceFile: 'src/mame/namco/namco06.cpp', sourceLine: 154, sourceColumn: 1, sourceEndLine: 157, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'machine().scheduler().synchronize(timer_expired_delegate(FUNC(namco_06xx_device::write_sync),this), data);'};
MERGE (n:KG {id: 'handler:namco_06xx_device.write_sync'}) SET n:Handler SET n += {method: 'write_sync', ownerClass: 'namco_06xx_device', sourceFile: 'src/mame/namco/namco06.cpp', sourceLine: 159, sourceColumn: 1, sourceEndLine: 171, sourceParameters: 'int param', sourceBody: 'if (BIT(m_control, 4))
	{
		logerror("%s: 06XX \'%s\' write in read mode %02x\\n",machine().describe_context(),tag(),m_control);
		return;
	}

	if (BIT(m_control, 0)) m_write[0](0, param);
	if (BIT(m_control, 1)) m_write[1](0, param);
	if (BIT(m_control, 2)) m_write[2](0, param);
	if (BIT(m_control, 3)) m_write[3](0, param);'};
MERGE (n:KG {id: 'map:polepos_state.z80_map/range9'}) SET n:AddressRange SET n += {start: 37120, end: 37120, raw: 'map(0x9100, 0x9100).mirror(0x0eff).rw("06xx", FUNC(namco_06xx_device::ctrl_r), FUNC(namco_06xx_device::ctrl_w))', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 448, sourceColumn: 2, sourceEndLine: 448, mirror: 3839};
MERGE (n:KG {id: 'handler:namco_06xx_device.ctrl_r'}) SET n:Handler SET n += {method: 'ctrl_r', ownerClass: 'namco_06xx_device', sourceFile: 'src/mame/namco/namco06.cpp', sourceLine: 174, sourceColumn: 1, sourceEndLine: 177, sourceParameters: '', sourceBody: 'return m_control;'};
MERGE (n:KG {id: 'handler:namco_06xx_device.ctrl_w'}) SET n:Handler SET n += {method: 'ctrl_w', ownerClass: 'namco_06xx_device', sourceFile: 'src/mame/namco/namco06.cpp', sourceLine: 179, sourceColumn: 1, sourceEndLine: 182, sourceParameters: 'uint8_t data', sourceBody: 'machine().scheduler().synchronize(timer_expired_delegate(FUNC(namco_06xx_device::ctrl_w_sync),this), data);'};
MERGE (n:KG {id: 'handler:namco_06xx_device.ctrl_w_sync'}) SET n:Handler SET n += {method: 'ctrl_w_sync', ownerClass: 'namco_06xx_device', sourceFile: 'src/mame/namco/namco06.cpp', sourceLine: 184, sourceColumn: 1, sourceEndLine: 225, sourceParameters: 'int param', sourceBody: 'm_control = param;

	// The upper 3 control bits are the clock divider.
	if ((m_control & 0xe0) == 0)
	{
		// If the divider is zero, stop the timer.
		m_nmi_timer->adjust(attotime::never);
		m_timer_state = false;
		set_nmi(CLEAR_LINE);
		m_chipsel[0](0, CLEAR_LINE);
		m_chipsel[1](0, CLEAR_LINE);
		m_chipsel[2](0, CLEAR_LINE);
		m_chipsel[3](0, CLEAR_LINE);
		// RW is left as-is
	}
	else
	{
		// NMI is cleared immediately if this is a read.
		// It will be suppressed the next clock cycle.
		if (BIT(m_control, 4))
		{
			set_nmi(CLEAR_LINE);
			m_read_stretch = true;
		}
		else
		{
			m_read_stretch = false;
		}

		uint8_t num_shifts = (m_control & 0xe0) >> 5;
		uint8_t divisor = 1 << num_shifts;
		attotime period = attotime::from_hz(clock() / divisor) / 2;

		// Delay to the next falling clock edge.
		attotime now = machine().time();
		u64 total_ticks = now.as_ticks(clock());
		attotime delay = attotime::from_ticks(total_ticks + 1, clock()) - now;
		m_nmi_timer->adjust(delay, 0, period);
	}'};
MERGE (n:KG {id: 'handler:namco_06xx_device.set_nmi'}) SET n:Handler SET n += {method: 'set_nmi', ownerClass: 'namco_06xx_device', sourceFile: 'src/mame/namco/namco06.cpp', sourceLine: 228, sourceColumn: 1, sourceEndLine: 234, sourceParameters: 'int state', sourceBody: 'if (!m_nmicpu->suspended(SUSPEND_REASON_HALT | SUSPEND_REASON_RESET | SUSPEND_REASON_DISABLE))
	{
		m_nmicpu->set_input_line(INPUT_LINE_NMI, state ? ASSERT_LINE : CLEAR_LINE);
	}'};
MERGE (n:KG {id: 'map:polepos_state.z80_map/range10'}) SET n:AddressRange SET n += {start: 40960, end: 40960, raw: 'map(0xa000, 0xa000).mirror(0x0cff).r(FUNC(polepos_state::ready_r))', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 449, sourceColumn: 2, sourceEndLine: 449, mirror: 3327};
MERGE (n:KG {id: 'handler:polepos_state.ready_r'}) SET n:Handler SET n += {method: 'ready_r', ownerClass: 'polepos_state', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 291, sourceColumn: 1, sourceEndLine: 302, sourceParameters: '', sourceBody: 'int ret = 0xff;

	if (m_screen->vpos() >= 128)
		ret ^= 0x02;

	if (!m_adc->intr_r())
		ret ^= 0x08; /* ADC End Flag */

	return ret;'};
MERGE (n:KG {id: 'map:polepos_state.z80_map/range11'}) SET n:AddressRange SET n += {start: 40960, end: 40967, raw: 'map(0xa000, 0xa007).mirror(0x0cf8).w(m_latch, FUNC(ls259_device::write_d0))', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 450, sourceColumn: 2, sourceEndLine: 450, mirror: 3320};
MERGE (n:KG {id: 'handler:ls259_device.write_d0'}) SET n:Handler SET n += {method: 'write_d0', ownerClass: 'ls259_device', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 450, sourceColumn: 2, sourceEndLine: 450};
MERGE (n:KG {id: 'map:polepos_state.z80_map/range12'}) SET n:AddressRange SET n += {start: 41216, end: 41216, raw: 'map(0xa100, 0xa100).mirror(0x0cff).w("watchdog", FUNC(watchdog_timer_device::reset_w))', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 451, sourceColumn: 2, sourceEndLine: 451, mirror: 3327};
MERGE (n:KG {id: 'handler:watchdog_timer_device.reset_w'}) SET n:Handler SET n += {method: 'reset_w', ownerClass: 'watchdog_timer_device', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 451, sourceColumn: 2, sourceEndLine: 451};
MERGE (n:KG {id: 'map:polepos_state.z80_map/range13'}) SET n:AddressRange SET n += {start: 41472, end: 41472, raw: 'map(0xa200, 0xa200).mirror(0x0cff).w("engine", FUNC(polepos_sound_device::polepos_engine_sound_lsb_w))', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 452, sourceColumn: 2, sourceEndLine: 452, mirror: 3327};
MERGE (n:KG {id: 'handler:polepos_sound_device.polepos_engine_sound_lsb_w'}) SET n:Handler SET n += {method: 'polepos_engine_sound_lsb_w', ownerClass: 'polepos_sound_device', sourceFile: 'src/mame/namco/polepos_a.cpp', sourceLine: 329, sourceColumn: 1, sourceEndLine: 335, sourceParameters: 'uint8_t data', sourceBody: '/* Update stream first so all samples at old frequency are updated. */
	m_stream->update();
	m_sample_lsb = data & 62;
	m_sample_enable = data & 1;'};
MERGE (n:KG {id: 'map:polepos_state.z80_map/range14'}) SET n:AddressRange SET n += {start: 41728, end: 41728, raw: 'map(0xa300, 0xa300).mirror(0x0cff).w("engine", FUNC(polepos_sound_device::polepos_engine_sound_msb_w))', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 453, sourceColumn: 2, sourceEndLine: 453, mirror: 3327};
MERGE (n:KG {id: 'handler:polepos_sound_device.polepos_engine_sound_msb_w'}) SET n:Handler SET n += {method: 'polepos_engine_sound_msb_w', ownerClass: 'polepos_sound_device', sourceFile: 'src/mame/namco/polepos_a.cpp', sourceLine: 340, sourceColumn: 1, sourceEndLine: 344, sourceParameters: 'uint8_t data', sourceBody: 'm_stream->update();
	m_sample_msb = data & 63;'};
MERGE (n:KG {id: 'map:polepos_state.z80_io'}) SET n:AddressMap SET n += {cls: 'polepos_state', name: 'z80_io', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 456, sourceColumn: 1, sourceEndLine: 460, globalMask: 255};
MERGE (n:KG {id: 'map:polepos_state.z80_io/range0'}) SET n:AddressRange SET n += {start: 0, end: 0, raw: 'map(0x00, 0x00).rw(m_adc, FUNC(adc0804_device::read), FUNC(adc0804_device::write))', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 459, sourceColumn: 2, sourceEndLine: 459};
MERGE (n:KG {id: 'handler:adc0804_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'adc0804_device', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 459, sourceColumn: 2, sourceEndLine: 459};
MERGE (n:KG {id: 'handler:adc0804_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'adc0804_device', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 459, sourceColumn: 2, sourceEndLine: 459};
MERGE (n:KG {id: 'map:polepos_state.z8002_map'}) SET n:AddressMap SET n += {cls: 'polepos_state', name: 'z8002_map', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 464, sourceColumn: 1, sourceEndLine: 472};
MERGE (n:KG {id: 'map:polepos_state.z8002_map/range0'}) SET n:AddressRange SET n += {start: 32768, end: 36863, raw: 'map(0x8000, 0x8fff).ram().share(m_sprite16_memory)', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 466, sourceColumn: 2, sourceEndLine: 466, ram: true, share: 'sprite16_memory'};
MERGE (n:KG {id: 'map:polepos_state.z8002_map/range1'}) SET n:AddressRange SET n += {start: 36864, end: 38911, raw: 'map(0x9000, 0x97ff).ram().share(m_road16_memory)', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 467, sourceColumn: 2, sourceEndLine: 467, ram: true, share: 'road16_memory'};
MERGE (n:KG {id: 'map:polepos_state.z8002_map/range2'}) SET n:AddressRange SET n += {start: 38912, end: 40959, raw: 'map(0x9800, 0x9fff).ram().w(FUNC(polepos_state::alpha16_w)).share(m_alpha16_memory)', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 468, sourceColumn: 2, sourceEndLine: 468, ram: true, share: 'alpha16_memory'};
MERGE (n:KG {id: 'handler:polepos_state.alpha16_w'}) SET n:Handler SET n += {method: 'alpha16_w', ownerClass: 'polepos_state', sourceFile: 'src/mame/namco/polepos_v.cpp', sourceLine: 279, sourceColumn: 1, sourceEndLine: 283, sourceParameters: 'offs_t offset, uint16_t data, uint16_t mem_mask', sourceBody: 'COMBINE_DATA(&m_alpha16_memory[offset]);
	m_tx_tilemap->mark_tile_dirty(offset);'};
MERGE (n:KG {id: 'map:polepos_state.z8002_map/range3'}) SET n:AddressRange SET n += {start: 40960, end: 45055, raw: 'map(0xa000, 0xafff).ram().w(FUNC(polepos_state::view16_w)).share(m_view16_memory)', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 469, sourceColumn: 2, sourceEndLine: 469, ram: true, share: 'view16_memory'};
MERGE (n:KG {id: 'handler:polepos_state.view16_w'}) SET n:Handler SET n += {method: 'view16_w', ownerClass: 'polepos_state', sourceFile: 'src/mame/namco/polepos_v.cpp', sourceLine: 241, sourceColumn: 1, sourceEndLine: 246, sourceParameters: 'offs_t offset, uint16_t data, uint16_t mem_mask', sourceBody: 'COMBINE_DATA(&m_view16_memory[offset]);
	if (offset < 0x400)
		m_bg_tilemap->mark_tile_dirty(offset);'};
MERGE (n:KG {id: 'map:polepos_state.z8002_map/range4'}) SET n:AddressRange SET n += {start: 49152, end: 49153, raw: 'map(0xc000, 0xc001).mirror(0x38fe).w(FUNC(polepos_state::view16_hscroll_w))', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 470, sourceColumn: 2, sourceEndLine: 470, mirror: 14590};
MERGE (n:KG {id: 'handler:polepos_state.view16_hscroll_w'}) SET n:Handler SET n += {method: 'view16_hscroll_w', ownerClass: 'polepos_state', sourceFile: 'src/mame/namco/polepos_v.cpp', sourceLine: 260, sourceColumn: 1, sourceEndLine: 264, sourceParameters: 'offs_t offset, uint16_t data, uint16_t mem_mask', sourceBody: 'COMBINE_DATA(&m_scroll);
	m_bg_tilemap->set_scrollx(0,m_scroll);'};
MERGE (n:KG {id: 'map:polepos_state.z8002_map/range5'}) SET n:AddressRange SET n += {start: 49408, end: 49409, raw: 'map(0xc100, 0xc101).mirror(0x38fe).w(FUNC(polepos_state::road16_vscroll_w))', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 471, sourceColumn: 2, sourceEndLine: 471, mirror: 14590};
MERGE (n:KG {id: 'handler:polepos_state.road16_vscroll_w'}) SET n:Handler SET n += {method: 'road16_vscroll_w', ownerClass: 'polepos_state', sourceFile: 'src/mame/namco/polepos_v.cpp', sourceLine: 229, sourceColumn: 1, sourceEndLine: 232, sourceParameters: 'offs_t offset, uint16_t data, uint16_t mem_mask', sourceBody: 'COMBINE_DATA(&m_road16_vscroll);'};
MERGE (n:KG {id: 'map:polepos_state.z8002_map_1'}) SET n:AddressMap SET n += {cls: 'polepos_state', name: 'z8002_map_1', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 474, sourceColumn: 1, sourceEndLine: 479, calls: ['z8002_map']};
MERGE (n:KG {id: 'map:polepos_state.z8002_map_1/range0'}) SET n:AddressRange SET n += {start: 0, end: 32767, raw: 'map(0x0000, 0x7fff).rom().region("sub1", 0)', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 477, sourceColumn: 2, sourceEndLine: 477, rom: true, region: 'sub1', regionOffset: 0};
MERGE (n:KG {id: 'map:polepos_state.z8002_map_1/range1'}) SET n:AddressRange SET n += {start: 24576, end: 24577, raw: 'map(0x6000, 0x6001).mirror(0x1ffe).w(FUNC(polepos_state::z8002_nvi_enable_w<0>))', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 478, sourceColumn: 2, sourceEndLine: 478, mirror: 8190};
MERGE (n:KG {id: 'handler:polepos_state.z8002_nvi_enable_w_0'}) SET n:Handler SET n += {method: 'z8002_nvi_enable_w_0', ownerClass: 'polepos_state', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 314, sourceColumn: 1, sourceEndLine: 321, sourceConstants: ['NVI_LINE=0'], sourceParameters: 'uint16_t data', sourceBody: 'data &= 1;

	m_sub_irq_mask = data;
	if (!data)
		m_subcpu[Which]->set_input_line(z8002_device::NVI_LINE, CLEAR_LINE);'};
MERGE (n:KG {id: 'map:polepos_state.z8002_map_2'}) SET n:AddressMap SET n += {cls: 'polepos_state', name: 'z8002_map_2', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 481, sourceColumn: 1, sourceEndLine: 486, calls: ['z8002_map']};
MERGE (n:KG {id: 'map:polepos_state.z8002_map_2/range0'}) SET n:AddressRange SET n += {start: 0, end: 32767, raw: 'map(0x0000, 0x7fff).rom().region("sub2", 0)', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 484, sourceColumn: 2, sourceEndLine: 484, rom: true, region: 'sub2', regionOffset: 0};
MERGE (n:KG {id: 'map:polepos_state.z8002_map_2/range1'}) SET n:AddressRange SET n += {start: 24576, end: 24577, raw: 'map(0x6000, 0x6001).mirror(0x1ffe).w(FUNC(polepos_state::z8002_nvi_enable_w<1>))', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 485, sourceColumn: 2, sourceEndLine: 485, mirror: 8190};
MERGE (n:KG {id: 'handler:polepos_state.z8002_nvi_enable_w_1'}) SET n:Handler SET n += {method: 'z8002_nvi_enable_w_1', ownerClass: 'polepos_state', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 314, sourceColumn: 1, sourceEndLine: 321, sourceConstants: ['NVI_LINE=0'], sourceParameters: 'uint16_t data', sourceBody: 'data &= 1;

	m_sub_irq_mask = data;
	if (!data)
		m_subcpu[Which]->set_input_line(z8002_device::NVI_LINE, CLEAR_LINE);'};
MERGE (n:KG {id: 'machine:polepos_state.polepos'}) SET n:MachineConfig SET n += {cls: 'polepos_state', name: 'polepos', calls: [], stateMembers: ['{"name":"m_steer_last","bits":8}', '{"name":"m_steer_delta","bits":8}', '{"name":"m_steer_accum","bits":16,"signed":true}', '{"name":"m_adc_input","bits":8}', '{"name":"m_auto_start_mask","bits":8,"signed":true}', '{"name":"m_vertical_position_modifier","bits":16,"arrayLength":256}', '{"name":"m_road16_vscroll","bits":16}', '{"name":"m_chacl","bits":8}', '{"name":"m_scroll","bits":16}', '{"name":"m_sub_irq_mask","bits":8}'], resetHandlers: ['polepos_state.machine_reset'], startHandlers: ['polepos_state.video_start'], sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 874, sourceColumn: 1, sourceEndLine: 983};
MERGE (n:KG {id: 'handler:polepos_state.machine_reset'}) SET n:Handler SET n += {method: 'machine_reset', ownerClass: 'polepos_state', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 425, sourceColumn: 1, sourceEndLine: 427, sourceParameters: '', sourceBody: ''};
MERGE (n:KG {id: 'handler:polepos_state.video_start'}) SET n:Handler SET n += {method: 'video_start', ownerClass: 'polepos_state', sourceFile: 'src/mame/namco/polepos_v.cpp', sourceLine: 183, sourceColumn: 1, sourceEndLine: 193, sourceParameters: '', sourceBody: 'm_bg_tilemap = &machine().tilemap().create(*m_gfxdecode, tilemap_get_info_delegate(*this, FUNC(polepos_state::bg_get_tile_info)), TILEMAP_SCAN_COLS, 8, 8, 64, 16);
	m_tx_tilemap = &machine().tilemap().create(*m_gfxdecode, tilemap_get_info_delegate(*this, FUNC(polepos_state::tx_get_tile_info)), TILEMAP_SCAN_ROWS, 8, 8, 32, 32);

	m_tx_tilemap->configure_groups(*m_gfxdecode->gfx(0), 0x2f);

	save_item(NAME(m_road16_vscroll));
	save_item(NAME(m_chacl));
	save_item(NAME(m_scroll));'};
MERGE (n:KG {id: 'handler:polepos_state.bg_get_tile_info'}) SET n:Handler SET n += {method: 'bg_get_tile_info', ownerClass: 'polepos_state', sourceFile: 'src/mame/namco/polepos_v.cpp', sourceLine: 145, sourceColumn: 1, sourceEndLine: 151, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'uint16_t const word = m_view16_memory[tile_index];
	int const code = (word & 0xff) | ((word & 0x4000) >> 6);
	int const color = (word & 0x3f00) >> 8;
	tileinfo.set(1, code, color, 0);'};
MERGE (n:KG {id: 'handler:polepos_state.tx_get_tile_info'}) SET n:Handler SET n += {method: 'tx_get_tile_info', ownerClass: 'polepos_state', sourceFile: 'src/mame/namco/polepos_v.cpp', sourceLine: 153, sourceColumn: 1, sourceEndLine: 173, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'uint16_t const word = m_alpha16_memory[tile_index];
	int code = (word & 0xff) | ((word & 0x4000) >> 6);
	int color = (word & 0x3f00) >> 8;

	/* I assume the purpose of CHACL is to allow the Z80 to control
	   the display (therefore using only the bottom 8 bits of tilemap RAM)
	   in case the Z8002 is not working. */
	if (m_chacl == 0)
	{
		code &= 0xff;
		color = 0;
	}

	/* 128V input to the palette PROM */
	if (tile_index >= 32*16) color |= 0x40;

	tileinfo.set(0, code, color, 0);
	tileinfo.group = color;'};
MERGE (n:KG {id: 'device:polepos_state.polepos/maincpu'}) SET n:Device SET n += {type: 'Z80', tag: 'maincpu', clock: 3072000, config: ['Z80(config, m_maincpu, MASTER_CLOCK/8)', 'm_maincpu->set_addrmap(AS_PROGRAM, &polepos_state::z80_map)', 'm_maincpu->set_addrmap(AS_IO, &polepos_state::z80_io)'], sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 877, sourceColumn: 2, sourceEndLine: 877};
MERGE (n:KG {id: 'device:polepos_state.polepos/sub1'}) SET n:Device SET n += {type: 'Z8002', tag: 'sub1', clock: 3072000, config: ['Z8002(config, m_subcpu[0], MASTER_CLOCK/8)', 'm_subcpu[0]->set_addrmap(AS_PROGRAM, &polepos_state::z8002_map_1)'], sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 881, sourceColumn: 2, sourceEndLine: 881};
MERGE (n:KG {id: 'device:polepos_state.polepos/sub2'}) SET n:Device SET n += {type: 'Z8002', tag: 'sub2', clock: 3072000, config: ['Z8002(config, m_subcpu[1], MASTER_CLOCK/8)', 'm_subcpu[1]->set_addrmap(AS_PROGRAM, &polepos_state::z8002_map_2)'], sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 884, sourceColumn: 2, sourceEndLine: 884};
MERGE (n:KG {id: 'device:polepos_state.polepos/51xx'}) SET n:Device SET n += {type: 'NAMCO_51XX', tag: '51xx', clock: 1536000, config: ['namco_51xx_device &n51xx(NAMCO_51XX(config, "51xx", MASTER_CLOCK/8/2))', 'n51xx.input_callback<0>().set_ioport("DSWB").mask(0x0f)', 'n51xx.input_callback<1>().set_ioport("DSWB").rshift(4)', 'n51xx.input_callback<2>().set_ioport("IN0").mask(0x0f)', 'n51xx.input_callback<3>().set_ioport("IN0").rshift(4)', 'n51xx.output_callback().set(FUNC(polepos_state::out))', 'n51xx.lockout_callback().set(FUNC(polepos_state::lockout))'], cls: 'namco_51xx_device', clsHierarchy: ['namco_51xx_device'], sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 887, sourceColumn: 2, sourceEndLine: 887};
MERGE (n:KG {id: 'device:polepos_state.polepos/51xx/callback:51xx:0'}) SET n:Callback SET n += {signal: 'input_callback', operation: 'set_ioport', raw: 'n51xx.input_callback<0>().set_ioport("DSWB").mask(0x0f)', ownerTag: '51xx', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 888, sourceColumn: 2, sourceEndLine: 888, slot: '0', transforms: ['mask(0x0f)'], targetTag: 'DSWB', targetPort: 'DSWB'};
MERGE (n:KG {id: 'device:polepos_state.polepos/51xx/callback:51xx:1'}) SET n:Callback SET n += {signal: 'input_callback', operation: 'set_ioport', raw: 'n51xx.input_callback<1>().set_ioport("DSWB").rshift(4)', ownerTag: '51xx', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 889, sourceColumn: 2, sourceEndLine: 889, slot: '1', transforms: ['rshift(4)'], targetTag: 'DSWB', targetPort: 'DSWB'};
MERGE (n:KG {id: 'device:polepos_state.polepos/51xx/callback:51xx:2'}) SET n:Callback SET n += {signal: 'input_callback', operation: 'set_ioport', raw: 'n51xx.input_callback<2>().set_ioport("IN0").mask(0x0f)', ownerTag: '51xx', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 890, sourceColumn: 2, sourceEndLine: 890, slot: '2', transforms: ['mask(0x0f)'], targetTag: 'IN0', targetPort: 'IN0'};
MERGE (n:KG {id: 'device:polepos_state.polepos/51xx/callback:51xx:3'}) SET n:Callback SET n += {signal: 'input_callback', operation: 'set_ioport', raw: 'n51xx.input_callback<3>().set_ioport("IN0").rshift(4)', ownerTag: '51xx', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 891, sourceColumn: 2, sourceEndLine: 891, slot: '3', transforms: ['rshift(4)'], targetTag: 'IN0', targetPort: 'IN0'};
MERGE (n:KG {id: 'device:polepos_state.polepos/51xx/callback:51xx:4'}) SET n:Callback SET n += {signal: 'output_callback', operation: 'set', raw: 'n51xx.output_callback().set(FUNC(polepos_state::out))', ownerTag: '51xx', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 892, sourceColumn: 2, sourceEndLine: 892, targetClass: 'polepos_state', targetMethod: 'out'};
MERGE (n:KG {id: 'handler:polepos_state.out'}) SET n:Handler SET n += {method: 'out', ownerClass: 'polepos_state', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 328, sourceColumn: 1, sourceEndLine: 335, sourceParameters: 'uint8_t data', sourceBody: '// no start lamps in pole position
//  output().set_led_value(1, BIT(data, 0));
//  output().set_led_value(0, BIT(data, 1));
	machine().bookkeeping().coin_counter_w(1, BIT(~data, 2));
	machine().bookkeeping().coin_counter_w(0, BIT(~data, 3));'};
MERGE (n:KG {id: 'device:polepos_state.polepos/51xx/callback:51xx:5'}) SET n:Callback SET n += {signal: 'lockout_callback', operation: 'set', raw: 'n51xx.lockout_callback().set(FUNC(polepos_state::lockout))', ownerTag: '51xx', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 893, sourceColumn: 2, sourceEndLine: 893, targetClass: 'polepos_state', targetMethod: 'lockout'};
MERGE (n:KG {id: 'handler:polepos_state.lockout'}) SET n:Handler SET n += {method: 'lockout', ownerClass: 'polepos_state', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 337, sourceColumn: 1, sourceEndLine: 340, sourceParameters: 'int state', sourceBody: 'machine().bookkeeping().coin_lockout_global_w(state);'};
MERGE (n:KG {id: 'device:polepos_state.polepos/52xx'}) SET n:Device SET n += {type: 'NAMCO_52XX', tag: '52xx', clock: 1536000, config: ['namco_52xx_device &n52xx(NAMCO_52XX(config, "52xx", MASTER_CLOCK/8/2))', 'n52xx.set_discrete("discrete")', 'n52xx.set_basenote(NODE_04)', 'n52xx.romread_callback().set(FUNC(polepos_state::namco_52xx_rom_r))', 'n52xx.si_callback().set(FUNC(polepos_state::namco_52xx_si_r))'], cls: 'namco_52xx_device', clsHierarchy: ['namco_52xx_device'], sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 895, sourceColumn: 2, sourceEndLine: 895};
MERGE (n:KG {id: 'device:polepos_state.polepos/52xx/callback:52xx:0'}) SET n:Callback SET n += {signal: 'romread_callback', operation: 'set', raw: 'n52xx.romread_callback().set(FUNC(polepos_state::namco_52xx_rom_r))', ownerTag: '52xx', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 898, sourceColumn: 2, sourceEndLine: 898, targetClass: 'polepos_state', targetMethod: 'namco_52xx_rom_r'};
MERGE (n:KG {id: 'handler:polepos_state.namco_52xx_rom_r'}) SET n:Handler SET n += {method: 'namco_52xx_rom_r', ownerClass: 'polepos_state', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 342, sourceColumn: 1, sourceEndLine: 348, sourceConstants: ['LOG_SAMPLE=4'], sourceParameters: 'offs_t offset', sourceBody: 'uint32_t const length = m_52xx_region.bytes();
	if (!machine().side_effects_disabled())
		LOGMASKED(LOG_SAMPLE, "ROM @ %04X\\n", offset);
	return (offset < length) ? m_52xx_region[offset] : 0xff;'};
MERGE (n:KG {id: 'device:polepos_state.polepos/52xx/callback:52xx:1'}) SET n:Callback SET n += {signal: 'si_callback', operation: 'set', raw: 'n52xx.si_callback().set(FUNC(polepos_state::namco_52xx_si_r))', ownerTag: '52xx', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 899, sourceColumn: 2, sourceEndLine: 899, targetClass: 'polepos_state', targetMethod: 'namco_52xx_si_r'};
MERGE (n:KG {id: 'handler:polepos_state.namco_52xx_si_r'}) SET n:Handler SET n += {method: 'namco_52xx_si_r', ownerClass: 'polepos_state', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 350, sourceColumn: 1, sourceEndLine: 354, sourceParameters: '', sourceBody: '/* pulled to +5V */
	return 1;'};
MERGE (n:KG {id: 'device:polepos_state.polepos/53xx'}) SET n:Device SET n += {type: 'NAMCO_53XX', tag: '53xx', clock: 1536000, config: ['namco_53xx_device &n53xx(NAMCO_53XX(config, "53xx", MASTER_CLOCK/8/2))', 'n53xx.k_port_callback().set(FUNC(polepos_state::namco_53xx_k_r))', 'n53xx.input_callback<0>().set(FUNC(polepos_state::steering_changed_r))', 'n53xx.input_callback<1>().set(FUNC(polepos_state::steering_delta_r))', 'n53xx.input_callback<2>().set_ioport("DSWA").mask(0x0f)', 'n53xx.input_callback<3>().set_ioport("DSWA").rshift(4)'], cls: 'namco_53xx_device', clsHierarchy: ['namco_53xx_device'], sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 901, sourceColumn: 2, sourceEndLine: 901};
MERGE (n:KG {id: 'device:polepos_state.polepos/53xx/callback:53xx:0'}) SET n:Callback SET n += {signal: 'k_port_callback', operation: 'set', raw: 'n53xx.k_port_callback().set(FUNC(polepos_state::namco_53xx_k_r))', ownerTag: '53xx', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 902, sourceColumn: 2, sourceEndLine: 902, targetClass: 'polepos_state', targetMethod: 'namco_53xx_k_r'};
MERGE (n:KG {id: 'handler:polepos_state.namco_53xx_k_r'}) SET n:Handler SET n += {method: 'namco_53xx_k_r', ownerClass: 'polepos_state', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 356, sourceColumn: 1, sourceEndLine: 360, sourceParameters: '', sourceBody: '/* hardwired to 0 */
	return 0;'};
MERGE (n:KG {id: 'device:polepos_state.polepos/53xx/callback:53xx:1'}) SET n:Callback SET n += {signal: 'input_callback', operation: 'set', raw: 'n53xx.input_callback<0>().set(FUNC(polepos_state::steering_changed_r))', ownerTag: '53xx', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 903, sourceColumn: 2, sourceEndLine: 903, slot: '0', targetClass: 'polepos_state', targetMethod: 'steering_changed_r'};
MERGE (n:KG {id: 'handler:polepos_state.steering_changed_r'}) SET n:Handler SET n += {method: 'steering_changed_r', ownerClass: 'polepos_state', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 362, sourceColumn: 1, sourceEndLine: 385, sourceParameters: '', sourceBody: 'if (!machine().side_effects_disabled())
	{
		/* read the current steering value and update our delta */
		uint8_t const steer_new = m_steer_io->read();
		m_steer_accum += (int8_t)(steer_new - m_steer_last) * 2;
		m_steer_last = steer_new;

		/* if we have delta, clock things */
		if (m_steer_accum < 0)
		{
			m_steer_delta = 0;
			m_steer_accum++;
		}
		else if (m_steer_accum > 0)
		{
			m_steer_delta = 1;
			m_steer_accum--;
		}
	}

	return m_steer_accum & 1;', inputMembers: ['m_steer_io=STEER']};
MERGE (n:KG {id: 'device:polepos_state.polepos/53xx/callback:53xx:2'}) SET n:Callback SET n += {signal: 'input_callback', operation: 'set', raw: 'n53xx.input_callback<1>().set(FUNC(polepos_state::steering_delta_r))', ownerTag: '53xx', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 904, sourceColumn: 2, sourceEndLine: 904, slot: '1', targetClass: 'polepos_state', targetMethod: 'steering_delta_r'};
MERGE (n:KG {id: 'handler:polepos_state.steering_delta_r'}) SET n:Handler SET n += {method: 'steering_delta_r', ownerClass: 'polepos_state', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 387, sourceColumn: 1, sourceEndLine: 390, sourceParameters: '', sourceBody: 'return m_steer_delta;'};
MERGE (n:KG {id: 'device:polepos_state.polepos/53xx/callback:53xx:3'}) SET n:Callback SET n += {signal: 'input_callback', operation: 'set_ioport', raw: 'n53xx.input_callback<2>().set_ioport("DSWA").mask(0x0f)', ownerTag: '53xx', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 905, sourceColumn: 2, sourceEndLine: 905, slot: '2', transforms: ['mask(0x0f)'], targetTag: 'DSWA', targetPort: 'DSWA'};
MERGE (n:KG {id: 'device:polepos_state.polepos/53xx/callback:53xx:4'}) SET n:Callback SET n += {signal: 'input_callback', operation: 'set_ioport', raw: 'n53xx.input_callback<3>().set_ioport("DSWA").rshift(4)', ownerTag: '53xx', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 906, sourceColumn: 2, sourceEndLine: 906, slot: '3', transforms: ['rshift(4)'], targetTag: 'DSWA', targetPort: 'DSWA'};
MERGE (n:KG {id: 'device:polepos_state.polepos/54xx'}) SET n:Device SET n += {type: 'NAMCO_54XX', tag: '54xx', clock: 1536000, config: ['namco_54xx_device &n54xx(NAMCO_54XX(config, "54xx", MASTER_CLOCK/8/2))', 'n54xx.set_discrete("discrete")', 'n54xx.set_basenote(NODE_01)'], cls: 'namco_54xx_device', clsHierarchy: ['namco_54xx_device'], sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 908, sourceColumn: 2, sourceEndLine: 908};
MERGE (n:KG {id: 'device:polepos_state.polepos/06xx'}) SET n:Device SET n += {type: 'NAMCO_06XX', tag: '06xx', clock: 48000, config: ['namco_06xx_device &n06xx(NAMCO_06XX(config, "06xx", MASTER_CLOCK/8/64))', 'n06xx.set_maincpu(m_maincpu)', 'n06xx.chip_select_callback<0>().set("51xx", FUNC(namco_51xx_device::chip_select))', 'n06xx.rw_callback<0>().set("51xx", FUNC(namco_51xx_device::rw))', 'n06xx.read_callback<0>().set("51xx", FUNC(namco_51xx_device::read))', 'n06xx.write_callback<0>().set("51xx", FUNC(namco_51xx_device::write))', 'n06xx.read_callback<1>().set("53xx", FUNC(namco_53xx_device::read))', 'n06xx.chip_select_callback<1>().set("53xx", FUNC(namco_53xx_device::chip_select))', 'n06xx.write_callback<2>().set("52xx", FUNC(namco_52xx_device::write))', 'n06xx.chip_select_callback<2>().set("52xx", FUNC(namco_52xx_device::chip_select))', 'n06xx.write_callback<3>().set("54xx", FUNC(namco_54xx_device::write))', 'n06xx.chip_select_callback<3>().set("54xx", FUNC(namco_54xx_device::chip_select))'], cls: 'namco_06xx_device', clsHierarchy: ['namco_06xx_device'], sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 912, sourceColumn: 2, sourceEndLine: 912};
MERGE (n:KG {id: 'device:polepos_state.polepos/06xx/callback:06xx:0'}) SET n:Callback SET n += {signal: 'nmi', operation: 'set_maincpu', raw: 'n06xx.set_maincpu(m_maincpu)', ownerTag: '06xx', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 913, sourceColumn: 2, sourceEndLine: 913, inputLine: 'INPUT_LINE_NMI', targetTag: 'maincpu'};
MERGE (n:KG {id: 'device:polepos_state.polepos/06xx/callback:06xx:1'}) SET n:Callback SET n += {signal: 'chip_select_callback', operation: 'set', raw: 'n06xx.chip_select_callback<0>().set("51xx", FUNC(namco_51xx_device::chip_select))', ownerTag: '06xx', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 914, sourceColumn: 2, sourceEndLine: 914, slot: '0', targetTag: '51xx', targetClass: 'namco_51xx_device', targetMethod: 'chip_select'};
MERGE (n:KG {id: 'handler:namco_51xx_device.chip_select'}) SET n:Handler SET n += {method: 'chip_select', ownerClass: 'namco_51xx_device', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 86, sourceColumn: 1, sourceEndLine: 89, sourceConstants: ['MB88XX_IRQ_LINE=0'], sourceParameters: 'int state', sourceBody: 'm_cpu->set_input_line(MB88XX_IRQ_LINE, state ? ASSERT_LINE : CLEAR_LINE);'};
MERGE (n:KG {id: 'device:polepos_state.polepos/06xx/callback:06xx:2'}) SET n:Callback SET n += {signal: 'rw_callback', operation: 'set', raw: 'n06xx.rw_callback<0>().set("51xx", FUNC(namco_51xx_device::rw))', ownerTag: '06xx', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 915, sourceColumn: 2, sourceEndLine: 915, slot: '0', targetTag: '51xx', targetClass: 'namco_51xx_device', targetMethod: 'rw'};
MERGE (n:KG {id: 'handler:namco_51xx_device.rw'}) SET n:Handler SET n += {method: 'rw', ownerClass: 'namco_51xx_device', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 76, sourceColumn: 1, sourceEndLine: 79, sourceParameters: 'int state', sourceBody: 'machine().scheduler().synchronize(timer_expired_delegate(FUNC(namco_51xx_device::rw_sync),this), state);'};
MERGE (n:KG {id: 'handler:namco_51xx_device.rw_sync'}) SET n:Handler SET n += {method: 'rw_sync', ownerClass: 'namco_51xx_device', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 81, sourceColumn: 1, sourceEndLine: 84, sourceParameters: 'int param', sourceBody: 'm_rw = param;'};
MERGE (n:KG {id: 'device:polepos_state.polepos/06xx/callback:06xx:3'}) SET n:Callback SET n += {signal: 'read_callback', operation: 'set', raw: 'n06xx.read_callback<0>().set("51xx", FUNC(namco_51xx_device::read))', ownerTag: '06xx', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 916, sourceColumn: 2, sourceEndLine: 916, slot: '0', targetTag: '51xx', targetClass: 'namco_51xx_device', targetMethod: 'read'};
MERGE (n:KG {id: 'handler:namco_51xx_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'namco_51xx_device', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 91, sourceColumn: 1, sourceEndLine: 94, sourceParameters: '', sourceBody: 'return m_portO;'};
MERGE (n:KG {id: 'device:polepos_state.polepos/06xx/callback:06xx:4'}) SET n:Callback SET n += {signal: 'write_callback', operation: 'set', raw: 'n06xx.write_callback<0>().set("51xx", FUNC(namco_51xx_device::write))', ownerTag: '06xx', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 917, sourceColumn: 2, sourceEndLine: 917, slot: '0', targetTag: '51xx', targetClass: 'namco_51xx_device', targetMethod: 'write'};
MERGE (n:KG {id: 'handler:namco_51xx_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'namco_51xx_device', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 96, sourceColumn: 1, sourceEndLine: 99, sourceParameters: 'uint8_t data', sourceBody: 'machine().scheduler().synchronize(timer_expired_delegate(FUNC(namco_51xx_device::write_sync),this), data);'};
MERGE (n:KG {id: 'handler:namco_51xx_device.write_sync'}) SET n:Handler SET n += {method: 'write_sync', ownerClass: 'namco_51xx_device', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 101, sourceColumn: 1, sourceEndLine: 104, sourceParameters: 'int param', sourceBody: 'm_portO = param;'};
MERGE (n:KG {id: 'device:polepos_state.polepos/06xx/callback:06xx:5'}) SET n:Callback SET n += {signal: 'read_callback', operation: 'set', raw: 'n06xx.read_callback<1>().set("53xx", FUNC(namco_53xx_device::read))', ownerTag: '06xx', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 918, sourceColumn: 2, sourceEndLine: 918, slot: '1', targetTag: '53xx', targetClass: 'namco_53xx_device', targetMethod: 'read'};
MERGE (n:KG {id: 'handler:namco_53xx_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'namco_53xx_device', sourceFile: 'src/mame/namco/namco53.cpp', sourceLine: 95, sourceColumn: 1, sourceEndLine: 98, sourceParameters: '', sourceBody: 'return m_portO;'};
MERGE (n:KG {id: 'device:polepos_state.polepos/06xx/callback:06xx:6'}) SET n:Callback SET n += {signal: 'chip_select_callback', operation: 'set', raw: 'n06xx.chip_select_callback<1>().set("53xx", FUNC(namco_53xx_device::chip_select))', ownerTag: '06xx', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 919, sourceColumn: 2, sourceEndLine: 919, slot: '1', targetTag: '53xx', targetClass: 'namco_53xx_device', targetMethod: 'chip_select'};
MERGE (n:KG {id: 'handler:namco_53xx_device.chip_select'}) SET n:Handler SET n += {method: 'chip_select', ownerClass: 'namco_53xx_device', sourceFile: 'src/mame/namco/namco53.cpp', sourceLine: 90, sourceColumn: 1, sourceEndLine: 93, sourceConstants: ['MB88XX_IRQ_LINE=0'], sourceParameters: 'int state', sourceBody: 'm_cpu->set_input_line(MB88XX_IRQ_LINE, state ? ASSERT_LINE : CLEAR_LINE);'};
MERGE (n:KG {id: 'device:polepos_state.polepos/06xx/callback:06xx:7'}) SET n:Callback SET n += {signal: 'write_callback', operation: 'set', raw: 'n06xx.write_callback<2>().set("52xx", FUNC(namco_52xx_device::write))', ownerTag: '06xx', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 920, sourceColumn: 2, sourceEndLine: 920, slot: '2', targetTag: '52xx', targetClass: 'namco_52xx_device', targetMethod: 'write'};
MERGE (n:KG {id: 'handler:namco_52xx_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'namco_52xx_device', sourceFile: 'src/mame/namco/namco52.cpp', sourceLine: 101, sourceColumn: 1, sourceEndLine: 104, sourceParameters: 'uint8_t data', sourceBody: 'machine().scheduler().synchronize(timer_expired_delegate(FUNC(namco_52xx_device::write_sync),this), data);'};
MERGE (n:KG {id: 'handler:namco_52xx_device.write_sync'}) SET n:Handler SET n += {method: 'write_sync', ownerClass: 'namco_52xx_device', sourceFile: 'src/mame/namco/namco52.cpp', sourceLine: 106, sourceColumn: 1, sourceEndLine: 109, sourceParameters: 'int param', sourceBody: 'm_latched_cmd = param;'};
MERGE (n:KG {id: 'device:polepos_state.polepos/06xx/callback:06xx:8'}) SET n:Callback SET n += {signal: 'chip_select_callback', operation: 'set', raw: 'n06xx.chip_select_callback<2>().set("52xx", FUNC(namco_52xx_device::chip_select))', ownerTag: '06xx', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 921, sourceColumn: 2, sourceEndLine: 921, slot: '2', targetTag: '52xx', targetClass: 'namco_52xx_device', targetMethod: 'chip_select'};
MERGE (n:KG {id: 'handler:namco_52xx_device.chip_select'}) SET n:Handler SET n += {method: 'chip_select', ownerClass: 'namco_52xx_device', sourceFile: 'src/mame/namco/namco52.cpp', sourceLine: 111, sourceColumn: 1, sourceEndLine: 114, sourceConstants: ['MB88XX_IRQ_LINE=0'], sourceParameters: 'int state', sourceBody: 'm_cpu->set_input_line(MB88XX_IRQ_LINE, state ? ASSERT_LINE : CLEAR_LINE);'};
MERGE (n:KG {id: 'device:polepos_state.polepos/06xx/callback:06xx:9'}) SET n:Callback SET n += {signal: 'write_callback', operation: 'set', raw: 'n06xx.write_callback<3>().set("54xx", FUNC(namco_54xx_device::write))', ownerTag: '06xx', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 922, sourceColumn: 2, sourceEndLine: 922, slot: '3', targetTag: '54xx', targetClass: 'namco_54xx_device', targetMethod: 'write'};
MERGE (n:KG {id: 'handler:namco_54xx_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'namco_54xx_device', sourceFile: 'src/mame/namco/namco54.cpp', sourceLine: 86, sourceColumn: 1, sourceEndLine: 89, sourceParameters: 'uint8_t data', sourceBody: 'machine().scheduler().synchronize(timer_expired_delegate(FUNC(namco_54xx_device::write_sync),this), data);'};
MERGE (n:KG {id: 'handler:namco_54xx_device.write_sync'}) SET n:Handler SET n += {method: 'write_sync', ownerClass: 'namco_54xx_device', sourceFile: 'src/mame/namco/namco54.cpp', sourceLine: 91, sourceColumn: 1, sourceEndLine: 94, sourceParameters: 'int param', sourceBody: 'm_latched_cmd = param;'};
MERGE (n:KG {id: 'device:polepos_state.polepos/06xx/callback:06xx:10'}) SET n:Callback SET n += {signal: 'chip_select_callback', operation: 'set', raw: 'n06xx.chip_select_callback<3>().set("54xx", FUNC(namco_54xx_device::chip_select))', ownerTag: '06xx', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 923, sourceColumn: 2, sourceEndLine: 923, slot: '3', targetTag: '54xx', targetClass: 'namco_54xx_device', targetMethod: 'chip_select'};
MERGE (n:KG {id: 'handler:namco_54xx_device.chip_select'}) SET n:Handler SET n += {method: 'chip_select', ownerClass: 'namco_54xx_device', sourceFile: 'src/mame/namco/namco54.cpp', sourceLine: 97, sourceColumn: 1, sourceEndLine: 100, sourceConstants: ['MB88XX_IRQ_LINE=0'], sourceParameters: 'int state', sourceBody: 'm_cpu->set_input_line(MB88XX_IRQ_LINE, state ? ASSERT_LINE : CLEAR_LINE);'};
MERGE (n:KG {id: 'device:polepos_state.polepos/watchdog'}) SET n:Device SET n += {type: 'WATCHDOG_TIMER', tag: 'watchdog', clock: null, config: ['WATCHDOG_TIMER(config, "watchdog").set_vblank_count(m_screen, 16)'], sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 925, sourceColumn: 2, sourceEndLine: 925};
MERGE (n:KG {id: 'device:polepos_state.polepos/nvram'}) SET n:Device SET n += {type: 'NVRAM', tag: 'nvram', clock: null, config: ['NVRAM(config, "nvram", nvram_device::DEFAULT_ALL_1)'], sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 927, sourceColumn: 2, sourceEndLine: 927, clockExpr: 'nvram_device::DEFAULT_ALL_1'};
MERGE (n:KG {id: 'device:polepos_state.polepos/scantimer'}) SET n:Device SET n += {type: 'TIMER', tag: 'scantimer', clock: null, config: ['TIMER(config, "scantimer").configure_scanline(FUNC(polepos_state::scanline), "screen", 0, 1)'], sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 929, sourceColumn: 2, sourceEndLine: 929};
MERGE (n:KG {id: 'device:polepos_state.polepos/scantimer/callback:scantimer:0'}) SET n:Callback SET n += {signal: 'configure_scanline', operation: 'configure_scanline', raw: 'TIMER(config, "scantimer").configure_scanline(FUNC(polepos_state::scanline), "screen", 0, 1)', ownerTag: 'scantimer', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 929, sourceColumn: 2, sourceEndLine: 929, scanlineStart: 0, scanlineIncrement: 1, targetClass: 'polepos_state', targetMethod: 'scanline'};
MERGE (n:KG {id: 'handler:polepos_state.scanline'}) SET n:Handler SET n += {method: 'scanline', ownerClass: 'polepos_state', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 392, sourceColumn: 1, sourceEndLine: 404, sourceConstants: ['NVI_LINE=0'], sourceParameters: 'int param', sourceBody: 'int const scanline = param;

	if (((scanline == 64) || (scanline == 192)) && m_latch->q0_r()) // 64V
		m_maincpu->set_input_line(0, ASSERT_LINE);

	if (scanline == 240 && m_sub_irq_mask)  // VBLANK
	{
		m_subcpu[0]->set_input_line(z8002_device::NVI_LINE, ASSERT_LINE);
		m_subcpu[1]->set_input_line(z8002_device::NVI_LINE, ASSERT_LINE);
	}'};
MERGE (n:KG {id: 'device:polepos_state.polepos/latch'}) SET n:Device SET n += {type: 'LS259', tag: 'latch', clock: null, config: ['LS259(config, m_latch)', 'm_latch->q_out_cb<0>().set_inputline(m_maincpu, 0, CLEAR_LINE).invert()', 'm_latch->q_out_cb<1>().set("51xx", FUNC(namco_51xx_device::reset))', 'm_latch->q_out_cb<1>().append("52xx", FUNC(namco_52xx_device::reset))', 'm_latch->q_out_cb<1>().append("53xx", FUNC(namco_53xx_device::reset))', 'm_latch->q_out_cb<1>().append("54xx", FUNC(namco_54xx_device::reset))', 'm_latch->q_out_cb<2>().set(m_namco_sound, FUNC(polepos_wsg_device::sound_enable_w))', 'm_latch->q_out_cb<2>().append("engine", FUNC(polepos_sound_device::clson_w))', 'm_latch->q_out_cb<3>().set(FUNC(polepos_state::gasel_w))', 'm_latch->q_out_cb<4>().set_inputline(m_subcpu[0], INPUT_LINE_RESET).invert()', 'm_latch->q_out_cb<5>().set_inputline(m_subcpu[1], INPUT_LINE_RESET).invert()', 'm_latch->q_out_cb<6>().set(FUNC(polepos_state::sb0_w))', 'm_latch->q_out_cb<7>().set(FUNC(polepos_state::chacl_w))'], sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 931, sourceColumn: 2, sourceEndLine: 931};
MERGE (n:KG {id: 'device:polepos_state.polepos/latch/callback:latch:0'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set_inputline', raw: 'm_latch->q_out_cb<0>().set_inputline(m_maincpu, 0, CLEAR_LINE).invert()', ownerTag: 'latch', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 932, sourceColumn: 2, sourceEndLine: 932, slot: '0', transforms: ['invert'], inputLine: '0', targetTag: 'maincpu'};
MERGE (n:KG {id: 'device:polepos_state.polepos/latch/callback:latch:1'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_latch->q_out_cb<1>().set("51xx", FUNC(namco_51xx_device::reset))', ownerTag: 'latch', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 933, sourceColumn: 2, sourceEndLine: 933, slot: '1', targetTag: '51xx', targetClass: 'namco_51xx_device', targetMethod: 'reset'};
MERGE (n:KG {id: 'handler:namco_51xx_device.reset'}) SET n:Handler SET n += {method: 'reset', ownerClass: 'namco_51xx_device', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 64, sourceColumn: 1, sourceEndLine: 68, sourceParameters: 'int state', sourceBody: '// Reset line is active low.
	m_cpu->set_input_line(INPUT_LINE_RESET, state ? CLEAR_LINE : ASSERT_LINE);'};
MERGE (n:KG {id: 'device:polepos_state.polepos/latch/callback:latch:2'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'append', raw: 'm_latch->q_out_cb<1>().append("52xx", FUNC(namco_52xx_device::reset))', ownerTag: 'latch', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 934, sourceColumn: 2, sourceEndLine: 934, slot: '1', targetTag: '52xx', targetClass: 'namco_52xx_device', targetMethod: 'reset'};
MERGE (n:KG {id: 'handler:namco_52xx_device.reset'}) SET n:Handler SET n += {method: 'reset', ownerClass: 'namco_52xx_device', sourceFile: 'src/mame/namco/namco52.cpp', sourceLine: 53, sourceColumn: 1, sourceEndLine: 57, sourceParameters: 'int state', sourceBody: '// The incoming signal is active low
	m_cpu->set_input_line(INPUT_LINE_RESET, state ? CLEAR_LINE : ASSERT_LINE);'};
MERGE (n:KG {id: 'device:polepos_state.polepos/latch/callback:latch:3'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'append', raw: 'm_latch->q_out_cb<1>().append("53xx", FUNC(namco_53xx_device::reset))', ownerTag: 'latch', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 935, sourceColumn: 2, sourceEndLine: 935, slot: '1', targetTag: '53xx', targetClass: 'namco_53xx_device', targetMethod: 'reset'};
MERGE (n:KG {id: 'handler:namco_53xx_device.reset'}) SET n:Handler SET n += {method: 'reset', ownerClass: 'namco_53xx_device', sourceFile: 'src/mame/namco/namco53.cpp', sourceLine: 63, sourceColumn: 1, sourceEndLine: 67, sourceParameters: 'int state', sourceBody: '// The incoming signal is active low
	m_cpu->set_input_line(INPUT_LINE_RESET, state ? CLEAR_LINE : ASSERT_LINE);'};
MERGE (n:KG {id: 'device:polepos_state.polepos/latch/callback:latch:4'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'append', raw: 'm_latch->q_out_cb<1>().append("54xx", FUNC(namco_54xx_device::reset))', ownerTag: 'latch', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 936, sourceColumn: 2, sourceEndLine: 936, slot: '1', targetTag: '54xx', targetClass: 'namco_54xx_device', targetMethod: 'reset'};
MERGE (n:KG {id: 'handler:namco_54xx_device.reset'}) SET n:Handler SET n += {method: 'reset', ownerClass: 'namco_54xx_device', sourceFile: 'src/mame/namco/namco54.cpp', sourceLine: 56, sourceColumn: 1, sourceEndLine: 60, sourceParameters: 'int state', sourceBody: '// The incoming signal is active low
	m_cpu->set_input_line(INPUT_LINE_RESET, state ? CLEAR_LINE : ASSERT_LINE);'};
MERGE (n:KG {id: 'device:polepos_state.polepos/latch/callback:latch:5'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_latch->q_out_cb<2>().set(m_namco_sound, FUNC(polepos_wsg_device::sound_enable_w))', ownerTag: 'latch', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 937, sourceColumn: 2, sourceEndLine: 937, slot: '2', targetClass: 'polepos_wsg_device', targetMethod: 'sound_enable_w', targetTag: 'namco'};
MERGE (n:KG {id: 'handler:polepos_wsg_device.sound_enable_w'}) SET n:Handler SET n += {method: 'sound_enable_w', ownerClass: 'polepos_wsg_device', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 1055, sourceColumn: 2, sourceEndLine: 1055};
MERGE (n:KG {id: 'device:polepos_state.polepos/latch/callback:latch:6'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'append', raw: 'm_latch->q_out_cb<2>().append("engine", FUNC(polepos_sound_device::clson_w))', ownerTag: 'latch', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 938, sourceColumn: 2, sourceEndLine: 938, slot: '2', targetTag: 'engine', targetClass: 'polepos_sound_device', targetMethod: 'clson_w'};
MERGE (n:KG {id: 'handler:polepos_sound_device.clson_w'}) SET n:Handler SET n += {method: 'clson_w', ownerClass: 'polepos_sound_device', sourceFile: 'src/mame/namco/polepos_a.cpp', sourceLine: 316, sourceColumn: 1, sourceEndLine: 323, sourceParameters: 'int state', sourceBody: 'if (!state)
	{
		polepos_engine_sound_lsb_w(0);
		polepos_engine_sound_msb_w(0);
	}'};
MERGE (n:KG {id: 'device:polepos_state.polepos/latch/callback:latch:7'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_latch->q_out_cb<3>().set(FUNC(polepos_state::gasel_w))', ownerTag: 'latch', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 939, sourceColumn: 2, sourceEndLine: 939, slot: '3', targetClass: 'polepos_state', targetMethod: 'gasel_w'};
MERGE (n:KG {id: 'handler:polepos_state.gasel_w'}) SET n:Handler SET n += {method: 'gasel_w', ownerClass: 'polepos_state', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 304, sourceColumn: 1, sourceEndLine: 307, sourceParameters: 'int state', sourceBody: 'm_adc_input = state;'};
MERGE (n:KG {id: 'device:polepos_state.polepos/latch/callback:latch:8'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set_inputline', raw: 'm_latch->q_out_cb<4>().set_inputline(m_subcpu[0], INPUT_LINE_RESET).invert()', ownerTag: 'latch', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 940, sourceColumn: 2, sourceEndLine: 940, slot: '4', transforms: ['invert'], inputLine: 'INPUT_LINE_RESET', targetTag: 'sub1'};
MERGE (n:KG {id: 'device:polepos_state.polepos/latch/callback:latch:9'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set_inputline', raw: 'm_latch->q_out_cb<5>().set_inputline(m_subcpu[1], INPUT_LINE_RESET).invert()', ownerTag: 'latch', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 941, sourceColumn: 2, sourceEndLine: 941, slot: '5', transforms: ['invert'], inputLine: 'INPUT_LINE_RESET', targetTag: 'sub2'};
MERGE (n:KG {id: 'device:polepos_state.polepos/latch/callback:latch:10'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_latch->q_out_cb<6>().set(FUNC(polepos_state::sb0_w))', ownerTag: 'latch', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 942, sourceColumn: 2, sourceEndLine: 942, slot: '6', targetClass: 'polepos_state', targetMethod: 'sb0_w'};
MERGE (n:KG {id: 'handler:polepos_state.sb0_w'}) SET n:Handler SET n += {method: 'sb0_w', ownerClass: 'polepos_state', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 309, sourceColumn: 1, sourceEndLine: 312, sourceParameters: 'int state', sourceBody: 'm_auto_start_mask = !state;'};
MERGE (n:KG {id: 'device:polepos_state.polepos/latch/callback:latch:11'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_latch->q_out_cb<7>().set(FUNC(polepos_state::chacl_w))', ownerTag: 'latch', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 943, sourceColumn: 2, sourceEndLine: 943, slot: '7', targetClass: 'polepos_state', targetMethod: 'chacl_w'};
MERGE (n:KG {id: 'handler:polepos_state.chacl_w'}) SET n:Handler SET n += {method: 'chacl_w', ownerClass: 'polepos_state', sourceFile: 'src/mame/namco/polepos_v.cpp', sourceLine: 266, sourceColumn: 1, sourceEndLine: 270, sourceParameters: 'int state', sourceBody: 'm_chacl = state;
	m_tx_tilemap->mark_all_dirty();'};
MERGE (n:KG {id: 'device:polepos_state.polepos/adc'}) SET n:Device SET n += {type: 'ADC0804', tag: 'adc', clock: 384000, config: ['ADC0804(config, m_adc, MASTER_CLOCK/8/8)', 'm_adc->vin_callback().set(FUNC(polepos_state::analog_r))'], sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 945, sourceColumn: 2, sourceEndLine: 945};
MERGE (n:KG {id: 'device:polepos_state.polepos/adc/callback:adc:0'}) SET n:Callback SET n += {signal: 'vin_callback', operation: 'set', raw: 'm_adc->vin_callback().set(FUNC(polepos_state::analog_r))', ownerTag: 'adc', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 946, sourceColumn: 2, sourceEndLine: 946, targetClass: 'polepos_state', targetMethod: 'analog_r'};
MERGE (n:KG {id: 'handler:polepos_state.analog_r'}) SET n:Handler SET n += {method: 'analog_r', ownerClass: 'polepos_state', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 286, sourceColumn: 1, sourceEndLine: 289, sourceParameters: '', sourceBody: 'return m_analog_io[m_adc_input & 1]->read();', inputMembers: ['m_analog_io=BRAKE,ACCEL']};
MERGE (n:KG {id: 'device:polepos_state.polepos/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['SCREEN(config, m_screen, SCREEN_TYPE_RASTER)', 'm_screen->set_raw(MASTER_CLOCK/4, 384, 0, 256, 264, 16, 224+16)', 'm_screen->set_screen_update(FUNC(polepos_state::screen_update))', 'm_screen->set_palette(m_palette)', 'm_screen->screen_vblank().set("51xx", FUNC(namco_51xx_device::vblank))'], sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 949, sourceColumn: 2, sourceEndLine: 949, configCalls: ['set_raw(6144000,384,0,256,264,16,240)'], clockExpr: 'SCREEN_TYPE_RASTER', screenRaw: [6144000, 384, 0, 256, 264, 16, 240], screenRawExpr: ['MASTER_CLOCK/4', '384', '0', '256', '264', '16', '224+16']};
MERGE (n:KG {id: 'device:polepos_state.polepos/screen/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'm_screen->set_screen_update(FUNC(polepos_state::screen_update))', ownerTag: 'screen', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 951, sourceColumn: 2, sourceEndLine: 951, targetClass: 'polepos_state', targetMethod: 'screen_update'};
MERGE (n:KG {id: 'handler:polepos_state.screen_update'}) SET n:Handler SET n += {method: 'screen_update', ownerClass: 'polepos_state', sourceFile: 'src/mame/namco/polepos_v.cpp', sourceLine: 451, sourceColumn: 1, sourceEndLine: 460, sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: 'rectangle clip = cliprect;
	clip.max_y = 127;
	m_bg_tilemap->draw(screen, bitmap, clip, 0, 0);
	draw_road(bitmap);
	draw_sprites(bitmap,cliprect);
	m_tx_tilemap->draw(screen, bitmap, cliprect, 0, 0);
	return 0;'};
MERGE (n:KG {id: 'handler:polepos_state.draw_road'}) SET n:Handler SET n += {method: 'draw_road', ownerClass: 'polepos_state', sourceFile: 'src/mame/namco/polepos_v.cpp', sourceLine: 304, sourceColumn: 1, sourceEndLine: 373, sourceParameters: 'bitmap_ind16 &bitmap', sourceBody: 'uint8_t const *const road_bits1 = &m_road_region[0x2000];
	uint8_t const *const road_bits2 = &m_road_region[0x4000];

	/* loop over the lower half of the screen */
	for (int y = 128; y < 256; y++)
	{
		uint16_t scanline[256 + 8]{};
		uint16_t *dest = scanline;

		/* first add the vertical position modifier and the vertical scroll */
		int const yoffs = ((m_vertical_position_modifier[y] + m_road16_vscroll) >> 3) & 0x1ff;

		/* then use that as a lookup into the road memory */
		int const roadpal = m_road16_memory[yoffs] & 15;

		/* this becomes the palette base for the scanline */
		pen_t const pen_base = 0x0b00 + (roadpal << 6);

		/* now fetch the horizontal scroll offset for this scanline */
		int xoffs = m_road16_memory[0x380 + (y & 0x7f)] & 0x3ff;

		/* the road is drawn in 8-pixel chunks, so round downward and adjust the base */
		/* note that we assume there is at least 8 pixels of slop on the left/right */
		int const xscroll = xoffs & 7;
		xoffs &= ~7;

		/* loop over 8-pixel chunks */
		for (int x = 0; x < 256 / 8 + 1; x++, xoffs += 8)
		{
			/* if the 0x200 bit of the xoffset is set, a special pin on the custom */
			/* chip is set and the /CE and /OE for the road chips is disabled */
			if (xoffs & 0x200)
			{
				/* in this case, it looks like we just fill with 0 */
				for (int i = 0; i < 8; i++)
					*dest++ = pen_base | 0;
			}

			/* otherwise, we clock in the bits and compute the road value */
			else
			{
				/* the road ROM offset comes from the current scanline and the X offset */
				int const romoffs = ((y & 0x07f) << 6) + ((xoffs & 0x1f8) >> 3);

				/* fetch the current data from the road ROMs */
				int const control = m_road_region[romoffs];
				int const bits1 = road_bits1[romoffs];
				int const bits2 = road_bits2[(romoffs & 0xfff) | ((romoffs & 0x1000) >> 1)];

				/* extract the road value and the carry-in bit */
				int roadval = control & 0x3f;
				int const carin = control >> 7;

				/* draw this 8-pixel chunk */
				for (int i = 8; i > 0; i--)
				{
					int bits = BIT(bits1, i) + (BIT(bits2, i) << 1);
					if (!carin && bits) bits++;
					*dest++ = pen_base | (roadval & 0x3f);
					roadval += bits;
				}
			}
		}

		/* draw the scanline */
		draw_scanline16(bitmap, 0, y, 256, &scanline[xscroll], nullptr);
	}'};
MERGE (n:KG {id: 'handler:polepos_state.draw_sprites'}) SET n:Handler SET n += {method: 'draw_sprites', ownerClass: 'polepos_state', sourceFile: 'src/mame/namco/polepos_v.cpp', sourceLine: 423, sourceColumn: 1, sourceEndLine: 448, sourceParameters: 'bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: 'uint16_t const *posmem = &m_sprite16_memory[0x380];
	uint16_t const *sizmem = &m_sprite16_memory[0x780];

	for (int i = 0; i < 64; i++, posmem += 2, sizmem += 2)
	{
		int const sx = (posmem[1] & 0x3ff) - 0x40 + 4;
		int const sy = 512 - (posmem[0] & 0x1ff) + 1; // sprites are buffered and delayed by one scanline
		int const sizex = (sizmem[1] & 0x3f00) >> 8;
		int const sizey = (sizmem[0] & 0x3f00) >> 8;
		int const code = sizmem[0] & 0x7f;
		bool const flipx = BIT(sizmem[0], 7);
		int color = sizmem[1] & 0x3f;

		/* 128V input to the palette PROM */
		if (sy >= 128) color |= 0x40;

		zoom_sprite(bitmap, BIT(sizmem[0], 15),
					code,
					color,
					flipx,
					sx, sy,
					sizex, sizey);
	}'};
MERGE (n:KG {id: 'handler:polepos_state.zoom_sprite'}) SET n:Handler SET n += {method: 'zoom_sprite', ownerClass: 'polepos_state', sourceFile: 'src/mame/namco/polepos_v.cpp', sourceLine: 375, sourceColumn: 1, sourceEndLine: 421, sourceParameters: 'bitmap_ind16 &bitmap, bool big,
		uint32_t code, uint32_t color, bool flipx, int sx, int sy,
		int sizex, int sizey', sourceBody: 'gfx_element *gfx = m_gfxdecode->gfx(big ? 3 : 2);
	uint8_t const *const gfxdata = gfx->get_data(code % gfx->elements());
	uint32_t const transmask = m_palette->transpen_mask(*gfx, color, 0x1f);
	int const coloroffs = gfx->colorbase() + color * gfx->granularity();

	int const offsxor = flipx ? (big ? 0x1f : 0x0f) : 0;

	for (int y = 0; y <= sizey; y++)
	{
		int const yy = (sy + y) & 0x1ff;

		/* the following should be a reasonable reproduction of how the real hardware works */
		if (yy >= 0x10 && yy < 0xf0)
		{
			int dy = m_scalelut_region[(y << 6) + sizey] & 0x1f;
			int xx = sx & 0x3ff;
			int siz = 0;
			int offs = 0;

			if (!big) dy >>= 1;
			uint8_t const *src = &gfxdata[dy * gfx->rowbytes()];

			for (int x = (big ? 0x40 : 0x20); x > 0; x--)
			{
				if (xx < 0x100)
				{
					int const pen = src[offs/2 ^ offsxor];

					if (!((transmask >> pen) & 1))
						bitmap.pix(yy, xx) = pen + coloroffs;
				}
				offs++;

				siz = siz + 1 + sizex;
				if (siz & 0x40)
				{
					siz &= 0x3f;
					xx = (xx + 1) & 0x3ff;
				}
			}
		}
	}'};
MERGE (n:KG {id: 'device:polepos_state.polepos/screen/callback:screen:1'}) SET n:Callback SET n += {signal: 'screen_vblank', operation: 'set', raw: 'm_screen->screen_vblank().set("51xx", FUNC(namco_51xx_device::vblank))', ownerTag: 'screen', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 953, sourceColumn: 2, sourceEndLine: 953, targetTag: '51xx', targetClass: 'namco_51xx_device', targetMethod: 'vblank'};
MERGE (n:KG {id: 'handler:namco_51xx_device.vblank'}) SET n:Handler SET n += {method: 'vblank', ownerClass: 'namco_51xx_device', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 70, sourceColumn: 1, sourceEndLine: 74, sourceConstants: ['MB88XX_TC_LINE=1'], sourceParameters: 'int state', sourceBody: '// The timer is active on falling edges.
	m_cpu->set_input_line(MB88XX_TC_LINE, state ? CLEAR_LINE : ASSERT_LINE);'};
MERGE (n:KG {id: 'device:polepos_state.polepos/gfxdecode'}) SET n:Device SET n += {type: 'GFXDECODE', tag: 'gfxdecode', clock: null, config: ['GFXDECODE(config, m_gfxdecode, m_palette, gfx_polepos)'], sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 955, sourceColumn: 2, sourceEndLine: 955, clockExpr: 'm_palette'};
MERGE (n:KG {id: 'device:polepos_state.polepos/palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'palette', clock: null, config: ['PALETTE(config, m_palette, FUNC(polepos_state::polepos_palette), 0x0f00, 128)'], sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 956, sourceColumn: 2, sourceEndLine: 956, clockExpr: 'FUNC(polepos_state::polepos_palette)'};
MERGE (n:KG {id: 'device:polepos_state.polepos/speaker'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'speaker', clock: 2, config: ['SPEAKER(config, "speaker", 2).front()'], sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 961, sourceColumn: 2, sourceEndLine: 961};
MERGE (n:KG {id: 'device:polepos_state.polepos/rspeaker'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'rspeaker', clock: 2, config: ['SPEAKER(config, "rspeaker", 2).rear()'], sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 962, sourceColumn: 2, sourceEndLine: 962};
MERGE (n:KG {id: 'device:polepos_state.polepos/namco'}) SET n:Device SET n += {type: 'POLEPOS_WSG', tag: 'namco', clock: 48000, config: ['POLEPOS_WSG(config, m_namco_sound, MASTER_CLOCK/512)', 'm_namco_sound->add_route(0, "speaker", 0.80, 0)', 'm_namco_sound->add_route(1, "speaker", 0.80, 1)', 'm_namco_sound->add_route(2, "rspeaker", 0.80, 0)', 'm_namco_sound->add_route(3, "rspeaker", 0.80, 1)'], sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 964, sourceColumn: 2, sourceEndLine: 964};
MERGE (n:KG {id: 'audioroute:device:polepos_state.polepos/namco/0'}) SET n:AudioRoute SET n += {output: '0', target: 'speaker', gain: 0.8, input: 0, raw: 'm_namco_sound->add_route(0, "speaker", 0.80, 0)', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 965, sourceColumn: 2, sourceEndLine: 965};
MERGE (n:KG {id: 'audioroute:device:polepos_state.polepos/namco/1'}) SET n:AudioRoute SET n += {output: '1', target: 'speaker', gain: 0.8, input: 1, raw: 'm_namco_sound->add_route(1, "speaker", 0.80, 1)', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 966, sourceColumn: 2, sourceEndLine: 966};
MERGE (n:KG {id: 'audioroute:device:polepos_state.polepos/namco/2'}) SET n:AudioRoute SET n += {output: '2', target: 'rspeaker', gain: 0.8, input: 0, raw: 'm_namco_sound->add_route(2, "rspeaker", 0.80, 0)', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 967, sourceColumn: 2, sourceEndLine: 967};
MERGE (n:KG {id: 'audioroute:device:polepos_state.polepos/namco/3'}) SET n:AudioRoute SET n += {output: '3', target: 'rspeaker', gain: 0.8, input: 1, raw: 'm_namco_sound->add_route(3, "rspeaker", 0.80, 1)', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 968, sourceColumn: 2, sourceEndLine: 968};
MERGE (n:KG {id: 'device:polepos_state.polepos/discrete'}) SET n:Device SET n += {type: 'DISCRETE', tag: 'discrete', clock: null, config: ['discrete_sound_device &discrete(DISCRETE(config, "discrete", polepos_discrete))', 'discrete.add_route(ALL_OUTPUTS, "speaker", 0.90, 0)', 'discrete.add_route(ALL_OUTPUTS, "speaker", 0.90, 1)', 'discrete.add_route(ALL_OUTPUTS, "rspeaker", 0.90, 0)', 'discrete.add_route(ALL_OUTPUTS, "rspeaker", 0.90, 1)'], sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 971, sourceColumn: 2, sourceEndLine: 971, clockExpr: 'polepos_discrete'};
MERGE (n:KG {id: 'audioroute:device:polepos_state.polepos/discrete/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'speaker', gain: 0.9, input: 0, raw: 'discrete.add_route(ALL_OUTPUTS, "speaker", 0.90, 0)', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 972, sourceColumn: 2, sourceEndLine: 972};
MERGE (n:KG {id: 'audioroute:device:polepos_state.polepos/discrete/1'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'speaker', gain: 0.9, input: 1, raw: 'discrete.add_route(ALL_OUTPUTS, "speaker", 0.90, 1)', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 973, sourceColumn: 2, sourceEndLine: 973};
MERGE (n:KG {id: 'audioroute:device:polepos_state.polepos/discrete/2'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'rspeaker', gain: 0.9, input: 0, raw: 'discrete.add_route(ALL_OUTPUTS, "rspeaker", 0.90, 0)', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 974, sourceColumn: 2, sourceEndLine: 974};
MERGE (n:KG {id: 'audioroute:device:polepos_state.polepos/discrete/3'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'rspeaker', gain: 0.9, input: 1, raw: 'discrete.add_route(ALL_OUTPUTS, "rspeaker", 0.90, 1)', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 975, sourceColumn: 2, sourceEndLine: 975};
MERGE (n:KG {id: 'device:polepos_state.polepos/engine'}) SET n:Device SET n += {type: 'POLEPOS_SOUND', tag: 'engine', clock: 3072000, config: ['polepos_sound_device &polepos(POLEPOS_SOUND(config, "engine", MASTER_CLOCK/8))', 'polepos.add_route(ALL_OUTPUTS, "speaker", 0.90 * 0.77, 0)', 'polepos.add_route(ALL_OUTPUTS, "speaker", 0.90 * 0.77, 1)', 'polepos.add_route(ALL_OUTPUTS, "rspeaker", 0.90 * 0.77, 0)', 'polepos.add_route(ALL_OUTPUTS, "rspeaker", 0.90 * 0.77, 1)'], cls: 'polepos_sound_device', clsHierarchy: ['polepos_sound_device'], sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 978, sourceColumn: 2, sourceEndLine: 978};
MERGE (n:KG {id: 'audioroute:device:polepos_state.polepos/engine/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'speaker', gain: 0.6930000000000001, input: 0, raw: 'polepos.add_route(ALL_OUTPUTS, "speaker", 0.90 * 0.77, 0)', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 979, sourceColumn: 2, sourceEndLine: 979};
MERGE (n:KG {id: 'audioroute:device:polepos_state.polepos/engine/1'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'speaker', gain: 0.6930000000000001, input: 1, raw: 'polepos.add_route(ALL_OUTPUTS, "speaker", 0.90 * 0.77, 1)', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 980, sourceColumn: 2, sourceEndLine: 980};
MERGE (n:KG {id: 'audioroute:device:polepos_state.polepos/engine/2'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'rspeaker', gain: 0.6930000000000001, input: 0, raw: 'polepos.add_route(ALL_OUTPUTS, "rspeaker", 0.90 * 0.77, 0)', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 981, sourceColumn: 2, sourceEndLine: 981};
MERGE (n:KG {id: 'audioroute:device:polepos_state.polepos/engine/3'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'rspeaker', gain: 0.6930000000000001, input: 1, raw: 'polepos.add_route(ALL_OUTPUTS, "rspeaker", 0.90 * 0.77, 1)', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 982, sourceColumn: 2, sourceEndLine: 982};
MERGE (n:KG {id: 'machine:namco_52xx_device.device_add_mconfig'}) SET n:MachineConfig SET n += {cls: 'namco_52xx_device', name: 'device_add_mconfig', calls: [], stateMembers: ['{"name":"m_basenode","bits":32,"signed":true}', '{"name":"m_latched_cmd","bits":8}', '{"name":"m_address","bits":32}'], sourceFile: 'src/mame/namco/namco52.cpp', sourceLine: 168, sourceColumn: 1, sourceEndLine: 179};
MERGE (n:KG {id: 'device:namco_52xx_device.device_add_mconfig/mcu'}) SET n:Device SET n += {type: 'MB8843', tag: 'mcu', clock: 1536000, config: ['MB8843(config, m_cpu, DERIVED_CLOCK(1,1))', 'm_cpu->read_k().set(FUNC(namco_52xx_device::K_r))', 'm_cpu->write_o().set(FUNC(namco_52xx_device::O_w))', 'm_cpu->write_p().set(FUNC(namco_52xx_device::P_w))', 'm_cpu->read_si().set(FUNC(namco_52xx_device::SI_r))', 'm_cpu->read_r<0>().set(FUNC(namco_52xx_device::R0_r))', 'm_cpu->read_r<1>().set(FUNC(namco_52xx_device::R1_r))', 'm_cpu->write_r<2>().set(FUNC(namco_52xx_device::R2_w))', 'm_cpu->write_r<3>().set(FUNC(namco_52xx_device::R3_w))'], sourceFile: 'src/mame/namco/namco52.cpp', sourceLine: 170, sourceColumn: 2, sourceEndLine: 170};
MERGE (n:KG {id: 'device:namco_52xx_device.device_add_mconfig/mcu/callback:mcu:0'}) SET n:Callback SET n += {signal: 'read_k', operation: 'set', raw: 'm_cpu->read_k().set(FUNC(namco_52xx_device::K_r))', ownerTag: 'mcu', sourceFile: 'src/mame/namco/namco52.cpp', sourceLine: 171, sourceColumn: 2, sourceEndLine: 171, targetClass: 'namco_52xx_device', targetMethod: 'K_r'};
MERGE (n:KG {id: 'handler:namco_52xx_device.K_r'}) SET n:Handler SET n += {method: 'K_r', ownerClass: 'namco_52xx_device', sourceFile: 'src/mame/namco/namco52.cpp', sourceLine: 59, sourceColumn: 1, sourceEndLine: 62, sourceParameters: '', sourceBody: 'return m_latched_cmd & 0x0f;'};
MERGE (n:KG {id: 'device:namco_52xx_device.device_add_mconfig/mcu/callback:mcu:1'}) SET n:Callback SET n += {signal: 'write_o', operation: 'set', raw: 'm_cpu->write_o().set(FUNC(namco_52xx_device::O_w))', ownerTag: 'mcu', sourceFile: 'src/mame/namco/namco52.cpp', sourceLine: 172, sourceColumn: 2, sourceEndLine: 172, targetClass: 'namco_52xx_device', targetMethod: 'O_w'};
MERGE (n:KG {id: 'handler:namco_52xx_device.O_w'}) SET n:Handler SET n += {method: 'O_w', ownerClass: 'namco_52xx_device', sourceFile: 'src/mame/namco/namco52.cpp', sourceLine: 95, sourceColumn: 1, sourceEndLine: 98, sourceParameters: 'uint8_t data', sourceBody: 'm_address = (m_address & 0x00ff) | (data << 8);'};
MERGE (n:KG {id: 'device:namco_52xx_device.device_add_mconfig/mcu/callback:mcu:2'}) SET n:Callback SET n += {signal: 'write_p', operation: 'set', raw: 'm_cpu->write_p().set(FUNC(namco_52xx_device::P_w))', ownerTag: 'mcu', sourceFile: 'src/mame/namco/namco52.cpp', sourceLine: 173, sourceColumn: 2, sourceEndLine: 173, targetClass: 'namco_52xx_device', targetMethod: 'P_w'};
MERGE (n:KG {id: 'handler:namco_52xx_device.P_w'}) SET n:Handler SET n += {method: 'P_w', ownerClass: 'namco_52xx_device', sourceFile: 'src/mame/namco/namco52.cpp', sourceLine: 80, sourceColumn: 1, sourceEndLine: 83, sourceParameters: 'uint8_t data', sourceBody: 'm_discrete->write(NAMCO_52XX_P_DATA(m_basenode), data & 0x0f);'};
MERGE (n:KG {id: 'device:namco_52xx_device.device_add_mconfig/mcu/callback:mcu:3'}) SET n:Callback SET n += {signal: 'read_si', operation: 'set', raw: 'm_cpu->read_si().set(FUNC(namco_52xx_device::SI_r))', ownerTag: 'mcu', sourceFile: 'src/mame/namco/namco52.cpp', sourceLine: 174, sourceColumn: 2, sourceEndLine: 174, targetClass: 'namco_52xx_device', targetMethod: 'SI_r'};
MERGE (n:KG {id: 'handler:namco_52xx_device.SI_r'}) SET n:Handler SET n += {method: 'SI_r', ownerClass: 'namco_52xx_device', sourceFile: 'src/mame/namco/namco52.cpp', sourceLine: 64, sourceColumn: 1, sourceEndLine: 67, sourceParameters: '', sourceBody: 'return m_si(0) ? 1 : 0;'};
MERGE (n:KG {id: 'device:namco_52xx_device.device_add_mconfig/mcu/callback:mcu:4'}) SET n:Callback SET n += {signal: 'read_r', operation: 'set', raw: 'm_cpu->read_r<0>().set(FUNC(namco_52xx_device::R0_r))', ownerTag: 'mcu', sourceFile: 'src/mame/namco/namco52.cpp', sourceLine: 175, sourceColumn: 2, sourceEndLine: 175, slot: '0', targetClass: 'namco_52xx_device', targetMethod: 'R0_r'};
MERGE (n:KG {id: 'handler:namco_52xx_device.R0_r'}) SET n:Handler SET n += {method: 'R0_r', ownerClass: 'namco_52xx_device', sourceFile: 'src/mame/namco/namco52.cpp', sourceLine: 69, sourceColumn: 1, sourceEndLine: 72, sourceParameters: '', sourceBody: 'return m_romread(m_address) & 0x0f;'};
MERGE (n:KG {id: 'device:namco_52xx_device.device_add_mconfig/mcu/callback:mcu:5'}) SET n:Callback SET n += {signal: 'read_r', operation: 'set', raw: 'm_cpu->read_r<1>().set(FUNC(namco_52xx_device::R1_r))', ownerTag: 'mcu', sourceFile: 'src/mame/namco/namco52.cpp', sourceLine: 176, sourceColumn: 2, sourceEndLine: 176, slot: '1', targetClass: 'namco_52xx_device', targetMethod: 'R1_r'};
MERGE (n:KG {id: 'handler:namco_52xx_device.R1_r'}) SET n:Handler SET n += {method: 'R1_r', ownerClass: 'namco_52xx_device', sourceFile: 'src/mame/namco/namco52.cpp', sourceLine: 74, sourceColumn: 1, sourceEndLine: 77, sourceParameters: '', sourceBody: 'return m_romread(m_address) >> 4;'};
MERGE (n:KG {id: 'device:namco_52xx_device.device_add_mconfig/mcu/callback:mcu:6'}) SET n:Callback SET n += {signal: 'write_r', operation: 'set', raw: 'm_cpu->write_r<2>().set(FUNC(namco_52xx_device::R2_w))', ownerTag: 'mcu', sourceFile: 'src/mame/namco/namco52.cpp', sourceLine: 177, sourceColumn: 2, sourceEndLine: 177, slot: '2', targetClass: 'namco_52xx_device', targetMethod: 'R2_w'};
MERGE (n:KG {id: 'handler:namco_52xx_device.R2_w'}) SET n:Handler SET n += {method: 'R2_w', ownerClass: 'namco_52xx_device', sourceFile: 'src/mame/namco/namco52.cpp', sourceLine: 85, sourceColumn: 1, sourceEndLine: 88, sourceParameters: 'uint8_t data', sourceBody: 'm_address = (m_address & 0xfff0) | ((data & 0xf) << 0);'};
MERGE (n:KG {id: 'device:namco_52xx_device.device_add_mconfig/mcu/callback:mcu:7'}) SET n:Callback SET n += {signal: 'write_r', operation: 'set', raw: 'm_cpu->write_r<3>().set(FUNC(namco_52xx_device::R3_w))', ownerTag: 'mcu', sourceFile: 'src/mame/namco/namco52.cpp', sourceLine: 178, sourceColumn: 2, sourceEndLine: 178, slot: '3', targetClass: 'namco_52xx_device', targetMethod: 'R3_w'};
MERGE (n:KG {id: 'handler:namco_52xx_device.R3_w'}) SET n:Handler SET n += {method: 'R3_w', ownerClass: 'namco_52xx_device', sourceFile: 'src/mame/namco/namco52.cpp', sourceLine: 90, sourceColumn: 1, sourceEndLine: 93, sourceParameters: 'uint8_t data', sourceBody: 'm_address = (m_address & 0xff0f) | ((data & 0xf) << 4);'};
MERGE (n:KG {id: 'machine:namco_54xx_device.device_add_mconfig'}) SET n:MachineConfig SET n += {cls: 'namco_54xx_device', name: 'device_add_mconfig', calls: [], stateMembers: ['{"name":"m_basenode","bits":32,"signed":true}', '{"name":"m_latched_cmd","bits":8}'], sourceFile: 'src/mame/namco/namco54.cpp', sourceLine: 136, sourceColumn: 1, sourceEndLine: 143};
MERGE (n:KG {id: 'device:namco_54xx_device.device_add_mconfig/mcu'}) SET n:Device SET n += {type: 'MB8844', tag: 'mcu', clock: 1536000, config: ['MB8844(config, m_cpu, DERIVED_CLOCK(1,1))', 'm_cpu->read_k().set(FUNC(namco_54xx_device::K_r))', 'm_cpu->write_o().set(FUNC(namco_54xx_device::O_w))', 'm_cpu->read_r<0>().set(FUNC(namco_54xx_device::R0_r))', 'm_cpu->write_r<1>().set(FUNC(namco_54xx_device::R1_w))'], sourceFile: 'src/mame/namco/namco54.cpp', sourceLine: 138, sourceColumn: 2, sourceEndLine: 138};
MERGE (n:KG {id: 'device:namco_54xx_device.device_add_mconfig/mcu/callback:mcu:0'}) SET n:Callback SET n += {signal: 'read_k', operation: 'set', raw: 'm_cpu->read_k().set(FUNC(namco_54xx_device::K_r))', ownerTag: 'mcu', sourceFile: 'src/mame/namco/namco54.cpp', sourceLine: 139, sourceColumn: 2, sourceEndLine: 139, targetClass: 'namco_54xx_device', targetMethod: 'K_r'};
MERGE (n:KG {id: 'handler:namco_54xx_device.K_r'}) SET n:Handler SET n += {method: 'K_r', ownerClass: 'namco_54xx_device', sourceFile: 'src/mame/namco/namco54.cpp', sourceLine: 62, sourceColumn: 1, sourceEndLine: 65, sourceParameters: '', sourceBody: 'return m_latched_cmd >> 4;'};
MERGE (n:KG {id: 'device:namco_54xx_device.device_add_mconfig/mcu/callback:mcu:1'}) SET n:Callback SET n += {signal: 'write_o', operation: 'set', raw: 'm_cpu->write_o().set(FUNC(namco_54xx_device::O_w))', ownerTag: 'mcu', sourceFile: 'src/mame/namco/namco54.cpp', sourceLine: 140, sourceColumn: 2, sourceEndLine: 140, targetClass: 'namco_54xx_device', targetMethod: 'O_w'};
MERGE (n:KG {id: 'handler:namco_54xx_device.O_w'}) SET n:Handler SET n += {method: 'O_w', ownerClass: 'namco_54xx_device', sourceFile: 'src/mame/namco/namco54.cpp', sourceLine: 72, sourceColumn: 1, sourceEndLine: 78, sourceParameters: 'offs_t offset, uint8_t data, uint8_t mem_mask', sourceBody: 'if (mem_mask == 0x0f)
		m_discrete->write(NAMCO_54XX_0_DATA(m_basenode), data & 0x0f);
	else
		m_discrete->write(NAMCO_54XX_1_DATA(m_basenode), data >> 4);'};
MERGE (n:KG {id: 'device:namco_54xx_device.device_add_mconfig/mcu/callback:mcu:2'}) SET n:Callback SET n += {signal: 'read_r', operation: 'set', raw: 'm_cpu->read_r<0>().set(FUNC(namco_54xx_device::R0_r))', ownerTag: 'mcu', sourceFile: 'src/mame/namco/namco54.cpp', sourceLine: 141, sourceColumn: 2, sourceEndLine: 141, slot: '0', targetClass: 'namco_54xx_device', targetMethod: 'R0_r'};
MERGE (n:KG {id: 'handler:namco_54xx_device.R0_r'}) SET n:Handler SET n += {method: 'R0_r', ownerClass: 'namco_54xx_device', sourceFile: 'src/mame/namco/namco54.cpp', sourceLine: 67, sourceColumn: 1, sourceEndLine: 70, sourceParameters: '', sourceBody: 'return m_latched_cmd & 0x0f;'};
MERGE (n:KG {id: 'device:namco_54xx_device.device_add_mconfig/mcu/callback:mcu:3'}) SET n:Callback SET n += {signal: 'write_r', operation: 'set', raw: 'm_cpu->write_r<1>().set(FUNC(namco_54xx_device::R1_w))', ownerTag: 'mcu', sourceFile: 'src/mame/namco/namco54.cpp', sourceLine: 142, sourceColumn: 2, sourceEndLine: 142, slot: '1', targetClass: 'namco_54xx_device', targetMethod: 'R1_w'};
MERGE (n:KG {id: 'handler:namco_54xx_device.R1_w'}) SET n:Handler SET n += {method: 'R1_w', ownerClass: 'namco_54xx_device', sourceFile: 'src/mame/namco/namco54.cpp', sourceLine: 80, sourceColumn: 1, sourceEndLine: 83, sourceParameters: 'uint8_t data', sourceBody: 'm_discrete->write(NAMCO_54XX_2_DATA(m_basenode), data & 0x0f);'};
MERGE (n:KG {id: 'machine:namco_51xx_device.device_add_mconfig'}) SET n:MachineConfig SET n += {cls: 'namco_51xx_device', name: 'device_add_mconfig', calls: [], stateMembers: ['{"name":"m_portO","bits":8}', '{"name":"m_rw","bits":8}'], sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 168, sourceColumn: 1, sourceEndLine: 178};
MERGE (n:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu'}) SET n:Device SET n += {type: 'MB8843', tag: 'mcu', clock: 1536000, config: ['MB8843(config, m_cpu, DERIVED_CLOCK(1,1))', 'm_cpu->read_k().set(FUNC(namco_51xx_device::K_r))', 'm_cpu->read_r<0>().set(FUNC(namco_51xx_device::R_r<0>))', 'm_cpu->read_r<1>().set(FUNC(namco_51xx_device::R_r<1>))', 'm_cpu->read_r<2>().set(FUNC(namco_51xx_device::R_r<2>))', 'm_cpu->read_r<3>().set(FUNC(namco_51xx_device::R_r<3>))', 'm_cpu->write_o().set(FUNC(namco_51xx_device::O_w))', 'm_cpu->write_p().set(FUNC(namco_51xx_device::P_w))'], sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 170, sourceColumn: 2, sourceEndLine: 170};
MERGE (n:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback:mcu:0'}) SET n:Callback SET n += {signal: 'read_k', operation: 'set', raw: 'm_cpu->read_k().set(FUNC(namco_51xx_device::K_r))', ownerTag: 'mcu', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 171, sourceColumn: 2, sourceEndLine: 171, targetClass: 'namco_51xx_device', targetMethod: 'K_r'};
MERGE (n:KG {id: 'handler:namco_51xx_device.K_r'}) SET n:Handler SET n += {method: 'K_r', ownerClass: 'namco_51xx_device', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 106, sourceColumn: 1, sourceEndLine: 109, sourceParameters: '', sourceBody: 'return (m_rw << 3) | (m_portO & 0x07);'};
MERGE (n:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback:mcu:1'}) SET n:Callback SET n += {signal: 'read_r', operation: 'set', raw: 'm_cpu->read_r<0>().set(FUNC(namco_51xx_device::R_r<0>))', ownerTag: 'mcu', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 172, sourceColumn: 2, sourceEndLine: 172, slot: '0', targetClass: 'namco_51xx_device', targetMethod: 'R_r_0'};
MERGE (n:KG {id: 'handler:namco_51xx_device.R_r_0'}) SET n:Handler SET n += {method: 'R_r_0', ownerClass: 'namco_51xx_device', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 112, sourceColumn: 1, sourceEndLine: 115, sourceConstants: ['N=0'], sourceParameters: '', sourceBody: 'return m_in[N]();'};
MERGE (n:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback:mcu:2'}) SET n:Callback SET n += {signal: 'read_r', operation: 'set', raw: 'm_cpu->read_r<1>().set(FUNC(namco_51xx_device::R_r<1>))', ownerTag: 'mcu', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 173, sourceColumn: 2, sourceEndLine: 173, slot: '1', targetClass: 'namco_51xx_device', targetMethod: 'R_r_1'};
MERGE (n:KG {id: 'handler:namco_51xx_device.R_r_1'}) SET n:Handler SET n += {method: 'R_r_1', ownerClass: 'namco_51xx_device', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 112, sourceColumn: 1, sourceEndLine: 115, sourceConstants: ['N=1'], sourceParameters: '', sourceBody: 'return m_in[N]();'};
MERGE (n:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback:mcu:3'}) SET n:Callback SET n += {signal: 'read_r', operation: 'set', raw: 'm_cpu->read_r<2>().set(FUNC(namco_51xx_device::R_r<2>))', ownerTag: 'mcu', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 174, sourceColumn: 2, sourceEndLine: 174, slot: '2', targetClass: 'namco_51xx_device', targetMethod: 'R_r_2'};
MERGE (n:KG {id: 'handler:namco_51xx_device.R_r_2'}) SET n:Handler SET n += {method: 'R_r_2', ownerClass: 'namco_51xx_device', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 112, sourceColumn: 1, sourceEndLine: 115, sourceConstants: ['N=2'], sourceParameters: '', sourceBody: 'return m_in[N]();'};
MERGE (n:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback:mcu:4'}) SET n:Callback SET n += {signal: 'read_r', operation: 'set', raw: 'm_cpu->read_r<3>().set(FUNC(namco_51xx_device::R_r<3>))', ownerTag: 'mcu', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 175, sourceColumn: 2, sourceEndLine: 175, slot: '3', targetClass: 'namco_51xx_device', targetMethod: 'R_r_3'};
MERGE (n:KG {id: 'handler:namco_51xx_device.R_r_3'}) SET n:Handler SET n += {method: 'R_r_3', ownerClass: 'namco_51xx_device', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 112, sourceColumn: 1, sourceEndLine: 115, sourceConstants: ['N=3'], sourceParameters: '', sourceBody: 'return m_in[N]();'};
MERGE (n:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback:mcu:5'}) SET n:Callback SET n += {signal: 'write_o', operation: 'set', raw: 'm_cpu->write_o().set(FUNC(namco_51xx_device::O_w))', ownerTag: 'mcu', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 176, sourceColumn: 2, sourceEndLine: 176, targetClass: 'namco_51xx_device', targetMethod: 'O_w'};
MERGE (n:KG {id: 'handler:namco_51xx_device.O_w'}) SET n:Handler SET n += {method: 'O_w', ownerClass: 'namco_51xx_device', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 117, sourceColumn: 1, sourceEndLine: 120, sourceParameters: 'uint8_t data', sourceBody: 'machine().scheduler().synchronize(timer_expired_delegate(FUNC(namco_51xx_device::O_w_sync),this), data);'};
MERGE (n:KG {id: 'handler:namco_51xx_device.O_w_sync'}) SET n:Handler SET n += {method: 'O_w_sync', ownerClass: 'namco_51xx_device', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 122, sourceColumn: 1, sourceEndLine: 125, sourceParameters: 'int param', sourceBody: 'm_portO = param;'};
MERGE (n:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback:mcu:6'}) SET n:Callback SET n += {signal: 'write_p', operation: 'set', raw: 'm_cpu->write_p().set(FUNC(namco_51xx_device::P_w))', ownerTag: 'mcu', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 177, sourceColumn: 2, sourceEndLine: 177, targetClass: 'namco_51xx_device', targetMethod: 'P_w'};
MERGE (n:KG {id: 'handler:namco_51xx_device.P_w'}) SET n:Handler SET n += {method: 'P_w', ownerClass: 'namco_51xx_device', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 127, sourceColumn: 1, sourceEndLine: 130, sourceParameters: 'uint8_t data', sourceBody: 'm_out(data);'};
MERGE (n:KG {id: 'machine:namco_53xx_device.device_add_mconfig'}) SET n:MachineConfig SET n += {cls: 'namco_53xx_device', name: 'device_add_mconfig', calls: [], stateMembers: ['{"name":"m_portO","bits":8}'], sourceFile: 'src/mame/namco/namco53.cpp', sourceLine: 134, sourceColumn: 1, sourceEndLine: 144};
MERGE (n:KG {id: 'device:namco_53xx_device.device_add_mconfig/mcu'}) SET n:Device SET n += {type: 'MB8843', tag: 'mcu', clock: 1536000, config: ['MB8843(config, m_cpu, DERIVED_CLOCK(1,1))', 'm_cpu->read_k().set(FUNC(namco_53xx_device::K_r))', 'm_cpu->write_o().set(FUNC(namco_53xx_device::O_w))', 'm_cpu->write_p().set(FUNC(namco_53xx_device::P_w))', 'm_cpu->read_r<0>().set(FUNC(namco_53xx_device::R_r<0>))', 'm_cpu->read_r<1>().set(FUNC(namco_53xx_device::R_r<1>))', 'm_cpu->read_r<2>().set(FUNC(namco_53xx_device::R_r<2>))', 'm_cpu->read_r<3>().set(FUNC(namco_53xx_device::R_r<3>))'], sourceFile: 'src/mame/namco/namco53.cpp', sourceLine: 136, sourceColumn: 2, sourceEndLine: 136};
MERGE (n:KG {id: 'device:namco_53xx_device.device_add_mconfig/mcu/callback:mcu:0'}) SET n:Callback SET n += {signal: 'read_k', operation: 'set', raw: 'm_cpu->read_k().set(FUNC(namco_53xx_device::K_r))', ownerTag: 'mcu', sourceFile: 'src/mame/namco/namco53.cpp', sourceLine: 137, sourceColumn: 2, sourceEndLine: 137, targetClass: 'namco_53xx_device', targetMethod: 'K_r'};
MERGE (n:KG {id: 'handler:namco_53xx_device.K_r'}) SET n:Handler SET n += {method: 'K_r', ownerClass: 'namco_53xx_device', sourceFile: 'src/mame/namco/namco53.cpp', sourceLine: 69, sourceColumn: 1, sourceEndLine: 72, sourceParameters: '', sourceBody: 'return m_k();'};
MERGE (n:KG {id: 'device:namco_53xx_device.device_add_mconfig/mcu/callback:mcu:1'}) SET n:Callback SET n += {signal: 'write_o', operation: 'set', raw: 'm_cpu->write_o().set(FUNC(namco_53xx_device::O_w))', ownerTag: 'mcu', sourceFile: 'src/mame/namco/namco53.cpp', sourceLine: 138, sourceColumn: 2, sourceEndLine: 138, targetClass: 'namco_53xx_device', targetMethod: 'O_w'};
MERGE (n:KG {id: 'handler:namco_53xx_device.O_w'}) SET n:Handler SET n += {method: 'O_w', ownerClass: 'namco_53xx_device', sourceFile: 'src/mame/namco/namco53.cpp', sourceLine: 80, sourceColumn: 1, sourceEndLine: 83, sourceParameters: 'uint8_t data', sourceBody: 'm_portO = data;'};
MERGE (n:KG {id: 'device:namco_53xx_device.device_add_mconfig/mcu/callback:mcu:2'}) SET n:Callback SET n += {signal: 'write_p', operation: 'set', raw: 'm_cpu->write_p().set(FUNC(namco_53xx_device::P_w))', ownerTag: 'mcu', sourceFile: 'src/mame/namco/namco53.cpp', sourceLine: 139, sourceColumn: 2, sourceEndLine: 139, targetClass: 'namco_53xx_device', targetMethod: 'P_w'};
MERGE (n:KG {id: 'handler:namco_53xx_device.P_w'}) SET n:Handler SET n += {method: 'P_w', ownerClass: 'namco_53xx_device', sourceFile: 'src/mame/namco/namco53.cpp', sourceLine: 85, sourceColumn: 1, sourceEndLine: 88, sourceParameters: 'uint8_t data', sourceBody: 'm_p(data);'};
MERGE (n:KG {id: 'device:namco_53xx_device.device_add_mconfig/mcu/callback:mcu:3'}) SET n:Callback SET n += {signal: 'read_r', operation: 'set', raw: 'm_cpu->read_r<0>().set(FUNC(namco_53xx_device::R_r<0>))', ownerTag: 'mcu', sourceFile: 'src/mame/namco/namco53.cpp', sourceLine: 140, sourceColumn: 2, sourceEndLine: 140, slot: '0', targetClass: 'namco_53xx_device', targetMethod: 'R_r_0'};
MERGE (n:KG {id: 'handler:namco_53xx_device.R_r_0'}) SET n:Handler SET n += {method: 'R_r_0', ownerClass: 'namco_53xx_device', sourceFile: 'src/mame/namco/namco53.cpp', sourceLine: 75, sourceColumn: 1, sourceEndLine: 78, sourceConstants: ['N=0'], sourceParameters: '', sourceBody: 'return m_in[N]();'};
MERGE (n:KG {id: 'device:namco_53xx_device.device_add_mconfig/mcu/callback:mcu:4'}) SET n:Callback SET n += {signal: 'read_r', operation: 'set', raw: 'm_cpu->read_r<1>().set(FUNC(namco_53xx_device::R_r<1>))', ownerTag: 'mcu', sourceFile: 'src/mame/namco/namco53.cpp', sourceLine: 141, sourceColumn: 2, sourceEndLine: 141, slot: '1', targetClass: 'namco_53xx_device', targetMethod: 'R_r_1'};
MERGE (n:KG {id: 'handler:namco_53xx_device.R_r_1'}) SET n:Handler SET n += {method: 'R_r_1', ownerClass: 'namco_53xx_device', sourceFile: 'src/mame/namco/namco53.cpp', sourceLine: 75, sourceColumn: 1, sourceEndLine: 78, sourceConstants: ['N=1'], sourceParameters: '', sourceBody: 'return m_in[N]();'};
MERGE (n:KG {id: 'device:namco_53xx_device.device_add_mconfig/mcu/callback:mcu:5'}) SET n:Callback SET n += {signal: 'read_r', operation: 'set', raw: 'm_cpu->read_r<2>().set(FUNC(namco_53xx_device::R_r<2>))', ownerTag: 'mcu', sourceFile: 'src/mame/namco/namco53.cpp', sourceLine: 142, sourceColumn: 2, sourceEndLine: 142, slot: '2', targetClass: 'namco_53xx_device', targetMethod: 'R_r_2'};
MERGE (n:KG {id: 'handler:namco_53xx_device.R_r_2'}) SET n:Handler SET n += {method: 'R_r_2', ownerClass: 'namco_53xx_device', sourceFile: 'src/mame/namco/namco53.cpp', sourceLine: 75, sourceColumn: 1, sourceEndLine: 78, sourceConstants: ['N=2'], sourceParameters: '', sourceBody: 'return m_in[N]();'};
MERGE (n:KG {id: 'device:namco_53xx_device.device_add_mconfig/mcu/callback:mcu:6'}) SET n:Callback SET n += {signal: 'read_r', operation: 'set', raw: 'm_cpu->read_r<3>().set(FUNC(namco_53xx_device::R_r<3>))', ownerTag: 'mcu', sourceFile: 'src/mame/namco/namco53.cpp', sourceLine: 143, sourceColumn: 2, sourceEndLine: 143, slot: '3', targetClass: 'namco_53xx_device', targetMethod: 'R_r_3'};
MERGE (n:KG {id: 'handler:namco_53xx_device.R_r_3'}) SET n:Handler SET n += {method: 'R_r_3', ownerClass: 'namco_53xx_device', sourceFile: 'src/mame/namco/namco53.cpp', sourceLine: 75, sourceColumn: 1, sourceEndLine: 78, sourceConstants: ['N=3'], sourceParameters: '', sourceBody: 'return m_in[N]();'};
MERGE (n:KG {id: 'inputs:polepos'}) SET n:InputPorts SET n += {name: 'polepos', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 500, sourceColumn: 8, sourceEndLine: 500};
MERGE (n:KG {id: 'inputs:polepos/IN0'}) SET n:Port SET n += {tag: 'IN0', modify: false};
MERGE (n:KG {id: 'inputs:polepos/IN0/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_UNUSED', defaultValue: 1};
MERGE (n:KG {id: 'inputs:polepos/IN0/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_BUTTON3', modifiers: ['PORT_NAME("Gear Change")', 'PORT_TOGGLE'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:polepos/IN0/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_CUSTOM', modifiers: ['PORT_READ_LINE_MEMBER(FUNC(polepos_state::auto_start_r))'], defaultValue: 4};
MERGE (n:KG {id: 'handler:polepos_state.auto_start_r'}) SET n:Handler SET n += {method: 'auto_start_r', ownerClass: 'polepos_state', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 323, sourceColumn: 1, sourceEndLine: 326, sourceParameters: '', sourceBody: 'return m_auto_start_mask;'};
MERGE (n:KG {id: 'inputs:polepos/IN0/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_UNUSED', defaultValue: 8};
MERGE (n:KG {id: 'inputs:polepos/IN0/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_COIN1', defaultValue: 16};
MERGE (n:KG {id: 'inputs:polepos/IN0/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_COIN2', defaultValue: 32};
MERGE (n:KG {id: 'inputs:polepos/IN0/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_SERVICE1', defaultValue: 64};
MERGE (n:KG {id: 'inputs:polepos/IN0/f7'}) SET n:PortField SET n += {kind: 'service', mask: 128, activeLow: true, defaultValue: 128};
MERGE (n:KG {id: 'inputs:polepos/DSWA'}) SET n:Port SET n += {tag: 'DSWA', modify: false};
MERGE (n:KG {id: 'inputs:polepos/DSWA/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 7, modifiers: ['PORT_DIPLOCATION("SW1:1,2,3")'], name: 'Coin A', defaultValue: 7, location: 'SW1:1,2,3', settings: ['5=3C 1C', '3=2C 1C', '7=1C 1C', '4=2C 3C', '6=1C 2C', '2=1C 3C', '0=1C 5C', '1=1C 6C']};
MERGE (n:KG {id: 'inputs:polepos/DSWA/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 24, modifiers: ['PORT_DIPLOCATION("SW1:4,5")'], name: 'Coin B', defaultValue: 24, location: 'SW1:4,5', settings: ['16=2C 1C', '24=1C 1C', '0=2C 3C', '8=1C 2C']};
MERGE (n:KG {id: 'inputs:polepos/DSWA/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 96, modifiers: ['PORT_DIPLOCATION("SW1:6,7")'], name: 'Game Time', defaultValue: 96, location: 'SW1:6,7', settings: ['96=90 secs.', '32=100 secs.', '64=110 secs.', '0=120 secs.']};
MERGE (n:KG {id: 'inputs:polepos/DSWA/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 128, modifiers: ['PORT_DIPLOCATION("SW1:8")'], name: 'Racing Laps', defaultValue: 128, location: 'SW1:8', settings: ['128=3', '0=4']};
MERGE (n:KG {id: 'inputs:polepos/DSWB'}) SET n:Port SET n += {tag: 'DSWB', modify: false};
MERGE (n:KG {id: 'inputs:polepos/DSWB/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 7, modifiers: ['PORT_DIPLOCATION("SW2:1,2,3")'], name: 'Extended Rank', defaultValue: 3, location: 'SW2:1,2,3', settings: ['7=A', '3=B', '5=C', '1=D', '6=E', '2=F', '4=G', '0=H']};
MERGE (n:KG {id: 'inputs:polepos/DSWB/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 56, modifiers: ['PORT_DIPLOCATION("SW2:4,5,6")'], name: 'Practice Rank', defaultValue: 40, location: 'SW2:4,5,6', settings: ['56=A', '24=B', '40=C', '8=D', '48=E', '16=F', '32=G', '0=H']};
MERGE (n:KG {id: 'inputs:polepos/DSWB/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 64, modifiers: ['PORT_DIPLOCATION("SW2:7")'], name: 'Unknown', defaultValue: 64, location: 'SW2:7', settings: ['64=Off', '0=On']};
MERGE (n:KG {id: 'inputs:polepos/DSWB/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 128, modifiers: ['PORT_DIPLOCATION("SW2:8")'], name: 'Demo Sounds', defaultValue: 0, location: 'SW2:8', settings: ['128=Off', '0=On']};
MERGE (n:KG {id: 'inputs:polepos/BRAKE'}) SET n:Port SET n += {tag: 'BRAKE', modify: false};
MERGE (n:KG {id: 'inputs:polepos/BRAKE/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 255, activeLow: false, type: 'IPT_PEDAL2', modifiers: ['PORT_MINMAX(0,0x90)', 'PORT_SENSITIVITY(100)', 'PORT_KEYDELTA(16)'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:polepos/ACCEL'}) SET n:Port SET n += {tag: 'ACCEL', modify: false};
MERGE (n:KG {id: 'inputs:polepos/ACCEL/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 255, activeLow: false, type: 'IPT_PEDAL', modifiers: ['PORT_MINMAX(0,0x90)', 'PORT_SENSITIVITY(100)', 'PORT_KEYDELTA(16)'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:polepos/STEER'}) SET n:Port SET n += {tag: 'STEER', modify: false};
MERGE (n:KG {id: 'inputs:polepos/STEER/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 255, activeLow: false, type: 'IPT_DIAL', modifiers: ['PORT_SENSITIVITY(30)', 'PORT_KEYDELTA(4)'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:poleposa'}) SET n:InputPorts SET n += {name: 'poleposa', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 572, sourceColumn: 8, sourceEndLine: 572};
MERGE (n:KG {id: 'inputs:poleposa/DSWA'}) SET n:Port SET n += {tag: 'DSWA', modify: true};
MERGE (n:KG {id: 'inputs:poleposa/DSWA/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 224, modifiers: ['PORT_DIPLOCATION("SW1:1,2,3")'], name: 'Coin A', defaultValue: 224, location: 'SW1:1,2,3', settings: ['192=3C 1C', '32=2C 1C', '64=3C 2C', '128=4C 3C', '224=1C 1C', '96=1C 2C', '160=1C 3C', '0=Free Play']};
MERGE (n:KG {id: 'inputs:poleposa/DSWA/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 24, modifiers: ['PORT_DIPLOCATION("SW1:4,5")'], name: 'Coin B', defaultValue: 24, location: 'SW1:4,5', settings: ['8=2C 1C', '16=3C 2C', '0=4C 3C', '24=1C 1C']};
MERGE (n:KG {id: 'inputs:poleposa/DSWA/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 6, modifiers: ['PORT_DIPLOCATION("SW1:6,7")'], name: 'Game Time', defaultValue: 6, location: 'SW1:6,7', settings: ['6=90 secs.', '2=100 secs.', '4=110 secs.', '0=120 secs.']};
MERGE (n:KG {id: 'inputs:poleposa/DSWA/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 1, modifiers: ['PORT_DIPLOCATION("SW1:8")'], name: 'Racing Laps', defaultValue: 1, location: 'SW1:8', settings: ['1=3', '0=4']};
MERGE (n:KG {id: 'inputs:poleposa/DSWB'}) SET n:Port SET n += {tag: 'DSWB', modify: true};
MERGE (n:KG {id: 'inputs:poleposa/DSWB/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 224, modifiers: ['PORT_DIPLOCATION("SW2:1,2,3")'], name: 'Practice Rank', defaultValue: 96, location: 'SW2:1,2,3', settings: ['224=A', '96=B', '160=C', '32=D', '192=E', '64=F', '128=G', '0=H']};
MERGE (n:KG {id: 'inputs:poleposa/DSWB/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 28, modifiers: ['PORT_DIPLOCATION("SW2:4,5,6")'], name: 'Extended Rank', defaultValue: 20, location: 'SW2:4,5,6', settings: ['28=A', '12=B', '20=C', '4=D', '24=E', '8=F', '16=G', '0=H']};
MERGE (n:KG {id: 'inputs:poleposa/DSWB/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 2, modifiers: ['PORT_DIPLOCATION("SW2:7")'], name: 'Speed Unit', defaultValue: 0, location: 'SW2:7', settings: ['0=mph', '2=km/h']};
MERGE (n:KG {id: 'inputs:poleposa/DSWB/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 1, modifiers: ['PORT_DIPLOCATION("SW2:8")'], name: 'Demo Sounds', defaultValue: 0, location: 'SW2:8', settings: ['1=Off', '0=On']};
MERGE (n:KG {id: 'gfxlayout:charlayout_2bpp'}) SET n:GfxLayout SET n += {name: 'charlayout_2bpp', width: 8, height: 8, total: 'RGN_FRAC(1,1)', planes: 2, planeOffsets: [0, 4], xOffsets: [0, 1, 2, 3, 64, 65, 66, 67], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56], charIncrement: 128};
MERGE (n:KG {id: 'gfxlayout:bigspritelayout'}) SET n:GfxLayout SET n += {name: 'bigspritelayout', width: 32, height: 32, total: 'RGN_FRAC(1,2)', planes: 4, planeOffsets: [0, 4, 'RGN_FRAC(1,2)+0', 'RGN_FRAC(1,2)+4'], xOffsets: [0, 1, 2, 3, 8, 9, 10, 11, 16, 17, 18, 19, 24, 25, 26, 27, 32, 33, 34, 35, 40, 41, 42, 43, 48, 49, 50, 51, 56, 57, 58, 59], yOffsets: [0, 64, 128, 192, 256, 320, 384, 448, 512, 576, 640, 704, 768, 832, 896, 960, 1024, 1088, 1152, 1216, 1280, 1344, 1408, 1472, 1536, 1600, 1664, 1728, 1792, 1856, 1920, 1984], charIncrement: 2048};
MERGE (n:KG {id: 'gfxlayout:smallspritelayout'}) SET n:GfxLayout SET n += {name: 'smallspritelayout', width: 16, height: 16, total: 'RGN_FRAC(1,2)', planes: 4, planeOffsets: [0, 4, 'RGN_FRAC(1,2)', 'RGN_FRAC(1,2)+4'], xOffsets: [0, 1, 2, 3, 8, 9, 10, 11, 16, 17, 18, 19, 24, 25, 26, 27], yOffsets: [0, 32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, 480], charIncrement: 512};
MERGE (n:KG {id: 'gfxdecode:gfx_polepos'}) SET n:GfxDecode SET n += {name: 'gfx_polepos', sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 862, sourceColumn: 8, sourceEndLine: 862};
MERGE (n:KG {id: 'gfxdecode:gfx_polepos/e0'}) SET n:GfxDecodeEntry SET n += {region: 'chars', offset: 0, layout: 'charlayout_2bpp', colorBase: 0, colorCount: 128, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_polepos/e1'}) SET n:GfxDecodeEntry SET n += {region: 'tiles', offset: 0, layout: 'charlayout_2bpp', colorBase: 512, colorCount: 64, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_polepos/e2'}) SET n:GfxDecodeEntry SET n += {region: 'sprites', offset: 0, layout: 'smallspritelayout', colorBase: 768, colorCount: 128, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_polepos/e3'}) SET n:GfxDecodeEntry SET n += {region: 'bigsprites', offset: 0, layout: 'bigspritelayout', colorBase: 768, colorCount: 128, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'device:polepos_state.polepos/palette/callback:palette_init'}) SET n:Callback SET n += {signal: 'palette_init', operation: 'palette_init', raw: 'PALETTE(config, m_palette, FUNC(polepos_state::polepos_palette), 0x0f00, 128)', ownerTag: 'palette', targetClass: 'polepos_state', targetMethod: 'polepos_palette', entries: 128, sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 956};
MERGE (n:KG {id: 'handler:polepos_state.polepos_palette'}) SET n:Handler SET n += {method: 'polepos_palette', ownerClass: 'polepos_state', sourceFile: 'src/mame/namco/polepos_v.cpp', sourceLine: 30, sourceColumn: 1, sourceEndLine: 135, sourceParameters: 'palette_device &palette', sourceBody: 'uint8_t const *const color_prom = memregion("proms")->base();

	/*******************************************************
	 * Color PROMs
	 * Sheet 15B: middle, 136014-137,138,139
	 * Inputs: MUX0 ... MUX3, ALPHA/BACK, SPRITE/BACK, 128V, COMPBLANK
	 *
	 * Note that we only decode the lower 128 colors because
	 * the upper 128 are all black and used during the
	 * horizontal and vertical blanking periods.
	 * The purpose of the 128V input is to use a different palette for the
	 * background and for the road; it is irrelevant for alpha and
	 * sprites because their palette is the same in both halves.
	 * Anyway, we emulate that to a certain extent, using different
	 * colortables for the two halves of the screen. We don\'t support the
	 * palette change in the middle of a sprite, however.
	 * Also, note that priority encoding is done is such a way that alpha
	 * will use palette bank 2 or 3 depending on whether there is a sprite
	 * below the pixel or not. That would be tricky to emulate, and it\'s
	 * not needed because of course the two banks are the same.
	 *******************************************************/
	for (int i = 0; i < 128; i++)
	{
		int bit0, bit1, bit2, bit3;

		// Sheet 15B: 136014-0137 red component
		bit0 = BIT(color_prom[0x000 + i], 0);
		bit1 = BIT(color_prom[0x000 + i], 1);
		bit2 = BIT(color_prom[0x000 + i], 2);
		bit3 = BIT(color_prom[0x000 + i], 3);
		int const r = 0x0e * bit0 + 0x1f * bit1 + 0x43 * bit2 + 0x8f * bit3;

		// Sheet 15B: 136014-0138 green component
		bit0 = BIT(color_prom[0x100 + i], 0);
		bit1 = BIT(color_prom[0x100 + i], 1);
		bit2 = BIT(color_prom[0x100 + i], 2);
		bit3 = BIT(color_prom[0x100 + i], 3);
		int const g = 0x0e * bit0 + 0x1f * bit1 + 0x43 * bit2 + 0x8f * bit3;

		// Sheet 15B: 136014-0139 blue component
		bit0 = BIT(color_prom[0x200 + i], 0);
		bit1 = BIT(color_prom[0x200 + i], 1);
		bit2 = BIT(color_prom[0x200 + i], 2);
		bit3 = BIT(color_prom[0x200 + i], 3);
		int const b = 0x0e * bit0 + 0x1f * bit1 + 0x43 * bit2 + 0x8f * bit3;

		palette.set_indirect_color(i, rgb_t(r, g, b));
	}

	/*******************************************************
	 * Alpha colors (colors 0x000-0x1ff)
	 * Sheet 15B: top left, 136014-140
	 * Inputs: SHFT0, SHFT1 and CHA8* ... CHA13*
	 *******************************************************/
	for (int i = 0; i < 64*4; i++)
	{
		int const color = color_prom[0x300 + i];
		palette.set_pen_indirect(0x0000 + i, (color != 15) ? (0x020 + color) : 0x2f);
		palette.set_pen_indirect(0x0100 + i, (color != 15) ? (0x060 + color) : 0x2f);
	}

	/*******************************************************
	 * Background colors (colors 0x200-0x2ff)
	 * Sheet 13A: left, 136014-141
	 * Inputs: SHFT2, SHFT3 and CHA8 ... CHA13
	 * The background is only in the top half of the screen
	 *******************************************************/
	for (int i = 0; i < 64*4; i++)
	{
		int const color = color_prom[0x400 + i];
		palette.set_pen_indirect(0x0200 + i, 0x000 + color);
	}

	/*******************************************************
	 * Sprite colors (colors 0x300-0xaff)
	 * Sheet 14B: right, 136014-146
	 * Inputs: CUSTOM0 ... CUSTOM3 and DATA0 ... DATA5
	 *******************************************************/
	for (int i = 0; i < 64*16; i++)
	{
		int const color = color_prom[0xc00 + i];
		palette.set_pen_indirect(0x0300 + i, (color != 15) ? (0x010 + color) : 0x1f);
		palette.set_pen_indirect(0x0700 + i, (color != 15) ? (0x050 + color) : 0x1f);
	}

	/*******************************************************
	 * Road colors (colors 0xb00-0x0eff)
	 * Sheet 13A: bottom left, 136014-145
	 * Inputs: R1 ... R6 and CHA0 ... CHA3
	 * The road is only in the bottom half of the screen
	 *******************************************************/
	for (int i = 0; i < 64*16; i++)
	{
		int const color = color_prom[0x800 + i];
		palette.set_pen_indirect(0x0b00 + i, 0x040 + color);
	}

	/* 136014-142, 136014-143, 136014-144 Vertical position modifiers */
	for (int i = 0; i < 256; i++)
	{
		int const j = color_prom[0x500 + i] + (color_prom[0x600 + i] << 4) + (color_prom[0x700 + i] << 8);
		m_vertical_position_modifier[i] = j;
	}'};
MATCH (a:KG {id: 'game:polepos'}), (b:KG {id: 'file:src/mame/namco/polepos.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 2566, sourceColumn: 1, sourceEndLine: 2566};
MATCH (a:KG {id: 'game:polepos'}), (b:KG {id: 'machine:polepos_state.polepos'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:polepos'}), (b:KG {id: 'inputs:poleposa'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:polepos'}), (b:KG {id: 'romset:polepos'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'file:src/mame/namco/polepos.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/namco/polepos.cpp'}), (b:KG {id: 'file:polepos.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/namco/polepos.cpp'}), (b:KG {id: 'file:namco52.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/namco/polepos.cpp'}), (b:KG {id: 'file:namco54.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/namco/polepos.cpp'}), (b:KG {id: 'file:polepos_a.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/namco/polepos.cpp'}), (b:KG {id: 'file:cpu/z80/z80.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/namco/polepos.cpp'}), (b:KG {id: 'file:cpu/z8000/z8000.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/namco/polepos.cpp'}), (b:KG {id: 'file:cpu/mb88xx/mb88xx.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/namco/polepos.cpp'}), (b:KG {id: 'file:namco06.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/namco/polepos.cpp'}), (b:KG {id: 'file:namco51.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/namco/polepos.cpp'}), (b:KG {id: 'file:namco53.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/namco/polepos.cpp'}), (b:KG {id: 'file:machine/nvram.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/namco/polepos.cpp'}), (b:KG {id: 'file:machine/watchdog.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/namco/polepos.cpp'}), (b:KG {id: 'file:sound/dac.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/namco/polepos.cpp'}), (b:KG {id: 'file:sound/tms5220.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/namco/polepos.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/namco/polepos.cpp'}), (b:KG {id: 'file:polepos.lh'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/namco/polepos.cpp'}), (b:KG {id: 'file:topracer.lh'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/namco/polepos.cpp'}), (b:KG {id: 'file:logmacro.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:polepos_state.polepos'}), (b:KG {id: 'file:src/mame/namco/polepos.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 874, sourceColumn: 1, sourceEndLine: 983};
MATCH (a:KG {id: 'machine:polepos_state.polepos'}), (b:KG {id: 'handler:polepos_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:polepos_state.polepos'}), (b:KG {id: 'handler:polepos_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:polepos_state.polepos'}), (b:KG {id: 'device:polepos_state.polepos/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:polepos_state.polepos'}), (b:KG {id: 'device:polepos_state.polepos/sub1'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:polepos_state.polepos'}), (b:KG {id: 'device:polepos_state.polepos/sub2'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:polepos_state.polepos'}), (b:KG {id: 'device:polepos_state.polepos/51xx'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:polepos_state.polepos'}), (b:KG {id: 'device:polepos_state.polepos/52xx'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:polepos_state.polepos'}), (b:KG {id: 'device:polepos_state.polepos/53xx'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:polepos_state.polepos'}), (b:KG {id: 'device:polepos_state.polepos/54xx'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:polepos_state.polepos'}), (b:KG {id: 'device:polepos_state.polepos/06xx'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:polepos_state.polepos'}), (b:KG {id: 'device:polepos_state.polepos/watchdog'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:polepos_state.polepos'}), (b:KG {id: 'device:polepos_state.polepos/nvram'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:polepos_state.polepos'}), (b:KG {id: 'device:polepos_state.polepos/scantimer'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:polepos_state.polepos'}), (b:KG {id: 'device:polepos_state.polepos/latch'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:polepos_state.polepos'}), (b:KG {id: 'device:polepos_state.polepos/adc'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:polepos_state.polepos'}), (b:KG {id: 'device:polepos_state.polepos/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:polepos_state.polepos'}), (b:KG {id: 'device:polepos_state.polepos/gfxdecode'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:polepos_state.polepos'}), (b:KG {id: 'gfxdecode:gfx_polepos'}) MERGE (a)-[r:DECODES]->(b) SET r += {deviceTag: 'gfxdecode'};
MATCH (a:KG {id: 'machine:polepos_state.polepos'}), (b:KG {id: 'device:polepos_state.polepos/palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:polepos_state.polepos'}), (b:KG {id: 'device:polepos_state.polepos/speaker'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:polepos_state.polepos'}), (b:KG {id: 'device:polepos_state.polepos/rspeaker'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:polepos_state.polepos'}), (b:KG {id: 'device:polepos_state.polepos/namco'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:polepos_state.polepos'}), (b:KG {id: 'device:polepos_state.polepos/discrete'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:polepos_state.polepos'}), (b:KG {id: 'device:polepos_state.polepos/engine'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:poleposa'}), (b:KG {id: 'file:src/mame/namco/polepos.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 572, sourceColumn: 8, sourceEndLine: 572};
MATCH (a:KG {id: 'inputs:poleposa'}), (b:KG {id: 'inputs:polepos'}) MERGE (a)-[r:INCLUDES_PORTS]->(b);
MATCH (a:KG {id: 'inputs:poleposa'}), (b:KG {id: 'inputs:poleposa/DSWA'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:poleposa'}), (b:KG {id: 'inputs:poleposa/DSWB'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:polepos'}), (b:KG {id: 'file:src/mame/namco/polepos.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 1129, sourceColumn: 1, sourceEndLine: 1129};
MATCH (a:KG {id: 'romset:polepos'}), (b:KG {id: 'region:polepos/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:polepos'}), (b:KG {id: 'region:polepos/sub1'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:polepos'}), (b:KG {id: 'region:polepos/sub2'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:polepos'}), (b:KG {id: 'region:polepos/chars'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:polepos'}), (b:KG {id: 'region:polepos/tiles'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:polepos'}), (b:KG {id: 'region:polepos/sprites'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:polepos'}), (b:KG {id: 'region:polepos/bigsprites'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:polepos'}), (b:KG {id: 'region:polepos/road'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:polepos'}), (b:KG {id: 'region:polepos/scalelut'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:polepos'}), (b:KG {id: 'region:polepos/proms'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:polepos'}), (b:KG {id: 'region:polepos/namco'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:polepos'}), (b:KG {id: 'region:polepos/engine'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:polepos'}), (b:KG {id: 'region:polepos/52xx'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:polepos'}), (b:KG {id: 'region:polepos/user1'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'handler:polepos_state.video_start'}), (b:KG {id: 'handler:polepos_state.bg_get_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:polepos_state.video_start'}), (b:KG {id: 'handler:polepos_state.tx_get_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/maincpu'}), (b:KG {id: 'map:polepos_state.z80_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:polepos_state.polepos/maincpu'}), (b:KG {id: 'map:polepos_state.z80_io'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_IO'};
MATCH (a:KG {id: 'device:polepos_state.polepos/sub1'}), (b:KG {id: 'map:polepos_state.z8002_map_1'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:polepos_state.polepos/sub2'}), (b:KG {id: 'map:polepos_state.z8002_map_2'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:polepos_state.polepos/51xx'}), (b:KG {id: 'device:polepos_state.polepos/51xx/callback:51xx:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/51xx'}), (b:KG {id: 'device:polepos_state.polepos/51xx/callback:51xx:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/51xx'}), (b:KG {id: 'device:polepos_state.polepos/51xx/callback:51xx:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/51xx'}), (b:KG {id: 'device:polepos_state.polepos/51xx/callback:51xx:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/51xx'}), (b:KG {id: 'device:polepos_state.polepos/51xx/callback:51xx:4'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/51xx'}), (b:KG {id: 'device:polepos_state.polepos/51xx/callback:51xx:5'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/51xx'}), (b:KG {id: 'machine:namco_51xx_device.device_add_mconfig'}) MERGE (a)-[r:CALLS]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/52xx'}), (b:KG {id: 'device:polepos_state.polepos/52xx/callback:52xx:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/52xx'}), (b:KG {id: 'device:polepos_state.polepos/52xx/callback:52xx:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/52xx'}), (b:KG {id: 'machine:namco_52xx_device.device_add_mconfig'}) MERGE (a)-[r:CALLS]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/53xx'}), (b:KG {id: 'device:polepos_state.polepos/53xx/callback:53xx:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/53xx'}), (b:KG {id: 'device:polepos_state.polepos/53xx/callback:53xx:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/53xx'}), (b:KG {id: 'device:polepos_state.polepos/53xx/callback:53xx:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/53xx'}), (b:KG {id: 'device:polepos_state.polepos/53xx/callback:53xx:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/53xx'}), (b:KG {id: 'device:polepos_state.polepos/53xx/callback:53xx:4'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/53xx'}), (b:KG {id: 'machine:namco_53xx_device.device_add_mconfig'}) MERGE (a)-[r:CALLS]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/54xx'}), (b:KG {id: 'machine:namco_54xx_device.device_add_mconfig'}) MERGE (a)-[r:CALLS]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/06xx'}), (b:KG {id: 'device:polepos_state.polepos/06xx/callback:06xx:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/06xx'}), (b:KG {id: 'device:polepos_state.polepos/06xx/callback:06xx:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/06xx'}), (b:KG {id: 'device:polepos_state.polepos/06xx/callback:06xx:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/06xx'}), (b:KG {id: 'device:polepos_state.polepos/06xx/callback:06xx:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/06xx'}), (b:KG {id: 'device:polepos_state.polepos/06xx/callback:06xx:4'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/06xx'}), (b:KG {id: 'device:polepos_state.polepos/06xx/callback:06xx:5'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/06xx'}), (b:KG {id: 'device:polepos_state.polepos/06xx/callback:06xx:6'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/06xx'}), (b:KG {id: 'device:polepos_state.polepos/06xx/callback:06xx:7'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/06xx'}), (b:KG {id: 'device:polepos_state.polepos/06xx/callback:06xx:8'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/06xx'}), (b:KG {id: 'device:polepos_state.polepos/06xx/callback:06xx:9'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/06xx'}), (b:KG {id: 'device:polepos_state.polepos/06xx/callback:06xx:10'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/scantimer'}), (b:KG {id: 'device:polepos_state.polepos/scantimer/callback:scantimer:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/latch'}), (b:KG {id: 'device:polepos_state.polepos/latch/callback:latch:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/latch'}), (b:KG {id: 'device:polepos_state.polepos/latch/callback:latch:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/latch'}), (b:KG {id: 'device:polepos_state.polepos/latch/callback:latch:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/latch'}), (b:KG {id: 'device:polepos_state.polepos/latch/callback:latch:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/latch'}), (b:KG {id: 'device:polepos_state.polepos/latch/callback:latch:4'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/latch'}), (b:KG {id: 'device:polepos_state.polepos/latch/callback:latch:5'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/latch'}), (b:KG {id: 'device:polepos_state.polepos/latch/callback:latch:6'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/latch'}), (b:KG {id: 'device:polepos_state.polepos/latch/callback:latch:7'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/latch'}), (b:KG {id: 'device:polepos_state.polepos/latch/callback:latch:8'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/latch'}), (b:KG {id: 'device:polepos_state.polepos/latch/callback:latch:9'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/latch'}), (b:KG {id: 'device:polepos_state.polepos/latch/callback:latch:10'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/latch'}), (b:KG {id: 'device:polepos_state.polepos/latch/callback:latch:11'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/adc'}), (b:KG {id: 'device:polepos_state.polepos/adc/callback:adc:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/screen'}), (b:KG {id: 'device:polepos_state.polepos/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/screen'}), (b:KG {id: 'device:polepos_state.polepos/screen/callback:screen:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_polepos'}), (b:KG {id: 'file:src/mame/namco/polepos.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 862, sourceColumn: 8, sourceEndLine: 862};
MATCH (a:KG {id: 'gfxdecode:gfx_polepos'}), (b:KG {id: 'gfxdecode:gfx_polepos/e0'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_polepos'}), (b:KG {id: 'gfxdecode:gfx_polepos/e1'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_polepos'}), (b:KG {id: 'gfxdecode:gfx_polepos/e2'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_polepos'}), (b:KG {id: 'gfxdecode:gfx_polepos/e3'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/palette'}), (b:KG {id: 'device:polepos_state.polepos/palette/callback:palette_init'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/namco'}), (b:KG {id: 'audioroute:device:polepos_state.polepos/namco/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/namco'}), (b:KG {id: 'audioroute:device:polepos_state.polepos/namco/1'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/namco'}), (b:KG {id: 'audioroute:device:polepos_state.polepos/namco/2'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/namco'}), (b:KG {id: 'audioroute:device:polepos_state.polepos/namco/3'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/discrete'}), (b:KG {id: 'audioroute:device:polepos_state.polepos/discrete/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/discrete'}), (b:KG {id: 'audioroute:device:polepos_state.polepos/discrete/1'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/discrete'}), (b:KG {id: 'audioroute:device:polepos_state.polepos/discrete/2'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/discrete'}), (b:KG {id: 'audioroute:device:polepos_state.polepos/discrete/3'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/engine'}), (b:KG {id: 'audioroute:device:polepos_state.polepos/engine/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/engine'}), (b:KG {id: 'audioroute:device:polepos_state.polepos/engine/1'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/engine'}), (b:KG {id: 'audioroute:device:polepos_state.polepos/engine/2'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/engine'}), (b:KG {id: 'audioroute:device:polepos_state.polepos/engine/3'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'inputs:polepos'}), (b:KG {id: 'file:src/mame/namco/polepos.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 500, sourceColumn: 8, sourceEndLine: 500};
MATCH (a:KG {id: 'inputs:polepos'}), (b:KG {id: 'inputs:polepos/IN0'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:polepos'}), (b:KG {id: 'inputs:polepos/DSWA'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:polepos'}), (b:KG {id: 'inputs:polepos/DSWB'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:polepos'}), (b:KG {id: 'inputs:polepos/BRAKE'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:polepos'}), (b:KG {id: 'inputs:polepos/ACCEL'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:polepos'}), (b:KG {id: 'inputs:polepos/STEER'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:poleposa/DSWA'}), (b:KG {id: 'inputs:poleposa/DSWA/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:poleposa/DSWA'}), (b:KG {id: 'inputs:poleposa/DSWA/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:poleposa/DSWA'}), (b:KG {id: 'inputs:poleposa/DSWA/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:poleposa/DSWA'}), (b:KG {id: 'inputs:poleposa/DSWA/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:poleposa/DSWB'}), (b:KG {id: 'inputs:poleposa/DSWB/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:poleposa/DSWB'}), (b:KG {id: 'inputs:poleposa/DSWB/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:poleposa/DSWB'}), (b:KG {id: 'inputs:poleposa/DSWB/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:poleposa/DSWB'}), (b:KG {id: 'inputs:poleposa/DSWB/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:polepos/maincpu'}), (b:KG {id: 'rom:polepos/maincpu/pp3_9.6h'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:polepos/maincpu'}), (b:KG {id: 'rom:polepos/maincpu/pp1_10b.5h'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:polepos/sub1'}), (b:KG {id: 'rom:polepos/sub1/pp3_1.8m'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:polepos/sub1'}), (b:KG {id: 'rom:polepos/sub1/pp3_2.8l'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:polepos/sub2'}), (b:KG {id: 'rom:polepos/sub2/pp3_5.4m'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:polepos/sub2'}), (b:KG {id: 'rom:polepos/sub2/pp3_6.4l'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:polepos/chars'}), (b:KG {id: 'rom:polepos/chars/pp3_28.1f'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:polepos/tiles'}), (b:KG {id: 'rom:polepos/tiles/pp1_29.1e'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:polepos/sprites'}), (b:KG {id: 'rom:polepos/sprites/pp3_25.1n'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:polepos/sprites'}), (b:KG {id: 'rom:polepos/sprites/pp3_26.1m'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:polepos/bigsprites'}), (b:KG {id: 'rom:polepos/bigsprites/pp1_17.5n'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:polepos/bigsprites'}), (b:KG {id: 'rom:polepos/bigsprites/pp1_19.4n'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:polepos/bigsprites'}), (b:KG {id: 'rom:polepos/bigsprites/pp1_21.3n'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:polepos/bigsprites'}), (b:KG {id: 'rom:polepos/bigsprites/pp1_18.5m'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:polepos/bigsprites'}), (b:KG {id: 'rom:polepos/bigsprites/pp1_20.4m'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:polepos/bigsprites'}), (b:KG {id: 'rom:polepos/bigsprites/pp1_22.3m'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:polepos/road'}), (b:KG {id: 'rom:polepos/road/pp1_30.3a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:polepos/road'}), (b:KG {id: 'rom:polepos/road/pp1_31.2a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:polepos/road'}), (b:KG {id: 'rom:polepos/road/pp1_32.1a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:polepos/scalelut'}), (b:KG {id: 'rom:polepos/scalelut/pp1_27.1l'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:polepos/proms'}), (b:KG {id: 'rom:polepos/proms/pp1-7.8l'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:polepos/proms'}), (b:KG {id: 'rom:polepos/proms/pp1-8.9l'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:polepos/proms'}), (b:KG {id: 'rom:polepos/proms/pp1-9.10l'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:polepos/proms'}), (b:KG {id: 'rom:polepos/proms/pp2-10.2h'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:polepos/proms'}), (b:KG {id: 'rom:polepos/proms/pp1-11.4d'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:polepos/proms'}), (b:KG {id: 'rom:polepos/proms/pp1-15.9a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:polepos/proms'}), (b:KG {id: 'rom:polepos/proms/pp1-16.10a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:polepos/proms'}), (b:KG {id: 'rom:polepos/proms/pp1-17.11a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:polepos/proms'}), (b:KG {id: 'rom:polepos/proms/pp1-12.3c'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:polepos/proms'}), (b:KG {id: 'rom:polepos/proms/pp3-6.6m'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:polepos/proms'}), (b:KG {id: 'rom:polepos/proms/pp1-13.8e'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:polepos/proms'}), (b:KG {id: 'rom:polepos/proms/pp1-14.9e'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:polepos/namco'}), (b:KG {id: 'rom:polepos/namco/pp1-5.3b'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:polepos/engine'}), (b:KG {id: 'rom:polepos/engine/pp1_15.6a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:polepos/engine'}), (b:KG {id: 'rom:polepos/engine/pp1_16.5a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:polepos/52xx'}), (b:KG {id: 'rom:polepos/52xx/pp2_11.2e'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:polepos/52xx'}), (b:KG {id: 'rom:polepos/52xx/pp2_12.2f'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:polepos/52xx'}), (b:KG {id: 'rom:polepos/52xx/pp2_13.1e'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:polepos/user1'}), (b:KG {id: 'rom:polepos/user1/pp1-4.9h'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'map:polepos_state.z80_map'}), (b:KG {id: 'file:src/mame/namco/polepos.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 435, sourceColumn: 1, sourceEndLine: 454};
MATCH (a:KG {id: 'map:polepos_state.z80_map'}), (b:KG {id: 'map:polepos_state.z80_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:polepos_state.z80_map'}), (b:KG {id: 'map:polepos_state.z80_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:polepos_state.z80_map'}), (b:KG {id: 'map:polepos_state.z80_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:polepos_state.z80_map'}), (b:KG {id: 'map:polepos_state.z80_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:polepos_state.z80_map'}), (b:KG {id: 'map:polepos_state.z80_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:polepos_state.z80_map'}), (b:KG {id: 'map:polepos_state.z80_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:polepos_state.z80_map'}), (b:KG {id: 'map:polepos_state.z80_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:polepos_state.z80_map'}), (b:KG {id: 'map:polepos_state.z80_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:polepos_state.z80_map'}), (b:KG {id: 'map:polepos_state.z80_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:polepos_state.z80_map'}), (b:KG {id: 'map:polepos_state.z80_map/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:polepos_state.z80_map'}), (b:KG {id: 'map:polepos_state.z80_map/range10'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:polepos_state.z80_map'}), (b:KG {id: 'map:polepos_state.z80_map/range11'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:polepos_state.z80_map'}), (b:KG {id: 'map:polepos_state.z80_map/range12'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:polepos_state.z80_map'}), (b:KG {id: 'map:polepos_state.z80_map/range13'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:polepos_state.z80_map'}), (b:KG {id: 'map:polepos_state.z80_map/range14'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:polepos_state.z80_io'}), (b:KG {id: 'file:src/mame/namco/polepos.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 456, sourceColumn: 1, sourceEndLine: 460};
MATCH (a:KG {id: 'map:polepos_state.z80_io'}), (b:KG {id: 'map:polepos_state.z80_io/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:polepos_state.z8002_map_1'}), (b:KG {id: 'file:src/mame/namco/polepos.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 474, sourceColumn: 1, sourceEndLine: 479};
MATCH (a:KG {id: 'map:polepos_state.z8002_map_1'}), (b:KG {id: 'map:polepos_state.z8002_map'}) MERGE (a)-[r:INCLUDES_MAP]->(b);
MATCH (a:KG {id: 'map:polepos_state.z8002_map_1'}), (b:KG {id: 'map:polepos_state.z8002_map_1/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:polepos_state.z8002_map_1'}), (b:KG {id: 'map:polepos_state.z8002_map_1/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:polepos_state.z8002_map_2'}), (b:KG {id: 'file:src/mame/namco/polepos.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 481, sourceColumn: 1, sourceEndLine: 486};
MATCH (a:KG {id: 'map:polepos_state.z8002_map_2'}), (b:KG {id: 'map:polepos_state.z8002_map'}) MERGE (a)-[r:INCLUDES_MAP]->(b);
MATCH (a:KG {id: 'map:polepos_state.z8002_map_2'}), (b:KG {id: 'map:polepos_state.z8002_map_2/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:polepos_state.z8002_map_2'}), (b:KG {id: 'map:polepos_state.z8002_map_2/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/51xx/callback:51xx:4'}), (b:KG {id: 'handler:polepos_state.out'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/51xx/callback:51xx:5'}), (b:KG {id: 'handler:polepos_state.lockout'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:namco_51xx_device.device_add_mconfig'}), (b:KG {id: 'file:src/mame/namco/namco51.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 168, sourceColumn: 1, sourceEndLine: 178};
MATCH (a:KG {id: 'machine:namco_51xx_device.device_add_mconfig'}), (b:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/52xx/callback:52xx:0'}), (b:KG {id: 'handler:polepos_state.namco_52xx_rom_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/52xx/callback:52xx:1'}), (b:KG {id: 'handler:polepos_state.namco_52xx_si_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:namco_52xx_device.device_add_mconfig'}), (b:KG {id: 'file:src/mame/namco/namco52.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/namco/namco52.cpp', sourceLine: 168, sourceColumn: 1, sourceEndLine: 179};
MATCH (a:KG {id: 'machine:namco_52xx_device.device_add_mconfig'}), (b:KG {id: 'device:namco_52xx_device.device_add_mconfig/mcu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/53xx/callback:53xx:0'}), (b:KG {id: 'handler:polepos_state.namco_53xx_k_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/53xx/callback:53xx:1'}), (b:KG {id: 'handler:polepos_state.steering_changed_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/53xx/callback:53xx:2'}), (b:KG {id: 'handler:polepos_state.steering_delta_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:namco_53xx_device.device_add_mconfig'}), (b:KG {id: 'file:src/mame/namco/namco53.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/namco/namco53.cpp', sourceLine: 134, sourceColumn: 1, sourceEndLine: 144};
MATCH (a:KG {id: 'machine:namco_53xx_device.device_add_mconfig'}), (b:KG {id: 'device:namco_53xx_device.device_add_mconfig/mcu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:namco_54xx_device.device_add_mconfig'}), (b:KG {id: 'file:src/mame/namco/namco54.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/namco/namco54.cpp', sourceLine: 136, sourceColumn: 1, sourceEndLine: 143};
MATCH (a:KG {id: 'machine:namco_54xx_device.device_add_mconfig'}), (b:KG {id: 'device:namco_54xx_device.device_add_mconfig/mcu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/06xx/callback:06xx:0'}), (b:KG {id: 'device:polepos_state.polepos/maincpu'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/06xx/callback:06xx:1'}), (b:KG {id: 'handler:namco_51xx_device.chip_select'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/06xx/callback:06xx:1'}), (b:KG {id: 'device:polepos_state.polepos/51xx'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/06xx/callback:06xx:2'}), (b:KG {id: 'handler:namco_51xx_device.rw'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/06xx/callback:06xx:2'}), (b:KG {id: 'device:polepos_state.polepos/51xx'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/06xx/callback:06xx:3'}), (b:KG {id: 'handler:namco_51xx_device.read'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/06xx/callback:06xx:3'}), (b:KG {id: 'device:polepos_state.polepos/51xx'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/06xx/callback:06xx:4'}), (b:KG {id: 'handler:namco_51xx_device.write'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/06xx/callback:06xx:4'}), (b:KG {id: 'device:polepos_state.polepos/51xx'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/06xx/callback:06xx:5'}), (b:KG {id: 'handler:namco_53xx_device.read'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/06xx/callback:06xx:5'}), (b:KG {id: 'device:polepos_state.polepos/53xx'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/06xx/callback:06xx:6'}), (b:KG {id: 'handler:namco_53xx_device.chip_select'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/06xx/callback:06xx:6'}), (b:KG {id: 'device:polepos_state.polepos/53xx'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/06xx/callback:06xx:7'}), (b:KG {id: 'handler:namco_52xx_device.write'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/06xx/callback:06xx:7'}), (b:KG {id: 'device:polepos_state.polepos/52xx'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/06xx/callback:06xx:8'}), (b:KG {id: 'handler:namco_52xx_device.chip_select'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/06xx/callback:06xx:8'}), (b:KG {id: 'device:polepos_state.polepos/52xx'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/06xx/callback:06xx:9'}), (b:KG {id: 'handler:namco_54xx_device.write'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/06xx/callback:06xx:9'}), (b:KG {id: 'device:polepos_state.polepos/54xx'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/06xx/callback:06xx:10'}), (b:KG {id: 'handler:namco_54xx_device.chip_select'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/06xx/callback:06xx:10'}), (b:KG {id: 'device:polepos_state.polepos/54xx'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/scantimer/callback:scantimer:0'}), (b:KG {id: 'handler:polepos_state.scanline'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/latch/callback:latch:0'}), (b:KG {id: 'device:polepos_state.polepos/maincpu'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/latch/callback:latch:1'}), (b:KG {id: 'handler:namco_51xx_device.reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/latch/callback:latch:1'}), (b:KG {id: 'device:polepos_state.polepos/51xx'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/latch/callback:latch:2'}), (b:KG {id: 'handler:namco_52xx_device.reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/latch/callback:latch:2'}), (b:KG {id: 'device:polepos_state.polepos/52xx'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/latch/callback:latch:3'}), (b:KG {id: 'handler:namco_53xx_device.reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/latch/callback:latch:3'}), (b:KG {id: 'device:polepos_state.polepos/53xx'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/latch/callback:latch:4'}), (b:KG {id: 'handler:namco_54xx_device.reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/latch/callback:latch:4'}), (b:KG {id: 'device:polepos_state.polepos/54xx'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/latch/callback:latch:5'}), (b:KG {id: 'handler:polepos_wsg_device.sound_enable_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/latch/callback:latch:6'}), (b:KG {id: 'handler:polepos_sound_device.clson_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/latch/callback:latch:7'}), (b:KG {id: 'handler:polepos_state.gasel_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/latch/callback:latch:8'}), (b:KG {id: 'device:polepos_state.polepos/sub1'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/latch/callback:latch:9'}), (b:KG {id: 'device:polepos_state.polepos/sub2'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/latch/callback:latch:10'}), (b:KG {id: 'handler:polepos_state.sb0_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/latch/callback:latch:11'}), (b:KG {id: 'handler:polepos_state.chacl_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/adc/callback:adc:0'}), (b:KG {id: 'handler:polepos_state.analog_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/screen/callback:screen:0'}), (b:KG {id: 'handler:polepos_state.screen_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/screen/callback:screen:1'}), (b:KG {id: 'handler:namco_51xx_device.vblank'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/screen/callback:screen:1'}), (b:KG {id: 'device:polepos_state.polepos/51xx'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_polepos/e0'}), (b:KG {id: 'gfxlayout:charlayout_2bpp'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_polepos/e1'}), (b:KG {id: 'gfxlayout:charlayout_2bpp'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_polepos/e2'}), (b:KG {id: 'gfxlayout:smallspritelayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_polepos/e3'}), (b:KG {id: 'gfxlayout:bigspritelayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'device:polepos_state.polepos/palette/callback:palette_init'}), (b:KG {id: 'handler:polepos_state.polepos_palette'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'inputs:polepos/IN0'}), (b:KG {id: 'inputs:polepos/IN0/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:polepos/IN0'}), (b:KG {id: 'inputs:polepos/IN0/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:polepos/IN0'}), (b:KG {id: 'inputs:polepos/IN0/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:polepos/IN0'}), (b:KG {id: 'inputs:polepos/IN0/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:polepos/IN0'}), (b:KG {id: 'inputs:polepos/IN0/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:polepos/IN0'}), (b:KG {id: 'inputs:polepos/IN0/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:polepos/IN0'}), (b:KG {id: 'inputs:polepos/IN0/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:polepos/IN0'}), (b:KG {id: 'inputs:polepos/IN0/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:polepos/DSWA'}), (b:KG {id: 'inputs:polepos/DSWA/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:polepos/DSWA'}), (b:KG {id: 'inputs:polepos/DSWA/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:polepos/DSWA'}), (b:KG {id: 'inputs:polepos/DSWA/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:polepos/DSWA'}), (b:KG {id: 'inputs:polepos/DSWA/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:polepos/DSWB'}), (b:KG {id: 'inputs:polepos/DSWB/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:polepos/DSWB'}), (b:KG {id: 'inputs:polepos/DSWB/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:polepos/DSWB'}), (b:KG {id: 'inputs:polepos/DSWB/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:polepos/DSWB'}), (b:KG {id: 'inputs:polepos/DSWB/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:polepos/BRAKE'}), (b:KG {id: 'inputs:polepos/BRAKE/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:polepos/ACCEL'}), (b:KG {id: 'inputs:polepos/ACCEL/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:polepos/STEER'}), (b:KG {id: 'inputs:polepos/STEER/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'map:polepos_state.z80_map/range2'}), (b:KG {id: 'handler:polepos_state.sprite_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:polepos_state.z80_map/range2'}), (b:KG {id: 'handler:polepos_state.sprite_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:polepos_state.z80_map/range3'}), (b:KG {id: 'handler:polepos_state.road_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:polepos_state.z80_map/range3'}), (b:KG {id: 'handler:polepos_state.road_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:polepos_state.z80_map/range4'}), (b:KG {id: 'handler:polepos_state.alpha_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:polepos_state.z80_map/range4'}), (b:KG {id: 'handler:polepos_state.alpha_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:polepos_state.z80_map/range5'}), (b:KG {id: 'handler:polepos_state.view_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:polepos_state.z80_map/range5'}), (b:KG {id: 'handler:polepos_state.view_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:polepos_state.z80_map/range7'}), (b:KG {id: 'handler:polepos_wsg_device.polepos_sound_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'namco'};
MATCH (a:KG {id: 'map:polepos_state.z80_map/range7'}), (b:KG {id: 'handler:polepos_wsg_device.polepos_sound_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'namco'};
MATCH (a:KG {id: 'map:polepos_state.z80_map/range8'}), (b:KG {id: 'handler:namco_06xx_device.data_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: '06xx'};
MATCH (a:KG {id: 'map:polepos_state.z80_map/range8'}), (b:KG {id: 'handler:namco_06xx_device.data_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: '06xx'};
MATCH (a:KG {id: 'map:polepos_state.z80_map/range9'}), (b:KG {id: 'handler:namco_06xx_device.ctrl_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: '06xx'};
MATCH (a:KG {id: 'map:polepos_state.z80_map/range9'}), (b:KG {id: 'handler:namco_06xx_device.ctrl_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: '06xx'};
MATCH (a:KG {id: 'map:polepos_state.z80_map/range10'}), (b:KG {id: 'handler:polepos_state.ready_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:polepos_state.z80_map/range11'}), (b:KG {id: 'handler:ls259_device.write_d0'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'latch'};
MATCH (a:KG {id: 'map:polepos_state.z80_map/range12'}), (b:KG {id: 'handler:watchdog_timer_device.reset_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'watchdog'};
MATCH (a:KG {id: 'map:polepos_state.z80_map/range13'}), (b:KG {id: 'handler:polepos_sound_device.polepos_engine_sound_lsb_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'engine'};
MATCH (a:KG {id: 'map:polepos_state.z80_map/range14'}), (b:KG {id: 'handler:polepos_sound_device.polepos_engine_sound_msb_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'engine'};
MATCH (a:KG {id: 'map:polepos_state.z80_io/range0'}), (b:KG {id: 'handler:adc0804_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'adc'};
MATCH (a:KG {id: 'map:polepos_state.z80_io/range0'}), (b:KG {id: 'handler:adc0804_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'adc'};
MATCH (a:KG {id: 'map:polepos_state.z8002_map'}), (b:KG {id: 'file:src/mame/namco/polepos.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/namco/polepos.cpp', sourceLine: 464, sourceColumn: 1, sourceEndLine: 472};
MATCH (a:KG {id: 'map:polepos_state.z8002_map'}), (b:KG {id: 'map:polepos_state.z8002_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:polepos_state.z8002_map'}), (b:KG {id: 'map:polepos_state.z8002_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:polepos_state.z8002_map'}), (b:KG {id: 'map:polepos_state.z8002_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:polepos_state.z8002_map'}), (b:KG {id: 'map:polepos_state.z8002_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:polepos_state.z8002_map'}), (b:KG {id: 'map:polepos_state.z8002_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:polepos_state.z8002_map'}), (b:KG {id: 'map:polepos_state.z8002_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:polepos_state.z8002_map_1/range1'}), (b:KG {id: 'handler:polepos_state.z8002_nvi_enable_w_0'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:polepos_state.z8002_map_2/range1'}), (b:KG {id: 'handler:polepos_state.z8002_nvi_enable_w_1'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'file:src/mame/namco/namco51.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/namco/namco51.cpp'}), (b:KG {id: 'file:namco51.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/namco/namco51.cpp'}), (b:KG {id: 'file:screen.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback:mcu:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback:mcu:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback:mcu:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback:mcu:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback:mcu:4'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback:mcu:5'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback:mcu:6'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'file:src/mame/namco/namco52.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/namco/namco52.cpp'}), (b:KG {id: 'file:namco52.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'device:namco_52xx_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:namco_52xx_device.device_add_mconfig/mcu/callback:mcu:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:namco_52xx_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:namco_52xx_device.device_add_mconfig/mcu/callback:mcu:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:namco_52xx_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:namco_52xx_device.device_add_mconfig/mcu/callback:mcu:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:namco_52xx_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:namco_52xx_device.device_add_mconfig/mcu/callback:mcu:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:namco_52xx_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:namco_52xx_device.device_add_mconfig/mcu/callback:mcu:4'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:namco_52xx_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:namco_52xx_device.device_add_mconfig/mcu/callback:mcu:5'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:namco_52xx_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:namco_52xx_device.device_add_mconfig/mcu/callback:mcu:6'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:namco_52xx_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:namco_52xx_device.device_add_mconfig/mcu/callback:mcu:7'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'file:src/mame/namco/namco53.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/namco/namco53.cpp'}), (b:KG {id: 'file:namco53.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'device:namco_53xx_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:namco_53xx_device.device_add_mconfig/mcu/callback:mcu:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:namco_53xx_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:namco_53xx_device.device_add_mconfig/mcu/callback:mcu:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:namco_53xx_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:namco_53xx_device.device_add_mconfig/mcu/callback:mcu:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:namco_53xx_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:namco_53xx_device.device_add_mconfig/mcu/callback:mcu:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:namco_53xx_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:namco_53xx_device.device_add_mconfig/mcu/callback:mcu:4'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:namco_53xx_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:namco_53xx_device.device_add_mconfig/mcu/callback:mcu:5'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:namco_53xx_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:namco_53xx_device.device_add_mconfig/mcu/callback:mcu:6'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'file:src/mame/namco/namco54.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/namco/namco54.cpp'}), (b:KG {id: 'file:namco54.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'device:namco_54xx_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:namco_54xx_device.device_add_mconfig/mcu/callback:mcu:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:namco_54xx_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:namco_54xx_device.device_add_mconfig/mcu/callback:mcu:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:namco_54xx_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:namco_54xx_device.device_add_mconfig/mcu/callback:mcu:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:namco_54xx_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:namco_54xx_device.device_add_mconfig/mcu/callback:mcu:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'handler:namco_51xx_device.rw'}), (b:KG {id: 'handler:namco_51xx_device.rw_sync'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:namco_51xx_device.write'}), (b:KG {id: 'handler:namco_51xx_device.write_sync'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:namco_52xx_device.write'}), (b:KG {id: 'handler:namco_52xx_device.write_sync'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:namco_54xx_device.write'}), (b:KG {id: 'handler:namco_54xx_device.write_sync'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:polepos_sound_device.clson_w'}), (b:KG {id: 'handler:polepos_sound_device.polepos_engine_sound_lsb_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:polepos_sound_device.clson_w'}), (b:KG {id: 'handler:polepos_sound_device.polepos_engine_sound_msb_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:polepos_state.screen_update'}), (b:KG {id: 'handler:polepos_state.draw_road'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:polepos_state.screen_update'}), (b:KG {id: 'handler:polepos_state.draw_sprites'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxlayout:charlayout_2bpp'}), (b:KG {id: 'file:src/mame/namco/polepos.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'gfxlayout:smallspritelayout'}), (b:KG {id: 'file:src/mame/namco/polepos.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'gfxlayout:bigspritelayout'}), (b:KG {id: 'file:src/mame/namco/polepos.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'inputs:polepos/IN0/f2'}), (b:KG {id: 'handler:polepos_state.auto_start_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:namco_06xx_device.data_w'}), (b:KG {id: 'handler:namco_06xx_device.write_sync'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:namco_06xx_device.ctrl_w'}), (b:KG {id: 'handler:namco_06xx_device.ctrl_w_sync'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:polepos_state.z8002_map/range2'}), (b:KG {id: 'handler:polepos_state.alpha16_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:polepos_state.z8002_map/range3'}), (b:KG {id: 'handler:polepos_state.view16_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:polepos_state.z8002_map/range4'}), (b:KG {id: 'handler:polepos_state.view16_hscroll_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:polepos_state.z8002_map/range5'}), (b:KG {id: 'handler:polepos_state.road16_vscroll_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback:mcu:0'}), (b:KG {id: 'handler:namco_51xx_device.K_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback:mcu:1'}), (b:KG {id: 'handler:namco_51xx_device.R_r_0'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback:mcu:2'}), (b:KG {id: 'handler:namco_51xx_device.R_r_1'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback:mcu:3'}), (b:KG {id: 'handler:namco_51xx_device.R_r_2'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback:mcu:4'}), (b:KG {id: 'handler:namco_51xx_device.R_r_3'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback:mcu:5'}), (b:KG {id: 'handler:namco_51xx_device.O_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback:mcu:6'}), (b:KG {id: 'handler:namco_51xx_device.P_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:namco_52xx_device.device_add_mconfig/mcu/callback:mcu:0'}), (b:KG {id: 'handler:namco_52xx_device.K_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:namco_52xx_device.device_add_mconfig/mcu/callback:mcu:1'}), (b:KG {id: 'handler:namco_52xx_device.O_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:namco_52xx_device.device_add_mconfig/mcu/callback:mcu:2'}), (b:KG {id: 'handler:namco_52xx_device.P_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:namco_52xx_device.device_add_mconfig/mcu/callback:mcu:3'}), (b:KG {id: 'handler:namco_52xx_device.SI_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:namco_52xx_device.device_add_mconfig/mcu/callback:mcu:4'}), (b:KG {id: 'handler:namco_52xx_device.R0_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:namco_52xx_device.device_add_mconfig/mcu/callback:mcu:5'}), (b:KG {id: 'handler:namco_52xx_device.R1_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:namco_52xx_device.device_add_mconfig/mcu/callback:mcu:6'}), (b:KG {id: 'handler:namco_52xx_device.R2_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:namco_52xx_device.device_add_mconfig/mcu/callback:mcu:7'}), (b:KG {id: 'handler:namco_52xx_device.R3_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:namco_53xx_device.device_add_mconfig/mcu/callback:mcu:0'}), (b:KG {id: 'handler:namco_53xx_device.K_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:namco_53xx_device.device_add_mconfig/mcu/callback:mcu:1'}), (b:KG {id: 'handler:namco_53xx_device.O_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:namco_53xx_device.device_add_mconfig/mcu/callback:mcu:2'}), (b:KG {id: 'handler:namco_53xx_device.P_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:namco_53xx_device.device_add_mconfig/mcu/callback:mcu:3'}), (b:KG {id: 'handler:namco_53xx_device.R_r_0'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:namco_53xx_device.device_add_mconfig/mcu/callback:mcu:4'}), (b:KG {id: 'handler:namco_53xx_device.R_r_1'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:namco_53xx_device.device_add_mconfig/mcu/callback:mcu:5'}), (b:KG {id: 'handler:namco_53xx_device.R_r_2'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:namco_53xx_device.device_add_mconfig/mcu/callback:mcu:6'}), (b:KG {id: 'handler:namco_53xx_device.R_r_3'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:namco_54xx_device.device_add_mconfig/mcu/callback:mcu:0'}), (b:KG {id: 'handler:namco_54xx_device.K_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:namco_54xx_device.device_add_mconfig/mcu/callback:mcu:1'}), (b:KG {id: 'handler:namco_54xx_device.O_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:namco_54xx_device.device_add_mconfig/mcu/callback:mcu:2'}), (b:KG {id: 'handler:namco_54xx_device.R0_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:namco_54xx_device.device_add_mconfig/mcu/callback:mcu:3'}), (b:KG {id: 'handler:namco_54xx_device.R1_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:polepos_state.draw_sprites'}), (b:KG {id: 'handler:polepos_state.zoom_sprite'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:namco_06xx_device.ctrl_w_sync'}), (b:KG {id: 'handler:namco_06xx_device.set_nmi'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:namco_51xx_device.O_w'}), (b:KG {id: 'handler:namco_51xx_device.O_w_sync'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:namco_52xx_device.P_w'}), (b:KG {id: 'handler:namco_52xx_device.write'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:namco_54xx_device.O_w'}), (b:KG {id: 'handler:namco_54xx_device.write'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:namco_54xx_device.R1_w'}), (b:KG {id: 'handler:namco_54xx_device.write'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
