import { hasDeviceType } from "./generated-source-shape.js";
/**
 * Select direct executors by the generated MAME routine structure. Keeping the
 * check source-shaped means another driver only inherits a fast path when it
 * has the same semantics; no game name or handwritten package flag is needed.
 */
export function generatedDirectScreenShape(machine) {
    const screenKey = machine.execution.screenUpdate?.handler;
    const screen = machine.handlers?.find(handler => `${handler.ownerClass}.${handler.method}` === screenKey);
    const body = screen?.body ?? '';
    if (body.includes('m_mob->draw_async(cliprect)') &&
        body.includes('m_playfield_tilemap->draw(screen, bitmap, cliprect, 0, 0)') &&
        body.includes('m_mob->iterate_dirty_rects(') &&
        body.includes('m_alpha_tilemap->draw(screen, bitmap, cliprect, 0, 0)')) {
        return 'gauntlet-tilemaps';
    }
    if (body.includes('m_sprites->draw_async(cliprect)') &&
        body.includes('m_segaic16road->segaic16_road_draw') &&
        body.includes('m_segaic16vid->tilemap_draw') &&
        body.includes('m_sprites->iterate_dirty_rects(')) {
        return 'outrun-sega16-layers';
    }
    if (body.includes('m_sprites->draw_async(cliprect)') &&
        body.includes('m_segaic16vid->tilemap_draw') &&
        body.includes('m_sprites->iterate_dirty_rects(') &&
        !body.includes('m_segaic16road->segaic16_road_draw')) {
        return hasDeviceType(machine, 'SEGA_SYS16A_SPRITES')
            ? 'system16a-layers'
            : 'system16b-layers';
    }
    if (body.includes('m_bg_tilemap->set_scrollx(i, m_m62_background_hscroll)') &&
        body.includes('m_bg_tilemap->draw(screen, bitmap, cliprect, 0, 0)') &&
        body.includes('draw_sprites(bitmap, cliprect, 0x1f, 0x00, 0x00)') &&
        body.includes('m_bg_tilemap->draw(screen, bitmap, cliprect, 1, 0)')) {
        return 'm62-category-sprites';
    }
    if (body.includes('set_colors()') &&
        body.includes('draw_background()') &&
        body.includes('copybitmap(bitmap, m_background_bitmap') &&
        body.includes('draw_sprites(bitmap, cliprect)') &&
        machine.handlers?.some(handler => handler.method === 'draw_background' &&
            handler.body?.includes('const uint8_t *const cram = m_characterram') &&
            handler.body.includes('m_background_bitmap.pix(y, x)')) &&
        machine.handlers?.some(handler => handler.method === 'draw_sprites' &&
            handler.body?.includes('236 - *m_sprite2_xpos - 4') &&
            handler.body.includes('m_gfxdecode->gfx(0)->transpen'))) {
        return 'exidy-character-ram';
    }
    if (body.includes('for (int offs = 0; offs < m_videoram.bytes(); offs++)') &&
        body.includes('m_colorram[((offs >> 2) & 0x07e0) | (offs & 0x001f)]') &&
        body.includes('rgb_t pen = (data & 0x80) ? pens[color >> 4]') &&
        body.includes('rgb_t pen = (data & 0x80) ? pens[color & 0x0f]')) {
        return 'berzerk-color-bitmap';
    }
    if (body.includes('draw_bitmap(bitmap, cliprect)') &&
        body.includes('draw_sprites(bitmap, cliprect, 0x07, 1)') &&
        machine.handlers?.some(handler => handler.method === 'draw_bitmap' &&
            handler.body?.includes('for (offs_t offs = 0; offs < m_videoram.bytes(); offs++)') &&
            handler.body.includes('(this->*m_map_color)(x, y)')) &&
        machine.handlers?.some(handler => handler.method === 'draw_sprites' &&
            handler.body?.includes('for (offs = m_spriteram.bytes() - 4;offs >= 0;offs -= 4)') &&
            handler.body.includes('m_gfxdecode->gfx(1)->transpen'))) {
        return 'cosmic-bitmap-sprites';
    }
    if (body.includes('uint8_t const *const source = &m_videoram[y]') &&
        body.includes('source[(x / 2) * 256]') &&
        body.includes('m_palette->pen_color(m_paletteram[x])')) {
        return 'williams-column-bitmap';
    }
    if (body.includes('m_videoram[offs]') &&
        body.includes('m_characterram[offs]') &&
        body.includes('m_palette_bank << 3') &&
        body.includes('m_proms->base()') &&
        body.includes('video_data & 0x80')) {
        return 'vicdual-character-ram';
    }
    if (body.includes('m_bg_tilemap->set_scrollx(0, scrollx)') &&
        body.includes('m_bg_tilemap->set_scrolly(0, scrolly)') &&
        body.includes('m_bg_tilemap->draw(screen, bitmap, cliprect, 0, 0)') &&
        body.includes('draw_sprites(bitmap, cliprect)') &&
        body.includes('m_fg_tilemap->draw(screen, bitmap, cliprect, 0, 0)') &&
        machine.handlers?.some(handler => handler.method === 'draw_sprites' &&
            handler.body?.includes('for (uint32_t i = 0; i < bytes; i += 5)') &&
            handler.body.includes('int const size = (attr & 0x30) >> 4') &&
            handler.body.includes('which &= ~size'))) {
        return 'technos-tilemap-sprites';
    }
    if (body.includes('const auto ilmode(m_io_mconf->read())') &&
        body.includes('draw_background(bm, cliprect)') &&
        body.includes('draw_sprites(bm, cliprect)') &&
        body.includes('m_fg_tilemap->draw(screen, bm, cliprect, 0, 0)') &&
        machine.handlers?.some(handler => handler.method === 'draw_background' &&
            handler.body?.includes('uint16_t rovi = (flip_screen() ? (y / 2) ^ 0xff : (y / 2))') &&
            handler.body.includes('m_background_ram[BIT(rovi, 8)')) &&
        machine.handlers?.some(handler => handler.method === 'draw_sprites' &&
            handler.body?.includes('for (int offs = 4; offs < m_dmasource.bytes(); offs += 4)') &&
            handler.body.includes('attributes[m_sprite_ram[offs] >> 2]'))) {
        return 'tnx1-banked-raster';
    }
    if (body.includes('bitmap_ind16 *bgpixmaps[4]') &&
        body.includes('bgpixmaps[0] = bgpixmaps[1] = bgpixmaps[2] = bgpixmaps[3]') &&
        body.includes('video_update_common(screen, bitmap, cliprect, fgpixmap, bgpixmaps') &&
        machine.handlers?.some(handler => handler.method === 'video_update_common' &&
            handler.body?.includes('m_lookup_prom[lookup_index]') &&
            handler.body.includes('m_mix_collide_summary = 1')) &&
        machine.handlers?.some(handler => handler.method === 'draw_sprites' &&
            handler.body?.includes('for (int spritenum = 0; spritenum < 32; spritenum++)') &&
            handler.body.includes('m_sprite_collide_summary = 1'))) {
        return 'system1-prom-mixer';
    }
    if (body.includes('machine().tilemap().set_flip_all(m_flip ? TILEMAP_FLIPX | TILEMAP_FLIPY : 0)') &&
        body.includes('m_bg_tilemap->draw(screen, bitmap, cliprect, 0, 0)') &&
        body.includes('draw_sprites(bitmap, cliprect, 0x40, 1)') &&
        machine.handlers?.some(handler => handler.method === 'draw_sprites' &&
            handler.body?.includes('scanline_vf = (cliprect.max_y - 1) & 0xFF') &&
            handler.body.includes('(num_sprt < 16)') &&
            handler.body.includes('m_gfxdecode->gfx(1)->transpen(bitmap,cliprect,'))) {
        return 'dkong-scanline-sprites';
    }
    if (body.includes('video_update_common(bitmap, cliprect,') &&
        machine.handlers?.some(handler => handler.method === 'draw_layers' &&
            handler.body?.includes('m_gfxdecode->gfx(m_colorbank[0] & 0x08 ? 2 : 0)->transpen') &&
            handler.body.includes('m_videoram[2][offs]')) &&
        machine.handlers?.some(handler => handler.method === 'draw_sprites' &&
            handler.body?.includes('SPRITE_RAM_PAGE_OFFSET') &&
            handler.body.includes('get_sprite_gfx_element(which)->transpen'))) {
        return 'taitosj-layered-char-ram';
    }
    if (body.includes('bitmap.fill(255, cliprect)') &&
        body.includes('for (offs = 0; offs < m_objectram.bytes(); offs += 4)') &&
        body.includes('prom_line = prom + 0x80 + ((gfx_num & 0xe0) >> 1)') &&
        body.includes('m_gfxdecode->gfx(0)->transpen(bitmap,cliprect,') &&
        body.includes('m_videoram[goffs + 1]') &&
        body.includes('sx += 16')) {
        return 'bublbobl-object-columns';
    }
    if (body.includes('m_draw_background_ptr(bitmap, cliprect)') &&
        body.includes('m_bg_tilemap->draw(screen, bitmap, cliprect, 0, 0)') &&
        body.includes('for (int i = 0; i < m_numspritegens; i++)') &&
        body.includes('sprites_draw(screen, bitmap, cliprect,') &&
        body.includes('if (!m_draw_bullet_ptr.isnull())') &&
        machine.video?.delegates?.m_draw_bullet_ptr === null) {
        const sprites = machine.handlers?.find(handler => handler.method === 'sprites_draw' &&
            handler.body?.includes('for (int sprnum = 7; sprnum >= 0; sprnum--)') &&
            handler.body.includes('m_extend_sprite_info_ptr(base, &sx, &sy, &flipx, &flipy, &code, &color)') &&
            handler.body.includes('m_gfxdecode->gfx(1)->transpen(bitmap,clip,'));
        const extensionKey = machine.video?.delegates?.m_extend_sprite_info_ptr;
        const extension = typeof extensionKey === 'string'
            ? machine.handlers?.find(handler => `${handler.ownerClass}.${handler.method}` === extensionKey)
            : undefined;
        if (sprites?.program?.diagnostics.length === 0 &&
            extension?.program?.diagnostics.length === 0 &&
            extension.program.operations.length === 0) {
            return 'galaxian-no-bullets';
        }
    }
    if (body.includes('if (m_video_enable)') &&
        body.includes('m_bg_tilemap->draw(screen, bitmap, cliprect, 0, 0)') &&
        body.includes('draw_sprites(bitmap, cliprect)') &&
        body.includes('m_bg_tilemap->draw(screen, bitmap, cliprect, 1, 0)')) {
        const sprites = machine.handlers?.find(handler => handler.method === 'draw_sprites' &&
            handler.body?.includes('for (int offs = 0x3e; offs >= 0x10; offs -= 2)') &&
            handler.body.includes('int const sy = 241 - m_spriteram[1][offs + 1]') &&
            handler.body.includes('m_gfxdecode->gfx(1)->transpen(bitmap, cliprect,'));
        if (sprites?.program?.diagnostics.length === 0)
            return 'timeplt';
    }
    return undefined;
}
