# Free 3D resources for Damjo Properties hero

Use these to replace the default hero image showcase. After downloading, update `static/js/config_v2.js` → `heroVisual.mode`.

## Recommended workflow

| Step | Action |
|------|--------|
| 1 | Pick a model (CC0 preferred) from links below |
| 2 | Download **GLB** format |
| 3 | Save as `static/models/hero-house.glb` (create the `models` folder) |
| 4 | Set `heroVisual.mode` to `"model"` in `config_v2.js` |
| 5 | Reload `index.html` |

**Spline (no coding):** Create a scene at [spline.design](https://spline.design), publish → Embed, paste the iframe `src` into `heroVisual.spline.embedUrl` and set `mode` to `"spline"`.

---

## Best free sources (houses, land, architecture)

### CC0 — use commercially without attribution

| Resource | Link | Notes |
|----------|------|--------|
| **Poly Pizza — House (CC0)** | https://poly.pizza/m/jFBoxLuAXY | Low-poly house, GLTF/GLB download |
| **GetGLB — House (public domain)** | https://www.getglb.com/architecture/house/ | Small ~106KB GLB, good for web |
| **Quaternius packs** | https://quaternius.com/packs.html | Many CC0 buildings; pack page links to GLB |
| **Kenney assets** | https://kenney.nl/assets?q=3d | CC0 game/architecture kits |
| **Open Source 3D Assets** | https://opensource3dassets.com | Searchable CC0 registry |
| **ambientCG** | https://ambientcg.com/list?type=3D | CC0 textures & some 3D (check each item) |

### Free with license (check terms — often CC-BY)

| Resource | Link | Notes |
|----------|------|--------|
| **Sketchfab (free download filter)** | https://sketchfab.com/search?features=downloadable&licenses=322a749bcfa841b29dff1010a1b3e841&q=house+low+poly | Filter “Downloadable” + license; export GLB |
| **Sketchfab — American House** | https://sketchfab.com/3d-models/american-house-798ffaeadacf4e08a2665785422fb45d | Suburban house (CC Attribution) |
| **Poly Haven** | https://polyhaven.com/models | HDRIs + some models, CC0 |

### Interactive embed (easiest polish)

| Resource | Link | Notes |
|----------|------|--------|
| **Spline** | https://spline.design | Drag-and-drop 3D; free tier; embed on site |
| **Sketchfab embed** | Any Sketchfab model page → Share → Embed | No self-hosting; iframe on hero |

### Land / plot themed (search terms)

On Poly Pizza or Sketchfab search: `land plot`, `terrain`, `survey marker`, `fence plot`, `African house low poly`.

- https://poly.pizza/search/plot  
- https://sketchfab.com/search?q=land+plot&type=models  

---

## Suggested picks for a real-estate site

1. **Fast & lightweight:** GetGLB house → `static/models/hero-house.glb`  
2. **Friendly cottage look:** Poly Pizza house (link above)  
3. **Premium motion:** Spline scene with slow camera + house or “for sale” sign  
4. **No 3D file:** Keep `mode: "image"` (current default) — uses your plot photo in a glass card  

---

## License reminder

- **CC0** = no attribution required.  
- **CC-BY** = credit the author on your site footer or About page.  
- Always confirm license on the download page before publishing.
