# ADR-002 — Multimedia Playback Engine Selection

**Date:** 19/11/2026  
**Status:** Proposed

## 1. Context

The Metflix project requires the integration of a multimedia playback engine capable of playing video and audio files on Linux.

The application must support:

- Playback of MP4, MKV, and WebM formats.
- Audio track selection and SRT subtitle support.
- Saving and resuming playback.
- Playback and volume controls.
- The use of a native multimedia playback library without relying on the HTML5 video player.

We need to select a solution compatible with our Electron stack that allows these features to be integrated into the TV interface.

## 2. Considered Options

**Option 1 — mpv as a Separate Process (Sidecar)**

Electron launches the native mpv player in an independent process and communicates with it using the JSON IPC protocol.

This approach allows the player to be controlled without directly integrating a native library into the Electron process.

**Option 2 — libmpv**

Integration of the native libmpv library into the application through an appropriate interface layer.

This solution allows the mpv playback engine to be used directly as a component of the application.

**Option 3 — libVLC or GStreamer**

Use of another native multimedia library capable of playing audio and video files.

These solutions provide their own APIs and integration mechanisms.

## 3. Proposed Decision

We have selected **mpv running as a separate process (Sidecar)**, controlled by Electron through the JSON IPC protocol.

The intended workflow is as follows:

1. Electron launches the mpv process.
2. Electron sends playback commands to mpv via JSON IPC.
3. mpv handles media decoding and playback.
4. Electron retrieves playback information (state, position, duration, etc.) to update its interface.

## 4. Rationale

We favor this approach for the following reasons:

- **Existing multimedia engine:** mpv provides the necessary audio and video playback capabilities, eliminating the need to develop our own decoding engine.
- **Process separation:** The player runs independently of the Electron interface, allowing playback management and UI management to remain separate.
- **JSON IPC communication:** mpv provides a protocol for sending commands and retrieving playback information.
- **Node.js integration:** Electron can launch and control an external process from its main process.
- **No HTML5 player:** Playback is handled by mpv rather than the browser's built-in video player.

**Comparison with alternative solutions:**

- **libmpv** is a particularly suitable alternative for integrating a playback engine into an application. However, it requires a native interface layer for our Electron/Node.js environment.
- **libVLC and GStreamer** can also meet multimedia playback requirements. Their integration requires using their native APIs and an appropriate architecture.

The Sidecar approach is preferred because it separates processes and allows mpv to be controlled through a documented protocol.

## 5. Consequences

**Advantages:**

- Reuse of an existing multimedia playback engine.
- Separation between the playback process and the Electron interface.
- Playback control and state retrieval through JSON IPC.
- No need to develop a video decoding engine.

**Constraints:**

- Need to manage the launch, monitoring, and termination of the mpv process.
- Handling errors and interruptions in communication with the player.
- Video display integration within the Electron interface must be verified on Linux.
- Securing local IPC communication, which does not provide a built-in authentication mechanism.
- Ensuring mpv is available when installing and packaging the Linux application.
- Compliance of the Sidecar approach with the native multimedia library requirement must be confirmed. Direct integration of libmpv may be necessary.