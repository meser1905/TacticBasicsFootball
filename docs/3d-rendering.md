# 3D rendering

Notas sobre el modo 3D del editor: Three.js + React Three Fiber + Drei.

## Por que 3D

Para los entrenadores que ya usan TacticalPad, el 3D es expected. Tambien sirve para grabar jugadas que despues se muestran al equipo en TV/proyector con vista de TV (lateral).

## Costo y beneficio

3D agrega:

- Bundle: ~150-200 KB gzip (Three.js + R3F + Drei).
- Complejidad: raycasting al drag, sincronizacion 2D/3D, cameras.
- Performance: GPU, sombras, iluminacion.

Por eso: el modo 3D va lazy-loaded con `dynamic(() => import("@/components/pitch/Pitch3D"), { ssr: false })`. El bundle inicial no lo paga.

## Estilo visual

**Jugadores low-poly tipo minifiguras**, no realistas. Razones:

1. **Uncanny valley**: humanos realistas mal modelados quedan feos. Minifig estilizada queda profesional aunque sea simple.
2. **Performance**: low-poly = pocos triangulos = mejor FPS en tablet.
3. **Estilo**: matchea con la estetica moderna (tipo Linear, Vercel, Arc) del resto de la UI.

Las minifiguras se hacen con geometrias primitivas (Cylinder + Sphere + Box) compuestas. No hace falta cargar modelos GLTF.

## Cancha

`PlaneGeometry` con textura tileada de cesped:

```tsx
const grassTexture = useTexture("/textures/grass.jpg");
grassTexture.wrapS = grassTexture.wrapT = RepeatWrapping;
grassTexture.repeat.set(40, 25);
```

Lineas blancas con `MeshBasicMaterial` (no necesitan iluminacion) sobre planos finitos posicionados.

Arcos: estructura simple de cilindros (postes y travesano) + `MeshLine` o una geometria custom para la red.

## Camaras preset

Cinco camaras accesibles con botones:

| Preset | Posicion | Lookat | Uso |
|--------|----------|--------|-----|
| Cenital | (0, 80, 0) | (0, 0, 0) | Replica del 2D, util para ver la formacion completa |
| Lateral | (0, 30, 70) | (0, 0, 0) | Vista de TV (broadcast), tipica para mostrar jugadas |
| Detras arco propio | (0, 15, -55) | (0, 0, 0) | Ver jugadas de salida y construccion |
| Detras arco rival | (0, 15, 55) | (0, 0, 0) | Ver jugadas de ataque |
| DT | (-40, 8, 0) | (0, 2, 0) | Vista baja lateral, simula al DT en banda |
| Libre | OrbitControls (Drei) | - | Usuario rota libre |

Transiciones entre presets con `useFrame` y lerp suave.

## Iluminacion

- `AmbientLight` intensity 0.5 (base difuso).
- `DirectionalLight` intensity 1.0, casteando sombras suaves (`shadow.mapSize.width = 1024`).
- La direccional simula el sol, posicionada arriba y de costado.

## Performance

Tips aplicados:

- `useFrame` solo cuando hace falta (camera transitions, animation playback). Para drag fuera del playback, eventos directos.
- `instancedMesh` si llegamos a >50 elementos repetidos (conos en entrenamientos).
- `useTexture` con preload cuando se sabe el path.
- Materiales reusados via `useMemo`.
- Sombras solo en el preset "lateral" y "DT" (las mas vistosas). En cenital se desactivan para ahorrar GPU.

## Sincronizacion 2D <-> 3D

El estado del editor vive en `playersStore` (Zustand). Tanto `Pitch2D` como `Pitch3D` se suscriben al mismo store. Cambiar de modo es solo cambiar el componente que se renderiza.

La animacion de transicion (camara que se eleva y rota cuando pasas de 2D a 3D) es independiente de los datos: es un efecto visual que arranca cuando cambia el modo y dura ~600ms.

## Drag con raycasting

Cuando el usuario arrastra un jugador en 3D:

1. `onPointerDown` en el mesh del jugador.
2. Raycaster proyecta desde el mouse al plano de la cancha (Plane normal=Y, offset=0).
3. La interseccion da la nueva posicion XZ.
4. `playersStore.movePlayer(id, x, z)`.
5. R3F re-renderiza la posicion del jugador.

Para touch, lo mismo pero con `onTouchMove` y `event.touches[0]`.

## Tests

3D es dificil de testear unit-wise. Estrategia:

- Tests de logica pura (raycasting, transformaciones de coordenadas) en `tests/unit/`.
- Tests de smoke con Playwright en `tests/e2e/`: levantar la app, cambiar a 3D, verificar que renderiza sin errores en consola.
