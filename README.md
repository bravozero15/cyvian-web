# Cyvian - Sitio Web Corporativo

## Estructura del Proyecto

```
cyvian-website/
├── index.html          # Página principal
├── css/               # Estilos CSS
├── js/                # Scripts JavaScript
├── img/               # Imágenes
├── pages/             # Páginas HTML adicionales
├── blog/              # Sistema de blog
├── tools/             # Herramientas gratuitas
├── api/               # Backend/APIs
└── assets/            # Recursos adicionales
```

## Instalación Local

1. Clonar o descargar el proyecto
2. Abrir index.html en un navegador
3. Para desarrollo, usar un servidor local:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # O con PHP
   php -S localhost:8000
   ```

## Checklist de Desarrollo

- [ ] Página principal
- [ ] Página de servicios
- [ ] Página nosotros
- [ ] Blog
- [ ] Herramienta de scanner
- [ ] Portal de clientes
- [ ] Formulario de contacto
- [ ] Integración métricas

## Seguridad

- Headers de seguridad en .htaccess
- Validación de formularios
- Sanitización de inputs
- HTTPS obligatorio
