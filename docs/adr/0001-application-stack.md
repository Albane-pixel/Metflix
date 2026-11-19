# ADR-001 — Application Technology Stack Selection

**Date:** 19/11/2026  
**Status:** Proposed

## 1. Context

The Metflix project requires the development of a Linux desktop application that includes:

- A TV-friendly interface designed for navigation without a mouse.
- A native multimedia playback engine.
- A local API enabling remote control from a smartphone.
- A plugin system running extensions in separate processes.
- An accessible interface meeting the required WCAG 2.2 AA criteria.
- Automated Linux package generation through the CI/CD pipeline.

We need to select a technology stack that meets these requirements while prioritizing technologies already familiar to the team to simplify development and maintenance.

## 2. Considered Options

**Option 1 — Electron + TypeScript + React**

Enables the development of a desktop application using web technologies while leveraging Node.js to access operating system functionality.

**Option 2 — Tauri v2 + Rust + React**

Also enables the development of a desktop application with a web-based interface while favoring a more lightweight architecture. However, integrating certain native features requires development in Rust.

**Option 3 — Python + PySide6 (Qt6)**

Enables the development of a native desktop application using Qt but requires Python and a UI development environment different from React.

## 3. Decision

We have selected the following technologies:

- **Electron** for the Linux desktop application.
- **TypeScript** for development.
- **React** for the user interface.
- **Tailwind CSS** for styling.
- **Node.js** for system-level functionality and application services.
- **electron-builder** for Linux package generation.
- **Express** for the local HTTP server, complemented by a WebSocket solution for real-time communication with the remote control.

The selection of the **multimedia playback engine** and its integration method is documented separately in **ADR-002**.

## 4. Rationale

We have selected this stack to maintain a common JavaScript/TypeScript development environment across the different components of Metflix.

This choice offers several advantages:

- **Technology consistency:** Electron, React, and Node.js allow us to develop the user interface and application services within a JavaScript/TypeScript environment, reducing the number of languages and tools required.
- **UI development:** React enables the creation of reusable graphical components for the different pages of Metflix, while Tailwind CSS simplifies their styling.
- **Media player integration:** Electron enables communication with a native playback engine without relying on the HTML5 video player. The selected integration approach must be validated on Linux and comply with the native media playback requirements.
- **Application services development:** Node.js enables the development of the services required for the control API and the management of processes used by the plugin system.
- **Linux distribution:** electron-builder supports generating `.deb` and `.AppImage` packages and automating their creation through the CI/CD pipeline.

**Comparison with alternative solutions:**

- **Tauri** is a relevant alternative, particularly for reducing resource consumption. However, using Rust for certain native features would introduce an additional programming language into our development environment.
- **Python with PySide6** also provides a suitable solution for desktop applications. However, we favor Electron to retain React for the interfaces and TypeScript/Node.js for application services.

The decision to use Electron is therefore primarily based on maintaining a consistent technical environment and limiting development complexity.

## 5. Consequences

**Advantages:**

- Consistent development environment centered around JavaScript/TypeScript.
- Reuse of web development components and skills.
- Tooling ecosystem suitable for development, testing, and packaging.
- Ability to develop user interfaces and application services within a common technical environment.

**Constraints:**

- Potentially higher resource consumption compared to more lightweight native solutions.
- Need to secure communication between Electron processes.
- Native media player integration and compliance must be verified on Linux.
- Plugin isolation and permission enforcement require dedicated security mechanisms beyond simply running plugins in separate processes.