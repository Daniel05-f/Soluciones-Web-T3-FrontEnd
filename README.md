# Sistema de Gestión Citas Médicas - Frontend

Este proyecto ha sido generado usando [Angular CLI](https://github.com/angular/angular-cli) version 22.1.8.

Aplicación web distribuida (Spring Boot + Angular) que automatice la gestión Gestión de usuarios y accesos, gestión médica (médicos, especialidades, exámenes), gestión de citas, registro de consulta resultante y reportes básicos, aplicando arquitectura en capas, buenas prácticas de seguridad y principios de sostenibilidad tecnológica (ODS 9)

Este proyecto es desarrollado como parte del curso Soluciones Web y Aplicaciones Distribuidas con NRC 16045, correspondiente al período UPN 2026-2

## A considerar

Cuando clone el proyecto, para que la aplicación descargue las dependencias, desde la línea de comandos navegue a la línea de comandos y ejecute:

```bash
npm install
```

Se ha deshabilitado el modo estricto de typescript en el archivo `tsconfig.json`
```bash
"strict": false,
```

Y para un comportamiento según versiones de angular anteriores se agregó en `angular.json` la siguiente configuración:

```bash
    "schematics": {
        "@schematics/angular:component": { "type": "component" },
        "@schematics/angular:service": { "type": "service" },
        "@schematics/angular:pipe": { "typeSeparator": "." },
        "@schematics/angular:module": { "typeSeparator": "." }
      }
```


## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
