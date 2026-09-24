/**
 * Expand detected content to the destination aspect ratio. This preserves the
 * whole flyer while retaining only the amount of matte needed to avoid
 * letterboxing or clipping its title/footer.
 */
export function fitCoverCropAspect(crop, sourceWidth, sourceHeight, targetAspect) {
    let { x, y, width, height } = crop;
    if (width / height < targetAspect) {
        const expanded = Math.min(sourceWidth, height * targetAspect);
        x = Math.max(0, Math.min(sourceWidth - expanded, x - (expanded - width) / 2));
        width = expanded;
    }
    else {
        const expanded = Math.min(sourceHeight, width / targetAspect);
        y = Math.max(0, Math.min(sourceHeight - expanded, y - (expanded - height) / 2));
        height = expanded;
    }
    return { x, y, width, height };
}
/**
 * Find a substantial dark outer matte around cover artwork. The detector is
 * deliberately conservative: all four corners must be dark and the crop must
 * remove at least 8% on one axis. A small pad keeps scans from looking cramped.
 */
export function findDarkCoverCrop(pixels, width, height) {
    if (width < 16 || height < 16 || pixels.length < width * height * 4)
        return undefined;
    const isContent = (x, y) => {
        const offset = (y * width + x) * 4;
        return (pixels[offset + 3] ?? 0) > 32 &&
            Math.max(pixels[offset] ?? 0, pixels[offset + 1] ?? 0, pixels[offset + 2] ?? 0) > 40;
    };
    const cornerSize = Math.max(2, Math.floor(Math.min(width, height) * 0.025));
    const darkCorner = (startX, startY) => {
        let content = 0;
        for (let y = startY; y < startY + cornerSize; y++) {
            for (let x = startX; x < startX + cornerSize; x++) {
                if (isContent(x, y))
                    content++;
            }
        }
        return content / (cornerSize * cornerSize) < 0.05;
    };
    if (!darkCorner(0, 0) ||
        !darkCorner(width - cornerSize, 0) ||
        !darkCorner(0, height - cornerSize) ||
        !darkCorner(width - cornerSize, height - cornerSize)) {
        return undefined;
    }
    const rowMinimum = Math.max(2, Math.ceil(width * 0.02));
    const columnMinimum = Math.max(2, Math.ceil(height * 0.02));
    const rowHasContent = (y) => {
        let count = 0;
        for (let x = 0; x < width; x++) {
            if (isContent(x, y) && ++count >= rowMinimum)
                return true;
        }
        return false;
    };
    const columnHasContent = (x) => {
        let count = 0;
        for (let y = 0; y < height; y++) {
            if (isContent(x, y) && ++count >= columnMinimum)
                return true;
        }
        return false;
    };
    let top = 0;
    while (top < height && !rowHasContent(top))
        top++;
    let bottom = height - 1;
    while (bottom >= top && !rowHasContent(bottom))
        bottom--;
    let left = 0;
    while (left < width && !columnHasContent(left))
        left++;
    let right = width - 1;
    while (right >= left && !columnHasContent(right))
        right--;
    if (left >= right || top >= bottom)
        return undefined;
    const removedX = width - (right - left + 1);
    const removedY = height - (bottom - top + 1);
    if (removedX / width < 0.08 && removedY / height < 0.08)
        return undefined;
    if ((right - left + 1) / width < 0.5 || (bottom - top + 1) / height < 0.5) {
        return undefined;
    }
    const padX = Math.ceil((right - left + 1) * 0.015);
    const padY = Math.ceil((bottom - top + 1) * 0.015);
    left = Math.max(0, left - padX);
    right = Math.min(width - 1, right + padX);
    top = Math.max(0, top - padY);
    bottom = Math.min(height - 1, bottom + padY);
    return { x: left, y: top, width: right - left + 1, height: bottom - top + 1 };
}
