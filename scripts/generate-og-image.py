#!/usr/bin/env python3
"""Gera og-image.png 1200x630 — regenerar com: python scripts/generate-og-image.py"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageChops
import os

W, H = 1200, 630
BG = (23, 18, 14)          # #17120e
BG2 = (31, 26, 22)         # #1f1a16
GOLD = (143, 100, 36)      # #8f6424
GOLD_LIGHT = (184, 131, 58)
CYAN = (6, 182, 212)       # #06B6D4
CREAM = (246, 238, 231)
MUTED = (246, 238, 231, 180)
FONT_BOLD = "C:/Windows/Fonts/segoeuib.ttf"
FONT_REG = "C:/Windows/Fonts/segoeui.ttf"
if not os.path.exists(FONT_BOLD):
    FONT_BOLD = "C:/Windows/Fonts/arialbd.ttf"
if not os.path.exists(FONT_REG):
    FONT_REG = "C:/Windows/Fonts/arial.ttf"


def font(size, bold=True):
    return ImageFont.truetype(FONT_BOLD if bold else FONT_REG, size)


def rounded(draw, xy, r, fill):
    draw.rounded_rectangle(xy, radius=r, fill=fill)


def main():
    img = Image.new("RGB", (W, H), BG)

    # brilhos (glow) teal + gold
    glow = Image.new("RGB", (W, H), (0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse([(W * 0.55, -180), (W * 0.55 + 520, 340)], fill=(4, 60, 70))
    gd.ellipse([(-160, H - 260), (360, H + 200)], fill=(60, 40, 10))
    glow = glow.filter(ImageFilter.GaussianBlur(90))
    img = ImageChops.screen(img, glow)

    # faixa superior fina gradiente (gold -> cyan)
    d = ImageDraw.Draw(img)
    for x in range(W):
        t = x / W
        r = int(GOLD[0] + (CYAN[0] - GOLD[0]) * t)
        g = int(GOLD[1] + (CYAN[1] - GOLD[1]) * t)
        b = int(GOLD[2] + (CYAN[2] - GOLD[2]) * t)
        d.line([(x, 0), (x, 6)], fill=(r, g, b))

    # marca MAX (paths originais escalados) + wordmark
    # logo original 182x87 -> escala ~0.9
    def logo(draw, x0, y0, s=0.62):
        pts1 = [(182, 19.333), (116, 19.333), (116, 33.833), (182, 33.833), (182, 53.167), (116, 53.167), (116, 67.667), (182, 67.667), (182, 87), (111.837, 87), (95, 70.7246), (95, 16.2754), (111.837, 0), (182, 0), (182, 19.333)]
        pts2 = [(67.667, 87), (67.667, 21), (53.167, 21), (53.167, 87), (33.833, 87), (33.833, 21), (19.333, 21), (19.333, 87), (0, 87), (0, 16.8369), (16.2754, 0), (70.7246, 0), (87, 16.8369), (87, 87), (67.667, 87)]
        c = GOLD_LIGHT
        draw.polygon([(x0 + x * s, y0 + y * s) for x, y in pts1], fill=c)
        draw.polygon([(x0 + x * s, y0 + y * s) for x, y in pts2], fill=c)

    logo(d, 72, 48, 0.62)
    d.text((208, 60), "Marketing Digital", font=font(28), fill=CREAM)
    d.text((W - 260, 62), "maxebina.com.br", font=font(20, bold=False), fill=(246, 238, 231, 150))

    # eyebrow pill (largura dinâmica, sem espaço sobrando à direita)
    ex, ey = 72, 190
    eyebrow = "TECNOLOGIA QUE GERA RESULTADO"
    ew = d.textlength(eyebrow, font=font(14)) + 40
    d.rounded_rectangle([ex, ey, ex + ew, ey + 38], radius=19, outline=CYAN, width=2)
    d.text((ex + 20, ey + 9), eyebrow, font=font(14), fill=CYAN)

    # título 2 linhas
    d.text((70, 250), "Transforme sua empresa", font=font(64), fill=CREAM)
    d.text((70, 324), "com ", font=font(64), fill=CREAM)
    tw = d.textlength("com ", font=font(64))
    d.text((70 + tw, 324), "tecnologia", font=font(64), fill=CYAN)

    # subtítulo
    d.text((72, 418), "Sites · Landing Pages · SaaS · CRM · Tráfego Pago · Automação de WhatsApp", font=font(23, bold=False), fill=(246, 238, 231, 200))
    d.text((72, 452), "Presença digital profissional que converte visitantes em clientes.", font=font(23, bold=False), fill=(246, 238, 231, 160))

    out = os.path.join(os.path.dirname(__file__), "..", "public", "og-image.png")
    img.save(out, "PNG", optimize=True)
    print(f"OK -> {os.path.abspath(out)} {img.size}")


if __name__ == "__main__":
    main()
