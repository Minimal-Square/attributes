import * as esbuild from 'esbuild';
import { readdirSync, statSync, rmSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Config output
const BUILD_DIRECTORY = join(__dirname, '..', 'dist');
const PRODUCTION = process.env.NODE_ENV === 'production';

// Config dev serving
const LIVE_RELOAD = !PRODUCTION;
const SERVE_PORT = 3000;
const SERVE_ORIGIN = `http://localhost:${SERVE_PORT}`;

// Config entry point
const ATTRIBUTES_ENTRY = join(__dirname, '..', 'src', 'attributes.ts');

// Clear dist directory in development mode
if (!PRODUCTION) {
  rmSync(BUILD_DIRECTORY, { recursive: true, force: true });
}

// Create context
const context = await esbuild.context({
  bundle: true,
  entryPoints: PRODUCTION ? getPackageEntryPoints(join(__dirname, '..', '..')) : [ATTRIBUTES_ENTRY],
  outdir: BUILD_DIRECTORY,
  minify: PRODUCTION,
  sourcemap: !PRODUCTION,
  target: PRODUCTION ? 'es2019' : 'esnext',
  inject: LIVE_RELOAD ? [join(__dirname, 'live-reload.js')] : undefined,
  define: {
    SERVE_ORIGIN: JSON.stringify(SERVE_ORIGIN),
  },
  outExtension: { '.js': '.js' },
  format: 'esm',
});

// Build files in prod
if (PRODUCTION) {
  await context.rebuild();
  context.dispose();
}

// Watch and serve files in dev
else {
  await context.watch();
  await context
    .serve({
      servedir: BUILD_DIRECTORY,
      port: SERVE_PORT,
    })
    .then(logServedFiles);
}

/**
 * Scans the packages directory and returns an object of entry points.
 * @param {string} packagesDir - The directory containing all packages.
 * @returns {Object} An object with package names as keys and entry point file paths as values.
 */
function getPackageEntryPoints(packagesDir) {
  const packages = readdirSync(packagesDir);
  const entryPoints = {};

  for (const pkg of packages) {
    if (pkg === 'template') continue; // Exclude the template package

    const pkgPath = join(packagesDir, pkg);
    if (statSync(pkgPath).isDirectory()) {
      const srcPath = join(pkgPath, 'src');
      let entryFile;

      if (pkg === 'attributes') {
        entryFile = join(srcPath, 'attributes.ts');
      } else {
        entryFile = join(srcPath, 'index.ts');
      }

      if (statSync(entryFile).isFile()) {
        entryPoints[pkg] = entryFile;
      }
    }
  }

  return entryPoints;
}

/**
 * Logs information about the files that are being served during local development.
 */
function logServedFiles() {
  const getFiles = (dirPath) => {
    const files = readdirSync(dirPath, { withFileTypes: true }).map((dirent) => {
      const path = join(dirPath, dirent.name);
      return dirent.isDirectory() ? getFiles(path) : path;
    });

    return files.flat();
  };

  const files = getFiles(BUILD_DIRECTORY);

  const filesInfo = files
    .map((file) => {
      if (file.endsWith('.map')) return;

      // Normalize path and create file location
      const relativePath = file.replace(BUILD_DIRECTORY, '');
      const location = `${SERVE_ORIGIN}${relativePath.replace(/\\/g, '/')}`;

      // Create import suggestion
      const tag = location.endsWith('.css') ? `<link href="${location}" rel="stylesheet" type="text/css"/>` : `<script defer src="${location}"></script>`;

      return {
        'File Location': location,
        'Import Suggestion': tag,
      };
    })
    .filter(Boolean);

  // eslint-disable-next-line no-console
  console.table(filesInfo);
}
